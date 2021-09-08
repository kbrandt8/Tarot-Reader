import React from "react"
import {Switch,Route} from "react-router-dom"
import "./styles.css"
import ThreeCards from "./ThreeCards"
import StartPage from "./StartPage"
import OneCard from "./OneCard"
import TodaysCard from "./TodaysCard"
import ShowDeck from "./ShowDeck"

function App() { 
     return (<Switch>
  <Route exact path="/">
  <StartPage/>
  </Route>

  <Route path="/ThreeCards">
  <ThreeCards/>
  </Route>

  <Route path="/OneCard">
  <OneCard/>
  </Route>

  <Route path="/TodaysCard">
  <TodaysCard/>
  </Route>

  <Route path="/ShowDeck">
  <ShowDeck/>
  </Route>

  
</Switch>
 
     )
}

export default App;

