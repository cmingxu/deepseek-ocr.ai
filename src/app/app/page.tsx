"use client";

import React, { useCallback, useMemo, useRef, useState } from "react";
import Link from "next/link";

type OutputFormat = "markdown" | "csv" | "text";

export default function AppUploaderPage() {
  const [file, setFile] = useState<File | null>(null);
  const [prompt, setPrompt] = useState("");
  const [format, setFormat] = useState<OutputFormat>("text");
  const [result, setResult] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onFileChange = (f: File | null) => {
    if (!f) return;
    // Only accept images and PDFs
    const ok = /^(image\/.+|application\/pdf)$/.test(f.type);
    if (!ok) {
      alert("Please upload an image or PDF file.");
      return;
    }
    setFile(f);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const dropped = e.dataTransfer.files?.[0];
    if (dropped) onFileChange(dropped);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const previewUrl = useMemo(() => {
    if (!file) return null;
    if (file.type.startsWith("image/")) {
      return URL.createObjectURL(file);
    }
    return null;
  }, [file]);

  const ext = format === "markdown" ? "md" : format === "csv" ? "csv" : "txt";
  const mime = format === "markdown" ? "text/markdown" : format === "csv" ? "text/csv" : "text/plain";

  const handleSubmit = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }
    setLoading(true);
    setResult("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("prompt", prompt);
      fd.append("format", format);

      const res = await fetch("/api/ocr", {
        method: "POST",
        body: fd,
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Request failed with ${res.status}`);
      }
      const data = await res.json();
      setResult(data.text || "");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unexpected error";
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!result) return;
    const blob = new Blob([result], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ocr-result.${ext}`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const handleCopy = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result);
      alert("Result copied to clipboard");
    } catch {
      alert("Failed to copy");
    }
  };

  return (
    <main className="min-h-screen w-full bg-gray-50 text-gray-900">
        {/* Announcement pill bar */}
        <div className="py-8 flex justify-center">
          <div className="inline-flex items-center justify-center gap-3 rounded-full border bg-white/70 backdrop-blur px-4 py-2 shadow-sm">
            <div className="text-sm">
              🚀 Hot: You should use AI-powered Browser Now, it will transform your browsing experience!
            </div>
            <div className="px-3 py-1 text-2xs font-semibold rounded-full bg-primary text-primary-foreground">
                <Link href="https://pplx.ai/cmingxu22530" target="_blank" rel="noopener noreferrer" aria-label="Visit Browser Now website">
                  Get Comet Free
                </Link>
              </div>

          </div>
        </div>
      <section className="mx-auto max-w-4xl px-6 py-12">
        <h1 className="text-3xl font-bold tracking-tight">Image to Text Converter</h1>
        <p className="mt-2 text-sm text-gray-600">
          Upload an image or PDF, add an optional prompt, and choose an output format.
        </p>

        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={
            "mt-8 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 transition " +
            (isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-white")
          }
        >
          <div className="flex flex-col items-center gap-3">
            {previewUrl ? (
              <img src={previewUrl} alt="preview" className="h-44 w-auto rounded-md border" />
            ) : (
              <div className="flex h-44 w-full max-w-xl items-center justify-center">
                <div className="text-center text-sm text-gray-600">
                  Drop, Upload or Paste Images/PDF
                  <div className="mt-1 text-xs text-gray-500">
                    Supported: JPG, PNG, GIF, JPEG, HEIC, PDF
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="rounded-md bg-gray-900 px-4 py-2 text-white hover:bg-black"
              >
                Browse
              </button>
              <a
                href="#"
                className="rounded-md border px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={(e) => {
                  e.preventDefault();
                  setFile(null);
                  if (inputRef.current) inputRef.current.value = "";
                }}
              >
                Clear
              </a>
            </div>
          </div>

          <input
            ref={inputRef}
            type="file"
            accept="image/*,application/pdf"
            className="hidden"
            onChange={(e) => onFileChange(e.target.files?.[0] || null)}
          />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium">Prompt (optional)</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., Extract table and summarize key points"
              className="min-h-[120px] w-full rounded-md border border-gray-300 bg-white p-3 text-sm outline-none focus:border-gray-900"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">Output Format</label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value as OutputFormat)}
              className="w-full rounded-md border border-gray-300 bg-white p-2 text-sm outline-none focus:border-gray-900"
            >
              <option value="text">Text (.txt)</option>
              <option value="markdown">Markdown (.md)</option>
              <option value="csv">CSV (.csv)</option>
            </select>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="mt-4 w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? "Converting…" : "Convert"}
            </button>
          </div>
        </div>

        <div className="mt-10">
          <label className="mb-2 block text-sm font-medium">Result</label>
          <div className="rounded-lg border border-gray-200 bg-white">
            <div className="flex items-center justify-between border-b p-2">
              <div className="text-xs text-gray-500">Format: {format}</div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="rounded-md border px-3 py-1 text-xs hover:bg-gray-100"
                >
                  Copy
                </button>
                <button
                  type="button"
                  onClick={handleDownload}
                  className="rounded-md bg-gray-900 px-3 py-1 text-xs text-white hover:bg-black"
                >
                  Download .{ext}
                </button>
              </div>
            </div>
            <div className="max-h-[400px] overflow-auto p-3 text-sm whitespace-pre-wrap">
              {result ? (
                result
              ) : (
                <span className="text-gray-400">No output yet. Submit to see results.</span>
              )}
            </div>
          </div>
        </div>

        <p className="mt-6 text-xs text-gray-500">
          Your privacy is protected. No data is transmitted or stored in this demo.
        </p>
      </section>
    </main>
  );
}
