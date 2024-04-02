import React, { useEffect, useState } from 'react';
import Swal from "sweetalert2";
import { Breadcrumb, Stack } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
// import useAuthStore, { selectUser } from '../../../store/authLogin';
import lgDg from '../../assets/img/dee.png'
import { LoadingPage } from '../../LoadingPage/LoadingPage';
import { PDFViewer } from "@react-pdf/renderer";
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  body: {
      paddingTop: 25,
      paddingBottom: 35,
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
      marginBottom: 20,
      textAlign: 'center',
      color: 'black',
    },
  pageNumber: {
      fontSize: '8px',
  },
});

export const CetakOkp = () => {
    // const userData = useAuthStore(selectUser);
    const navigate = useNavigate();
    const location = useLocation();

    const dataOKP = location.state.data;
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
    const [isLoading, setIsLoading] = useState(false);

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
            console.log(dataOKP)
            console.log(dataOKP.okp)
            setIsLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
    
    
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
                        <View style={[styles.border,{ width: '55mm', height: "15mm",padding: 0}]}>
                          <Image style={{width: '10mm', height:'10mm',padding : 1, marginLeft :'22mm'}} src={lgDg}/> 
                          <Text style={[styles.fontBold,{height: '5mm',textAlign: 'center',padding:2, fontSize: "8px"}]}>
                            PT DAGSAP ENDURA EATORE
                          </Text>
                        </View>
                        <View style={{ width: '80mm', height: "15mm",padding: 0}}>
                          <Text style={[styles.fontBold,styles.border,{height: '15mm',textAlign: 'center',padding:2, fontSize: "12px",paddingTop: 10}]}>
                            ORDER KERJA PRODUKSI(OKP)
                          </Text>
                        </View>
                        <View style={[styles.border,{ width: '30mm', height: "15mm",padding: 0}]}>
                          <Text style={[styles.fontBold,{height: '5mm',textAlign: 'left',padding:2, fontSize: "8px"}]}>
                            Nomor Dokumen
                          </Text>
                          <Text style={[styles.fontBold,{height: '5mm',textAlign: 'left',padding:2, fontSize: "8px"}]}>
                            Revisi
                          </Text>
                          <Text style={[styles.fontBold,{height: '5mm',textAlign: 'left',padding:2, fontSize: "8px"}]}>
                            Tanggal Efektif
                          </Text>
                        </View>
                        <View style={[styles.border,{ width: '35mm', height: "15mm",padding: 0}]}>
                          <Text style={[styles.fontBold,{height: '5mm',textAlign: 'left',padding:2, fontSize: "8px"}]}>
                            : FRM.PPIC.01.01
                          </Text>
                          <Text style={[styles.fontBold,{height: '5mm',textAlign: 'left',padding:2, fontSize: "8px"}]}>
                            : 01
                          </Text>
                          <Text style={[styles.fontBold,{height: '5mm',textAlign: 'left',padding:2, fontSize: "8px"}]}>
                            : 11 Sept 2020
                          </Text>
                        </View>
                      </View>
                    </View>
                    
                    <View style={styles.row}>
                      <View style={[{ width: '15mm', height: "20mm",padding: 0}]}>
                        <Text style={[styles.fontBold,{height: '5mm',textAlign: 'left',padding:2, fontSize: "8px"}]}>
                          No OKP
                        </Text>
                        <Text style={[styles.fontBold,{height: '5mm',textAlign: 'left',padding:2, fontSize: "8px"}]}>
                          Tanggal
                        </Text>
                        <Text style={[styles.fontBold,{height: '5mm',textAlign: 'left',padding:2, fontSize: "8px"}]}>
                          Revisi 
                        </Text>
                        <Text style={[styles.fontBold,{height: '5mm',textAlign: 'left',padding:2, fontSize: "8px"}]}>
                          Tgl Revisi
                        </Text>
                      </View>
                      <View style={[{ width: '40mm', height: "20mm",padding: 0}]}>
                        <Text style={[styles.fontBold,{height: '5mm',textAlign: 'left',padding:2, fontSize: "8px"}]}>
                          : {location.state.data.okp[0]?.okp}
                        </Text>
                        <Text style={[styles.fontBold,{height: '5mm',textAlign: 'left',padding:2, fontSize: "8px"}]}>
                          : {location.state.data.okp[0]?.tangOKP}
                        </Text>
                        <Text style={[styles.fontBold,{height: '5mm',textAlign: 'left',padding:2, fontSize: "8px"}]}>
                          : {location.state.data.okp[0]?.revisi} 
                        </Text>
                        <Text style={[styles.fontBold,{height: '5mm',textAlign: 'left',padding:2, fontSize: "8px"}]}>
                          : {location.state.data.okp[0]?.tangRev}
                        </Text>
                      </View>
                      <View style={{ width: '80mm', height: "15mm",padding: 0}}></View>
                      <View style={[{ width: '30mm', height: "20mm",padding: 0}]}>
                        <Text style={[styles.fontBold,{height: '5mm',textAlign: 'left',padding:2, fontSize: "8px"}]}></Text>
                        <Text style={[styles.fontBold,{height: '5mm',textAlign: 'left',padding:2, fontSize: "8px"}]}>
                          Tgl Produksi
                        </Text>
                        <Text style={[styles.fontBold,{height: '5mm',textAlign: 'left',padding:2, fontSize: "8px"}]}>
                          Shift 
                        </Text>
                        <Text style={[styles.fontBold,{height: '5mm',textAlign: 'left',padding:2, fontSize: "8px"}]}></Text>
                      </View>
                      <View style={[{ width: '35mm', height: "20mm",padding: 0}]}>
                        <Text style={[styles.fontBold,{height: '5mm',textAlign: 'left',padding:2, fontSize: "8px"}]}></Text>
                        <Text style={[styles.fontBold,{height: '5mm',textAlign: 'left',padding:2, fontSize: "8px"}]}>
                          : {location.state.data.okp[0]?.tangProd}
                        </Text>
                        <Text style={[styles.fontBold,{height: '5mm',textAlign: 'left',padding:2, fontSize: "8px"}]}>
                          : 1|2|3 
                        </Text>
                        <Text style={[styles.fontBold,{height: '5mm',textAlign: 'left',padding:2, fontSize: "8px"}]}></Text>
                      </View>
                    </View>


                  </View>
                </Page>
              </Document>

          </PDFViewer>
            
        </div>

        {isLoading ? <LoadingPage /> : ""}
    </>
  )
}
