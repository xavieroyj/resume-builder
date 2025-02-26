"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";
import { useResumeStore } from "@/lib/store/resume";

interface Message {
  id: string;
  content: string;
  sender: "user" | "assistant";
  timestamp: Date;
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your resume assistant. How can I help you with your resume today?",
      sender: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { personalInfo, workExperience, education, skills, certifications } = useResumeStore();

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  // Focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: crypto.randomUUID(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Simulate assistant response (in a real app, this would call an API)
    setTimeout(() => {
      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        content: generateResponse(inputValue),
        sender: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    }, 1000);
  };

  const generateResponse = (userMessage: string): string => {
    // This is a simple placeholder. In a real app, you would call an AI API
    const lowerCaseMessage = userMessage.toLowerCase();
    
    if (lowerCaseMessage.includes("help") || lowerCaseMessage.includes("how")) {
      return "I can help you improve your resume by providing suggestions for your personal information, work experience, education, skills, and certifications. What specific part would you like help with?";
    }
    
    if (lowerCaseMessage.includes("personal") || lowerCaseMessage.includes("name") || lowerCaseMessage.includes("contact")) {
      return `I see your name is ${personalInfo.fullName || "[Not provided]"}. Make sure your contact information is professional and up-to-date. A clear, concise summary helps recruiters understand your value proposition quickly.`;
    }
    
    if (lowerCaseMessage.includes("work") || lowerCaseMessage.includes("experience") || lowerCaseMessage.includes("job")) {
      return `You have ${workExperience.length} work experiences listed. For each position, use strong action verbs and quantify your achievements when possible. Focus on results and impact rather than just listing responsibilities.`;
    }
    
    if (lowerCaseMessage.includes("education") || lowerCaseMessage.includes("school") || lowerCaseMessage.includes("degree")) {
      return `You have ${education.length} education entries. For recent graduates, education should be prominent. For experienced professionals, focus more on your work experience and place education lower in your resume.`;
    }
    
    if (lowerCaseMessage.includes("skill")) {
      return `You've listed ${skills.length} skills. Make sure to include both technical and soft skills relevant to your target position. Review job descriptions to identify key skills employers are looking for.`;
    }
    
    if (lowerCaseMessage.includes("certification") || lowerCaseMessage.includes("license")) {
      return `You have ${certifications.length} certifications. Industry certifications can significantly boost your resume, especially in technical fields. Make sure they're current and relevant to your target role.`;
    }
    
    return "I'm here to help with your resume. You can ask me about improving your personal information, work experience, education, skills, or certifications.";
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-hidden" ref={scrollAreaRef}>
        <ScrollArea className="h-full p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      <div className="border-t p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <Input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={!inputValue.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
} 