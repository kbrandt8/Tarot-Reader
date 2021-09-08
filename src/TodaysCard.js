import React,{useContext,useEffect,useState} from "react"
import Card from "./Card2.js"
import Nav from "./Nav"
import {Context} from "./Context"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function TodaysCard(){
    const {drawnCards,getCard,startOver,findCard} = useContext(Context)
    const [startDate, setStartDate] = useState(new Date());
let today = new Date()

useEffect(()=>{
    startOver()
    document.title="Todays Card - Tarot Reader"
          },[]) 

const showCards = drawnCards.map(item => (
    <Card key={item.id} item={item}/>
   ))
  
    return(
        <div>

        <Nav/>
        

        <div  className="buttoncontainer">
        
        {drawnCards.length > 0 && <div>{today.getMonth()+1 === startDate.getMonth()+1 && today.getDate() === startDate.getDate() ? 
        <header>Happy Birthday!</header> : ""}<button onClick={()=>startOver()}>Use a New Birthday!</button>
        
        

        </div>}
    


           {drawnCards.length < 1 &&
           <div>
              <header>Ready for your reading?
               <h1> Tell us your birthday!</h1> 

              </header>


               
            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)}  className="date"/> 
          
          <header>
            <button onClick={()=>getCard(startDate)}>Card of the Day</button>
            <h1>We add your birthday to todays date with numerology to calculate your card of the day!</h1>
            
            </header>
            <header>
            <button onClick={()=>findCard(startDate)}>Birthday Card</button>
            <h1>We just add your birthday up with numerology to calculate your birthday card!</h1>
            </header>
            </div>
        
        
        
         }        
        
        </div>
       
       

        <div className="cardcontainer">
        {showCards}
        
        </div>
        
    
    </div>
    )
}

export default TodaysCard
