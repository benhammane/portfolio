export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "OPENROUTER_API_KEY is missing" });
  }

  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Message missing" });

    const payload = {
      model: "mistral-small", // modèle gratuit
      input: [
        { role: "system", content: "Assistant pour portfolio." },
        { role: "user", content: message },
      ],
    };

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const err = await response.text();
      return res.status(500).json({ error: err });
    }

    const data = await response.json();
    const reply = data?.output?.[0]?.content || "No reply from model.";

    return res.status(200).json({ reply });
  } catch (e: any) {
    return res.status(500).json({ error: e.message });
  }
}