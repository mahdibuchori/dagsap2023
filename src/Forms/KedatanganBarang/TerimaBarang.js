import React, { useEffect, useMemo, useRef, useState } from 'react';
import Select from 'react-select';
import Swal from "sweetalert2";
import { addDays } from 'date-fns';
import { Button, Col, FloatingLabel, Form, Modal, Tab, Tabs } from 'react-bootstrap';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import { DateRange } from 'react-date-range';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { utils, writeFileXLSX } from 'xlsx';

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
    const [show, setShow] = useState(false);

    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 0),
            key: 'selection'
        }
    ]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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

    const handleDates =async () =>{
        setIsLoading(true)
        try {
            const startDate = state[0].startDate;
            const endDate =  state[0].endDate
            const d = new Date(startDate);
            let yy = d.getFullYear();
            let bln = parseInt(d.getMonth()) + 1;
            let day = d.getDate();
            let bb = String(bln).padStart(2, '0');
            let dd = String(day).padStart(2, '0');

            const date = new Date(endDate);
            let year = date.getFullYear();
            let month = parseInt(date.getMonth()) + 1;
            let days = date.getDate();
            let bulan = String(month).padStart(2, '0');
            let hari = String(days).padStart(2, '0');
            const firstDate = `${yy}-${bb}-${dd}`;
            const lastDate = `${year}-${bulan}-${hari}`;
            const next = await API_AUTH.post(`/kedatanganxlxs`, {
                dateAwal : firstDate,
                dateAkhir: lastDate,
                plan: userData.uplan,
            })
            const file = next.data;

            const ppn  = file.filter(obj => obj.tax === "A" || obj.tax === "G" || obj.tax === "RT" || obj.tax === "S" || obj.tax === "SE" || obj.tax === "ST");
            const nppn  = file.filter(obj => obj.tax === "B" || obj.tax === "D" || obj.tax === "E" || obj.tax === "R" || obj.tax === "T" || obj.tax === "RT" || obj.tax === "");
            
            let pp1 = [];
            let pp2 = [];
            if(ppn.length > 0){
                for(let x = 0; x < ppn.length; x++){
                    let mfil = ppn[x];
                    let date1 = new Date();
                    let date2 = new Date(mfil.tgl_terima);
                    let status = mfil.status_brng;
                    let statusx = "";
                    let qty_psn = 0;
                    let hSatuan = 0;
                    let diskon = 0;
                    let tax = mfil.tax;

                    if(statusx === ""){
                        if (date1 < date2) {
                            statusx = "Proses";  
                        } else if (date1 > date2) {
                            statusx = "Deadline";
                        } else {
                            statusx = "Proses";
                        }
                    }
                    else{
                        statusx = status;
                    }

                    if(mfil.qty_psn === undefined || mfil.qty_psn === ""){qty_psn = 0}
                    else{qty_psn = parseFloat(mfil.qty_psn)}

                    if(mfil.hrga_sat === undefined || mfil.hrga_sat === ""){hSatuan = 0}
                    else{hSatuan = parseFloat(mfil.hrga_sat)}

                    if(mfil.disc === undefined || mfil.disc === ""){diskon = 0}
                    else{diskon = String(mfil.disc).split("+")}

                    let total = qty_psn * hSatuan;

                    if(diskon.length <2){
                        let cekHarga = (parseFloat(diskon) * total) / 100;
                        total = total - cekHarga;
                    }
                    else{
                        for(let x = 0; x < diskon.length;x++){
                            let cekHarga = (parseFloat(diskon[x]) * total) / 100;
                            total = total - cekHarga;
                        }
                    }

                    let nPPN =0.0;
                    let nPPH =0.0;
                    if(tax === "A"){
                        nPPN = 0.0;
                        nPPH =(total*2.5)/100;
                    }
                    else if(tax === "B"){
                        nPPN = 0.0;
                        nPPH =(total*3)/100;
                    }
                    else if(tax === "D"){
                        nPPN = 0.0;
                        nPPH = 0.0;
                    }
                    else if(tax === "E"){
                        nPPN = 0.0;
                        nPPH = (total*10)/100;
                    }
                    else if(tax === "G"){
                        nPPN = 0.0;
                        nPPH = (total*0.5)/100;
                    }
                    else if(tax === "R"){
                        nPPN = (total*1.1)/100;
                        nPPH = 0.0;
                    }
                    else if(tax === "S"){
                        nPPN = (total*11)/100;
                        nPPH = 0.0;
                    }
                    else if(tax === "T"){
                        nPPN = 0.0;
                        nPPH = (total*2)/100;
                    }
                    else if(tax === "SE"){
                        nPPN = (total*11)/100;
                        nPPH = (total*10)/100;
                    }
                    else if(tax === "ST"){
                        nPPN = (total*11)/100;
                        nPPH = (total*2)/100;
                    }
                    else if(tax === "RT"){
                        nPPN = (total*1.1)/100;
                        nPPH = (total*2)/100;
                    }
                    else{
                        nPPN = 0.0;
                        nPPH = 0.0;
                    }
                    total = (total + nPPN) - nPPH;

                    pp1.push({
                        currency : mfil.currency,
                        no_po : mfil.no_po,
                        kode_item : mfil.kode_item,
                        tgl_psn : mfil.tgl_psn,
                        tgl_terima : mfil.tgl_terima,
                        eks_provider : mfil.eks_provider,
                        no_fina: mfil.no_fina,
                        deskripsi_item : mfil.deskripsi_item,
                        status_brng : statusx,
                        qty_psn :(parseFloat(mfil.qty_psn)).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                        hrga_sat : (parseFloat(mfil.hrga_sat)).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                        tax : mfil.tax,
                        disc : mfil.disc,
                        valas: (parseFloat(total)).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                        ongkir : mfil.ongkir,
                        tgl_datang : mfil.tgl_datang,
                        qty_trma : mfil.qty_trma,
                        ket_purch : mfil.ket_purch
                    })
                }
            }
            else{
                
            }

            if(nppn.length > 0){
                for(let x = 0; x < nppn.length; x++){
                    let mfil = nppn[x];
                    let date1 = new Date();
                    let date2 = new Date(mfil.tgl_terima);
                    let status = mfil.status_brng;
                    let statusx = "";
                    let qty_psn = 0;
                    let hSatuan = 0;
                    let diskon = 0;
                    let tax = mfil.tax;

                    if(status === ""){
                        if (date1 < date2) {
                            statusx = "Proses";  
                        } else if (date1 > date2) {
                            statusx = "Deadline";
                        } else {
                            statusx = "Proses";
                        }
                    }
                    else{
                        statusx = status;
                    }

                    if(mfil.qty_psn === undefined || mfil.qty_psn === ""){qty_psn = 0}
                    else{qty_psn = parseFloat(mfil.qty_psn)}

                    if(mfil.hrga_sat === undefined || mfil.hrga_sat === ""){hSatuan = 0}
                    else{hSatuan = parseFloat(mfil.hrga_sat)}

                    if(mfil.disc === undefined || mfil.disc === ""){diskon = 0}
                    else{diskon = String(mfil.disc).split("+")}

                    let total = qty_psn * hSatuan;

                    if(diskon.length <2){
                        let cekHarga = (parseFloat(diskon) * total) / 100;
                        total = total - cekHarga;
                    }
                    else{
                        for(let x = 0; x < diskon.length;x++){
                            let cekHarga = (parseFloat(diskon[x]) * total) / 100;
                            total = total - cekHarga;
                        }
                    }

                    let nPPN =0.0;
                    let nPPH =0.0;
                    if(tax === "A"){
                        nPPN = 0.0;
                        nPPH =(total*2.5)/100;
                    }
                    else if(tax === "B"){
                        nPPN = 0.0;
                        nPPH =(total*3)/100;
                    }
                    else if(tax === "D"){
                        nPPN = 0.0;
                        nPPH = 0.0;
                    }
                    else if(tax === "E"){
                        nPPN = 0.0;
                        nPPH = (total*10)/100;
                    }
                    else if(tax === "G"){
                        nPPN = 0.0;
                        nPPH = (total*0.5)/100;
                    }
                    else if(tax === "R"){
                        nPPN = (total*1.1)/100;
                        nPPH = 0.0;
                    }
                    else if(tax === "S"){
                        nPPN = (total*11)/100;
                        nPPH = 0.0;
                    }
                    else if(tax === "T"){
                        nPPN = 0.0;
                        nPPH = (total*2)/100;
                    }
                    else if(tax === "SE"){
                        nPPN = (total*11)/100;
                        nPPH = (total*10)/100;
                    }
                    else if(tax === "ST"){
                        nPPN = (total*11)/100;
                        nPPH = (total*2)/100;
                    }
                    else if(tax === "RT"){
                        nPPN = (total*1.1)/100;
                        nPPH = (total*2)/100;
                    }
                    else{
                        nPPN = 0.0;
                        nPPH = 0.0;
                    }
                    total = (total + nPPN) - nPPH;

                    pp2.push({
                        currency : mfil.currency,
                        no_po : mfil.no_po,
                        kode_item : mfil.kode_item,
                        tgl_psn : mfil.tgl_psn,
                        tgl_terima : mfil.tgl_terima,
                        eks_provider : mfil.eks_provider,
                        no_fina: mfil.no_fina,
                        deskripsi_item : mfil.deskripsi_item,
                        status_brng : statusx,
                        qty_psn :(parseFloat(mfil.qty_psn)).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                        hrga_sat : (parseFloat(mfil.hrga_sat)).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                        tax : mfil.tax,
                        disc : mfil.disc,
                        valas: (parseFloat(total)).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                        ongkir : mfil.ongkir,
                        tgl_datang : mfil.tgl_datang,
                        qty_trma : mfil.qty_trma,
                        ket_purch : mfil.ket_purch
                    })
                }
            }
            else{
                
            }

            const judul = `Terima barang dari tgl ${firstDate} ke ${lastDate}.xlsx`

            const worksheet = utils.json_to_sheet(pp1);
            const worksheet1 = utils.json_to_sheet(pp2);

            const workbook = utils.book_new();
            utils.book_append_sheet(workbook, worksheet, 'PPN');
            utils.book_append_sheet(workbook, worksheet1, 'Non PPN');
            
            utils.sheet_add_aoa(worksheet, [["CUR","NoPesanan","Kode Material","Tgl Pesan","Tgl Kirim","Nama Pemasok","NoItem","Deskripsi Item","Status","KtsDipesan",'Harga satuan','Tax','Disc (%)','Jumlah (Valas)','Ongkir','Tgl Terima','KtsDiterima','Keterangan']], { origin: 'A1' });
            utils.sheet_add_aoa(worksheet1, [["CUR","NoPesanan","Kode Material","Tgl Pesan","Tgl Kirim","Nama Pemasok","NoItem","Deskripsi Item","Status","KtsDipesan",'Harga satuan','Tax','Disc (%)','Jumlah (Valas)','Ongkir','Tgl Terima','KtsDiterima','Keterangan']], { origin: 'A1' });

            writeFileXLSX(workbook, judul, { compression: true });
            handleClose()
            setIsLoading(false)
        
        } catch (error) {
            Swal.fire('Oppss..','Data terima barang tidak dapat di tarik', 'warning')
            setIsLoading(false)
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
                    <Button variant="outline-success" onClick={handleSubmit} size="lg"><i class="bi bi-search"></i> Cari item</Button>
                    <Button 
                        variant="outline-primary"
                        onClick={handleShow}
                        size="lg"
                        style={{marginLeft: 10}}
                    >
                        <i className="bi-printer-fill" style={{marginRight: 8}}></i>Print
                    </Button>
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

            <Modal show={show} centered>
            <Modal.Body>
                <div style={{alignItems: 'center',justifyItems: 'center',textAlign: 'center'}}>
                <DateRange
                    editableDateInputs={true}
                    onChange={item => setState([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={state}
                />
                </div>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={()=>handleDates()}>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
            
            {isLoading ? <LoadingPage /> : ""}

        </>
    )
}


