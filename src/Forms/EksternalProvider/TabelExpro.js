import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useNavigate } from 'react-router-dom';
import { Breadcrumb, Container, Stack } from 'react-bootstrap';

import { COLUMNS_EXPRO } from '../../datafile/columns';
import { LoadingPage } from '../../LoadingPage/LoadingPage';

import expro from './expro.json';

export const TabelExpro = () => {
    const navigate = useNavigate();
    const gridRef = useRef();

    const tHeigt = parseInt(window.innerHeight) - 250;
    let tWidth = 0;
    if(parseInt(window.innerWidth) >= 1700){
        tWidth = parseInt(window.innerWidth) - 280;
    }
    else if(parseInt(window.innerWidth) >= 1200){
        tWidth = parseInt(window.innerWidth) - 270;
    }
    else if(parseInt(window.innerWidth) >= 1100){
        tWidth = parseInt(window.innerWidth) - 300;
    }
    else if(parseInt(window.innerWidth) >= 1020){
        tWidth = parseInt(window.innerWidth) - 280;
    }
    else if(parseInt(window.innerWidth) >= 992){
        tWidth = parseInt(window.innerWidth) - 230;
    }
    else if(parseInt(window.innerWidth) >= 882){
        tWidth = parseInt(window.innerWidth) - 80;
    }
    else if(parseInt(window.innerWidth) >= 576){
        tWidth = parseInt(window.innerWidth) - 60;
    }
    else{
        tWidth = parseInt(window.innerWidth)- 50
    }
    const [screenWidth, setScreenWidth] = useState(tWidth);
    const [screenHeight, setScreenHeight] = useState(tHeigt);
    const [isLoading, setIsLoading] = useState(false);

    const columns = useMemo(() => COLUMNS_EXPRO, []);
    console.log(expro)

    useEffect(() => {
        setIsLoading(false)
        const handleResize = () => {
            let total = 0;
            let tinggi = parseInt(window.innerHeight) - 450
            if(parseInt(window.innerWidth) >= 1700){
            total = parseInt(window.innerWidth) - 280;
            }
            else if(parseInt(window.innerWidth) >= 1200){
            total = parseInt(window.innerWidth) - 270;
            }
            else if(parseInt(window.innerWidth) >= 1100){
            total = parseInt(window.innerWidth) - 300;
            }
            else if(parseInt(window.innerWidth) >= 1020){
            total = parseInt(window.innerWidth) - 280;
            }
            else if(parseInt(window.innerWidth) >= 992){
            total = parseInt(window.innerWidth) - 230;
            }
            else if(parseInt(window.innerWidth) >= 882){
            total = parseInt(window.innerWidth) - 80;
            }
            else if(parseInt(window.innerWidth) >= 576){
            total = parseInt(window.innerWidth) - 60;
            }
            else{
            total = parseInt(window.innerWidth)- 50
            }
            setScreenWidth(total);
            setScreenHeight(tinggi);
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const defaultColDef = useMemo(() => {
        return {
            editable: false,
            cellDataType: false,
            resizable: true,
        };
    }, []);

    return (
        <>
        <div className='setContain'>
            <Stack direction="horizontal" gap={3} style={{padding: "0px 10px 0px 10px"}}>
                <div className="bg-body">
                <Breadcrumb className='bg-body'>
                    <Breadcrumb.Item onClick={() =>navigate(`/form`)}>Form</Breadcrumb.Item>
                    <Breadcrumb.Item active>Table Eksternal Provider</Breadcrumb.Item>
                </Breadcrumb>
                </div>
                <div className="ms-auto">
                <div style={{marginRight: 10, display:'flex'}}></div>
                </div>
                <div className="vr" />
                <div className="bg-body">
                </div>
            </Stack>

            <Container fluid>
                <div style={{height: screenHeight, width: screenWidth, padding: 5}} className="ag-theme-alpine">
                    <AgGridReact
                        ref={gridRef}
                        rowData={expro}
                        columnDefs={columns}
                        defaultColDef={defaultColDef}
                        // singleClickEdit={true}
                        // onCellClicked={onCellClicked}
                        // onCellValueChanged={onCellValueChanged}
                
                    />
                </div>
            </Container>
        </div>

        {isLoading && <LoadingPage />}
        </>
    )
}

// "id": "28510",
// "personno": "S1187858O",
// "name": "ZONA TEKNIK SOLUTION",
// "currencyid": "2",
// "currencyname": "IDR",
// "termid": "1",
// "termname": "C.O.D",
// "tax1id": "1",
// "tax1code": "D",
// "tax1name": "PPN-SEDERHANA",
// "tax1rate": "11",
// "tax2id": "1235",
// "tax2code": "A",
// "tax2name": "PPH-21_2.5",
// "tax2rate": "-2.5",
// "addressline1": "JL. MASJID AL WUSTHO GG. ABDUL MUIT NO.60 DUREN SAWIT ",
// "addressline2": "",
// "city": "JAKARTA TIMUR",
// "stateprov": "DKI",
// "zipcode": "",
// "country": "INDONESIA",
// "phone": "08588-6040-643",
// "email": "zonateknik202@gmail.com"
