'use server';

import { google } from '@ai-sdk/google';
import { streamText, tool } from 'ai';
import { 
  PersonalInfo, 
  WorkExperience, 
  Education, 
  Skill, 
  Certification,
  TemplateType
} from '@/lib/store/resume';
import FirecrawlApp, { ScrapeResponse } from '@mendable/firecrawl-js';
import { z } from 'zod';

// Define our own ResumeData type based on the exported interfaces
interface ResumeData {
  selectedTemplate?: TemplateType;
  personalInfo?: PersonalInfo;
  workExperience?: WorkExperience[];
  education?: Education[];
  skills?: Skill[];
  certifications?: Certification[];
}

export async function generateChatResponse(
  messages: { role: 'user' | 'assistant'; content: string }[],
  resumeData?: ResumeData
) {
  try {    
    // Log resume data structure (without sensitive content)
    console.log('Resume data structure:', {
      hasPersonalInfo: !!resumeData?.personalInfo,
      workExperienceCount: resumeData?.workExperience?.length || 0,
      educationCount: resumeData?.education?.length || 0,
      skillsCount: resumeData?.skills?.length || 0,
      certificationsCount: resumeData?.certifications?.length || 0,
      template: resumeData?.selectedTemplate
    });
    
    // Create a system message with resume context if available
    const systemMessage = createSystemMessage(resumeData);
    
    // Add system message to the beginning if we have resume data
    const messagesWithContext = systemMessage 
      ? [{ role: 'system' as const, content: systemMessage }, ...messages]
      : messages;
      
    // Initialize the firecrawl
    const firecrawlClient = new FirecrawlApp({apiKey: process.env.FIRECRAWL_API_KEY});

    // Use streamText with the Google Gemini model
    const result = await streamText({
      model: google('gemini-2.0-flash-001'),
      messages: messagesWithContext,
      temperature: 0.7,
      maxTokens: 1000,
      toolCallStreaming: true,
      // Add the firecrawl tools
      tools: {
        crawlUrl: tool({
          description: 'Crawls a specified URL and returns its content as clean markdown, optimized for reading by AI models.',
          parameters: z.object({
            url: z.string().describe("The URL to crawl."),
          }),
          execute: async ({ url }) => {
            const scrapeResult = await firecrawlClient.scrapeUrl(url, { formats: ['markdown'] }) as ScrapeResponse;
            if (scrapeResult.error) {
              return { content: `Error: ${scrapeResult.error}` };
            }
            return { content: scrapeResult.markdown };
          }
        })
      },
      // Enable multi-step calls to allow the model to use tools and then respond based on the results
      maxSteps: 3,
    });

    // Return a streaming response
    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Error generating chat response:', error);
    return new Response(
      JSON.stringify({ 
        content: "I'm sorry, I encountered an error while processing your request. Please try again later.",
        error: true 
      }),
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
}

// Helper function to create a system message with resume context
function createSystemMessage(resumeData?: ResumeData): string | null {
  if (!resumeData) return null;

  let contextParts = [];
  
  if (resumeData.personalInfo) {
    contextParts.push(`Personal Info: ${JSON.stringify(resumeData.personalInfo)}`);
  }
  
  if (resumeData.workExperience && resumeData.workExperience.length > 0) {
    contextParts.push(`Work Experience: ${JSON.stringify(resumeData.workExperience)}`);
  }
  
  if (resumeData.education && resumeData.education.length > 0) {
    contextParts.push(`Education: ${JSON.stringify(resumeData.education)}`);
  }
  
  if (resumeData.skills && resumeData.skills.length > 0) {
    contextParts.push(`Skills: ${JSON.stringify(resumeData.skills)}`);
  }
  
  if (resumeData.certifications && resumeData.certifications.length > 0) {
    contextParts.push(`Certifications: ${JSON.stringify(resumeData.certifications)}`);
  }

  if (contextParts.length === 0) return null;

  return `
    You are a helpful resume assistant. You provide advice on improving resumes.
    The user has the following resume information:
    
    ${contextParts.join('\n\n')}
    
    When responding to the user, provide specific, actionable advice based on their resume data.
    Focus on helping them improve their resume for job applications.
    Be concise, professional, and supportive in your responses.
    
    You have access to two web crawling tools:
    
    1. crawlUrl: A simple tool that crawls a specified URL and returns the content as clean markdown, optimized for AI reading.
       Use this tool when you need to quickly gather information from a webpage.
    
    2. firecrawl: A more advanced tool with various options for customizing the crawling behavior and output format.
       Use this tool for more specialized web extraction needs.
    
    WHEN TO USE THE WEB CRAWLING TOOLS:
    1. When the user asks about job requirements for specific positions
    2. When the user needs information about industry-standard resume formats
    3. When the user wants to compare their skills against job postings
    4. When researching salary information or industry trends
    5. When gathering information about specific companies
    
    For most cases, prefer using the simpler crawlUrl tool as it's focused on getting clean, readable content.
    
    Keep your searches focused and only use the tools when they would provide clear value to the user.
    Process and synthesize the information rather than just repeating it.

    IF the user gives you a URL, you may use the crawlUrl tool to extract relevant information from the webpage.
  `;
}