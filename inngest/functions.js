import axios from "axios";
import { inngest } from "./client";
import { createClient } from "@deepgram/sdk";
import { GenerateImagePromptScript } from "@/configs/AiModelMain";

const ImagePromptScript = `Generate Image prompt of {style} style with all details for each scene for 30 seconds video : script : {script}
- Just Give specifing image prompt depends on the story line
- do not give camera angle image prompt
- Follow the Following schema and return JSON data (Max 4-5 Images)
- [
    {
      imagePrompt: '',
      sceneContent: ' <Script Content>'  
    }
]`

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  },
);
export const GenerateVideoData = inngest.createFunction(
  { id: 'generate-video-data'},
  { event: 'generate-video-data'},
  async({ event, step }) => {

    const BASE_URL='https://aigurulab.tech';
    // const BASE_URL='http://localhost:3005/';

    const { script, topic, title, caption, videoStyle, voice } = event?.data;
    console.log('Event data:', event?.data);
    console.log('Script:', script);
    console.log('Voice:', voice);
    // Generate Audio
    const GenerateAudioFile = await step.run(
      "GenerateAudioFile",
      async() => {
        const result = await axios.post(BASE_URL+'/api/text-to-speech',
        {
            input: script,
            voice: voice
            // input: 'Sample Audio Text',
            // voice: 'am_michael'
        },
        {
            headers: {
                'x-api-key': process.env.AIGURULAB_API_KEY,
                'Content-Type': 'application/json',
            },
        })
        console.log('audio', result.data.audio) //Output Result: Audio Mp3 Url
        return result.data.audio;
        return 'https://firebasestorage.googleapis.com/v0/b/projects-2025-71366.firebasestorage.app/o/audio%2F1758710931675.mp3?alt=media&token=5303f3d9-81e9-48ad-a850-76f7544c5034'
      }
    )

    // Generate Captions 
    const GenerateCaptions = await step.run(
      "generateCaptions",
      async ()=> {
        const deepgram = createClient(process.env.DEEPGRAM_API_KEY);

        const { result, error } = await deepgram.listen.prerecorded.transcribeUrl(
          {
            url: GenerateAudioFile,
          },
          
          {
            model: "nova-3",
          }
        );
        return result.results.channels[0]?.alternatives[0]?.words;
      }
    )

    //Generate Image Prompt from  script
    const GenerateImagePrompts = await step.run(
      "generateImagePrompt",
      async () => {
        const FINAL_PROMPT = ImagePromptScript.replace('{style', videoStyle)
          .replace('{script', script);
        const result = await GenerateImagePromptScript(videoStyle, script);

        return result;
      }
    )

    return GenerateImagePrompts;
   
  }
)