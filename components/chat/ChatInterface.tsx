"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Send, Loader2, Eye, Check, X } from "lucide-react";
import { useResumeStore } from "@/lib/store/resume";
import { useChat } from '@ai-sdk/react';
import ReactMarkdown from 'react-markdown';
import { cn } from "@/lib/utils";

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

  // Use the useChat hook from the Vercel AI SDK with tool support
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    status,
    error,
    addToolResult,
  } = useChat({
    api: "/api/chat",
    body: {
      resumeData
    },
    initialMessages: [
      {
        id: "1",
        role: "assistant",
        content: "Hello! I'm your resume assistant. How can I help you with your resume today?",
      },
    ],
    maxSteps: 5,
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

  // Render a message part based on its type
  const renderMessagePart = (part: any, index: number) => {
    if (part.type === 'text') {
      return (
        <div key={index} className="prose prose-sm dark:prose-invert max-w-none">
          <ReactMarkdown>{part.text}</ReactMarkdown>
        </div>
      );
    } else if (part.type === 'tool-invocation') {
      const toolInvocation = part.toolInvocation;
      
      switch (toolInvocation.state) {
        case 'partial-call':
          return (
            <div key={index} className="my-3 flex items-center gap-3">
              <div className="relative flex items-center gap-3 rounded-lg bg-secondary/10 px-4 py-3">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-foreground/20 animate-pulse" />
                  <div className="h-2 w-2 rounded-full bg-foreground/60" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">Using tool</p>
                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0 font-normal">
                      {toolInvocation.toolName}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">Processing request...</p>
                </div>
              </div>
            </div>
          );
          
        case 'call':
          if (toolInvocation.toolName === 'suggestImprovement') {
            return (
              <Card key={index} className="my-3">
                <CardContent className="p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <Badge variant="outline" className="h-7 w-7 rounded-full p-1.5">
                      <Eye className="h-4 w-4" />
                    </Badge>
                    <p className="text-sm font-medium">Suggested Improvement</p>
                  </div>
                  <p className="mb-3 text-sm text-muted-foreground pl-9">{toolInvocation.args.suggestion}</p>
                  <div className="flex gap-2 pl-9">
                    <Button 
                      size="sm" 
                      variant="default"
                      onClick={() => addToolResult({
                        toolCallId: toolInvocation.toolCallId,
                        result: { accepted: true }
                      })}
                    >
                      Apply
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => addToolResult({
                        toolCallId: toolInvocation.toolCallId,
                        result: { accepted: false }
                      })}
                    >
                      Skip
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          }
          
          if (toolInvocation.toolName === 'askForDetails') {
            const [userInput, setUserInput] = useState('');
            
            return (
              <Card key={index} className="my-3">
                <CardContent className="p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <Badge variant="outline" className="h-7 w-7 rounded-full p-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                      </svg>
                    </Badge>
                    <p className="text-sm font-medium">{toolInvocation.args.question}</p>
                  </div>
                  <div className="flex flex-col gap-2 pl-9">
                    <Input
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      placeholder="Type your answer..."
                      className="text-sm"
                    />
                    <Button 
                      size="sm" 
                      className="self-end"
                      disabled={!userInput.trim()}
                      onClick={() => {
                        addToolResult({
                          toolCallId: toolInvocation.toolCallId,
                          result: { answer: userInput }
                        });
                        setUserInput('');
                      }}
                    >
                      Submit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          }
          
          return (
            <div key={index} className="my-3 flex items-center gap-3">
              <div className="relative flex items-center gap-3 rounded-lg bg-secondary/10 px-4 py-3">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-foreground/20 animate-pulse" />
                  <div className="h-2 w-2 rounded-full bg-foreground/60" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">Using tool</p>
                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0 font-normal">
                      {toolInvocation.toolName}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">Processing request...</p>
                </div>
              </div>
            </div>
          );
          
        case 'result':
          return (
            <div key={index} className="flex items-center gap-2 my-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Badge variant="secondary" className="gap-1 font-normal">
                  <Check className="h-3 w-3" />
                  Tool completed
                </Badge>
                <span className="text-[10px]">{toolInvocation.toolName}</span>
              </div>
            </div>
          );
      }
    }
    
    return null;
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-hidden" ref={scrollAreaRef}>
        <ScrollArea className="h-full">
          <div className="flex flex-col gap-3 p-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn("flex", 
                  message.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[85%] px-3 py-2 rounded-lg",
                    message.role === "user" 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-muted"
                  )}
                >
                  {message.role === "assistant" && message.parts ? (
                    <div className="space-y-3">
                      {message.parts.map((part, i) => renderMessagePart(part, i))}
                    </div>
                  ) : (
                    message.role === "assistant" ? (
                      <div className="prose prose-sm dark:prose-invert max-w-none">
                        <ReactMarkdown>{message.content}</ReactMarkdown>
                      </div>
                    ) : (
                      <p className="text-sm">{message.content}</p>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      <div className="border-t bg-background">
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 p-4 max-w-3xl mx-auto"
        >
          <Input
            ref={inputRef}
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message..."
            className="flex-1"
            disabled={isGenerating}
          />
          <Button 
            type="submit" 
            size="icon"
            disabled={!input.trim() || isGenerating}
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}

