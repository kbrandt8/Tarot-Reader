import React, { useContext, useEffect } from "react"
import Card from "../components/Card"
import { Context } from "../Context"
import { useNavigate, Link } from 'react-router-dom'


function Start() {
  const navigate = useNavigate()
  const { isLoggedIn, userInfo } = useContext(Context)
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/')
    }
  }, [isLoggedIn])
  return (
    <div>
<h1>Welcome to Tarot-Reader!</h1>
      <h1>What kind of reading are you looking for today?</h1>
      <div className="Deck">
        <Link to="/OneCardReading">
          <div className="cards">
            <h1>One Card Reading</h1>
            <img src={"img/fool.jpg"} alt="One Card Reading" className="cardimage" />
            <p>Just a one card summary reading.</p>
          </div>
        </Link>

        <Link to="/ThreeCardReading">
          <div className="cards">
            <h1>Three Card Reading</h1>
            <img src={"img/magician.jpg"} alt="Three Card Reading" className="cardimage" />
            <p>"Past Present Future" reading.</p>
            </div>
        </Link>

      
        <Link to="/TodaysCard">
      <div className="cards">
          <h1>Todays Card</h1>
          <img src={"img/high_priestess.jpg"} alt="Todays Card" className="cardimage" />
        <p>Your card of the day according to numerology.</p>
      </div>
       </Link>
    </div>
    




    </div >
  )
}

export default Start