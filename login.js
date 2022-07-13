import React, { useEffect } from 'react';
import {useNavigate} from 'react-router-dom'

const Login =()=>{
    const [email, setEmail] = React.useState('');
    const [password, setPassword]=React.useState('');
    const navigate = useNavigate();

    useEffect(()=>{
        const auth = localStorage.getItem('User');
        if(auth){
            navigate('/');
        }
    })

    const handleLogin = async ()=>{
        console.warn('email, password', email, password);
        let result = await fetch("http://localhost:3010/login",{
            method:'post',
            body:JSON.stringify({email, password}),
            headers:{
                'content-Type':'application/json'
            }
        })
        result = await result.json();
        console.log(result);
        if(result.auth){
            localStorage.setItem('user', JSON.stringify(result.User));
            localStorage.setItem('token', JSON.stringify(result.auth));
            navigate('/');
        }else{
            alert('please provide correct information');
        }
    }

    return(
        <div className='login'>
            <input type="text" className='inputBox' placeholder='enter your email' 
            onChange={(e)=>setEmail(e.target.value)} value={email}/>

            <input type="password" className='inputBox' placeholder='enter your password'
            onChange={(e)=>setPassword(e.target.value)} value={password}/>

            <button onClick={handleLogin} className='appButton' type='text'>login</button>
        </div>
    )
}

export default Login;