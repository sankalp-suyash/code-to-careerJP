import React from 'react'
import Navbar from './shared/Navbar'
import { HeroSection } from './HeroSection'
import Categorycarousel from './Categorycarousel'
import LatestJobs from './LatestJobs'
import Footer from './Footer'

export const Home = () => {
  return (
    <div>
        <Navbar/>
        <HeroSection/>
        <Categorycarousel/>
        <LatestJobs/>
        <Footer/>
    </div>
  )
}
