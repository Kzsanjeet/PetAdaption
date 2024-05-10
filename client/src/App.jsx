import React from 'react'
import Hero from './components/Hero'
import IconCollection from './components/IconCollection'
import CardCollection from './components/CardCollection'
import Footer from './components/Footer'
import ProductDetail from './components/ProductDetail'
import PetList from './components/PetList'
import Navbar from './components/Navbar'

const App = () => {

  return (
    <>
      <Hero/>
      <div className="relative -top-16 md:-top-24">
      <IconCollection />
      <CardCollection />
      </div>
      <Footer />
    </>
  )
}

export default App