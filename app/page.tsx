import Image from 'next/image'
import styles from './page.module.css'
import { Contactme } from './components/Contactme'
import { Whoami } from './components/Whoami'
import { Works } from './components/Works'
import { Intro } from './components/Intro'
import { Navbar } from './components/Navbar'

export default function Home() {
  return (

    <main className=''>
      <div className=' bg-gradient-to-r   from-black from-10% via- to-violet-900 overflow-y-auto scroll-smooth snap-y snap-mandatory h-[100vh]'>
        <div className='flex justify-center '>
        <div className='container'>

        < Intro />

        </div>
        </div>
        {/*
        <Contactme />
        <Whoami />
        <Works /> */}
      </div>
    </main>
  )
}
