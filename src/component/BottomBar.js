import React from 'react';
import './style.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BottomBar = ({menubar, data}) => {
    axios.defaults.withCredentials = true;
    const navigate = useNavigate();
    const handleMenu = event => {
        menubar(event);
    };
    const handleLogout =async (e) =>{
        try {
            let coba = await axios.delete('http://localhost:8080/dagsap/logout');
            console.log(coba)
            navigate('/login');
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className='bottomBar'>
        <ul>
            <Link to={"/"} className='link'>
                <li className={data === 'dashboard' ||data === undefined ? 'dashboard active' : 'dashboard'} onClick={(e)=>handleMenu('dashboard')}>
                    <span className='coverAll'>
                    <span className='icon'><i class="bi bi-menu-button-wide-fill"></i></span>
                    <span className='title'>Dashboard</span>
                    </span>
                </li>
            </Link>

            <Link to={"/profile"} className='link'>
                <li className={data === 'profile' ? 'profil active' : 'profil'} onClick={(e)=>handleMenu('profile')}>
                <span className='coverAll'>
                    <span className='icon'><i class="bi bi-person"></i></span>
                    <span className='title'>Profil</span>
                </span>
                </li>
            </Link>

            <Link to={"/news"} className='link'>
                <li className={data === 'berita' ? 'news active' : 'news'}  onClick={(e)=>handleMenu('berita')}>
                <span className='coverAll'>
                    <span className='icon'><i class="bi bi-newspaper"></i></span>
                    <span className='title'>Bulletin</span>
                </span>
                </li>
            </Link>

            <Link to={"/form"} className='link'>
                <li className={data === 'form' ? 'form active' : 'form'} onClick={(e) => handleMenu('form')}>
                <span className='coverAll'>
                    <span className='icon'><i class="bi bi-file-earmark-fill"></i></span>
                    <span className='title'>Form</span>
                </span>
                </li>
            </Link>

            <Link to={"/"} className='link'>
                <li className={'profil'}>
                <span className='coverAll'>
                    <span className='icon'><i className="bi bi-box-arrow-right"></i></span>
                    <span className='title' onClick={handleLogout}>Logout</span>
                </span>
                </li>
            </Link>
        </ul>
    </div>
    
  )
}

export default BottomBar