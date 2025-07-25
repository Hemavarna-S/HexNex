import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.GROQ_API_KEY,       // your Groq key!
  baseURL: "https://api.groq.com/openai/v1"       // talk to Groq, not OpenAI
});

export const askGroq = async (question, tool = "General") => {
  const completion = await openai.chat.completions.create({
    model: "llama3-8b-8192",   // change to llama3-70b-8192 if you want
    messages: [
      { role: "system", content: `You are a cybersecurity expert specialized in ${tool}.` },
      { role: "user", content: question }
    ],
    temperature: 0.3
  });
  return completion.choices[0].message.content;
};
