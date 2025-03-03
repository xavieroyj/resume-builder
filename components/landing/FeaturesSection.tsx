import { Layout, FileCheck, Zap, Download, CheckCircle } from "lucide-react";
import { FeatureCard } from "./FeatureCard";
import { SectionHeading } from "./SectionHeading";

export function FeaturesSection() {
  const features = [
    {
      icon: Layout,
      title: "Professional Templates",
      description: "Choose from multiple professionally designed templates that are proven to impress recruiters."
    },
    {
      icon: FileCheck,
      title: "ATS-Optimized",
      description: "Our templates are designed to pass through Applicant Tracking Systems with flying colors."
    },
    {
      icon: Zap,
      title: "Real-time Preview",
      description: "See changes instantly as you type with our live preview feature. What you see is what you get."
    },
    {
      icon: Download,
      title: "Easy Export",
      description: "Download your finished resume as a PDF with one click, ready to send to employers."
    },
    {
      icon: CheckCircle,
      title: "Guided Process",
      description: "Our step-by-step process makes it easy to create a complete, professional resume without missing anything important."
    }
  ];

  return (
    <section id="features" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <SectionHeading 
          title="Everything you need to create a standout resume"
          description="Our resume builder combines powerful features with ease of use"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              className={index === 4 ? "md:col-span-2 lg:col-span-1" : ""}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 