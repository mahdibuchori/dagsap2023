import React, { useEffect, useState } from 'react';
import './menuForm.css';
import MenuDevelop from './MenuDevelop';
import PageNotFo from '../../component/PageNotFo';
import useAuthStore, { selectUser } from '../../store/DataUser';
import { DontAccess } from '../../component/DontAccess';
import { MenuPpicPurch } from './MenuPpicPurch';
import { MenuPpic } from './MenuPpic';
import { MenuPurchasing } from './MenuPurchasing';


const MenuCenter = () => {
    const [divisi, setDivisi] = useState('');
    const userData = useAuthStore(selectUser);

    useEffect(() => {
        getUsers()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    const getUsers =async () =>{
        setDivisi(userData?.udivisi)
        console.log(userData)
    }

  
  if(userData?.udivisi === "Develop" || userData?.udivisi === "BOD"){
    return (
      <div className='setContain'>
        <MenuDevelop />
        <p style={{display: 'none'}}>{divisi}</p>
      </div>
      
    )
  }
  else if(userData?.udivisi === "PPIC Purchasing" && userData?.ulevel === 2){
    return (
      <div className='setContain'>
        <MenuPpicPurch />
      </div>
      
    )
  }
  else if(userData?.udivisi === "PPIC Purchasing" && userData?.usubdiv === "PPIC-WH"){
    return (
      <div className='setContain'>
        <MenuPpic />
      </div>
      
    )
  }
  else if(userData?.udivisi === "PPIC Purchasing" && userData?.usubdiv === "Purchasing"){
    return (
      <div className='setContain'>
        <MenuPurchasing />
      </div>
      
    )
  }
  else if(userData?.udivisi === "Produksi" ){
    return (
      <div className='setContain'>
        <PageNotFo />
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