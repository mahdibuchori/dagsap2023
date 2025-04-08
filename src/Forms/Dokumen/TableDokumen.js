import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

export const TableDokumen = () => {
    let navigate = useNavigate();
    const userData = useAuthStore(selectUser);
    const newDokumen = useDokumenStore(selectDokumen);
    const fetchDokumen = useDokumenStore(selectFetchDokumen);
    const dokumenReady = useDokumenStore(selectDokumenReady);
    const dokumenFalse = useDokumenStore(selectFalseDokumen);

    const [bulan, setBulan] = useState('');
    const [globalFilter, setGlobalFilter] = useState('');
    const [nodes, setNodes] = useState([]);
    const [dataSementara, setDataSementara] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setDataSementara([])
        setShow(false)
    };
    const handleShow = () => {
        setShow(true)
    };

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
        const date = new Date();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        let bb = String(month).padStart(2, '0');
        setBulan(`${year}-${bb}`);
        fetchDokumen(`${year}-${bb}`);
        console.log(`${year}-${bb}`)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        // setIsLoading(true);
        console.log(dokumenReady)
        if (!dokumenReady) return;
        onGridReady()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dokumenReady]);

    const onGridReady = () =>{
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
                                keterangan : x.keterangan
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
                            },
                            children: nFile
                        }
                    )
                })
                
                const mDoc = setDoc.sort(function (a, b) {
                    let dateA = new Date(a.data.tgl_kirim), dateB = new Date(b.data.tgl_kirim)
                    return dateB - dateA
                });
                setNodes(mDoc)
                console.log(mDoc)
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
                                    keterangan : x.keterangan
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
                                },
                                children: nFile
                            }
                        )
                    })
                    const mDoc = setDoc.sort(function (a, b) {
                        let dateA = new Date(a.data.tgl_kirim), dateB = new Date(b.data.tgl_kirim)
                        return dateB - dateA
                    });
                    setNodes(mDoc)
                    console.log(mDoc)
                }
            }
        }
        setIsLoading(false);
    }

    const onSetDate =async (event) => {
        try {
            console.log(event.target.value)
            setIsLoading(true)
            await dokumenFalse()
            setBulan(`${event.target.value}`);
            await fetchDokumen(`${event.target.value}`);
            // onGridReady()
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    }

    const createDokumen =async () =>{
        await dokumenFalse()
        navigate('/form/dokumen/create')
    }

    const createDocForm = () =>{
        let data = []
        console.log(newDokumen)
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

        console.log(data)
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
                        <Dropdown.Item onClick={createDokumen}>
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
        </div>
        {isLoading && <LoadingPage/>}
        </>
    )
}
