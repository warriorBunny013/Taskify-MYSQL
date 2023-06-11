import React, { useState } from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../form.css';
import {Link} from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const history = useNavigate();

    const Register = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/v1/auth/register', {
                name: name,
                email: email,
                password: password,
            });
            history("/login");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }

    return (<div className="main-container">
        <form style={{minWidth:"50vh"}}  onSubmit={Register} className="container">
        <h1 className='title-heading'>Signup</h1>
           <h1>{msg}</h1>
           <input   type="text"   value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' />
           <input  type="email"  value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
           <input  type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
           <Link to="/login" className="link">Already have an account ? Login instead</Link>
           <button type='submit' className='submit'>Submit</button>
         
       </form>
    </div>
    )
}

export default Register