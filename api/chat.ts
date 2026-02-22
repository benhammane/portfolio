export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "OPENROUTER_API_KEY missing" });
  }

  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message missing" });
    }

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "mistralai/mistral-7b-instruct", // modèle gratuit
          messages: [
            {
              role: "system",
              content:
                "Tu es le chatbot du portfolio d’un étudiant en M1 MIAGE passionné par le développement. Réponds de façon professionnelle et concise.",
            },
            {
              role: "user",
              content: message,
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({ error: data });
    }

    const reply = data.choices?.[0]?.message?.content;

    return res.status(200).json({ reply });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}