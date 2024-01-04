import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { API_AUTH } from './apis/apisData';
import { LoadingPage } from './LoadingPage/LoadingPage';

export const Dashboard = () => {
    const navigate = useNavigate();
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [users, setUsers] = useState([]);
    const [isReady, setIsReady] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    axios.defaults.withCredentials = true
    const axiosJWT = axios.create({
        baseURL: process.env.REACT_APP_API_KEY_YT,
        withCredentials : true,
        crossDomain: true,
        headers: {
        'Content-Type': 'application/json',
        },
        SameSite: 'None',
    });

    useEffect(() => {
        refreshToken();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect (() => {
        if(!isReady) return;
        const gntiDta = async () =>{
            try {
                if(!token){
                    setIsLoading(false)
                    alert("TOken tidak ditemukan")
                    navigate('/login')
                }
                else{
                    const response = await axiosJWT.get(`${process.env.REACT_APP_API_KEY_YT}/users`,{
                        headers:{
                            Authorization: `Bearer ${token}`
                        }
                        });
                    setUsers(response.data)
                    console.log(response)
                    setIsLoading(false)
                }
                    // await onAuth(response.data?.uuid);
            } catch (error) {
                navigate('/login')
                setIsLoading(false)
            }
            setIsReady(false);
        } 
    
        gntiDta();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      },[isReady]);

    const refreshToken = async () => {
        try {
            setIsLoading(true)
            const response = await API_AUTH.get(`/token`,{headers: { 
                'Access-Control-Allow-Origin': '*', 
                'Content-type': 'Application/json', 
                }})
            console.log(response.data.accessToken)
            setToken(response.data.accessToken);
            const decode = jwtDecode(response.data.accessToken);
            setExpire(decode.exp);
            setIsReady(true)
        } catch (error) {
            setIsLoading(false)
            console.log(error)
            if(error.response){
                navigate('/login');
            }
        }
    }
    axiosJWT.interceptors.request.use(async(config) =>{
        const currentDate = new Date();
        if(expire * 1000 < currentDate.getTime()){
            const response = await axiosJWT.get(`/token`,{headers: { 
                'Access-Control-Allow-Origin': '*', 
                'Content-type': 'Application/json', 
            }})
            config.headers.Authorization = `Bearer ${response.data.accessToken}`;
            setToken(response.data.accessToken);
            const decode = jwtDecode(response.data.accessToken);
            setExpire(decode.expire);
            setIsReady(true)
        }
        return config;
    }, (error)=>{
        return Promise.reject(error);
    });
    
    const handleOut =async () =>{
        try {
            const res =await API_AUTH.delete("/logout")
            console.log(res)
            navigate('/login');
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <>
    <div>
        <h2 className='mb-3'>Dashboard {users.uname}</h2>
        <button className='btn btn-danger' onClick={handleOut}>Log out</button>

    </div>
    {isLoading ? <LoadingPage/> : ""}
    </>
  )
}
