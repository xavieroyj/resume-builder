import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileText, CheckCircle } from "lucide-react";
import { ResumePreview } from "./ResumePreview";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[40%] -right-[30%] h-[800px] w-[800px] rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute -bottom-[40%] -left-[30%] h-[800px] w-[800px] rounded-full bg-primary/5 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              ATS-Friendly Resume Builder
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Create a resume that <span className="text-primary">gets you hired</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Build professional, tailored resumes in minutes with our easy-to-use builder. 
              Stand out to recruiters and pass ATS systems with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/resume-builder">
                <Button size="lg" className="w-full sm:w-auto font-medium">
                  <FileText className="mr-2 h-5 w-5" />
                  Create Your Resume
                </Button>
              </Link>
              <Link href="#features">
                <Button size="lg" variant="outline" className="w-full sm:w-auto font-medium">
                  See Features
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle className="h-4 w-4 text-primary" />
              <span>No credit card required</span>
              <span className="mx-2">•</span>
              <CheckCircle className="h-4 w-4 text-primary" />
              <span>Free to use</span>
            </div>
          </div>
          <ResumePreview />
        </div>
      </div>
    </section>
  );
} 