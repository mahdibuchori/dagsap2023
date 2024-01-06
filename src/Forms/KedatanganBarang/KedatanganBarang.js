import React from 'react'
import useAuthStore, { selectUser } from '../../store/DataUser';
import { DontAccess } from '../../component/DontAccess';
import { TerimaAll } from './TerimaAll';
import { TerimaPpic } from './TerimaPpic';
import { TerimaPurch } from './TerimaPurch';

export const KedatanganBarang = () => {const userData = useAuthStore(selectUser);
    if(userData?.udivisi === "Develop" || userData?.udivisi === "BOD"){
      return (
        <div className='setContain'>
          <TerimaAll />
        </div>
      )
    }
    else if(userData?.udivisi === "PPIC Purchasing" && userData?.ulevel === 2){
      return (
        <div className='setContain'>
          <TerimaAll />
        </div>
      )
    }
    else if(userData?.udivisi === "PPIC Purchasing" && userData?.usubdiv === "PPIC-WH"){
      return (
        <div className='setContain'>
          <TerimaPpic />
        </div>
      )
    }
    else if(userData?.udivisi === "PPIC Purchasing" && userData?.usubdiv === "Purchasing"){
      return (
        <div className='setContain'>
          <TerimaPurch />
        </div>
      )
    }
    else{
      return (
        <div className='setContain'>
          <DontAccess />
        </div>
      )
    }
}
