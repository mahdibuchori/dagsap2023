import React, { useState } from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_AUTH } from '../apis/apisData';
import { LoadingPage } from '../LoadingPage/LoadingPage';

const BottomBar = ({menubar, data}) => {
    axios.defaults.withCredentials = true;
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const handleMenu = event => {
        menubar(event);
    };
    const handleLogout =async (e) =>{
        try {
            setIsLoading(true);
            await API_AUTH.delete("/logout");
            navigate('/login');
            setIsLoading(false);
        } catch (error) {
            console.log(error)
        }
    }
    
    return (
        <>
        <div className='myBottom navbar navbar-dark navbar-expand d-md-none d-lg-none d-xl-none fixed-bottom' style={{height: '45px'}}>
            <ul className="navbar-nav nav-justified w-100">
                <li 
                    className={data === 'nav-item dashboard' ||data === undefined ? 'nav-item dashboard active' : 'nav-item dashboard'} 
                    onClick={(e)=>{
                        handleMenu('dashboard');
                        navigate('/')
                    }}
                >
                    <span className='coverAll'>
                        <span className='icon'><i class="bi bi-menu-button-wide-fill"></i></span>
                        <span className='title'>Dashboard</span>
                    </span>
                </li>
                <li 
                    className={data === 'nav-item profile' ? 'nav-item profil active' : 'nav-item profil'} 
                    onClick={(e)=>{
                        handleMenu('profile');
                        navigate('/profile')
                    }}
                >
                    <span className='coverAll'>
                        <span className='icon'><i class="bi bi-person"></i></span>
                        <span className='title'>Profil</span>
                    </span>
                </li>
                <li 
                    className={data === 'nav-item berita' ? 'nav-item news active' : 'nav-item news'} 
                    onClick={(e)=>{
                        handleMenu('berita');
                        navigate('/news')
                    }}
                >
                    <span className='coverAll'>
                        <span className='icon'><i class="bi bi-newspaper"></i></span>
                        <span className='title'>Bulletin</span>
                    </span>
                </li>
                <li 
                    className={data === 'nav-item form' ? 'nav-item form active' : 'nav-item form'} 
                    onClick={(e)=>{
                        handleMenu('form');
                        navigate('/form')
                    }}
                >
                    <span className='coverAll'>
                        <span className='icon'><i class="bi bi-file-earmark-fill"></i></span>
                        <span className='title'>Form</span>
                    </span>
                </li>
                <li className='nav-item'>
                    <span className='coverAll'>
                        <span className='icon'><i className="bi bi-box-arrow-right"></i></span>
                        <span className='title' onClick={handleLogout}>Logout</span>
                    </span>
                </li>
            </ul>
        </div>
        
        {isLoading ? <LoadingPage /> : ""}
        </>
        
        
    )
}

export default BottomBar