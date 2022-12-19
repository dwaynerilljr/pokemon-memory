import React from 'react'
import './SingleCard.css'

export default function SingleCard({ card, handleChoice, flipped }) {
    const handleClick = () => {
        handleChoice(card);
    }


  return (
    <div className='card'>
        <div className={flipped ? "flipped" : ""}>
            <img className='front' src={card.src} alt="card front" />
            <img 
                className='back' 
                onClick={handleClick} 
                src="/img/pokerenk.png" 
                alt="card back" 
            />
        </div>
    </div>
  )
}
