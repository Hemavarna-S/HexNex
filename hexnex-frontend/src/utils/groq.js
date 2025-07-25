import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,    // your gsk_... key
  baseURL: "https://api.groq.com/openai/v1"     // important: use Groq base URL
});

export const askGroq = async (question, tool = "General") => {
  const completion = await openai.chat.completions.create({
    model: "llama3-8b-8192",    // ✅ correct Groq model name
    messages: [
      { role: "system", content: `You are a cybersecurity expert specialized in ${tool}.` },
      { role: "user", content: question }
    ],
    temperature: 0.3
  });
  return completion.choices[0].message.content;
};
