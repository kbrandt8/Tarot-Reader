import React, { useContext, useState } from "react"
import { Context } from "../Context"
import Collapse from 'react-bootstrap/Collapse'
import {useNavigate,Link} from 'react-router-dom'
import { Card, Meaning } from "../components"



function CelticCross() {
  const {getCards,saveReading,isLoggedIn,deck} = useContext(Context)
  const [show,setShow] = useState(false)
  const [loading,setLoading] = useState(false)
  const [title,setTitle] = useState("")
  const [notes,setNotes] = useState("")
  const [open, setOpen] = useState(false);
  const navigate = useNavigate()



async function card(){
  getCards('celticCross')
  setLoading(true)
  setShow(false)
  setTimeout(()=>{
    setLoading(false)
    setShow(true)
  },500)
}

const showCards = deck.map(item =>
  <div className="celticCards"> 

  <Card key={item.id} item={item} />


  </div>
 )
 const showCards1 = deck.map(item =>
  <div > 

  <Card key={item.id} item={item} />


  </div>
 )
 const showMeanings = deck.map(item =>
<div className="celticMeaning">
  <Meaning key={item.id} item={item}   />
</div>
 )

      return (<><div className="Deck">
        <p>{!show &&<>Celtic Cross Reading: ask a question!<br/></>}
      <button onClick={()=>card()}>{show ? "Draw Again?" : "Draw"}</button></p>
      </div>

      {loading &&<>
<h1>Shuffling...<div class="spinner-border" role="status">
  <span class="visually-hidden">Loading...</span>
</div></h1>
</>}


{show && <div>
<div className="celticCross">
  <div className="showCardsCeltic1">
      {showCards.slice(0,6)}
      </div>
      <div className="showCardsCeltic2">
      {showCards1.slice(6)}
      </div>
  </div>
      <div className="showMeanings showMeaningsCeltic">
      {showMeanings}
      </div>

      <div className="saveReading">
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
      placeholder="notes"
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
</div>
</div>
} 
 
      </>)
    }

export default CelticCross