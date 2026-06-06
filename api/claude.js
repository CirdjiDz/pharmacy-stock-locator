export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') { res.status(200).end(); return; }
  if (req.method !== 'POST') { res.status(405).json({ error: 'Method not allowed' }); return; }

  try {
    const { messages } = req.body;
    const userMessage = messages[0].content;

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: userMessage }] }],
          generationConfig: { temperature: 0.3 }
        }),
      }
    );

    const data = await geminiRes.json();
    
    // Return everything for debugging
    res.status(200).json({ 
      content: [{ type: 'text', text: data.candidates?.[0]?.content?.parts?.[0]?.text || '' }],
      fullResponse: data,
      keyExists: !!process.env.GEMINI_API_KEY,
      keyLength: process.env.GEMINI_API_KEY?.length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}