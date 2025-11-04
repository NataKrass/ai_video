"use client";
import { useAuthContext } from '@/app/provider';
import { Button } from '@/components/ui/button';
import { api } from '@/convex/_generated/api';
import { useConvex } from 'convex/react';
import { RefreshCcw } from 'lucide-react';
import moment from 'moment/moment';
import Image from 'next/image'
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

function VideoList() {
  const [videoList, setVideoList] = useState([]);
  const convex = useConvex();
  const { user } = useAuthContext();

  useEffect(() => {
    if (!user?._id) return;
    GetUserVideoList();
  }, [user])
  console.log("User", user);

  const GetUserVideoList = async () => {
    const result = await convex.query(api.videodata.GetUserVideos, {
      uid: user?._id
    })
    setVideoList(result);
    const isPendingVideo = result?.find((item) => item.status == 'pending');
    isPendingVideo && GetPendingVideoStatus(isPendingVideo);
  }

  const GetPendingVideoStatus = (pending) => {
    const intervalId = setInterval(async () => {
      //Get video data by id
      const result = await convex.query(api.videodata.GetVideoById, {
        videoId: pending?._id
      })

      if (result?.status == 'completed') {
        clearInterval(intervalId);
        console.log("Video Proccess Completed");
        GetUserVideoList();
      }
      console.log("still pending..")
    }, 5000)
  }

  return (
    <div>
      {videoList.length == 0 ?
        <div className='flex flex-col items-center justify-center mt-28 gap-5
        border border-dashed rounded-xl py-10'>
          <Image src={'/logo.svg'} alt='logo' width={60} height={60} />
          <h2 className='text-gray-400 text-lg'> You don't have any video </h2>
          <Link href={'/create-new-video'}>
            <Button> + Create New Video</Button>
          </Link>
        </div> :
        <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 mt-10'>
          {videoList.map((video, idx) => (
            <Link href={'/play-video/' + video?._id} key={idx}>
              <div className='relative' >
                {video.status == 'completed' ? <img src={video?.images[idx]}
                  className='w-full object-cover rounded-xl aspect-[2/3]'
                  alt={video.title}
                  width={500}
                  height={500} /> :
                  <div className='aspect-[2/3] p-5 w-full bg-slate-900 
                flex items-center justify-center rounded-xl'>
                    <RefreshCcw className='animate-spin mx-2' />
                    <h2>Generating...</h2>
                  </div>}
                <div className='absolute bottom-3 px-5 w-full'>
                  <h2>{video.title}</h2>
                  <p>{moment(video._creationTime).fromNow()}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      }
    </div>
  )
}

export default VideoList