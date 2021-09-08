import React,{useContext,useEffect} from "react"
import Card from "./Card.js"
import Nav from "./Nav"
import {Context} from "./Context"


function ThreeCards(){

  const {drawnCards,drawThree,startOver} = useContext(Context)

  useEffect(()=>{
    startOver()
     document.title="Three Card Reading - Tarot Reader"
          },[]) 

const showCards = drawnCards.map(item => (
     <Card key={item.id} item={item}/>
    ))

return(
  <main>

    <Nav/>
    {drawnCards.length === 0 ? <header>Ready for your reading?</header>:""}
    <div  className="buttoncontainer">
    {drawnCards.length > 0 ?<button onClick={()=>startOver()}>Start Over</button> : ""}

      {drawnCards.length < 3 ?
      <button onClick={()=>drawThree()}>Draw</button> : ""  }       
      
    </div>
    <div className="cardcontainer">
    {showCards}
    </div>

</main>

        
    )
}

export default ThreeCards