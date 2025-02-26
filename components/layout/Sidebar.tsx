"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Download, 
  User, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Wrench,
  FileText,
  MessageSquare
} from "lucide-react";
import { TemplateSelector } from "../templates/TemplateSelector";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ChatInterface } from "@/components/chat/ChatInterface";

// Import all form components
import { PersonalInfoForm } from "@/components/forms/PersonalInfoForm";
import { WorkExperienceForm } from "@/components/forms/WorkExperienceForm";
import { EducationForm } from "@/components/forms/EducationForm";
import { SkillsForm } from "@/components/forms/SkillsForm";
import { CertificationForm } from "@/components/forms/CertificationForm";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [activeSection, setActiveSection] = useState("personal");
  const [isPrinting, setIsPrinting] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleDownload = async () => {
    setIsPrinting(true);
    
    // Add print-only class to body
    document.body.classList.add('print-resume');
    
    try {
      // Trigger print dialog
      window.print();
    } finally {
      // Remove print-only class after printing
      document.body.classList.remove('print-resume');
      setIsPrinting(false);
    }
  };

  return (
    <div className={cn("flex flex-col h-full border-r shadow-sm print:hidden bg-background", className)}>
      {/* Header */}
      <div className="relative px-6 py-5 bg-gradient-to-r from-background to-muted">
        <h2 className="mb-1 text-xl font-bold flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary" />
          <span>Resume Builder</span>
        </h2>
        <p className="text-xs text-muted-foreground">Create your professional resume</p>
      </div>
      
      {/* Content area - Scrollable */}
      <ScrollArea className="flex-1">
        <div className="p-4">
          <Accordion 
            type="single" 
            defaultValue="personal" 
            collapsible 
            value={activeSection} 
            onValueChange={setActiveSection}
            className="space-y-4"
          >
            {/* Personal Information */}
            <AccordionItem 
              value="personal" 
              className={cn(
                "border rounded-lg overflow-hidden transition-all duration-200",
                activeSection === "personal" ? "border-primary/50 shadow-md" : "hover:border-primary/20"
              )}
            >
              <AccordionTrigger 
                className={cn(
                  "px-4 py-3 hover:no-underline", 
                  activeSection === "personal" ? "bg-gradient-to-r from-secondary to-secondary/40" : ""
                )}
              >
                <div className="flex items-center gap-2">
                  <User className={cn(
                    "h-4 w-4",
                    activeSection === "personal" ? "text-primary" : "text-muted-foreground"
                  )}/>
                  <span className={cn(
                    "font-medium",
                    activeSection === "personal" ? "text-primary" : "text-muted-foreground"
                  )}>Personal Information</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-2 px-4 pb-4">
                <PersonalInfoForm />
              </AccordionContent>
            </AccordionItem>

            {/* Work Experience */}
            <AccordionItem 
              value="experience"
              className={cn(
                "border rounded-lg overflow-hidden transition-all duration-200",
                activeSection === "experience" ? "border-primary/50 shadow-md" : "hover:border-primary/20"
              )}
            >
              <AccordionTrigger 
                className={cn(
                  "px-4 py-3 hover:no-underline", 
                  activeSection === "experience" ? "bg-gradient-to-r from-secondary to-secondary/40" : ""
                )}
              >
                <div className="flex items-center gap-2">
                  <Briefcase className={cn(
                    "h-4 w-4",
                    activeSection === "experience" ? "text-primary" : "text-muted-foreground"
                  )}/>
                  <span className={cn(
                    "font-medium",
                    activeSection === "experience" ? "text-primary" : "text-muted-foreground"
                  )}>Work Experience</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-2 px-4 pb-4">
                <WorkExperienceForm />
              </AccordionContent>
            </AccordionItem>

            {/* Education */}
            <AccordionItem 
              value="education"
              className={cn(
                "border rounded-lg overflow-hidden transition-all duration-200",
                activeSection === "education" ? "border-primary/50 shadow-md" : "hover:border-primary/20"
              )}
            >
              <AccordionTrigger 
                className={cn(
                  "px-4 py-3 hover:no-underline", 
                  activeSection === "education" ? "bg-gradient-to-r from-secondary to-secondary/40" : ""
                )}
              >
                <div className="flex items-center gap-2">
                  <GraduationCap className={cn(
                    "h-4 w-4",
                    activeSection === "education" ? "text-primary" : "text-muted-foreground"
                  )}/>
                  <span className={cn(
                    "font-medium",
                    activeSection === "education" ? "text-primary" : "text-muted-foreground"
                  )}>Education</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-2 px-4 pb-4">
                <EducationForm />
              </AccordionContent>
            </AccordionItem>

            {/* Certifications */}
            <AccordionItem 
              value="certifications"
              className={cn(
                "border rounded-lg overflow-hidden transition-all duration-200",
                activeSection === "certifications" ? "border-primary/50 shadow-md" : "hover:border-primary/20"
              )}
            >
              <AccordionTrigger 
                className={cn(
                  "px-4 py-3 hover:no-underline", 
                  activeSection === "certifications" ? "bg-gradient-to-r from-secondary to-secondary/40" : ""
                )}
              >
                <div className="flex items-center gap-2">
                  <Award className={cn(
                    "h-4 w-4",
                    activeSection === "certifications" ? "text-primary" : "text-muted-foreground"
                  )}/>
                  <span className={cn(
                    "font-medium",
                    activeSection === "certifications" ? "text-primary" : "text-muted-foreground"
                  )}>Licenses & Certifications</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-2 px-4 pb-4">
                <CertificationForm />
              </AccordionContent>
            </AccordionItem>

            {/* Skills */}
            <AccordionItem 
              value="skills"
              className={cn(
                "border rounded-lg overflow-hidden transition-all duration-200",
                activeSection === "skills" ? "border-primary/50 shadow-md" : "hover:border-primary/20"
              )}
            >
              <AccordionTrigger 
                className={cn(
                  "px-4 py-3 hover:no-underline", 
                  activeSection === "skills" ? "bg-gradient-to-r from-secondary to-secondary/40" : ""
                )}
              >
                <div className="flex items-center gap-2">
                  <Wrench className={cn(
                    "h-4 w-4",
                    activeSection === "skills" ? "text-primary" : "text-muted-foreground"
                  )}/>
                  <span className={cn(
                    "font-medium",
                    activeSection === "skills" ? "text-primary" : "text-muted-foreground"
                  )}>Skills</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-2 px-4 pb-4">
                <SkillsForm />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </ScrollArea>

      {/* Fixed footer */}
      <div className="border-t p-4 space-y-4 bg-gradient-to-b from-background to-muted/30">
        <div className="rounded-lg border bg-card p-3 shadow-sm">
          <h3 className="font-medium text-sm mb-2 text-muted-foreground">Template Style</h3>
          <TemplateSelector />
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="default" 
            className="flex-1 justify-center bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200 shadow-md hover:shadow-lg"
            onClick={handleDownload}
            disabled={isPrinting}
          >
            <Download className="w-4 h-4 mr-2" />
            <span>{isPrinting ? 'Preparing PDF...' : 'Download PDF'}</span>
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 rounded-full border-primary/20 hover:bg-primary/10 hover:text-primary transition-all duration-200"
            onClick={() => setIsChatOpen(true)}
          >
            <MessageSquare className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      {/* Chat Sheet will be added here */}
      <Sheet open={isChatOpen} onOpenChange={setIsChatOpen}>
        <SheetContent className="w-full sm:max-w-md md:max-w-lg p-0 flex flex-col">
          <SheetHeader className="px-6 py-4 border-b">
            <SheetTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              Resume Assistant
            </SheetTitle>
          </SheetHeader>
          <div className="flex-1 overflow-hidden">
            <ChatInterface />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
