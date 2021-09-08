import React,{useEffect} from "react"
import {Link} from "react-router-dom"


function StartPage(){
    useEffect(()=>{ 
         document.title="Tarot Reader"
              },[]) 
    return(<main>

  <header>What kind of reading are you looking for today?</header>
    <div className="cardcontainer">

        <div className="card">
         <Link to ="/OneCard">
          <h1>One Card Reading</h1>
         <img src={"img/fool.jpg"} alt="One Card Reading" className="cardimage"/>
         </Link>
         <p>Just a one card summary reading.</p>
         </div> 

        <div className="card">

        <Link to ="/ThreeCards">
        <h1>Three Card Reading</h1>
        <img src={"img/magician.jpg"} alt="Three Card Reading" className="cardimage"/>
        </Link>
        <p>"Past Present Future" reading.</p>
        
        
        </div> 

        <div className="card">
        <Link to ="/TodaysCard">
        <h1>Todays Card</h1>
        <img src={"img/high_priestess.jpg"} alt="Todays Card" className="cardimage"/>
        </Link>
        <p>Your card of the day according to numerology.</p>
        </div> 
    </div>
</main>
    )
}
export default StartPage