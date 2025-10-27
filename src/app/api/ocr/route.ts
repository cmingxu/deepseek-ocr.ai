export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get("file") as File | null;
    const prompt = (form.get("prompt") ?? "") as string;
    const format = ((form.get("format") ?? "text") as string).toLowerCase();

    if (!file) {
      return new Response(JSON.stringify({ error: "Missing file" }), {
        status: 400,
        headers: { "content-type": "application/json" },
      });
    }

    // This demo does not run OCR; it just returns a mocked response.
    const baseText = "The team is busy to make this ready for you, join waiting list by email to cming.xu@gmail.com";

    let text = baseText;
    if (format === "markdown") {
      text = `# Extracted Text\n\n${baseText}`;
    } else if (format === "csv") {
      const esc = (s: string) => '"' + s.replaceAll('"', '""') + '"';
      text = `filename,prompt,text\n${esc(file.name)},${esc(prompt || "")},${esc(baseText)}`;
    } else {
      // text/plain
      text = baseText;
    }

    return new Response(JSON.stringify({ text, format, filename: file.name }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unexpected error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
}