import { GenerateScript } from "@/configs/AiModelMain";
import { NextResponse } from "next/server";

const SCRIPT_PROMPT = `write a two different script for 30 seconds video on Topic:{topic},
do not add Scene description
do not Add anything in Braces, just return the plain story in text
return valid JSON only. Do not wrap your answer in triple backticks or markdown
respond only with a valid JSON string. Do not return a JavaScript object. Wrap everything in triple backticks using json
give me response in JSON format and follow the schema
-{
scripts:[
{
content:”
},
],
}
`

export async function POST(req) {
  console.log('here click')
  try {
    const body = await req.json();

    if (!body || !body.topic) {
      console.error('Bad request: topic is missing in request body');
      return NextResponse.json({ error: 'Missing topic in request body' }, { status: 400 });
    }

    const topic = body.topic;
    const PROMPT = SCRIPT_PROMPT.replace('{topic}', topic);
    const parsed = await GenerateScript(topic, PROMPT);
    console.log('Parsed JSON:', parsed);

    return NextResponse.json(parsed);
  } catch (err) {
    console.error('Unhandled API Error:', err.message || err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
