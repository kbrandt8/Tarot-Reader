import React from "react"
import {Link} from "react-router-dom"
function Nav(){
    return(
    <nav>
        <Link to="/ShowDeck">
        See All Cards
        </Link>
        <Link to ="/TodaysCard">
             Todays Card
        </Link>
        <Link to ="/OneCard">
            One Card Reading
        </Link>
        <Link to ="/ThreeCards">
            Three Card Reading
        </Link>
        <Link to ="/">
            Home
        </Link>
    </nav>
    )
}

export default Nav