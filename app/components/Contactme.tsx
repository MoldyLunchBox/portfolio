'use client';
import { useRef, useState } from "react";
import {Map} from "./Map"
import emailjs from '@emailjs/browser';

// @ts-nocheck
// use client
export const Contactme = () => {
  const form = useRef<HTMLFormElement>(null);
  const [success, setSuccess] = useState(false)
  const handleSubmit = (e: any) =>{
    e.preventDefault()
    if (form.current){
      try{

        emailjs.sendForm('service_dfbzv2d', 'template_gsuwpmr', form.current, 'LTyAnzVB5cBw9Swnl')
        .then((result) => {
          console.log(result.text);
          setSuccess(true)
        }, (error) => {
          console.log(error.text);
          setSuccess(false)
        });
      }
      catch (error){
        setSuccess(false)
      }
    }
  }
  return (
    <div className='flex items-center justify-between snap-center h-[100vh]'>
<div className="basis-1/2 flex justify-end   ">
      <form action="" ref={form} className="flex  w-full max-w-[450px] flex-col gap-4">
        <h1 className="text-white"> Contact me</h1>
        <input placeholder="Title" name="title" className="bg-[#e8e8e6] p-2 rounded-[2px]" type="text" />
        <input placeholder="Your email" name="email" className="bg-[#e8e8e6] p-2 rounded-[2px]" type="email" />
        <textarea placeholder="Type your message" name="message" className="bg-[#e8e8e6] rounded-[2px] p-4" cols="30" rows="10"></textarea>
        <button onClick={handleSubmit} className="bg-[yellow]"> Send</button>
        {success ? "Message sent succesfully" : null}
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

