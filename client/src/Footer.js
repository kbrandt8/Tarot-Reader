import React,{useContext} from 'react'
import { Context } from './Context'
import { Link } from 'react-router-dom'


function Footer() {
  const {userInfo, isLoggedIn,logOut} = useContext(Context)

  return (
    <footer>
      {isLoggedIn ? <>Logged in as {userInfo.name}<br/><br/><button onClick={logOut}>Log Out?</button> </>: "not logged in"}

    </footer>
  )
}

export default Footer