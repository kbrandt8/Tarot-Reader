import React, { useContext, useState } from "react"
import { Context } from "../Context"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Collapse from 'react-bootstrap/Collapse'
import {useNavigate,Link} from 'react-router-dom'



function TodaysCard() {
  const { birthCard, card,deck, getCards, showDeck,setBirthCard,saveReading,isLoggedIn} = useContext(Context)
  const [show, setShow] = useState(false)
  const [isBirthCard,setIsBirthCard] = useState(false)
  const [startDate, setStartDate] = useState(new Date());
  const [startDate2, setStartDate2] = useState(new Date());
  const [title,setTitle] = useState("")
  const [notes,setNotes] = useState("")
  const [open, setOpen] = useState(false);
  const navigate = useNavigate()
  const today = new Date()



  return (
    <div>


      {!show && <>

        <h1>  Ready for your reading?  Tell us your birthday!</h1>
        <section>
        <h3>Birthday Card</h3> 
        <p>We add up your birthday with numerology to find your tarot card!</p>         
          <h5>Birthday:</h5>
          <DatePicker 
          selected={startDate} 
          onChange={(date) => setStartDate(date)} 
          className="date" 
          peekNextMonth
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"/>
          <button onClick={() => { birthCard(startDate); setShow(true);setIsBirthCard(true) }}>Birthday Card</button>
        </section>

      
        <section>
        <h3>Todays Card</h3>    
        <p>We add up your birthday and todays date to find todays tarot card for you!</p>
          <h5>Birthday:</h5>
          <DatePicker 
          selected={startDate} 
          onChange={(date) => setStartDate(date)} 
          className="date"
          peekNextMonth
          showMonthDropdown
          showYearDropdown
          dropdownMode="select" />
          <button onClick={() => { birthCard(startDate, today); setShow(true) }}>Todays Card</button>
        </section>

        
        <section>
          <h3>Relationship Card</h3>
          <p>We add up two peoples birthdays to find their relationship card!</p>
          <h5>Person 1:</h5>
          <DatePicker 
          selected={startDate} 
          onChange={(date) => setStartDate(date)} 
          className="date" 
          peekNextMonth
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"/>
          <h5>Person 2:</h5>
          <DatePicker 
          selected={startDate2} 
          onChange={(date) => setStartDate2(date)} 
          className="date"
          peekNextMonth
          showMonthDropdown
          showYearDropdown
          dropdownMode="select" />
          <button onClick={() => { birthCard(startDate, false, startDate2,); setShow(true) }}>Relationship Card</button>
        </section>

      </>}

      {show &&
      <div> 
        
     <button onClick={()=>{setShow(false)}}>Go Back?</button>  
      <div className="Deck">
{showDeck}</div>

<button 
              onClick={() => setOpen(!open)}
              aria-controls="collapse-text"
              aria-expanded={open}>
   Save Reading?
  </button>


  <Collapse in={open}>
  <div class="card card-body"id="collapse-text">

  {isLoggedIn ? 

<form>

<input 
type="text" 
name="title" 
placeholder="Title"
value={title} 
onChange={e=>{setTitle(e.target.value)}}/>
   <input 
type="text" 
name="notes" 
placeholder="Notes"
value={notes} 
onChange={e=>{setNotes(e.target.value)}}/>
<button onClick={()=>{saveReading(title,notes); navigate('/dashboard')}}>Save</button>
</form>

:<div>
  <h1>Become a member? Members can save their readings!</h1>
<div className="cardcontainer">

<button><Link to="/register">Register</Link></button>
<button><Link to="/login">Login</Link></button>
</div>


</div>}



</div>
</Collapse>
    </div>}
    </div>)
}

export default TodaysCard