import React, { useEffect, useState } from 'react';
import Swal from "sweetalert2";
import { format } from "date-fns";
import id from 'date-fns/locale/id';

import { Breadcrumb, Stack } from 'react-bootstrap';
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
import useAuthStore, { selectUser } from '../../store/DataUser';

/* const styles = StyleSheet.create({
    body: {
        paddingTop: 25,
        paddingBottom: 35,
        paddingHorizontal: 35,
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
        marginBottom: 20,
        textAlign: 'center',
        color: 'black',
      },
    pageNumber: {
        fontSize: '8px',
    },
}); */

const styles = StyleSheet.create({
    body: {
        paddingTop: 25,
        paddingBottom: 25,
        paddingHorizontal: 25,
    },
    page: {
        padding: '5px',
        alignItems: 'center',
        textAlign: 'center'
    },
    table: {
      width: '100%',
    },
    image: {
      width: '30',
      height: '30'
    },
    row: {
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: 'white',
      fontSize: '8px',
      border: '0.5px solid black',
      borderRight: '0.5px solid black'
    },
    header: {
        fontSize: '8px',
        backgroundColor: '#999',
        paddingTop: 2,
    },
    header1: {
        borderBottom: '0.5px solid black',
        fontSize: '8px',
        fontWeight: 'bold',
        paddingTop: 2
    },
    spasi:{
      marginTop: '3px',
      fontSize: '8px',
      border: 'none',
      textAlign: 'left',
      fontWeight: 'bold'
    },
    spasi1:{
      fontSize: '5px',
      border: 'none'
    },
    spasi2:{
      marginTop: '3px',
      fontSize: '6px',
      border: 'none',
      textAlign: 'left',
      fontWeight: 'bold'
    },
    spasi3:{
      marginTop: '3px',
      fontSize: '8px',
      border: 'none',
      textAlign: 'left',
      fontWeight: 'bold'
    },
    bold: {
      fontWeight: 'bold',
    },
    row1: {
      width: '5%',
      borderRight: '0.5px solid black',
      borderBottom: '0.5px solid black',
      paddingTop: 2
    },
    row2: {
      width: '20%',
      borderRight: '0.5px solid black',
      borderBottom: '0.5px solid black',
      paddingTop: 2,
      paddingLeft : 5
    },
    row3: {
      width: '10%',
      borderRight: '0.5px solid black',
      borderBottom: '0.5px solid black',
      paddingTop: 2,
    },
    row4: {
      width: '15%',
      borderRight: '0.5px solid black',
      borderBottom: '0.5px solid black',
      paddingTop: 2
    },
    row5: {
      width: '25%',
      borderRight: '0.5px solid black',
      borderBottom: '0.5px solid black',
      height: 15,
      paddingTop: 2,
      paddingLeft : 5
    },
    row6: {
      width: '35%',
      borderRight: '0.5px solid black',
      borderBottom: '0.5px solid black',
      height: 15,
      paddingTop: 2,
      paddingLeft : 5
    },
    row7: {
      width: '40%',
      borderRight: '0.5px solid black',
      borderBottom: '0.5px solid black',
      paddingTop: 2
    },
    row8: {
      width: '12%',
      borderRight: '0.5px solid black',
      borderBottom: '0.5px solid black',
      paddingTop: 2
    },
    row9: {
      width: '3%',
      borderRight: '0.5px solid black',
      borderBottom: '0.5px solid black',
      paddingTop: 2
    },
  })

export const CetakPengadaan = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const userData = useAuthStore(selectUser);


    const tHeigt = parseInt(window.innerHeight);
    let tWidth = 0;
    if(parseInt(window.innerWidth) < 1022){
        tWidth = parseInt(window.innerWidth) - 30;
    }
    else{
        tWidth = parseInt(window.innerWidth) - 99 ;
    }
    const [isLoading, setIsLoading] = useState(false);
    const [screenWidth, setScreenWidth] = useState(tWidth);
    const [screenHeight, setScreenHeight] = useState(tHeigt);
    const [dataPengadaan, setDataPengadaan] = useState([]);
    const [list, setList] = useState([]);
    const [img, setImg] = useState([])

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
            navigate(`/main/${userData.user_divisi}/Pengadaan`);
            Swal.fire('Info','Harap kembali ke halaman permintaan data tidak lengkap', 'info')
        }
        else{
            console.log(userData)
            setDataPengadaan(location.state.data);
            const iptData = [
                {
                  pengesahan : "Tanggal",
                  diajukan : "",
                  disetujui : "",
                  register : "",
                },
                {
                  pengesahan : "Nama",
                  diajukan : `${userData.uname}`,
                  disetujui : "Rusli Adna",
                  register : "Endang Wahyu W" 
                },
                {
                  pengesahan : "Jabatan",
                  diajukan : `${userData.ujabatan}`,
                  disetujui : "Plan Manager",
                  register : "Supervisor" 
                },
                {
                  pengesahan : "Departemen",
                  diajukan : `${userData.udivisi}`,
                  disetujui : "",
                  register : "Purchasing" 
                },
            ]
            setList(iptData);
            setImg([
                {
                  pengesahan : "Tanda tangan",
                  diajukan : `https://api.qrserver.com/v1/create-qr-code/?data=${userData.uname}`,
                  disetujui : `https://api.qrserver.com/v1/create-qr-code/?data=Rusli Adna`,
                  register : `https://api.qrserver.com/v1/create-qr-code/?data=Endang Wahyu W`
                }
              ])
            cekData();
            setIsLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

    const cekData = () =>{
        console.log(location.state.data);
        setIsLoading(false);
    }
  return (
    <>
        <div className='setContain'>
            <Stack direction="horizontal" gap={3} style={{padding: "0px 10px 0px 10px"}}>
                <div className="bg-body">
                <div>
                    <Breadcrumb>
                        <Breadcrumb.Item onClick={() =>navigate(`/form`)}>Form</Breadcrumb.Item>
                        <Breadcrumb.Item onClick={() =>navigate('/form/pengadaan')}>Tabel Pengadaan</Breadcrumb.Item>
                        <Breadcrumb.Item active>Print View Pengadaan</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                </div>
                <div className="ms-auto"></div>
                <div className="bg-body">
                </div>
            </Stack>

            <PDFViewer style={{width: screenWidth, height: screenHeight,padding:8}}>
                <Document>
                    <Page size="A4" style={styles.body}>
                    <View style={styles.table}>
                        <Text style={styles.spasi}> </Text>
                        <View style={styles.row}>
                          <View style={[styles.row5, {  height: 60,alignItems : 'center',padding: 3 }]}>
                            <Image style={[styles.row5, {  height: 60,width: 70, border: 'none' }]} src={lgDg}/>
                            <Text style={styles.spasi2}>PT DAGSAP ENDURA EATORE</Text>
                          </View>
    
                          <View style={[styles.row7, {  height: 60,alignItems : 'center',padding: 8 }]}>
                            <Text style={{ textAlign: 'center', fontSize: '13',paddingTop: 13 }}>PERMINTAAN PENGADAAN</Text>
                          </View>
                          
                          <View style={[styles.row8, { height: 60,padding: 2 }]}>
                            <Text style={[styles.spasi3, { height: 15 }]}>Nomor Dokumen</Text>
                            <Text style={[styles.spasi3, { height: 15 }]}>Revisi</Text>
                            <Text style={[styles.spasi3, { height: 15 }]}>Tanggal Efektif</Text>
                            <Text style={[styles.spasi3, { height: 15 }]}>Halaman</Text>
                          </View>
    
                          <View style={[styles.row9, { height: 60,alignItems : 'center',padding: 2 }]}>
                            <Text style={[styles.spasi3, { height: 15 }]}>:</Text>
                            <Text style={[styles.spasi3, { height: 15 }]}>:</Text>
                            <Text style={[styles.spasi3, { height: 15 }]}>:</Text>
                            <Text style={[styles.spasi3, { height: 15 }]}>:</Text>
                          </View>
    
                          <View style={[styles.row2, { height: 60,padding: 2 }]}>
                            <Text style={[styles.spasi3, { height: 15 }]}>FRM.PUR.02.01</Text>
                            <Text style={[styles.spasi3, { height: 15 }]}>00</Text>
                            <Text style={[styles.spasi3, { height: 15 }]}>06 Mei 2013</Text>
                            <Text style={[styles.spasi3, { height: 15 }]}>1 dari 1</Text>
                          </View>
                        
                        </View>
                        <Text style={styles.spasi}> </Text>
    
                        <View style={[styles.row, styles.header, styles.bold,{textAlign: 'center'}]}>
                            <Text style={styles.row1}>No</Text>
                            <Text style={styles.row2}>Nama Material (kode)</Text>
                            <Text style={styles.row3}>Stok Ditangan</Text>
                            <Text style={styles.row3}>Jumlah Order</Text>
                            <Text style={styles.row3}>Tgl.Terima</Text>
                            <Text style={styles.row3}>Supplier</Text>
                            <Text style={styles.row4}>Harga Satuan</Text>
                            <Text style={styles.row2}>Keterangan</Text>
                        </View>
    
                        <View style={[styles.row, styles.bold,{textAlign: 'center'}]}>
                            <Text style={[styles.row1,{height: 15}]}>a</Text>
                            <Text style={[styles.row2,{height: 15}]}>b</Text>
                            <Text style={[styles.row3,{height: 15}]}>c</Text>
                            <Text style={[styles.row3,{height: 15}]}>d</Text>
                            <Text style={[styles.row3,{height: 15}]}>e</Text>
                            <Text style={[styles.row3,{height: 15}]}>f</Text>
                            <Text style={[styles.row4,{height: 15}]}>g</Text>
                            <Text style={[styles.row2,{height: 15}]}>h</Text>
                        </View>
    
                        <Text style={styles.spasi1}> </Text>
    
                        {dataPengadaan.map((row, i) => {
                        //   console.log(row.spesifikasi)
                          let t_terima = [];
                          let suply = []
                          for(let x = 0;x < row.parsial_data.length ; x++){
                            let bln = format(new Date(row.parsial_data[x].tglDatang), "MMMM", { locale: id });
                            let tahu = format(new Date(row.parsial_data[x].tglDatang), "yyyy", { locale: id });
                            let day = format(new Date(row.parsial_data[x].tglDatang), "dd", { locale: id });
                            t_terima.push(`${day} ${bln} ${tahu}`)
                            if(row.parsial_data[x].expro !== ""){suply.push(`${row.parsial_data[x].expro}`)}
                          }
                          //
                          return(
                            <View key={i} style={styles.row} wrap={true}>
                              <View style={[styles.row1, {borderBottom:'none'}]}>
                                <Text style={{padding: 2, textAlign: 'center'}}>{row.id_Pengadaan}</Text>
                              </View>
                              <View style={[styles.row2, {borderBottom:'none'}]}>
                                <Text style={{padding: 3, textAlign: 'left'}}>{row.spesifikasi}</Text>
                              </View>
                              <View style={[styles.row3, {borderBottom:'none'}]}>
                                <Text style={{padding: 2, textAlign: 'center'}}>{}</Text>
                              </View>
                              <View style={[styles.row3, {borderBottom:'none'}]}>
                                <Text style={{padding: 2, textAlign: 'center'}}>{row.qty_pengadaan[0].order+' '+row.qty_pengadaan[0].satuan }</Text>
                              </View>
                              <View style={[styles.row3, {borderBottom:'none'}]}>
                                <Text style={{padding: 2, textAlign: 'center'}}>{t_terima}</Text>
                              </View>
                              <View style={[styles.row3, {borderBottom:'none'}]}>
                                <Text style={{padding: 2, textAlign: 'left'}}>{}</Text>  
                              </View>
                              <View style={[styles.row4, {borderBottom:'none'}]}>
                                <Text style={{padding: 2, textAlign: 'left'}}>{}</Text>
                              </View>
                              <View style={[styles.row2, {borderBottom:'none'}]}>
                                <Text style={{padding: 2, textAlign: 'left'}}>{}</Text>
                              </View>
                            
                            </View>
                          )
    
                        })}
    
                        <Text style={styles.spasi}>Keterangan : Kolom (a) sampai dengan (e) diisi pemohon, kolom (f) dan (g) diisi purchasing</Text>
    
                        <Text style={styles.spasi}> </Text>
    
                        <View style={[styles.row, styles.header1, styles.bold,{textAlign: 'center'}]}>
                            <Text style={styles.row5}>Pengesahan</Text>
                            <Text style={styles.row2}>Diajukan</Text>
                            <Text style={styles.row2}>Disetujui</Text>
                            <Text style={styles.row6}>Registrasi Purchasing</Text>
                        </View>
    
                        {list.map((row, i) => (
                          <View key={i} style={styles.row} wrap={true}>
                            <Text style={[styles.row5, {borderBottom:'none'}]}>{row.pengesahan}</Text>
                            <Text style={[styles.row2, {borderBottom:'none'}]}>{row.diajukan}</Text>
                            <Text style={[styles.row2, {borderBottom:'none'}]}>{row.disetujui}</Text>
                            <Text style={[styles.row6, {borderBottom:'none'}]}>{row.register}</Text>
                          </View>
                        ))}
    
                        {img.map((row, i) => (
                          <View style={[styles.row,{alignItems : 'center'}]}>
                            <Text style={[styles.row5, {  height: 40,paddingTop: 15,alignItems : 'center'}]}>Tanda tangan</Text>
                            <View style={[styles.row2, {  height: 40,alignItems : 'center',padding: 8 }]}>
                              <Image style={[styles.row2, {  height: 40,width: 30 }]} src={row.diajukan}/>
                            </View>
                            
                            <View style={[styles.row2, {  height: 40,alignItems : 'center',padding: 8 }]}>
                              
                            </View>
    
                            
                            <View style={[styles.row6, {  height: 40,alignItems : 'center',padding: 8 }]}>
                              
                            </View>
                          
                          </View>
                        ))}
    
                        
    
                    </View>
                    </Page>
                </Document>
            </PDFViewer>
        </div>

        {isLoading ? <LoadingPage /> : ""}
    </>
  )
}
