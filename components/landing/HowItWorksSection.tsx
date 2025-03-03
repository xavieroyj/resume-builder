import { StepCard } from "./StepCard";
import { SectionHeading } from "./SectionHeading";

export function HowItWorksSection() {
  const steps = [
    {
      number: 1,
      title: "Fill in your details",
      description: "Enter your personal information, work experience, education, and skills in our easy-to-use form."
    },
    {
      number: 2,
      title: "Choose a template",
      description: "Select from our collection of professional templates that best suits your style and industry."
    },
    {
      number: 3,
      title: "Download your resume",
      description: "Preview your finished resume and download it as a PDF ready to send to employers."
    }
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <SectionHeading 
          title="How It Works"
          description="Create your professional resume in three simple steps"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <StepCard
              key={index}
              number={step.number}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 