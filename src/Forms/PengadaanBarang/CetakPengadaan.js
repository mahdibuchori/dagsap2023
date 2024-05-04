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

const styles = StyleSheet.create({
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
});

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
                  <View>
                    <View style={styles.header} fixed>
                      <View style={[styles.row,{marginLeft: '185mm',marginBottom: '2mm'}]}>
                        <Image style={{width: '4mm', height:'4mm'}} src={lgDg}/> 
                        <Text style={[styles.pageNumber,{marginLeft: '2mm'}]} render={({ pageNumber, totalPages }) => (
                            `${pageNumber}`
                        )} fixed />
                      </View>
                      <View style={styles.row}>
                        <View style={[styles.border,{ width: '55mm', height: "20mm",padding: 0}]}>
                          <Image style={{width: '18mm', height:'18mm',marginLeft:'18.5mm',padding: 2}} src={lgDg}/> 
                          <Text style={[styles.fontBold,{height: '5mm',textAlign: 'center',padding:2, fontSize: "6px"}]}>
                            PT DAGSAP ENDURA EATORE
                          </Text>
                        </View>
                        <View style={[styles.border,{ width: '80mm', height: "20mm",padding: 0}]}>
                          <Text style={{marginTop: 10, fontSize: '14' }}>
                            Permintaan Pengadaan
                          </Text>
                        </View>
                        <View style={[styles.border,{ width: '27mm', height: "20mm",padding: 0}]}>
                          <Text style={[styles.fontBold,{height: '5mm',textAlign: 'left',padding:2, fontSize: "8px"}]}>
                          Nomor Dokumen
                          </Text>
                          <Text style={[styles.fontBold,{height: '5mm',textAlign: 'left',padding:2, fontSize: "8px"}]}>
                          Revisi   
                          </Text>
                          <Text style={[styles.fontBold,{height: '5mm',textAlign: 'left',padding:2, fontSize: "8px"}]}>
                          Tanggal Efektif    
                          </Text>
                          <Text style={[styles.fontBold,{height: '5mm',textAlign: 'left',padding:2, fontSize: "8px"}]}>
                          Halaman   
                          </Text>
                        </View>
                        <View style={[styles.border,{ width: '3mm', height: "20mm",padding: 0}]}>
                          <Text style={[styles.fontBold,{height: '5mm',textAlign: 'left',padding:2, fontSize: "8px"}]}>:</Text>
                          <Text style={[styles.fontBold,{height: '5mm',textAlign: 'left',padding:2, fontSize: "8px"}]}>:</Text>
                          <Text style={[styles.fontBold,{height: '5mm',textAlign: 'left',padding:2, fontSize: "8px"}]}>:</Text>
                          <Text style={[styles.fontBold,{height: '5mm',textAlign: 'left',padding:2, fontSize: "8px"}]}>:</Text>
                        </View>
                        <View style={[styles.border,{ width: '30mm', height: "20mm",padding: 0}]}>
                          <Text style={[styles.fontBold,{height: '5mm',textAlign: 'left',padding:2, fontSize: "8px"}]}>
                          FRM.PUR.02.01
                          </Text>
                          <Text style={[styles.fontBold,{height: '5mm',textAlign: 'left',padding:2, fontSize: "8px"}]}>
                          00 
                          </Text>
                          <Text style={[styles.fontBold,{height: '5mm',textAlign: 'left',padding:2, fontSize: "8px"}]}>
                          06 Mei 2013  
                          </Text>
                          <Text style={[styles.fontBold,{height: '5mm',textAlign: 'left',padding:2, fontSize: "8px"}]}>
                          1 dari 1
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View style={[styles.row,{textAlign: 'center'}]}>
                      <Text style={[styles.border,{width: '20mm', fontSize: "7.5px", padding: 2}]}>No</Text>
                      <Text style={[styles.border,{width: '45mm', fontSize: "7.5px", padding: 2}]}>Nama Material (kode)</Text>
                      <Text style={[styles.border,{width: '19mm', fontSize: "7.5px", padding: 2}]}>Stok Ditangan</Text>
                      <Text style={[styles.border,{width: '19mm', fontSize: "7.5px", padding: 2}]}>Jumlah Order</Text>
                      <Text style={[styles.border,{width: '19mm', fontSize: "7.5px", padding: 2}]}>Tgl.Terima</Text>
                      <Text style={[styles.border,{width: '25mm', fontSize: "7.5px", padding: 2}]}>Supplier</Text>
                      <Text style={[styles.border,{width: '19mm', fontSize: "7.5px", padding: 2}]}>Harga Satuan</Text>
                      <Text style={[styles.border,{width: '25mm', fontSize: "7.5px", padding: 2}]}>Keterangan</Text>
                    </View>
                    <View style={[styles.row,{textAlign: 'center'}]}>
                      <Text style={[styles.border,{width: '20mm', fontSize: "7.5px", padding: 2}]}>a</Text>
                      <Text style={[styles.border,{width: '45mm', fontSize: "7.5px", padding: 2}]}>b</Text>
                      <Text style={[styles.border,{width: '19mm', fontSize: "7.5px", padding: 2}]}>c</Text>
                      <Text style={[styles.border,{width: '19mm', fontSize: "7.5px", padding: 2}]}>d</Text>
                      <Text style={[styles.border,{width: '19mm', fontSize: "7.5px", padding: 2}]}>e</Text>
                      <Text style={[styles.border,{width: '25mm', fontSize: "7.5px", padding: 2}]}>f</Text>
                      <Text style={[styles.border,{width: '19mm', fontSize: "7.5px", padding: 2}]}>g</Text>
                      <Text style={[styles.border,{width: '25mm', fontSize: "7.5px", padding: 2}]}>h</Text>
                    </View>
                    <Text style={{fontSize: "5px"}}> </Text>

                    {dataPengadaan.map((row, i) => {
                      let t_terima = [];
                      let suply = []
                      for(let x = 0;x < row.parsial_data.length ; x++){
                        let bln = format(new Date(row.parsial_data[x].tglDatang), "MMMM", { locale: id });
                        let tahu = format(new Date(row.parsial_data[x].tglDatang), "yyyy", { locale: id });
                        let day = format(new Date(row.parsial_data[x].tglDatang), "dd", { locale: id });
                        t_terima.push(`${day} ${bln} ${tahu}`)
                        if(row.parsial_data[x].expro !== ""){suply.push(`${row.parsial_data[x].expro}`)}
                      }
                      console.log(row)
                      let nama = "";
                      if(row.tipeMaterial === "" || row.tipeMaterial === undefined){
                        nama = row.spesifikasi
                      }
                      else{
                        nama = row.tipeMaterial
                      }
                      return(
                        <View style={[styles.row,{textAlign: 'left'}]}>
                          <Text style={[styles.border,{width: '20mm', fontSize: "7.5px", padding: 2}]}>{row.id_Pengadaan}</Text>
                          <Text style={[styles.border,{width: '45mm', fontSize: "7.5px", padding: 2}]}>{nama}</Text>
                          <Text style={[styles.border,{width: '19mm', fontSize: "7.5px", padding: 2,textAlign: 'right'}]}>
                          {row.qty_pengadaan[0].order+' '+row.qty_pengadaan[0].satuan }
                          </Text>
                          <Text style={[styles.border,{width: '19mm', fontSize: "7.5px", padding: 2}]}>{t_terima}</Text>
                          <Text style={[styles.border,{width: '19mm', fontSize: "7.5px", padding: 2}]}></Text>
                          <Text style={[styles.border,{width: '25mm', fontSize: "7.5px", padding: 2}]}></Text>
                          <Text style={[styles.border,{width: '19mm', fontSize: "7.5px", padding: 2}]}></Text>
                          <Text style={[styles.border,{width: '25mm', fontSize: "7.5px", padding: 2}]}></Text>
                        </View>
                      )

                    })}
                    <Text style={{fontSize: "5px"}}> </Text>
                    <Text style={{fontSize: "5px"}}>Keterangan : Kolom (a) sampai dengan (e) diisi pemohon, kolom (f) dan (g) diisi purchasing</Text>
                    <Text style={{fontSize: "10px"}}> </Text>

                    <View style={[styles.row,{textAlign: 'center'}]}>
                      <Text style={[styles.border,styles.fontBold,{height:'10mm', width: '47.5mm', fontSize: "8px", padding: 2,paddingTop: 7}]}>
                        Pengesahan
                      </Text>
                      <Text style={[styles.border,styles.fontBold,{height:'10mm', width: '47.5mm', fontSize: "8px", padding: 2,paddingTop: 7}]}>
                        Diajukan
                      </Text>
                      <Text style={[styles.border,styles.fontBold,{height:'10mm', width: '47.5mm', fontSize: "8px", padding: 2,paddingTop: 7}]}>
                        Disetujui
                      </Text>
                      <Text style={[styles.border,styles.fontBold,{height:'10mm', width: '47.5mm', fontSize: "8px", padding: 2,paddingTop: 7}]}>
                        Registerasi Purchasing
                      </Text>
                    </View>

                    {list.map((row, i) => (
                      <View style={[styles.row,{textAlign: 'center'}]}>
                        <Text style={[styles.border,styles.fontBold,{height:'5mm', width: '47.5mm', fontSize: "8px", padding: 2}]}>
                          {row.pengesahan}
                        </Text>
                        <Text style={[styles.border,styles.fontBold,{height:'5mm', width: '47.5mm', fontSize: "8px", padding: 2}]}>
                          {row.diajukan}
                        </Text>
                        <Text style={[styles.border,styles.fontBold,{height:'5mm', width: '47.5mm', fontSize: "8px", padding: 2}]}>
                          {row.disetujui}
                        </Text>
                        <Text style={[styles.border,styles.fontBold,{height:'5mm', width: '47.5mm', fontSize: "8px", padding: 2}]}>
                          {row.register}
                        </Text>
                      </View>
                    ))}

                    {img.map((row, i) => (
                      <View style={[styles.row,{textAlign: 'center'}]}>
                        <Text style={[styles.border,styles.fontBold,{height:'25mm', width: '47.5mm', fontSize: "8px", padding: 2,paddingTop: '11.5mm'}]}>
                          Tanda Tangan
                        </Text>
                        <View style={[styles.border,styles.fontBold,{height:'25mm', width: '47.5mm', fontSize: "8px", padding: 2}]}>
                          <Image style={{width: '18mm', height:'18mm',marginLeft:'14.75mm',padding: 2}} src={row.diajukan}/> 
                        </View>
                        <Text style={[styles.border,styles.fontBold,{height:'25mm', width: '47.5mm', fontSize: "8px", padding: 2}]}>
                          
                        </Text>
                        <Text style={[styles.border,styles.fontBold,{height:'25mm', width: '47.5mm', fontSize: "8px", padding: 2}]}>
                          
                        </Text>
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
