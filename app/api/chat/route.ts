import { generateChatResponse } from '@/app/actions/chat';

export async function POST(req: Request) {
  try {
    const { messages, resumeData } = await req.json();
    
    // Call the server action with the messages and resume data
    return generateChatResponse(messages, resumeData);
  } catch (error) {
    console.error('Error in chat API route:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to process chat request' 
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

// Set a longer timeout for the API route
export const maxDuration = 30; // 30 seconds 