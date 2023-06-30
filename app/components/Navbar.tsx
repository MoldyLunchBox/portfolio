import React from 'react'

export const Navbar = () => {
  return (
    <div className='w-full justify-center  '>
        <div className='flex items-center justify-between  text-white'>
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
