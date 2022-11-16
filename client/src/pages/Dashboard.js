import React, { useContext, useEffect, useState } from "react"
import { Card, Meaning } from "../components"
import { Context } from "../Context"
import { Link, useNavigate } from 'react-router-dom'



function Dashboard() {

  const navigate = useNavigate()
  const { userInfo, isLoggedIn, deleteReading, theReadings,  showCards, showMeanings,birthCard,birthCardDashboard,todayCard,deck} = useContext(Context)
  const birthDay = new Date(userInfo.birthDate)
  const today = new Date()

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/')
    }
    if (birthDay && deck <2) {
      birthCardDashboard(birthDay, today)
    }
  }, [isLoggedIn, birthDay])



  const userReadings = theReadings.map(reading => <div className="savedReadings" key={reading._id}>
    <h3>{reading.title}</h3>
    <h5>{reading.date}</h5>
    {reading.cards.length > 4 ?
      <>
        <div className="celticCross">
          <div className="showCardsCeltic1">

            {reading.cards.slice(0, 6).map(card =>
              <div className="celticCards">
                <Card key={card._id} item={card} />
              </div>
            )}
          </div>
          <div className="showCardsCeltic2">
            {reading.cards.slice(6).map(card => <Card key={card._id} item={card} />)}
          </div>
        </div>
        <div className="showMeanings showMeaningsCeltic">
          {reading.cards.map(card => <Meaning key={card._id} item={card} />)}
        </div>
      </>
      :
      <>
        <div className="showCards">
          {reading.cards.map(card => <Card key={card._id} item={card} />)}
        </div>
        <div className="showMeanings">
          {reading.cards.map(card => <Meaning key={card._id} item={card} />)}
        </div>
      </>
    }


    {reading.notes &&
      <div>
        <h3>Notes:</h3>
        <p>{reading.notes}</p></div>
    }
    <button onClick={() => { deleteReading(reading._id) }}>Delete reading?</button>
  </div>)


  return (
    <div>
      <>
        <h1>Welcome, {userInfo.name}</h1>



        <div className="showCards">
          {deck.length ===2 ? <div className="todaysCard">  
          
          <h1>Birth Card:</h1>

          <div className="showCards">
      {showCards[0]}
      </div>
      <div className="showMeanings">
      {showMeanings[1]}
      </div>
          </div>:
          <h1>Set birthday for a birthCard</h1>

          }
          {deck.length ===2 ? <div className="todaysCard">

            <>
              <h1>Todays Card:</h1>
              <div className="showCards">
      {showCards[1]}
      </div>
      <div className="showMeanings">
      {showMeanings[1]}
      </div>
            </>
          </div> : <h1>Set your birthday to get Todays Card</h1>}


        </div>



        <h1>Take a look at your saved readings:</h1>
        {userReadings}
        {theReadings.length < 1 &&
          <div>
            <h3>No Readings found, try a...</h3>
            <Link to="/ThreeCards">Three Card Reading</Link><br />
            <Link to="/OneCard">One Card Reading</Link><br />
          </div>
        }

        <br /></>
    </div>
  )
}

export default Dashboard