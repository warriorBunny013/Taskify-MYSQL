import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom'
import '../form.css';
// import Dashboard from './Dashboard';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const history = useNavigate();

    const Auth = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://taskify-mysql-backend-uditi.onrender.com/api/v1/auth/login', {
                email: email,
                password: password
            });
            history("/dashboard");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }

    return (<div className="main-container">
      
    <form style={{minWidth:"50vh"}} className="container" onSubmit={Auth}>
    <h1 className='title-heading'>Login</h1>
        <h1>{msg}</h1>
        <input  type="email" value={email} onChange={(e) => setEmail(e.target.value)}  placeholder='Email' />
        <input  type="password" value={password} onChange={(e) => setPassword(e.target.value)}  placeholder='Password' />
        <Link to="/" className="link">Don’t have an account ? Signup instead</Link>
        <button className='submit'>Submit</button>
      
    </form>
 </div>
    )
}

export default Login