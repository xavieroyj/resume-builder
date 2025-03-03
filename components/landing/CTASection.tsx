import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-16 md:py-24 bg-primary/5 border-y">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
            Ready to create your professional resume?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of job seekers who have successfully landed interviews with resumes created using our builder.
          </p>
          <Link href="/resume-builder">
            <Button size="lg" className="font-medium text-lg px-8">
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
} 