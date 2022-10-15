import React, { useContext,useEffect,useState } from "react"
import {Context} from "../Context"
import {useNavigate} from 'react-router-dom'


function Register() {
  const navigate = useNavigate()
  const {registerUser} = useContext(Context)
  
  return (
    <div> 
      <h1> Register </h1>
      <form
      onSubmit={e=>{registerUser(e)}}>
        <input 
        type="text" 
        name="name"
        placeholder="Name" />

        <input 
        type="email"
        name="email"
        placeholder="Email" />

        <input 
        type="password"
        name="password" 
        placeholder="Password" />
        <button type="submit">Register</button>
      </form>
    </div>
  );

}

export default Register