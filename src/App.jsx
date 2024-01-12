import { useEffect, useState } from 'react'
import Dice from '../components/Dice'
import './App.css'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

function App() {

  const [diceNum, setDiceNum] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)
  
  function holdDice(id) {
    setDiceNum(oldDice => oldDice.map( dice => {
      return dice.id == id ? {...dice, isHeld: !dice.isHeld} : dice
    }))
    
  }

  function generateNewDice(){
    return {
      value:Math.floor(Math.random() * 6) + 1,
      isHeld: false, 
      id: nanoid()
    }
  }

  useEffect(() => {
    const allHeld = diceNum.every(die => die.isHeld)
    const firstValue = diceNum[0].value
    const allValues = diceNum.every(die => die.value === firstValue)
    if(allHeld && allValues){
      setTenzies(true)
    }
    
  }, [diceNum])

  const diceElement = diceNum.map((num) => {
    return (
      <Dice className="layout-grid-item" 
        value={num.value} 
        isHeld={num.isHeld} key={num.id} 
        holdDice={() => holdDice(num.id)}/>
      )
    }
  )

  function allNewDice() {
    const numArray = []
    for(let i=0; i<10 ; i++){

      numArray.push(generateNewDice())
    }
    return numArray
  }

  function diceRoll() {
    if(!tenzies){
    
    setDiceNum( oldDice => oldDice.map( die => {
      return die.isHeld===true ? die : generateNewDice()
    }))
    }
    else{
      setTenzies(false)
      setDiceNum(allNewDice())
    }
  
  }


  return (
    <main>
      {tenzies&& <Confetti />}
      <h1 className='tittle'>Tenzies</h1>
      <p className="instructions">Roll until all dice are same. Click each die to freeze it at its current value between rolls.</p>
      <div className="layout--main">

        {diceElement}

      </div>
      <button className='layout--button' 
        onClick={diceRoll}>
          {tenzies ? 'New Game' : 'Roll'}
      </button>
      
    </main>
  )
}

export default App
