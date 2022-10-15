import React,{useContext} from 'react'
import { NavLink} from 'react-router-dom'
import { Context } from "./Context"

function Nav() {
    const { isLoggedIn} = useContext(Context)
    return (
        <nav>
          <NavLink to="/"><h1>Tarot Reader
 
          </h1></NavLink>
            <ul>
                <li> <NavLink reloadDocument activeClassName="active"  to="/ThreeCards">Three Card Reading</NavLink></li>
                <li> <NavLink reloadDocument activeClassName="active"  to="/OneCard">One Card Reading</NavLink></li>
                <li> <NavLink reloadDocument activeClassName="active"  to="/TodaysCard">Todays Card</NavLink></li>
                <li> {isLoggedIn ? <NavLink activeClassName="active"  to="/dashboard">Dashboard</NavLink>
                    : <NavLink activeClassName="active"  to="/Login">Login</NavLink>}</li>
            </ul>



        </nav >
    )
}

export default Nav