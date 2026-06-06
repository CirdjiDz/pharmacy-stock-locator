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

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: userMessage }] }],
          generationConfig: { temperature: 0.3 }
        }),
      }
    );

    const data = await response.json();
    
    // Return full Gemini response for debugging
    const candidate = data.candidates?.[0];
    const text = candidate?.content?.parts?.[0]?.text || '';
    const finishReason = candidate?.finishReason || '';
    
    if (!text && finishReason === 'SAFETY') {
      res.status(200).json({ content: [{ type: 'text', text: '{"blocked": true}' }] });
      return;
    }
    
    res.status(200).json({ content: [{ type: 'text', text }] });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}