// hexnex-backend/routes/aiRoute.js
import express from 'express';
import OpenAI from 'openai';

const router = express.Router();

// ✅ Load API key securely from environment
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post('/hexnexai', async (req, res) => {
  const { question, tool } = req.body;

  if (!question) {
    return res.status(400).json({ answer: '❌ Question is required.' });
  }

  let prompt = '';
  switch (tool) {
    case 'YARA':
      prompt = `Using YARA rules, explain: ${question}`;
      break;
    case 'Scapy':
      prompt = `Analyze with Scapy: ${question}`;
      break;
    case 'OpenCTI':
      prompt = `As a threat intelligence analyst using OpenCTI: ${question}`;
      break;
    case 'Metasploit':
      prompt = `Using the Metasploit Framework, describe: ${question}`;
      break;
    default:
      prompt = `Cybersecurity query: ${question}`;
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 600,
    });

    const answer = completion.choices?.[0]?.message?.content || "⚠️ No response from model.";
    res.json({ answer });
  } catch (err) {
    console.error('[OpenAI Error]', err);
    res.status(500).json({ answer: '❌ Server Error: ' + err.message });
  }
});

export default router;
