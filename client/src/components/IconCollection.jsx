import React from 'react'
import IconCard from './IconCard'
import dogicon from '../assets/icons/dogicon.png'
import caticon from '../assets/icons/caticon.png'
import peticon from '../assets/icons/peticon.png'
import sheltericon from '../assets/icons/shelter.png'

const IconCollection = () => {
  return (
    <><div className= "flex justify-center gap-2 md:gap-8 sm:gap-4">
        <IconCard name = "&nbsp;&nbsp;Dog&nbsp;&nbsp;&nbsp;" icon = {dogicon}/>
        <IconCard name = "&nbsp;&nbsp;Cat&nbsp;&nbsp;&nbsp;&nbsp;" icon = {caticon}/>
        <IconCard name = "Others&nbsp;" icon = {peticon}/>
        <IconCard name = "Shelters" icon = {sheltericon}/>
    </div>
    </>
  )
}

export default IconCollection