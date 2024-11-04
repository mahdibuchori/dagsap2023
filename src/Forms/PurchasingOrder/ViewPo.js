import React, { useEffect, useMemo, useRef, useState } from 'react'
import Swal from "sweetalert2";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import { NumericFormat } from 'react-number-format';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { Breadcrumb, Col, Container, Form, InputGroup, Modal } from 'react-bootstrap';

import { COLUMNS_DATAPOVIEW } from '../../datafile/columns';
import { LoadingPage } from '../../LoadingPage/LoadingPage';
import { API_AUTH } from '../../apis/apisData';
import useDataProvider, { selectProvider,selectProviderReady } from '../../store/DataProvider';

export const ViewPo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const gridRef = useRef();

  const provider = useDataProvider(selectProvider);
  const providerReady = useDataProvider(selectProviderReady);

  const [nopo, setNopo] = useState('');
  const [tgl, setTgl] = useState('');
  const [tglKrm, setTglKrm] = useState('');
  const [currencyName, setCurrencyName] = useState('');
  const [termName, setTermName] = useState('');
  const [spesifikasi, setSpesifikasi] = useState('');

  const [tax1name, setTax1name] = useState('');
  const [tax2name, setTax2name] = useState('');
  const [expro, setExpro] = useState('');
  const [totalSub, setTotalSub] = useState(0);
  const [diskon, setDiskon] = useState(0);
  const [ppn, setPpn] = useState(0);
  const [pph, setPph] = useState(0);
  const [bantar, setBantar] = useState(0);
  const [total, setTotal] = useState(0);

  
  const [rowData, setRowData] = useState([]);
  const [staRev, setStaRev] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setisReady] = useState(false);
  const [show, setShow] = useState(false);

  const tHeigt = parseInt(window.innerHeight) - 450;
  let tWidth = 0;
  if(parseInt(window.innerWidth) >= 1700){
    tWidth = parseInt(window.innerWidth) - 120;
  }
  else if(parseInt(window.innerWidth) >= 1200){
    tWidth = parseInt(window.innerWidth) - 120;
  }
  else if(parseInt(window.innerWidth) >= 1020){
    tWidth = parseInt(window.innerWidth) - 120;
  }
  else if(parseInt(window.innerWidth) >= 992){
    tWidth = parseInt(window.innerWidth) - 70;
  }
  else if(parseInt(window.innerWidth) >= 882){
    tWidth = parseInt(window.innerWidth) - 70;
  }
  else if(parseInt(window.innerWidth) >= 576){
    tWidth = parseInt(window.innerWidth) - 60;
  }
  else{
    tWidth = parseInt(window.innerWidth)- 50
  }

  const [screenWidth, setScreenWidth] = useState(tWidth);
  const [screenHeight, setScreenHeight] = useState(tHeigt);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const columns = useMemo(() => COLUMNS_DATAPOVIEW, []);
  useEffect(() => {
    const handleResize = () => {
      let total = 0;
      let tinggi = parseInt(window.innerHeight) - 450
      if(parseInt(window.innerWidth) >= 1700){
        total = parseInt(window.innerWidth) - 120;
      }
      else if(parseInt(window.innerWidth) >= 1200){
        total = parseInt(window.innerWidth) - 120;
      }
      else if(parseInt(window.innerWidth) >= 1020){
        total = parseInt(window.innerWidth) - 120;
      }
      else if(parseInt(window.innerWidth) >= 992){
        total = parseInt(window.innerWidth) - 70;
      }
      else if(parseInt(window.innerWidth) >= 882){
        total = parseInt(window.innerWidth) - 70;
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
    let data = location.state.data
    const sinyal = async () =>{
      if(location.state === null || data.length === 0) {
        navigate(`/form/purchaseorder`);
        Swal.fire('Info','Data purchase order tidak lengkap', 'info');
        setIsLoading(false);
      }
      else{
        setNopo(location.state.data.id_po);
        setTgl(location.state.data.tgl_po);
        setTglKrm(location.state.data.tgl_kirim);
        setDiskon(parseFloat(location.state.data.diskon));
        setBantar(parseFloat(location.state.data.bAntar));
        setTermName(location.state.data.tukar);
        setCurrencyName(location.state.data.pembayaran);
        setExpro(location.state.data.expro);
        setSpesifikasi(location.state.data.keterangan)
        if(location.state.data.status === "Revisi"){setStaRev(true)} else{setStaRev(false)}
        const poData = location.state.data.dataPO;
        const idPeng = location.state.data.dataPO.map((e, i)=>{
        let number = e.id_Pengadaan
        return(
          number
        )
        })
        const next = await API_AUTH.post(`/pengadaan/data`, {
          data : idPeng,
        });
        let menu_data = []
        if(next.data.length === 0){
          Swal.fire('Oppss..','Data Pengadaan Tidak Ditemukan','info')
        }
        else{
        }

        let coba = [];
        for(let x = 0; x < poData.length; x++){
          let file ={}
          for(let y = 0; y< menu_data.length; y++){
            if(menu_data[y].id_Pengadaan === poData[x].id_Pengadaan){
              file = {
                brandMaterial : menu_data[y].brandMaterial,
                id_Pengadaan : menu_data[y].id_Pengadaan,
                material : poData[x].material,
                tipeMaterial : menu_data[y].mesin,
                parsi : menu_data[y].parsial_data, 
                qty : parseFloat(poData[x].qty).toFixed(2),
                qtyAwal : parseFloat(poData[x].qtyAwal).toFixed(2),
                satuan : poData[x].satuan,
                hargasatuan : poData[x].hargasatuan,
                diskon : poData[x].diskon,
                jmlhHarga : poData[x].jmlhHarga,
                departement : poData[x].departement,
                itemNo : poData[x].itemNo,
                pajak : poData[x].pajak,
                spesifikasi : menu_data[y].spesifikasi,
                divisi : poData[x].divisi,
                terima  : poData[x].terima,
                tutup : poData[x].tutup,
                tipe : poData[x].tipe,
                tgl_datang : location.state.data.tgl_po,
                po : poData[x].po,
                parsial: poData[x].parsial,
                parsialAwal: poData[x].parsialAwal,
                newSpek : `${menu_data[y].mesin}, ${menu_data[y].brandMaterial}, ${menu_data[y].spesifikasi}`,
                newMaterial : poData[x].newMaterial,
                newSatuan : poData[x].newSatuan,
              }
            }
          }
          
          coba.push(file)
        }
        
        const cekId = poData.map((obj,i)=>{
          let spesifikasi, brandMaterial, tipeMaterial, newSpek = "";
          let parsi = []
          for(let y = 0; y< coba.length; y++){
            if(coba[y].id_Pengadaan === obj.id_Pengadaan){
              parsi = coba[y].parsi;
              spesifikasi = coba[y].spesifikasi;
              brandMaterial = coba[y].brandMaterial;
              tipeMaterial = coba[y].tipeMaterial;
              newSpek = `${coba[y].tipeMaterial}, ${coba[y].brandMaterial}, ${coba[y].spesifikasi}`
            }
          }
          return({
            departement : obj.departement,
            diskon : obj.diskon,
            divisi : obj.divisi,
            hargasatuan : obj.hargasatuan,
            id_Pengadaan : obj.id_Pengadaan,
            itemNo : obj.itemNo,
            jmlhHarga : obj.jmlhHarga,
            material : obj.material,
            newMaterial : obj.newMaterial,
            newSatuan : obj.newSatuan,
            pajak : obj.pajak,
            po : obj.po,
            qty : parseFloat(obj.qty).toFixed(2),
            qtyAwal : parseFloat(obj.qtyAwal).toFixed(2),
            satuan : obj.satuan,
            terima  : obj.terima,
            tipe : obj.tipe,
            tutup : obj.tutup,
            spesifikasi : spesifikasi,
            brandMaterial : brandMaterial,
            tipeMaterial : tipeMaterial,
            newSpek : newSpek,
            parsial : obj.parsial,
            parsialAwal : obj.parsialAwal,
            parsi : parsi,
            mypo : location.state.data.id_po
          }
            
          )
        })

        setRowData(cekId);
        handleTotal()
        setIsLoading(false);
      }
    }
    sinyal()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  useEffect(() => {
    if (!providerReady) return;
    cekProvider()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [providerReady]);

  const defaultColDef = useMemo(() => {
    return {
      editable: false,
      cellDataType: false,
      resizable: true,
    };
  }, []);

  const handleTotal =() =>{
    if(rowData.length === 0){
      setisReady(true);
    }
    else{
      let ntotalSub = 0;
      let nppn = 0;
      let npph = 0;
      let ntotal = 0;
      let nDiskon = 0;
      let nBantar = 0;
      let dpp = [];
      if(diskon === ""){nDiskon = 0} else{nDiskon = diskon}
      if(bantar === ""){nBantar = 0} else{nBantar = bantar}
      rowData.map((e,i)=>{
        if(e.jmlhHarga === "" || e.jmlhHarga === 0  || e.jmlhHarga === undefined ){ntotalSub += 0}
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
          npph += ((parseFloat(e.ntotalSub)) * 2.5) / 100;
        }
        else if(pjk1.toUpperCase() === "B"){
          nppn += 0;
          npph += ((parseFloat(e.ntotalSub)) * 3) / 100;
        }
        else if(pjk1.toUpperCase() === "E"){
          nppn += 0;
          npph += ((parseFloat(e.ntotalSub)) * 10) / 100;
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
      if(filt.length > 0){
        let jumd = (nDiskon * 11) / 100;
        nppn -= jumd
        setPpn(nppn.toFixed(2));
      }
      else{
        setPpn(nppn.toFixed(2));
      }
      
      setPph(npph.toFixed(2));
      ntotal = ntotalSub  - parseFloat(nDiskon) + nppn - npph + parseFloat(nBantar)
      setTotal(parseFloat(ntotal).toFixed(2))
      setisReady(false);
    }
  }

  const cekProvider = () =>{
    const data = provider.provider;
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
    const filc = result.filter((i)=> i.id === location.state.data.idexpro);
    setTax1name(filc[0].tax1name)
    setTax2name(filc[0].tax2name)
  }

  return (
    <>
    <div className='setContain'>
      <div className="bg-body">
        <Breadcrumb className='bg-body'>
          <Breadcrumb.Item onClick={() =>navigate(`/form`)}>Form</Breadcrumb.Item>
          <Breadcrumb.Item onClick={() => navigate(`/form/pengadaan`)}>Pengadaan</Breadcrumb.Item>
          <Breadcrumb.Item onClick={() =>navigate('/form/purchaseorder')}>Purchase Order</Breadcrumb.Item>
          <Breadcrumb.Item active>
          Data PO &nbsp;
          {staRev ? 
            <span style={{visibility:'visible', color:'red'}} onClick={(e) =>handleShow()}><i className="bi bi-bell"></i></span> 
            : 
            <span style={{visibility:'hidden'}}onClick={(e) =>handleShow()}><i className="bi bi-bell"></i></span>
          }
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <Container fluid>
        <Form>
          <div className='row g-2 mb-1 mt-1'>
            <div className='col-sm-12 col-md-12 col-lg-6 col-xl-6 mb-1'>
              <div className='row g-2 mb-1'>
                <div className='col-sm-4 col-md-4 col-lg-4 col-xl-4'>
                  <h6>Eksternal Provider</h6>
                    <Form.Control 
                      as="textarea" 
                      aria-label="With textarea" 
                      rows={1}
                      value = {expro}
                      disabled
                      required
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
                    disabled
                  />
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
                    disabled
                  />
                </div>
                <div className='col-sm-4 col-md-4 col-lg-4 col-xl-4'>
                  <h6>Tgl Kirim</h6>
                  <Form.Control
                    required
                    type="date"
                    value={tglKrm}
                    onChange={(e)=>{
                      setTglKrm(e.target.value)
                    }}
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>

          <div className='row g-2 mb-1'>
            <div className='col-sm-12 col-md-12 col-lg-12 col-xl-12 mb-1'>
              <div style={{height: screenHeight, width: screenWidth, padding: 10}} className="ag-theme-alpine">
                <AgGridReact
                  ref={gridRef}
                  rowData={rowData}
                  columnDefs={columns}
                  defaultColDef={defaultColDef}
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
                    disabled
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
                        value={diskon}
                        style={{ textAlign: 'right' }}
                        disabled
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
                        value={bantar}
                        style={{ textAlign: 'right' }}
                        disabled
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
          </div>
        </Form>
      </Container>

    </div>
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Keterangan revisi</Modal.Title>
      </Modal.Header>
      <Modal.Body>{location.state.data.revisi}</Modal.Body>
    </Modal>
    {isLoading ? <LoadingPage /> : ""}
    </>
  )
}
