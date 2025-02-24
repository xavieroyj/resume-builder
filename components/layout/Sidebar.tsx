"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FormsContainer } from "./FormsContainer";
import { Download } from "lucide-react";
import { TemplateSelector } from "../templates/TemplateSelector";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [activeSection, setActiveSection] = useState("personal");
  const [isPrinting, setIsPrinting] = useState(false);

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
    <div className={cn("flex flex-col h-full border-r print:hidden", className)}>
      {/* Fixed header */}
      <div className="px-3 py-4 border-b">
        <h2 className="px-4 text-lg font-semibold">Resume Builder</h2>
        <div className="space-y-1 mt-2">
          <Button
            variant={activeSection === "personal" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveSection("personal")}
          >
            <span>Personal Information</span>
          </Button>
          <Button
            variant={activeSection === "experience" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveSection("experience")}
          >
            <span>Work Experience</span>
          </Button>
          <Button
            variant={activeSection === "education" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveSection("education")}
          >
            <span>Education</span>
          </Button>
          <Button
            variant={activeSection === "certifications" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveSection("certifications")}
          >
            <span>Licenses & Certifications</span>
          </Button>
          <Button
            variant={activeSection === "skills" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveSection("skills")}
          >
            <span>Skills</span>
          </Button>
        </div>
      </div>

      {/* Scrollable form area */}
      <div className="flex-1 overflow-hidden">
        <FormsContainer activeSection={activeSection} />
      </div>

      {/* Fixed footer */}
      <div className="border-t p-4 space-y-4">
        <TemplateSelector />
        <Button 
          variant="default" 
          className="w-full justify-center"
          onClick={handleDownload}
          disabled={isPrinting}
        >
          <Download className="w-4 h-4 mr-2" />
          <span>{isPrinting ? 'Preparing PDF...' : 'Download PDF'}</span>
        </Button>
      </div>
    </div>
  );
} 