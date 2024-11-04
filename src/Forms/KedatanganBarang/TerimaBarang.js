import React, { useEffect, useMemo, useRef, useState } from 'react';
import Select from 'react-select';
import Swal from "sweetalert2";
import { Button, Col, FloatingLabel, Form, Tab, Tabs } from 'react-bootstrap';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import { API_AUTH } from '../../apis/apisData';
import { FileBarang } from '../../datafile/FileSelect';
import { COLUMNS_TERBANG } from '../../datafile/columns';
import { LoadingPage } from '../../LoadingPage/LoadingPage';
import useAuthStore, { selectUser } from '../../store/DataUser';
import useDataMaterial, { selectMaterial } from '../../store/DataMaterial';
import useDataProvider, { selectProvider, selectFetchProvider,selectProviderReady } from '../../store/DataProvider';

export const TerimaBarang = () => {
    const gridRef = useRef();
    const userData = useAuthStore(selectUser);
    const material = useDataMaterial(selectMaterial);
    const provider = useDataProvider(selectProvider);
    const onProvider = useDataProvider(selectFetchProvider);
    const providerReady = useDataProvider(selectProviderReady);

    const [key, setKey] = useState('primary');
    const [rowPpn, setRowPpn] = useState([]);
    const [rowNonPpn, setRowNonPpn] = useState([]);
    const [item, setItem] = useState('');
    const [ materil, setMateril ] = useState('');
    const [ expros, setExpros ] = useState('');
    const [fileBar, setFileBar] = useState(FileBarang);
    const [fileExp, setFileExp] = useState(FileBarang);
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

    useEffect (() => {
        const gntiDta = async () =>{
          try {
            setIsLoading(true);
            const newFileNab = material.material
            let modifiedArr = newFileNab.map(function(element){
                return { value: element.itemdescription, label: `${element.itemdescription}`, item: element.itemdescription , satuan: element.unit1 };
            });
            setFileBar(modifiedArr);
            setIsLoading(false);
          } catch (error) {
              setIsLoading(false);
              Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Pengambilan Data Pengadaan Gagal!',
              footer: error
              })
          }
        } 
    
        gntiDta();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      },[]);

    useEffect(() => { 
        onProvider()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!providerReady) return;
        cekProvider()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [providerReady]);

    const cekProvider =()=>{
        const data = provider.provider;
        let result = data?.map(function(e){
            return { 
                value: e.name,
                label: e.name,
                id: e.id,
            }
        });
        setFileExp(result);
    }
    
    const columns = useMemo(() => COLUMNS_TERBANG, []);

    const defaultColDef = useMemo(() => {
        return {
        editable: false,
        sortable: true,
        filter: true,
        resizable: true,
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
        
        setTglAwal(`${yy}-${bb}-${dd}`);
        setTglAkhir(`${year}-${bulan}-${hari}`);
    };
    const handleSubmit = async () =>{
        let nMaterial = "";
        let nExpro = "";
        if(materil === null){nMaterial = ""}else{nMaterial = materil?.value}
        if(expros === null){nExpro = ""}else{nExpro = expros?.value}
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
                setRowPpn([]);
                setRowNonPpn([]);
            }
            else{
                const ppn  = file.filter(obj => obj.tax === "A" || obj.tax === "G" || obj.tax === "RT" || obj.tax === "S" || obj.tax === "SE" || obj.tax === "ST");
                const nppn  = file.filter(obj => obj.tax === "B" || obj.tax === "D" || obj.tax === "E" || obj.tax === "R" || obj.tax === "T" || obj.tax === "RT" || obj.tax === "");
                setRowPpn(ppn)
                setRowNonPpn(nppn)
            }
            setIsLoading(false);
        } catch (error) {
            console.log('error')
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
                    <label style={{fontSize: 9}}>Item</label>
                    <Select
                        className="basic-single"
                        classNamePrefix="select"
                        defaultValue={fileBar[0]} 
                        value={materil}
                        onChange={(e)=>
                            setMateril(e)
                        }
                        isClearable={true}
                        isSearchable={true}
                        name="color"
                        options={fileBar}
                    />
                </div>
                <div className='col-sm-2 col-md-2 col-lg-2 col-xl-2'>
                    <label style={{fontSize: 9}}>Eksternal Provider</label>
                    <Select
                        className="basic-single"
                        classNamePrefix="select"
                        defaultValue={fileBar[0]} 
                        value={expros}
                        onChange={(e)=>
                            setExpros(e)
                        }
                        isClearable={true}
                        isSearchable={true}
                        name="color"
                        options={fileExp}
                    />
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
            <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => {
                setKey(k);
                // onGridReady();
            }}
            className="mb-1"
        >
            <Tab eventKey="primary" title="PPN">
                <div style={{height: screenHeight, width: screenWidth, padding: 10}} className="ag-theme-alpine">
                    <AgGridReact
                        ref={gridRef}
                        rowData={rowPpn}
                        columnDefs={columns}
                        defaultColDef={defaultColDef}
                        pagination={false}
                        cacheQuickFilter={true}
                    ></AgGridReact>
                </div>
            </Tab>
            <Tab eventKey="secondary" title="Non PPN">
                <div style={{height: screenHeight, width: screenWidth, padding: 10}} className="ag-theme-alpine">
                    <AgGridReact
                        ref={gridRef}
                        rowData={rowNonPpn}
                        columnDefs={columns}
                        defaultColDef={defaultColDef}
                        pagination={false}
                        cacheQuickFilter={true}
                    ></AgGridReact>
                </div>
            </Tab>
        
        </Tabs>
            </div>
            
            {isLoading ? <LoadingPage /> : ""}

        </>
    )
}
