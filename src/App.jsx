import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import Service from './sections/Service'
import Experiences from './sections/Experiences'
import Achievements from './sections/Achievements'
import Projects from './sections/Projects'
import CtaAndFooter from './sections/CtaAndFooter'

function App() {
  return (
    <>
    <div className='bg-[#292929]'>
      <Navbar/>
      <Hero/>
      <About/>
      <Service/>
      <Experiences/>
      <Achievements/>
      <Projects/>
      <CtaAndFooter/>
    </div>
    </>
  )
}

export default App
