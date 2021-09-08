import React,{useContext,useEffect} from "react"
import Card from "./Card.js"

import Nav from "./Nav"
import {Context} from "./Context"


function OneCard(){
    const {drawnCards,draw,startOver} = useContext(Context)

    useEffect(()=>{
        startOver()
         document.title="One Card Reading - Tarot Reader"
              },[]) 
const showCards = drawnCards.map(item => (
    <Card key={item.id} item={item}/>
   ))
    return(
        <div>

        <Nav/>
        {drawnCards.length === 0 ? <h3>Ready for your reading?</h3>:""}
        <div  className="buttoncontainer">
        {drawnCards.length > 0 ?<button onClick={()=>startOver()}>Draw a new card.</button> : ""}
    
           {drawnCards.length < 1 &&
          <button onClick={()=>draw()}>Draw One Card</button>  }        
        
        </div>
   
        <div className="cardcontainer">
        {showCards}
        
        </div>
 
        
    
    </div>
    )
}

export default OneCard