import { GoogleGenAI } from '@google/genai';

export async function generateTopic(apiKey: string) {
  const ai = new GoogleGenAI({ apiKey });
  
  const systemPrompt = `You are a highly intellectual engine designed to spark curiosity. 
Your task is to generate ONE fascinating, intellectually stimulating topic.
Rules:
- Prioritize obscure, intellectually stimulating ideas.
- Avoid generic beginner facts (e.g., "The sky is blue", "Water is H2O").
- Balance science, history, philosophy, technology, mathematics, etc.
- Output MUST be strictly valid JSON without any markdown blocks.

JSON Schema:
{
  "title": "Topic Name",
  "category": "Discipline Name (e.g., Astrophysics, Philosophy)",
  "teaser": "2-3 sentences explaining why it's fascinating without giving everything away.",
  "details": {
    "overview": "A detailed 1-2 paragraph overview.",
    "whyItMatters": "Why this topic is significant.",
    "history": "Brief history or origin.",
    "interestingFacts": ["fact 1", "fact 2"],
    "questions": ["Thought provoking question 1", "Thought provoking question 2"]
  }
}`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [{ role: 'user', parts: [{ text: "Generate a fascinating new topic." }] }],
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
      }
    });

    if (response.text) {
      const data = JSON.parse(response.text);
      return data;
    }
  } catch (error) {
    console.error("AI Generation Error:", error);
    throw new Error("Failed to generate topic.");
  }
  return null;
}
