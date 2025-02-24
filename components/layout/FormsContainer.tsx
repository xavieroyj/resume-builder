"use client";

import { PersonalInfoForm } from "@/components/forms/PersonalInfoForm";
import { WorkExperienceForm } from "@/components/forms/WorkExperienceForm";
import { EducationForm } from "@/components/forms/EducationForm";
import { SkillsForm } from "@/components/forms/SkillsForm";
import { CertificationForm } from "@/components/forms/CertificationForm";
import { ScrollArea } from "@/components/ui/scroll-area";

interface FormsContainerProps {
  activeSection: string;
}

export function FormsContainer({ activeSection }: FormsContainerProps) {
  return (
    <ScrollArea className="h-full">
      <div className="px-6 py-4">
        {activeSection === "personal" && <PersonalInfoForm />}
        {activeSection === "experience" && <WorkExperienceForm />}
        {activeSection === "education" && <EducationForm />}
        {activeSection === "certifications" && <CertificationForm />}
        {activeSection === "skills" && <SkillsForm />}
        {/* Other form sections will be added here */}
      </div>
    </ScrollArea>
  );
} 