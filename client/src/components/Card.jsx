import React from 'react'
import {download} from '../assets'
import {downloadImage} from '../utilities'

const Card = ({_id, name, prompt, image}) => {
  return (
    <div className='rounded-xl group relative shadow-card hover:shadow-cardhover card'>
      <img className='w-full h-auto object-cover rounded-xl'
        src={image}
        alt={prompt}
      />
      <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black rounded-xl opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out' />
      <div className='absolute top-0 left-0 w-full h-full flex flex-col justify-end items-start p-4'>
        <div className='flex flex-row justify-between mb-2 items-center'>
          <div className='flex gap-3 w-7 h-7 rounded-full bg-green-700 justify-center items-center text-white text-xs font-bold'>
            {name[0].toUpperCase()}
          </div>
          <div>
            <h3 className=' relative text-2xl ml-3 text-white font-extrabold'>{name}</h3>
          </div>
        </div>
          <p className='text-white text-sm'>{prompt}</p>
        <button
          className='mt-3 px-5 flex flex-row justify-center items-center text-white rounded-md  sm:w-auto w-full font-semibold  py-2 hover:bg-white hover:text-[#6469ff]'
          onClick={() => downloadImage(image, _id)}
        >
          <img src={download} alt='download' className='w-8 h-8 mr-3' />
          Download
        </button>
      </div>
    </div>
  )
}

export default Card