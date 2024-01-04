import React, { useMemo } from 'react';
import './pengadaan.css';
import { COLUMNS_PENGADAAN } from '../../datafile/columns';
import { Tablepengadaan } from './Tablepengadaan';

const Pengadaan = () => {
    const columns = useMemo(() => COLUMNS_PENGADAAN, []);

    return (
        <div className='setContain'>
            <Tablepengadaan columns={columns}/>
            
        </div>
    )
}

export default Pengadaan