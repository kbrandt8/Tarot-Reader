import React, { useContext, useState } from "react"
import { Context } from "../Context"
import Collapse from 'react-bootstrap/Collapse'
import {useNavigate,Link} from 'react-router-dom'



function ThreeCards() {
  const {getCards, showDeck,saveReading,isLoggedIn} = useContext(Context)
  const [show,setShow] = useState(false)
  const [loading,setLoading] = useState(false)
  const [title,setTitle] = useState("")
  const [notes,setNotes] = useState("")
  const [open, setOpen] = useState(false);
  const navigate = useNavigate()



async function card(){
  getCards('threeCards')
  setLoading(true)
  setShow(false)
  setTimeout(()=>{
    setLoading(false)
    setShow(true)
  },500)
}

      return (<><div className="Deck">
        <p>{!show &&<>Three card reading: The past, present and future of your question/situation.<br/></>}
      <button onClick={()=>card()}>{show ? "Draw Again?" : "Draw Three Cards"}</button></p>
      </div>

      {loading &&<>
<h1>Shuffling...<div class="spinner-border" role="status">
  <span class="visually-hidden">Loading...</span>
</div></h1>
</>}


{show && <div>
      <div className="Deck">
      {showDeck}
      </div>
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
</div>}
 
      </>)
    }

export default ThreeCards