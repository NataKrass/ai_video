"use client"
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from '@/components/ui/button'
import { Textarea } from "@/components/ui/textarea"
import { Loader2Icon, SparkleIcon } from 'lucide-react'
import axios from 'axios'

const suggestions = [
  "Historic Story",
  "Kids Story",
  "Movie Stories",
  "AI Innovations",
  "Space Mysteries",
  "Horror Stories",
  "Mythological Tales",
  "Tech Breakthroughs",
  "True Crime Stories",
  "Fantasy Adventures",
  "Motivational Stories",
  "Science experiments"
]

function Topic({ handleInputChange }) {

  const [selected, setSelected] = useState('Kids Story');
  const [selectedScriptIdx, setselectedScripIdx] = useState();
  const [script, setScript] = useState([
    {
        content: "Once upon a time, lived a tiny seed. The wind blew it far, far away. The sun warmed the seed, and the rain watered it. Slowly, a little sprout peeked out. It grew and grew, becoming a tall, strong tree. Birds sang in its branches, squirrels played around its roots, and everyone enjoyed its shade. The tiny seed had become a home for all!"
    },
    {
        content: "Lily loved to draw. One day, she drew a sad little cloud. Suddenly, it started raining inside her house! Lily quickly drew a big, bright sun. The rain stopped, and the sun shone warmly on her. From that day on, Lily knew her drawings could make the world a little brighter, one picture at a time."
    }
]);
  const [loading, setLoading] = useState(false);

  const generateScript = async () => {
    setLoading(true);
    setselectedScripIdx(null);
    try {
      const result = await axios.post('/api/generate-script', {
        topic: selected
      });
      console.log('result data:', result?.data?.scripts)
      setScript(result?.data?.scripts);
    }
    catch (e) {
      console.log(e);
    }
    setLoading(false);
  }

  return (
    <div>
      <h2 className='my-2'>Project Title</h2>
      <Input placeholder='Enter Project Title' onChange={(e) => handleInputChange('title', e?.target.value)} />
      <div className='mt-5'>
        <h2>Video Topic</h2>
        <p className='text-sm text-gray-600'>Select Topic for Your Video</p>
      </div>

      <Tabs defaultValue="suggestions" className="w-full">
        <TabsList>
          <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
          <TabsTrigger value="your_topic">Your Topic</TabsTrigger>
        </TabsList>
        <TabsContent value="suggestions" className='w-full mt-2'>
          <div className='flex flex-wrap w-full'>
            {suggestions.map((item, idx) => (
              <Button onClick={() => {
                handleInputChange('topic', item)
                setSelected(item)
              }}
                className={item == selected ? 'm-2 bg-secondary' : 'm-2'} key={idx} variant='outline'>{item}</Button>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="your_topic">
          <div>
            <h2>Enter Your Own Topic</h2>
            <Textarea placeholder='Type the Topic'
              onChange={(e) => handleInputChange('topic', e.target.value)} />
          </div>
        </TabsContent>
      </Tabs>
      {script?.length > 0 &&
       <div className='mt-3'>
        <h2>Select The Script</h2>
        <div className='grid grid-cols-2 gap-5'>
          {script?.map((item, idx) => (
            <div 
              key={idx} 
              onClick={() => {
                setselectedScripIdx(idx);
                handleInputChange('script', item.content)
              }}
              className={`p-3 cursor-pointer border rounded-lg mt-1 ${selectedScriptIdx == idx && 'border-white bg-secondary'}`}>
              <h2 className='line-clamp-3 text-sm text-gray-300'>
                {item.content}</h2>
            </div>
          ))}
        </div>
        </div>
        }
     
      {!script?.length && <Button disabled={loading} className='mt-5' size='sm' onClick={generateScript}>
        {loading ? <Loader2Icon className='animate-spin'/> : (<SparkleIcon /> )}Generate Script</Button>}
    </div>
  )
}

export default Topic