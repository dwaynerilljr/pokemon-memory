import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages = [
  { "src": "/img/charizard.png", matched: false },
  { "src": "/img/mewtwo1.png", matched: false },
  { "src": "/img/ninetales.png", matched: false },
  { "src": "/img/pikachu1.png", matched: false },
  { "src": "/img/vaporeon.png", matched: false },
  { "src": "/img/blastoise1.png", matched: false },
]

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  //shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({...card, id: Math.random()}))

      setChoiceOne(null);
      setChoiceTwo(null);
      setCards(shuffledCards)
      setTurns(0)
  }

  //handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }

  //compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })
        resetTurn();
      } else {
        console.log('Cards do not match!')
        setTimeout (() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo])

  //reset turns
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1);
    setDisabled(false)
  }

  //start a new game automatically
  useEffect(() => {
    shuffleCards();
  }, [])

  return (
    <div className="App">
      <h1 id='title'>Pokémon Memory!</h1>
      <button onClick={shuffleCards}>New Game</button>
      <p>Turns: {turns}</p>
      <div className="card-grid">
        {cards.map(card => (
          <SingleCard 
            key={card.id} 
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched === true}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
