import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './dokumenStyle.css';
import { format } from "date-fns";
import id from 'date-fns/locale/id';
import { Breadcrumb, Dropdown, Form, InputGroup, Modal, Stack } from 'react-bootstrap';
import '../PengadaanBarang/pengadaan.css';
import 'primeicons/primeicons.css';
import { utils, writeFileXLSX } from 'xlsx';

import { API_AUTH } from '../../apis/apisData';
import { FileDepoCabang } from '../../datafile/FileSelect';
import { LoadingPage } from '../../LoadingPage/LoadingPage';
import useAuthStore, { selectUser } from '../../store/DataUser';
import useDokumenStore, {selectDokumen, selectFetchDokumen, selectDokumenReady, selectFalseDokumen} from '../../store/DataDokumen'

import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { Tag } from 'primereact/tag';
import Swal from 'sweetalert2';
import { DokumenCreate } from './ModalDokumen/DokumenCreate';
import { UpdateDokumen } from './ModalDokumen/UpdateDokumen';
import { JasaDokumen } from './ModalDokumen/JasaDokumen';
import { VerifyDokumen } from './ModalDokumen/VerifyDokumen';
import { ViewDokumen } from './ModalDokumen/ViewDokumen';

export const TableDokumen = () => {
    let navigate = useNavigate();
    const userData = useAuthStore(selectUser);
    const newDokumen = useDokumenStore(selectDokumen);
    const fetchDokumen = useDokumenStore(selectFetchDokumen);
    const dokumenReady = useDokumenStore(selectDokumenReady);
    const dokumenFalse = useDokumenStore(selectFalseDokumen);

    const [bulan, setBulan] = useState('');
    const [depot, setDepot] = useState('');
    const [globalFilter, setGlobalFilter] = useState('');
    const [nodes, setNodes] = useState([]);
    const [dataSementara, setDataSementara] = useState([]);
    const [dataSender, setDataSender] = useState([]);
    const [dataUpdate, setDataUpdate] = useState([]);
    const [dataList, setDataList] = useState([]);
    const [dataverify, setDataverify] = useState([]);
    const [dataView, setDataView] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [showCreate, setShowCreate] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [showjasa, setShowjasa] = useState(false);
    const [showVerify, setShowVerify] = useState(false);
    const [showView, setShowView] = useState(false);

    const handleClose = () => {
        setDataSementara([])
        setShow(false)
    };

    /* const handleShow = () => {
        setShow(true)
    }; */

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
        setIsLoading(true);
        dokumenFalse();
        const date = new Date();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        let bb = String(month).padStart(2, '0');
        setBulan(`${year}-${bb}`);
        fetchDokumen(`${year}-${bb}`);
        // setIsLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!dokumenReady) return;
        onGridReady()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dokumenReady]);

    const onGridReady = () =>{
        setNodes([]);
        if(userData.udivisi === "Develop" || userData.udivisi === "BOD/BOC" || userData.uuid === "DEE-SSM02" ){
            if(newDokumen.length > 0){
                const setDoc = newDokumen.map((e,i)=>{
                    let nStatus = '';
                    let file = e.data;
                    let nFile = file.map((x,y)=>{
                        return({
                            key: `${i}-${y}`,
                            idDoc: e.idForm,
                            uuid : e.pengirim[0].id,
                            data: {
                                idForm: x.iddokumen,
                                pengirim: e.pengirim[0].pemohon,
                                cabang: '',
                                dokumen: x.namadokumen,
                                tgl_kirim: '',
                                tgl_terima: x.tglTerima,
                                tgl_ulang: x.tglUlang,
                                status: x.status,
                                keterangan : x.keterangan,
                                tujuan: x.tujuan,
                            }, 
                        })
                    })
                    let filPengajuan = file.filter(a => a.status === "Pengajuan");
                    let filVerifikasi = file.filter(a => a.status === "Verifikasi");
                    let filSelesai = file.filter(a => a.status === "Selesai");
                    let filHold = file.filter(a => a.status === "Hold");
                    if(filHold.length > 0){nStatus = "Hold"}
                    else{
                        if(filPengajuan.length === file.length){nStatus = "Pengajuan"}
                        else if(filVerifikasi.length === file.length){nStatus = "Verifikasi"}
                        else if(filSelesai.length === file.length){nStatus = "Selesai"}
                        else{nStatus = "Pengajuan"}
                    }
                    return(
                        {
                            key: i,
                            idDoc: e.idForm,
                            uuid : e.pengirim[0].id,
                            data: {
                                idForm: e.idForm,
                                pengirim: e.pengirim[0].pemohon,
                                cabang: e.cabang,
                                dokumen: '',
                                tgl_kirim: e.tglKirim,
                                tgl_terima: '',
                                tgl_ulang: '',
                                status: nStatus,
                                kiriman :`${e.kirim} ${e.nores}`,
                                jasa: e.jasa,
                                kirim: e.kirim,
                                nores: e.nores,
                            },
                            children: nFile,
                            jasa: e.jasa,
                            kirim: e.kirim,
                            nores: e.nores,
                        }
                    )
                })
                
                const mDoc = setDoc.sort(function (a, b) {
                    let dateA = new Date(a.data.tgl_kirim), dateB = new Date(b.data.tgl_kirim)
                    return dateB - dateA
                });
                setNodes(mDoc)
            }
            
        }
        else{
            if(newDokumen.length > 0){
                let fillData = newDokumen.filter(i=> {
                    return(
                        i.pengirim[0].id === userData.uuid
                    )
                })
                if(fillData.length > 0){
                    const setDoc = fillData.map((e,i)=>{
                        let nStatus = '';
                        let file = e.data;
                        let nFile = file.map((x,y)=>{
                            return({
                                key: `${i}-${y}`,
                                idDoc: e.idForm,
                                data: {
                                    idForm: x.iddokumen,
                                    pengirim: e.pengirim[0].pemohon,
                                    cabang: '',
                                    dokumen: x.namadokumen,
                                    tgl_kirim: '',
                                    tgl_terima: x.tglTerima,
                                    tgl_ulang: x.tglUlang,
                                    status: x.status,
                                    keterangan : x.keterangan,
                                    tujuan: x.tujuan,
                                }, 
                            })
                        })
                        let filPengajuan = file.filter(a => a.status === "Pengajuan");
                        let filVerifikasi = file.filter(a => a.status === "Verifikasi");
                        let filSelesai = file.filter(a => a.status === "Selesai");
                        let filHold = file.filter(a => a.status === "Hold");
                        if(filHold.length > 0){nStatus = "Hold"}
                        else{
                            if(filPengajuan.length === file.length){nStatus = "Pengajuan"}
                            else if(filVerifikasi.length === file.length){nStatus = "Verifikasi"}
                            else if(filSelesai.length === file.length){nStatus = "Selesai"}
                            else{nStatus = "Pengajuan"}
                        }
                        return(
                            {
                                key: i,
                                idDoc: e.idForm,
                                data: {
                                    idForm: e.idForm,
                                    pengirim: e.pengirim[0].pemohon,
                                    cabang: e.cabang,
                                    dokumen: '',
                                    tgl_kirim: e.tglKirim,
                                    tgl_terima: '',
                                    tgl_ulang: '',
                                    status: nStatus,
                                    kiriman :`${e.kirim} ${e.nores}`,
                                    jasa: e.jasa,
                                    kirim: e.kirim,
                                    nores: e.nores,
                                },
                                children: nFile,
                                jasa: e.jasa,
                                kirim: e.kirim,
                                nores: e.nores,
                            }
                        )
                    })
                    const mDoc = setDoc.sort(function (a, b) {
                        let dateA = new Date(a.data.tgl_kirim), dateB = new Date(b.data.tgl_kirim)
                        return dateB - dateA
                    });
                    setNodes(mDoc)
                }
            }
        }
        setIsLoading(false);
    }

    const onSetDate =async (event) => {
        setIsLoading(true)
        dokumenFalse();
        setBulan(event.target.value);
        await fetchDokumen(event.target.value);
    } 

    /* const createDokumen =async () =>{
        await dokumenFalse()
        navigate('/form/dokumen/create')
    } */

    const createDocForm = () =>{
        let data = []
        const date = new Date();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        let bb = String(month).padStart(2, '0');
        const day = date.getDate();
        let dd = String(day).padStart(2, '0');
        const judul = `Tarikan List Dokumen Tanggal ${dd}-${bb}-${year}.xlsx`
        for(let i = 0; i < newDokumen.length; i++){
            let mData = newDokumen[i].data
            data.push({
                nomer : newDokumen[i].idForm,
                namaPengirim : newDokumen[i].pengirim,
                namaDoc: "",
                tanggalKirim : newDokumen[i].tglKirim,
                TanggalTerima : "",
                StatusDoc : "",
                Keterangandoc : "",
            })
            for(let y = 0; y < mData.length; y++){
                data.push({
                    nomer : mData[y].iddokumen,
                    namaPengirim : "",
                    namaDoc: mData[y].namadokumen,
                    tanggalKirim : "",
                    TanggalTerima : mData[y].tglTerima,
                    StatusDoc : mData[y].status,
                    Keterangandoc : mData[y].keterangan,
                }) 
            }
        }
        const worksheet = utils.json_to_sheet(data,{
            headerStyle: {
              fill: {
                fgColor: { rgb: 'FF0000' } // Warna merah
              },
              font: {
                bold: true
              }
            }
          });
        for(let x =0; x < data.length; x++){
          let n = `F${x+2}`
          worksheet[n].z = '#,##0';
        }
        const workbook = utils.book_new();
        utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        /* fix headers */
        utils.sheet_add_aoa(worksheet, [['Nomer','Nama Pengirim','Nama doc','Tanggal Kirim','Tanggal Terima','Status Doc','Keterangan doc']], { origin: 'A1' });
        writeFileXLSX(workbook, judul, { compression: true });
    }
    
    const getHeader = () => {
        return (
            <div style={{display:'flex', flexDirection: 'row-reverse', padding: 0}}>
                <IconField iconPosition="left">
                    <InputIcon className="pi pi-search" />
                    <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Global Search" />
                </IconField>
            </div>
        );
    };

    let header = getHeader();

    const statusBodyTemplate = (product) => {
        let data = product.data.status
        return <div style={{textAlign:'center'}}><Tag value={data} severity={getSeverity(product)}></Tag></div>;
    };

    const getSeverity = (product) => {
        switch (product.data.status) {
            case 'Selesai':
                return 'success';
            case 'Verifikasi':
                return 'info';
            case 'Hold':
                return 'warning';
            case 'Pengajuan':
                return 'danger';
            case 'Reject':
                return 'primary';
            default:
                return null;
        }
    };

    const buttonTemplate = (data) => (
        <div className="flex flex-wrap gap-2">
            <Button
                type="button"
                icon="pi pi-pencil"
                severity="success"
                onClick={(e) => {
                    if(userData.ulevel === 0 || userData.uuid ===data.uuid){
                        let check = newDokumen.filter(i =>i.idForm === data.idDoc );
                        let dTetap = nodes.filter(i=> i.idDoc === data.idDoc);
                        const subVal = FileDepoCabang.filter(i=> i.value === dTetap[0].data.cabang); 
                        let file = check[0].data;
                        let filPengajuan = file.filter(a => a.status === "Pengajuan");
                        let filVerifikasi = file.filter(a => a.status === "Verifikasi");
                        let filSelesai = file.filter(a => a.status === "Selesai");
                        let filHold = file.filter(a => a.status === "Hold");
                        let nStatus = ''
                        if(filHold.length > 0){nStatus ="Hold"}
                        else{
                            if(filPengajuan.length === file.length){nStatus ="Pengajuan"}
                            else if(filVerifikasi.length === file.length){nStatus ="Verifikasi"}
                            else if(filSelesai.length === file.length){nStatus ="Selesai"}
                            else{nStatus ="Pengajuan"}
                        }
                        if(nStatus === "Verifikasi" || nStatus === "Selesai"){
                            setDataView(check)
                            setShowView(true)
                        }
                        else{
                            data.jasa = check[0].jasa;
                            data.kirim = check[0].kirim;
                            data.nores = check[0].nores;
                            // console.log(data)
                            Swal.fire({
                                title: "Pilih aksi selanjutnya?",
                                showDenyButton: true,
                                showCancelButton: true,
                                confirmButtonText: "Jasa Kirim",
                                denyButtonText: `Update Data`
                                }).then((result) => {
                                if (result.isConfirmed) {
                                    setDataList((check.length > 0) ? check[0].data : [])
                                    setDepot(subVal)
                                    setDataUpdate(data)
                                    setShowjasa(true)
                                } else if (result.isDenied) {
                                    setDataList((check.length > 0) ? check[0].data : [])
                                    setDepot(subVal)
                                    setDataUpdate(data)
                                    setShowUpdate(true)
                                }
                            });
                        }
                    }
                    else{
                        let check = newDokumen.filter(i =>i.idForm === data.idDoc );
                        setDataView(check)
                        // Swal.fire('Opss...', 'Anda tidak memiliki akses untuk edit data', 'warning')
                        setShowView(true)
                    }
                    
                }}
                className="buttonCancel"
                tooltip="Edit Doc"
                tooltipOptions={{ position: 'bottom' }}
                style={{width:'30px', height: '30px'}}
            >
            </Button>
            <Button 
                type="button"
                icon="pi pi-check"
                onClick={(e) => splitBtn(data, 'verify')}
                className="buttonSet"
                tooltip="Verifikasi Doc"
                tooltipOptions={{ position: 'bottom' }}
                style={{width:'30px', height: '30px'}}
            ></Button>
            <Button 
                type="button"
                icon="pi pi-print"
                onClick={(e) => splitBtn(data, 'print')}
                className="buttonRead"
                tooltip="Print Label Doc"
                tooltipOptions={{ position: 'bottom' }}
                style={{width:'30px', height: '30px'}}
            ></Button>
        </div>
    );

    const splitBtn = (d, text) => {
        let idDoc = d.idDoc;
        let dTetap = nodes.filter(i=> i.idDoc === idDoc);
        if(text === 'edit'){
            const subVal = FileDepoCabang.filter(i=> i.value === dTetap[0].data.cabang);
            let check = newDokumen.filter(i =>i.idForm === idDoc );
            // console.log(check)
            if(userData.ulevel === 0 || userData.uuid === d.uuid){
                // console.log(check)
                navigate(`/form/dokumen/update`,{state:{
                    data : dTetap[0],
                    depo : subVal,
                    inputList :(check.length > 0) ? check[0].data : []
                }});
            }
            else{
                setDataView(check)
                // Swal.fire('Opss...', 'Anda tidak memiliki akses untuk edit data', 'warning')
                setShowView(true)
            }
            
        }
        else if(text === 'verify'){
            let check = newDokumen.filter(i =>i.idForm === d.idDoc );
            if(userData.udivisi === "Develop" || userData.udivisi === "BOD/BOC" || userData.uuid === "DEE-SSM02" ){
                let mData = dTetap[0].children;
                let cekId = mData.filter(i=> i.data.idForm=== d.data.idForm);
                if(cekId.length > 0){
                    if(check[0].jasa !== "" && check[0].kirim !== "" && check[0].nores !== ""){
                        if(cekId[0].data.status !== "Selesai"){
                            // setDataSementara(cekId)
                            // handleShow() 
                            const fileKirim = [{
                                jasa : dTetap[0].jasa,
                                kirim : dTetap[0].kirim,
                                nores : dTetap[0].nores
                            }]
                            setDataSender(fileKirim)
                            setDataverify(cekId)
                            setShowVerify(true)
                        }
                    }
                    else{
                        Swal.fire("Opss...","Harap lengkapi data pengiriman barang", 'warning')
                    }
                }
                else{
                    Swal.fire('Oppss..', 'Data id dokumen tidak ditemukan','info')
                }
            }
            else{
                Swal.fire('Oppss..','Maaf tidak memiliki akses untuk verifikasi dokumen', 'info')
            }
        }
        else{
            let dData = [];
            for(let i = 0; i < dTetap.length; i++){
                let idDoc = dTetap[i].idDoc;
                let cCab =  dTetap[i].data.cabang;
                let pengirim = dTetap[i].data.pengirim;
                let tKirim = dTetap[i].data.tgl_kirim;
                let child = dTetap[i].children
                for(let y = 0; y < child.length; y++){
                    dData.push({
                        idDoc : idDoc,
                        idForm : child[y].data.idForm,
                        pengirim : pengirim,
                        cabang : cCab,
                        dokumen : child[y].data.dokumen,
                        tgl_kirim : tKirim,
                        tgl_terima : child[y].data.tgl_terima,
                        tgl_ulang : child[y].data.tgl_ulang,
                        status : child[y].data.status,
                        keterangan : child[y].data.keterangan,
                        tujuan : child[y].data.tujuan
                    })
                }
            }
            navigate(`/form/dokumen/view`,{state:{
                data : dData
            }});
            // console.log(dData)
        }
    };

    const handleSwap =async (e, i) =>{
        try {
            let bul = format(new Date(), "MM", { locale: id });
            let days = format(new Date(), "dd", { locale: id });
            let yea = format(new Date(), "yyyy", { locale: id });
            let tanggal = `${yea}-${bul}-${days}`
            await dokumenFalse()
            let mFile = {
                idDoc : e.idDoc,
                idForm : e.data.idForm,
                status : i,
                tanggal : tanggal
            }
            setNodes([])
            handleVerify(mFile)
            handleClose()
            
        } catch (error) {
           console.log(error) 
        }
    }

    const handleVerify = async (e) =>{
        try {
            setIsLoading(true)
            await dokumenFalse()
            let bln = format(new Date(), "MM", { locale: id });
            let tahu = format(new Date(), "yyyy", { locale: id });
        
            const next = await API_AUTH.put(`/dokumen/verify/${e.idDoc}`, {
                "idDoc": e.idDoc,
                "idForm": e.idForm,
                "status": e.status,
                "tanggal": e.tanggal
            });
            await fetchDokumen(`${tahu}-${bln}`);
            Swal.fire(`${next.data.success}`, navigate('/form/dokumen'), 'success');
            setIsLoading(false)
        } catch (error) {
            console.log(error.response.data.message);
            setIsLoading(false);
        }
    }

    const onAddGoalHandler =async (newGoal) =>{
        setIsLoading(true)
        dokumenFalse();
        setBulan(newGoal);
        await fetchDokumen(newGoal);
    }

    const closeUpdate = () =>{
        setDepot('');
        setDataList([]);
        setDataUpdate([]);
        setDataSender([]);
        setDataverify([]);
        setShowUpdate(false)
        setShowjasa(false)
    }

    return (
        <>
        <div className='setContain'>
            <Stack direction="horizontal" gap={3} style={{padding: "0px 10px 0px 10px"}}>
                <div className="bg-body">
                    <Breadcrumb className="bg-body m-2">
                    <Breadcrumb.Item onClick={() =>navigate('/form')}>Form</Breadcrumb.Item>
                    <Breadcrumb.Item active>Table Dokumen</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="ms-auto">
                    <div style={{marginRight: 10, display:'flex'}}>
                    <InputGroup variant="outline-primary">
                        <Form.Control
                        type="month"
                        value={bulan}
                        min="2025-01"
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
                        <Dropdown.Item onClick={()=> {
                                // createDokumen()
                                setShowCreate(true)
                            }}
                        >
                            <i class="bi bi-pencil"></i> Create Dokumen
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={createDocForm}>
                            <i class="bi bi-file-earmark-spreadsheet-fill"></i>
                            List Dokumen
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item><i className="bi bi-arrow-clockwise"></i> Refresh</Dropdown.Item>
                    </Dropdown.Menu>
                    </Dropdown>
                </div>
            </Stack>
            <div style={{height: screenHeight, width: screenWidth, padding: 10}}>
                <TreeTable 
                    value={nodes}
                    tableStyle={{fontSize: '1em', height: screenHeight }}
                    size="small"
                    width={`${screenWidth}px`}
                    scrollHeight={`${screenHeight}px`}
                    responsiveLayout="scroll"
                    header={header}
                    globalFilter={globalFilter}
                    frozenHeaderColumnGroup={true}
                    stripedRows
                    scrollable
                    showGridlines
                    removableSort
                >
                    <Column field="idForm" header="Id Form" expander sortable className="styleTable" style={{width: '200px'}}/>
                    <Column field="pengirim" header="Nama Pengirim" sortable className="styleTable" style={{width: '180px',textAlign: 'left'}}/>
                    <Column field="cabang" header="Depo/ Cabang" sortable className="styleTable" style={{width: '120px'}}/>
                    <Column field="dokumen" header="Nama Dokumen" sortable className="styleTable" style={{textAlign: 'left'}}/>
                    <Column field="tgl_kirim" header="Tgl Kirim" sortable className="styleTable" style={{width: '110px'}}/>
                    <Column field="kiriman" header="Jasa Kirim" className="styleTable" style={{textAlign: 'center'}}/>
                    <Column field="tgl_terima" header="Tgl terima" sortable className="styleTable" style={{width: '110px'}}/>
                    <Column field="tgl_ulang" header="Tgl Kirim Ulang" sortable className="styleTable" style={{width: '110px'}}/>
                    <Column field="tujuan" header="To" sortable className="styleTable" style={{width: '110px'}}/>
                    <Column field="status" header="Status" sortable body={statusBodyTemplate} className="styleTable" style={{width: '100px'}}/>
                    <Column field="Action" header="Action" body={buttonTemplate} className="styleTable" style={{width: '180px'}}/>
                </TreeTable>
            </div>
        </div>

        <Modal show={show} centered>
            <Modal.Header>
            <Modal.Title>Data Dokumen</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Nama Dokumen</Form.Label>
                    <Form.Control
                        type="text"
                        value={dataSementara[0]?.data.dokumen}
                        disabled
                    />
                </Form.Group>
                <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                >
                    <Form.Label>Keterangan</Form.Label>
                    <Form.Control 
                        as="textarea"
                        rows={2} 
                        value={dataSementara[0]?.data.keterangan}
                        disabled
                    />
                </Form.Group>
                <div className="row  g-2 ">
                    <div className='col-sm-6 col-md-6 col-lg-6 col-xl-6'>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Tanggal terima</Form.Label>
                            <Form.Control
                                type="text"
                                value={dataSementara[0]?.data.tgl_terima}
                                disabled
                            />
                        </Form.Group>
                    </div>
                    <div className='col-sm-6 col-md-6 col-lg-6 col-xl-6'>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Tanggal Kirim Ulang</Form.Label>
                            <Form.Control
                                type="text"
                                value={dataSementara[0]?.data.tgl_ulang}
                                disabled
                            />
                        </Form.Group>
                    </div>
                </div>
                <Form.Group className="mb-3" controlId="validationCustom01">
                    <Form.Label>Jasa Pengiriman</Form.Label>
                    <Form.Control
                        required
                        name="Jasa Pengiriman"
                        type="text"
                        // value={x.iddokumen}
                    />
                    <Form.Control.Feedback type="invalid">
                        Harap Masukan Pengirim / Jasa Pengiriman
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="validationCustom01">
                    <Form.Label>Nama Pengirim / Jasa Pengiriman</Form.Label>
                    <Form.Control
                        required
                        name="Nama Pengirim / Jasa Pengiriman"
                        type="text"
                        // value={x.namadokumen}
                        // onChange={(e) => handleInputChange(e, i)}
                    />
                    <Form.Control.Feedback type="invalid">
                        Harap Masukan Nama Pengirim / Jasa Pengiriman
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="validationCustom01">
                    <Form.Label>No kendaraan / No Resi</Form.Label>
                    <Form.Control
                        required
                        name="No kendaraan / No Resi"
                        type="text"
                        placeholder="No kendaraan / No Resi"
                        // value={x.namadokumen}
                        // onChange={(e) => handleInputChange(e, i)}
                    />
                    <Form.Control.Feedback type="invalid">
                        Harap Masukan No kendaraan / No Resi
                    </Form.Control.Feedback>
                </Form.Group>
            </Form>
            </Modal.Body>
            <Modal.Footer>
            {
                (dataSementara[0]?.data.status === "Pengajuan" || dataSementara[0]?.data.status === "Hold" || dataSementara[0]?.data.status === "Reject")
                ?
                <div>
                    <Button className="buttonReset" onClick={(e)=>{handleSwap(dataSementara[0], 'Hold')}}>
                        Hold
                    </Button>
                    <Button className="buttonRead" onClick={(e)=>{handleSwap(dataSementara[0], 'Reject')}}>
                        Reject
                    </Button>
                    <Button className="buttonSet" onClick={(e)=>{handleSwap(dataSementara[0], 'Verifikasi')}}>
                        Verify
                    </Button>
                    <Button className="buttonCancel" onClick={handleClose}>
                        Close
                    </Button>
                </div>
                :
                (dataSementara[0]?.data.status === "Verifikasi")
                ?
                <div>
                    <Button className="buttonSet" onClick={(e)=>{handleSwap(dataSementara[0], 'Selesai')}}>
                        Save Changes
                    </Button>
                    <Button className="buttonCancel" onClick={handleClose}>
                        Close
                    </Button>
                </div>
                :
                <Button className="buttonCancel" onClick={handleClose}>
                    Close
                </Button>
            
            }
            </Modal.Footer>
        </Modal>

        <DokumenCreate onShow={showCreate} onClose={()=> setShowCreate(false)} onAddGoal={onAddGoalHandler}/>
        <UpdateDokumen onShow={showUpdate} onClose={closeUpdate} onAddGoal={onAddGoalHandler} data={dataUpdate} inputList={dataList} depo={depot}/>
        <JasaDokumen onShow={showjasa} onClose={closeUpdate} onAddGoal={onAddGoalHandler} data={dataUpdate} inputList={dataList} depo={depot}/>
        <VerifyDokumen onShow={showVerify} onClose={closeUpdate} onAddGoal={onAddGoalHandler} data={dataverify} close={()=> setShowVerify(false)} sender={dataSender}/>
        <ViewDokumen onShow={showView} close={()=> setShowView(false)} data={dataView}/>
        {isLoading && <LoadingPage/>}
        </>
    )
}
