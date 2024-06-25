import { useEffect, useState } from 'react';
import './App.css';
import Die from './Die';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';


function App() {
  const [dice,setDice] = useState(allNewDice())
  const [tenzie,setTenzie] = useState(false)


  useEffect(() =>{
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if(allHeld && allSameValue){
      setTenzie(true)
      
    }
  },[dice])


function generateNewDice(){
  return{
    value: Math.ceil(Math.random() * 6),
    isHeld:false,
  id:nanoid()
    
  }
}  

  function allNewDice (){
    const newDice =[]
    for(let i=0;i<10;i++){
      newDice.push(generateNewDice()
        )
    }
    return newDice
  }

  function rollDice(){
    if(!tenzie){
    setDice(oldDice => oldDice.map(die=>{
      return die.isHeld ?
      die :
      generateNewDice()
    }
  ))
}
    else{
      setTenzie(false)
      setDice(allNewDice)
    }
  }

   function holdDice(id){
    setDice(oldDice =>oldDice.map(die =>{
      return die.id === id ?
      {
        ...die,isHeld:!die.isHeld} : die
    }))
   }



   const diceElements = dice.map(die => 
    (<Die 
      key ={die.id} 
      value={die.value}
       isHeld={die.isHeld} 
       holdDice={()=> holdDice(die.id)}
    
       />)
   )


  return (
      <main>
        {/* {tenzie && <Confetti />} */}
        {tenzie && <Confetti/>}
         <h1 className="title">Tenzies</h1>
         <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className='dice-container'>
        {diceElements }
        </div>
        <button className='roll-dice'
         onClick={rollDice}>
          {tenzie ? "New Game" :"Roll"}
          </button>
      </main>
        
  );
}

export default App;
