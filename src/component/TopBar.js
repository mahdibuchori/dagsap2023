import React from 'react'
import './style.css';
import icon from '../assets/img/dee.png';

const TopBar = ({user}) => {
  return (
    <>
    <div className='topbar'>
      <div className='topName'>
      </div>
      <div className='topOut'>
        <img src={icon} width="30" height="30"alt="Logo" className='imgTop' />
        Hi, {user?.uname} 
      </div>
    </div>
    </>
  )
}

export default TopBar
