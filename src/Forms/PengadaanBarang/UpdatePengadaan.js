import React, { useEffect, useState } from 'react';
import Swal from "sweetalert2";
import Select from 'react-select';
import { useLocation, useNavigate } from 'react-router-dom';
import { format } from "date-fns";
import id from 'date-fns/locale/id';
import { NumericFormat } from 'react-number-format';
import { Accordion, Breadcrumb, Button, Card, Col, Container, Form, InputGroup, OverlayTrigger, Tooltip } from 'react-bootstrap';

import { FileBarang } from '../../datafile/FileSelect';
import { LoadingPage } from '../../LoadingPage/LoadingPage';
import useAuthStore, { selectUser } from '../../store/DataUser';
import useDataMaterial, { selectMaterial } from '../../store/DataMaterial';
import usePengadaanStore, {selectFetchPengadaan} from '../../store/DataPengadaan';

import { API_AUTH } from '../../apis/apisData';

export const UpdatePengadaan = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userData = useAuthStore(selectUser);
  const material = useDataMaterial(selectMaterial);
  const fetchPengadaan = usePengadaanStore(selectFetchPengadaan);
  
  const [kode, setKode] = useState('');
  const [tgl, setTgl] = useState('');
  const [status, setStatus] = useState('');
  const [ tibar, setTibar ] = useState('');
  const [ materil, setMateril ] = useState('');
  const [itemNo, setitemNo] = useState('');

  const [ satuan, setSatuan ] = useState('');
  const [ spesifikasi, setSpesifikasi ] = useState('');
  
  const [tipeMaterial, setTipeMaterial] = useState('');
  const [brand, setBrand] = useState('');
  const [mesin, setMesin] = useState('');
  
  const [fileNab, setFileNab] = useState(FileBarang);
  const [fileBar, setFileBar] = useState(FileBarang);
  const [fileMaterial, setFileMaterial] = useState(FileBarang);
  const [inputList, setInputList] = useState([{ tglDatang: '', qty: '', expro: '', po: '', noAkun: '' }]);
  
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dataReady, setDataReady] = useState(false);
  const [muncul, setMuncul] = useState(true);
  const [munculs, setMunculs] = useState(true);
  const [kontak, setKontak] = useState(false);


  const [coa, setCoa] = useState(false);
  const [msds, setMsds] = useState(false);
  const [halal, setHalal] = useState(false);
  const [copyPO, setCopyPO] = useState(false);
  const [health, setHealth] = useState(false);
  const [kh, setKh] = useState(false);
  const [foodGra, setFoodGra] = useState(false);

  const [hilangs, setHilangs] = useState('flex');
  const [hilang, setHilang] = useState('none');
  const [nmButton, setnmButton] = useState('View Data');
  // const [perintah, setPerintah] = useState('');
  
  useEffect(() => {
    const result = material.material?.reduce((unique, o) => {
      if(!unique.some(obj => obj.kategori === o.kategori)) {
        unique.push({
          value :o.kategori,
          label :o.kategori,
          kategori :o.kategori,
          labelId :o.categoryid,
        });
      }
      return unique;
    },[]);
    setFileNab(result);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const createUniq = () => {
      // console.log(location.state.data)
      const date = new Date(location.state.data.t_pengadaan)
      let bul = format(new Date(date), "MM", { locale: id });
      let days = format(new Date(date), "dd", { locale: id });
      let yea = format(new Date(date), "yyyy", { locale: id });
      setTgl(`${yea}-${bul}-${days}`);
      // setTgl(date)
    }
    createUniq()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect (() => {
    if(!dataReady) return;
    const gntiDta = async () =>{
      try {
        setIsLoading(true);
        const newFileNab = material.material?.filter(x => x.kategori === tibar.value);
        if(tibar.value === "NonInventori" || tibar.value === "Sparepart"){
          setHilangs('flex')
          setKontak(true)
          setMunculs(true)
        }
        else{
          setHilangs('none')
          setKontak(false)
          setMunculs(false)
          setBrand(' ')
          setMesin(' ')
          setTipeMaterial(' ')
        }
        setMateril('')
        let modifiedArr = newFileNab.map(function(element){
            return { value: element.itemno, label: `${element.itemno} - ${element.itemdescription}`, item: element.itemdescription , satuan: element.unit1 };
        });
        // console.log(modifiedArr)
        setFileBar(modifiedArr);
        setIsLoading(false);
      } catch (error) {
          setIsLoading(false);
          Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Pengambilan Data Pengadaan Gagal!',
          footer: error
          })
      }
      setDataReady(false);
    } 

    gntiDta();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[dataReady]);

  useEffect(() => {
      setIsLoading(true);
      if(location.state === null) {
          navigate(`/form/pengadaan`);
          Swal.fire('Info','Harap kembali ke halaman permintaan data tidak lengkap', 'info')
      }
      else{
          cekData();
          const data = location.state.data;
          if(data?.coa === 1){setCoa(true)}
          if(data?.halal === 1){setHalal(true)}
          if(data?.msds === 1){setMsds(true)}
          if(data?.copypo === 1){setCopyPO(true)}
          if(data?.health === 1){setHealth(true)}
          if(data?.kh === 1){setKh(true)}
          if(data?.foodgrade === 1){setFoodGra(true)}
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const cekData = () =>{
    const data = location.state.data;
    const result = material.material?.reduce((unique, o) => {
        if(!unique.some(obj => obj.kategori === o.kategori)) {
          unique.push({
            value :o.kategori,
            label :o.kategori,
            kategori :o.kategori,
            labelId :o.categoryid,
          });
        }
        return unique;
    },[]);
    const filTipe = result.filter(x => x.value.toUpperCase() === String(data?.material[0].tipe).toUpperCase());
    const newFileNab = material.material?.filter(x => x.kategori.toUpperCase() === String(data?.material[0].tipe).toUpperCase());
    let modifiedArr = newFileNab.map(function(element){
        return { value: element.itemno, label: `${element.itemno} - ${element.itemdescription}`, item: element.itemdescription , satuan: element.unit1 };
    });
    const filMate = modifiedArr.filter(x => x.value.toUpperCase() === String(data?.material[0].itemNo).toUpperCase());
    setitemNo(data?.material[0].itemNo)
    setFileBar(modifiedArr);
    setKode(data?.id_Pengadaan);
    setMateril(data?.material[0].material);
    setSpesifikasi(data?.spesifikasi);
    setStatus(data?.status);
    setFileMaterial(filMate[0])
    setInputList(data?.parsial_data);
    setTibar({value: filTipe[0]?.value, label: filTipe[0]?.label, kategori: filTipe[0]?.kategori, labelId: filTipe[0]?.labelId});
    setSatuan(data?.qty_pengadaan[0].satuan)
    setBrand(data?.brandMaterial)
    setMesin(data?.mesin)
    setTipeMaterial(data?.tipeMaterial)

    if(String(data?.status).toUpperCase() === "PENGAJUAN" || String(data?.status).toUpperCase() === "REVISI" || String(data?.status).toUpperCase() === "REJECT"){
      if(String(data?.user[0].pemohon).toUpperCase() === String(userData?.uname).toUpperCase()){
        setHilang('block');
        setnmButton('Update Data');
        setMuncul(false)
      }
      else if(userData?.udivisi === "Develop"){
        setHilang('block');
        setnmButton('Update Data');
        setMuncul(false)
      }
      else{
        setHilang('none'); 
      }

      if(filTipe[0]?.value === "NonInventori" || filTipe[0]?.value === "Sparepart"){
        setHilangs('flex')
        setKontak(true)
        setMunculs(true)
      }
      else{
        setHilangs('none')
        setKontak(false)
        setMunculs(false)
      }
        
    }
    else if(String(data?.status).toUpperCase() === "VERIFIKASI"){
      if(String(data?.user[0].plan).toUpperCase() === String(userData?.uplan).toUpperCase() && userData?.usubdiv === 'Purchasing'){
        setHilang('block');
        setnmButton('Update Data');
        setMuncul(true)
      }
    }
    else if(String(data?.status).toUpperCase() === "SELESAI"){}
    setIsLoading(false);
  }

  const handleInputChange = (e, index) => {
      const { name, value } = e.target;
      const newState = JSON.parse(JSON.stringify(inputList));
      const list = [...newState];
      list[index][name] = value;
      setInputList(list);
  };
  
  const handleRemoveClick = (index) => {
      const list = [...inputList];
      list.splice(index, 1);
      setInputList(list);
  };

  const handleAddClick = () => {
    const data = location.state.data;
    if(String(data?.user[0].plan).toUpperCase() === String(userData?.uplan).toUpperCase() && userData?.usubdiv === 'Purchasing'){
      setInputList([...inputList, { tglDatang: '', qty: '', expro: '', po: '', noAkun: 'purch' }]);
    }
    else{
      setInputList([...inputList, { tglDatang: '', qty: '', expro: '', po: '', noAkun: '' }]);
    }
      
  };


  const handleSubmit = (e) =>{
      e.preventDefault()
      const form = e.currentTarget;
      if(tibar === "" || tibar === null){
      Swal.fire('Info','Harap pilih tipe barang','warning');
      }
      else if(materil === "" || materil === null){
      Swal.fire('Info','Harap isikan nama material','warning');
      }
      else if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
      }
      else{
      if(inputList.length === 0){
          Swal.fire('Info','Silahkan input parsial kedatangan dan qty pengadaan','warning');
      }
      else{
          let ndata = []
          inputList.map((e,i) => {
          if(e.qty === "" || parseFloat(e.qty) === 0){
              return(
                  console.log(ndata)
              )
          }
          else{
              return(
                  ndata.push(1)
              )
          }
          });

          if(ndata.length === inputList.length){
              handleSave()
              // console.log('lanjut save')
          }
          else{
              Swal.fire('Info',`Harap input qty pengadaan parsial`, 'warning')
          }
          
      }
      
      }
  }

  const handleSave = async () =>{
    try {
      const date = new Date();
      let mm = parseInt(date.getMonth()) + 1;
      let yy = date.getFullYear();
      let bulan = String(mm).padStart(2, '0');
      
      const sum = inputList.map(item => parseFloat(item.qty)).reduce((prev, curr) => prev + curr, 0);

      let myDivisi = "";
      const nDiv = location.state.data.user[0].divisi;
      if(nDiv === "PPIC Purchasing" && location.state.data.user[0].jabatan === "Manager"){
        myDivisi = 'PPIC-WH'
      }
      else{
        myDivisi = nDiv
      }
      const data = location.state.data;
      let statusny = "";
      let tglVerif = "";
      let tglPeng = "";
      let filt = "";
      if(String(data?.user[0].plan).toUpperCase() === String(userData?.uplan).toUpperCase() && userData?.usubdiv === 'Purchasing'){
        /* if(location.state.data.tgl_verify === ""){
          statusny = "Pengajuan";
        }
        else{
          statusny = "Verifikasi";
        } */
        const datax = location.state.data;
        const xstat = datax?.status;

        if(xstat === "Pengajuan" || xstat === "Revisi" || xstat === "Reject"){
          statusny = "Pengajuan";
        }
        else{
          statusny = xstat;
        }
        
        tglVerif = location.state.data.tgl_verify;
        tglPeng = location.state.data.t_pengadaan;
        filt = location.state.data.filter_bulan;
      }
      else{
        statusny = "Pengajuan";
        tglVerif = "";
        let bul = format(new Date(), "MM", { locale: id });
        let days = format(new Date(), "dd", { locale: id });
        let yea = format(new Date(), "yyyy", { locale: id });
        tglPeng=`${yea}-${bul}-${days}`;
        // tglPeng = tgl;
        filt = `${yy}-${bulan}`;
      }

      /* console.log({
        id_Pengadaan : location.state.data.id_Pengadaan,
        t_pengadaan : tglPeng,
        user : [{
            pemohon : location.state.data.user[0].pemohon,
            jabatan : location.state.data.user[0].jabatan,
            divisi : myDivisi,
            plan : location.state.data.user[0].plan,
        }],
        status : statusny,
        material : [{
            tipe : tibar?.value,
            itemNo : itemNo,
            material : materil
        }],
        qty_pengadaan : [{
            order : sum,
            satuan : satuan
        }],
        spesifikasi : spesifikasi,
        parsial_data : inputList,
        tgl_verify : tglVerif,
        tgl_approve : "",
        filter_bulan : filt,
        tipeMaterial : tipeMaterial,
        brandMaterial : brand,
        mesin : mesin,
        coa : coa,
        halal : halal,
        msds : msds,
        copypo : copyPO,
        health : health,
        kh : kh,
        foodgrade : foodGra,
      }) */
      
      const next = await API_AUTH.put(`/updatePengadaan`, {
        id_Pengadaan : location.state.data.id_Pengadaan,
        t_pengadaan : tglPeng,
        user : [{
          pemohon : location.state.data.user[0].pemohon,
          jabatan : location.state.data.user[0].jabatan,
          divisi : myDivisi,
          plan : location.state.data.user[0].plan,
        }],
        status : statusny,
        material : [{
          tipe : tibar?.value,
          itemNo : itemNo,
          material : materil
        }],
        qty_pengadaan : [{
          order : sum,
          satuan : satuan
        }],
        spesifikasi : spesifikasi,
        parsial_data : inputList,
        tgl_verify : tglVerif,
        tgl_approve : "",
        filter_bulan : filt,
        tipeMaterial : tipeMaterial,
        brandMaterial : brand,
        mesin : mesin,
        coa : coa,
        halal : halal,
        msds : msds,
        copypo : copyPO,
        health : health,
        kh : kh,
        foodgrade : foodGra,
      });
      
      Swal.fire(`${next.data.success}`, navigate(`/form/pengadaan`), 'success');
      
      setIsLoading(false);
    } catch (error) {
        Swal.fire('Info', `${error.response.data.message}`, 'warning');
        setIsLoading(false);
    }
  }

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {location.state.data.tgl_approve}
    </Tooltip>
  );

  const handleDelete = () =>{
    Swal.fire({
      title: `Apakah anda yakin akan menghapus pengadaan dengan id ${kode} ?`,
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        handleDestroyed()
      }
    });
}
const handleDestroyed = async () =>{
    setIsLoading(true)
    try {
      const date = new Date();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      let bb = String(month).padStart(2, '0');
      await  API_AUTH.delete(`/pengadaan/${kode}`);
      await fetchPengadaan(`${year}-${bb}`, userData.uplan);
      navigate(`/form/pengadaan`)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      Swal.fire('Opss..','Gagal unutk menghapus data','warning') 
      setIsLoading(false);
    }
}

  return (
    <>
    <div className='setContain'>
      <div className="bg-body">
        <Breadcrumb className='bg-body'>
        <Breadcrumb.Item onClick={() =>navigate(`/form`)}>Form</Breadcrumb.Item>
        <Breadcrumb.Item onClick={() => navigate(`/form/pengadaan`)}>Pengadaan</Breadcrumb.Item>
        <Breadcrumb.Item active>{nmButton}</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <Container fluid>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <div className='row  g-2  mb-1'>
            <div className='col-sm-4	col-md-4	col-lg-2	col-xl-2 mb-1'>
              <Card className='mb-2' bg='white'>
                <Card.Body>
                  <Form.Group as={Col} controlId="validationCustom01">
                    <Form.Label>Nama</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      value={location.state.data?.user[0].pemohon}
                      disabled
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="validationCustom01">
                    <Form.Label>Jabatan</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      value={location.state.data?.user[0].jabatan}
                      disabled
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="validationCustom01">
                    <Form.Label>
                      Status Pengadaan &nbsp;
                      {
                        status === 'Revisi' && 
                        <OverlayTrigger
                          placement="bottom"
                          delay={{ show: 250, hide: 400 }}
                          overlay={renderTooltip}
                        >
                          <i className="bi bi-bell-fill text-warning"></i>
                        </OverlayTrigger>
                      }  
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Status Pengadaan"
                      className='btn btn-danger mb-1'
                      value={status}
                      disabled
                    />
                  </Form.Group>
                </Card.Body>
              </Card>
              <Card bg='white'>
                <Card.Body>
                  <Form.Group as={Col} controlId="validationCustom01">
                    <Form.Label>Id Pengadaan</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Id Pengadaan"
                      value={kode}
                      disabled = {true}
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="validationCustom01">
                    <Form.Label>Tgl Pengadaan</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Tgl Pengadaan"
                      value={tgl}
                      disabled
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="validationCustom01">
                    <Form.Label>Tgl Verifikasi</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      value={location.state.data.tgl_verify}
                      disabled
                    />
                  </Form.Group>
                </Card.Body>
              </Card>
            </div>
              
            <div className='col-sm-8	col-md-8	col-lg-8	col-xl-8 mb-1'>
              <Card className='mb-3' bg='white'>
                <Card.Body>
                  <div className="row  g-2 ">
                    <div className='col-sm-12 col-md-4 col-lg-4 col-xl-4'>
                      <Form.Group as={Col} controlId="validationCustom01">
                        <Form.Label>Tipe Material</Form.Label>
                        <Select 
                            required
                            onChange={(value) => {
                                setTibar(value)
                                setFileBar([
                                  { value: '', label: '' }
                                ])
                                setFileMaterial([
                                    { value: '', label: '' }
                                ])
                                setDataReady(true)
                            }}
                            value={tibar}
                            options = {fileNab}
                            isSearchable = {false}
                            isDisabled={muncul}
                        />
                      </Form.Group>
                    </div>
                    <div className='col-sm-12 col-md-8 col-lg-8 col-xl-8'>
                      <Form.Group as={Col} controlId="validationCustom01">
                        <Form.Label>Item</Form.Label>
                        <Select 
                          required
                          onChange={(value) => {
                            setMateril(value.item)
                            setSatuan(value.satuan)
                            setitemNo(value.value)
                            setFileMaterial(value)
                          }}
                          value={fileMaterial}
                          options = {fileBar}
                          isSearchable = {true}
                          isDisabled={muncul}
                        />
                      </Form.Group>
                    </div>
                  </div>

                  <div className="row  g-2 ">
                    <div className='col-sm-12 col-md-12 col-lg-12 col-xl-12'>
                      <Form.Group as={Col} controlId="formGridArea">
                        <Form.Label>Nama Item</Form.Label>
                        <Form.Control 
                          as="textarea" 
                          aria-label="With textarea" 
                          rows={1}
                          value = {materil}
                          onChange = {e => setMateril(e.target.value)}
                          disabled={munculs}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          Harap Masukan Nama Item
                        </Form.Control.Feedback>
                      </Form.Group>
                    </div>
                  </div>
                  
                  <div className="row  g-2" style={{display: hilangs}}>
                    <div className='col-sm-12 col-md-4 col-lg-4 col-xl-4'>
                      <Form.Group as={Col} controlId="validationCustom01">
                        <Form.Label>Jenis Item</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            aria-label="With textarea" 
                            rows={1}
                            value = {tipeMaterial}
                            onChange = {e => setTipeMaterial(e.target.value)}
                            required
                          />
                          <Form.Control.Feedback type="invalid">
                            Harap Masukan Nama Item
                          </Form.Control.Feedback>
                      </Form.Group>
                    </div>
                    <div className='col-sm-12 col-md-4 col-lg-4 col-xl-4'>
                      <Form.Group as={Col} controlId="validationCustom01">
                        <Form.Label>Merk/ Brand Item</Form.Label>
                        <Form.Control 
                          as="textarea" 
                          aria-label="With textarea" 
                          rows={1}
                          value = {brand}
                          onChange = {e => setBrand(e.target.value)}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          Harap Masukan Nama Merk/Brand
                        </Form.Control.Feedback>
                      </Form.Group>
                    </div>
                    <div className='col-sm-12 col-md-4 col-lg-4 col-xl-4'>
                      <Form.Group as={Col} controlId="validationCustom01">
                        <Form.Label>Kegunaan</Form.Label>
                        <Form.Control 
                          as="textarea" 
                          aria-label="With textarea" 
                          rows={1}
                          value = {mesin}
                          onChange = {e => setMesin(e.target.value)}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          Harap Masukan Nama Mesin
                        </Form.Control.Feedback>
                      </Form.Group>
                    </div>
                  </div>

                  <div className="row  g-2 ">
                    <Form.Group as={Col} controlId="formGridArea">
                      <Form.Label>Spesifikasi</Form.Label>
                      <Form.Control 
                        as="textarea" 
                        value={spesifikasi}
                        aria-label="With textarea" 
                        placeholder='Harap isikan merk, ukuran, dan data yang lengkap'
                        onChange={(e) => {
                            setSpesifikasi(e.target.value)
                        }}
                        disabled={muncul}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                          Harap Masukan Spesifikasi Data Pengadaan barang
                      </Form.Control.Feedback>
                    </Form.Group>
                </div>
                </Card.Body>
              </Card>

              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Kelengkapan Dokumen</Accordion.Header>
                  <Accordion.Body>
                    <div className="row  g-2">
                      <div className='col-sm-12 col-md-4 col-lg-4 col-xl-4'>
                      <Form.Check
                          inline
                          label="COA"
                          name="COA"
                          type='checkbox'
                          id={`inline-checkbox-1`}
                          checked={coa}
                          onClick={(e)=>setCoa(e.target.checked)}
                        />
                      </div>
                      <div className='col-sm-12 col-md-4 col-lg-4 col-xl-4'>
                        <Form.Check
                          inline
                          label="Halal"
                          name="Halal"
                          type='checkbox'
                          id={`inline-checkbox-1`}
                          checked={halal}
                          onClick={(e)=>setHalal(e.target.checked)}
                        />
                      </div>
                      <div className='col-sm-12 col-md-4 col-lg-4 col-xl-4'>
                        <Form.Check
                          inline
                          label="MSDS"
                          name="MSDS"
                          type='checkbox'
                          id={`inline-checkbox-1`}
                          checked={msds}
                          onClick={(e)=>setMsds(e.target.checked)}
                        />
                      </div>
                    </div>
                    <div className="row  g-2">
                      <div className='col-sm-12 col-md-4 col-lg-4 col-xl-4'>
                        <Form.Check
                          inline
                          label="Copy PO"
                          name="Copy PO"
                          type='checkbox'
                          id={`inline-checkbox-1`}
                          checked={copyPO}
                          onClick={(e)=>setCopyPO(e.target.checked)}
                        />
                      </div>
                      <div className='col-sm-12 col-md-4 col-lg-4 col-xl-4'>
                        <Form.Check
                          inline
                          label="Health Certificate"
                          name="Health Certificate"
                          type='checkbox'
                          id={`inline-checkbox-1`}
                          checked={health}
                          onClick={(e)=>setHealth(e.target.checked)}
                        />
                      </div>
                      <div className='col-sm-12 col-md-4 col-lg-4 col-xl-4'>
                        <Form.Check
                          inline
                          label="KH"
                          name="KH"
                          type='checkbox'
                          id={`inline-checkbox-1`}
                          checked={kh}
                          onClick={(e)=>setKh(e.target.checked)}
                        />
                      </div>
                    </div> 
                    <div className="row  g-2">
                      <div className='col-sm-12 col-md-4 col-lg-4 col-xl-4'>
                        <Form.Check
                          inline
                          label="Ket Food Grade"
                          name="Ket Food Grade"
                          type='checkbox'
                          id={`inline-checkbox-1`}
                          checked={foodGra}
                          onClick={(e)=>setFoodGra(e.target.checked)}
                        />
                      </div>
                      <div className='col-sm-12 col-md-4 col-lg-4 col-xl-4'>
                        
                      </div>
                      <div className='col-sm-12 col-md-4 col-lg-4 col-xl-4'>
                        
                      </div>
                    </div>      
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>


              {hilang === 'none' ? 
              <Accordion defaultActiveKey="0">
                  <Accordion.Item eventKey="0">
                  <Accordion.Header>Parsial Data Kedatangan & Qty Material</Accordion.Header>
                  <Accordion.Body>
                  {inputList.map((x, i) => {
                      return(
                      <div className="row  g-2 ">
                          <h6>Parsial Ke-{i+1}</h6>
                          <div className='col-sm-12 col-md-2 col-lg-2 col-xl-2'>
                            <Form.Group as={Col} controlId="validationCustom01">
                              <Form.Label>No PO</Form.Label>
                              <Form.Control
                              required
                              name="po"
                              type="text"
                              placeholder="No. PO"
                              value={x.po}
                              disabled
                              />
                            </Form.Group>
                          </div>

                          <div className='col-sm-12 col-md-2 col-lg2 col-xl-2'>
                            <Form.Group as={Col} controlId="validationCustom01">
                              <Form.Label>Tanggal Kirim</Form.Label>
                              <Form.Control
                              required
                              name="tglDatang"
                              type="date"
                              placeholder="Tanggal Kirim"
                              value={x.tglDatang}
                              disabled
                              />
                            </Form.Group>
                          </div>
                          
                          <div className='col-sm-12 col-md-2 col-lg-2 col-xl-2'>
                          <Form.Group as={Col} controlId="validationCustom01">
                              <Form.Label>Qty</Form.Label>
                              <InputGroup className="mb-3">
                              <NumericFormat 
                                  name="qty"
                                  customInput={Form.Control}
                                  thousandSeparator={true}
                                  value={x.qty}
                                  disabled
                                  
                              />
                              <InputGroup.Text id="basic-addon2">{satuan}</InputGroup.Text>
                              </InputGroup>
                          </Form.Group>
                          </div>

                          <div className='col-sm-12 col-md-6 col-lg-6 col-xl-6'>
                            <Form.Group as={Col} controlId="validationCustom01">
                              <Form.Label>Item</Form.Label>
                              <Form.Control 
                                as="textarea" 
                                aria-label="With textarea" 
                                rows={1}
                                value = {materil}
                                onChange = {e => setMateril(e.target.value)}
                                disabled={kontak}
                              />
                            </Form.Group>
                          </div>
                      </div>
                      )
                  })}
                  </Accordion.Body>
                  </Accordion.Item>
              </Accordion>
              : 
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Parsial Data Kedatangan & Qty Material</Accordion.Header>
                  <Accordion.Body>
                  {inputList.map((x, i) => {
                    let ada = false;
                    if(x.po === ""){ada = false}else{ada = true}
                    return(
                      <div className="row  g-2 ">
                        <h6>Parsial Ke-{i+1}</h6>
                        <div className='col-sm-12 col-md-2 col-lg-2 col-xl-2'>
                          <Form.Group as={Col} controlId="validationCustom01">
                            <Form.Label>No PO</Form.Label>
                            <Form.Control
                              required
                              name="tglDatang"
                              type="text"
                              placeholder="No. PO"
                              value={x.po}
                              disabled
                            />
                          </Form.Group>
                        </div>

                        <div className='col-sm-12 col-md-4 col-lg-4 col-xl-4'>
                          <Form.Group as={Col} controlId="validationCustom01">
                            <Form.Label>Tanggal Kirim</Form.Label>
                            <Form.Control
                              required
                              name="tglDatang"
                              type="date"
                              placeholder="Tanggal Kirim"
                              value={x.tglDatang}
                              onChange={(e) => handleInputChange(e, i)}
                              
                            />
                          </Form.Group>
                        </div>
                        
                        <div className='col-sm-12 col-md-4 col-lg-4 col-xl-4'>
                          <Form.Group as={Col} controlId="validationCustom01">
                            <Form.Label>Qty</Form.Label>
                            <InputGroup className="mb-3">
                              <NumericFormat 
                                name="qty"
                                customInput={Form.Control}
                                thousandSeparator={false}
                                value={x.qty}
                                
                                onChange ={(e) =>{
                                  handleInputChange(e, i)
                                }}
                                  
                              />
                              <InputGroup.Text id="basic-addon2">{satuan}</InputGroup.Text>
                            </InputGroup>
                          </Form.Group>
                        </div>

                        <div className='col-sm-2 col-md-2 col-lg-2 col-xl-2'>
                          <h6>&nbsp;</h6>
                          <div style={{display: "flex"}}>
                            
                            {inputList.length - 1 === i && (
                              <Button 
                                  variant="success" 
                                  className=' d-flex justify-content-center align-items-center h-10' 
                                  onClick={() => handleAddClick(i)}
                              ><i className="bi bi-plus-square"></i></Button>
                            )}
                                {inputList.length !== 1 && (
                                  <Button 
                                    variant="primary" 
                                    onClick={() => handleRemoveClick(i)} 
                                    className='d-flex justify-content-center align-items-center h-10'
                                    style={{marginLeft: 10}}
                                    disabled={ada}
                                  >
                                    <i className="bi bi-trash"></i>
                                  </Button>
                                )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
              }
            </div>
            <div className='col-sm-12	col-md-12	col-lg-2	col-xl-2 mb-5'>
            
              <div className='d-flex align-items-end flex-column'>
                <div className='d-flex align-items-end flex-wrap'>
                  <div className='row p-2'>
                    <Button type="submit" variant="outline-primary m-2" className='col-sm-12	col-md-12	col-lg-12	col-xl-12' style={{display: hilang}}>{nmButton}</Button>
                    {
                      (status === "Pengajuan" &&  location.state.data?.user[0].pemohon === userData.uname)?
                        <Button 
                          variant="outline-danger m-2"
                          className='col-sm-12	col-md-12	col-lg-12	col-xl-12'
                          onClick={()=>handleDelete()}
                        >
                          Delete
                        </Button>
                      : 
                      (status === "Revisi" &&  location.state.data?.user[0].pemohon === userData.uname)?
                        <Button 
                          variant="outline-danger m-2"
                          className='col-sm-12	col-md-12	col-lg-12	col-xl-12'
                          onClick={()=>handleDelete()}
                        >
                          Delete
                        </Button>
                      : 
                      (status === "Reject" &&  location.state.data?.user[0].pemohon === userData.uname)?
                        <Button 
                          variant="outline-danger m-2"
                          className='col-sm-12	col-md-12	col-lg-12	col-xl-12'
                          onClick={()=>handleDelete()}
                        >
                          Delete
                        </Button>
                      : 
                      (status === "Verifikasi" && userData.usubdiv === "Purchasing" && userData.ulevel === 3) &&
                        <Button 
                          variant="outline-danger m-2"
                          className='col-sm-12	col-md-12	col-lg-12	col-xl-12'
                          onClick={()=>handleDelete()}
                        >
                          Delete
                        </Button>
                    }
                  </div>
                </div>
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
