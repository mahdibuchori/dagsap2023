import React, { useEffect, useState } from 'react';
import Swal from "sweetalert2";
import { format } from "date-fns";
import id from 'date-fns/locale/id';
import { NumericFormat } from 'react-number-format';
import { useLocation, useNavigate } from 'react-router-dom';
import { LoadingPage } from '../../LoadingPage/LoadingPage';
import { Accordion, Breadcrumb, Button, Card, Col, Container, Form, InputGroup } from 'react-bootstrap';

import useAuthStore, { selectUser } from '../../store/DataUser';
import useDataMaterial, { selectMaterial } from '../../store/DataMaterial';
import useDataProvider, { selectProvider, selectFetchProvider,selectProviderReady } from '../../store/DataProvider';
import { API_FINASEND, API_AUTH } from '../../apis/apisData';

export const ViewPo = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const userData = useAuthStore(selectUser);
    const material = useDataMaterial(selectMaterial);
    const provider = useDataProvider(selectProvider);
    const onProvider = useDataProvider(selectFetchProvider);
    const providerReady = useDataProvider(selectProviderReady);
  
    const [idPo, setIdPo] = useState('');
    const [tglPO, setTglPO] = useState('');
    const [tglKirim, settglKirim] = useState('');
    const [status, setstatus] = useState('');
    const [pajak, setPajak] = useState('');
    const [tukar, setTukar] = useState('');
    const [spembayaran, setSpembayaran] = useState('');
    const [expro, setExpro] = useState('');
    const [dataPo, setdataPo] = useState([]);
    const [keterangan, setKeterangan] = useState('');
    const [totSub, setTotSub] = useState('');
    const [discon, setDiscon] = useState('');
    const [ppn, setPpn] = useState('');
    const [pph, setPph] = useState('');
    const [bantar, setBantar] = useState('');
    const [total, setTotal] = useState('');
    const [tax1name, setTax1name] = useState('');
    const [tax2name, setTax2name] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [btnOn, setBtnOn] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        if(location.state === null) {
            navigate(`/main/${userData.user_divisi}/Pengadaan`);
            Swal.fire('Info','Harap kembali ke halaman permintaan data tidak lengkap', 'info')
        }
        else{
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
        // console.log(location.state.data)
        const data = location.state.data
        setIdPo(data?.id_po);
        setTglPO(data?.tgl_po);
        settglKirim(data?.tgl_kirim);
        setstatus(data?.status)
        setdataPo(data?.dataPO)
        setPajak(data?.dataPO[0].pajak);
        setExpro(data?.expro);
        setSpembayaran(data?.pembayaran);
        setTukar(data?.tukar);
        setKeterangan(data?.keterangan);
        setTotSub(data?.totalSub);
        setDiscon(data?.diskon);
        setPpn(data?.ppn);
        setPph(data?.pph);
        setBantar(data?.bAntar);
        setTotal(data?.total)
        if(data?.status === "Selesai"){
          setBtnOn(true)
        }
        else{
          setBtnOn(false)
        }
        setIsLoading(false);
      }
    
      const cekProvider =()=>{
        const data = provider.provider
        const file = location.state.data
        const cek = data.filter(obj => obj.id === file?.idexpro);
        setTax1name(cek[0]?.tax1name);
        setTax2name(cek[0]?.tax2name);
      }
    
      const handleSubmit = (e) =>{
        console.log(status)
        if(userData?.udivisi === "Develop"){
          handleAlert(e)
        }
        else{
          if(userData?.uplan === "Sentul"){
            if(status === "Pengajuan"){
              if(userData?.udivisi === "PPIC-Purchasing" && userData?.ulevel === 2){
                handleAlert(e)
              }
              else{
                Swal.fire('Oppss...','Akses Dibatasi','warning')
              }
            }
            else if(status === "Verifikasi"){
              if(userData?.udivisi === "BOD/BOC" && userData?.ulevel === 1){
                handleAlert(e)
              }
              else{
                Swal.fire('Oppss...','Akses Dibatasi','warning')
              }
            }
            else if(status === "Revisi"){
              if(userData?.udivisi === "PPIC Purchasing" && userData?.usubdiv === "Purchasing"){
                handleAlert(e)
              }
              else{
                Swal.fire('Oppss...','Akses Dibatasi','warning')
              }
            }
            else{
              Swal.fire('Oppss...','Akses Dibatasi','warning')
            }
          }
          else{
            Swal.fire('Info','Saat ini hanya tersedia untuk Plan Sentul','info')
          }
        }
      }
    
      const handleAlert = (e) =>{
        if(e === "verifikasi"){
          Swal.fire({
            title: "Apakah anda ingin memverifikasi PO ini?",
            showDenyButton: true,
            confirmButtonText: "Simpan",
            denyButtonText: `Batal`
          }).then((result) => {
            if (result.isConfirmed) {
              setIsLoading(true)
              handleSave(e,'');
            } else if (result.isDenied) {
              Swal.fire("Batal Verifikasi PO", "", "info");
            }
          });
        }
        else if(e === 'revisi'){
          Swal.fire({
            text: "Masukan keterangan revisi",
            icon: 'warning',
            input: 'textarea',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Simpan',
            cancelButtonText: 'Batal',
        }).then((results) => {
            if (results.isConfirmed) {
            if(results.value === ""){
              Swal.fire('Harap input keterangan revisi','','info');
            }
            else{
              
              setIsLoading(true)
              handleSave(e,results.value)
            }
            }
        })
        }
        else{
          Swal.fire('Oppsss...','Tidak Dapat melakukan proses selanjutnya','warning');
        }
      }
    
      const handleSave =async (e,i) =>{
        try {
            setIsLoading(true)
            let bln = format(new Date(), "MM", { locale: id });
            let tahu = format(new Date(), "yyyy", { locale: id });
            let day = format(new Date(), "dd", { locale: id });
            const nTang = `${tahu}-${bln}-${day}`
            const data = location.state.data;
            const idp = data?.id_po;
            const next = await API_AUTH.put(`/purchaseorder/${idp}`, {
                pajak : pajak,
                filter_bulan : data?.filter_bulan,
                dataPo : data?.dataPO,
                statusPo : data?.status,
                status : e,
                keterangan : i,
                tanggal : nTang,
                plan : userData.uplan
            });
            
            let stPo = next.data.status;
            if(stPo === 'Verifikasi'){
                handleJadwal()
                setIsLoading(true)
            }
            else if(stPo === 'Revisi' ){
                Swal.fire(`${next.data.message}`, navigate(`/form/Pengadaan`), 'success');
                setIsLoading(false)
            }
            else if(stPo === 'Selesai'){
                setIsLoading(true)
                handleFina()
            }
            else if(stPo === 'Done'){
                Swal.fire(`${next.data.message}`, navigate(`/form/purchaseorder`), 'success');
                setIsLoading(false)
            }
            else{}
        } catch (error) {
          // console.log(error.response.data?.message)
          Swal.fire('Ooppsss',error.response.data?.message,'error')
          setIsLoading(false)
        }
      }
    
      const handleFina = () =>{
        const data = location.state.data;
        let date = new Date(data.tgl_kirim);
        let bln = date.getMonth() + 1;
        let tahu = date.getFullYear();
        let day = date.getDate();
        const nTang = `${bln}/${day}/${tahu}`;
        const inputList = data.dataPO;
        if(data.dataPO.length <2){
          let files = inputList.map((x, i) => {
            return(
              {"ITEMNO":x.itemNo,"ITEMOVDESC":x.material,"ItemUnit":x.satuan,"QUANTITY":x.qty,"UNITPRICE":`${x.hargasatuan}`, "ITEMDISCPC":x.diskon,"TAXCODES":x.pajak,"DEPTNO":x.departement}
          )})
          let file = JSON.stringify(files)
          console.log(file)
          const uri = `{"PO":[{"PONO":"${data.id_po}","PODate":"${nTang}","VENDOR":"${data.idexpro}","Description":"${data.keterangan}","PO_Item":${file}}]}`;
          const encoded = encodeURIComponent(uri);
          const newStr = encoded.replace(/%3A/g, ':')
          .replace(/%5B/g, '[')
          .replace(/%2C/g, ',')
          .replace(/%5D/g, ']');
          handleSendFina(newStr);
          setIsLoading(false);
        }
        else{
          let files = inputList.map((x, i) => {
            return(
              {"SEQ":`${i}`,"ITEMNO":x.itemNo,"ITEMOVDESC":x.material,"ItemUnit":x.satuan,"QUANTITY":x.qty,"UNITPRICE":`${x.hargasatuan}`, "ITEMDISCPC":x.diskon,"TAXCODES":x.pajak,"DEPTNO":x.departement}
          )})
          console.log(files)
          let file = JSON.stringify(files);
          const uris = `{"PO":[{"PONO":"${data.id_po}","PODate":"${nTang}","VENDOR":"${data.idexpro}","Description":"${data.keterangan}","PO_Item":${file}}]}`;
          const encoded = encodeURIComponent(uris)
          const newStr = encoded.replace(/%3A/g, ':')
                        .replace(/%5B/g, '[')
                        .replace(/%2C/g, ',')
                        .replace(/%5D/g, ']');
        
        handleSendFina(newStr);
        setIsLoading(true);
        }
      }
    
      const handleSendFina = async (uri) =>{
        setIsLoading(true);
        try {
          setIsLoading(true);
          console.log(uri)
          const saveData = await API_FINASEND.get(`/${uri}`);
          console.log(saveData)
          Swal.fire(`${saveData.data.result}`,'','success')
    
          if(saveData.data.result[0] === "Current data already exists." || saveData.data.result[0] === ""){
            handleSave('Done','')
          }
          else{
            
          } 
            setIsLoading(false)
        } catch (error) {
            Swal.fire(`Oppss`,'','error')
            Swal.fire(`Kegagalan Dalam Proses Kirim Data Ke Fina`, navigate(`/form/purchaseorder`), 'error');
            setIsLoading(false)
        }
    
      }
    
      const handleJadwal = async () =>{
        let bln = format(new Date(), "MM", { locale: id });
        let tahu = format(new Date(), "yyyy", { locale: id });
        
        const data = location.state.data;
        const sitem = material?.material;
        const idp = data?.id_po;
        
        const sFile = data?.dataPO.map((e,i)=>{
          const item = sitem.filter(obj => obj.itemno === e?.itemNo);
          let nama = e.parsial.map((x,y)=>{
            const xsd = Math.random().toString(36).slice(-4);
            return (
              {
                idNumb : `${xsd.toUpperCase()}${bln}${tahu}`,
                idPengadaan : e.id_Pengadaan,
                itemNo : e.itemNo,
                tipe : e.tipe,
                kItem : item[0]?.itemdescription,
                material : e.material,
                tgl_po : data.tgl_po,
                tgl : x.tgl,
                qty : x.qty,
                expro : data.expro,
                unit : e.satuan,
                hSatuan : e.hargasatuan,
                bAntar : data.bAntar,
                pajak : e.pajak,
                diskon : e.diskon,
                jmlhHarga : e.jmlhHarga,
                keterangan: data.keterangan
              }
            )
          })
          
          return (nama)
        });
    
        let mFile = [];
        for (let i = 0; i < sFile.length; i++) {
          for(let x = 0; x < sFile[i].length; x++){
            mFile.push(sFile[i][x])
          }
        }
        console.log(data)
        console.log(mFile)
        setIsLoading(true)
        try {
          const next = await API_AUTH.post(`/createKedatangan/${idp}`, {
            data : mFile,
            nopo: idp,
            plan : userData.uplan
          });
          Swal.fire(`${next.data.success}`, navigate(`/form/purchaseorder`), 'success');
          setIsLoading(false)
        } catch (error) {
          Swal.fire('Ooppsss',error.response.data?.message,'error')
          setIsLoading(false)
        }
        
      }
    
      const handlePrint = () =>{
        const data = location.state.data;
        navigate(`/form/purchaseorder/printview`,{state:{
          data : data,
          ppn : ppn,
          pph : pph,
          totSub : totSub,
          discon : discon,
          bantar : bantar,
          pajak : pajak,
          tukar : tukar,
          spembayaran : spembayaran
      }});
      }
  return (
    <>
    <div className='setContain'>
      <div className="bg-body">
        <Breadcrumb className='bg-body'>
        <Breadcrumb.Item onClick={() =>navigate(`/form`)}>Form</Breadcrumb.Item>
        <Breadcrumb.Item onClick={() => navigate(`/form/pengadaan`)}>Pengadaan</Breadcrumb.Item>
        <Breadcrumb.Item onClick={() =>navigate('/form/purchaseorder')}>Purchase Order</Breadcrumb.Item>
        <Breadcrumb.Item active>Data PO</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <Container fluid>
      <Form>
        <div className='row g-2 mb-1'>
          <div className='col-sm-4	col-md-4	col-lg-2	col-xl-2 mb-1'>
            <Card bg='white'>
              <Card.Body>
                <Form.Group as={Col} controlId="validationCustom01">
                  <Form.Label>Id Po</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Id Po"
                    value={idPo}
                    disabled = {true}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="validationCustom01">
                  <Form.Label>Tgl Po</Form.Label>
                  <Form.Control
                    required
                    type="date"
                    placeholder="Tgl Pengadaan"
                    value={tglPO}
                    disabled
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="validationCustom01">
                  <Form.Label>Tgl Kirim</Form.Label>
                  <Form.Control
                    required
                    type="date"
                    value={tglKirim}
                    disabled
                  />
                </Form.Group>
              </Card.Body>
            </Card>
            
            <Card bg='white' style={{ marginTop: 10 }}>
              <Card.Body>
                <Form.Group as={Col} controlId="validationCustom01">
                  <Form.Label>Nilai Tukar</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="nilai tukar"
                    value={tukar}
                    disabled = {true}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="validationCustom01">
                  <Form.Label>S. Pembayaran</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Spembayaran"
                    value={spembayaran}
                    disabled = {true}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="validationCustom01">
                  <Form.Label>Pajak</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="pajak"
                    value={pajak}
                    disabled
                  />
                </Form.Group>
              </Card.Body>
            </Card>
          </div>

          <div className='col-sm-8	col-md-8	col-lg-8	col-xl-9 mb-1'>
            <div className="row  g-2 ">
              <div className='col-sm-12 col-md-3 col-lg-3 col-xl-3 mb-2'>
                <Form.Group as={Col} controlId="validationCustom01">
                  <Form.Control
                    required
                    type="text"
                    placeholder="nilai tukar"
                    className='btn btn-danger mb-1'
                    value={status}
                    disabled = {true}
                  />
                </Form.Group>
              </div>

              <div className='col-sm-12 col-md-9 col-lg-9 col-xl-9'>
                <Form.Group as={Col} controlId="validationCustom01">
                  <Form.Control
                    required
                    type="text"
                    value={expro}
                    disabled = {true}
                  />
                </Form.Group>
              </div>
            </div>

            <Accordion defaultActiveKey="0">
                {dataPo.map((x, i) => {
                  return(
                    <Accordion.Item eventKey={`${i}`}>
                      <Accordion.Header>{`${x.material} ( ${x.qty} ${x.satuan} )`}</Accordion.Header>
                      <Accordion.Body>
                        <div className="row  g-2 ">
                          <div className='col-sm-12 col-md-3 col-lg-3 col-xl-3'>
                            <Form.Group as={Col} controlId="validationCustom01">
                              <Form.Label>Qty Item</Form.Label>
                              <InputGroup className="mb-3">
                              <NumericFormat 
                                  name="qty"
                                  customInput={Form.Control}
                                  thousandSeparator={true}
                                  value={parseFloat(x.qty)}
                                  disabled
                                  
                              />
                              <InputGroup.Text id="basic-addon2">{x.satuan}</InputGroup.Text>
                              </InputGroup>
                            </Form.Group>
                          </div>

                          <div className='col-sm-12 col-md-3 col-lg-3 col-xl-3'>
                            <Form.Group as={Col} controlId="validationCustom01">
                              <Form.Label>Harga Satuan</Form.Label>
                              <NumericFormat 
                                name="HargaSatuan"
                                customInput={Form.Control}
                                thousandSeparator={true}
                                value={parseFloat(x.hargasatuan)}
                                disabled
                              />
                            </Form.Group>
                          </div>

                          <div className='col-sm-12 col-md-3 col-lg-3 col-xl-3'>
                            <Form.Group as={Col} controlId="validationCustom01">
                              <Form.Label>Diskon</Form.Label>
                              <Form.Control
                                required
                                type="text"
                                value={x.diskon}
                                disabled = {true}
                              />
                            </Form.Group>
                          </div>

                          <div className='col-sm-12 col-md-3 col-lg-3 col-xl-3'>
                            <Form.Group as={Col} controlId="validationCustom01">
                              <Form.Label>Total Harga</Form.Label>
                              <NumericFormat 
                                name="totalharga"
                                customInput={Form.Control}
                                thousandSeparator={true}
                                value={parseFloat(x.jmlhHarga)}
                                disabled
                              />
                            </Form.Group>
                          </div>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  )
                })}
            </Accordion>

            
            <div className='row g-2 mb-1 mt-2'>
              <div className='col-sm-8 col-md-8 col-lg-8 col-xl-8 mb-1'>
                <Form.Group as={Col} controlId="formGridArea">
                  <Form.Label>Keterangan</Form.Label>
                  <Form.Control 
                    as="textarea" 
                    aria-label="With textarea" 
                    value={keterangan}
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
                      value={totSub}
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
                      value={discon}
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

          <div className='col-sm-12	col-md-12	col-lg-2	col-xl-1 mb-5'>
          
            <div className='d-flex align-items-end flex-column'>
              {!btnOn 
                ?
                <div className='d-flex align-items-end flex-wrap'>
                <div className='row p-2'>
                  <Button 
                    variant="outline-primary m-2" 
                    className='col-sm-12	col-md-12	col-lg-12	col-xl-12'
                    onClick={(e)=>handleSubmit('verifikasi')}
                  >
                    Verifikasi
                  </Button>
                  <Button 
                    variant="outline-danger m-2" 
                    className='col-sm-12	col-md-12	col-lg-12	col-xl-12'
                    onClick={(e) => handleSubmit('revisi')}
                  >
                    Revisi
                  </Button>
                </div>
              </div> 
              :
              <div className='d-flex align-items-end flex-wrap'>
              <div className='row p-2'>
                <Button 
                  variant="outline-primary m-2" 
                  className='col-sm-12	col-md-12	col-lg-12	col-xl-12'
                  onClick={(e)=>handlePrint()}
                >
                <i class="bi bi-printer-fill"></i> &nbsp; Print PO
                </Button>
                
              </div>
            </div>
            }
            </div>
          </div>
        </div>
      </Form>
      </Container>
    </div>
    {isLoading ? <LoadingPage /> : ""}
    </>
  )
}
