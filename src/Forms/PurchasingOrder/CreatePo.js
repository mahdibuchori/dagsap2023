import React, { useEffect, useMemo, useRef, useState } from 'react'
import Swal from "sweetalert2";
import Select from 'react-select';
import { format } from "date-fns";
import id from 'date-fns/locale/id';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import { NumericFormat } from 'react-number-format';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { Accordion, Breadcrumb, Button, Card, Col, Container, Form, Modal, Stack } from 'react-bootstrap';

import { COLUMNS_DATAPO } from '../../datafile/columns';
import { FileBarang } from '../../datafile/FileSelect';
import { LoadingPage } from '../../LoadingPage/LoadingPage';
import useAuthStore, { selectUser } from '../../store/DataUser';
import useDataProvider, { selectProvider, selectFetchProvider,selectProviderReady } from '../../store/DataProvider';
import useDataDepartemen, { selectDepartemen, selectFetchDepartemen, selectDepartemenReady } from '../../store/DataDepartemen';
import useDataPo, { selectFetchNoPo, selectFalseNoPo, selectNoPo, selectNopoReady } from '../../store/DataPo';
import { API_AUTH } from '../../apis/apisData';

export const CreatePo = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const gridRef = useRef();
    
    const userData = useAuthStore(selectUser);
    const provider = useDataProvider(selectProvider);
    const onProvider = useDataProvider(selectFetchProvider);
    const providerReady = useDataProvider(selectProviderReady);
    const departemen = useDataDepartemen(selectDepartemen);
    const onDepartemen = useDataDepartemen(selectFetchDepartemen);
    const depaertemenReady = useDataDepartemen(selectDepartemenReady);

    
    const fetchNopo = useDataPo(selectFetchNoPo);
    const falseNopo = useDataPo(selectFalseNoPo);
    const numbPo = useDataPo(selectNoPo);
    const nopoReady = useDataPo(selectNopoReady);


    const [kode, setKode] = useState('');
    const [nopo, setNopo] = useState('');
    const [tgl, setTgl] = useState('');
    const [tglKrm, setTglKrm] = useState('');
    const [currencyName, setCurrencyName] = useState('');
    const [termName, setTermName] = useState('');
    const [spesifikasi, setSpesifikasi] = useState('');

    const [dataPo, setDataPo] = useState([]);
    const [inputList, setInputList] = useState([]);
    const [dataSementara, setDataSementara] = useState([]);
    const [fileNab, setFileNab] = useState(FileBarang);
    const [fileDep, setFileDep] = useState(FileBarang);
    const [tax1name, setTax1name] = useState('');
    const [tax2name, setTax2name] = useState('');
    const [tax1id, setTax1id] = useState('');
    const [tax2id, setTax2id] = useState('');
    const [expro, setExpro] = useState();
    const [totalSub, setTotalSub] = useState(0);
    const [diskon, setDiskon] = useState(0);
    const [ppn, setPpn] = useState(0);
    const [pph, setPph] = useState(0);
    const [bantar, setBantar] = useState(0);
    const [total, setTotal] = useState(0);
    
    const [isLoading, setIsLoading] = useState(false);
    const [dataReady, setDataReady] = useState(false);
    const [isReady, setisReady] = useState(false);
    const [show, setShow] = useState(true);
    const handleClose = () => {
        navigate(`/form/Pengadaan`)
        setShow(false)
    };

    const tHeigt = parseInt(window.innerHeight) - 500;
    let tWidth = 0;
    if(parseInt(window.innerWidth) >= 1700){
        tWidth = parseInt(window.innerWidth) - 580;
    }
    else if(parseInt(window.innerWidth) >= 1500){
        tWidth = parseInt(window.innerWidth) - 550;
    }
    else if(parseInt(window.innerWidth) >= 1300){
    tWidth = parseInt(window.innerWidth) - 500;
    }
    else if(parseInt(window.innerWidth) >= 1200){
    tWidth = parseInt(window.innerWidth) - 480;
    }
    else if(parseInt(window.innerWidth) >= 1020){
    tWidth = parseInt(window.innerWidth) - 450;
    }
    else if(parseInt(window.innerWidth) >= 992){
    tWidth = parseInt(window.innerWidth) - 350;
    }
    else if(parseInt(window.innerWidth) >= 882){
    tWidth = parseInt(window.innerWidth) - 350;
    }
    else if(parseInt(window.innerWidth) >= 768){
    tWidth = parseInt(window.innerWidth) - 300;
    }
    else if(parseInt(window.innerWidth) >= 676){
    tWidth = parseInt(window.innerWidth) - 280;
    }
    else if(parseInt(window.innerWidth) >= 600){
    tWidth = parseInt(window.innerWidth) - 260;
    }
    else if(parseInt(window.innerWidth) >= 576){
    tWidth = parseInt(window.innerWidth) - 240;
    }
    else{
    tWidth = parseInt(window.innerWidth) - 50
    }

    const [screenWidth, setScreenWidth] = useState(tWidth);
    const [screenHeight, setScreenHeight] = useState(tHeigt);

    const columns = useMemo(() => COLUMNS_DATAPO, []);
    const [rowData, setRowData] = useState();

    useEffect(() => {
        const handleResize = () => {
          let total = 0;
          let tinggi = parseInt(window.innerHeight) - 500
          if(parseInt(window.innerWidth) >= 1700){
            total = parseInt(window.innerWidth) - 580;
          }
          else if(parseInt(window.innerWidth) >= 1500){
            total = parseInt(window.innerWidth) - 550;
          }
          else if(parseInt(window.innerWidth) >= 1300){
            total = parseInt(window.innerWidth) - 500;
          }
          else if(parseInt(window.innerWidth) >= 1200){
            total = parseInt(window.innerWidth) - 480;
          }
          else if(parseInt(window.innerWidth) >= 1020){
            total = parseInt(window.innerWidth) - 450;
          }
          else if(parseInt(window.innerWidth) >= 992){
            total = parseInt(window.innerWidth) - 350;
          }
          else if(parseInt(window.innerWidth) >= 882){
            total = parseInt(window.innerWidth) - 350;
          }
          else if(parseInt(window.innerWidth) >= 768){
            total = parseInt(window.innerWidth) - 300;
          }
          else if(parseInt(window.innerWidth) >= 676){
            total = parseInt(window.innerWidth) - 280;
          }
          else if(parseInt(window.innerWidth) >= 600){
            total = parseInt(window.innerWidth) - 260;
          }
          else if(parseInt(window.innerWidth) >= 576){
            total = parseInt(window.innerWidth) - 240;
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

    useEffect(() => {
        setIsLoading(true);
        let data = location.state.data
        if(location.state === null || data.length === 0) {
            navigate(`/form/pengadaan`);
            Swal.fire('Info','Harap lengkapi data permintaan barang', 'info')
            
            setIsLoading(false);
        }
        else{
            // console.log(data)
            const next = data.filter((e)=> e.status === "Pengajuan")
            console.log(next.length)
            setInputList(location.state.data);
            
            setIsLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const createUniq = () => {
            let bln = format(new Date(), "MM", { locale: id });
            let tahun = format(new Date(), "yyyy", { locale: id });
            let day = format(new Date(), "dd", { locale: id });
            
            setTgl(`${tahun}-${bln}-${day}`);
        }
        createUniq()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => { 
        // setIsLoading(true);
        onProvider()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => { 
        // setIsLoading(true);
        onDepartemen()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => { 
        setIsLoading(true);
        let bln = format(new Date(), "MM", { locale: id });
        let tahun = format(new Date(), "yyyy", { locale: id });
        const filter = (`${tahun}-${bln}`)
        fetchNopo(filter, userData.uplan)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!providerReady) return;
        cekProvider()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [providerReady]);

    useEffect(() => {
        if (!depaertemenReady) return;
        cekDepartemen()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [depaertemenReady]);

    useEffect(() => {
        if (!nopoReady) return;
        noPoRead()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nopoReady]);

    useEffect (() => {
        if(!dataReady) return;
        const gntiDta = async () =>{
            try {
                setIsLoading(true);
                let data1 = {
                    material : dataSementara.material,
                    qty : dataSementara.qty,
                    satuan : dataSementara.satuan,
                    hargasatuan : "",
                    diskon : "",
                    jmlhHarga : "",
                    departement : "",
                    itemNo : dataSementara.itemNo,
                    pajak : "",
                    divisi : dataSementara.spesifikasi,
                    terima  : "",
                    tutup : "",
                    id_Pengadaan : dataSementara.id_Pengadaan,
                    tipe : dataSementara.tipe,
                    tgl_datang : dataSementara.tgl_datang,
                    po : dataSementara.po,
                    parsial: {
                        tgl: dataSementara.tgl_datang,
                        qty :dataSementara.qty
                    }
                                                            
                }
                if(dataPo.length < 1){
                    if(dataSementara.boll){ setDataPo(prev => [...prev, data1])}
                }
                else{
                    if(dataSementara.boll){
                        const cek = dataPo.filter(obj => obj.id_Pengadaan === dataSementara.id_Pengadaan && obj.tgl_datang
                            === dataSementara.tgl_datang
                        );
                        // console.log(cek)
                        if(cek.length === 0){
                            setDataPo(prev => [...prev, data1])
                        }
                        else{}
                    }
                    else{
                        const layer = []
                        for(let x = 0; x < dataPo.length;x++){
                            if(dataPo[x].id_Pengadaan === dataSementara.id_Pengadaan && dataPo[x].tgl_datang === dataSementara.tgl_datang ){
                                console.log(x)
                            }
                            else{
                                layer.push(dataPo[x])
                            }
                        }

                        setDataPo(layer)
                    }
                }
                setIsLoading(false);
                
                setDataSementara([])
                setDataReady(false);
            } catch (error) {
                setIsLoading(false);
                Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Pengambilan Data Pengadaan Gagal!',
                footer: error
                })
                
                setDataSementara([])
                setDataReady(false);
            }
        } 
    
        gntiDta();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[dataReady]);

    useEffect (() => {
        if(!isReady) return;
        const gntiDta = async () =>{
          try {
            setIsLoading(true);
            handleTotal()
            setisReady(false)
            setIsLoading(false);
          } catch (error) {
              setIsLoading(false);
              Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Pengambilan Data Pengadaan Gagal!',
              footer: error
            })
            setisReady(false);
          }
        } 
    
        gntiDta();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isReady]);

    const cekProvider =()=>{
        const data = provider.provider
        // console.log(data)
        let result = data?.map(function(e){
            let pajak = "";
            if(e.tax2code === ""){
                pajak = e.tax1code
            }
            else{
                pajak = e.tax1code+e.tax2code
            }
            let alamat = "";
            if(e.addressline2 === ""){alamat = e.addressline1} else{alamat = `${e.addressline1}, ${e.addressline2}`}
            let alamat1 = "";
            if(e.city === ""){alamat1 = alamat}else{alamat1 = `${alamat}, ${e.city}`}
            let alamat2 = "";
            if(e.stateprov === ""){alamat2 = alamat1}else{alamat2 = `${alamat1}, ${e.stateprov}`}
            let alamat3 = "";
            if(e.zipcode === ""){alamat3 = alamat2}else{alamat3 = `${alamat2}, ${e.zipcode}`}
            let alamat4 = "";
            if(e.country === ""){alamat4 = alamat3}else{alamat4 = `${alamat3}, ${e.country}`}
            return { 
                value: e.name,
                label: e.name,
                id: e.id,
                personno: e.personno,
                address: alamat4,
                currencyname: e.currencyname ,
                tax1code: e.tax1code,
                tax1id: e.tax1id,
                tax1name: e.tax1name,
                tax1rate: e.tax1rate,
                tax2code: e.tax2code,
                tax2id: e.tax2id,
                tax2name: e.tax2name,
                tax2rate: e.tax2rate,
                termid: e.termid,
                termname: e.termname,
                pajak: pajak
            }
        });
        setFileNab(result);
    }

    const cekDepartemen = () =>{
        const data = departemen.departemen;
        let result = data?.map(function(e){
            return { 
                value: e.deptNo,
                label: e.deptNo,
            }
        });
        setFileDep(result);
    }

    const noPoRead =async () =>{
        try {
            let bln = format(new Date(), "MM", { locale: id });
            let tahu = format(new Date(), "yy", { locale: id });
            if(userData.uplan === "Sentul"){
                setKode(`PO${tahu}${bln}`);
            }
            else if(userData.uplan === "Bantul"){
                setKode(`YPO${tahu}${bln}`);
            }
            else{
                setKode(`UDF${tahu}${bln}`);
            }
            await falseNopo();
            setIsLoading(false);
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    }

    const handlecheckbox = (e, i,val) =>{
        let data1 = {
            id_Pengadaan : e.id_Pengadaan,
            itemNo : e.material[0].itemNo,
            material : e.material[0].material,
            tipe : e.material[0].tipe,
            tgl_datang : i.tglDatang,
            po : i.po,
            qty : i.qty,
            satuan : e.qty_pengadaan[0].satuan,
            spesifikasi : e.spesifikasi,
            boll : val
        }
        setDataSementara(data1)
        setDataReady(true)
    }

    const handleCekData = () =>{
        setRowData([])
        if(dataPo.length === 0){
            Swal.fire('Info','Harap pilih tanggal kedatangan item','info');
        }
        else{
            // console.log(dataPo)
            let plan = String(userData.uplan).toUpperCase();
            let data = [];
            for(let x = 0; x< dataPo.length; x++){
                // console.log(dataPo[x])
                let file = {
                    material : dataPo[x].material,
                    qty : parseFloat(dataPo[x].qty).toFixed(2),
                    satuan : dataPo[x].satuan,
                    hargasatuan : "",
                    diskon : "",
                    jmlhHarga : "",
                    departement : `PABRIK ${plan}`,
                    itemNo : dataPo[x].itemNo,
                    pajak : "",
                    divisi : dataPo[x].divisi,
                    terima  : "",
                    tutup : "",
                    id_Pengadaan : dataPo[x].id_Pengadaan,
                    tipe : dataPo[x].tipe,
                    parsial: [dataPo[x].parsial],
                    po : dataPo[x].po,                                      
                }
                if(data.length === 0){
                    data.push(file)
                }
                else{
                    let foundIndex = data.findIndex(i => i.id_Pengadaan === dataPo[x].id_Pengadaan);
                    if(foundIndex >= 0){
                        data[foundIndex].qty = (parseFloat(data[foundIndex].qty) + parseFloat(dataPo[x].qty)).toFixed(2);
                        let parsil = data[foundIndex].parsial;
                        parsil.push(dataPo[x].parsial)
                        data[foundIndex].parsial = parsil;
                    }
                    else{
                        data.push(file)
                    }
                    
                }
            }
            setRowData(data)
            setShow(false)
        }
    }

    const defaultColDef = useMemo(() => {
        return {
          editable: true,
          cellDataType: false,
          resizable: true,
        };
    }, []);
    

    const handleSubmit = (e) =>{
        e.preventDefault();
        try {
            if(diskon === ""){
                Swal.fire('Oppsss','Harap isi nilai diskon','info');
            }
            else if(bantar === ""){
                Swal.fire('Oppsss','Harap isi nilai biaya antar','info');
            }
            else if(totalSub === "" || totalSub === 0 || totalSub === "0.00"){
                Swal.fire('Oppsss','Harap nilai total sub','info');
            }
            else if(total === "" || total === 0 || total === "0.00"){
                Swal.fire('Oppsss','Harap nilai total','info');
            }
            else {
                savePengadaan()
            }
        } catch (error) {
            console.log(error)
        }
    };

    const savePengadaan = async () =>{
        try {
            let bln = format(new Date(), "MM", { locale: id });
            let tahu = format(new Date(), "yyyy", { locale: id });
            setIsLoading(true)
            const next = await API_AUTH.post(`/createpo`, {
                id_po : nopo,
                po_no: '',
                tgl_po: tgl,
                tgl_kirim : tglKrm,
                filter_bulan: `${tahu}-${bln}`,
                pembayaran: termName,
                tukar : currencyName,
                idexpro	: expro?.id,
                expro : expro?.value,
                status : 'Pengajuan',
                statusfina : '',
                dataPO : rowData,
                keterangan : spesifikasi,
                totalSub : totalSub,
                diskon : parseFloat(diskon).toFixed(2),
                ppn : ppn,
                pph : pph,
                bAntar : parseFloat(bantar).toFixed(2),
                total : total,
                tgl_verify : '',
                tgl_approve : '',
                plan : userData.uplan
            });
            Swal.fire(`${next.data.success}`, backhome(`/form/Pengadaan`), 'success');
            setIsLoading(false);
        } catch (error) {
            console.log(error)
            Swal.fire('Info', `${error.response.data.message}`, 'warning');
            setIsLoading(false);
        }
    }

    const handleEprov = (value) =>{
        setTax1name(value.tax1name);
        setTax2name(value.tax2name);
        setTax1id(value.tax1code);
        setTax2id(value.tax2code);
        setExpro(value)
        let modifiedArr = rowData.map((e)=>{
            let pjk = "";
            if(value?.pajak === "DD" || value?.pajak ==="D"){pjk = ""}else{pjk = value?.pajak}
            return {
                material : e.material,
                qty : parseFloat(e.qty).toFixed(2),
                satuan : e.satuan,
                hargasatuan : e.hargasatuan,
                diskon : e.diskon,
                jmlhHarga : e.jmlhHarga,
                departement : e.departement,
                itemNo : e.itemNo,
                pajak : pjk,
                divisi : e.divisi,
                terima  : e.terima,
                tutup : e.tutup,
                id_Pengadaan : e.id_Pengadaan,
                tipe : e.tipe,
                parsial: e.parsial,
                po : e.po,                                      
            }
        })
        const pjk = modifiedArr[0]?.pajak;
        let dataPo = numbPo.data;
        if(dataPo.length === 0){
            if(pjk === ""){
                const numb = ("00" + 1).slice(-2);
                setNopo(`${kode}5${numb}`);
            }
            else{
                const numb = ("00" + 1).slice(-3);
                setNopo(`${kode}${numb}`);
            }
        }
        else{
            let dtPpn = [];
            let dtPph = []
            
            dataPo.map((e)=>{
                if(e.dataPO[0].pajak === ""){
                    return dtPph.push(1)
                }
                else{
                    return dtPpn.push(1)
                }
            })

            if(pjk === ""){
                const numb = ("00" + (dtPph.length + 1)).slice(-2);
                setNopo(`${kode}5${numb}`);
            }
            else{
                const numb = ("00" + (dtPpn.length + 1)).slice(-3);
                setNopo(`${kode}${numb}`);
            }
        }
        setRowData(modifiedArr)
        setisReady(true)
    }

    const hanldeDept = (value) =>{
        let modifiedArr = rowData.map((e)=>{
            return {
                material : e.material,
                qty : parseFloat(e.qty).toFixed(2),
                satuan : e.satuan,
                hargasatuan : e.hargasatuan,
                diskon : e.diskon,
                jmlhHarga : e.jmlhHarga,
                departement : value?.value,
                itemNo : e.itemNo,
                pajak : e.pajak,
                divisi : e.divisi,
                terima  : e.terima,
                tutup : e.tutup,
                id_Pengadaan : e.id_Pengadaan,
                tipe : e.tipe,
                parsial: e.parsial,
                po : e.po,                                      
            }
        })
        setRowData(modifiedArr)
        setisReady(true)
    }

    const onCellClicked = (e) => {
        onCellValueChanged(e)
    }

    const onCellValueChanged = (e) => {
        const data = rowData[e.rowIndex];
        let jmlh = 0;
        let hSatuan = 0;
        let diskon = 0;
        if(data.qty === undefined || data.qty === ""){jmlh = 0}
        else{jmlh = parseFloat(data.qty)}
        if(data.hargasatuan === undefined || data.hargasatuan === ""){hSatuan = 0}
        else{hSatuan = parseFloat(data.hargasatuan)}
        if(data.diskon === undefined || data.diskon === ""){diskon = 0}
        else{diskon = String(data.diskon).split("+")}
        let total = jmlh * hSatuan;

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
        rowData[e.rowIndex].jmlhHarga = parseFloat(total);
        handleTotal()
    }

    const handleTotal =() =>{
        let ntotalSub = 0;
        let nppn = 0;
        let npph = 0;
        let ntotal = 0;
        let nDiskon = 0;
        let nBantar = 0;

        if(diskon === ""){nDiskon = 0} else{nDiskon = diskon}
        if(bantar === ""){nBantar = 0} else{nBantar = bantar}
        rowData.map((e)=>{
            if(e.jmlhHarga === "" || e.jmlhHarga === 0 ){ntotalSub += 0}
            else{ntotalSub += parseFloat(e.jmlhHarga)}
            return(
                setTotalSub(ntotalSub.toFixed(2))
            )
        })

        if(tax1id === "A"){
            nppn += 0;
            npph += ((ntotalSub - nDiskon) * 2.5) / 100;
        }
        else if(tax1id === "B"){
            nppn += 0;
            npph += ((ntotalSub - nDiskon) * 3) / 100;
        }
        else if(tax1id === "E"){
            nppn += 0;
            npph += ((ntotalSub - nDiskon) * 10) / 100;
        }
        else if(tax1id === "G"){
            nppn += 0;
            npph += ((ntotalSub - nDiskon) * 0.5) / 100;
        }
        else if(tax1id === "R"){
            nppn += ((ntotalSub - nDiskon) * 1.1) / 100;
            npph += 0;
        }
        else if(tax1id === "S"){
            nppn += ((ntotalSub - nDiskon) * 11) / 100;
            npph += 0;
        }
        else if(tax1id === "T"){
            nppn += 0;
            npph += ((ntotalSub - nDiskon) * 2) / 100;
        }
        else{
            nppn += 0;
            npph += 0;
        }

        if(tax2id === "A"){
            nppn += 0;
            npph += ((ntotalSub - nDiskon) * 2.5) / 100;
        }
        else if(tax2id === "B"){
            nppn += 0;
            npph += ((ntotalSub - nDiskon) * 3) / 100;
        }
        else if(tax2id === "E"){
            nppn += 0;
            npph += ((ntotalSub - nDiskon) * 10) / 100;
        }
        else if(tax2id === "G"){
            nppn += 0;
            npph += ((ntotalSub - nDiskon) * 0.5) / 100;
        }
        else if(tax2id === "R"){
            nppn += ((ntotalSub - nDiskon) * 1.1) / 100;
            npph += 0;
        }
        else if(tax2id === "S"){
            nppn += ((ntotalSub - nDiskon) * 11) / 100;
            npph += 0;
        }
        else if(tax2id === "T"){
            nppn += 0;
            npph += ((ntotalSub - nDiskon) * 2) / 100;
        }
        else{
            nppn += 0;
            npph += 0;
        }

        setPpn(nppn.toFixed(2));
        setPph(npph.toFixed(2));
        ntotal = ntotalSub  - parseFloat(nDiskon) + nppn - npph + parseFloat(nBantar)
        setTotal(parseFloat(ntotal).toFixed(2))
        setisReady(false)
    }

    const backhome = (e) =>{
        navigate(e)
    }

    return (
    <>
    <div className='setContain'>
        <Stack direction="horizontal" gap={3} style={{padding: "0px 10px 0px 10px"}}>
          <div className="bg-body">
            <Breadcrumb className='bg-body'>
                <Breadcrumb.Item onClick={() =>navigate(`/form`)}>Form</Breadcrumb.Item>
                <Breadcrumb.Item onClick={() => navigate(`/form/Pengadaan`)}>Pengadaan</Breadcrumb.Item>
                <Breadcrumb.Item active>Create Purchase Order</Breadcrumb.Item>
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
            <Form onSubmit={handleSubmit}>
                <div className='row g-2 mb-1 mt-1'>
                    <div className='col-sm-6 col-md-6 col-lg-6 col-xl-6 mb-1'>
                        
                    </div>
                    <div className='col-sm-6 col-md-6 col-lg-6 col-xl-6 mb-1'>
                        <div className='row g-2 mb-1'>
                            <div className='col-sm-4 col-md-4 col-lg-4 col-xl-4'>
                            <h6>No. PO</h6>
                            <Form.Control
                                required
                                type="text"
                                placeholder="No PO"
                                value={nopo}
                                disabled = {true}
                            />
                            </div>
                            <div className='col-sm-4 col-md-4 col-lg-4 col-xl-4'>
                            <h6>Tgl PO</h6>
                            <Form.Control
                                required
                                type="date"
                                value={tgl}
                                disabled = {true}
                            />
                            </div>
                            <div className='col-sm-4 col-md-4 col-lg-4 col-xl-4'>
                            <h6>Tgl Kirim</h6>
                            <Form.Control
                                required
                                type="date"
                                onChange={(e)=>{
                                    setTglKrm(e.target.value)
                                }}
                                disabled = {false}
                            />
                            </div>
                            
                        </div>
                    </div>
                </div>

                <div className='row g-2 mb-1 mt-1'>
                    <div className='col-sm-4 col-md-4 col-lg-2 col-xl-2 mb-1'>
                    <Card>
                        <Card.Body>
                        <Form.Group as={Col} controlId="validationCustom01">
                            <Form.Label>Eksternal Provider</Form.Label>
                            <Select 
                                required
                                options = {fileNab}
                                onChange={(value) => {
                                    handleEprov(value)
                                    setTermName(value.termname)
                                    setCurrencyName(value.currencyname)
                                }}
                                isSearchable = {true}
                            />
                        </Form.Group>
    
                        <Form.Group as={Col} controlId="validationCustom01">
                            <Form.Label>Syrt Pembayaran</Form.Label>
                            <Form.Control
                            required
                            type="text"
                            value={termName}
                            disabled
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="validationCustom01">
                            <Form.Label>Nilai Tukar</Form.Label>
                            <Form.Control
                            required
                            type="text"
                            value={currencyName}
                            disabled
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="validationCustom01">
                            <Form.Label>Departemen</Form.Label>
                            <Select 
                                required
                                options = {fileDep}
                                onChange={(value) => {
                                    hanldeDept(value)
                                }}
                                isSearchable = {true}
                            />
                        </Form.Group>
                        </Card.Body>
                    </Card>
                    </div>
                    <div className='col-sm-8 col-md-8 col-lg-8 col-xl-8 mb-1'>
                        <div style={{height: screenHeight, width: screenWidth, padding: 10}} className="ag-theme-alpine">
                            <AgGridReact
                                ref={gridRef}
                                rowData={rowData}
                                columnDefs={columns}
                                defaultColDef={defaultColDef}
                                singleClickEdit={true}
                                onCellClicked={onCellClicked}
                                onCellValueChanged={onCellValueChanged}
                      
                            />
                        </div>
                        <div className='row g-2 mb-1'>
                            <div className='col-sm-8 col-md-8 col-lg-8 col-xl-8 mb-1'>
                                <Form.Group as={Col} controlId="formGridArea">
                                    <Form.Label>Keterangan</Form.Label>
                                    <Form.Control 
                                        as="textarea" 
                                        aria-label="With textarea" 
                                        value={spesifikasi}
                                        onChange={(e) => {
                                            setSpesifikasi(e.target.value)
                                        }}
                                        
                                    />
                                </Form.Group>
                            </div>
                            <div className='col-sm-4 col-md-4 col-lg-4 col-xl-4 mb-1'>
                                <div className='row g-2 mb-1'>
                                    <div className='col-sm-6 col-md-6 col-lg-6 col-xl-6'>
                                        <h6 style={{justifyContent: "center", alignItems: 'center'}}>Total Sub</h6>
                                    </div>
                                    <div className='col-sm-6 col-md-6 col-lg-6 col-xl-6'>
                                        <NumericFormat 
                                            customInput={Form.Control}
                                            thousandSeparator={true}
                                            value={totalSub}
                                            style={{ textAlign: 'right' }}
                                            disabled
                                        />
                                    </div>
                                </div>
                                <div className='row g-2 mb-1'>
                                    <div className='col-sm-6 col-md-6 col-lg-6 col-xl-6'>
                                        <h6>Diskon</h6>
                                    </div>
                                    <div className='col-sm-6 col-md-6 col-lg-6 col-xl-6'>
                                        <NumericFormat 
                                            customInput={Form.Control}
                                            thousandSeparator={true}
                                            onValueChange ={e => {
                                                setDiskon(e.value)
                                                setisReady(true)
                                            }}
                                            style={{ textAlign: 'right' }}
                                        />
                                    </div>
                                </div>
                                <div className='row g-2 mb-1'>
                                    <div className='col-sm-6 col-md-6 col-lg-6 col-xl-6'>
                                        <h6>{tax1name}</h6>
                                    </div>
                                    <div className='col-sm-6 col-md-6 col-lg-6 col-xl-6'>
                                        <NumericFormat 
                                            customInput={Form.Control}
                                            thousandSeparator={true}
                                            value={ppn}
                                            style={{ textAlign: 'right' }}
                                            disabled
                                        />
                                    </div>
                                </div>
                                <div className='row g-2 mb-1'>
                                    <div className='col-sm-6 col-md-6 col-lg-6 col-xl-6'>
                                        <h6>{tax2name}</h6>
                                    </div>
                                    <div className='col-sm-6 col-md-6 col-lg-6 col-xl-6'>
                                        <NumericFormat 
                                            customInput={Form.Control}
                                            thousandSeparator={true}
                                            value={pph}
                                            style={{ textAlign: 'right' }}
                                            disabled
                                        />
                                    </div>
                                </div>
                                <div className='row g-2 mb-1'>
                                    <div className='col-sm-6 col-md-6 col-lg-6 col-xl-6'>
                                        <h6>B.Antar</h6>
                                    </div>
                                    <div className='col-sm-6 col-md-6 col-lg-6 col-xl-6'>
                                    <NumericFormat 
                                    customInput={Form.Control}
                                    thousandSeparator={true}
                                    onValueChange ={e => {
                                        setBantar(e.value)
                                        setisReady(true)
                                    }}
                                    style={{ textAlign: 'right' }}
                                />
                                    </div>
                                </div>
                                <div className='row g-2 mb-1'>
                                    <div className='col-sm-6 col-md-6 col-lg-6 col-xl-6'>
                                        <h6>Total</h6>
                                    </div>
                                    <div className='col-sm-6 col-md-6 col-lg-6 col-xl-6'>
                                        <NumericFormat 
                                            customInput={Form.Control}
                                            thousandSeparator={true}
                                            value={total}
                                            style={{ textAlign: 'right' }}
                                            disabled
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-sm-12 col-md-12 col-lg-2 col-xl-2 mb-5'>
                        <div className='d-flex align-items-end flex-column'>
                            <div className='d-flex align-items-end flex-wrap'>
                            <div className='row p-2'>
                                <Button type="submit" variant="outline-primary m-2" className='col-sm-12	col-md-12	col-lg-12	col-xl-12'>Simpan</Button>
                                <Button variant="outline-danger m-2" className='col-sm-12	col-md-12	col-lg-12	col-xl-12'>Batal</Button>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Form>

        
        </Container>
    </div>

    <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Body>
            <Accordion defaultActiveKey="0">
            {
                inputList?.map((e,i)=>{
                    return(
                        <Accordion.Item eventKey={i}>
                            <Accordion.Header>({e.material[0].itemNo})&nbsp;{e.material[0].material}&nbsp;{e.qty_pengadaan[0].order}&nbsp;{e.qty_pengadaan[0].satuan}</Accordion.Header>
                            <Accordion.Body>
                            <Form>
                                {e.parsial_data.map((i)=>{
                                    let cara = true;
                                    if(i.po === ""){
                                        cara = false;
                                    }
                                    return (
                                        <div className='row g-2 p-0'>
                                            <div className='col-sm-1 col-md-1 col-lg-1 col-xl-1'>
                                                <div className="form-check">
                                                    <input 
                                                        className="form-check-input"
                                                        type="checkbox" 
                                                        value={i}
                                                        disabled={cara}
                                                        onClick={(x) => handlecheckbox(e,i,x.target.checked)}
                                                    />
                                                </div>
                                            </div>
                                            <div className='col-sm-5 col-md-5 col-lg-5 col-xl-5'>
                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Label>No. PO</Form.Label>
                                                    <Form.Control type="text" value={i.po} disabled/>
                                                </Form.Group>
                                            </div>
                                            <div className='col-sm-6 col-md-6 col-lg-6 col-xl-6'>
                                                <Form.Label>Tgl Kedatangan</Form.Label>
                                                    <Form.Control type="date" value={i.tglDatang} disabled/>
                                            </div>
                                        </div>
                                    )
                                })}
                                
                            </Form>
                            
                            </Accordion.Body>
                        </Accordion.Item>
                    )
                })
            }
            </Accordion>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCekData}>
            Save Changes
          </Button>
        </Modal.Footer>
    </Modal>

    {isLoading ? <LoadingPage /> : ""}
    </>
  )
}
