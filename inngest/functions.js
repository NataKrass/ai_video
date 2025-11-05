import { inngest } from "./client";
import { createClient } from "@deepgram/sdk";
import { ConvexHttpClient } from "convex/browser";
import { GenerateImagePromptScript } from "@/configs/AiModelMain";
import { api } from "@/convex/_generated/api";
import { getServices, renderMediaOnCloudrun } from '@remotion/cloudrun/client';

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
  { id: 'generate-video-data' },
  { event: 'generate-video-data' },
  async ({ event, step }) => {

    const BASE_URL = 'https://aigurulab.tech';
    // const BASE_URL='http://localhost:3005/';

    const { script, topic, title, caption, videoStyle, voice, recordId, credits } = event?.data;
    const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);

    // Generate Audio
    const GenerateAudioFile = await step.run(
      "GenerateAudioFile",
      async () => {
        // const result = await axios.post(BASE_URL+'/api/text-to-speech',
        // {
        //     input: script,
        //     voice: voice
        //     // input: 'Sample Audio Text',
        //     // voice: 'am_michael'
        // },
        // {
        //     headers: {
        //         'x-api-key': process.env.AIGURULAB_API_KEY,
        //         'Content-Type': 'application/json',
        //     },
        // })
        // console.log('audio', result.data.audio) //Output Result: Audio Mp3 Url
        // return result.data.audio;
        return 'https://firebasestorage.googleapis.com/v0/b/projects-2025-71366.firebasestorage.app/o/audio%2F1760719398183.mp3?alt=media&token=d779408c-1f48-431b-a4bc-559d415e0e66'
      }
    )

    // Generate Captions 
    const GenerateCaptions = await step.run(
      "generateCaptions",
      async () => {
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
        const result = await GenerateImagePromptScript(videoStyle, script);
        return result;
      }
    )

    //Generate Image from Prompt 

    const GenerateImages = await step.run(
      "generateImages",
      async () => {
        let images = [
          "https://firebasestorage.googleapis.com/v0/b/projects-2025-71366.firebasestorage.app/o/ai-guru-lab-images%2F1761057182268.png?alt=media&token=111898c0-8d1b-494a-b0dc-67ee59c9b5fc",
          "https://firebasestorage.googleapis.com/v0/b/projects-2025-71366.firebasestorage.app/o/ai-guru-lab-images%2F1761057178678.png?alt=media&token=3011dbd8-d42d-454f-8615-6845328aaf1d",
          "https://firebasestorage.googleapis.com/v0/b/projects-2025-71366.firebasestorage.app/o/ai-guru-lab-images%2F1761057182365.png?alt=media&token=7d7bdbb9-37f9-430a-b82a-a1e35858926c",
          "https://firebasestorage.googleapis.com/v0/b/projects-2025-71366.firebasestorage.app/o/ai-guru-lab-images%2F1761057178816.png?alt=media&token=8a87de4e-2521-458b-9311-d5c66b4f2527",
          "https://firebasestorage.googleapis.com/v0/b/projects-2025-71366.firebasestorage.app/o/ai-guru-lab-images%2F1761057183785.png?alt=media&token=5f1ae398-3880-4030-824f-f63df90f296a"
        ]
        let imagesGen = []
        // imagesGen = await Promise.all(
        //   GenerateImagePrompts.map(async(el) => {
        //     const result = await axios.post(BASE_URL+'/api/generate-image',
        //     {
        //         width: 1024,
        //         height: 1024,
        //         input: el?.imagePrompt,
        //         model: 'sdxl',//'flux'
        //         aspectRatio:"1:1"//Applicable to Flux model only
        //     },
        //     {
        //         headers: {
        //             'x-api-key': process.env.AIGURULAB_API_KEY,
        //             'Content-Type': 'application/json', // Content Type
        //         },
        //     })
        //     return result?.data.image
        //   })
        // )
        return images
      });

    //Save all to DB
    const UpdateDB = await step.run(
      'UpdateDB',
      async () => {
        const result = await convex.mutation(api.videodata.UpdateVideoRecord, {
          recordId: recordId,
          audioUrl: GenerateAudioFile,
          captionJson: GenerateCaptions,
          images: GenerateImages
        });
        return result;
      }
    )

    const RenderVideo = await step.run(
      "renderVideo",
      async () => {
        //Render Video
        const services = await getServices({
          region: 'us-east1',
          compatibleOnly: true,
        });

        const serviceName = services[0].serviceName;
        const result = await renderMediaOnCloudrun({
          serviceName,
          region: 'us-east1',
          serveUrl: 'https://storage.googleapis.com/remotioncloudrun-1agbg28g98/sites/ai-video-generator-v2/index.html',
          composition: 'youtubeShort',
          inputProps: {
            videoData: {
              audioUrl: GenerateAudioFile,
              captionJson: GenerateCaptions,
              images: GenerateImages
            }
          },
          codec: 'h264'
        });

        if (result.type === 'success') {
          console.log(result.bucketName);
          console.log(result.renderId);
        }
        console.log('🎬 Render result:', JSON.stringify(result, null, 2));

        console.log('🧾 inputProps', JSON.stringify({
          videoData: {
            audioUrl: GenerateAudioFile,
            captionJson: GenerateCaptions,
            images: GenerateImages
          }
        }, null, 2));


        return result?.publicUrl;
      }
    )

    const UpdateDownloadUrl = await step.run(
      'UpdateDownloadUrl',
      async () => {
        // TODO: make RenderVideo return a string
        // const safeDownloadUrl = RenderVideo || undefined;
        const safeDownloadUrl = 'https://storage.googleapis.com/remotioncloudrun-1agbg28g98/renders/otarjosy9b/out.mp4';
        const result = await convex.mutation(api.videodata.UpdateVideoRecord, {
          recordId: recordId,
          audioUrl: GenerateAudioFile,
          captionJson: GenerateCaptions,
          images: GenerateImages,
          downloadUrl: safeDownloadUrl
        });
        return result;
      }
    )
    return RenderVideo
    //return 'Executed successfully';

  }
)
