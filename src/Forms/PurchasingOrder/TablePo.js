import React, { useEffect, useMemo, useState } from 'react';
import Swal from 'sweetalert2';
import { addDays } from 'date-fns';
import { AgGridReact } from 'ag-grid-react';
import { DateRange } from 'react-date-range';
import 'ag-grid-community/styles/ag-grid.css';
import { useNavigate } from 'react-router-dom';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Breadcrumb, Button, Card, Dropdown, Form, InputGroup, Modal, Stack } from 'react-bootstrap';
import { utils, writeFileXLSX } from 'xlsx';

import { LoadingPage } from '../../LoadingPage/LoadingPage';
import useAuthStore, { selectUser } from '../../store/DataUser';
import useDataPo, { selectDataPo, selectPoReady,selectFetchPo, selectFalsePo } from '../../store/DataPo';
import { API_AUTH } from '../../apis/apisData';

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
    const [uploadUn, setUploadUn] = useState(0);

    const [rowData, setRowData] = useState();

    const [bulan, setBulan] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


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

    /* const [state, setState] = useState({
        selection: {
          startDate: new Date(),
          endDate: null,
          key: 'selection'
        },
        compare: {
          startDate: new Date(),
          endDate: addDays(new Date(), 0),
          key: 'compare'
        }
      }); */

    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 0),
            key: 'selection'
        }
    ]);

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
        const data =dataPo.data;
        if(data === undefined){
            Swal.fire('','Harap refresh page apabila data tidak ditampilkan','info')
        }
        else{
            
            const pp = data.filter(x=> x.status === "Pengajuan");
            const pv = data.filter(x=> x.status === "Verifikasi");
            const ps = data.filter(x=> x.status === "Selesai");
            const pr = data.filter(x=> x.status === "Revisi");
            const upload = data.filter(x=> x.status === "Selesai" && x.statusfina === "");
             
            /* let array = data.slice().slice().sort(function(a, b) {
                const dateA = new Date(a.tgl_po);
                const dateB = new Date(b.tgl_po);
                return dateB - dateA;
            }); */
            setRowData(data);
            setTotalPo(data.length);
            setPengajuanPo(pp.length);
            setVerifikasiPo(pv.length);
            setSelesaiPo(ps.length);
            setRevisiPo(pr.length);
            setUploadUn(upload.length)

            try {
                await poFalse();
            } catch (error) {
                console.log('error')
            }
            setIsLoading(false);
        }
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
        const upload = data.filter(x=> x.status === "Selesai" && x.statusfina === "");
    
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
        else if(e === 'upload'){
            setRowData(upload)
        }
        else{
            setRowData(data)
        }
         
    }

    const refreshPage = () => {
        window.location.reload(false);
    }
    
    // const handleDate = () =>{
    //     const startDate = state[0].startDate;
    //     const endDate =  state[0].endDate
    //     const d = new Date(startDate);
    //     let yy = d.getFullYear();
    //     let bln = parseInt(d.getMonth()) + 1;
    //     let day = d.getDate();
    //     let bb = String(bln).padStart(2, '0');
    //     let dd = String(day).padStart(2, '0');

    //     const date = new Date(endDate);
    //     let year = date.getFullYear();
    //     let month = parseInt(date.getMonth()) + 1;
    //     let days = date.getDate();
    //     let bulan = String(month).padStart(2, '0');
    //     let hari = String(days).padStart(2, '0');

    //     const fileNew =dataPo.data;
    //     const data = fileNew.filter(e => e.status === "Verifikasi" || e.status === "Selesai")
    //     const firstDate = `${yy}-${bb}-${dd}`;
    //     const lastDate = `${year}-${bulan}-${hari}`;

    //     const result = data.filter(e => (new Date(e.tgl_po) >= new Date(firstDate) && new Date(e.tgl_po) <= new Date(lastDate)));

    //     let coba = [];
    //     for(let e = 0; e < result.length; e++){
    //         const po = result[e].dataPO;
    //         for(let x = 0; x < po.length; x++){
    //             let par = po[x].parsial;
    //             let hargaSatuan = parseFloat(po[x].hargasatuan).toFixed(2)
    //             let jmlhHarga = parseFloat(po[x].jmlhHarga).toFixed(2)
                
    //             for(let y = 0; y < par.length; y++){
    //                 coba.push({
    //                     cur : '',
    //                     noPesanan : result[e].id_po,
    //                     kodeMaterial : po[x].newMaterial,
    //                     tglPesan : result[e].tgl_po,
    //                     tglKirim :  par[y].tgl,
    //                     namaPemasok : result[e].expro,
    //                     noItem : po[x].itemNo,
    //                     deskripsiItem : po[x].material,
    //                     status : '',
    //                     ktsDipesan : par[y].qty,
    //                     hargaSatuan : hargaSatuan,
    //                     tax : po[x].pajak,
    //                     disc : po[x].diskon,
    //                     jumlahValas : jmlhHarga,
    //                     ongkir : result[e].bAntar,
    //                     tglTerima : '',
    //                     ktsDiterima : '',
    //                     keterangan : result[e].keterangan,
    //                 })
    //             }
    //         }
    //     }
            
    //     coba.sort(function(a, b) {
    //         const dateA = new Date(a.tglKirim);
    //         const dateB = new Date(b.tglKirim);
    //         return dateA - dateB;
    //     });

    //     const ndate = new Date();
    //     const nmonth = ndate.getMonth() + 1;
    //     const nyear = ndate.getFullYear();
    //     let nbb = String(nmonth).padStart(2, '0');
    //     const nday = ndate.getDate();
    //     let ndd = String(nday).padStart(2, '0');
    //     const judul = `Monitoring PO ${ndd}-${nbb}-${nyear}.xlsx`

    //     const worksheet = utils.json_to_sheet(coba);

    //     const workbook = utils.book_new();
    //     utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    //     /* fix headers */
    //     utils.sheet_add_aoa(worksheet, [['CUR','NoPesanan','Kode Material','Tgl Pesan','Tgl Kirim','Nama Pemasok','NoItem','Deskripsi Item','Status',
    //         'KtsDipesan','Harga satuan','Tax','Disc (%)','Jumlah (Valas)','Ongkir','Tgl Terima','KtsDiterima','Keterangan']], { origin: 'A1' });
    //     /* calculate column width */
    //     // const max_width = coba.reduce((w, r) => Math.max(w, r.No.length), 10);
    //     // worksheet['!cols'] = [{ wch: max_width }];
    //     writeFileXLSX(workbook, judul, { compression: true });
    //     handleClose()
    // }

    const handleDates =async () =>{
        console.log("next")
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
            const next = await API_AUTH.post(`/purchaseorderbet`, {
                dateAwal : `${yy}-${bb}`,
                dateAkhir: `${year}-${bulan}`,
                plan: userData.uplan,
            })
            console.log("next")
            console.log(next.data)

            const fileNew =next.data;
            const data = fileNew.filter(e => e.status === "Verifikasi" || e.status === "Selesai");
            const result = data.filter(e => (new Date(e.tgl_po) >= new Date(firstDate) && new Date(e.tgl_po) <= new Date(lastDate)));
            let coba = [];
            for(let e = 0; e < result.length; e++){
                const po = result[e].dataPO;
                for(let x = 0; x < po.length; x++){
                    let par = po[x].parsial;
                    let hargaSatuan = parseFloat(po[x].hargasatuan).toFixed(2)
                    let jmlhHarga = parseFloat(po[x].jmlhHarga).toFixed(2)
                    
                    for(let y = 0; y < par.length; y++){
                        coba.push({
                            cur : '',
                            noPesanan : result[e].id_po,
                            kodeMaterial : po[x].newMaterial,
                            tglPesan : result[e].tgl_po,
                            tglKirim :  par[y].tgl,
                            tglKirimPo : result[e].tgl_kirim,
                            namaPemasok : result[e].expro,
                            noItem : po[x].itemNo,
                            deskripsiItem : po[x].material,
                            status : '',
                            ktsDipesan : par[y].qty,
                            hargaSatuan : hargaSatuan,
                            tax : po[x].pajak,
                            disc : po[x].diskon,
                            jumlahValas : jmlhHarga,
                            ongkir : result[e].bAntar,
                            tglTerima : '',
                            ktsDiterima : '',
                            keterangan : result[e].keterangan,
                        })
                    }
                }
            }
                
            coba.sort(function(a, b) {
                const dateA = new Date(a.tglKirimPo);
                const dateB = new Date(b.tglKirimPo);
                return dateA - dateB;
            });
            if(coba.length === 0){
                Swal.fire('Oppss..', 'Data yang diminta tidak ditemukan / status po pengajuan', 'info')
            }
            else{
                const judul = `Monitoring PO dari tgl ${firstDate} ke ${lastDate}.xlsx`

                const worksheet = utils.json_to_sheet(coba);

                const workbook = utils.book_new();
                utils.book_append_sheet(workbook, worksheet, 'Sheet1');
                /* fix headers */
                utils.sheet_add_aoa(worksheet, [['CUR','NoPesanan','Kode Material','Tgl Pesan','Tgl Kirim','Tgl Kirim PO','Nama Pemasok','NoItem','Deskripsi Item','Status',
                    'KtsDipesan','Harga satuan','Tax','Disc (%)','Jumlah (Valas)','Ongkir','Tgl Terima','KtsDiterima','Keterangan']], { origin: 'A1' });
                /* calculate column width */
                // const max_width = coba.reduce((w, r) => Math.max(w, r.No.length), 10);
                // worksheet['!cols'] = [{ wch: max_width }];
                writeFileXLSX(workbook, judul, { compression: true });
                handleClose()
            }
            
            setIsLoading(false)
        } catch (error) {
            Swal.fire('Oppss..','Data Po tidak dapat di tarik', 'warning')
            setIsLoading(false)
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
                        <Dropdown.Item onClick={handleShow}><i class="bi bi-file-earmark-spreadsheet-fill"></i> Create Excel PO</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={refreshPage}><i className="bi bi-arrow-clockwise"></i> Refresh</Dropdown.Item>
                        
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
                <div className="col-md-2">
                    <Card className='mb-1'>
                        <div className="radius-10 border-start border-0 border-3 border-secondary">
                            <Card.Body style={{height: "50px", padding: '8px'}}>
                                <h6 onClick={(e)=> cekData('upload')} className="nmTeks">Unuploaded ({uploadUn} Item)</h6>
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

        <Modal show={show} centered>
            <Modal.Body>
                <div style={{alignItems: 'center',justifyItems: 'center',textAlign: 'center'}}>
                <DateRange
                    editableDateInputs={true}
                    onChange={item => setState([item.selection])}
                    moveRangeOnFirstSelection={false}
                    // minDate={addDays(new Date(), -31)}
                    // maxDate={addDays(new Date(), 1)}
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

        {isLoading ? <LoadingPage/> : ""}
        </>
    )
}
