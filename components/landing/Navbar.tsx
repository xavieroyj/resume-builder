import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileText, ArrowRight } from "lucide-react";

export function Navbar() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">ResumeBuilder</span>
        </div>
        <Link href="/resume-builder">
          <Button variant="ghost" className="font-medium">
            Get Started
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </header>
  );
} 