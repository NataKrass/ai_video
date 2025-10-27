'use client'
import React, { useEffect } from 'react'
import { AbsoluteFill, Img, interpolate, Sequence, useCurrentFrame, useVideoConfig, Audio} from 'remotion';

function RemotionComposition({videoData, setDurationInFrame}) {
  console.log(videoData)
  const {fps} = useVideoConfig();
  const captions = videoData?.captionJson;
  const imageList = videoData?.images;
  const frame = useCurrentFrame()

  useEffect(() => {
    if(videoData){
      getDurationFrame();
    }
  }, videoData)
  
  const getDurationFrame = () => {
    const totalDuration = captions[captions.length - 1]?.end*fps;
    setDurationInFrame(totalDuration);
    return totalDuration;
  }

  const getCurrentCaption = () => {
    const currentTime = frame/30;
    const currentCaption = captions?.find((item) => currentTime >= item?.start && currentTime <= item?.end)
    return currentCaption ? currentCaption?.word : '';
  }
  return (
    <div>
      <AbsoluteFill>
    {imageList?.map((item, idx) => {
      const startTime = (idx*getDurationFrame())/imageList.length;
      const duration = getDurationFrame();
      const scale= (index) => interpolate(
        frame,
        [startTime, startTime+duration/2, startTime+duration],
        index%2==0 ? [1, 1.8, 1] : [1.8, 1, 1.8],
        {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
      )

      return (
        <>
          <Sequence key={idx} from={startTime} durationInFrames={getDurationFrame()}>
            <AbsoluteFill>
              <Img
                src={item}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transform: `scale(${scale(idx)})`
                }}
              />
            </AbsoluteFill>
          </Sequence>
        </>
      )
    }
      
    )}
   
   
      </AbsoluteFill>
      <AbsoluteFill style={{
        color: 'yellow',
        justifyContent: 'center',
        bottom: 140,
        top: undefined,
        height: 150,
        fontSize: '90px',
        textAlign: 'center'
      }}>
      <h2 >
{getCurrentCaption()}
      </h2>
      </AbsoluteFill>
      {videoData?.audioUrl && <Audio src={videoData?.audioUrl} />}
    </div>
  )
}

export default RemotionComposition