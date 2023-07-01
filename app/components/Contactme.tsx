'use client';
import { useRef } from "react";
import {Map} from "./Map"
import emailjs from '@emailjs/browser';

// @ts-nocheck
// use client
export const Contactme = () => {
  const form = useRef<HTMLFormElement>(null);
  const handleSubmit = (e: any) =>{
    e.preventDefault()
    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, 'YOUR_PUBLIC_KEY')
    .then((result) => {
        console.log(result.text);
    }, (error) => {
        console.log(error.text);
    });
  }
  return (
    <div className='flex items-center justify-between snap-center h-[100vh]'>
<div className="basis-1/2 flex justify-end   ">
      <form action="" ref={form} className="flex  w-full max-w-[450px] flex-col gap-4">
        <h1 className="text-white"> Contact me</h1>
        <input placeholder="Title" className="bg-[#e8e8e6] p-2 rounded-[2px]" type="text" />
        <input placeholder="Your email" className="bg-[#e8e8e6] p-2 rounded-[2px]" type="text" />
        <textarea placeholder="Type your message" className="bg-[#e8e8e6] rounded-[2px] p-4" name="" id="" cols="30" rows="10"></textarea>
        <button onClick={handleSubmit} className="bg-[yellow]"> Send</button>
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

