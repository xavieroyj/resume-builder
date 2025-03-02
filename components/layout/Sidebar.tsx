"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
import { LucideIcon } from "lucide-react";

// Define section type
type SectionConfig = {
  id: string;
  title: string;
  icon: LucideIcon;
  component: React.ReactNode;
};

// Reusable SidebarSection component
const SidebarSection = ({
  section,
  isActive,
}: {
  section: SectionConfig;
  isActive: boolean;
}) => {
  return (
    <AccordionItem 
      value={section.id} 
      className={cn(
        "border rounded-lg overflow-hidden transition-all duration-200",
        isActive ? "border-primary/50 shadow-md" : "hover:border-primary/20"
      )}
    >
      <AccordionTrigger 
        className={cn(
          "px-4 py-3 hover:no-underline", 
          isActive ? "bg-gradient-to-r from-secondary to-secondary/40" : ""
        )}
      >
        <div className="flex items-center gap-2">
          <section.icon className={cn(
            "h-4 w-4",
            isActive ? "text-primary" : "text-muted-foreground"
          )}/>
          <span className={cn(
            "font-medium",
            isActive ? "text-primary" : "text-muted-foreground"
          )}>{section.title}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pt-2 px-4 pb-4">
        {section.component}
      </AccordionContent>
    </AccordionItem>
  );
};

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [activeSection, setActiveSection] = useState("personal");
  const [isPrinting, setIsPrinting] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Define sections configuration
  const sections: SectionConfig[] = [
    {
      id: "personal",
      title: "Personal Information",
      icon: User,
      component: <PersonalInfoForm />
    },
    {
      id: "experience",
      title: "Work Experience",
      icon: Briefcase,
      component: <WorkExperienceForm />
    },
    {
      id: "education",
      title: "Education",
      icon: GraduationCap,
      component: <EducationForm />
    },
    {
      id: "certifications",
      title: "Licenses & Certifications",
      icon: Award,
      component: <CertificationForm />
    },
    {
      id: "skills",
      title: "Skills",
      icon: Wrench,
      component: <SkillsForm />
    }
  ];

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
            {sections.map(section => (
              <SidebarSection 
                key={section.id} 
                section={section} 
                isActive={activeSection === section.id} 
              />
            ))}
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
      
      {/* Chat Sheet */}
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
