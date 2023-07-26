'use client';
import { useRef, useState } from "react";
import { Map } from "./Map"
import emailjs from '@emailjs/browser';
import { ContactInfo } from "./ContactInfo";

// @ts-nocheck
// use client
export const Contactme = () => {
  const form = useRef<HTMLFormElement>(null);
  const [success, setSuccess] = useState(false)
  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (form.current) {
      try {

        emailjs.sendForm('service_dfbzv2d', 'template_gsuwpmr', form.current, 'LTyAnzVB5cBw9Swnl')
          .then((result) => {
            setSuccess(true)
          }, (error) => {
            setSuccess(false)
          });
      }
      catch (error) {
        setSuccess(false)
      }
    }
  }
  return (
    <>
      <div id="endOfPage" className='flex items-start md:items-center justify-between snap-center h-[100vh]'>
        <div className="md:basis-1/2 mt-10 md:ml-5 md:mt-0 basis-1 flex   justify-end  md:justify-end ">
          <form action="" ref={form} className="flex  w-full max-w-[450px] flex-col gap-4">
            <h2 className="uppercase font-semibold text-white"> Contact me</h2>
            <input placeholder="Title" name="title" className="bg-[#e8e8e6] p-2 rounded-[2px]" type="text" />
            <input placeholder="Your email" name="email" className="bg-[#e8e8e6] p-2 rounded-[2px]" type="email" />
            <textarea placeholder="Type your message" name="message" className="bg-[#e8e8e6] rounded-[2px] p-4" cols={30} rows={10}></textarea>
            <button onClick={handleSubmit} className="bg-[yellow]"> Send</button>
            {success ? "Message sent succesfully" : null}
          <div className="text-center justify-center">
            <ContactInfo />
          </div>
          </form>
        </div>
        <div className=" h-full  text-white basis-1/2 hidden md:block">
          <div className="h-full  w-full">

            <Map />
          </div>
        </div>

      </div>
    </>
  )
}

