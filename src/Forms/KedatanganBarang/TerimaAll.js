import React, { useEffect, useState } from 'react'
import { Breadcrumb, Stack, Tab, Tabs } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import { TerimaBarang } from './TerimaBarang';
import { LogBook } from './LogBook';

export const TerimaAll = () => {
    const navigate = useNavigate();
    const [key, setKey] = useState('primary');
    const tHeigt = parseInt(window.innerHeight) - 300;
    let tWidth = 0;
    if(parseInt(window.innerWidth) < 1022){
      tWidth = parseInt(window.innerWidth) - 30;
    }
    else{
      tWidth = parseInt(window.innerWidth) - 99 ;
    }
    const [screenWidth, setScreenWidth] = useState(tWidth);
    const [screenHeight, setScreenHeight] = useState(tHeigt);

    useEffect(() => {
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
    return (
        <>
            <div>
                <Stack direction="horizontal" gap={3} style={{padding: "0px 5px 0px 5px"}}>
                <div className="bg-body">
                    <Breadcrumb className="bg-body m-2">
                        <Breadcrumb.Item onClick={() =>navigate('/form')}>Form</Breadcrumb.Item>
                        <Breadcrumb.Item active>Terima Barang & Log Book</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="ms-auto">
                    <div style={{marginRight: 10, display:'flex'}}>
                    </div>
                </div>
                <div className="bg-body">
                </div>
                </Stack>
            
                <Tabs
                    id="controlled-tab-example"
                    activeKey={key}
                    onSelect={(k) => {
                        setKey(k);
                        // onGridReady();
                    }}
                    className="mb-1"
                >
                    <Tab eventKey="primary" title="Terima Barang">
                        <TerimaBarang/>
                    </Tab>
                    <Tab eventKey="secondary" title="log Book Monitoring">
                        <div style={{height: screenHeight, width: screenWidth, padding: 10}} className="ag-theme-alpine">
                            <LogBook />
                        </div>
                    </Tab>
                
                </Tabs>
            </div>
        </>
    )
}
