import Image from 'next/image'
import styles from './page.module.css'
import { Contactme } from './components/Contactme'
import { Whoami } from './components/Whoami'
import { Works } from './components/Works'
import { Intro } from './components/Intro'
import { Navbar } from './components/Navbar'
import { Apportonity } from './components/Apportonity'

export default function Home() {
  return (
    <div className=' bg-gradient-to-r   from-black from-10%  to-violet-900 overflow-y-auto scroll-smooth snap-y snap-mandatory h-[100vh] flex flex-col items-center' >
 
        <div className='container'>

          < Intro />
          <Whoami />
           <Works />
         {/* <Apportonity /> */}
        </div>
        {/* <div className="ml-auto pl-5">
          <Contactme />

        </div> */}

</div>

    
  )
}
