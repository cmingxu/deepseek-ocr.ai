import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import DotGrid from "@/components/ui/DotGrid";

export const metadata: Metadata = {
  alternates: {
    canonical: "/app",
  },
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <DotGrid dotSize={6} gap={34} proximity={110} baseColor="rgba(82,39,255,0.06)" activeColor="rgba(82,39,255,0.10)" shockRadius={80} shockStrength={0.2} />
      </div>
      <div className="relative z-10">
        {/* Header (match homepage) */}
        <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto flex h-14 items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <Image src="/logo.svg" alt="DeepSeek-OCR Logo" width={28} height={28} className="rounded" />
              <span className="text-xl font-semibold">DeepSeek-OCR.ai</span>
            </div>
            <nav aria-label="Primary navigation" className="hidden md:flex items-center space-x-6">
              <Link href="/#features" className="relative inline-flex items-center pb-3 text-sm transition-colors hover:text-primary after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-full after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">Features</Link>
              <Link href="/#prompts" className="relative inline-flex items-center pb-3 text-sm transition-colors hover:text-primary after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-full after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">Usage</Link>
              <Link href="/#pricing" className="relative inline-flex items-center pb-3 text-sm transition-colors hover:text-primary after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-full after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">Pricing</Link>
              <Link href="/docs" className="relative inline-flex items-center pb-3 text-sm transition-colors hover:text-primary after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-full after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">Docs</Link>
              <Button asChild size="sm" className="ml-2">
                <Link href="/app" aria-label="Open app page">Try Online</Link>
              </Button>
            </nav>
          </div>
        </header>

        {/* Page content */}
        {children}

        {/* Footer (match homepage) */}
        <footer className="border-t">
          <div className="container mx-auto px-4 py-12">
            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-5">
              {/* Brand */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Image src="/logo.svg" alt="DeepSeek-OCR" width={28} height={28} />
                  <span className="text-base font-semibold">DeepSeek-OCR</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Compression-guided OCR for documents, tables, and complex layouts.
                </p>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <a href="/DeepSeek_OCR_paper.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-foreground underline-offset-4 hover:underline" aria-label="Read the paper">Paper</a>
                  <a href="https://github.com/deepseek-ai/DeepSeek-OCR" target="_blank" rel="noopener noreferrer" className="hover:text-foreground underline-offset-4 hover:underline" aria-label="GitHub">GitHub</a>
                  <a href="https://deepseek.ai" target="_blank" rel="noopener noreferrer" className="hover:text-foreground underline-offset-4 hover:underline" aria-label="Website">Website</a>
                </div>
              </div>

              {/* About */}
              <div>
                <h3 className="text-sm font-semibold">About</h3>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <li><Link href="/#features" className="hover:text-foreground">What is DeepSeek‑OCR</Link></li>
                  <li><a href="/DeepSeek_OCR_paper.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">Research Paper</a></li>
                  <li><Link href="/#features" className="hover:text-foreground">Features</Link></li>
                  <li><Link href="/#resources" className="hover:text-foreground">Resources</Link></li>
                  <li><Link href="/#getting-started" className="hover:text-foreground">Support</Link></li>
                </ul>
              </div>

              {/* Solutions */}
              <div>
                <h3 className="text-sm font-semibold">Solutions</h3>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <li><Link href="/#prompts" className="hover:text-foreground">Document OCR</Link></li>
                  <li><Link href="/#prompts" className="hover:text-foreground">Table Extraction</Link></li>
                  <li><Link href="/#prompts" className="hover:text-foreground">Layout Analysis</Link></li>
                  <li><Link href="/#prompts" className="hover:text-foreground">Key‑Value Parsing</Link></li>
                  <li><Link href="/#features" className="hover:text-foreground">Native & Dynamic Modes</Link></li>
                </ul>
              </div>

              {/* Info */}
              <div>
                <h3 className="text-sm font-semibold">Info</h3>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <li><Link href="/#resources" className="hover:text-foreground">Resource Hub</Link></li>
                  <li><Link href="/#getting-started" className="hover:text-foreground">FAQ</Link></li>
                  <li><a href="#" className="hover:text-foreground">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-foreground">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-foreground">License</a></li>
                </ul>
              </div>

              {/* Online OCR Tools */}
              <div>
                <h3 className="text-sm font-semibold">Online OCR Tools</h3>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <li><Link href="/#getting-started" className="hover:text-foreground">Image to Text</Link></li>
                  <li><Link href="/#getting-started" className="hover:text-foreground">PDF to Text</Link></li>
                  <li><Link href="/#prompts" className="hover:text-foreground">Table to CSV</Link></li>
                  <li><Link href="/#prompts" className="hover:text-foreground">Layout to JSON</Link></li>
                  <li><Link href="/#prompts" className="hover:text-foreground">OCR Enhancer</Link></li>
                  <li><Link href="/#prompts" className="hover:text-foreground">Receipt Parser</Link></li>
                  <li><Link href="/#prompts" className="hover:text-foreground">Form KV Extractor</Link></li>
                  <li><Link href="/#prompts" className="hover:text-foreground">Document Converter</Link></li>
                </ul>
              </div>
            </div>

            <div className="mt-10 border-t pt-6 text-xs text-muted-foreground">
              <p>© {new Date().getFullYear()} DeepSeek‑OCR.ai. All rights reserved.</p>
              <p className="mt-2">This site is not affiliated with DeepSeek.com.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}