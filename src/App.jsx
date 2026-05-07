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
        <main>
          <Hero/>
          <About/>
          <Service/>
          <Experiences/>
          <Achievements/>
          <Projects/>
          <CtaAndFooter/>
        </main>
      </div>
    </>
  )
}

export default App
