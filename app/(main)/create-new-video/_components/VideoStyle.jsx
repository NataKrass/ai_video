'use client';
import Image from 'next/image';
import React, { useState } from 'react'

export const options = [
  {
    name: 'Realistic',
    image: '/realistic.webp'
  },
  {
    name: 'Cinematic',
    image: '/cinematic.webp'
  },
  {
    name: 'Anime',
    image: '/anim.webp'
  },
  {
    name: 'Cartoon',
    image: '/cartoon.webp'
  },
  {
    name: 'Cyberpunk',
    image: '/cyberpunk.webp'
  },
  {
    name: 'Gta',
    image: '/gta.webp'
  },
  {
    name: 'Watercolor',
    image: '/watercolor.webp'
  },
];

function VideoStyle({handleInputChange}) {
  const [selectedStyle, setSelectedStyle] = useState();

  return (
    <div className='mt-5'>
      <h2>
        Video Styles
      </h2>
      <p className='text-sm text-gray-400'>Select Video Style</p>
      <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2'>
        {options.map((option, idx) => (
          <div key={idx} className='relative' onClick={() => {setSelectedStyle(option.name)
            handleInputChange('videoStyle', option.name)
          }}>
            <Image 
            className={`object-cover h-[90px]
                            lg:h-[130px] xl:h-[180px] rounded-lg p-1
                            hover:border border-gray-300 cursor-pointer
                            false ${option.name == selectedStyle && 'border'} `}
            src={option.image} 
            width={500}
            alt={option.name}
            height={200}/>
            <h2 className='absolute bottom-1 text-center w-full'>{option.name}</h2>
          </div>
        ))}
      </div>
    </div>
  )
}

export default VideoStyle