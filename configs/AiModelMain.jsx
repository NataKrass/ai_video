import {
  GoogleGenAI,
} from '@google/genai';

export async function GenerateScript(topic, promptTemplate) {
  const ai = new GoogleGenAI({
    apiKey: process.env.NEXT_GEMINI_API_KEY,
  });

  const config = {
    responseMimeType: 'text/plain',
  };

  const model = 'gemini-2.0-flash';

  const prompt = promptTemplate.replace('{topic}', topic);

  const contents = [
    {
      role: 'user',
      parts: [{ text: prompt }],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });

  let rawText = '';

  for await (const chunk of response) {
    rawText += chunk.text;
  }

  console.log('🧠 AI rawText:', rawText);

  try {
    if (typeof rawText !== 'string') {
      console.error('❗️Invalid AI response. rawText is not a string:', rawText);
      rawText = JSON.stringify(rawText);
    }

    const jsonMatch = rawText.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    const jsonString = jsonMatch ? jsonMatch[1] : rawText;

    const parsed = JSON.parse(jsonString);
    console.log('✅ Parsed JSON:', parsed);
    return parsed;
  } catch (err) {
    console.error('❗️JSON parse error:', err.message);
    console.error('🚨 Failed rawText content:', rawText);
    throw new Error('Failed to parse AI response as JSON');
  }
}
