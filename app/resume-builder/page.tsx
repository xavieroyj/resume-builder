import { Preview } from "@/components/layout/Preview";
import { Sidebar } from "@/components/layout/Sidebar";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Resume Builder - ATS-Friendly Resume Creator",
    description: "Create professional, ATS-compliant resumes with real-time preview",
};

export default function ResumeBuilder() {
    return (
        <div className="antialiased h-screen print:p-0 print:m-0">
            <ResizablePanelGroup direction="horizontal" className="h-full print:block print:h-auto">
                <ResizablePanel
                    defaultSize={30}
                    minSize={25}
                    maxSize={40}
                    className="min-w-[320px] print:hidden h-screen overflow-y-auto"
                >
                    <Sidebar />
                </ResizablePanel>
                
                <ResizableHandle className="print:hidden" withHandle />
                <ResizablePanel
                    defaultSize={70}
                    className="print:block print:w-full print:max-w-none h-screen overflow-y-auto"
                >
                    <Preview />
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
}