import React, { useMemo } from 'react'
import { COLUMNS_KARYAWAN } from '../../datafile/columns';
import { TableKaryawan } from './TableKaryawan';

export const Karyawan = () => {
    const columns = useMemo(() => COLUMNS_KARYAWAN, []);

    return (
        <div className='setContain'>
            <TableKaryawan columns={columns}/>
            
        </div>
    )
}
