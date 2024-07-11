import React, { useEffect, useState } from 'react';
import Swal from "sweetalert2";
import { format } from "date-fns";
import id from 'date-fns/locale/id';

import { Form, Breadcrumb, Button, Col, Modal, Stack } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { PDFViewer } from "@react-pdf/renderer";
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet
} from "@react-pdf/renderer";

import lgDg from '../../assets/img/dee.png'
import { LoadingPage } from '../../LoadingPage/LoadingPage';
// import useAuthStore, { selectUser } from '../../store/DataUser';
import useDataProvider, { selectProvider, selectFetchProvider,selectProviderReady } from '../../store/DataProvider';

const styles = StyleSheet.create({
    body: {
        paddingTop: 60,
        paddingBottom: 60,
        paddingHorizontal: 30,
    },
    page: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        margin : '10mm',
        border: 'none'
    },
    image: {
        width: '30',
        height: '30'
    },
    row: {
        width : '190mm',
        display: 'flex',
        flexDirection: 'row',
        fontSize: '8px',
        padding : 0,
    },
    border: {
        border : '0.3mm solid black',
        backgroundColor : 'white',
        margin: 0,
    },
    fontBold :{
        fontWeight : 'bold',
    },
    header: {
        fontSize: 12,
        marginBottom: 7,
        textAlign: 'center',
        color: 'black',
      },
    pageNumber: {
        fontSize: '8px',
    },
    textsize:{
        width: '18mm',
        padding: 2,
        textAlign: 'left',
        fontSize:'16px',
    }
});

export const PrintPo = () => {
    const navigate = useNavigate();
    const location = useLocation();
    // const userData = useAuthStore(selectUser);
    const provider = useDataProvider(selectProvider);
    const onProvider = useDataProvider(selectFetchProvider);
    const providerReady = useDataProvider(selectProviderReady);

    const [list, setList] = useState([]);
    const [listPar, setListPar] = useState([]);
    const [numbering, setNumbering] = useState([]);
    const [inputList, setInputList] = useState();
    const [kirim, setKirim] = useState('');
    const [tglPo, setTglPo] = useState('');
    const [bayar, setBayar] = useState('');
    const [tukar, setTukar] = useState('');
    const [exprovider, setExprovider] = useState('');
    const [alamat, setAlamat] = useState('');
    const [note, setNote] = useState('');
    const [totalPpn, setTotalPpn] = useState(0);
    const [totalPph, setTotalPph] = useState(0);
    const [totalPesan, setTotalPesan] = useState(0);
    const [totalSub, setTotalSub] = useState(0);
    const [bantar, setBantar] = useState(0);
    const [diskon, setDiskon] = useState(0);
    const [taxName, setTaxName] = useState('');
    const [dtPar, setDtPar] = useState(false);
    const [dtNote, setDtNote] = useState(false);
    const [show, setShow] = useState(false);

    

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
        setDtPar(false);
        setDtNote(false);
        setNote();
        setListPar([]);
        setNumbering([]);
    }

    const [isLoading, setIsLoading] = useState(false);
    const [stAppro, setStAppro] = useState(false);
    const [stVeri, setStVeri] = useState(false);

    const tHeigt = parseInt(window.innerHeight);
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
            let tinggi = parseInt(window.innerHeight)
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
        if(location.state === null) {
            navigate(`/form/pengadaan`);
            Swal.fire('Info','Harap kembali ke halaman permintaan data tidak lengkap', 'info')
        }
        else{
            setList(location.state.data.dataPO);
            let bln = format(new Date(location.state.data.tgl_kirim), "MMMM", { locale: id });
            let tahu = format(new Date(location.state.data.tgl_kirim), "yyyy", { locale: id });
            let day = format(new Date(location.state.data.tgl_kirim), "dd", { locale: id });

            let bln1 = format(new Date(location.state.data.tgl_po), "MMMM", { locale: id });
            let tahu1 = format(new Date(location.state.data.tgl_po), "yyyy", { locale: id });
            let day1 = format(new Date(location.state.data.tgl_po), "dd", { locale: id });

            setKirim(`${day} ${bln} ${tahu}`);
            setTglPo(`${day1} ${bln1} ${tahu1}`);
            if(location.state.data.status === "Selesai"){
                setStAppro(true);
                setStVeri(true);
            }
            else if(location.state.data.status === "Verifikasi"){
                setStVeri(true);
                setStAppro(false);
            }
            else{
                setStAppro(false);
                setStVeri(false)
            }
            let data = location.state.data.dataPO.map((e)=>{
                return(
                    e.parsial.map((i) =>{
                        return (
                            {
                                nama : e.material,
                                tanggal : i.tgl,
                                qty : i.qty
                            }
                        )
                    })
                )
            });

            let result = [];
            for(let x = 0; x < data.length;x++){
                let nilai = data[x];
                for(let y = 0; y < nilai.length; y++){
                    result.push(nilai[y])
                }
            }
            setInputList(result)
            cekData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
    
      useEffect(() => { 
        // setIsLoading(true);
        onProvider()
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
    
      useEffect(() => {
        if (!providerReady) return;
        cekProvider()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [providerReady]);

    const cekData = () =>{
        const data = location.state.data;
        setBayar(data?.pembayaran);
        setTukar(data?.tukar);
        setExprovider(data?.expro);
        setTotalPpn(data?.ppn);
        setTotalPph(data?.pph);
        setTotalPesan(data?.total);
        setTotalSub(data?.totalSub);
        setBantar(data?.bAntar);
        setDiskon(data?.diskon);
        
        console.log(data);
        setIsLoading(false)
    }

    const cekProvider =()=>{
        const data = provider.provider
        const file = location.state.data
        const cek = data.filter(obj => obj.id === file?.idexpro);
        

        if(cek.length > 0){
            const n = cek[0];
            console.log(n)
            let alamat = "";
            if(n.addressline2 === ""){alamat = n.addressline1} else{alamat = `${n.addressline1}, ${n.addressline2}`}
            let alamat1 = "";
            if(n.city === ""){alamat1 = alamat}else{alamat1 = `${alamat}, ${n.city}`}
            let alamat2 = "";
            if(n.stateprov === ""){alamat2 = alamat1}else{alamat2 = `${alamat1}, ${n.stateprov}`}
            let alamat3 = "";
            if(n.zipcode === ""){alamat3 = alamat2}else{alamat3 = `${alamat2}, ${n.zipcode}`}
            let alamat4 = "";
            if(n.country === ""){alamat4 = alamat3}else{alamat4 = `${alamat3}, ${n.country}`}
            
            setAlamat(alamat4);
            setTaxName(n.tax2name)
        }
        else{
            setAlamat('');
        }
        setIsLoading(false)
    }

    const handleSelect = (e) =>{
        let target = e.target.checked
        if(target){
            setNumbering([...numbering, e.target.value]);
        }
        else{
        }
    }

    const handleChange = () =>{
        if(note=== "" || note === undefined){
            setDtNote(false)
        }
        else{
            setDtNote(true)
        }

        if(numbering.length === 0){
            setDtPar(false)
        }
        else{
            const nilai = numbering.map((e) =>{
                let x = parseInt(e);
                let data = inputList[x];
                let bln = format(new Date(data.tanggal), "MMMM", { locale: id });
                let tahu = format(new Date(data.tanggal), "yyyy", { locale: id });
                let day = format(new Date(data.tanggal), "dd", { locale: id });
                const tg = `${day} ${bln} ${tahu}`;
                return(
                    {
                        item : data?.nama,
                        qty : data?.qty,
                        tanggal : tg
                    }
                )
            })
            setListPar(nilai)
            console.log(nilai)
            setDtPar(true)
        }
        setShow(false)
    }
    return (
    <>
        <div className='setContain'>
            <Stack direction="horizontal" gap={3} style={{padding: "0px 10px 0px 10px"}}>
                <div className="bg-body">
                <div>
                    <Breadcrumb>
                        <Breadcrumb.Item onClick={() =>navigate(`/form`)}>Form</Breadcrumb.Item>
                        <Breadcrumb.Item onClick={() =>navigate('/form/purchaseorder')}>Purchase Order</Breadcrumb.Item>
                        <Breadcrumb.Item active>Print View PO</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                </div>
                <div className="ms-auto"></div>
                <div className="bg-body">
                <Button variant="primary" onClick={handleShow}>
                    <i className="bi bi-pencil-fill"></i> &nbsp; Parsial
                </Button>
                </div>
            </Stack>

            <PDFViewer style={{width: screenWidth, height: screenHeight,padding:8}}>
                <Document>
                    <Page size="A4" style={styles.body}>
                        <View>
                            <View style={styles.header} fixed>
                                <View style={[styles.row,{marginLeft: '185mm',marginBottom: '2mm'}]}>
                                    <Image style={{width: '4mm', height:'4mm'}} src={lgDg}/> 
                                    <Text style={[styles.pageNumber,{marginLeft: '2mm'}]} render={({ pageNumber, totalPages }) => (
                                        `${pageNumber}`
                                    )} fixed />
                                </View>
                                
                                <View style={styles.row}>
                                    <View style={{ width: '75mm', height: "25mm",padding: 0}}>
                                        <Text style={[styles.fontBold,styles.border,{height: '5mm',textAlign: 'center',padding:2, fontSize: "8px"}]}>
                                            PT DAGSAP ENDURA EATORE
                                        </Text>

                                        <Text style={[styles.fontBold,styles.border,{height: '19.5mm',fontSize: "8px", padding : 3, marginTop: '0',textAlign: 'left'}]}>Jl. Cahaya Raya Kav H-3 Kawasan Industri Sentul Bogor Ph. 62-2187920420, Fax. 62-21-87920409</Text>
                                    </View>

                                    <View style={{ width: '75mm', height: "25mm",marginLeft: '7mm' ,padding: 0}}>
                                        <Text style={{marginTop: 3, fontSize: '14', textDecoration : 'underline' }}>
                                        Pesanan Pembelian
                                        </Text>
                                    </View>

                                    <View style={{ width: '25mm', height: "25mm",marginLeft: '8mm' ,padding: 0}}>
                                        <Image style={{width: '24mm', height:'24mm'}} src={`https://api.qrserver.com/v1/create-qr-code/?data=${location.state.data.id_po}`}/> 
                                    </View>
                                </View>
                                <Text style={{fontSize: "4px"}}> </Text>
                                <View style={[styles.row]}>
                                    <View style={{ width: '65mm', height: "25mm",padding: 0}}>
                                        <Text style={[styles.fontBold,styles.border,{height: '5mm',textAlign: 'center',padding:2.5, fontSize: "8px"}]}>
                                            {exprovider}
                                        </Text>

                                        <Text style={[styles.fontBold,styles.border,{height: '20mm',fontSize: "8px", padding : 3,textAlign: 'left'}]}>
                                            {alamat}
                                        </Text>
                                    </View>
                                    
                                    <View style={{ width: '65mm', height: "25mm",padding: 0, marginLeft: '1mm'}}>
                                        <Text style={[styles.fontBold,styles.border,{height: '5mm',textAlign: 'center',padding:2, fontSize: "8px"}]}>
                                            Kirim Ke
                                        </Text>
                                        <Text style={[styles.fontBold,styles.border,{height : '7.4mm',marginBottom: '0.5mm' ,fontSize: "8px", padding : 2}]}>
                                            Jl. Cahaya Raya Kav H-3 Kawasan Industri Bogor
                                        </Text>
                                        <Text style={[styles.fontBold,styles.border,{height: '5mm',textAlign: 'center',padding:1, fontSize: "8px", marginTop: '1mm'}]}>
                                            Tanggal Kirim
                                        </Text>
                                        <Text style={[styles.fontBold,styles.border,{height: '7.4mm',fontSize: "8px", padding : 2,textAlign: 'center'}]}>
                                            {kirim}
                                        </Text>
                                    </View>

                                    <View style={{ width: '29mm', height: "25mm",padding: 0, marginLeft: '1mm'}}>
                                        <Text style={[styles.fontBold,styles.border,{height: '5mm',textAlign: 'center',padding:2, fontSize: "8px"}]}>
                                            Tgl PO
                                        </Text>
                                        <Text style={[styles.fontBold,styles.border,{height: '5mm',textAlign: 'center',padding:2, fontSize: "8px", marginBottom: '5mm'}]}>
                                            {tglPo}
                                        </Text>
                                        <Text style={[styles.fontBold,styles.border,{height: '5mm',textAlign: 'center',padding:2, fontSize: "8px"}]}>
                                            Syarat Pembayaran
                                        </Text>
                                        <Text style={[styles.fontBold,styles.border,{height: '5mm',textAlign: 'center',padding:2, fontSize: "8px"}]}>
                                            {bayar}
                                        </Text>
                                    </View>

                                    <View style={{ width: '29mm', height: "25mm",padding: 0, marginLeft: '1mm'}}>
                                        <Text style={[styles.fontBold,styles.border,{height: '5mm',textAlign: 'center',padding:2, fontSize: "8px"}]}>
                                            No. PO
                                        </Text>
                                        <Text style={[styles.fontBold,styles.border,{height: '5mm',textAlign: 'center',padding:2, fontSize: "8px", marginBottom: '5mm'}]}>
                                            {location.state.data.id_po}
                                        </Text>
                                        <Text style={[styles.fontBold,styles.border,{height: '5mm',textAlign: 'center',padding:2, fontSize: "8px"}]}>
                                            Nilai Tukar
                                        </Text>
                                        <Text style={[styles.fontBold,styles.border,{height: '5mm',textAlign: 'center',padding:2, fontSize: "8px"}]}>
                                            {tukar}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={[styles.row,{height: '5mm', textAlign: 'center'}]}>
                                <Text style={[styles.border,{width: '7mm', fontSize: "8px", padding: 2}]}>No</Text>
                                <Text style={[styles.border,{width: '63mm', fontSize: "8px", padding: 2}]}>Nama Barang</Text>
                                <Text style={[styles.border,{width: '19mm', fontSize: "8px", padding: 2}]}>Jumlah</Text>
                                <Text style={[styles.border,{width: '15mm', fontSize: "8px", padding: 2}]}>Satuan</Text>
                                <Text style={[styles.border,{width: '25mm', fontSize: "8px", padding: 2}]}>Harga Satuan</Text>
                                <Text style={[styles.border,{width: '19mm', fontSize: "8px", padding: 2}]}>% Diskon</Text>
                                <Text style={[styles.border,{width: '24mm', fontSize: "8px", padding: 2}]}>Jumlah Harga</Text>
                                <Text style={[styles.border,{width: '18mm', fontSize: "8px", padding: 2}]}>Div</Text>
                            </View>
                            {
                                list.map((row, i) => {
                                    const hargaSa = parseFloat(row.hargasatuan).toFixed(2);
                                    const hargaJm = parseFloat(row.jmlhHarga).toFixed(2);
                                    return(<View style={[styles.row,{textAlign: 'center'}]}>
                                        <Text style={[styles.border,{width: '7mm', padding: 3}]}>{i+1}</Text>
                                        <Text style={[styles.border,{width: '63mm', padding: 2, textAlign: 'left'}]}>{row.material}</Text>
                                        <Text style={[styles.border,{width: '19mm', padding: 2,textAlign: 'right'}]}>{row.qty}</Text>
                                        <Text style={[styles.border,{width: '15mm', padding: 2}]}>{row.satuan}</Text>
                                        <Text style={[styles.border,{width: '25mm', padding: 2,textAlign: 'right'}]}>{String(hargaSa).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                                        <Text style={[styles.border,{width: '19mm', padding: 2}]}>{row.diskon}</Text>
                                        <Text style={[styles.border,{width: '24mm', padding: 2,textAlign: 'right'}]}>{String(hargaJm).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                                        <Text style={[styles.border,styles.textsize,{fontSize: '1vw'}]}>{row.divisi}</Text>
                                    </View>
                                    )
                                })
                            }
                            <Text style={{fontSize: "6px"}}> </Text>
                            <View style={[styles.row,{height: '45mm'}]}>
                                <View style={[{width : '127mm'}]}>
                                    <View style={[styles.border,{height: '14mm', padding: "2mm", marginBottom: '1mm'}]}>
                                        <Text>Keterangan</Text>
                                        <Text>Mohon Lampirkan PO & COA saat pengiriman Barang</Text>
                                        <Text>Persetujuan supplier mohon di ttd & cap perusahaan dan mohon di fax balik</Text>
                                    </View>
                                    <View style={[styles.row]}>
                                        <View style={[styles.row,{width: '60mm',height: '30mm', textAlign: 'center'}]}>
                                            <View style={[{width: '20mm', marginTop: '2mm'}]}>
                                                <Text>Disiapkan Oleh</Text>
                                                <Image style={{width: '16mm', height:'16mm', marginLeft : '2mm', marginTop: '2mm'}} src={`https://api.qrserver.com/v1/create-qr-code/?data=Endang W`}/> 
                                                <Text style={{marginTop: '2mm'}}>Endang W</Text>
                                            </View>
                                            <View style={[{width: '20mm', marginLeft : '1mm', marginTop: '2mm'}]}>
                                                <Text>Diperiksa Oleh</Text>
                                                {stVeri ?
                                                    <Image style={{width: '16mm', height:'16mm', marginLeft : '2mm', marginTop: '2mm'}} src={`https://api.qrserver.com/v1/create-qr-code/?data=Mawi Prabudi`}/> 
                                                    :
                                                    <Text style={{width: '16mm', height:'16mm', marginLeft : '2mm', marginTop: '2mm'}}> </Text>
                                                }
                                                <Text style={{marginTop: '2mm'}}>Mawi Prabudi</Text>
                                            </View>
                                            <View style={[{width: '20mm', marginLeft : '1mm', marginTop: '2mm'}]}>
                                                <Text>Disetujui Oleh</Text>
                                                {stAppro ? 
                                                    <Image style={{width: '16mm', height:'16mm', marginLeft : '2mm', marginTop: '2mm'}} src={`https://api.qrserver.com/v1/create-qr-code/?data=Rusli Adna`}/> 
                                                    :
                                                    <Text style={{width: '16mm', height:'16mm', marginLeft : '2mm', marginTop: '2mm'}}> </Text>
                                                }
                                                <Text style={{marginTop: '2mm'}}>Rusli Adna</Text>
                                            </View>
                                        </View>
                                        <View style={{width: '65mm',height: '30mm', textAlign: 'center', marginLeft :'2mm'}}>
                                            <View style={[styles.border,{width: '65mm',height: '23mm'}]}>
                                                <Text style={[{width: '65mm',height: '8mm', padding: '2mm'}]}>
                                                    PERSETUJUAN SUPPLIER
                                                </Text>
                                                <Text style={[{width: '65mm',height: '8mm', padding: '2mm', textAlign: 'left'}]}>
                                                    Tanggal :
                                                </Text>
                                                <Text style={[{width: '65mm',height: '8mm', padding: '2mm'}]}>
                                                    Nama & Cap Perusahaan
                                                </Text>
                                            </View>
                                            <Text style={[styles.border,{width: '65mm',height: '8mm', padding: '2mm'}]}>Fax ke : 021-87920409</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={[styles.border,{width : '62mm', marginLeft: '1mm',textAlign: 'right' ,border: '0.3 solid blue'}]}>
                                    <View style={[styles.row,styles.fontBold]}>
                                        <Text style={[styles.border,{width : '31mm',height: '7.5mm', padding : '2mm'}]}>Total Sub :</Text>
                                        <Text style={[styles.border,{width : '31mm',height: '7.5mm', padding : '2mm'}]}>
                                        {String(totalSub).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                        </Text>
                                    </View>
                                    <View style={[styles.row,styles.fontBold]}>
                                        <Text style={[styles.border,{width : '31mm',height: '7.5mm', padding : '2mm'}]}>Diskon :</Text>
                                        <Text style={[styles.border,{width : '31mm',height: '7.5mm', padding : '2mm'}]}>
                                        {String(diskon).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                        </Text>
                                    </View>
                                    <View style={[styles.row,styles.fontBold]}>
                                        <Text style={[styles.border,{width : '31mm',height: '7.5mm', padding : '2mm'}]}>PPN-STANDAR :</Text>
                                        <Text style={[styles.border,{width : '31mm',height: '7.5mm', padding : '2mm'}]}>
                                        { String(totalPpn).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                        </Text>
                                    </View>
                                    <View style={[styles.row,styles.fontBold]}>
                                        <Text style={[styles.border,{width : '31mm',height: '7.5mm', padding : '2mm'}]}>{taxName} :</Text>
                                        <Text style={[styles.border,{width : '31mm',height: '7.5mm', padding : '2mm'}]}>
                                        {String(totalPph).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                        </Text>
                                    </View>
                                    <View style={[styles.row,styles.fontBold]}>
                                        <Text style={[styles.border,{width : '31mm',height: '7.5mm', padding : '2mm'}]}>B. Antar Taksir :</Text>
                                        <Text style={[styles.border,{width : '31mm',height: '7.5mm', padding : '2mm'}]}>
                                        {String(bantar).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                        </Text>
                                    </View>
                                    <View style={[styles.row,styles.fontBold]}>
                                        <Text style={[styles.border,{width : '31mm',height: '7.5mm', padding : '2mm'}]}>Total Pesan :</Text>
                                        <Text style={[styles.border,{width : '31mm',height: '7.5mm', padding : '2mm'}]}>
                                        {String(totalPesan).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            <Text style={{fontSize: "4px"}}> </Text>
                            {dtPar ? 
                                <View>
                                    <Text style={{width: '190mm',fontSize: "8px",textAlign: 'center'}}>Jadwal Pengiriman Barang</Text>
                                    <Text style={{width: '120mm',fontSize: "8px",textAlign: 'center',marginLeft: '35mm',border: '0.3mm solid black'}}></Text>
                                    <View style={[styles.row,{width: '120mm',fontSize: "8px",textAlign: 'center',marginLeft: '35mm',marginTop: '1mm'}]}>
                                        <Text style={{width : '7mm', minHeight: '6mm'}}>No</Text>
                                        <Text style={{width : '63mm',minHeight: '6mm'}}>Nama Barang</Text>
                                        <Text style={{width : '30mm',minHeight: '6mm'}}>Tanggal Datang</Text>
                                        <Text style={{width : '20mm',minHeight: '6mm'}}>Qty</Text>
                                    </View>

                                    {listPar.map((row, i) => {
                                        console.log(row)
                                        /* let bulans = (row.tglDatang).split("-");
                                        let isi =(`${bulans[2]} ${bulan[parseInt(bulans[1])]} ${bulans[0]}`); */
                                        return(
                                            <View style={[styles.row,{width: '120mm',fontSize: "8px",textAlign: 'center',marginLeft: '35mm'}]}>
                                                <Text style={[styles.border,{width : '7mm',minHeight: '6mm',padding: '1mm'}]}>
                                                    {i + 1}
                                                </Text>
                                                <Text style={[styles.border,{width : '63mm',minHeight: '6mm',padding: '1mm',textAlign: 'left'}]}>
                                                    {row.item}
                                                </Text>
                                                <Text style={[styles.border,{width : '30mm',minHeight: '6mm',padding: '1mm'}]}>
                                                    {row.tanggal}
                                                </Text>
                                                <Text style={[styles.border,{width : '20mm',minHeight: '6mm',padding: '1mm'}]}>
                                                    {row.qty}
                                                </Text>
                                            </View>
                                        )
                                    })
                                    }
                                </View>    
                            : 
                                <View>
                                    <Text></Text>
                                </View>
                        }

                            <Text style={{fontSize: "16px"}}> </Text>
                            
                            {dtNote ?
                                <View>
                                <Text style={[styles.fontBold,{fontSize: "8px",marginBottom:'2mm'}]}>Note</Text>
                                <Text style={{fontSize: "8px",border: '0.3mm solid black', padding: '2mm'}}>{note}</Text>
                                </View>
                                 :
                                 <Text style={{fontSize: "16px"}}> </Text>
                            }
                            
                        </View>
                    </Page>
                </Document>
                
            </PDFViewer>
        </div>

        <Modal show={show} size="lg" centered  scrollable={true}>
            <Modal.Header>
                <Modal.Title>Pilih Data Parsial</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{height: screenHeight}}>
                <div>
                {
                    inputList?.map((e,i) =>{
                        let bln = format(new Date(e.tanggal), "MMMM", { locale: id });
                        let tahu = format(new Date(e.tanggal), "yyyy", { locale: id });
                        let day = format(new Date(e.tanggal), "dd", { locale: id });
                        const tg = `${day} ${bln} ${tahu}`;
                        return(
                            <div className="input-group mb-1">
                                <div className="input-group-text">
                                    <input className="form-check-input mt-0" type="checkbox" value={i} onClick={(e)=>handleSelect(e)}/>
                                </div>
                                <input type="text" className="form-control" value={`${tg} ${e.nama} Qty : ${e.qty}`}/>
                            </div>
                        )
                    })
                }
                </div>
                
            </Modal.Body>
            <Modal.Header>
                <Modal.Title>Note</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{height: screenHeight - 500}}>
                    <Form>
                    <Form.Group as={Col} controlId="formGridArea">
                        <Form.Label>Keterangan</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            aria-label="With textarea" 
                            value={note}
                            onChange={(e) => {
                                console.log(e.target.value)
                                setNote(e.target.value)
                            }}
                            
                        />
                    </Form.Group>
                    </Form>
                </div>
                
            </Modal.Body>
            <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={handleChange}>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>

        

        {isLoading ? <LoadingPage /> : ""}
    </>
  )
}
