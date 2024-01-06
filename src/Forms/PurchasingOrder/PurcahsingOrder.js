import React, { useMemo } from 'react';
import { COLUMNS_PO } from '../../datafile/columns';
import { TablePo } from './TablePo';

export const PurcahsingOrder = () => {
    const columns = useMemo(() => COLUMNS_PO, []);
  return (
    <div className='setContain'>
            <TablePo columns={columns}/>
            
        </div>
  )
}
