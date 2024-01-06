import React, { useEffect, useState } from 'react';
import Swal from "sweetalert2";

import { Breadcrumb } from 'react-bootstrap';
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
        paddingTop: 10,
        paddingBottom: 10,
        paddingHorizontal: 7.5,
    },
    page: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        margin : '5mm',
        border: 'none'
    },
    image: {
        width: '30',
        height: '30'
    },
    row: {
        width : '100mm',
        display: 'flex',
        flexDirection: 'row',
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
    centerd: {
        display : 'flex',
        justifyContent : 'center',
        alignItems : 'center',
        border : '1px solid black'
    },
});

export const LabelPrint = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const userData = useAuthStore(selectUser);
    const [kode, setKode] = useState('');
    const [detail, setDetail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

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
            navigate(`/main/${userData.user_divisi}/Pengadaan`);
            Swal.fire('Info','Harap kembali ke halaman permintaan data tidak lengkap', 'info')
        }
        else{
            console.log(location.state.data)
            setKode(location.state.data.kode_item)
            setDetail({
                kode : location.state.data.kode_item,
                expro : location.state.data.eks_provider,
                noLot : location.state.data.no_lot,
                baq : location.state.data.kode_item,
                qty : location.state.data.qty_trma
            })
            cekData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

    const cekData = () =>{
        setIsLoading(false);
    }
    return (
        <>
            <div className='setContain'>
                <div className="bg-body">
                    <Breadcrumb className='bg-body'>
                    <Breadcrumb.Item onClick={() =>navigate(`/form`)}>Form</Breadcrumb.Item>
                    <Breadcrumb.Item onClick={() => navigate(`/form/kedatangan`)}>Terima Barang & Log Book</Breadcrumb.Item>
                    <Breadcrumb.Item onClick={() => navigate(`/form/Kedatangan/logbookview`,{state:{
                        data : location.state.data
                    }})}>View Log Book</Breadcrumb.Item>
                    <Breadcrumb.Item active>Label Terima Barang</Breadcrumb.Item>
                    </Breadcrumb>
                </div>

                <PDFViewer style={{width: screenWidth, height: screenHeight,padding:8}}>
                    <Document>
                        <Page size="A6" style={styles.body}>
                            <View>
                                <View style={styles.header} fixed>
                                    <View style={[styles.row,{marginLeft: '95mm',marginBottom: '2mm'}]}>
                                        <Image style={{width: '6mm', height:'6mm'}} src={lgDg}/>
                                    </View>
                                </View>
                                <View style={styles.row}>
                                    <View style={[styles.centerd,{width: '32mm', height: "20mm"}]}>
                                        <Image style={{width: '20mm', height:'15mm'}} src={lgDg}/>
                                    </View>
                                    
                                    <View style={[styles.centerd,{width: '75mm', height: "20mm"}]}>
                                        <Text style={{fontSize: '14'}}>
                                        Label Warehouse
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.row}>
                                    <View style={{width: '32mm', height: "5mm", display : 'flex', border : '1px solid black', justifyContent : 'center'}}>
                                        <Text style={{fontSize: '6', marginLeft : '1mm'}}>
                                            Nama Barang
                                        </Text>
                                    </View>
                                    
                                    <View style={[styles.centerd,{width: '75mm', height: "5mm"}]}>
                                        <Text style={{fontSize: '6'}}>
                                        {kode}
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.row}>
                                    <View style={{width: '30mm', height: "39mm", display: 'flex'}}>
                                        <View style={{width: '30mm', height: "13mm", display : 'flex', border : '1px solid black', justifyContent : 'center'}}>
                                            <Text style={{fontSize: '6', marginLeft : '1mm'}}>
                                                Total Terima barang
                                            </Text>
                                        </View>
                                        <View style={{width: '30mm', height: "13mm", display : 'flex', border : '1px solid black', justifyContent : 'center'}}>
                                            <Text style={{fontSize: '6', marginLeft : '1mm'}}>
                                                Rincian Qty Terima
                                            </Text>
                                        </View>
                                        <View style={{width: '30mm', height: "13mm", display : 'flex', border : '1px solid black', justifyContent : 'center'}}>
                                            <Text style={{fontSize: '6', marginLeft : '1mm'}}>
                                                Rincian Per Palet
                                            </Text>
                                        </View>
                                    </View>
                                    
                                    <View style={{width: '40mm', height: "39mm", display: 'flex'}}>
                                        <View style={{width: '40mm', height: "13mm", display : 'flex', border : '1px solid black', justifyContent : 'center'}}>
                                            <Text style={{fontSize: '6', marginLeft : '1mm'}}>
                                                {`${location.state.data.qty_trma} ${location.state.data.unit}`}
                                            </Text>
                                        </View>
                                        <View style={{width: '40mm', height: "13mm", display : 'flex', border : '1px solid black', justifyContent : 'center'}}>
                                            <Text style={{fontSize: '6', marginLeft : '1mm'}}>
                                                {location.state.data.rincian_bar}
                                            </Text>
                                        </View>
                                        <View style={{width: '40mm', height: "13mm", display : 'flex', border : '1px solid black', justifyContent : 'center'}}>
                                            <Text style={{fontSize: '6', marginLeft : '1mm'}}>
                                                
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={[styles.centerd,{width: '30mm', height: "39mm"}]}>
                                        <Text style={{fontSize: '6', marginLeft : '1mm'}}>
                                            kode   
                                        </Text>
                                        <Image style={{width: '24mm', height:'24mm'}} src={`https://api.qrserver.com/v1/create-qr-code/?data=${kode}`}/> 
                                    </View>
                                </View>

                                <View style={styles.row}>
                                    <View style={{width: '30mm', height: "37mm", display: 'flex'}}>
                                        <View style={{width: '30mm', height: "8mm", display : 'flex', border : '1px solid black', justifyContent : 'center'}}>
                                            <Text style={{fontSize: '6', marginLeft : '1mm'}}>
                                                Pack / Bag
                                            </Text>
                                        </View>
                                        <View style={{width: '30mm', height: "8mm", display : 'flex', border : '1px solid black', justifyContent : 'center'}}>
                                            <Text style={{fontSize: '6', marginLeft : '1mm'}}>
                                                No. Lot
                                            </Text>
                                        </View>
                                        <View style={{width: '30mm', height: "8mm", display : 'flex', border : '1px solid black', justifyContent : 'center'}}>
                                            <Text style={{fontSize: '6', marginLeft : '1mm'}}>
                                                Expired
                                            </Text>
                                        </View>
                                        <View style={{width: '30mm', height: "13mm", display : 'flex', border : '1px solid black', justifyContent : 'center'}}>
                                            <Text style={{fontSize: '6', marginLeft : '1mm'}}>
                                                Eksternal Provider
                                            </Text>
                                        </View>
                                    </View>
                                    
                                    <View style={{width: '40mm', height: "37mm", display: 'flex'}}>
                                        <View style={{width: '40mm', height: "8mm", display : 'flex', border : '1px solid black', justifyContent : 'center'}}>
                                            <Text style={{fontSize: '6', marginLeft : '1mm'}}>
                                                {`${location.state.data.bag} ${location.state.data.unit}`}
                                            </Text>
                                        </View>
                                        <View style={{width: '40mm', height: "8mm", display : 'flex', border : '1px solid black', justifyContent : 'center'}}>
                                            <Text style={{fontSize: '6', marginLeft : '1mm'}}>
                                                {location.state.data.no_lot}
                                            </Text>
                                        </View>
                                        <View style={{width: '40mm', height: "8mm", display : 'flex', border : '1px solid black', justifyContent : 'center'}}>
                                            <Text style={{fontSize: '6', marginLeft : '1mm'}}>
                                                {location.state.data.tgl_exp}
                                            </Text>
                                        </View>
                                        <View style={{width: '40mm', height: "13mm", display : 'flex', border : '1px solid black', justifyContent : 'center'}}>
                                            <Text style={{fontSize: '6', marginLeft : '1mm'}}>
                                                {location.state.data.eks_provider}

                                            </Text>
                                        </View>
                                    </View>

                                    <View style={[styles.centerd,{width: '30mm', height: "37mm"}]}>
                                        <Text style={{fontSize: '6', marginLeft : '1mm'}}>
                                            detail   
                                        </Text>
                                        <Image style={{width: '24mm', height:'24mm'}} src={`https://api.qrserver.com/v1/create-qr-code/?data=${detail}`}/> 
                                    </View>
                                </View>

                                <View style={styles.row}>
                                    <View style={{width: '70mm', height: "15mm", display: 'flex',border: '1px solid black'}}>
                                        <Text style={{fontSize: '6', marginLeft : '1mm',marginTop: '1mm'}}>
                                            NOTE / NO LOT SEBELUMNYA :   
                                        </Text>
                                    </View>

                                    <View style={{width: '30mm', height: "15mm"}}>
                                        <View style={[styles.centerd,{width: '30mm', height: "5mm"}]}>
                                            <Text style={{fontSize: '6'}}>
                                                Petugas
                                            </Text>
                                        </View>
                                        <View style={[styles.centerd,{width: '30mm', height: "10mm"}]}>
                                            <Text style={{fontSize: '6', marginLeft : '1mm'}}>
                                                {location.state.data.ptgas}
                                            </Text>
                                        </View>
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
