import React from 'react'
import { options } from './VideoStyle'
import Image from 'next/image'

function Preview({formData}) {
  console.log(formData?.caption, formData)
  const selectedStyle = formData && options.find(i => i.name == formData?.videoStyle)
  return (
    <div className='relative mx-3'>
      <h2 className='mb-3 text-2xl'>Preview</h2>
      {selectedStyle?.image && <Image className='w-full h-[70vh] object-cover rounded-xl'
      alt={selectedStyle?.name} src={selectedStyle?.image} width={1000} height={300}/>}
      <h2 className={formData?.caption?.style + ' '+ 'absolute bottom-7 text-center w-full'}>{formData?.caption?.name}</h2>
    </div>
  )
}

export default Preview