import React from 'react'
import IconCard from './IconCard'
import dogicon from '../assets/icons/dogicon.png'
import caticon from '../assets/icons/caticon.png'
import peticon from '../assets/icons/peticon.png'
import sheltericon from '../assets/icons/shelter.png'
import { Link } from 'react-router-dom'

const IconCollection = () => {
  return (
    <div className="flex flex-wrap justify-center gap-8">
      <Link to ="/category/dog">
        <IconCard name="  Dog   " icon={dogicon} className="flex flex:0 0 50%"/></Link>
      <Link to ="/category/Cat">
        <IconCard name="  Cat    " icon={caticon} className="flex flex:0 0 50%"/>
      </Link>
      <Link to ="/category/Bird">
        <IconCard name="Others " icon={peticon} className="flex flex:0 0 50%"/>
      </Link>
      <IconCard name="Shelters" icon={sheltericon} className="flex flex:0 0 50%"/>
    </div>
  )
}

export default IconCollection