import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div 
    className='flex flex-col justify-center items-center
    text-center my-20'>
      <div 
      className='text-stone-500 inline-flex text-center gap-2
      bg-white px-6 py-1 rounded-full border border-neural-500'>
        <p>Best text to image generator</p>
        <img src={assets.star_icon} alt="" />
      </div>

      <h1 
      className='text-4xl max-w-[300px] sm:text-7xl sm:max-w-[590px]
      mx-auto mt-10 text-center'
      >
        Turn to <span className='text-blue-600'>image</span>, in seconds.
      </h1>

      <p className='text-center max-w-xl mx-auto mt-5'
      >
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed, consequatur! Totam vel eligendi tempore cumque quasi vitae perspiciatis similique! Maiores harum dicta est quasi voluptate, enim fugit consequuntur quam doloribus.
      </p>

      <button 
      className='sm:text-lg text-white bg-black w-auto mt-8 
      px-12 py-2.5 flex items-center gap-2 rounded-full'>
        Generate Image
        <img src={assets.star_group} className='h-6' />
      </button>

    <div className='flex flex-wrap justify-center mt-16 gap-3'>
        {Array(6).fill('').map((item, index) => (
            <img 
            className='rounded hover:scale-105 transition-all 
            duration-300 cursor-pointer max-sm:w-10' 
            src={index % 2 === 0 ?assets.sample_img_1 : assets.sample_img_2} 
            key={index} width={70} />
        ))}       
    </div>

    <p className='mt-2 text-neural-600'>Generated images from imageify</p>

    </div>
  )
}

export default Header
