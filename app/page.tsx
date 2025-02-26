import { Sidebar } from "@/components/layout/Sidebar";
import { Preview } from "@/components/layout/Preview";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export default function HomePage() {
  return (
    <ResizablePanelGroup 
      direction="horizontal" 
      className="h-full print:block print:h-auto"
    >
      <ResizablePanel
        defaultSize={30}
        minSize={25}
        maxSize={40}
        className="min-w-[320px] print:hidden"
      >
        <Sidebar />
      </ResizablePanel>
      <ResizableHandle className="print:hidden" withHandle />
      <ResizablePanel 
        defaultSize={70}
        className="print:block print:w-full print:max-w-none"
      >
        <Preview />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
