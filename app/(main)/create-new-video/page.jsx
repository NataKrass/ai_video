'use client'
import React, { useState } from 'react';
import { Loader2Icon, WandSparkles } from 'lucide-react';
import { useMutation } from 'convex/react';
import axios from 'axios';
import { useAuthContext } from '@/app/provider';
import { api } from '@/convex/_generated/api';
import { Button } from '@/components/ui/button';
import Topic from './_components/Topic';
import VideoStyle from './_components/VideoStyle';
import Voice from './_components/Voice';
import Captions from './_components/Captions';
import Preview from './_components/Preview';

function CreateNewVideo() {
  const [formData, setFormData] = useState();
  const [errorText, setErrorText] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuthContext();
  const CreateInitialVideoRecord = useMutation(api.videodata.createVideoData)
  const handleInputChange = (fieldName, fieldValue) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: fieldValue
    }))
  }

  const GenerateVideo = async () => {
    if(user?.credits <= 0 ) {
      toast('Please add more credits!');
      return;
    }

    if(!formData?.title || !formData?.topic || !formData?.videoStyle || !formData?.caption || !formData?.voice ) {
      console.log("Error", "Enter all fields");
      console.log(!formData?.title,  !formData?.topic );
      setErrorText('Fill all fields');
      return;
    } else {
      setLoading(true);
      
      setErrorText(false);
      const resp = await CreateInitialVideoRecord({
        title: formData.title, 
        topic: formData.topic,
        script: formData.script,
        videoStyle: formData.videoStyle,
        caption: formData.caption,
        voice: formData.voice,
        uid: user?._id,
        createdBy: user?.email,
        credits: user?.credits
      })

      const result = await axios.post('/api/generate-video-data', {
        ...formData,
        recordId: resp
      });
      console.log('reesult:', result)
      setLoading(false);
    }
    
  }

  return (
    <div>
      <h2 className='text-3xl'>Create New Video</h2>
      <div className='grid grid-cols-1 md:grid-cols-3 mt-8'>
        <div className='col-span-2 p-7 border rounded-xl h-[70vh] overflow-auto'>
          {/* Topic & script */}
          <Topic handleInputChange={handleInputChange} />
          {/* Video Image Style */}
          <VideoStyle handleInputChange={handleInputChange} />
          {/* Voice */}
          <Voice handleInputChange={handleInputChange} />
          {/* Captions */}
          <Captions handleInputChange={handleInputChange} />
          <p className='text-center text-red-500 text-base'>{errorText}</p>
          {loading ? <Loader2Icon className='animate-spin'/> : <Button disabled={loading} onClick={ GenerateVideo } className='mt-5 w-full'><WandSparkles /> Generate Video</Button>}
        </div>
        <div>
          <Preview formData={formData} />
        </div>
      </div>


    </div>
  )
}

export default CreateNewVideo