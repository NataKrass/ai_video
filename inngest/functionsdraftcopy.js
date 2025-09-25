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

export const GenerateVideoDataTest = inngest.createFunction(
  { id: 'generate-video-data' },
  { event: 'generate-video-data' },
  async ({ event, step }) => {

    const { script, topic, title, caption, videoStyle, voice } = event?.data;

    // Логування всіх даних події
    console.log("💡 Event data received:", event?.data);
    console.log("💡 Script:", script);
    console.log("💡 Voice:", voice);

    // Мок step для генерації аудіо
    const GenerateAudioFile = await step.run("GenerateAudioFile", async () => {
      console.log("💡 Step started with data:", { script, voice, title, topic, caption, videoStyle });

      // Створюємо мок URL замість реального API
      const mockAudioUrl = `https://example.com/audio/${Math.random().toString(36).slice(2)}.mp3`;
      console.log('💡 Mock audio URL:', mockAudioUrl);

      return mockAudioUrl;
    });

    // Можна додати ще мок step для captions або інших етапів
    const GenerateCaptions = await step.run("GenerateCaptions", async () => {
      console.log("💡 Step started for captions:", { caption });
      const mockCaptionUrl = `https://example.com/captions/${Math.random().toString(36).slice(2)}.vtt`;
      console.log('💡 Mock captions URL:', mockCaptionUrl);
      return mockCaptionUrl;
    });

    // Повертаємо результати (мок аудіо + мок captions)
    return {
      audio: GenerateAudioFile,
      captions: GenerateCaptions,
    };
  }
);
