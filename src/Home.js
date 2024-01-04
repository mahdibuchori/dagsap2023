import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { API_AUTH } from './apis/apisData';
import axios from 'axios';

export const Home = () => {
    const navigate = useNavigate();
    const [auth, setAuth] = useState(false);
    const [message, setMessage] = useState('');
    const [name, setName] = useState('');
    axios.defaults.withCredentials = true
    useEffect(() => {
        const nilai = async () =>{
            try {
                let res =await API_AUTH.get('/auth');
                if(res.data.Status === "Success"){
                    setAuth(true);
                    setName(res.data.name);
                    // navigate('/login');
                }
                else{
                    setAuth(false)
                    setMessage(res.data.Error)
                }
            } catch (error) {
                
            }
        }
        nilai()
    }, []);
    const handleLogout = () =>{
        navigate('/login');
    }
  return (
    <div className='container mt-4'>
        {
            auth ?
            <div>
                <h3>You are authorized ---- {name}</h3>
                <button
                    className='btn btn-danger'
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
            :
            <div>
                <h3>{message}</h3>
                <h3>Login Now</h3>
                <Link to={"/login"} className='btn btn-primary'>
                    Login
                </Link>
            </div>
        }
    </div>
  )
}
