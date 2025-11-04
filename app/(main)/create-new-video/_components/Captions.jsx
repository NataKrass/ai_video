import React, { useState } from 'react';

const options = [
  {
    name: 'Youtuber',
    style: 'text-yellow-400 text-3xl font-extrabold uppercase'
  },
  {
    name: 'Superme',
    style: 'text-white text-3xl font-bold italic uppercase drop-shadow-lg'
  },
  {
    name: 'Neon',
    style: 'text-green-500 text-3xl font-extrabold uppercase'
  }

];

function Captions({ handleInputChange }) {
  const [selected, setSelected] = useState('');

  return (
    <div className='mt-5'>
      <h2>Caption Style</h2>
      <p className="text-sm text-gray-400">Select Caption Style</p>
      <div className="flex flex-wrap gap-4 mt-2">
        {options.map((el, idx) => (
          <div
            key={idx}
            onClick={() => {
              setSelected(el.name)
              handleInputChange('caption', el)
            }}
            className={`p-2 hover:border bg-slate-900
                     border-gray-300 cursor-pointer rounded-lg ${selected == el.name && 'border'}`}
          ><h2 className={el.style}>{el.name}</h2>
          </div>
        ))}

      </div>
    </div>
  )
}

export default Captions