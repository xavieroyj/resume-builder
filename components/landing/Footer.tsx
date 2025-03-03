import { FileText } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-8 border-t">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <FileText className="h-5 w-5 text-primary" />
            <span className="font-semibold">ResumeBuilder</span>
          </div>
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ResumeBuilder. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
} 