import React from 'react';
import 'react-multi-email/dist/style.css';
import '../styles/poStyle.css';
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet
} from "@react-pdf/renderer";

import lgDg from '../../../assets/img/dee.png'

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

export const DokumenPo = (props) => {
  return (
    
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
                <Image style={{width: '24mm', height:'24mm'}} src={`https://api.qrserver.com/v1/create-qr-code/?data=${props.data.idpo}`}/> 
              </View>
            </View>
            <Text style={{fontSize: "4px"}}> </Text>
            <View style={[styles.row]}>
              <View style={{ width: '65mm', height: "25mm",padding: 0}}>
                <Text style={[styles.fontBold,styles.border,{height: '5mm',textAlign: 'center',padding:2.5, fontSize: "8px"}]}>
                  {props.data.exprovider}
                </Text>

                <Text style={[styles.fontBold,styles.border,{height: '20mm',fontSize: "8px", padding : 3,textAlign: 'left'}]}>
                  {props.data.alamat}
                </Text>
              </View>
              
              <View style={{ width: '65mm', height: "25mm",padding: 0, marginLeft: '1mm'}}>
                <Text style={[styles.fontBold,styles.border,{height: '5mm',textAlign: 'center',padding:2, fontSize: "8px"}]}>Kirim Ke</Text>
                <Text style={[styles.fontBold,styles.border,{height : '7.4mm',marginBottom: '0.5mm' ,fontSize: "8px", padding : 2}]}>
                  Jl. Cahaya Raya Kav H-3 Kawasan Industri Bogor
                </Text>
                <Text style={[styles.fontBold,styles.border,{height: '5mm',textAlign: 'center',padding:1, fontSize: "8px", marginTop: '1mm'}]}>
                  Tanggal Kirim
                </Text>
                <Text style={[styles.fontBold,styles.border,{height: '7.4mm',fontSize: "8px", padding : 2,textAlign: 'center'}]}>
                  {props.data.kirim}
                </Text>
              </View>

              <View style={{ width: '29mm', height: "25mm",padding: 0, marginLeft: '1mm'}}>
                <Text style={[styles.fontBold,styles.border,{height: '5mm',textAlign: 'center',padding:2, fontSize: "8px"}]}>
                  Tgl PO
                </Text>
                <Text style={[styles.fontBold,styles.border,{height: '5mm',textAlign: 'center',padding:2, fontSize: "8px", marginBottom: '5mm'}]}>
                  {props.data.tglPo}
                </Text>
                <Text style={[styles.fontBold,styles.border,{height: '5mm',textAlign: 'center',padding:2, fontSize: "8px"}]}>
                  Syarat Pembayaran
                </Text>
                <Text style={[styles.fontBold,styles.border,{height: '5mm',textAlign: 'center',padding:2, fontSize: "8px"}]}>
                  {props.data.bayar}
                </Text>
              </View>

              <View style={{ width: '29mm', height: "25mm",padding: 0, marginLeft: '1mm'}}>
                <Text style={[styles.fontBold,styles.border,{height: '5mm',textAlign: 'center',padding:2, fontSize: "8px"}]}>
                  No. PO
                </Text>
                <Text style={[styles.fontBold,styles.border,{height: '5mm',textAlign: 'center',padding:2, fontSize: "8px", marginBottom: '5mm'}]}>
                  {props.data.idpo}
                </Text>
                <Text style={[styles.fontBold,styles.border,{height: '5mm',textAlign: 'center',padding:2, fontSize: "8px"}]}>
                  Nilai Tukar
                </Text>
                <Text style={[styles.fontBold,styles.border,{height: '5mm',textAlign: 'center',padding:2, fontSize: "8px"}]}>
                  {props.data.tukar}
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
            props.list.map((row, i) => {
              const hargaSa = parseFloat(row.hargasatuan).toFixed(2);
              const hargaJm = parseFloat(row.jmlhHarga).toFixed(2);
              return(
                <View style={[styles.row,{textAlign: 'center'}]}>
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
                    {props.data.stVeri ?
                      <Image style={{width: '16mm', height:'16mm', marginLeft : '2mm', marginTop: '2mm'}} src={`https://api.qrserver.com/v1/create-qr-code/?data=Mawi Prabudi`}/> 
                      :
                      <Text style={{width: '16mm', height:'16mm', marginLeft : '2mm', marginTop: '2mm'}}> </Text>
                    }
                    <Text style={{marginTop: '2mm'}}>Mawi Prabudi</Text>
                  </View>
                  <View style={[{width: '20mm', marginLeft : '1mm', marginTop: '2mm'}]}>
                    <Text>Disetujui Oleh</Text>
                    {props.data.stAppro ? 
                      <Image style={{width: '16mm', height:'16mm', marginLeft : '2mm', marginTop: '2mm'}} src={`https://api.qrserver.com/v1/create-qr-code/?data=Rusli Adna`}/> 
                      :
                      <Text style={{width: '16mm', height:'16mm', marginLeft : '2mm', marginTop: '2mm'}}> </Text>
                    }
                    <Text style={{marginTop: '2mm'}}>Rusli Adna</Text>
                  </View>
                </View>
                <View style={{width: '65mm',height: '30mm', textAlign: 'center', marginLeft :'2mm'}}>
                  <View style={[styles.border,{width: '65mm',height: '23mm'}]}>
                    <Text style={[{width: '65mm',height: '8mm', padding: '2mm'}]}>PERSETUJUAN SUPPLIER</Text>
                    <Text style={[{width: '65mm',height: '8mm', padding: '2mm', textAlign: 'left'}]}>Tanggal :</Text>
                    <Text style={[{width: '65mm',height: '8mm', padding: '2mm'}]}>Nama & Cap Perusahaan</Text>
                  </View>
                  <Text style={[styles.border,{width: '65mm',height: '8mm', padding: '2mm'}]}>Fax ke : 021-87920409</Text>
                </View>
              </View>
            </View>
            <View style={[styles.border,{width : '62mm', marginLeft: '1mm',textAlign: 'right' ,border: '0.3 solid blue'}]}>
              <View style={[styles.row,styles.fontBold]}>
                <Text style={[styles.border,{width : '31mm',height: '7.5mm', padding : '2mm'}]}>Total Sub :</Text>
                <Text style={[styles.border,{width : '31mm',height: '7.5mm', padding : '2mm'}]}>
                {String(props.data.totalSub).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </Text>
              </View>
              <View style={[styles.row,styles.fontBold]}>
                <Text style={[styles.border,{width : '31mm',height: '7.5mm', padding : '2mm'}]}>Diskon :</Text>
                <Text style={[styles.border,{width : '31mm',height: '7.5mm', padding : '2mm'}]}>
                {String(props.data.diskon).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </Text>
              </View>
              <View style={[styles.row,styles.fontBold]}>
                <Text style={[styles.border,{width : '31mm',height: '7.5mm', padding : '2mm'}]}>PPN-STANDAR :</Text>
                <Text style={[styles.border,{width : '31mm',height: '7.5mm', padding : '2mm'}]}>
                { String(props.data.totalPpn).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </Text>
              </View>
              <View style={[styles.row,styles.fontBold]}>
                <Text style={[styles.border,{width : '31mm',height: '7.5mm', padding : '2mm'}]}>{props.data.taxName} :</Text>
                <Text style={[styles.border,{width : '31mm',height: '7.5mm', padding : '2mm'}]}>
                {String(props.data.totalPph).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </Text>
              </View>
              <View style={[styles.row,styles.fontBold]}>
                <Text style={[styles.border,{width : '31mm',height: '7.5mm', padding : '2mm'}]}>B. Antar Taksir :</Text>
                <Text style={[styles.border,{width : '31mm',height: '7.5mm', padding : '2mm'}]}>
                {String(props.data.bantar).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </Text>
              </View>
              <View style={[styles.row,styles.fontBold]}>
                <Text style={[styles.border,{width : '31mm',height: '7.5mm', padding : '2mm'}]}>Total Pesan :</Text>
                <Text style={[styles.border,{width : '31mm',height: '7.5mm', padding : '2mm'}]}>
                {String(props.data.totalPesan).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </Text>
              </View>
            </View>
          </View>

          <Text style={{fontSize: "4px"}}> </Text>
          {props.dtPar ? 
            <View>
                <Text style={{width: '190mm',fontSize: "8px",textAlign: 'center'}}>Jadwal Pengiriman Barang</Text>
                <Text style={{width: '120mm',fontSize: "8px",textAlign: 'center',marginLeft: '35mm',border: '0.3mm solid black'}}></Text>
                <View style={[styles.row,{width: '120mm',fontSize: "8px",textAlign: 'center',marginLeft: '35mm',marginTop: '1mm'}]}>
                    <Text style={{width : '7mm', minHeight: '6mm'}}>No</Text>
                    <Text style={{width : '63mm',minHeight: '6mm'}}>Nama Barang</Text>
                    <Text style={{width : '30mm',minHeight: '6mm'}}>Tanggal Datang</Text>
                    <Text style={{width : '20mm',minHeight: '6mm'}}>Qty</Text>
                </View>

                {props.listPar.map((row, i) => {
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
          
          {props.dtNote ?
            <View>
            <Text style={[styles.fontBold,{fontSize: "8px",marginBottom:'2mm'}]}>Note</Text>
            <Text style={{fontSize: "8px",border: '0.3mm solid black', padding: '2mm'}}>{props.data.note}</Text>
            </View>
            :
            <Text style={{fontSize: "16px"}}> </Text>
          } 
        </View>
      </Page>
    </Document>
  )
}
