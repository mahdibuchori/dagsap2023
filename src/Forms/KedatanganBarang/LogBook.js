import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Button, Col, FloatingLabel, Form } from 'react-bootstrap';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import { API_AUTH } from '../../apis/apisData';
import { COLUMNS_LOGBOOK } from '../../datafile/columns';
import { LoadingPage } from '../../LoadingPage/LoadingPage';
import useAuthStore, { selectUser } from '../../store/DataUser';

export const LogBook = () => {
    const gridRef = useRef();
    const userData = useAuthStore(selectUser);
    const [rowLbook, setRowLbook] = useState([]);
    const [item, setItem] = useState('');
    const [tglAwal, setTglAwal] = useState('');
    const [tglAkhir, setTglAkhir] = useState('');
    const [isLoading, setIsLoading] = useState(false);

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

    useEffect(() => {
        const createUniq = () => {
            const d = new Date();
            let yy = d.getFullYear();
            let bln = parseInt(d.getMonth()) + 1;
            let day = d.getDate();
            let bb = String(bln).padStart(2, '0');
            let dd = String(day).padStart(2, '0');
            
            setTglAkhir(`${yy}-${bb}-${dd}`);
            setTglAwal(`${yy}-${bb}-${dd}`);
            // setRowData([])
        }
        createUniq()
    }, []);

    const columns = useMemo(() => COLUMNS_LOGBOOK, []);

    const defaultColDef = useMemo(() => {
        return {
        editable: false,
        sortable: true,
        filter: true,
        resizable: true,
        };
    }, []);

    const rowClassRules = useMemo(() => {
        return {
            /* clr-Pengajuan,Progress,Selesai,Revisi,Verify,nul*/
          'clr-Selesai': (params) => {
            return params.data.status_brng ==='Selesai';
          },
          'clr-nul': (params) => {
            return params.data.status_item ==='';
          },
        };
      }, []);

    const handleApply = (event, picker) => {
        const d = new Date(picker.startDate._d);
        let yy = d.getFullYear();
        let bln = parseInt(d.getMonth()) + 1;
        let day = d.getDate();
        let bb = String(bln).padStart(2, '0');
        let dd = String(day).padStart(2, '0');

        const date = new Date(picker.endDate._d);
        let year = date.getFullYear();
        let month = parseInt(date.getMonth()) + 1;
        let days = date.getDate();
        let bulan = String(month).padStart(2, '0');
        let hari = String(days).padStart(2, '0');

        console.log(`${yy}-${bb}-${dd}`);
        console.log(`${year}-${bulan}-${hari}`);
        
        setTglAwal(`${yy}-${bb}-${dd}`);
        setTglAkhir(`${year}-${bulan}-${hari}`);
    };
    const handleSubmit = async () =>{
        let nMaterial = "";
        let nExpro = "";
        try {
            setIsLoading(true)
            const data  =  await API_AUTH.get('/kedatangan', {
                params: {
                    item : item,
                    tAwal : tglAwal,
                    tAkhir : tglAkhir,
                    material : nMaterial,
                    expro : nExpro,
                    plan : userData.uplan
                }
            });
            const file = data.data;
            if(file.length === 0){
                setRowLbook([]);
            }
            else{setRowLbook(file)
            }
            setIsLoading(false);
        } catch (error) {
            console.log(error)
            setIsLoading(false);
        }

        
    }
    return (
        <>
            <div className="row m-1">
                <div className='col-sm-2 col-md-2 col-lg-2 col-xl-2'>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="No PO"
                        className="mb-3"
                    >
                        <Form.Control 
                            type="text" 
                            value={item}
                            onChange={(e)=>
                                {
                                    let  kode = (e.target.value).toUpperCase()
                                    setItem(kode)
                                }
                            }
                        />
                    </FloatingLabel>
                </div>
                <div className='col-sm-2 col-md-2 col-lg-2 col-xl-2'>
                    <Form.Group as={Col} controlId="validationCustom01">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Tanggal Kirim"
                            className="mb-3"
                        >
                            <DateRangePicker
                                onApply={handleApply}
                            >
                                <input type="text" className="form-control" />
                            </DateRangePicker>    
                        </FloatingLabel>
                        
                    </Form.Group>
                </div>
                <div className='col-sm-2 col-md-2 col-lg-2 col-xl-2'>
                    <Button variant="outline-primary" onClick={handleSubmit} size="lg"><i class="bi bi-search"></i> Cari item</Button>
                </div>  
            </div>
            <div style={{height: screenHeight, width: screenWidth, padding: 10}} className="ag-theme-alpine">
                <AgGridReact
                    ref={gridRef}
                    rowData={rowLbook}
                    columnDefs={columns}
                    defaultColDef={defaultColDef}
                    pagination={false}
                    cacheQuickFilter={true}
                    rowClassRules={rowClassRules}
                ></AgGridReact>
            </div>

            {isLoading ? <LoadingPage /> : ""}
        </>
    )
}
