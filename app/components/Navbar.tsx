import React from 'react'

export const Navbar = () => {
  return (
    <div className='w-full justify-center  max-w-[1000px] '>
        <div className='flex items-center  m-2 sm:m-4 lg:m-5 justify-between  text-white  sm:text-lg'>
            <div>
                <ul className='flex gap-4' >
                  <li>Home</li>
                  <li>Me</li>
                  <li>Works</li>
                  <li>Contact me</li>
                </ul>
            </div>
            <div>
                
                <button className='bg-[#E3C515] shadow-md border  border-black text-white p-2 rounded '> Hire Now</button>
            </div>
        </div>
    </div>
  )
}
