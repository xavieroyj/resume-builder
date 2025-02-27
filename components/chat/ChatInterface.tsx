"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";
import { useResumeStore } from "@/lib/store/resume";
import { useChat } from '@ai-sdk/react';
import ReactMarkdown from 'react-markdown';

export function ChatInterface() {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const resumeStore = useResumeStore();

  // Extract only the data properties from the resumeStore
  const resumeData = {
    personalInfo: resumeStore.personalInfo,
    workExperience: resumeStore.workExperience,
    education: resumeStore.education,
    skills: resumeStore.skills,
    certifications: resumeStore.certifications,
    selectedTemplate: resumeStore.selectedTemplate
  };

  // Use the useChat hook from the Vercel AI SDK
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    status,
    error
  } = useChat({
    api: "/api/chat",
    body: {
      resumeData
    },
    initialMessages: [
      {
        id: "1",
        content: "Hello! I'm your resume assistant. How can I help you with your resume today?",
        role: "assistant",
      },
    ],
  });

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

  // Check if the AI is currently generating a response
  const isGenerating = status === 'streaming' || status === 'submitted';

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-hidden" ref={scrollAreaRef}>
        <ScrollArea className="h-full p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  } break-words overflow-hidden`}
                >
                  {message.role === "assistant" ? (
                    <div className="prose prose-sm dark:prose-invert max-w-none break-words">
                      <ReactMarkdown>
                        {message.content}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <p className="break-all">{message.content}</p>
                  )}
                  <p className="text-xs opacity-70 mt-1">
                    {new Date().toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
            {isGenerating && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg px-4 py-2 bg-muted">
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 rounded-full bg-current animate-bounce" style={{ animationDelay: "0ms" }}></div>
                    <div className="h-2 w-2 rounded-full bg-current animate-bounce" style={{ animationDelay: "150ms" }}></div>
                    <div className="h-2 w-2 rounded-full bg-current animate-bounce" style={{ animationDelay: "300ms" }}></div>
                  </div>
                </div>
              </div>
            )}
            {status === 'error' && error && (
              <div className="flex justify-center">
                <div className="max-w-[80%] rounded-lg px-4 py-2 bg-destructive text-destructive-foreground">
                  <p>Error: {error.message}</p>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      <div className="border-t p-4">
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2"
        >
          <Input
            ref={inputRef}
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message..."
            className="flex-1"
            disabled={isGenerating}
          />
          <Button type="submit" size="icon" disabled={!input.trim() || isGenerating}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
} 