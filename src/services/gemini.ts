const GEMINI_API_BASE = "https://generativelanguage.googleapis.com/v1beta";
const MODEL = "gemini-2.0-flash";

export async function generateContent(prompt: string): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("NEXT_PUBLIC_GEMINI_API_KEY is not set");
  }

  const url = `${GEMINI_API_BASE}/models/${MODEL}:generateContent`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-goog-api-key": apiKey,
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
    }),
  });

  const data = await response.json().catch(() => ({} as unknown));

  if (!response.ok) {
    const message = data?.error?.message || response.statusText || "Request failed";
    throw new Error(message);
  }

  const text: string = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
  return text;
}
