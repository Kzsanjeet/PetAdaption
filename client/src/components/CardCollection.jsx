import React from 'react'
import Card from './Card'
import labrador from '../assets/images/labrador.webp'
import spitz from '../assets/images/JapaneseSpitz.png'
import britishShorthair from '../assets/images/britishShorthair.jpg'
import ragdoll from '../assets/images/ragdoll.jpeg'

const CardCollection = () => {
  return (
    <>
        <div className="mt-36">
            <h2 className="font-bold text-4xl text-center mb-10">These Beautiful Pets Are <br></br><span>Waiting For Your Love And Care</span></h2>
            <div className ="flex justify-center gap-10">
                <Card name ="Bruno" breed="Labrador Retriever" image = {labrador}/>
                <Card name ="Tommy" breed="Japanese Spitz" image = {spitz}/>
                <Card name ="Whiskerson" breed="Labrador Retriever" image = {britishShorthair}/>
                <Card name ="Bella" breed="Ragdoll" image = {ragdoll}/>
            </div>
        </div>
    </>
  )
}

export default CardCollection