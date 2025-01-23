import React, { useEffect, useMemo, useState, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import { useNavigate } from 'react-router-dom';
import { Breadcrumb, Stack } from 'react-bootstrap';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import { LoadingPage } from '../../LoadingPage/LoadingPage';
import { COLUMNS_MATERIAL } from '../../datafile/columns';

import material from './material.json'

export const TabelMaterial = () => {
    let navigate = useNavigate();
    const gridRef = useRef();

    const [isLoading, setIsLoading] = useState(false);

    const tHeigt = parseInt(window.innerHeight) - 200;
    let tWidth = 0;
    if(parseInt(window.innerWidth) < 1022){
        tWidth = parseInt(window.innerWidth) - 30;
    }
    else{
        tWidth = parseInt(window.innerWidth) - 99 ;
    }
    const [screenWidth, setScreenWidth] = useState(tWidth);
    const [screenHeight, setScreenHeight] = useState(tHeigt);
    // const [rowData, setRowData] = useState([]);
    useEffect(() => {
        setIsLoading(false)
        const handleResize = () => {
          let total = 0;
          let tinggi = parseInt(window.innerHeight) - 300
          if(parseInt(window.innerWidth) < 1022){
          total = parseInt(window.innerWidth) - 30;
          }
          else{
          total = parseInt(window.innerWidth) - 99 ;
          }
          setScreenWidth(total);
          setScreenHeight(tinggi);
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
    }, []);

    const columns = useMemo(() => COLUMNS_MATERIAL, []);
    const defaultColDef = useMemo(() => {
      return {
      editable: false,
      sortable: true,
      filter: true,
      resizable: true,
      };
    }, []);

    return (
        <>
            <div className='setContain'>
              <Stack direction="horizontal" gap={3} style={{padding: "0px 10px 0px 10px"}}>
                <div className="bg-body">
                  <Breadcrumb className="bg-body m-2">
                    <Breadcrumb.Item onClick={() =>navigate('/form')}>Form</Breadcrumb.Item>
                    <Breadcrumb.Item active>Table Material</Breadcrumb.Item>
                  </Breadcrumb>
                </div>
                <div className="ms-auto">
                  <div style={{marginRight: 10, display:'flex'}}>
                  </div>
                </div>
                <div className="vr" />
                <div className="bg-body">
                </div>
              </Stack>
              <div style={{height: screenHeight, width: screenWidth, padding: 10}} className="ag-theme-alpine">
                <AgGridReact
                    ref={gridRef}
                    rowData={material}
                    columnDefs={columns}
                    defaultColDef={defaultColDef}
                ></AgGridReact>
              </div>
            </div>
        
            {isLoading ? <LoadingPage/> : ""}
            </>
    )
}
