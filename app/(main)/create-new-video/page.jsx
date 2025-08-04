'use client'
import React, { useState } from 'react'
import Topic from './_components/Topic'
import VideoStyle from './_components/VideoStyle';
import Voice from './_components/Voice';
import Captions from './_components/Captions';
import { WandSparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Preview from './_components/Preview';

function CreateNewVideo() {
  const [formData, setFormData] = useState();
  const handleInputChange = (fieldName, fieldValue) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: fieldValue
    }))
    console.log(formData)
  }

  return (
    <div>
      <h2 className='text-3xl'>Create New Video</h2>
      <div className='grid grid-cols-1 md:grid-cols-3 mt-8'>
        <div className='col-span-2 p-7 border rounded-xl h-[70vh] overflow-auto'>
          {/* Topic & script */}
          <Topic handleInputChange = {handleInputChange}/>
          {/* Video Image Style */}
          <VideoStyle handleInputChange = {handleInputChange}/>
          {/* Voice */}
          <Voice handleInputChange = {handleInputChange} />
          {/* Captions */}
          <Captions handleInputChange = {handleInputChange} />
          <Button className='mt-5 w-full'><WandSparkles /> Generate Video</Button>
        </div>
        <div>
  <Preview formData={formData} />
</div>
      </div>


    </div>
  )
}

export default CreateNewVideo