"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Page() {
  const sections = [
    "features",
    "prompts",
    "getting-started",
    "visualizations",
    "resources",
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
              Prompts
            </a>
            <a
              href="#getting-started"
              className="relative inline-flex items-center pb-3 text-sm transition-colors hover:text-primary after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-full after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left aria-[current=page]:text-primary aria-[current=page]:after:scale-x-100"
              aria-current={activeSection === "getting-started" ? "page" : undefined}
            >
              Get Started
            </a>
            <a
              href="#resources"
              className="relative inline-flex items-center pb-3 text-sm transition-colors hover:text-primary after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-full after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left aria-[current=page]:text-primary aria-[current=page]:after:scale-x-100"
              aria-current={activeSection === "resources" ? "page" : undefined}
            >
              Resources
            </a>
            <Button asChild size="sm" className="ml-2">
              <a href="/DeepSeek_OCR_paper.pdf" download aria-label="DeepSeek OCR Paper">
                Download Paper
              </a>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid gap-8 md:grid-cols-2 md:gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              OCR your visual-text with DeepSeek-OCR
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
          <p className="mt-3 text-muted-foreground">Unified highlights and capabilities with clear icons and detailed descriptions.</p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Dual Inference Backends */}
            <Card className="group relative overflow-hidden rounded-xl border bg-card shadow-sm transition hover:shadow-md hover:border-primary/40">
              <CardHeader className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-lg border border-primary/20 bg-primary/10 text-primary">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <path d="M13 2 L3 14 h7 l-1 8 12-14 h-7 l1-6" />
                  </svg>
                </div>
                <CardTitle className="text-base">Dual Inference Backends</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Runs on both vLLM server and Hugging Face Transformers. Optimized for streaming and batch workloads with consistent outputs.</p>
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
                <CardTitle className="text-base">Memory‑Efficient Attention</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Flash Attention and BF16 reduce memory footprint while maintaining high throughput. Suitable for long documents and large batches.</p>
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
                <CardTitle className="text-base">Compression Modes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Choose between Native fixed‑ratio for predictable speed or Dynamic task‑guided compression for complex layouts and figures.</p>
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
                <CardTitle className="text-base">Promptable Structured Outputs</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Control outputs via prompt patterns: Markdown, CSV, JSON, key‑value pairs. Consistent fields and stable formatting.</p>
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
                <CardTitle className="text-base">Table & Layout Extraction</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Extract tables to CSV and page layout to JSON with bounding boxes. Works across documents, forms, and multi‑column pages.</p>
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
                <CardTitle className="text-base">Multilingual OCR</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Robust recognition across English, Chinese, and mixed documents with text normalization and punctuation handling.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Prompts */}
      <section id="prompts" aria-labelledby="prompts-title" className="border-t">
        <div className="container mx-auto px-4 py-12">
          <h2 id="prompts-title" className="text-2xl md:text-3xl font-semibold">Prompt Examples</h2>
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

            <Card>
              <CardHeader className="flex items-center justify-between">
                <CardTitle className="text-base">Chinese Text Example</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => navigator.clipboard.writeText(`# '先天下之忧而忧'`)}>Copy</Button>
              </CardHeader>
              <CardContent>
                <pre className="rounded-md bg-muted p-4 text-sm overflow-x-auto"><code>{`# '先天下之忧而忧'`}</code></pre>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Getting Started */}
      <section id="getting-started" aria-labelledby="getting-title" className="border-t">
        <div className="container mx-auto px-4 py-12">
          <h2 id="getting-title" className="text-2xl md:text-3xl font-semibold">Get Started</h2>
          <p className="mt-3 text-muted-foreground">
            Quick start: clone the repo, create the conda env (CUDA 11.8 + Torch 2.6.0), and install dependencies including Flash-Attn. Then choose a path below — vLLM (edit <code>config.py</code> and run the scripts) or Transformers (use the Python snippet). For details and updates, see{" "}
            <a href="https://github.com/deepseek-ai/DeepSeek-OCR" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              GitHub
            </a>.
          </p>
          <div className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Install</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="rounded-md bg-muted p-4 text-sm overflow-x-auto"><code>{`# Environment: CUDA 11.8 + torch 2.6.0
# Clone the repo
git clone https://github.com/deepseek-ai/DeepSeek-OCR.git

# Create and activate conda env
conda create -n deepseek-ocr python=3.12.9 -y
conda activate deepseek-ocr

# Install PyTorch (CUDA 11.8) and vLLM wheel
pip install torch==2.6.0 torchvision==0.21.0 torchaudio==2.6.0 --index-url https://download.pytorch.org/whl/cu118
pip install vllm-0.8.5+cu118-cp38-abi3-manylinux1_x86_64.whl

# Project requirements and Flash-Attn
pip install -r requirements.txt
pip install flash-attn==2.7.3 --no-build-isolation`}</code></pre>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>vLLM Inference</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="rounded-md bg-muted p-4 text-sm overflow-x-auto"><code>{`# Edit INPUT_PATH/OUTPUT_PATH and settings in:
# DeepSeek-OCR-master/DeepSeek-OCR-vllm/config.py

cd DeepSeek-OCR-master/DeepSeek-OCR-vllm

# Image streaming output
python run_dpsk_ocr_image.py

# PDF (e.g., ~2500 tokens/s on A100-40G)
python run_dpsk_ocr_pdf.py

# Batch eval for benchmarks
python run_dpsk_ocr_eval_batch.py`}</code></pre>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Transformers Inference</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="rounded-md bg-muted p-4 text-sm overflow-x-auto"><code>{`from transformers import AutoModel, AutoTokenizer
import torch, os

os.environ["CUDA_VISIBLE_DEVICES"] = '0'
model_name = 'deepseek-ai/DeepSeek-OCR'

tokenizer = AutoTokenizer.from_pretrained(model_name, trust_remote_code=True)
model = AutoModel.from_pretrained(model_name, _attn_implementation='flash_attention_2', trust_remote_code=True, use_safetensors=True)
model = model.eval().cuda().to(torch.bfloat16)

prompt = "<image>\n<|grounding|>Convert the document to markdown. "
image_file = 'your_image.jpg'
output_path = 'your/output/dir'

res = model.infer(
    tokenizer,
    prompt=prompt,
    image_file=image_file,
    output_path=output_path,
    base_size=1024,
    image_size=640,
    crop_mode=True,
    save_results=True,
    test_compress=True
)`}</code></pre>
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
          </div>
        </div>
      </footer>
    </main>
  );
}
