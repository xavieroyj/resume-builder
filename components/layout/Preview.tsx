"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useResumeStore } from "@/lib/store/resume";
import { MinimalTemplate } from "@/components/templates/MinimalTemplate";
import { ClassicTemplate } from "@/components/templates/ClassicTemplate";
import { ModernTemplate } from "@/components/templates/ModernTemplate";

interface PreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function Preview({ className }: PreviewProps) {
  const { selectedTemplate, personalInfo, workExperience, education, skills, certifications } = useResumeStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  // Update scale when content changes or window resizes
  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current && contentRef.current) {
        const containerHeight = containerRef.current.clientHeight - 64; // Subtract padding
        const contentHeight = contentRef.current.scrollHeight;
        const newScale = Math.min(containerHeight / contentHeight, 1);
        setScale(newScale);
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);

    return () => {
      window.removeEventListener('resize', updateScale);
    };
  }, [personalInfo, workExperience, education, skills, certifications, selectedTemplate]);

  const renderTemplate = () => {
    const props = {
      personalInfo,
      workExperience,
      education,
      skills,
      certifications,
    };

    switch (selectedTemplate) {
      case 'minimal':
        return <MinimalTemplate {...props} />;
      case 'classic':
        return <ClassicTemplate {...props} />;
      case 'modern':
        return <ModernTemplate {...props} />;
      default:
        return <MinimalTemplate {...props} />;
    }
  };

  return (
    <div 
      ref={containerRef}
      className={cn(
        "flex-1 h-full bg-gray-50",
        "print:bg-white print:h-auto print:overflow-visible",
        className
      )}
    >
      {/* Container for centering */}
      <div className={cn(
        "h-full flex items-center justify-center p-8",
        "print:block print:p-0"
      )}>
        {/* Content wrapper with scaling */}
        <div 
          ref={contentRef}
          className={cn(
            "w-full max-w-[850px] bg-white shadow-lg origin-center",
            "transition-transform duration-200 ease-in-out",
            "print:shadow-none print:max-w-none print:[transform:none!important]"
          )}
          style={{ transform: `scale(${scale})` }}
        >
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
} 