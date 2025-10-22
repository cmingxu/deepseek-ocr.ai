export default function DocsPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">DeepSeek‑OCR API Documentation</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Developer documentation for accessing the OCR service via HTTP API.
      </p>

      {/* Overview */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold">Overview</h2>
        <p className="mt-2 text-sm">
          The OCR API extracts clean text from uploaded PDFs or images. Optionally include a prompt to guide extraction.
        </p>
      </section>

      {/* Base URL */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold">Base URL</h2>
        <pre className="mt-3 rounded-md bg-muted p-4 text-sm overflow-auto"><code>https://api.deepsee-ocr.ai</code></pre>
      </section>

      {/* Authentication */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold">Authentication</h2>
        <p className="mt-2 text-sm">
          Authenticate requests using a Bearer token. Include your API key in the <code>Authorization</code> header.
        </p>
        <pre className="mt-3 rounded-md bg-muted p-4 text-sm overflow-auto"><code>Authorization: Bearer &lt;YOUR_API_KEY&gt;</code></pre>
        <p className="mt-2 text-sm">
          Best practice: store your key in an environment variable like <code>DEEPSEEK_OCR_API_KEY</code>.
        </p>
      </section>

      {/* OCR Endpoint */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold">OCR Endpoint</h2>
        <p className="mt-2 text-sm">Upload a file (PDF or image) and optional prompt; receive extracted text.</p>
        <div className="mt-3 text-sm">
          <div className="font-mono">POST /v1/ocr</div>
          <div className="mt-2">Content-Type: <code>multipart/form-data</code></div>
        </div>

        <h3 className="mt-4 font-medium">Form fields</h3>
        <ul className="mt-2 list-disc list-inside text-sm">
          <li><code>file</code> (required): The PDF or image to process.</li>
          <li><code>prompt</code> (optional): Instruction to guide extraction (e.g., focus on tables).</li>
          <li><code>language</code> (optional): ISO code to hint language, e.g., <code>en</code>, <code>zh</code>.</li>
        </ul>

        <h3 className="mt-4 font-medium">Response</h3>
        <p className="mt-2 text-sm">Returns extracted text content as JSON.</p>
        <pre className="mt-3 rounded-md bg-muted p-4 text-sm overflow-auto"><code>{`{
  "text": "...extracted text content..."
}`}</code></pre>

        <h3 className="mt-6 font-medium">Curl example</h3>
        <pre className="mt-2 rounded-md bg-muted p-4 text-sm overflow-auto"><code>{`curl -X POST \
  https://api.deepsee-ocr.ai/v1/ocr \
  -H "Authorization: Bearer $DEEPSEEK_OCR_API_KEY" \
  -H "Accept: application/json" \
  -F file=@/path/to/file.pdf \
  -F prompt="Extract plain text"
`}</code></pre>

        <h3 className="mt-6 font-medium">JavaScript example (Node)</h3>
        <pre className="mt-2 rounded-md bg-muted p-4 text-sm overflow-auto"><code>{`import fs from 'node:fs';
import FormData from 'form-data';
import fetch from 'node-fetch';

const form = new FormData();
form.append('file', fs.createReadStream('/path/to/file.pdf'));
form.append('prompt', 'Extract plain text');

const res = await fetch('https://api.deepsee-ocr.ai/v1/ocr', {
  method: 'POST',
  headers: { Authorization: 'Bearer ' + process.env.DEEPSEEK_OCR_API_KEY },
  body: form,
});
const data = await res.json();
console.log(data.text);
`}</code></pre>

        <h3 className="mt-6 font-medium">Python example</h3>
        <pre className="mt-2 rounded-md bg-muted p-4 text-sm overflow-auto"><code>{`import os
import requests

url = 'https://api.deepsee-ocr.ai/v1/ocr'
headers = {
    'Authorization': f"Bearer {os.environ['DEEPSEEK_OCR_API_KEY']}",
    'Accept': 'application/json',
}
files = { 'file': open('/path/to/file.pdf', 'rb') }
data = { 'prompt': 'Extract plain text' }

r = requests.post(url, headers=headers, files=files, data=data)
r.raise_for_status()
print(r.json()['text'])
`}</code></pre>
      </section>

      {/* Rate Limits */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold">Rate Limits</h2>
        <p className="mt-2 text-sm">
          To ensure fair usage and service stability, requests are rate-limited per API key.
        </p>
        <ul className="mt-2 list-disc list-inside text-sm">
          <li>Default: 100 requests per minute per API key.</li>
          <li>Bursts may be temporarily throttled during high load.</li>
        </ul>
        <p className="mt-2 text-sm">Exceeded limits return HTTP <code>429 Too Many Requests</code>.</p>
        <pre className="mt-2 rounded-md bg-muted p-4 text-sm overflow-auto"><code>{`HTTP/1.1 429 Too Many Requests
Content-Type: application/json

{ "error": "rate_limit_exceeded", "retry_after": 15 }
`}</code></pre>
      </section>

      {/* Errors */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold">Errors</h2>
        <ul className="mt-2 list-disc list-inside text-sm">
          <li><code>400</code> Invalid request (missing file or unsupported type).</li>
          <li><code>401</code> Unauthorized (missing or invalid API key).</li>
          <li><code>413</code> Payload too large.</li>
          <li><code>429</code> Rate limit exceeded.</li>
          <li><code>500</code> Server error.</li>
        </ul>
      </section>

      {/* Notes */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold">Notes</h2>
        <ul className="mt-2 list-disc list-inside text-sm">
          <li>Use HTTPS endpoints only.</li>
          <li>Prefer PDF uploads for multi-page documents.</li>
          <li>Prompts can nudge extraction (e.g., &quot;focus on text&quot;).</li>
        </ul>
      </section>
    </main>
  );
}