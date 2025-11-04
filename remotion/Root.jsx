import React from 'react';
import { Composition } from 'remotion';
import RemotionComposition from '../app/_components/RemotionComposition';

const videoData = {
  audioUrl: '',
  captionJson: [
    {
      confidence: 0.9996642,
      end: 7.04,
      start: 6.8799996,
      word: "a",
    },
    {
      confidence: 0.99995935,
      end: 7.2,
      start: 7.04,
      word: "little",
    },
    {
      confidence: 0.9974326,
      end: 7.52,
      start: 7.2,
      word: "sprout",
    },
    {
      confidence: 0.8171823,
      end: 7.8399997,
      start: 7.52,
      word: "peeked",
    },
    {
      confidence: 0.99343646,
      end: 8.16,
      start: 7.8399997,
      word: "out",
    },
    {
      confidence: 0.99900836,
      end: 8.32,
      start: 8.16,
      word: "it",
    },
    {
      confidence: 0.9999008,
      end: 8.559999,
      start: 8.32,
      word: "grew",
    },
    {
      confidence: 0.99987054,
      end: 8.72,
      start: 8.559999,
      word: "and",
    },
    {
      confidence: 0.99991214,
      end: 8.96,
      start: 8.72,
      word: "grew",
    },
    {
      confidence: 0.9983456,
      end: 9.36,
      start: 8.96,
      word: "becoming",
    },
    {
      confidence: 0.9999746,
      end: 9.5199995,
      start: 9.36,
      word: "a",
    },
    {
      confidence: 0.99997115,
      end: 9.76,
      start: 9.5199995,
      word: "tall",
    },
    {
      confidence: 0.70947903,
      end: 10.16,
      start: 9.76,
      word: "strong",
    },
    {
      confidence: 0.9800241,
      end: 10.48,
      start: 10.16,
      word: "tree",
    },
    {
      confidence: 0.99890864,
      end: 11.194875,
      start: 10.874875,
      word: "birds",
    },
    {
      confidence: 0.99859405,
      end: 11.514875,
      start: 11.194875,
      word: "sang",
    },
    {
      confidence: 0.9998826,
      end: 11.674875,
      start: 11.514875,
      word: "in",
    },
    {
      confidence: 0.9998091,
      end: 11.834875,
      start: 11.674875,
      word: "its",
    },
    {
      confidence: 0.87705326,
      end: 12.394876,
      start: 11.834875,
      word: "branches",
    },
    {
      confidence: 0.99959254,
      end: 12.794875,
      start: 12.394876,
      word: "squirrels",
    },
    {
      confidence: 0.9947349,
      end: 13.034875,
      start: 12.794875,
      word: "played",
    },
    {
      confidence: 0.9998834,
      end: 13.274876,
      start: 13.034875,
      word: "around",
    },
    {
      confidence: 0.99981576,
      end: 13.4348755,
      start: 13.274876,
      word: "its",
    },
    {
      confidence: 0.99975616,
      end: 13.754875,
      start: 13.4348755,
      word: "roots",
    },
    {
      confidence: 0.9662251,
      end: 13.914875,
      start: 13.754875,
      word: "and",
    },
    {
      confidence: 0.9997702,
      end: 14.314875,
      start: 13.914875,
      word: "everyone",
    },
    {
      confidence: 0.99992716,
      end: 14.634875,
      start: 14.314875,
      word: "enjoyed",
    },
    {
      confidence: 0.9995018,
      end: 14.874875,
      start: 14.634875,
      word: "its",
    },
    {
      confidence: 0.9997961,
      end: 15.274876,
      start: 14.874875,
      word: "shade",
    },
    {
      confidence: 0.532884,
      end: 15.594875,
      start: 15.274876,
      word: "the",
    },
    {
      confidence: 0.9997365,
      end: 15.914875,
      start: 15.594875,
      word: "tiny",
    },
    {
      confidence: 0.9993667,
      end: 16.154875,
      start: 15.914875,
      word: "seed",
    },
    {
      confidence: 0.99963987,
      end: 16.314875,
      start: 16.154875,
      word: "had",
    },
    {
      confidence: 0.9998233,
      end: 16.554874,
      start: 16.314875,
      word: "become",
    },
    {
      confidence: 0.9999182,
      end: 16.634876,
      start: 16.554874,
      word: "a",
    },
    {
      confidence: 0.9998903,
      end: 16.794876,
      start: 16.634876,
      word: "home",
    },
    {
      confidence: 0.9999443,
      end: 17.034874,
      start: 16.794876,
      word: "for",
    },
    {
      confidence: 0.9954746,
      end: 17.194876,
      start: 17.034874,
      word: "all",
    },
  ],
  images: ["https://firebasestorage.googleapis.com/v0/b/projects-2025-71366.firebasestorage.app/o/ai-guru-lab-images%2F1761057182268.png?alt=media&token=111898c0-8d1b-494a-b0dc-67ee59c9b5fc"]
}

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="youtubeShort"
        component={RemotionComposition}
        durationInFrames={Math.round(videoData.captionJson[videoData.captionJson.length - 1].end * 30)}
        //durationInFrames={Number(videoData?.captionJson[captionJson?.length - 1]?.end * 30).toFixed(0)}
        fps={30}
        width={1280}
        height={720}
        defaultProps={{ videoData: videoData }}
      />
    </>
  );
};