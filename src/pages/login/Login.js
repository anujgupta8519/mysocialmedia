import React, { useState } from 'react'
import './Login.scss'
import { Link, useNavigate } from 'react-router-dom'
import {axiosClient} from '../../utils/axiosClient'
import { KEY_ACCESS_TOKEN, setItem } from '../../utils/localStroageManeger'

function Login() {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const navigate = useNavigate();
  async function handleSubmit(e){
   e.preventDefault();
   try {
    const response  =await axiosClient.post('/auth/login',{
      email,
      password
     })
     //console.log(result);
    setItem(KEY_ACCESS_TOKEN,response.result.accessToken);
    navigate('/')
    
   } catch (error) {
    // console.log(error);
   }

  }
  
  return (
    <div className='login'>
        <div className="login-box">
            <h2 className="heading">Login Form</h2>
            <form  onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input type="email" className="email" id="email" required onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="password">Password</label>
                <input type="password" className="password" id="password" required onChange={(e)=>setPassword(e.target.value)} />
                <input type="submit"  className='submit'/>
            </form>
            <p>Do Not have account?  <Link to="/signup">Signup</Link> </p>
        </div>
    </div>
  )
}

export default Login