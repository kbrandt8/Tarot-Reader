import React, { useEffect, useState } from "react"
import Axios from "axios"
import {Card,Meaning} from "./components"

const Context = React.createContext()

function ContextProvider({ children }) {
  const [deck, setDeck] = useState([])
  const [todayCard,setTodayCard] = useState([])
  const [userInfo, setUserInfo] = useState({})
  const [event, setEvent] = useState("")
  const [type, setType] = useState("")
  const [theReadings, setTheReadings] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const token = localStorage.getItem('token')

  const showCards = deck.map(item =>
   <> 

   <Card key={item.id} item={item} />


   </>
  )

  const showMeanings = deck.map(item =>

   <Meaning key={item.id} item={item}   />

  )

  useEffect(()=>{

setTimeout(()=>{
  setEvent('')
},1000)
  },[event])

  // User Data & login / logout functionality

  async function loginUser(e) {
    e.preventDefault()
    Axios.post("/login", {
      email: e.target.email.value,
      password: e.target.password.value
    }).then(
      res => {
        if (res.data.user) {
          localStorage.setItem('token', res.data.user)
          setEvent('logged')

        } else {
          setEvent('user & password don\'t match')
        }
      }
    )

  }

  async function registerUser(e) {
    e.preventDefault()
    Axios.post("/register", {
      name:e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value
    }).then(
      res => {
        if (res.data.user) {
          localStorage.setItem('token', res.data.user)
          setEvent('logged')

        } else {
          setEvent('user & password don\'t match')
        }
      }
    )
  }


  function logOut() {
    localStorage.clear()
    setIsLoggedIn(false)
  }

  async function changeEmail(e) {
 e.preventDefault()
    Axios({
      method: 'post',
      url: "/changeEmail",
      headers: { 'x-access-token': token },
      data: {
        email: e.target.email.value,
        password: e.target.password.value
      }
    }).then(
      res => {
        if (res.data.user) {
          localStorage.setItem('token', res.data.user)
          setEvent('Updated Email!')

        } else {
          setEvent('password is not valid')
        }
      }
    )

  }
  async function changePassword(e) {
    e.preventDefault()
       Axios({
         method: 'post',
         url: "/changePassword",
         headers: { 'x-access-token': token },
         data: {
          currentPassword:e.target.currentPassword.value,
           newPassword: e.target.newPassword.value
         }
       }).then(
         res => {
           if (res.data.user) {
             localStorage.setItem('token', res.data.user)
             setEvent('Updated Password!')
   
           } else {
             setEvent('password is not valid')
           }
         }
       )
   
     }
     async function changeName(e) {
      e.preventDefault()
         Axios({
           method: 'post',
           url: "/changeName",
           headers: { 'x-access-token': token },
           data: {
             name: e.target.name.value
           }
         }).then(
           res => {
             if (res.data.user) {
               localStorage.setItem('token', res.data.user)
               setEvent('Updated Name!')
     
             } else {
               setEvent('error')
             }
           }
         )
     
       }

       async function changeBirthDate(e) {
        e.preventDefault()
           Axios({
             method: 'post',
             url: "/addBirthDate",
             headers: { 'x-access-token': token },
             data: {
               birthDate: e.target.birthDate.value
             }
           }).then(
             res => {
               if (res.data.user) {
                 localStorage.setItem('token', res.data.user)
                 setEvent('Updated Birthday!')
               } else {
                 setEvent('error')
               }
             }
           )
       
         }
  
  
  // User Info 

 async function getUserInfo() {
    Axios.get("/userinfo",
      {
        headers: {
          'x-access-token': token
        }
      })
  
      .then(res => { setUserInfo(res.data);setTheReadings(res.data.readings) })

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

  async function getCards(type,config) {
    setDeck([])
    setType(type)
    let config2 = {
      headers: {
        type
      }
    }
    if(config){
       Axios.get("/" + type, config)
         .then(res => { setDeck(res.data) })
    
    }else{ Axios.get("/getReading", config2)
        .then(res => { setDeck(res.data) })}
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

async function getBirthCard(birth,today,love){
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
  return result
}
async function birthCardDashboard(birth,today){
const card1 = await getBirthCard(birth)
const card2 = await getBirthCard(birth,today)
console.log(card1,card2)
Axios.get("/getArcana", {headers:{'num1': card1,'num2': card2}})
.then(res => { setDeck(res.data)})


}



  // Save & Delete Readings1

  function theDate() {
    const date = new Date()
    return (date.getMonth() + 1) + "/" + date.getDate() + "/" + (date.getYear() - 100)
  }

  async function saveReading(title, notes) {
    Axios({
      method: 'post',
      url: "/addReading",
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

  async function deleteReading(id) {
    Axios({
      method: 'post',
      url: "/deleteReading",
      headers: { 'x-access-token': token },
      data: {
        id
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
      showCards,
      showMeanings,
      birthCard,
      logOut,
      userInfo,
      isLoggedIn,
      saveReading,
      event,
      deleteReading,
      theReadings,
      loginUser,
      registerUser,
      changeEmail,
      changePassword,
      changeName,
      changeBirthDate,
      birthCardDashboard,
      todayCard,
  
    }}>
      {children}
    </Context.Provider>
  )
}


export { ContextProvider, Context }
