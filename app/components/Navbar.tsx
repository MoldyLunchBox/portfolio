import React from 'react'

export const Navbar = () => {
  const scrollToBottom = (section : string) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'end', // Scroll to the bottom of the element
      });
    }
  };
  return (
    <div className='w-full justify-center  max-w-[1000px] '>
        <div className='flex items-center  m-2 sm:m-4 lg:m-5 justify-between  text-white  sm:text-lg'>
            <div>
                <ul className='flex gap-4' >
                  <li className='cursor-pointer worksElements' onClick={(e)=>scrollToBottom("home")}>Home</li>
                  <li className='cursor-pointer worksElements' onClick={(e)=>scrollToBottom("me")}>Me</li>
                  <li className='cursor-pointer worksElements' onClick={(e)=>scrollToBottom("works")}>Works</li>
                  <li className='cursor-pointer worksElements' onClick={(e)=>scrollToBottom("contact")}>Contact me</li>
                </ul>
            </div>
            <div>
                
                <button  onClick={(e)=>scrollToBottom("endOfPage")} className='bg-[#E3C515] worksElements shadow-md border  border-black text-white p-2 rounded '> Hire Now</button>
            </div>
        </div>
    </div>
  )
}
