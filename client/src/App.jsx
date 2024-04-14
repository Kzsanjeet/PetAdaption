import React from 'react'
import Hero from './components/Hero'
import IconCollection from './components/IconCollection'
import CardCollection from './components/CardCollection'
import Footer from './components/Footer'
import ProductDetail from './components/ProductDetail'

const App = () => {

  return (
    <>
      <Hero />
      <div className="relative -top-24">
      <IconCollection />
      <CardCollection />
      </div>
      <ProductDetail />
      <Footer />
    </>
  )
}

export default App