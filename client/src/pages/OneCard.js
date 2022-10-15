import React, { useContext, useState, useEffect } from "react"
import { Context } from "../Context"
import {useNavigate,Link} from 'react-router-dom'
import Collapse from 'react-bootstrap/Collapse'
function OneCard() {
  const {getCards,showDeck,saveReading,isLoggedIn} = useContext(Context)
  const [show,setShow] = useState(false)
  const [loading,setLoading] = useState(false)
  const [title,setTitle] = useState("")
  const [notes,setNotes] = useState("")
  const [open, setOpen] = useState(false);
  const navigate = useNavigate()
useEffect(()=>{
setShow(false)
},[Link])
 
  async function card(){
    getCards('oneCard')
    setLoading(true)
    setShow(false)
    setTimeout(()=>{
      setLoading(false)
      setShow(true)
    },500)

  
  
  }

      return (
      <>
      <div className="Deck">
        <p>
          {!show &&<>A one card reading is great for an overall look at your situation, or a yes/no question!<br/></>}
          <button onClick={()=>card()}>{show ? "Draw Again":"Draw One"}</button></p>

</div>
{loading &&<>
<h1>Shuffling...<div class="spinner-border" role="status">
  <span class="visually-hidden">Loading...</span>
</div></h1>
</>}






{show && <>
      <div>
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
        </>}
    </>
      )
    }
export default OneCard