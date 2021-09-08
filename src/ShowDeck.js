import React,{useContext,useEffect} from "react"
import "./styles.css"
import Card from "./Card2.js"
import Nav from "./Nav"
import {Context} from "./Context"

function ShowDeck(){
    const {deck,startOver} = useContext(Context)
    
    useEffect(()=>{
        startOver()
         document.title="See The Deck - Tarot Reader"
              },[]) 

const showDeck = deck.map(item => (
    <Card key={item.id} item={item}/>
   ))
   
    return(
        <div>

        <Nav/>
        <div className="deckcontainer">
         
        {showDeck}
        
        </div>
        
    
    </div>
    )
}

export default ShowDeck