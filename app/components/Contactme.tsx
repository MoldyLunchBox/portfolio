'use client';
import {Map} from "./Map"

// @ts-nocheck
// use client
export const Contactme = () => {
  return (
    <div className='flex items-center justify-between snap-center h-[100vh]'>
<div className="basis-1/2 flex justify-end   ">
      <form action="" className="flex  w-full max-w-[450px] flex-col gap-4">
        <h1 className="text-white"> Contact me</h1>
        <input placeholder="Title" className="bg-[#e8e8e6] p-2 rounded-[2px]" type="text" />
        <input placeholder="Your email" className="bg-[#e8e8e6] p-2 rounded-[2px]" type="text" />
        <textarea placeholder="Type your message" className="bg-[#e8e8e6] rounded-[2px] p-4" name="" id="" cols="30" rows="10"></textarea>
        <button className="bg-[yellow]"> Send</button>
      </form>
</div>
      <div className=" h-full text-white basis-1/2">
        <div className="h-full w-full">

        <Map />
        </div>
      </div>
    </div>
  )
}

