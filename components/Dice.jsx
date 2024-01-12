import React, { useState } from 'react'

export default function Dice(props) {

    // const [hold, setHold] = useState(props.isHeld)

    // function diceHold(event) {
    //     setHold((event) => event = !event)
    // }
    //  console.log(props)

    function hello(){
        console.log('hi');
    }
    const styles ={ 
        backgroundColor: props.isHeld===true ? '#59E391' : 'white' }
  return (
    <div className="dice-element" 
        style={styles} 
        onClick={props.holdDice}
    >
      <h2 className="dice-num">{props.value}</h2>
    </div>
  )
}
