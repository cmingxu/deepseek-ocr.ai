"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Page() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <a
        href="#overview"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-14 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <span className="text-xl font-semibold">DeepSeek-OCR</span>
          </div>
          <nav aria-label="Primary navigation" className="hidden md:flex items-center space-x-6">
            <a href="#overview" className="text-sm hover:text-primary">Overview</a>
            <a href="#features" className="text-sm hover:text-primary">Features</a>
            <a href="#modes" className="text-sm hover:text-primary">Modes</a>
            <a href="#prompts" className="text-sm hover:text-primary">Prompts</a>
            <a href="#getting-started" className="text-sm hover:text-primary">Get Started</a>
            <a href="#resources" className="text-sm hover:text-primary">Resources</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid gap-8 md:grid-cols-2 md:gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Contextual Optical Compression
            </h1>
            <p className="mt-4 text-muted-foreground text-lg">
              DeepSeek-OCR is a vision encoder for visual-text compression and structured understanding, optimized for vLLM and Transformers inference.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild>
                <a href="mailto:cming.xu@gmail.com?subject=DeepSeek-OCR%20Start%20Now" aria-label="Start Now via email">Start Now</a>
              </Button>
              <Button variant="outline" asChild>
                <Link href="https://github.com/deepseek-ai/DeepSeek-OCR" target="_blank" rel="noopener noreferrer">
                  GitHub Repo
                </Link>
              </Button>
            </div>
          </div>
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Highlights</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                  <li>Dual inference: vLLM and Transformers</li>
                  <li>Memory-efficient attention and BF16 support</li>
                  <li>Native and dynamic compression modes</li>
                  <li>Promptable and structured outputs</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section id="overview" aria-labelledby="overview-title" className="border-t">
        <div className="container mx-auto px-4 py-12">
          <h2 id="overview-title" className="text-2xl md:text-3xl font-semibold">Overview</h2>
          <p className="mt-3 text-muted-foreground">
            DeepSeek-OCR compresses and encodes visual content with contextual understanding. It supports both native and dynamic modes depending on the task.
          </p>
        </div>
      </section>

      {/* Features */}
      <section id="features" aria-labelledby="features-title" className="border-t">
        <div className="container mx-auto px-4 py-12">
          <h2 id="features-title" className="text-2xl md:text-3xl font-semibold">Features</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Inference</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                  <li>vLLM and Transformers backends</li>
                  <li>Flash Attention and BF16 optimizations</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Compression Modes</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                  <li>Native: fixed ratio compression</li>
                  <li>Dynamic: task-driven adaptive compression</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Modes */}
      <section id="modes" aria-labelledby="modes-title" className="border-t">
        <div className="container mx-auto px-4 py-12">
          <h2 id="modes-title" className="text-2xl md:text-3xl font-semibold">Supported Modes</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Native</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Fixed ratio compression for predictable throughput.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Dynamic</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Adaptive compression guided by prompts or tasks.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Promptable</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Structured outputs controllable via prompt patterns.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Prompts */}
      <section id="prompts" aria-labelledby="prompts-title" className="border-t">
        <div className="container mx-auto px-4 py-12">
          <h2 id="prompts-title" className="text-2xl md:text-3xl font-semibold">Prompt Examples</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Table Extraction</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="rounded-md bg-muted p-4 text-sm overflow-x-auto"><code>{`Extract table rows and return JSON with headers and values.`}</code></pre>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Layout Understanding</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="rounded-md bg-muted p-4 text-sm overflow-x-auto"><code>{`Identify headings, paragraphs, and figures with bounding boxes.`}</code></pre>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Getting Started */}
      <section id="getting-started" aria-labelledby="getting-title" className="border-t">
        <div className="container mx-auto px-4 py-12">
          <h2 id="getting-title" className="text-2xl md:text-3xl font-semibold">Get Started</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Install</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="rounded-md bg-muted p-4 text-sm overflow-x-auto"><code>{`pip install deepseek-ocr`}</code></pre>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Python Inference</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="rounded-md bg-muted p-4 text-sm overflow-x-auto"><code>{`from deepseek_ocr import encode
img = load_image("doc.png")
print(encode(img))`}</code></pre>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section id="resources" aria-labelledby="resources-title" className="border-t">
        <div className="container mx-auto px-4 py-12">
          <h2 id="resources-title" className="text-2xl md:text-3xl font-semibold">Resources</h2>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li>
              <a
                href="https://github.com/deepseek-ai/DeepSeek-OCR"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                GitHub Repository
              </a>
            </li>
          </ul>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="container mx-auto px-4 py-6 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} DeepSeek. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
