import React, { useEffect, useState } from 'react';
import './menuForm.css';
import MenuDevelop from './MenuDevelop';
import useAuthStore, { selectUser } from '../../store/DataUser';
import { DontAccess } from '../../component/DontAccess';
import { MenuPpicPurch } from './MenuPpicPurch';
import { MenuPpic } from './MenuPpic';
import { MenuPurchasing } from './MenuPurchasing';
import { MenuHrga } from './MenuHrga';
import { MenuProduksi } from './MenuProduksi';
import { MenuQaqc } from './MenuQaqc';
import { MenuFg } from './MenuFg';
import { MenuMtc } from './MenuMtc';
import { MenuFat } from './MenuFat';


const MenuCenter = () => {
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
        <MenuDevelop />
        <p style={{display: 'none'}}>{divisi}</p>
      </div>
      
    )
  }
  else if(userData?.udivisi === "PPIC-Purchasing" && userData?.ulevel === 2){
    return (
      <div className='setContain'>
        <MenuPpicPurch />
      </div>
      
    )
  }
  else if(userData?.udivisi === "PPIC-Purchasing" && userData?.usubdiv === "PPIC-WH"){
    return (
      <div className='setContain'>
        <MenuPpic />
      </div>
      
    )
  }
  else if(userData?.udivisi === "PPIC-Purchasing" && userData?.usubdiv === "Purchasing"){
    return (
      <div className='setContain'>
        <MenuPurchasing />
      </div>
      
    )
  }
  else if(userData?.udivisi === "PPIC-Purchasing" && userData?.usubdiv === "FG"){
    return (
      <div className='setContain'>
        <MenuFg />
      </div>
      
    )
  }
  else if(userData?.udivisi === "Produksi" ){
    return (
      <div className='setContain'>
        <MenuProduksi />
      </div>
      
    )
  }
  else if(userData?.udivisi === "HR-GA" ){
    return (
      <div className='setContain'>
        <MenuHrga />
      </div>
    )
  }
  else if(userData?.udivisi === "QAQC" ){
    return (
      <div className='setContain'>
        <MenuQaqc />
      </div>
    )
  }
  else if(userData?.udivisi === "SSD" ){
    return (
      <div className='setContain'>
        <MenuQaqc />
      </div>
    )
  }
  else if(userData?.udivisi === "Maintenance" ){
    return (
      <div className='setContain'>
        <MenuMtc />
      </div>
    )
  }
  else if(userData?.udivisi === "FAT" ){
    return (
      <div className='setContain'>
        <MenuFat />
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

export default MenuCenter