'use server';

import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import { 
  PersonalInfo, 
  WorkExperience, 
  Education, 
  Skill, 
  Certification,
  TemplateType
} from '@/lib/store/resume';

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
    // Log to verify API key is available (don't log the full key in production)
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    
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

    console.log('Sending messages to AI:', JSON.stringify(messagesWithContext.map(m => ({ 
      role: m.role, 
      contentLength: m.content.length 
    })), null, 2));

    // Use streamText with the Google Gemini model
    const result = await streamText({
      model: google('gemini-1.5-flash'),
      messages: messagesWithContext,
      temperature: 0.7,
      maxTokens: 1000,
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
  `;
} 