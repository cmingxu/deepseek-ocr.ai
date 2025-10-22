"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DotGrid from "@/components/ui/DotGrid";

export default function Page() {
  const sections = [
    "features",
    "prompts",
    "visualizations",
    "pricing",
  ];
  const [activeSection, setActiveSection] = useState<string>("features");
  const [isHeroImageOpen, setHeroImageOpen] = useState(false);
  const [vizOpen, setVizOpen] = useState(false);
  const [vizSrc, setVizSrc] = useState<string | null>(null);
  const [vizAlt, setVizAlt] = useState<string>("");

  useEffect(() => {
    const handler = () => {
      let currentId = sections[0];
      const offset = 120; // header height approx
      for (const id of sections) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= offset) currentId = id;
      }
      setActiveSection(currentId);
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("scroll", handler);
      window.removeEventListener("resize", handler);
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setHeroImageOpen(false);
        setVizOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <DotGrid dotSize={6} gap={34} proximity={110} baseColor="rgba(82,39,255,0.06)" activeColor="rgba(82,39,255,0.10)" shockRadius={80} shockStrength={0.2} />
      </div>
      <div className="relative z-10">
        <a
          href="#features"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
        >
          Skip to content
        </a>
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-14 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Image src="/logo.svg" alt="DeepSeek-OCR Logo" width={28} height={28} className="rounded" />
            <span className="text-xl font-semibold">DeepSeek-OCR.ai</span>
          </div>
          <nav aria-label="Primary navigation" className="hidden md:flex items-center space-x-6">
            <a
              href="#features"
              className="relative inline-flex items-center pb-3 text-sm transition-colors hover:text-primary after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-full after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left aria-[current=page]:text-primary aria-[current=page]:after:scale-x-100"
              aria-current={activeSection === "features" ? "page" : undefined}
            >
              Features
            </a>
            <a
              href="#prompts"
              className="relative inline-flex items-center pb-3 text-sm transition-colors hover:text-primary after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-full after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left aria-[current=page]:text-primary aria-[current=page]:after:scale-x-100"
              aria-current={activeSection === "prompts" ? "page" : undefined}
            >
              Usage
            </a>
            <a
              href="#pricing"
              className="relative inline-flex items-center pb-3 text-sm transition-colors hover:text-primary after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-full after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left aria-[current=page]:text-primary aria-[current=page]:after:scale-x-100"
              aria-current={activeSection === "pricing" ? "page" : undefined}
            >
              Pricing
            </a>
            <Link href="/docs" className="relative inline-flex items-center pb-3 text-sm transition-colors hover:text-primary after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-full after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">
              Docs
            </Link>
            <Button asChild size="sm" className="ml-2">
              <Link href="/app" aria-label="Open app page">
                Try Online
              </Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative container mx-auto px-4 py-16 md:py-24">

        <div className="relative z-10 grid gap-8 md:grid-cols-2 md:gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Convert <span className="text-primary">PDF and Image</span> to  <span className="text-primary">clean text and tables</span> with DeepSeek-OCR
            </h1>
            <p className="mt-4 text-muted-foreground text-lg">
              Extract text, tables, and layouts from scans, photos, and PDFs. Get accurate results in Markdown, CSV, or plain text — with cutting‑edge AI DeepSeek‑OCR.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/app" aria-label="Open app page">Try Online</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="https://github.com/deepseek-ai/DeepSeek-OCR" target="_blank" rel="noopener noreferrer">
                  For Developers
                </Link>
              </Button>
            </div>
          </div>
          <div>
            <button
              type="button"
              onClick={() => setHeroImageOpen(true)}
              aria-label="View large feature image"
              className="relative w-full aspect-[16/10] overflow-hidden rounded-lg border bg-muted cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <Image
                src="/fig1.png"
                alt="DeepSeek-OCR architecture overview"
                fill
                priority
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </button>
          </div>
        </div>
      </section>

      {isHeroImageOpen && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/60 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Large feature image modal"
          onClick={() => setHeroImageOpen(false)}
        >
          <div
            className="relative w-[min(90vw,1000px)] h-[min(80vh,700px)]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src="/fig1.png"
              alt="DeepSeek-OCR architecture overview (large)"
              fill
              sizes="(min-width: 768px) 80vw, 90vw"
              className="object-contain rounded-lg"
            />
            <button
              type="button"
              onClick={() => setHeroImageOpen(false)}
              className="absolute top-2 right-2 rounded-md border bg-background/80 px-2 py-1 text-sm hover:bg-background"
              aria-label="Close"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Features */}
      <section id="features" aria-labelledby="features-title" className="border-t">
        <div className="container mx-auto px-4 py-12">
          <h2 id="features-title" className="text-2xl md:text-3xl font-semibold">Features</h2>
          <p className="mt-3 text-muted-foreground">Everything you need to turn images and PDFs into usable text.</p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Dual Inference Backends */}
            <Card className="group relative overflow-hidden rounded-xl border bg-card shadow-sm transition hover:shadow-md hover:border-primary/40">
              <CardHeader className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-lg border border-primary/20 bg-primary/10 text-primary">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <path d="M13 2 L3 14 h7 l-1 8 12-14 h-7 l1-6" />
                  </svg>
                </div>
                <CardTitle className="text-base">Fast extraction</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Processes pages quickly and keeps formatting stable for consistent results.</p>
              </CardContent>
            </Card>

            {/* Memory‑Efficient Attention */}
            <Card className="group relative overflow-hidden rounded-xl border bg-card shadow-sm transition hover:shadow-md hover:border-primary/40">
              <CardHeader className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-lg border border-primary/20 bg-primary/10 text-primary">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <rect x="3" y="4" width="18" height="16" rx="2" ry="2" />
                    <path d="M7 8 h10 M7 12 h10 M7 16 h6" />
                  </svg>
                </div>
                <CardTitle className="text-base">Works on long documents</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Handles multi‑page PDFs and large scans without skipping content.</p>
              </CardContent>
            </Card>

            {/* Compression Modes */}
            <Card className="group relative overflow-hidden rounded-xl border bg-card shadow-sm transition hover:shadow-md hover:border-primary/40">
              <CardHeader className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-lg border border-primary/20 bg-primary/10 text-primary">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <line x1="4" y1="6" x2="20" y2="6" />
                    <circle cx="8" cy="6" r="2" />
                    <line x1="4" y1="12" x2="20" y2="12" />
                    <circle cx="14" cy="12" r="2" />
                    <line x1="4" y1="18" x2="20" y2="18" />
                    <circle cx="10" cy="18" r="2" />
                  </svg>
                </div>
                <CardTitle className="text-base">Lower cost with fewer tokens</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Efficient processing uses fewer tokens so you pay less.</p>
              </CardContent>
            </Card>

            {/* Promptable Structured Outputs */}
            <Card className="group relative overflow-hidden rounded-xl border bg-card shadow-sm transition hover:shadow-md hover:border-primary/40">
              <CardHeader className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-lg border border-primary/20 bg-primary/10 text-primary">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <path d="M7 7 c0-1 1-2 2-2 h6 c1 0 2 1 2 2 v10 c0 1-1 2-2 2 H9 c-1 0-2-1-2-2 z" />
                    <path d="M9 10 h6 M9 14 h6" />
                  </svg>
                </div>
                <CardTitle className="text-base">Accurate tables and layout</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Extracts clean CSV tables and preserves page structure where it matters.</p>
              </CardContent>
            </Card>

            {/* Table & Layout Extraction */}
            <Card className="group relative overflow-hidden rounded-xl border bg-card shadow-sm transition hover:shadow-md hover:border-primary/40">
              <CardHeader className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-lg border border-primary/20 bg-primary/10 text-primary">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <rect x="3" y="4" width="18" height="16" rx="2" ry="2" />
                    <path d="M3 10 h18 M9 4 v16 M15 4 v16" />
                  </svg>
                </div>
                <CardTitle className="text-base">Handles complex layouts</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Understands columns, headers, captions, and figures for clean output.</p>
              </CardContent>
            </Card>

            {/* Multilingual OCR */}
            <Card className="group relative overflow-hidden rounded-xl border bg-card shadow-sm transition hover:shadow-md hover:border-primary/40">
              <CardHeader className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-lg border border-primary/20 bg-primary/10 text-primary">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M3 12 h18 M12 3 v18 M5 8 h14 M5 16 h14" />
                  </svg>
                </div>
                <CardTitle className="text-base">Multilingual text</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Recognizes English, Chinese, and mixed documents with proper punctuation.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Prompts */}
      <section id="prompts" aria-labelledby="prompts-title" className="border-t">
        <div className="container mx-auto px-4 py-12">
          <h2 id="prompts-title" className="text-2xl md:text-3xl font-semibold">How to use</h2>
          <p className="mt-3 text-muted-foreground">Quick starters for common OCR tasks and grounding.</p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex items-center justify-between">
                <CardTitle className="text-base">Document → Markdown</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => navigator.clipboard.writeText(`# document: <image>\n<|grounding|>Convert the document to markdown.`)}>Copy</Button>
              </CardHeader>
              <CardContent>
                <pre className="rounded-md bg-muted p-4 text-sm overflow-x-auto"><code>{`# document: <image>\n<|grounding|>Convert the document to markdown.`}</code></pre>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex items-center justify-between">
                <CardTitle className="text-base">Other Image OCR</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => navigator.clipboard.writeText(`# other image: <image>\n<|grounding|>OCR this image.`)}>Copy</Button>
              </CardHeader>
              <CardContent>
                <pre className="rounded-md bg-muted p-4 text-sm overflow-x-auto"><code>{`# other image: <image>\n<|grounding|>OCR this image.`}</code></pre>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex items-center justify-between">
                <CardTitle className="text-base">Free OCR (no layout)</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => navigator.clipboard.writeText(`# without layouts: <image>\nFree OCR.`)}>Copy</Button>
              </CardHeader>
              <CardContent>
                <pre className="rounded-md bg-muted p-4 text-sm overflow-x-auto"><code>{`# without layouts: <image>\nFree OCR.`}</code></pre>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex items-center justify-between">
                <CardTitle className="text-base">Parse Figure in Document</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => navigator.clipboard.writeText(`# figures in document: <image>\nParse the figure.`)}>Copy</Button>
              </CardHeader>
              <CardContent>
                <pre className="rounded-md bg-muted p-4 text-sm overflow-x-auto"><code>{`# figures in document: <image>\nParse the figure.`}</code></pre>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex items-center justify-between">
                <CardTitle className="text-base">General Description</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => navigator.clipboard.writeText(`# general: <image>\nDescribe this image in detail.`)}>Copy</Button>
              </CardHeader>
              <CardContent>
                <pre className="rounded-md bg-muted p-4 text-sm overflow-x-auto"><code>{`# general: <image>\nDescribe this image in detail.`}</code></pre>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex items-center justify-between">
                <CardTitle className="text-base">Locate Reference</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => navigator.clipboard.writeText(`# rec: <image>\nLocate <|ref|>xxxx<|/ref|> in the image.`)}>Copy</Button>
              </CardHeader>
              <CardContent>
                <pre className="rounded-md bg-muted p-4 text-sm overflow-x-auto"><code>{`# rec: <image>\nLocate <|ref|>xxxx<|/ref|> in the image.`}</code></pre>
              </CardContent>
            </Card>

          </div>
        </div>
      </section>


      {/* Visualizations */}
      <section id="visualizations" aria-labelledby="visualizations-title" className="border-t">
        <div className="container mx-auto px-4 py-12">
          <h2 id="visualizations-title" className="text-2xl md:text-3xl font-semibold">Visualizations</h2>
          <p className="mt-3 text-muted-foreground">Sample OCR visualizations and outputs from DeepSeek‑OCR.</p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <button
              type="button"
              onClick={() => { setVizSrc('/show1.jpg'); setVizAlt('OCR visualization 1'); setVizOpen(true); }}
              aria-label="View large visualization 1"
              className="relative aspect-[4/3] overflow-hidden rounded-lg border bg-muted cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <Image src="/show1.jpg" alt="OCR visualization 1" fill className="object-cover" sizes="(max-width: 1024px) 50vw, 25vw" />
            </button>
            <button
              type="button"
              onClick={() => { setVizSrc('/show2.jpg'); setVizAlt('OCR visualization 2'); setVizOpen(true); }}
              aria-label="View large visualization 2"
              className="relative aspect-[4/3] overflow-hidden rounded-lg border bg-muted cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <Image src="/show2.jpg" alt="OCR visualization 2" fill className="object-cover" sizes="(max-width: 1024px) 50vw, 25vw" />
            </button>
            <button
              type="button"
              onClick={() => { setVizSrc('/show3.jpg'); setVizAlt('OCR visualization 3'); setVizOpen(true); }}
              aria-label="View large visualization 3"
              className="relative aspect-[4/3] overflow-hidden rounded-lg border bg-muted cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <Image src="/show3.jpg" alt="OCR visualization 3" fill className="object-cover" sizes="(max-width: 1024px) 50vw, 25vw" />
            </button>
            <button
              type="button"
              onClick={() => { setVizSrc('/show4.jpg'); setVizAlt('OCR visualization 4'); setVizOpen(true); }}
              aria-label="View large visualization 4"
              className="relative aspect-[4/3] overflow-hidden rounded-lg border bg-muted cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <Image src="/show4.jpg" alt="OCR visualization 4" fill className="object-cover" sizes="(max-width: 1024px) 50vw, 25vw" />
            </button>
          </div>
        </div>
      </section>

      {/* Real‑World Example */}
      <section id="real-world-example" aria-labelledby="real-world-title" className="border-t">
        <div className="container mx-auto px-4 py-12">
          <h2 id="real-world-title" className="text-2xl md:text-3xl font-semibold">Real‑World Example</h2>
          <p className="mt-3 text-muted-foreground">A practical document image demonstrating DeepSeek‑OCR on real input.</p>
          <div className="mt-6">
            <button
              type="button"
              onClick={() => { setVizSrc('/real-world-example.jpg'); setVizAlt('Real world example'); setVizOpen(true); }}
              aria-label="View large real-world example"
              className="relative block w-full aspect-[4/3] overflow-hidden rounded-lg border bg-muted cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <Image src="/real-world-example.jpg" alt="Real world document example" fill className="object-cover" sizes="100vw" />
            </button>
          </div>
        </div>
      </section>

      {vizOpen && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/60 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Large visualization image"
          onClick={() => setVizOpen(false)}
        >
          <div
            className="relative w-[min(90vw,1000px)] h-[min(80vh,700px)]"
            onClick={(e) => e.stopPropagation()}
          >
            {vizSrc && (
              <Image
                src={vizSrc}
                alt={vizAlt || "Large visualization"}
                fill
                sizes="(min-width: 768px) 80vw, 90vw"
                className="object-contain rounded-lg"
              />
            )}
            <button
              type="button"
              onClick={() => setVizOpen(false)}
              className="absolute top-2 right-2 rounded-md border bg-background/80 px-2 py-1 text-sm hover:bg-background"
              aria-label="Close"
            >
              Close
            </button>
          </div>
        </div>
      )}


      {/* Pricing */}
      <section id="pricing" aria-labelledby="pricing-title" className="border-t">
        <div className="container mx-auto px-4 py-12">
          <h2 id="pricing-title" className="text-2xl md:text-3xl font-semibold">Pricing</h2>
          <p className="mt-3 text-muted-foreground">Simple plans for online and API access.</p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Free */}
            <Card className="relative overflow-hidden rounded-xl border bg-card shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">Free</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">$0</div>
                <p className="mt-1 text-xs text-muted-foreground">10 uses/day (online + API)</p>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li>• Image/PDF OCR</li>
                  <li>• Output formats: Text, Markdown, CSV</li>
                  <li>• Max file size: 10MB</li>
                  <li>• Rate‑limited queue</li>
                  <li>• Community support</li>
                </ul>
                <Button asChild className="mt-6 w-full">
                  <Link href="/app">Start Free</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Pro */}
            <Card className="relative overflow-hidden rounded-xl border bg-card shadow-sm ring-1 ring-primary/30">
              <CardHeader>
                <CardTitle className="text-base">Pro</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">$29</div>
                <p className="mt-1 text-xs text-muted-foreground">1000 uses (online + API)</p>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li>• Priority processing</li>
                  <li>• Larger files up to 25MB</li>
                  <li>• Batch uploads</li>
                  <li>• Email support</li>
                  <li>• Export formats: Text/Markdown/CSV</li>
                </ul>
                <Button className="mt-6 w-full">Get Pro</Button>
              </CardContent>
            </Card>

            {/* Enterprise */}
            <Card className="relative overflow-hidden rounded-xl border bg-card shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">Enterprise</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">Custom</div>
                <p className="mt-1 text-xs text-muted-foreground">Unlimited usage, SSO, SLA</p>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li>• Dedicated support & onboarding</li>
                  <li>• On‑prem or private cloud</li>
                  <li>• SSO/SAML, audit logs</li>
                  <li>• SOC 2 / GDPR alignment</li>
                  <li>• Custom models & regional routing</li>
                </ul>
                <Button asChild variant="outline" className="mt-6 w-full">
                  <a href="mailto:cming.xu@gmail.com?subject=DeepSeek-OCR%20Enterprise">Contact Sales</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
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
                <a
                  href="/DeepSeek_OCR_paper.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground underline-offset-4 hover:underline"
                  aria-label="Read the paper"
                >
                  Paper
                </a>
                <a
                  href="https://github.com/deepseek-ai/DeepSeek-OCR"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground underline-offset-4 hover:underline"
                  aria-label="GitHub"
                >
                  GitHub
                </a>
                <a
                  href="https://deepseek.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground underline-offset-4 hover:underline"
                  aria-label="Website"
                >
                  Website
                </a>
              </div>
            </div>

            {/* About */}
            <div>
              <h3 className="text-sm font-semibold">About</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li><Link href="#features" className="hover:text-foreground">What is DeepSeek‑OCR</Link></li>
                <li>
                  <a href="/DeepSeek_OCR_paper.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">Research Paper</a>
                </li>
                <li><Link href="#features" className="hover:text-foreground">Features</Link></li>
                <li><Link href="#resources" className="hover:text-foreground">Resources</Link></li>
                <li><Link href="#getting-started" className="hover:text-foreground">Support</Link></li>
              </ul>
            </div>

            {/* Solutions */}
            <div>
              <h3 className="text-sm font-semibold">Solutions</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li><Link href="#prompts" className="hover:text-foreground">Document OCR</Link></li>
                <li><Link href="#prompts" className="hover:text-foreground">Table Extraction</Link></li>
                <li><Link href="#prompts" className="hover:text-foreground">Layout Analysis</Link></li>
                <li><Link href="#prompts" className="hover:text-foreground">Key‑Value Parsing</Link></li>
                <li><Link href="#features" className="hover:text-foreground">Native & Dynamic Modes</Link></li>
              </ul>
            </div>

            {/* Info */}
            <div>
              <h3 className="text-sm font-semibold">Info</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li><Link href="#resources" className="hover:text-foreground">Resource Hub</Link></li>
                <li><Link href="#getting-started" className="hover:text-foreground">FAQ</Link></li>
                <li><a href="#" className="hover:text-foreground">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-foreground">Terms of Service</a></li>
                <li><a href="#" className="hover:text-foreground">License</a></li>
              </ul>
            </div>

            {/* Online OCR Tools */}
            <div>
              <h3 className="text-sm font-semibold">Online OCR Tools</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li><Link href="#getting-started" className="hover:text-foreground">Image to Text</Link></li>
                <li><Link href="#getting-started" className="hover:text-foreground">PDF to Text</Link></li>
                <li><Link href="#prompts" className="hover:text-foreground">Table to CSV</Link></li>
                <li><Link href="#prompts" className="hover:text-foreground">Layout to JSON</Link></li>
                <li><Link href="#prompts" className="hover:text-foreground">OCR Enhancer</Link></li>
                <li><Link href="#prompts" className="hover:text-foreground">Receipt Parser</Link></li>
                <li><Link href="#prompts" className="hover:text-foreground">Form KV Extractor</Link></li>
                <li><Link href="#prompts" className="hover:text-foreground">Document Converter</Link></li>
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
    </main>
  );
}
