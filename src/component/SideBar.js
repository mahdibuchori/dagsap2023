import React, { useState } from 'react';
import './style.css';
import { Link, useNavigate } from 'react-router-dom';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import axios from 'axios';
import { API_AUTH } from '../apis/apisData';
import { LoadingPage } from '../LoadingPage/LoadingPage';
export const SideBar = ({menubar, data}) => {
    axios.defaults.withCredentials = true;
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);

    const renderProfil = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          Profil
        </Tooltip>
    );
    const renderDashboard = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          Dashboard
        </Tooltip>
    );
    const renderNews = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          News
        </Tooltip>
    );
    const renderForm = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          Form
        </Tooltip>
    );
    const renderLogout = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          Logout
        </Tooltip>
    );

    
      
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

    const handleMenu = event => {
        menubar(event);
      };
    return (
        <>
        <div className="col-1 col-sm-1 col-md-1	col-lg-1 col-xl-1 px-0" style={{width:'10px'}}>
            <div className='bg-primary containersbox'>
                <div className='min-vh-100 sidebar'>
                    <ul>
                        <Link to={"/"} className='link mt-5'>
                            <li className={data === 'dashboard' ||data === undefined ? 'dashboard active' : 'dashboard'} onClick={(e)=>handleMenu('dashboard')}>
                                <OverlayTrigger
                                    placement="right"
                                    delay={{ show: 150, hide: 250 }}
                                    overlay={renderDashboard}
                                >
                                    <span className='coverAll'>
                                    <span className='icon'><i class="bi bi-menu-button-wide-fill"></i></span>
                                    </span>
                                </OverlayTrigger>
                            </li>
                        </Link>
                        <Link to={"/profile"} className='link'>
                        <li className={data === 'profile' ? 'profil active' : 'profil'} onClick={(e)=>handleMenu('profile')}>
                            <OverlayTrigger
                                placement="right"
                                delay={{ show: 150, hide: 250 }}
                                overlay={renderProfil}
                                title="test aja"
                            >
                                <span className='coverAll'>
                                    <span className='icon'><i class="bi bi-person"></i></span>
                                </span>
                            </OverlayTrigger>
                            
                        </li>
                        </Link>

                        <Link to={"/news"} className='link'>
                            <li className={data === 'berita' ? 'news active' : 'news'}  onClick={(e)=>handleMenu('berita')}>
                                <OverlayTrigger
                                    placement="right"
                                    delay={{ show: 150, hide: 250 }}
                                    overlay={renderNews}
                                    title="test aja"
                                >
                                    <span className='coverAll'>
                                        <span className='icon'><i class="bi bi-newspaper"></i></span>
                                    </span>
                                </OverlayTrigger>
                            </li>
                        </Link>

                        <Link to={"/form"} className='link'>
                            <li className={data === 'form' ? 'form active' : 'form'} onClick={(e) => handleMenu('form')}>
                                <OverlayTrigger
                                    placement="right"
                                    delay={{ show: 150, hide: 250 }}
                                    overlay={renderForm}
                                    title="test aja"
                                >
                                    <span className='coverAll'>
                                        <span className='icon'><i class="bi bi-file-earmark-fill"></i></span>
                                    </span>
                                </OverlayTrigger>
                            </li>
                        </Link>
                    </ul>
                    <ul className="logout">
                        <li className="dashboard">
                            <OverlayTrigger 
                                placement="right"
                                delay={{ show: 150, hide: 250 }}
                                overlay={renderLogout}
                            >
                                <span className='coverAll'>
                                <span className='icon' onClick={handleLogout}><i className="bi bi-box-arrow-left"></i></span>
                                </span>
                            </OverlayTrigger>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        {isLoading ? <LoadingPage /> : ""}
        </>
    
  )
}
