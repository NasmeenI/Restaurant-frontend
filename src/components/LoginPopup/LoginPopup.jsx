import React, { useState, useContext, useEffect } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

const LoginPopup = ({setShowLogin}) => {

  const { url, setToken } = useContext(StoreContext)
  const [currState, setCurrState] = useState("Login")

  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    phone_number: "",
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({...data, [name]: value}))
  }

  const onLogin = async(event) => {
    event.preventDefault()

    if (currState === "Login") {
      console.log("Logging in with:", { email: data.email, password: data.password });
    } else {
        console.log("Signing up with:", data);
    }

    let newurl = url;
    if(currState === "Login") {
      newurl += `/users/login`
    }
    else {
      newurl += `/users/signup`
    }

    const { username, phone_number, ...filteredData } = data;

    const response = await axios.post(newurl, filteredData);
    console.log(response)
    if(response.status === 200) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setShowLogin(false);
    }
    else {
      alert(response)
    }
  }

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
            <h2>{currState}</h2>
            <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
            {currState === "Login" ? <></> : <input name='username' onChange={onChangeHandler} value={data.username} type="text" placeholder="Your name" require /> }
            <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder="Your email" require />
            <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder="Password" require />
            {currState === "Login" ? <></> : <input name='phone_number' onChange={onChangeHandler} value={data.phone_number} type="text" placeholder="Your phone number" require /> }
        </div>
        <button type='submit'>{currState === "Sign Up" ? "Create account" : "Login"}</button>
        <div className="login-popup-condition">
            <input type="checkbox" require />
            <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
        {currState === "Login"
        ? <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
        : <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
        }
      </form>
    </div>
  )
}

export default LoginPopup