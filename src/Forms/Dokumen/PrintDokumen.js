import React, { useEffect, useState } from 'react';

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
    },
    box:{
        border: '2px solid black',
        margin: '2mm',
        width: '90mm',
        height: '50mm',
        display: 'flex',
        flexWrap: 'nowrap'
    },
    boxLeft:{
        width: '35mm',
        height: '49mm',
    },
    boxRight:{
        width: '65mm',
        height: '49mm',
        padding : '3mm'
    }
});

export const PrintDokumen = () => {
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location.state.data)
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
    return (
        <>
            <div className='setContain'>
                <Stack direction="horizontal" gap={3} style={{padding: "0px 10px 0px 10px"}}>
                    <div className="bg-body">
                    <div>
                        <Breadcrumb>
                            <Breadcrumb.Item onClick={() =>navigate(`/form`)}>Form</Breadcrumb.Item>
                            <Breadcrumb.Item onClick={() =>navigate('/form/dokumen')}>Table Dokumen</Breadcrumb.Item>
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
                            <View style={[styles.row,{flexWrap: 'wrap'}]}>
                            {
                                location.state.data.map((e,i) =>{
                                    return(
                                        <View style={[styles.row, styles.box]}>
                                            <View style={[styles.boxLeft]}>
                                                <View style={{ width: '35mm', height: "35mm", paddingTop: '5mm', paddingLeft: '2mm'}}>
                                                    <Image 
                                                        style={{width: '29mm', height:'29mm'}}
                                                        src={`https://api.qrserver.com/v1/create-qr-code/?data=${e.idForm}`}
                                                    /> 
                                                </View>
                                                <Text style={{marginTop: 3, fontSize: '10', textDecoration : 'underline', textAlign: 'center' }}>
                                                    {e.idDoc}
                                                </Text>
                                                <Text style={{marginTop: 5, fontSize: '10', textDecoration : 'underline', textAlign: 'center' }}>
                                                    {e.idForm}
                                                </Text>
                                            </View>
                                            <View style={[styles.boxRight,{textAlign: 'center'}]}>
                                                <Text style={{marginTop: 3, fontSize: '8', textAlign: 'left', fontWeight: 'extrabold'}}>
                                                    From : 
                                                </Text>
                                                <Text style={{fontSize: '16', textAlign: 'left', fontWeight: 'extrabold'}}>
                                                    {e.pengirim}
                                                </Text>
                                                <Text style={{marginTop: 3, fontSize: '8', textAlign: 'left', fontWeight: 'extrabold'}}>
                                                    To :
                                                </Text>
                                                <Text style={{fontSize: '16', textAlign: 'left', fontWeight: 'extrabold'}}>
                                                    Anisa Lisna
                                                </Text>
                                                <Text style={{marginTop: 3, fontSize: '6', textDecoration : 'underline', textAlign: 'left'}}>
                                                    Nama Dokumen :
                                                </Text>
                                                <Text style={{marginTop: 3, fontSize: '6', textAlign: 'left'}}>
                                                    {e.dokumen}
                                                </Text>
                                                <Text style={{marginTop: 3, fontSize: '7', textDecoration : 'underline', textAlign: 'left'}}>
                                                    Keterangan :
                                                </Text>
                                                <Text style={{marginTop: 3, fontSize: '7', textAlign: 'left'}}>
                                                    {e.keterangan}
                                                </Text>
                                            </View>
                                        </View>
                                    )
                                })
                            }
                            </View>
                        </Page>
                    </Document>
                </PDFViewer>
            </div>
        </>
    )
}
