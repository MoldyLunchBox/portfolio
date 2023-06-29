import Image from 'next/image'
import styles from './page.module.css'
import { Contactme } from './components/Contactme'
import { Whoami } from './components/Whoami'
import { Works } from './components/Works'
import { Intro } from './components/Intro'

export default function Home() {
  return (

<main>
  <div className='bg-[rebeccapurple] no-scrollbar  overflow-y-auto scroll-smooth snap-y snap-mandatory h-[100vh]'>

  < Intro/>
  <Contactme/>
  <Whoami/>
  <Works/>
  </div>
</main>
  )
}
