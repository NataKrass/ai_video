import axios from "axios";
import { inngest } from "./client";

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
      }
    )

    // Generate Captions 

    return GenerateAudioFile;
   
  }
)