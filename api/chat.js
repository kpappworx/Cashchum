import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { prompt } = req.body;

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.OPENAI_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7
        })
      });

      const data = await response.json();
      res.status(200).json({ reply: data.choices[0].message.content });
    } catch (err) {
      res.status(500).json({ error: "OpenAI request failed" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
