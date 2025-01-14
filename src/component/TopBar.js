import React from 'react'
import './style.css';
import icon from '../assets/img/dee.png';
import Badge from 'react-bootstrap/Badge';

const TopBar = ({user}) => {
  return (
    <div className='topbar'>
      <div className='topName'>
      </div>
      <div className='topOut'>
        <img src={icon} width="30" height="30"alt="Logo" className='imgTop' />
        <h5 style={{marginRight: '20px'}}>Hi, {user.uname}</h5> 
        <div 
          style={{width: '55px', height: '38px', display: 'flex'}}
        >
          <span style={{fontSize: '1.7em'}}><i className="bi bi-bell-fill"></i></span>
          <h6 style={{fontSize: '0.9em'}}><Badge bg="danger">199</Badge></h6>
        </div>
      </div>
      
    </div>
  )
}

export default TopBar
