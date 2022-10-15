import React, { useEffect, useState } from "react"
import Axios from "axios"
import Card from "./components/Card"

const Context = React.createContext()

function ContextProvider({ children }) {
  let test = "test"

  const [deck, setDeck] = useState([])
  const [userInfo, setUserInfo] = useState({})
  const [event, setEvent] = useState("")
  const [type, setType] = useState("")
  const [theReadings, setTheReadings] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const token = localStorage.getItem('token')

  const showDeck = deck.map(item =>
    <Card key={item.id} item={item} />
  )

  const url = "http://localhost:7000/"


  // User Data & login / logout functionality

  async function loginUser(e) {
    e.preventDefault()
    Axios.post(url + "login", {
      email: e.target.email.value,
      password: e.target.password.value
    }).then(
      res => {
        if (res.data.user) {
          localStorage.setItem('token', res.data.user)

        } else {
          setEvent('user & password don\'t match')
        }
      }
    )

  }

  async function registerUser(e) {
    event.preventDefault()
    Axios.post(url + "register", {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value
    }).then(res => {
      if (res.data.status === 'ok') {

      }
    })
  }
  function logOut() {
    localStorage.clear()
    setIsLoggedIn(false)
  }
  
  // User Info 

  function getUserInfo() {
    Axios.get(url + 'userinfo',
      {
        headers: {
          'x-access-token': token
        }
      })
      .then(res => { setUserInfo(res.data); setTheReadings(res.data.readings) })

  }

  useEffect(() => {
    if (token) {
      getUserInfo()
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [token])

  useEffect(() => {
    getUserInfo()
  }, [userInfo])

  // Get Cards Functionality

  async function getCards(type, config) {
    setType(type)
    if (config) {
      Axios.get(url + type, config)
        .then(res => { setDeck(res.data) })
    } else {
      Axios.get(url + type)
        .then(res => setDeck(res.data))

    }
  }

  async function birthCard(birth, today, love) {
    function add(date) {
      return date.getMonth() + 1 + date.getDate() + date.getFullYear()
    }
    function newArr(num) {
      return num.toString().split('').map(Number)
    }
    const birthDay = add(birth)
    const theDay = today ? add(today) : 0
    const loveMatch = love ? add(love) : 0
    const added = birthDay + theDay + loveMatch
    let reduced = newArr(added).reduce((a, b) => a + b)
    let result = reduced > 22 ? newArr(reduced).reduce((a, b) => a + b) : reduced
    let config = {
      headers: {
        'num': result,
        type
      }
    }
    getCards('birthCard', config)
  }

  function threeCard() {
    deck.forEach(card => {
      if (deck.indexOf(card) === 0) {
        card.when = "past"
      } if (deck.indexOf(card) === 1) {
        card.when = "present"
      } if (deck.indexOf(card) === 2) {
        card.when = "future"
      }
    }

    )
  }

  function reverse() {
    deck.forEach(card => card.reverse = Math.floor(Math.random() * 10) > 4 ? true : false)
  }

  useEffect(() => {
    if (type === 'threeCards') {
      reverse()
      threeCard()
    } if (type === 'oneCard') {
      reverse()
    }
  }, [deck])


  // Save & Delete Readings1

  function theDate() {
    const date = new Date()
    return (date.getMonth() + 1) + "/" + date.getDate() + "/" + (date.getYear() - 100)
  }

  async function saveReading(title, notes) {
    Axios({
      method: 'post',
      url: url + "addReading",
      headers: { 'x-access-token': token },
      data: {
        title,
        date: theDate(),
        cards: deck,
        notes
      }
    })
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  async function deleteReading(event) {
    Axios({
      method: 'post',
      url: url + 'deleteReading',
      headers: { 'x-access-token': token },
      data: {
        id: event,
      }
    }).then(
      res => console.log(res)
    ).catch(
      err => console.log(err)
    )
  }
  return (
    <Context.Provider value={{
      getCards,
      deck,
      showDeck,
      birthCard,
      reverse,
      threeCard,
      logOut,
      userInfo,
      isLoggedIn,
      saveReading,
      event,
      deleteReading,
      theReadings,
      loginUser,
      registerUser
    }}>
      {children}
    </Context.Provider>
  )
}


export { ContextProvider, Context }
