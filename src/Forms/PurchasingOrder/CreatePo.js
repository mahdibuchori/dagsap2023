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
import { Accordion, Breadcrumb, Button, Col, Container, Form, InputGroup, Modal, OverlayTrigger, Stack, Tooltip } from 'react-bootstrap';

import { COLUMNS_DATAPO } from '../../datafile/columns';
import { FileBarang } from '../../datafile/FileSelect';
import { LoadingPage } from '../../LoadingPage/LoadingPage';
import useAuthStore, { selectUser } from '../../store/DataUser';
import useDataProvider, { selectProvider, selectFetchProvider,selectProviderReady } from '../../store/DataProvider';
import useDataDepartemen, { selectDepartemen, selectFetchDepartemen, selectDepartemenReady } from '../../store/DataDepartemen';
import useDataPo, { selectFetchNoPo, selectFalseNoPo, selectNoPo, selectNopoReady, selectDataPo, selectPoReady, selectFetchPo } from '../../store/DataPo';
import { API_AUTH } from '../../apis/apisData';
import { TableAddRemove } from '../PengadaanBarang/TableAddRemove';

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
    const datamyPo = useDataPo(selectDataPo);
    const fetchPo = useDataPo(selectFetchPo);
    const poReady = useDataPo(selectPoReady);

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
    const [tglKirimView, setTglKirimView] = useState([]);
    const [fileNab, setFileNab] = useState(FileBarang);
    const [fileDep, setFileDep] = useState(FileBarang);
    const [tax1name, setTax1name] = useState('');
    const [tax2name, setTax2name] = useState('');
    const [expro, setExpro] = useState();
    const [totalSub, setTotalSub] = useState(0);
    const [diskon, setDiskon] = useState(0);
    const [ppn, setPpn] = useState(0);
    const [pph, setPph] = useState(0);
    const [bantar, setBantar] = useState(0);
    const [total, setTotal] = useState(0);
    const [nilaiPp, setNilaiPp] = useState('');
    const [nilaiPh, setNilaiPh] = useState('');
    
    const [isLoading, setIsLoading] = useState(false);
    const [dataReady, setDataReady] = useState(false);
    const [isReady, setisReady] = useState(false);
    const [show, setShow] = useState(true);
    const [showModal, setShowModal] = useState(false);
    
    const handleClose = () => {
        navigate(`/form/Pengadaan`)
        setShow(false)
    };

    const tHeigt = parseInt(window.innerHeight) - 450;
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

    const columns = useMemo(() => COLUMNS_DATAPO, []);
    const [rowData, setRowData] = useState([]);

    useEffect(() => {
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

    useEffect(() => { 
        setIsLoading(true);
        const date = new Date();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        let bb = String(month).padStart(2, '0');
        fetchPo(`${year}-${bb}`, userData.uplan);
        setIsLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setIsLoading(true);
        if (!poReady) return;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [poReady]);

    useEffect(() => {
        setIsLoading(true);
        let data = location.state.data;
        let filePon = datamyPo.data;
        if(location.state === null || data.length === 0) {
            navigate(`/form/pengadaan`);
            Swal.fire('Info','Harap lengkapi data permintaan barang', 'info');
            setIsLoading(false);
        }
        else{
            // console.log(data)
            const next = data.filter((e)=> e.status === "Pengajuan");
            console.log(next.length)
            setInputList(location.state.data);
            if(filePon === undefined){
                navigate(`/form/pengadaan`);
                Swal.fire('Oppss..','Data No. Po tidak ditemukan', 'warning');
            }
            else{
                let idPonew = filePon?.map((e,i)=>{
                    let idA = e.id_po
                    let kepala = idA.substr(6, 1);
                    let p = idA.length;
                    let result = idA.substr(2,p);
                    return(
                        {id_po :idA, id : kepala, nilai: parseInt(result)}
                    )
                })
                
                const filterS = idPonew.filter(x => parseInt(x.id) < 5 );
                const filterSo = idPonew.filter(x => parseInt(x.id) === 5 );
                const ascP = filterS.sort((a, b) => b.nilai - a.nilai);
                const ascS = filterSo.sort((a, b) => b.nilai - a.nilai);
                setNilaiPp(ascP[0]?.id_po);
                setNilaiPh(ascS[0]?.id_po);
            }
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
                // setRowData([])
                console.log(dataSementara)
                if(dataSementara.tgl_datang === undefined || dataSementara.qty === undefined ){
                    Swal.fire('Opps..','Harap Ulangi Pemilihan Data','info')
                }
                else{
                    let data1 = {
                        material : dataSementara.material,
                        qty : dataSementara.qty,
                        qtyAwal : dataSementara.qty,
                        satuan : dataSementara.satuan,
                        hargasatuan : "",
                        diskon : "",
                        jmlhHarga : "",
                        departement : "",
                        itemNo : dataSementara.itemNo,
                        pajak : "",
                        spesifikasi : dataSementara.spesifikasi,
                        divisi : dataSementara.divisi,
                        brandMaterial : dataSementara.brandMaterial,
                        tipeMaterial : dataSementara.tipeMaterial,
                        terima  : "",
                        tutup : "",
                        id_Pengadaan : dataSementara.id_Pengadaan,
                        tipe : dataSementara.tipe,
                        tgl_datang : dataSementara.tgl_datang,
                        po : dataSementara.po,
                        parsial: [{
                            tgl: dataSementara.tgl_datang,
                            qty :dataSementara.qty,
                        }],
                        parsialAwal: [{
                            tgl: dataSementara.tgl_datang,
                            qty :dataSementara.qty,
                        }],
                        newSpek : `${dataSementara.tipeMaterial}, ${dataSementara.brandMaterial}, ${dataSementara.spesifikasi}`,
                        newMaterial : dataSementara.material,
                        newSatuan : dataSementara.satuan,
                        parsi : dataSementara.parsi
                        
                    }
                    console.log(data1)
                    if(dataPo.length < 1){
                        if(dataSementara.boll){ setDataPo(prev => [...prev, data1])}
                    }
                    else{
                        const cek = dataPo.filter((x)=> x.id_Pengadaan === dataSementara.id_Pengadaan)
                        console.log(cek)
                        if(cek.length === 0){
                            setDataPo(prev => [...prev, data1])
                        }
                        else{
                            const newPo = dataPo;
                            setDataPo([])
                            const id = newPo.findIndex((x)=> x.id_Pengadaan === dataSementara.id_Pengadaan);
                            newPo[id].parsial = [];
                            newPo[id].parsialAwal = [];
                            const filN = dataSementara.parsi.filter((i)=> i.state === true)
                            let hasil = [];
                            hasil = filN.map((obj,i)=>{return({
                                tgl: obj.tglDatang,
                                qty :obj.qty,
                            })})
                            if(hasil.length !== 0){
                                newPo[id].parsial = hasil;
                                newPo[id].parsialAwal = hasil;
                                let sum = hasil.reduce(function (s, a) {
                                    return s + parseFloat(a.qty);
                                }, 0);
                                newPo[id].qty = sum.toFixed(2)
                                newPo[id].qtyAwal = sum.toFixed(2)
                            }
                            else{
                                newPo.splice(id,1);
                            }
                            console.log(newPo)
                            setDataPo(newPo)
                        }
                        /* if(dataSementara.boll){
                            const cek = dataPo.filter((x)=> x.id_Pengadaan === dataSementara.id_Pengadaan)
                            if(cek.length === 0){
                                setDataPo(prev => [...prev, data1])
                            }
                            else{
                                const id = dataPo.findIndex((x)=> x.id_Pengadaan === dataSementara.id_Pengadaan)
                                let qty = parseFloat(dataPo[id].qty) + parseFloat(dataSementara.qty)
                                dataPo[id].qty = `${qty}`
                                dataPo[id].qtyAwal = `${qty}`
                                dataPo[id].parsial.push({
                                    tgl: dataSementara.tgl_datang,
                                    qty :dataSementara.qty,
                                })
                                dataPo[id].parsialAwal.push({
                                    tgl: dataSementara.tgl_datang,
                                    qty :dataSementara.qty,
                                })
                                setDataPo(dataPo)
                            }
                        }
                        else{
                            const id = dataPo.findIndex((x)=> x.id_Pengadaan === dataSementara.id_Pengadaan);
                            let qty = parseFloat(dataPo[id].qty) - parseFloat(dataSementara.qty);
                            if(qty === 0){
                                dataPo.splice(id,1);
                                setDataPo(dataPo);
                            }
                            else{
                                dataPo[id].qty = `${qty}`;
                                dataPo[id].qtyAwal = `${qty}`;
                                let prs = dataPo[id].parsial;
                                let prsm = dataPo[id].parsialAwal;
                                let idx = prs.findIndex((i)=> i.tgl === dataSementara.tgl_datang && i.qty === dataSementara.qty);
                                let idy = prsm.findIndex((i)=> i.tgl === dataSementara.tgl_datang && i.qty === dataSementara.qty);
                                if(idx >= 0){prs.splice(idx, 1)}else{console.log('idx < 0')};
                                if(idy >= 0){prsm.splice(idy, 1)}else{console.log('idy < 0')};
                                setDataPo(dataPo);
                            }
                        } */
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
            // console.log('aktivitas')
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
        console.log(fileDep)
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

    const handlecheckbox = (e, i,val,db) =>{
        let pr = db.filter((x) => x.id_Pengadaan === e.id_Pengadaan);
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
            boll : val,
            divisi : e.mesin,
            tipeMaterial : e.tipeMaterial,
            brandMaterial : e.brandMaterial,
            newSpek : `${e.tipeMaterial}, ${e.brandMaterial}, ${e.spesifikasi}`,
            parsi : pr[0].parsial_data
        }
        setDataSementara(data1)
        const newData = [];
        for(let x = 0 ; x < inputList.length; x++){
            if(inputList[x].id_Pengadaan === e.id_Pengadaan){
                let par = inputList[x].parsial_data;
                let idx = par.findIndex((x)=> x.po === i.po && x.qty === i.qty && x.expro === i.expro && x.noAkun === i.noAkun && x.tglDatang === i.tglDatang && x.state === i.state)
                if(idx >= 0){
                    par[idx].state = val
                }
                newData.push(inputList[x])
            }
            else{
                newData.push(inputList[x])
            }
        }
        setInputList(newData)
        // console.log([...inpt_br, ...inputNn])


        setDataReady(true)
    }

    const handleCekData = () =>{
        // console.log(dataPo)
        if(rowData.length === 0){
            setRowData([])
            if(dataPo.length === 0){
                Swal.fire('Info','Harap pilih tanggal kedatangan item','info');
            }
            else{
                setRowData([])
                console.log(dataPo)
                const cekX = dataPo;
                let plan = String(userData.uplan).toUpperCase();
                /* let data = [];
                for(let x = 0; x < dataPo.length; x++){
                    console.log(dataPo[x])
                    console.log(dataPo[x].parsial)
                    data.push({
                        material : dataPo[x].material,
                        qty : parseFloat(dataPo[x].qty).toFixed(2),
                        satuan : dataPo[x].satuan,
                        hargasatuan : "",
                        diskon : "",
                        jmlhHarga : "",
                        departement : `PABRIK ${plan}`,
                        itemNo : dataPo[x].itemNo,
                        pajak : "",
                        spesifikasi : dataPo[x].spesifikasi,
                        divisi : dataPo[x].divisi,
                        terima  : "",
                        tutup : "",
                        id_Pengadaan : dataPo[x].id_Pengadaan,
                        tipe : dataPo[x].tipe,
                        parsial: dataPo[x].parsial,
                        po : dataPo[x].po,
                        qtyAwal : parseFloat(dataPo[x].qtyAwal).toFixed(2),
                        parsialAwal: dataPo[x].parsialAwal,
                        brandMaterial : dataPo[x].brandMaterial,
                        tipeMaterial : dataPo[x].tipeMaterial,
                        newSpek : `${dataPo[x].tipeMaterial}, ${dataPo[x].brandMaterial}, ${dataPo[x].spesifikasi}`,
                        newMaterial : dataPo[x].newMaterial,
                        newSatuan : dataPo[x].newSatuan,
                        parsi : dataPo[x].parsi
                    })
                } */
                const cekM = cekX.map((e,i) =>{
                    const newData = e.parsial
                    console.log(newData)
                    return({
                        material : e.material,
                        qty : parseFloat(e.qty).toFixed(2),
                        satuan : e.satuan,
                        hargasatuan : "",
                        diskon : "",
                        
                        jmlhHarga : "",
                        departement : `PABRIK ${plan}`,
                        itemNo : e.itemNo,
                        pajak : "",
                        spesifikasi : e.spesifikasi,
                        
                        divisi : e.divisi,
                        terima  : "",
                        tutup : "",
                        id_Pengadaan : e.id_Pengadaan,
                        tipe : e.tipe,
                        
                        parsial: newData,
                        po : e.po,
                        qtyAwal : parseFloat(e.qtyAwal).toFixed(2),
                        parsialAwal: e.parsialAwal,
                        brandMaterial : e.brandMaterial,
                        
                        tipeMaterial : e.tipeMaterial,
                        newSpek : `${e.tipeMaterial}, ${e.brandMaterial}, ${e.spesifikasi}`,
                        newMaterial : e.newMaterial,
                        newSatuan : e.newSatuan,
                        parsi : e.parsi
                    }

                    )
                })
                setRowData(cekM)
                console.log(cekM)
                let filTgl = [];
                for(let x = 0; x < cekM.length; x++){
                    const nilai = cekM[x].parsial;
                    for(let y = 0; y < nilai.length; y++){
                        filTgl.push(nilai[y].tgl)
                    }
                }
                console.log(filTgl)
                let unique = [...new Set(filTgl)];
                unique.sort(function(a, b) {
                    const dateA = new Date(a);
                    const dateB = new Date(b);
                    return dateA - dateB;
                });
                console.log(unique)
                setTglKirimView(unique)
                setShow(false)
            }
        }
        else{
            readNewData()
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
            else {
                const cekDep = rowData.filter(x => x.departement === "");
                if(cekDep.length > 0){
                    Swal.fire('Oppsss', 'Harap Cek Kembali Kolom Departemen (Kolom Tidak Boleh Kosong)', 'info')
                }
                else{
                    savePengadaan()
                }
            }
        } catch (error) {
            console.log(error)
        }
    };

    const savePengadaan = async () =>{
        try {
            let bln = format(new Date(), "MM", { locale: id });
            let tahu = format(new Date(), "yyyy", { locale: id });
            let nilai = "";
            let fMate = "";
            for(let x =0; x < rowData.length; x++){
                if(rowData[x].hargasatuan === ""){
                    nilai = `Harga satuan pada material ${rowData[x].material} harap isikan nominal`;
                    break
                }
            }
            for(let x =0; x < rowData.length; x++){
                const nilai1 = rowData[x].material.includes(`"`);
                const nilai2 = rowData[x].material.includes(`'`);
                if(nilai1 || nilai2){
                    fMate = `Nama material ${rowData[x].material} terdapat tanda " atau ' harap dirubah`;
                break
                }
            }
            
            if(nilai !== ""){
                Swal.fire("Opps",nilai,'info')
            }
            else{
                if(fMate !== ""){
                    Swal.fire("Opps",fMate,'info')
                }
                else{
                    setIsLoading(true)
                    /* let parRow = [];
                    for(let x = 0; x < rowData.length; x++){
                        parRow = rowData[x].parsial;
                        const isi = dataPo.filter((i)=> i.id_Pengadaan === rowData[x].id_Pengadaan);
                        const parPo = isi[0].parsial;
                        const results = parRow.findIndex(({ tgl: tgl1, qty: qty1 }) => !parPo.some(({ tgl: tgl2, qty: qty2 }) => tgl2 === tgl1 && qty2 === qty1));
                        if(results >= 0){
                            parRow[results].tgl = tglKrm ;
                        }
                        else{
                            console.log('parRow : '+results);
                        }
                    } */
                    let nmbering = 0
                    for(let x = 0; x < rowData.length; x++){
                        let hSatuan = rowData[x].hargasatuan;
                        if(hSatuan === null || hSatuan === "null"){
                            nmbering = x + 1
                            break 
                        }
                    }
                    if(nmbering === 0){
                        const cekUlang = rowData.map((e, i) =>{
                            let total = 0
                            const hSatuan = e.hargasatuan;
                            const disc = parseFloat(e.diskon);
                            const quant = parseFloat(e.qty);
                            if(hSatuan === 0 || hSatuan === null || hSatuan === "null"){
                                total = 0
                            }
                            else{
                                const subTotal  = quant * parseFloat(hSatuan);
                                total = (subTotal - ((subTotal * disc) / 100)) * 100 / 100
                            }
        
                            return(
                                {
                                    "material": e.material,
                                    "qty": e.qty,
                                    "qtyAwal": e.qtyAwal,
                                    "satuan": e.satuan,
                                    "hargasatuan": e.hargasatuan,
                                    "diskon": e.diskon,
                                    "jmlhHarga": total,
                                    "departement": e.departement,
                                    "itemNo": e.itemNo,
                                    "pajak": e.pajak,
                                    "divisi": e.divisi,
                                    "spesifikasi": e.spesifikasi,
                                    "terima": e.terima,
                                    "tutup": e.tutup,
                                    "id_Pengadaan": e.id_Pengadaan,
                                    "tipe": e.tipe,
                                    "parsial": e.parsial,
                                    "parsialAwal": e.parsialAwal,
                                    "po": e.po,
                                    "brandMaterial": e.brandMaterial,
                                    "tipeMaterial": e.tipeMaterial,
                                    "newSpek": e.newSpek,
                                    "newMaterial": e.newMaterial,
                                    "newSatuan": e.newSatuan,
                                    "parsi": e.parsi
                                }
                            )
                        })
                        /* console.log({
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
                            dataPO : cekUlang,
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
                        }) */
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
                            dataPO : cekUlang,
                            keterangan : spesifikasi,
                            totalSub : totalSub,
                            diskon : parseFloat(diskon).toFixed(2),
                            ppn : ppn,
                            pph : pph,
                            bAntar : parseFloat(bantar).toFixed(2),
                            total : total,
                            tgl_verify : '',
                            tgl_approve : '',
                            plan : userData.uplan,
                            user : userData.uname
                        });
                        console.log(next.data)
                        Swal.fire(`${next.data.success}`, backhome(`/form/Pengadaan`), 'success');  
                    }
                   else{
                    Swal.fire('Oppss...',`Harga satuan pada material ${rowData[nmbering-1].material} harap isikan nominal`,'info')
                   }
                    setIsLoading(false);
                }
            }
        } catch (error) {
            console.log(error)
            Swal.fire('Info', `${error.response.data.message}`, 'warning');
            setIsLoading(false);
        }
    }

    const handleEprov = (value) =>{
        setTax1name(value.tax1name);
        setTax2name(value.tax2name);
        setExpro(value)
        let modifiedArr = rowData.map((e)=>{
            let pjk = "";
            if(value?.pajak === "DD" || value?.pajak ==="D"){pjk = ""}else{pjk = value?.pajak}
            // console.log(e)
            return {
                material : e.material,
                qty : parseFloat(e.qty).toFixed(2),
                qtyAwal : parseFloat(e.qtyAwal).toFixed(2),
                satuan : e.satuan,
                hargasatuan : e.hargasatuan,
                diskon : e.diskon,
                jmlhHarga : e.jmlhHarga,
                departement : e.departement,
                itemNo : e.itemNo,
                pajak : pjk,
                divisi : e.divisi,
                spesifikasi : e.spesifikasi,
                terima  : e.terima,
                tutup : e.tutup,
                id_Pengadaan : e.id_Pengadaan,
                tipe : e.tipe,
                parsial: e.parsial,
                parsialAwal : e.parsialAwal,
                po : e.po,  
                brandMaterial : e.brandMaterial,
                tipeMaterial : e.tipeMaterial,
                newSpek : `${e.tipeMaterial}, ${e.brandMaterial}, ${e.spesifikasi}`,
                newMaterial : e.newMaterial,
                newSatuan : e.newSatuan,
                parsi : e.parsi                              
            }
        })
        // const pjk = modifiedArr[0]?.pajak;
        let dataPo = numbPo.data;
        if(dataPo.length === 0){
            let cek_pj = "";
            if(value?.pajak === "S" || value?.pajak ==="SE" || value?.pajak === "ST" || value?.pajak === "SH" ){
                cek_pj = value?.pajak
            }
            else{
                cek_pj = ""
            }
      
            if(value?.id === "3801" || value?.id ==="25617"){
              cek_pj = "ADA"
            }
            if(cek_pj === ""){
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
            let dtPph = [];
            
            dataPo.map((e)=>{
                const c =e.id_po.substr(-3);
                if(parseFloat(c) > 499){
                  return dtPph.push(parseFloat(c))
                }
                else{
                  return dtPpn.push(parseFloat(c))
                }
            })
      
            let cek_pj = "";
            if(value?.pajak === "S" || value?.pajak ==="SE" || value?.pajak === "ST" || value?.pajak === "SH" ){
              cek_pj = value?.pajak
            }
            else{
              cek_pj = ""
            }
      
            if(value?.id === "3801" || value?.id ==="25617"){
              cek_pj = "ADA"
            }
      
            if(cek_pj === ""){
                const numb = ("00" + (dtPph.length + 1)).slice(-2);
                setNopo(`${kode}5${numb}`);
                console.log(`${kode}5${numb}`);
            }
            else{
                const numb = ("00" + (dtPpn.length + 1)).slice(-3);
                setNopo(`${kode}${numb}`);
                console.log(`${kode}${numb}`);
            }
        }
        /* else{
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
        } */
        setRowData(modifiedArr)
        setisReady(true)
    }

    /* const hanldeDept = (value) =>{
        let modifiedArr = rowData.map((e)=>{
            return {
                material : e.material,
                qty : parseFloat(e.qty).toFixed(2),
                qtyAwal : parseFloat(e.qtyAwal).toFixed(2),
                satuan : e.satuan,
                hargasatuan : e.hargasatuan,
                diskon : e.diskon,
                jmlhHarga : e.jmlhHarga,
                departement : value?.value,
                itemNo : e.itemNo,
                pajak : e.pajak,
                spesifikasi : e.spesifikasi,
                divisi : e.divisi,
                terima  : e.terima,
                tutup : e.tutup,
                id_Pengadaan : e.id_Pengadaan,
                tipe : e.tipe,
                parsial: e.parsial,
                parsialAwal : e.parsialAwal,
                po : e.po,  
                brandMaterial : e.brandMaterial,
                tipeMaterial : e.tipeMaterial,
                newSpek : `${e.tipeMaterial}, ${e.brandMaterial}, ${e.spesifikasi}`,
                newMaterial : e.newMaterial,                                  
            }
        })
        setRowData(modifiedArr)
        setisReady(true)
    } */

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
        let dpp = [];
        if(diskon === ""){nDiskon = 0} else{nDiskon = diskon}
        if(bantar === ""){nBantar = 0} else{nBantar = bantar}
        // console.log(tax1id+""+tax2id)
        /* rowData.map((e)=>{
            if(e.jmlhHarga === "" || e.jmlhHarga === 0 ){ntotalSub += 0}
            else{ntotalSub += parseFloat(e.jmlhHarga)}
            const pjk = e.pajak;
            let pjk1 = "";
            let pjk2 = "";
            if(pjk.length === 2){
                pjk1 = pjk[0];
                pjk2 = pjk[1];
            }
            else if (pjk.length === 1){
                pjk1 = pjk[0];
                pjk2 = "" 
            }
            else{
                pjk1 = "";
                pjk2 = "" 
            }

            if(pjk1.toUpperCase() === "A"){
                nppn += 0;
                npph += ((parseFloat(e.jmlhHarga) - nDiskon) * 2.5) / 100;
            }
            else if(pjk1.toUpperCase() === "B"){
                nppn += 0;
                npph += ((parseFloat(e.jmlhHarga) - nDiskon) * 3) / 100;
            }
            else if(pjk1.toUpperCase() === "E"){
                nppn += 0;
                npph += ((parseFloat(e.jmlhHarga) - nDiskon) * 10) / 100;
            }
            else if(pjk1.toUpperCase() === "G"){
                nppn += 0;
                npph += ((parseFloat(e.jmlhHarga) - nDiskon) * 0.5) / 100;
            }
            else if(pjk1.toUpperCase() === "R"){
                nppn += ((parseFloat(e.jmlhHarga) - nDiskon) * 1.1) / 100;
                npph += 0;
            }
            else if(pjk1.toUpperCase() === "S"){
                nppn += ((parseFloat(e.jmlhHarga) - nDiskon) * 11) / 100;
                npph += 0;
            }
            else if(pjk1.toUpperCase() === "T"){
                nppn += 0;
                npph += ((parseFloat(e.jmlhHarga) - nDiskon) * 2) / 100;
            }
            else{
                nppn += 0;
                npph += 0;
            }
    
            if(pjk2.toUpperCase() === "A"){
                nppn += 0;
                npph += ((parseFloat(e.jmlhHarga) - nDiskon) * 2.5) / 100;
            }
            else if(pjk2.toUpperCase() === "B"){
                nppn += 0;
                npph += ((parseFloat(e.jmlhHarga) - nDiskon) * 3) / 100;
            }
            else if(pjk2.toUpperCase() === "E"){
                nppn += 0;
                npph += ((parseFloat(e.jmlhHarga) - nDiskon) * 10) / 100;
            }
            else if(pjk2.toUpperCase() === "G"){
                nppn += 0;
                npph += ((parseFloat(e.jmlhHarga) - nDiskon) * 0.5) / 100;
            }
            else if(pjk2.toUpperCase() === "R"){
                nppn += ((parseFloat(e.jmlhHarga) - nDiskon) * 1.1) / 100;
                npph += 0;
            }
            else if(pjk2.toUpperCase() === "S"){
                nppn += ((parseFloat(e.jmlhHarga) - nDiskon) * 11) / 100;
                npph += 0;
            }
            else if(pjk2.toUpperCase() === "T"){
                nppn += 0;
                npph += ((parseFloat(e.jmlhHarga) - nDiskon) * 2) / 100;
            }
            else{
                nppn += 0;
                npph += 0;
            }

            return(
                setTotalSub(ntotalSub.toFixed(2))
            )
        })

        setPpn(nppn.toFixed(2));
        setPph(npph.toFixed(2));
        ntotal = ntotalSub - nDiskon + nppn - npph + parseFloat(nBantar)
        setTotal(parseFloat(ntotal).toFixed(2))
        setisReady(false) */
        rowData.map((e,i)=>{
            if(e.jmlhHarga === "" || e.jmlhHarga === 0 ){ntotalSub += 0}
            else{ntotalSub += parseFloat(e.jmlhHarga)}
            return(
                setTotalSub(ntotalSub.toFixed(2))
            )
        })
      
        rowData.map((e,i)=>{
        const pjk = e.pajak;
        let pjk1 = "";
        let pjk2 = "";
        if(pjk.length === 2){
            pjk1 = pjk[0];
            pjk2 = pjk[1];
        }
        else if (pjk.length === 1){
            pjk1 = pjk[0];
            pjk2 = "" 
        }
        else{
            pjk1 = "";
            pjk2 = "" 
        }
        dpp.push(pjk1)
        if(pjk1.toUpperCase() === "A"){
            nppn += 0;
            npph += ((parseFloat(e.jmlhHarga)) * 2.5) / 100;
        }
        else if(pjk1.toUpperCase() === "B"){
            nppn += 0;
            npph += ((parseFloat(e.jmlhHarga)) * 3) / 100;
        }
        else if(pjk1.toUpperCase() === "E"){
            nppn += 0;
            npph += ((parseFloat(e.jmlhHarga)) * 10) / 100;
        }
        else if(pjk1.toUpperCase() === "G"){
            nppn += 0;
            npph += ((parseFloat(e.jmlhHarga)) * 0.5) / 100;
        }
        else if(pjk1.toUpperCase() === "R"){
            nppn += ((parseFloat(e.jmlhHarga)) * 1.1) / 100;
            npph += 0;
        }
        else if(pjk1.toUpperCase() === "S"){
            nppn += ((parseFloat(e.jmlhHarga)) * 11) / 100;
            npph += 0;
        }
        else if(pjk1.toUpperCase() === "T"){
            nppn += 0;
            npph += ((parseFloat(e.jmlhHarga)) * 2) / 100;
        }
        else if(pjk1.toUpperCase() === "H"){
            nppn += 0;
            npph += ((parseFloat(e.jmlhHarga)) * 1.75) / 100;
        }
        else{
            nppn += 0;
            npph += 0;
        }
    
        if(pjk2.toUpperCase() === "A"){
            nppn += 0;
            npph += ((parseFloat(e.jmlhHarga)) * 2.5) / 100;
        }
        else if(pjk2.toUpperCase() === "B"){
            nppn += 0;
            npph += ((parseFloat(e.jmlhHarga)) * 3) / 100;
        }
        else if(pjk2.toUpperCase() === "E"){
            nppn += 0;
            npph += ((parseFloat(e.jmlhHarga)) * 10) / 100;
        }
        else if(pjk2.toUpperCase() === "G"){
            nppn += 0;
            npph += ((parseFloat(e.jmlhHarga)) * 0.5) / 100;
        }
        else if(pjk2.toUpperCase() === "R"){
            nppn += ((parseFloat(e.jmlhHarga)) * 1.1) / 100;
            npph += 0;
        }
        else if(pjk2.toUpperCase() === "S"){
            nppn += ((parseFloat(e.jmlhHarga)) * 11) / 100;
            npph += 0;
        }
        else if(pjk2.toUpperCase() === "T"){
            nppn += 0;
            npph += ((parseFloat(e.jmlhHarga)) * 2) / 100;
        }
        else if(pjk2.toUpperCase() === "H"){
            nppn += 0;
            npph += ((parseFloat(e.jmlhHarga)) * 1.75) / 100;
        }
        else{
            nppn += 0;
            npph += 0;
        }
    
        return(
            setTotalSub(ntotalSub.toFixed(2))
        )
        })
        let unique = [...new Set(dpp)];
        const filt = unique.filter(x=> x.toUpperCase() === "S");
        // console.log(filt.length)
        if(filt.length > 0){
            let jumd = (nDiskon * 11) / 100;
            nppn -= jumd
            setPpn(nppn.toFixed(2));
        }
        else{
            setPpn(nppn.toFixed(2));
        }
        console.log(npph)
        setPph(npph.toFixed(2));
        ntotal = ntotalSub  - parseFloat(nDiskon) + nppn - npph + parseFloat(nBantar)
        setTotal(parseFloat(ntotal).toFixed(2))
        setisReady(false)
    }

    const backhome = (e) =>{
        navigate(e)
    }

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          <ul>
            <li>No PO Terakhir PP : {nilaiPp}</li>
            <li>No PO Terakhir Non PP : {nilaiPh}</li>
          </ul>
        </Tooltip>
    );
    const renderTgltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          <ul>
            {
                tglKirimView?.map((e,i)=>{
                    return(
                        <li>{e}</li>
                    )
                })
            }
          </ul>
        </Tooltip>
    );

    const onAddGoalHandler = (newGoal) =>{
        const results = newGoal.filter(({ id_Pengadaan: id1 }) => !inputList.some(({ id_Pengadaan: id2 }) => id2 === id1));
        const result = inputList.filter(({ id_Pengadaan: id1 }) => !newGoal.some(({ id_Pengadaan: id2 }) => id2 === id1));

        let newData = [];
        if(results.length > 0){
            const menu_data = results.map((obj, i) =>{
                const par = obj.parsial_data.map((x,y) =>{
                  return(
                    {...x, state : false}
                  )
                })
                return(
                  {
                      "id_Pengadaan": obj.id_Pengadaan,
                      "t_pengadaan": obj.t_pengadaan,
                      "filter_bulan": obj.filter_bulan,
                      "user": obj.user,
                      "status": obj.status,
                      "material": obj.material,
                      "qty_pengadaan": obj.qty_pengadaan,
                      "spesifikasi": obj.spesifikasi,
                      "tgl_verify": obj.tgl_verify,
                      "tgl_approve": obj.tgl_approve,
                      "parsial_data": par,
                      "tipeMaterial": obj.tipeMaterial,
                      "brandMaterial": obj.brandMaterial,
                      "mesin": obj.mesin,
                      "coa": obj.coa,
                      "halal": obj.halal,
                      "msds": obj.msds,
                      "copypo": obj.copypo,
                      "health": obj.health,
                      "kh": obj.kh,
                      "foodgrade": obj.foodgrade
                  }
                )
            })
            newData = [...inputList, ...menu_data]
        }
        else{
            newData = inputList
        }

        if(result.length > 0){
            for(let x = 0; x < result.length; x++){
                const idx = newData.findIndex((i)=> i.id_Pengadaan === result[x].id_Pengadaan);
                if(idx >= 0){newData.splice(idx,1)}else{console.log('idx < 0')}
            }
        }
        console.log(newData)
        setInputList(newData);
        setShow(true);
        handleAdd(result);
    }

    const handleAdd = (e) =>{
        if(e !== undefined){
            if(e.length > 0){
                for(let x = 0; x < e.length; x++){
                    const idx = dataPo.findIndex((i)=> i.id_Pengadaan === e[x].id_Pengadaan);
                    const idp = rowData.findIndex((i)=> i.id_Pengadaan === e[x].id_Pengadaan);
                    if(idx >= 0){dataPo.splice(idx,1)}else{console.log('idx < 0')}
                    if(idp >= 0){rowData.splice(idx,1)}else{console.log('idp < 0')}
                }
            }
        }
        setDataPo(dataPo)
    }

    const readNewData = () =>{
        setTglKirimView([])
        /* if(dataPo.length === 0){
            Swal.fire('Info','Harap pilih tanggal kedatangan item','info');
        }
        else{
        let file = rowData;
        setRowData([]);
        let uset = "";
        if(expro === undefined){ uset = ""}else{ uset = expro?.pajak}
        let plan = String(userData.uplan).toUpperCase();
        let data = [];
        for(let x = 0; x < dataPo.length; x++){
            data.push({
                material : dataPo[x].material,
                qty : parseFloat(dataPo[x].qty).toFixed(2),
                satuan : dataPo[x].satuan,
                hargasatuan : "",
                diskon : "",
                jmlhHarga : "",
                departement : `PABRIK ${plan}`,
                itemNo : dataPo[x].itemNo,
                pajak : uset,
                spesifikasi : dataPo[x].spesifikasi,
                divisi : dataPo[x].divisi,
                terima  : "",
                tutup : "",
                id_Pengadaan : dataPo[x].id_Pengadaan,
                tipe : dataPo[x].tipe,
                parsial: dataPo[x].parsial,
                po : dataPo[x].po,
                qtyAwal : parseFloat(dataPo[x].qtyAwal).toFixed(2),
                parsialAwal: dataPo[x].parsialAwal,
                brandMaterial : dataPo[x].brandMaterial,
                tipeMaterial : dataPo[x].tipeMaterial,
                newSpek : `${dataPo[x].tipeMaterial}, ${dataPo[x].brandMaterial}, ${dataPo[x].spesifikasi}`,
                newMaterial : dataPo[x].newMaterial,
                newSatuan : dataPo[x].newSatuan,
                parsi : dataPo[x].parsi
            })
        }

        for(let x = 0; x < file.length; x++){
            const hargasatuan = file[x].hargasatuan;
            const jmlhHarga = file[x].jmlhHarga;
            const material = file[x].material;
            const id_file = file[x].id_Pengadaan;
            for(let y = 0; y < data.length; y++){
                const id_data = data[y].id_Pengadaan
                if(id_data === id_file){
                    data[y].hargasatuan = hargasatuan;
                    data[y].jmlhHarga = jmlhHarga;
                    data[y].material = material;
                }
            }
        }
        setRowData(data);
        setisReady(true);
        setShow(false);
        } */
        if(dataPo.length === 0){
            Swal.fire('Info','Harap pilih tanggal kedatangan item','info');
        }
        else{
            let file = rowData;
            setRowData([]);
            let uset = "";
            if(expro === undefined){ uset = ""}else{ uset = expro?.pajak}
            let plan = String(userData.uplan).toUpperCase();
            const newFile = dataPo.map((obj,i)=>{
                let jmlhHarga,harsa = 0;
                if(obj.hargasatuan !== ""){
                jmlhHarga = parseFloat(obj.qty) * parseFloat(obj.hargasatuan)
                harsa = parseFloat(obj.hargasatuan)
                }
                //   console.log(obj)
                return({
                departement : `PABRIK ${plan}`,
                diskon : obj.diskon,
                divisi : obj.divisi,
                hargasatuan : harsa,
                id_Pengadaan : obj.id_Pengadaan,
                itemNo : obj.itemNo,
                jmlhHarga : jmlhHarga,
                material : obj.material,
                newMaterial : obj.newMaterial,
                newSatuan : obj.newSatuan,
                pajak : uset,
                po : obj.po,
                qty : parseFloat(obj.qty).toFixed(2),
                qtyAwal : parseFloat(obj.qtyAwal).toFixed(2),
                satuan : obj.satuan,
                terima  : obj.terima,
                tipe : obj.tipe,
                tutup : obj.tutup,
                spesifikasi : obj.spesifikasi,
                brandMaterial : obj.brandMaterial,
                tipeMaterial : obj.tipeMaterial,
                newSpek : obj.newSpek,
                parsial : obj.parsial,
                parsialAwal : obj.parsialAwal,
                parsi : obj.parsi,
                }
                
                )
            })
            for(let x = 0; x < newFile.length; x++){
                const idC = file.findIndex((i)=> i.id_Pengadaan === newFile[x].id_Pengadaan);
                if(idC >= 0){
                    const ids = new Set(file[idC].parsialAwal.map(({ tgl }) => tgl));
                    const sele = newFile[x].parsialAwal.filter(({ tgl }) => !ids.has(tgl));
                    // console.log(sele);
                    let jmlhHarga,harsa = 0;
                    newFile[x].material = file[idC].material;
                    if(file[idC].hargasatuan !== ""){
                        jmlhHarga = parseFloat(newFile[x].qty) * parseFloat(file[idC].hargasatuan)
                        harsa = parseFloat(file[idC].hargasatuan)
                        newFile[x].hargasatuan = harsa;
                        newFile[x].jmlhHarga = jmlhHarga;
                    }
                    else{
                        newFile[x].jmlhHarga = 0;
                    }
                    if(sele.length === 0){
                        newFile[x].parsial = []
                        newFile[x].parsialAwal = []
                        
                        newFile[x].parsial = file[idC].parsial
                        newFile[x].parsialAwal = file[idC].parsialAwal
                        newFile[x].qty = file[idC].qty
                    }
                }
            }
        console.log(newFile);
        setRowData(newFile);
        let filTgl = [];
        for(let x = 0; x < newFile.length; x++){
            const nilai = newFile[x].parsial;
            for(let y = 0; y < nilai.length; y++){
                console.log(nilai[y].tgl)
                filTgl.push(nilai[y].tgl)
            }
        }
        console.log(filTgl)
        let unique = [...new Set(filTgl)];
        unique.sort(function(a, b) {
            const dateA = new Date(a);
            const dateB = new Date(b);
            return dateA - dateB;
          });
        console.log(unique)
        setTglKirimView(unique)
        setisReady(true);
        setShow(false);
        }
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
                <div className='row g-2 mt-1'>
                    <div className='col-sm-12 col-md-12 col-lg-6 col-xl-6 mb-1'>
                        <div className='row g-2 mb-1'>
                            <div className='col-sm-4 col-md-4 col-lg-4 col-xl-4'>
                            <h6>Eksternal Provider</h6>
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
                            </div>
                            <div className='col-sm-4 col-md-4 col-lg-4 col-xl-4'>
                            <h6>Syrt Pembayaran</h6>
                            <Form.Control
                                required
                                type="text"
                                value={termName}
                                disabled
                                />
                            </div>
                            <div className='col-sm-4 col-md-4 col-lg-4 col-xl-4'>
                            <h6>Nilai Tukar</h6>
                            <Form.Control
                                required
                                type="text"
                                value={currencyName}
                                disabled
                                />
                            </div>
                        </div>
                    </div>
                    <div className='col-sm-12 col-md-12 col-lg-6 col-xl-6 mb-1'>
                        <div className='row g-2 mb-1'>
                            <div className='col-sm-4 col-md-4 col-lg-4 col-xl-4'>
                            <h6>No. PO</h6>
                            
                            <InputGroup className="mb-3">
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="No PO"
                                    value={nopo}
                                    onChange={(e)=>{
                                        setNopo(e.target.value)
                                    }}
                                    disabled = {false}
                                />
                                <InputGroup.Text id="basic-addon2" className='bg bg-primary text text-light'>
                                    <OverlayTrigger
                                    placement="bottom"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={renderTooltip}
                                    >
                                        <i class="bi bi-caret-down-fill"></i>
                                    </OverlayTrigger>
                                    
                                </InputGroup.Text>
                            </InputGroup>
                            </div>
                            <div className='col-sm-4 col-md-4 col-lg-4 col-xl-4'>
                            <h6>Tgl PO</h6>
                            <Form.Control
                                required
                                type="date"
                                value={tgl}
                                onChange={(e)=>{
                                    setTgl(e.target.value)
                                }}
                                disabled = {false}
                            />
                            </div>
                            <div className='col-sm-4 col-md-4 col-lg-4 col-xl-4'>
                            <h6>Tgl Kirim</h6>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    required
                                    type="date"
                                    onChange={(e)=>{
                                        setTglKrm(e.target.value)
                                    }}
                                    disabled = {false}
                                />
                                <InputGroup.Text id="basic-addon2" className='bg bg-primary text text-light'>
                                    <OverlayTrigger
                                    placement="bottom"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={renderTgltip}
                                    >
                                        <i class="bi bi-caret-down-fill"></i>
                                    </OverlayTrigger>
                                    
                                </InputGroup.Text>
                            </InputGroup>
                            </div>
                            
                        </div>
                    </div>
                </div>

                <div className='row g-2 mb-1'>
                    <div className='col-sm-12 col-md-12 col-lg-10 col-xl-11 mb-1'>
                        <div style={{height: screenHeight, width: screenWidth, padding: 5}} className="ag-theme-alpine">
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
                    <div className='col-sm-12 col-md-12 col-lg-2 col-xl-1 mb-5'>
                        <div className='d-flex align-items-end flex-column'>
                            <div className='d-flex align-items-end flex-wrap'>
                            <div className='row p-2'>
                                <Button 
                                    type="submit" 
                                    variant="outline-primary m-2"
                                    className='col-sm-12 col-md-12 col-lg-12 col-xl-12'
                                >
                                    <i className="bi bi-floppy2-fill"></i>&nbsp;
                                    Simpan
                                </Button>
                                <Button 
                                    variant="outline-secondary m-2"
                                    className='col-sm-12 col-md-12 col-lg-12 col-xl-12'
                                    onClick={() => {
                                        setShowModal(true)
                                    }}
                                >
                                    <i className="bi bi-file-earmark"></i>&nbsp;
                                    Tambah/Hapus
                                </Button>
                                <Button 
                                    variant="outline-danger m-2" 
                                    className='col-sm-12 col-md-12 col-lg-12 col-xl-12'
                                    onClick={() => navigate(`/form/Pengadaan`)}
                                >   
                                    <i className="bi bi-x-octagon-fill"></i>&nbsp;
                                    Batal
                                </Button>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Form>

        
        </Container>
    </div>
    {
        inputList.length 
        &&
        <TableAddRemove
            show={showModal}
            close={() => setShowModal(false)}
            data={inputList}
            onAddGoal={onAddGoalHandler}
        />
    }
    
    <Modal show={show} size="lg" centered>
        <Modal.Body>
            <Accordion>
            {
                inputList?.map((e,i)=>{
                    return(
                        <Accordion.Item eventKey={i}>
                            <Accordion.Header>{i+1}.&nbsp;
                                ({e.material[0].itemNo})&nbsp;{e.material[0].material}&nbsp;{e.qty_pengadaan[0].order}&nbsp;{e.qty_pengadaan[0].satuan}||{e.spesifikasi}
                            </Accordion.Header>
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
                                                            checked={i.state}
                                                            onClick={(x) => handlecheckbox(e,i,x.target.checked,inputList)}
                                                            style={{borderColor: '#287BFF' }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className='col-sm-4 col-md-4 col-lg-5 col-xl-4'>
                                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                                        <Form.Label>No. PO</Form.Label>
                                                        <Form.Control type="text" value={i.po} disabled/>
                                                    </Form.Group>
                                                </div>
                                                <div className='col-sm-3 col-md-3 col-lg-5 col-xl-3'>
                                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                                        <Form.Label>Qty</Form.Label>
                                                        <Form.Control type="text" value={i.qty} disabled/>
                                                    </Form.Group>
                                                </div>
                                                <div className='col-sm-4 col-md-4 col-lg-6 col-xl-4'>
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
