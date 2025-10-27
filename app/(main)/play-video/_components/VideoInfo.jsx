import { ArrowLeft } from 'lucide-react'
import React from 'react'

function VideoInfo({videoData}) {
  return (
    <div className='p-5 border rounded-xl'>
      <h2>
        <ArrowLeft />
        Back to dashboard
      </h2>
      <div className='flex flex-col gap-3'>
        <h2 className='mt-5'>Project Name: {videoData?.title}</h2>
        <p class="text-gray-500">Script: {videoData?.script} </p>
        <h2>
          Video Style: {videoData?.videoStyle}
        </h2>
      </div>
    </div>
  )
}

export default VideoInfo