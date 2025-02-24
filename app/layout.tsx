import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { Preview } from "@/components/layout/Preview";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Resume Builder - ATS-Friendly Resume Creator",
  description: "Create professional, ATS-compliant resumes with real-time preview",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased h-full print:p-0 print:m-0`}>
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
      </body>
    </html>
  );
}
