import React from 'react'
import IconCard from './IconCard'
import dogicon from '../assets/icons/dogicon.png'
import caticon from '../assets/icons/caticon.png'
import peticon from '../assets/icons/peticon.png'
import sheltericon from '../assets/icons/shelter.png'

const IconCollection = () => {
  return (
    <><div className= "flex justify-center gap-8 -left-4">
        <IconCard name = "Dog" icon = {dogicon}/>
        <IconCard name = "Cat" icon = {caticon}/>
        <IconCard name = "Other Pets" icon = {peticon}/>
        <IconCard name = "Shelters" icon = {sheltericon}/>
    </div>
    </>
  )
}

export default IconCollection