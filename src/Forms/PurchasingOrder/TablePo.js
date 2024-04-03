import React, { useEffect, useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import { useNavigate } from 'react-router-dom';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Breadcrumb, Card, Dropdown, Form, InputGroup, Stack } from 'react-bootstrap';

import { LoadingPage } from '../../LoadingPage/LoadingPage';
import useAuthStore, { selectUser } from '../../store/DataUser';
import useDataPo, { selectDataPo, selectPoReady,selectFetchPo, selectFalsePo } from '../../store/DataPo';

export const TablePo = ({columns}) => {
    let navigate = useNavigate();
    const userData = useAuthStore(selectUser);
    const dataPo = useDataPo(selectDataPo);
    const fetchPo = useDataPo(selectFetchPo);
    const poReady = useDataPo(selectPoReady);
    const poFalse = useDataPo(selectFalsePo);

    const [totalPo, setTotalPo] = useState(0);
    const [pengajuanPo, setPengajuanPo] = useState(0);
    const [verifikasiPo, setVerifikasiPo] = useState(0);
    const [revisiPo, setRevisiPo] = useState(0);
    const [selesaiPo, setSelesaiPo] = useState(0);

    const [rowData, setRowData] = useState();

    const [bulan, setBulan] = useState();
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

    useEffect(() => { 
        setIsLoading(true);
        poFalse();
        const date = new Date();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        let bb = String(month).padStart(2, '0');
        setBulan(`${year}-${bb}`);
        fetchPo(`${year}-${bb}`, userData.uplan);
        // setIsLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
    
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
        setIsLoading(true);
        if (!poReady) return;
        onGridReady()
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [poReady]);

    const onGridReady =async () =>{
        console.log(dataPo.data)
        const data =dataPo.data;
        
        const pp = data.filter(x=> x.status === "Pengajuan");
        const pv = data.filter(x=> x.status === "Verifikasi");
        const ps = data.filter(x=> x.status === "Selesai");
        const pr = data.filter(x=> x.status === "Revisi");
        setRowData(dataPo.data);
        setTotalPo(data.length);
        setPengajuanPo(pp.length);
        setVerifikasiPo(pv.length);
        setSelesaiPo(ps.length);
        setRevisiPo(pr.length);

        try {
            await poFalse();
        } catch (error) {
            console.log(error)
        }
        setIsLoading(false);
    }

    const onSetDate =async (event) => {
        setIsLoading(true)
        poFalse();
        setBulan(event.target.value);
        await fetchPo(event.target.value, userData.uplan);
        
      } 

    const defaultColDef = useMemo(() => {
        return {
        editable: false,
        sortable: true,
        filter: true,
        resizable: true,
        };
      }, []);
    
    const cekData = (e) =>{
        setRowData([])
        const data =dataPo.data;
        const pp = data.filter(x=> x.status === "Pengajuan");
        const pv = data.filter(x=> x.status === "Verifikasi");
        const ps = data.filter(x=> x.status === "Selesai");
        const pr = data.filter(x=> x.status === "Revisi");
    
        if(e === 'pengajuan'){
            setRowData(pp)
        }
        else if(e === 'verifikasi'){
            setRowData(pv)
        }
        else if(e === 'revisi'){
            setRowData(pr)
        }
        else if(e === 'selesai'){
            setRowData(ps)
        }
        else{
            setRowData(data)
        }
         
    }
    
    return (
        <>
        <div>
            <Stack direction="horizontal" gap={3} style={{padding: "0px 10px 0px 10px"}}>
                <div className="bg-body">
                    <Breadcrumb className="bg-body m-2">
                        <Breadcrumb.Item onClick={() =>navigate('/form')}>Form</Breadcrumb.Item>
                        <Breadcrumb.Item onClick={() =>navigate('/form/pengadaan')}>Table Pengadaan</Breadcrumb.Item>
                        <Breadcrumb.Item active>Table PO</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="ms-auto">
                    <div style={{marginRight: 10, display:'flex'}}>
                    <InputGroup variant="outline-primary">
                        <Form.Control
                        type="month"
                        value={bulan}
                        min="2020-08"
                        onChange={(e) =>onSetDate(e)}
                        />
                    </InputGroup>
                    </div>
                </div>
                <div className="vr" />
                <div className="bg-body">
                    <Dropdown>
                    <Dropdown.Toggle variant="primary">
                    Menu
                    </Dropdown.Toggle>
            
                    <Dropdown.Menu variant="dark">
                        <Dropdown.Item><i class="bi bi-pencil"></i> Create PO</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item><i className="bi bi-printer"></i> Print</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={onGridReady}><i className="bi bi-arrow-clockwise"></i> Refresh</Dropdown.Item>
                        
                    </Dropdown.Menu>
                    </Dropdown>
                </div>
            </Stack>

            <div className="row mb-1 mt-1" style={{padding: "0px 10px 0px 10px"}}>
                <div className="col-md-2">
                    <Card className='mb-1'>
                        <div className="radius-10 border-start border-0 border-3 border-secondary">
                            <Card.Body style={{height: "55px", padding: '8px'}}>
                                <div class="dropdown" onClick={(e)=> cekData('all')}>
                                    <h6  className="nmTeks">Total PO ({totalPo} Item)</h6>
                                </div>
                            </Card.Body>
                        </div>
                    </Card>
                </div>
                <div className="col-md-2">
                    <Card className='mb-1'>
                        <div className="radius-10 border-start border-0 border-3 border-danger">
                            <Card.Body style={{height: "50px", padding: '8px'}}>
                                <h6 onClick={(e)=> cekData('pengajuan')} className="nmTeks">Pengajuan PO ({pengajuanPo} Item)</h6>
                            </Card.Body>
                        </div>
                    </Card>
                </div>
                <div className="col-md-2">
                    <Card className='mb-1'>
                        <div className="radius-10 border-start border-0 border-3 border-primary">
                            <Card.Body style={{height: "50px", padding: '8px'}}>
                                <h6 onClick={(e)=> cekData('verifikasi')} className="nmTeks">Verifikasi PO ({verifikasiPo} Item)</h6>
                            </Card.Body>
                        </div>
                    </Card>
                </div>
                <div className="col-md-2">
                    <Card className='mb-1'>
                        <div className="radius-10 border-start border-0 border-3 border-warning">
                            <Card.Body style={{height: "50px", padding: '8px'}}>
                                <h6 onClick={(e)=> cekData('revisi')} className="nmTeks">Revisi PO ({revisiPo} Item)</h6>
                            </Card.Body>
                        </div>
                    </Card>
                </div>
                <div className="col-md-2">
                    <Card className='mb-1'>
                        <div className="radius-10 border-start border-0 border-3 border-success">
                            <Card.Body style={{height: "50px", padding: '8px'}}>
                                <h6 onClick={(e)=> cekData('selesai')} className="nmTeks">Selesai ({selesaiPo} Item)</h6>
                            </Card.Body>
                        </div>
                    </Card>
                </div>
            </div>

            <div style={{height: screenHeight, width: screenWidth, padding: 10}} className="ag-theme-alpine">
                <AgGridReact
                    rowData={rowData}
                    columnDefs={columns}
                    defaultColDef={defaultColDef}
                    onGridReady={onGridReady}
                ></AgGridReact>
            </div>
        </div>

        {isLoading ? <LoadingPage/> : ""}
        </>
    )
}
