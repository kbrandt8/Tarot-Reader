import React, { useContext, useEffect } from "react"
import Card from "../components/Card"
import { Context } from "../Context"
import { useNavigate, Link } from 'react-router-dom'
import Carousel from 'react-bootstrap/Carousel';
import { CgCardHearts } from "react-icons/cg";



function Start() {
  return (
    <div>
<h1>Welcome to Tarot-Reader!</h1>
      <h3>What kind of reading are you looking for today?</h3>

    <Carousel variant="dark">
      <Carousel.Item>
      <Link to="/OneCardReading">

<h1>One Card Reading</h1>
<div className="showCardsStart"><CgCardHearts/></div>


<p>Just a one card summary reading.</p>

</Link>

      </Carousel.Item>


      <Carousel.Item>

      <Link to="/ThreeCardReading">

<h1>Three Card Reading</h1>
<div className="showCardsStart"><CgCardHearts/><CgCardHearts/><CgCardHearts/></div>
<p>"Past Present Future" reading.</p>

</Link>
      </Carousel.Item>
      <Carousel.Item>

      <Link to="/FourCardReading">

<h1>Four Card Reading</h1>
<div className="showCardsStart"><CgCardHearts/><CgCardHearts/><CgCardHearts/><CgCardHearts/></div>
<p>Best for Yes/No Questions</p>

</Link>

      </Carousel.Item>
      <Carousel.Item>
      <Link to="/CelticCrossReading">

<h1>Celtic Cross Reading</h1>

<div className="showCardsStart"><CgCardHearts/><CgCardHearts/><CgCardHearts/><CgCardHearts/><CgCardHearts/><CgCardHearts/></div>
<div className="showCardsStart"><CgCardHearts/><CgCardHearts/><CgCardHearts/><CgCardHearts/><CgCardHearts/></div>
<p>Get a Full look at Your situation with a Celtic Cross Reading.</p>

</Link>
      </Carousel.Item>
      <Carousel.Item>
      <Link to="/TodaysCard">
          <h1>Todays Card</h1>
          <div className="showCardsStart"><CgCardHearts/></div>
        <p>Your card of the day according to numerology.</p>

       </Link>
        </Carousel.Item>

    </Carousel>




    </div >
  )
}

export default Start