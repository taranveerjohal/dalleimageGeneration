import React from 'react'
import { Routes, Link, Route} from 'react-router-dom'
import {Home, CreatePost} from '../pages'
import {logo} from '../assets'
import { MdAddAPhoto } from 'react-icons/Md';
import { RiSlideshow2Line } from 'react-icons/Ri';
const MainLayout = () => {
  return (
    <div >
        <header className='w-full flex justify-between items-center bg-slate-300 sm:px-8 px-4 py-2 border-b border-b-[#e6ebf4]' >
            <Link to='/'>
                <img src={logo} className='w-28 object-contain max-[410px]:w-[200px] max-[360px]:w-[300px]' />
                By<span className='font-bold'> TJ </span>
            </Link>
            <div className='sm:ml-4'>
            <Link type="button" to="/" className=' max-[410px]:ml-[150px]  max-[500px]:mb-2 max-[500px]:text-xs md:self-end  hover:scale-110 transition duration-150 ease-in-out sm:w-xs w-md hover:shadow-lg font-inter font-medium bg-blue-500 text-white px-4 py-2 mr-2 rounded-md hover:bg-blue-600' >
                <div className='flex flex-row items-center '>
                    <div className='pr-3'><RiSlideshow2Line /> </div>
                    Showcase
                </div>
            </Link>
            <Link type="button" to="/create-post" className=' max-[410px]:ml-[130px]  max-[500px]:text-xs hover:scale-110 transition  duration-150 ease-in-out hover:shadow-lg font-inter font-medium bg-purple-500 hover:bg-purple-600 text-white px-4 py-2  rounded-md' >
                <div className='flex flex-row items-center justify-evenly'>
                    <div className='pr-3'><MdAddAPhoto /> </div>
                    Create Images
                </div>
            </Link>
            </div>
        </header>
        <main className='sm:p-8 px-4 py-8 w-full bg-white min-h-[calc(100vh-126px)]' >
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/create-post' element={<CreatePost />} />
        </Routes>
        </main>
        <footer className='w-full relative bottom-0 left-0 flex justify-center items-center bg-slate-300 sm:px-8 px-4 py-4 border-t border-b-[#e6ebf4]' >
            <p className='text-[#666e75] text-[16px] font-semibold' >
                Made with packsNpotions 🧪 by <a href='https://www.linkedin.com/in/taranveer-singh-johal-8322459a/' target='_blank' rel='noreferrer' className='underline' >TJ</a>
            </p>
        </footer>
    </div>
  )
}

export default MainLayout