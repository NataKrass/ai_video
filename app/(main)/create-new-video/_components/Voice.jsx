import React, { useState } from 'react';

const voiceOptions = [
  {
    'name': '🇺🇸 Alloy',
    'value': 'af_alloy',
  },
  {
    'name': '🇺🇸 Sky',
    'value': 'af_sky',
  },
  {
    'name': '🇺🇸 Adam',
    'value': 'am_adam',
  },
  {
    'name': '🚺 Alice (Female)',
    'value': 'bf_alice',
  },
  {
    'name': '🇺🇸 Orion',
    'value': 'aura-orion-en',
  },
];

function Voice({ handleInputChange }) {
  const [selected, setSelected] = useState('');
  return (
    <div className='mt-5'>
      <h2>
        Video Voice
      </h2>
      <p className='text-sm text-gray-400 '>Select voice for your video</p>
      <div className='relative overflow-hidden h-[200px] w-full p-4'>
        <div className='grid grid-cols-2 gap-3'>
          {voiceOptions.map((el, idx) => (
            <div key={idx}>
              <h2
                onClick={() => {
                  setSelected(el.name)
                  handleInputChange('voice', el.value)
                }}
                className={`cursor-pointer p-3 border  hover:border-white
                     dark:bg-slate-900
                    rounded-lg
                     hover:border ${selected == el.name && 'border-white '}`}>{el.name}</h2>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Voice;