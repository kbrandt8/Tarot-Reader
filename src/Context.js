import React,{useState,useEffect} from "react"
import theCards from "./theCards"

const Context = React.createContext()

function ContextProvider({children}){
  useEffect(()=>{
    startOver()
          },[]) 

  const [drawnCards, setDrawnCards] = useState([]) 
  const [deck, setDeck] = useState([])
  
    function startOver(){
    
      setDeck([])
      setDeck(theCards)
      setDrawnCards([])
    }

   function getCard(birth){
     const today = new Date()
 function add(theDay){return theDay.getMonth()+1 + theDay.getDate() + theDay.getFullYear()}
     let all = add(today) + add(birth)
 function newArr(num){return num.toString().split('').map(Number)} 
     const arr =  newArr(all)
     let result = arr.reduce((a, b) => a + b)
  if (result>22){
     let result2 = newArr(result).reduce((a, b) => a + b)
     const newCard = deck[result2]
     setDrawnCards( prevItems=>[...prevItems,newCard])
  }else{
    const newCard = deck[result]
    setDrawnCards( prevItems=>[...prevItems,newCard])
  }
  }

function findCard(birth){
 function add(theDay){return theDay.getMonth()+1 + theDay.getDate() + theDay.getFullYear()}
   let all = add(birth)
 function newArr(num){return num.toString().split('').map(Number)} 
   const arr =  newArr(all)
   let result = arr.reduce((a, b) => a + b)
 if (result>22){
   let result2 = newArr(result).reduce((a, b) => a + b)
   const newCard = deck[result2]
   setDrawnCards( prevItems=>[...prevItems,newCard])
 }else{
   const newCard = deck[result]
   setDrawnCards( prevItems=>[...prevItems,newCard])
   }
}

 function draw(){
  const num =  Math.floor(Math.random() * deck.length)
    const newCard = deck[num]
    const rev = Math.floor(Math.random() * 100)
    rev<50 ? newCard.reverse=true : newCard.reverse=false 
  if(drawnCards.length ===0)
    { newCard.when="The card is an overall look at your situation."
  }
  setDrawnCards( prevItems=>[...prevItems,newCard] )
  setDeck(prevItems => prevItems.filter(item => item.id !== newCard.id))
}
 
function drawThree(){
    if(deck.length > 0)
        { 
          const num =  Math.floor(Math.random() * deck.length)
          const newCard = deck[num]
          const rev = Math.floor(Math.random() * 100)
          rev<50 ? newCard.reverse=true : newCard.reverse=false
          if(drawnCards.length ===0)
          { newCard.when="Past"
        } else if(drawnCards.length ===1){
          newCard.when="Present"
        } else if(drawnCards.length ===2){
          newCard.when="Future"
        }
          setDrawnCards( prevItems=>[...prevItems,newCard] )
          setDeck(prevItems => prevItems.filter(item => item.id !== newCard.id))
           }
           else{
             alert("No More Cards!")
           }
  }
    
 
      
return(
        <Context.Provider value={{drawThree,drawnCards,deck,draw,getCard,findCard,startOver}}>
           {children}
        </Context.Provider>
  )
}


export {ContextProvider,Context}
