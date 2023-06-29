import Image from 'next/image'
import styles from './page.module.css'
import { Contactme } from './components/Contactme'
import { Whoami } from './components/Whoami'
import { Works } from './components/Works'
import { Intro } from './components/Intro'
import { Navbar } from './components/Navbar'

export default function Home() {
  return (

    <main>
      <div className='bg-gradient-to-r overflow-y-auto scroll-smooth snap-y snap-mandatory h-[100vh]'>
        <Navbar />
        {/* < Intro />
        <Contactme />
        <Whoami />
        <Works /> */}
      </div>
    </main>
  )
}
