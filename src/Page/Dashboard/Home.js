import React, { useEffect, useState } from 'react'
import './home.css'
import useAuthStore, { selectUser } from '../../store/DataUser';
import { DontAccess } from '../../component/DontAccess';
import { DashDev } from './DashDev';
import { DashMngr } from './ppicpurch/DashMngr';
import { DashPpic } from './ppicpurch/DashPpic';
import { DashPurch } from './ppicpurch/pruchasingDash/DashPurch';
import { DashFg } from './ppicpurch/FgDashboard/DashFg';
import { DashWip } from './ppicpurch/DashWip';
import { DashProd } from './produksi/DashProd';
import { DashMantc } from './mtc/DashMantc';
import { DashHrga } from './hrdga/DashHrga';
import { DashRnd } from './rnd/DashRnd';
import { DashQaqc } from './qaqc/DashQaqc';
import { DashSsd } from './ssd/DashSsd';
import { DashSsm } from './ssm/DashSsm';

const Home = () => {
  const [divisi, setDivisi] = useState('');
  const userData = useAuthStore(selectUser);
  useEffect(() => {
    getUsers()
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUsers =async () =>{
    setDivisi(userData?.udivisi)
  }

  if(userData?.udivisi === "Develop" || userData?.udivisi === "BOD/BOC"){
    return (
      <div className='setContain'>
        <DashDev />
        <p style={{display: 'none'}}>{divisi}</p>
      </div>
      
    )
  }
  else if(userData?.udivisi === "PPIC-Purchasing" && userData?.ulevel === 2){
    return (
      <div className='setContain'>
        <DashMngr />
      </div>
      
    )
  }
  else if(userData?.udivisi === "PPIC-Purchasing" && userData?.usubdiv === "PPIC-WH"){
    return (
      <div className='setContain'>
        <DashPpic />
      </div>
      
    )
  }
  else if(userData?.udivisi === "PPIC-Purchasing" && userData?.usubdiv === "Purchasing"){
    return (
      <div className='setContain'>
        <DashPurch />
      </div>
      
    )
  }
  else if(userData?.udivisi === "PPIC-Purchasing" && userData?.usubdiv === "FG"){
    return (
      <div className='setContain'>
        <DashFg />
      </div>
      
    )
  }
  else if(userData?.udivisi === "PPIC-Purchasing" && userData?.usubdiv === "WIP"){
    return (
      <div className='setContain'>
        <DashWip />
      </div>
      
    )
  }
  else if(userData?.udivisi === "Produksi" ){
    return (
      <div className='setContain'>
        <DashProd />
      </div>
      
    )
  }
  else if(userData?.udivisi === "Maintenance" ){
    return (
      <div className='setContain'>
        <DashMantc />
      </div>
      
    )
  }
  else if(userData?.udivisi === "HR-GA" ){
    return (
      <div className='setContain'>
        <DashHrga />
      </div>
      
    )
  }
  else if(userData?.udivisi === "RnD" ){
    return (
      <div className='setContain'>
        <DashRnd />
      </div>
      
    )
  }
  else if(userData?.udivisi === "QAQC" ){
    return (
      <div className='setContain'>
        <DashQaqc />
      </div>
      
    )
  }
  else if(userData?.udivisi === "SSD" ){
    return (
      <div className='setContain'>
        <DashSsd />
      </div>
      
    )
  }
  else if(userData?.udivisi === "Sales-Marketing" ){
    return (
      <div className='setContain'>
        <DashSsm />
      </div>
      
    )
  }
  else{
    return(
      <div className='setContain'>
        <DontAccess />
      </div>
    )
  }
}

export default Home