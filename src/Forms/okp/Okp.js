import React, { useMemo } from 'react';
import { COLUMNS_OKP, COLUMNS_OKPNOTE } from '../../datafile/columns';
import { TableOkp } from './TableOkp';

export const Okp = () => {
    const columnsOkp = useMemo(() => COLUMNS_OKP, []);
    const columnsNote = useMemo(() => COLUMNS_OKPNOTE, []);
  return (
    <div className='setContain'>
        <TableOkp columns={columnsOkp} columnsNo={columnsNote}/>
        
    </div>
  )
}
