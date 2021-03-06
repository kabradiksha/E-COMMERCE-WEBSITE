import React, {useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom';

const Signup = ()=>{
    const [name, setName]=useState("");
    const [password,setPassword]=useState("");
    const [email,setEmail]=useState("");

    const navigate = useNavigate();
    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth){
            navigate('/');
        }
    })

    const collectData= async ()=>{
        console.warn(name, email, password);
        let result = await fetch("http://localhost:3010/register", {
            method:'post',
            body:JSON.stringify({name, email, password}),
            headers:{
                'Content-Type':'application/json'
            },
        })
        result = await result.json();
        console.warn(result)
        // localstorage helps us to keep data in local storage in inspect menu
        localStorage.setItem('user', JSON.stringify(result.result));
        localStorage.setItem('token', JSON.stringify(result.auth));
        if(result){
            navigate('/');
        }
    }

    return(
        <div className='register'>
            <h1>Register</h1>
            <input className='inputBox' type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder='Enter your name' />

            <input className='inputBox' type="text" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter your email address' />

            <input className='inputBox' type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter password' />
            <button onClick={collectData} className='appButton' type='text'>Sign up</button>
        </div>
    )
}

export default Signup;