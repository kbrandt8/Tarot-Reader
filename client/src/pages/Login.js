import React,{useState,useContext, useEffect} from "react"
import {useNavigate,Link} from 'react-router-dom'
import {Context} from "../Context"

function Login() {
  const navigate = useNavigate()
  const [loading,setLoading] = useState(false)

  const {loginUser,event,userInfo} = useContext(Context)

  useEffect(()=>{
    userInfo.name &&

navigate('/dashboard')
  },[userInfo,loading])

  return (<>
    {loading ? 
      <h1>Logging in...<div class="spinner-border" role="status">
  <span class="visually-hidden">Loading...</span>
</div></h1>
    
    
    :
    <div>

      <h1>{event}</h1>
      <h1> Login </h1>
      <form
      onSubmit={e=>{loginUser(e)}}>
        <input 
        type="email"
        name="email"
        placeholder="Email" />

        <input 
        type="password" 
        name="password"
        placeholder="Password" />
        <button type="submit" value="login">Login</button>
      </form>
      <h5>
       <Link to="/register"> Don't have a login? Register!</Link>
        </h5>
    </div>}
  </>);
}

export default Login