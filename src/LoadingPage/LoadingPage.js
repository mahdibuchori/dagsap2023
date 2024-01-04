import React from 'react';
import './loadingpage.css';
import icon from '../assets/img/dee.png';


export const LoadingPage = () => {
  return (
    <div className='popLoading'>
    <div class="container">
      <img src={icon} alt='' className='imgLoad'/>
    </div>
      </div>
  )
}
