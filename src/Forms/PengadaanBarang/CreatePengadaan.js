import React, { useEffect, useState } from 'react';
import Swal from "sweetalert2";
import Select from 'react-select';
import { format } from "date-fns";
import id from 'date-fns/locale/id';
import { useNavigate } from 'react-router-dom';
import { NumericFormat } from 'react-number-format';
import { Accordion, Badge, Breadcrumb, Button, Card, Col, Container, Form, InputGroup, Modal } from 'react-bootstrap';

import { FileBarang } from '../../datafile/FileSelect';
import { LoadingPage } from '../../LoadingPage/LoadingPage';
import useAuthStore, { selectUser } from '../../store/DataUser';
import useDataMaterial, { selectMaterial } from '../../store/DataMaterial';
import { API_AUTH } from '../../apis/apisData';
// import { PrevPengadaan } from './PrevPengadaan';

export const CreatePengadaan = () => {
  const navigate = useNavigate();
  const status = 'Pengajuan';
  const userData = useAuthStore(selectUser);
  const material = useDataMaterial(selectMaterial);
  
  const [kode, setKode] = useState('');
  const [tgl, setTgl] = useState('');
  const [jam,setJam] = useState('00');
  const [menit,setMenit] = useState('00');
  const [detik,setDetik] = useState('00');
  const [bagian, setBagian] = useState('PM');

  const [ tibar, setTibar ] = useState('');
  const [ materil, setMateril ] = useState('');
  const [itemNo, setitemNo] = useState('');

  const [ satuan, setSatuan ] = useState('');
  const [ spesifikasi, setSpesifikasi ] = useState('');
  const [tipeMaterial, setTipeMaterial] = useState('');
  const [dataPO, setDataPO] = useState();
  const [brand, setBrand] = useState('');
  const [mesin, setMesin] = useState('');
  const [fileNab, setFileNab] = useState(FileBarang);
  const [fileBar, setFileBar] = useState(FileBarang);
  const [inputList, setInputList] = useState([{ tglDatang: '', qty: '', expro: '', po: '', noAkun: '' }]);
  
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dataReady, setDataReady] = useState(false);
  const [fileReady, setFileReady] = useState(false);
  const [isReady, setIsReady] = useState(true);
  const [cekReady, setCekReady] = useState(false);
  const [kontak, setKontak] = useState(false);
  const [popPeng, setPopPeng] = useState(false);
  const [hilang, setHilang] = useState('flex');


  const [coa, setCoa] = useState(false);
  const [msds, setMsds] = useState(false);
  const [halal, setHalal] = useState(false);
  const [copyPO, setCopyPO] = useState(false);
  const [health, setHealth] = useState(false);
  const [kh, setKh] = useState(false);
  const [foodGra, setFoodGra] = useState(false);

  const [selectedValue, setSelectedValue] = useState();

  const [show, setShow] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [arrPo, setArrPo] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
      // const  newFileNab= result?.filter(x => x.value !== "Finished Goods");
      
      // console.log(menit)
      // console.log(detik)
      setFileNab(result);
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const createUniq = () => {
      let bln = format(new Date(), "MM", { locale: id });
      let tahu = format(new Date(), "yy", { locale: id });

      let bul = format(new Date(), "MM", { locale: id });
      let days = format(new Date(), "dd", { locale: id });
      let yea = format(new Date(), "yyyy", { locale: id });
      const xsd = Math.random().toString(36).slice(-4);
      setTgl(`${yea}-${bul}-${days}`);
      setKode(xsd.toUpperCase()+bln+tahu);
    }
    createUniq()
  }, []);

  useEffect (() => {
    if(!dataReady) return;
    const gntiDta = async () =>{
      try {
        setIsLoading(true);
        setSelectedValue(null);
        setFileBar([
          { value: '', label: '' }
        ])
        if(tibar.value === "NonInventori" || tibar.value === "Sparepart"){
          setHilang('flex')
          setKontak(true)
        }
        else{
          setHilang('none')
          setKontak(false)
          setBrand(" ")
          setTipeMaterial(" ")
          setMesin(" ")
        }
        const newFileNab = material.material?.filter(x => x.kategori === tibar.value);
        
        const newFiles = newFileNab.filter(x => x.itemtype !== "3");
        let modifiedArr = newFiles.map(function(element){
            return { value: element.itemno, label: `${element.itemno} - ${element.itemdescription}`, item: element.itemdescription , satuan: element.unit1 };
        });
        setFileBar(modifiedArr);
        setMateril('')
        setSatuan('')
        setitemNo('')
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

  useEffect (() => {
    if(!fileReady) return;
    const gntiDta = async () =>{
      try {
        setIsLoading(true);
        const e = selectedValue;
        if(e === null){
          console.log(null)
        }
        else{
          setMateril(e.item)
          setSatuan(e.satuan)
          setitemNo(e.value)
        }
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
      setFileReady(false);
    } 

    gntiDta();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[fileReady]);

  useEffect (() => {
    if(!cekReady) return;
    const gntiDta = async () =>{
      try {
        if(tibar.value !== "NonInventori"){
          setIsLoading(true);
          const data = await API_AUTH.get(`prevpengadaan/${selectedValue.value}`);
          setPopPeng(false)
          if( data.data.length !== 0){
            const dRec = data.data.map((e,i)=>{
              const isi = e.parsial_data;
              let nPars = []
              for(let x = 0; x < isi.length; x++){
                nPars.push({
                  expro : isi[x].expro,
                  noAkun : isi[x].noAkun,
                  po : isi[x].po,
                  qty : parseFloat(isi[x].qty)
                })
              }
              let o = {}
              const result = nPars.reduce(function(r, e) {
                let key = e.po + '|' + e.noAkun;
                if (!o[key]) {
                  o[key] = e;
                  r.push(o[key]);
                } else {
                  o[key].qty += e.qty;
                }
                return r;
              }, []);
              return(
                {
                  brandMaterial : e.brandMaterial,
                  filter_bulan : e.filter_bulan,
                  id_Pengadaan : e.id_Pengadaan,
                  material : e.material,
                  parsial_data : e.parsial_data,
                  qty_pengadaan : e.qty_pengadaan,
                  spesifikasi : e.spesifikasi,
                  status : e.status,
                  t_pengadaan : e.t_pengadaan,
                  tgl_approve : e.tgl_approve,
                  tgl_verify : e.tgl_verify,
                  tipeMaterial : e.tipeMaterial,
                  mesin : mesin,
                  user : e.user,
                  newPar : result
                }
              )
            })
            setDataPO(dRec)
            let dataN = [];
            for(let x = 0; x < dRec.length; x++){
              let parsial = dRec[x].parsial_data
              let usr = dRec[x].user
              for(let y = 0; y < parsial.length; y++){
                parsial[y].id_Pengadaan = dRec[x].id_Pengadaan;
                parsial[y].filter_bulan = dRec[x].filter_bulan;
                parsial[y].divisi= usr[0].divisi;
                dataN.push(parsial[y])
              }
            }

            const groupedPo = Object.entries(
              dataN.reduce((acc, { po, qty, expro, noAkun, tglDatang, id_Pengadaan, filter_bulan, divisi }) => {
                if (!acc[po]) {
                  acc[po] = [];
                }
                acc[po].push({ qty, expro, noAkun, tglDatang, id_Pengadaan, filter_bulan, divisi });
            
                return acc;
              }, {})
            ).map(([label, options]) => ({ label, options }));
            const sukses = groupedPo.filter(i => i.label !== "");
            setArrPo(sukses)
            setPopPeng(true)
            handleShow()
          }
          setIsLoading(false);
        }
        else{
          console.log("")
        }
        
      } catch (error) {
          setIsLoading(false);
          Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Pengambilan Data Pengadaan Gagal!',
          footer: error
          })
      }
      setCekReady(false);
    } 

    gntiDta();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[cekReady]);

  useEffect (() => {
    if(!isRefresh) return;
    const gntiDta = async () =>{
      try {
        setFileNab([])
        let bln = format(new Date(), "MM", { locale: id });
        let tahu = format(new Date(), "yy", { locale: id });

        let bul = format(new Date(), "MM", { locale: id });
        let days = format(new Date(), "dd", { locale: id });
        let yea = format(new Date(), "yyyy", { locale: id });
        const xsd = Math.random().toString(36).slice(-4);

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
        console.log(menit)
        console.log(detik)
        setPopPeng(false)
        setTgl(`${yea}-${bul}-${days}`);
        setKode(xsd.toUpperCase()+bln+tahu);
        setMateril("")
        setBrand(" ")
        setTipeMaterial(" ")
        setMesin(" ")
        setSpesifikasi("")
        setInputList([{ tglDatang: '', qty: '', expro: '', po: '', noAkun: '' }])
        setFileNab(result);
        setFileBar([
          { value: '', label: '' }
        ])
        setSelectedValue({ value: '', label: '' })
        /* 
        
        setTibar(null)
         */
      } catch (error) {
          setIsLoading(false);
          Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Pengambilan Data Pengadaan Gagal!',
          footer: error
          })
      }
      setIsRefresh(false);
    } 

    setIsRefresh(false);
    gntiDta();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[isRefresh]);

  

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value.toUpperCase();
    setInputList(list);
  };

  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const handleAddClick = () => {
    setInputList([...inputList, { tglDatang: '', qty: '', expro: '', po: '', noAkun: '' }]);
  };

  const handleSubmit = (e) =>{
    e.preventDefault();
    const form = e.currentTarget;
    if(tibar === "" || tibar === null){
      Swal.fire('Info','Harap pilih tipe barang','warning');
    }
    else if(materil === "" || materil === null){
      Swal.fire('Info','Harap isikan nama material','warning');
    }
    else if (form.checkValidity() === false) {
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
            // console.log(e.qty)
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
            const cSta = []
            if(dataPO === undefined){
              handleSave()
            }
            else{
              dataPO.map((x,i) =>{
                return(
                  x.newPar.map((a,z)=>{
                    let statusn = "";
                    if(a.noAkun === "" && a.po !== ""){
                      statusn = "Closed";
                    }
                    else if(a.noAkun === "" && a.po === ""){
                      statusn = "Progress";
                    }
                    else{
                      statusn = "Open";
                    }
                    return (
                      cSta.push(statusn)
                    )
                  })
                )
              });
              const nil = cSta.filter(x => x === 'Open');
              if(nil.length > 0){
                Swal.fire({
                  title: "Apakah anda akan melanjutkan pembuatan pengadaan?",
                  text: "Masih ada PO open dan butuh untuk dibuatkan jadawal kedatangan",
                  icon: "question",
                  showDenyButton: true,
                  confirmButtonText: "Lanjut",
                  denyButtonText: `Batal`
                }).then((result) => {
                  /* Read more about isConfirmed, isDenied below */
                  if (result.isConfirmed) {
                    handleSave();
                  } else if (result.isDenied) {
                    Swal.fire("Pengadaan Dibatalkan", "", "info");
                  }
                });
              }
              else{
                handleSave();
              }
            }
        }
        else{
            Swal.fire('Info',`Harap input qty pengadaan parsial`, 'warning')
        }
        
      }
      
    }
  }
  useEffect(() => {
      // setIsLoading(true);
      if (!isReady) return;
      onGridReady()
      setIsReady(false)
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady]);

  const handleSave = async () =>{
    setIsLoading(true)
    try {
      let newTang = tgl;
      const date = new Date();
      let mm = parseInt(date.getMonth()) + 1;
      let yy = date.getFullYear();
      let bulan = String(mm).padStart(2, '0');
      const sum = inputList.map(item => parseFloat(item.qty)).reduce((prev, curr) => prev + curr, 0);
      let myDivisi = "";
      if(userData?.udivisi === "PPIC Purchasing" && userData?.ulevel === 2){
        myDivisi = 'PPIC-WH'
      }
      else{
        myDivisi = userData?.usubdiv
      }
      // // console.log(`${jam}:${menit}:${detik} ${bagian}`)
      // console.log(new Date () + 1)

      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      let bul = format(new Date(tomorrow), "MM", { locale: id });
      let days = format(new Date(tomorrow), "dd", { locale: id });
      let yea = format(new Date(tomorrow), "yyyy", { locale: id });
      
      let waktu = parseInt(jam)
      console.log(waktu)
      if( waktu >= 2 && waktu <= 12){
        if(bagian === "PM"){
          newTang = `${yea}-${bul}-${days}`;
        }
        else{
          newTang = tgl;
        }
      }
      else{
        newTang = tgl;
      }

      // console.log(tgl)
      // console.log(newTang);
      const next = await API_AUTH.post(`/pengadaan`, {
        id_Pengadaan : kode,
        t_pengadaan : newTang,
        user : [{
            pemohon : userData?.uname,
            jabatan : userData?.ujabatan,
            divisi : myDivisi,
            plan : userData?.uplan,
        }],
        status : status,
        material : [{
          tipe : tibar.value,
          itemNo : itemNo,
          material : materil
        }],
        qty_pengadaan : [{
          order : sum,
          satuan : satuan
        }],
        spesifikasi : spesifikasi,
        parsial_data : inputList,
        tgl_verify : "",
        tgl_approve : "",
        filter_bulan : `${yy}-${bulan}`,
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

      Swal.fire({
        title: `${next.data.success}`,
        text: 'Apakah anda ingin melanjutkan pembuatan pengadaan ?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Ya",
        denyButtonText: `Tidak`
      }).then((result) => {
        if (result.isConfirmed) {
          setCoa(false)
          setHalal(false)
          setMsds(false)
          setCopyPO(false)
          setHealth(false)
          setKh(false)
          setFoodGra(false)
          setIsRefresh(true)
          Swal.fire("Saved!", "", "success");
        } else if (result.isDenied) {
          navigate(`/form/Pengadaan`)
        }
      });

      

      // Swal.fire(`${next.data.success}`, navigate(`/form/Pengadaan`), 'success');
      setIsLoading(false)
    } catch (error) {
      Swal.fire('Info', `${error.response.data.message}`, 'warning');
      setIsLoading(false);
    }
  }

  const onGridReady = () =>{
    let date = new Date(),
    h = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds(),
    ampm = "AM";

    if(h >= 12) {
      h = h - 12;
      ampm = "PM";
    }
    h = h === 0 ? h = 12 : h;
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;
    setTimeout(() => {
      setJam(h)
      setMenit(m)
      setDetik(s)
      setBagian(ampm)  
      setIsReady(true)
    }, 1000)
  }

  const handleMoveUpdate = (e, id) =>{
    const x = dataPO.filter(i => i.id_Pengadaan === e);
    if(x.length > 0){
      navigate(`/form/pengadaan/update`,{state:{
        data : x[0],
        po : id
      }});
    }
    else{
      Swal.fire('Opps','Data tiak ditemukan','warning')
    }
  }
  return (
    <>
    <div className='setContain'>
      <div className="bg-body">
        <Breadcrumb className='bg-body'>
          <Breadcrumb.Item onClick={() =>navigate(`/form`)}>Form</Breadcrumb.Item>
          <Breadcrumb.Item onClick={() => navigate(`/form/Pengadaan`)}>Pengadaan</Breadcrumb.Item>
          <Breadcrumb.Item active>Create</Breadcrumb.Item>
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
                      value={userData?.uname}
                      disabled
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="validationCustom01">
                    <Form.Label>Jabatan</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      value={userData?.ujabatan}
                      disabled
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="validationCustom01">
                    <Form.Label>Status Pengadaan</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Status Pengadaan"
                      className='btn btn-danger'
                      value={status}
                      disabled
                    />
                  </Form.Group>
                </Card.Body>
              </Card>
              <Card className='mb-2' bg='white'>
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
                </Card.Body>
              </Card>
              {/* <PrevPengadaan data={dataPO}/> */}
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
                            console.log(value)
                            setTibar(value)
                            setDataPO()
                            setDataReady(true)
                          }}
                          options = {fileNab}
                          isSearchable = {false}
                        />
                    </Form.Group>
                    </div>
                    <div className='col-sm-12 col-md-8 col-lg-8 col-xl-8'>
                      <Form.Group as={Col} controlId="validationCustom01">
                        <Form.Label>
                          Item
                          {popPeng ?
                            <span style={{color: `#287bff`, fontSize: '16px', marginLeft: 10}} onClick={(e) => handleShow()}>
                              <i className="bi bi-info-square-fill"></i>
                            </span>
                            :""
                          }
                        </Form.Label>
                        <Select
                          required
                          className="basic-single"
                          classNamePrefix="select"
                          value={selectedValue}
                          isClearable={true}
                          isSearchable={true}
                          name="selectValue"
                          options={fileBar}
                          onChange={(value) => {
                            setDataPO()
                            setFileReady(true)
                            setCekReady(true)
                            setPopPeng(false)
                            setSelectedValue(value)
                          }}
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
                          disabled={kontak}
                          required
                        />
                      </Form.Group>
                    </div>
                  </div>

                  <div className="row  g-2" style={{display: hilang}}>
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
                        aria-label="With textarea" 
                        placeholder='Harap isikan merk, ukuran, dan data yang lengkap'
                        onChange={(e) => {
                          setSpesifikasi(e.target.value)
                        }}
                        value={spesifikasi}
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
                          value={coa}
                          onClick={(e)=>{
                            setCoa(e.target.checked)
                          }}
                        />
                      </div>
                      <div className='col-sm-12 col-md-4 col-lg-4 col-xl-4'>
                        <Form.Check
                          inline
                          label="Halal"
                          name="Halal"
                          type='checkbox'
                          id={`inline-checkbox-1`}
                          value={halal}
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
                          value={msds}
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
                          value={copyPO}
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
                          value={health}
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
                          value={kh}
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
                          value={foodGra}
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

              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Parsial Data Kedatangan & Qty Material</Accordion.Header>
                  <Accordion.Body>
                  {inputList.map((x, i) => {
                    return(
                      <div className="row  g-2 ">
                        <h6>Parsial Ke-{i+1}</h6>
                        <div className='col-sm-12 col-md-5 col-lg5 col-xl-5'>
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
                        
                        <div className='col-sm-12 col-md-5 col-lg-5 col-xl-5'>
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
                              <Button variant="success" className=' d-flex justify-content-center align-items-center h-10' onClick={() => handleAddClick(i)}><i className="bi bi-plus-square"></i></Button>
                            )}
                                {inputList.length !== 1 && (
                                  <Button variant="primary" onClick={() => handleRemoveClick(i)} className='d-flex justify-content-center align-items-center h-10' style={{marginLeft: 10}}>
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
            </div>
            <div className='col-sm-12	col-md-12	col-lg-2	col-xl-2 mb-5'>
            
              <div className='d-flex align-items-end flex-column'>
                <div className='d-flex align-items-end flex-wrap'>
                  <div className='row p-2'>
                    <Button type="submit" variant="outline-primary m-2" className='col-sm-12	col-md-12	col-lg-12	col-xl-12'>Simpan</Button>
                    <Button variant="outline-danger m-2" className='col-sm-12	col-md-12	col-lg-12	col-xl-12'>Batal</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>  
      </Container>
     
    </div>

    {isLoading ? <LoadingPage /> : ""}

    <Modal show={show} size='xl'  centered> 
        <Modal.Body>
          <Accordion defaultActiveKey="0">
            {arrPo?.map((x,i)=>{
              let datapos = x.options;
              let statusX = 'Open';
              let colorX = 'danger';
              let mstat =[]
              let mdivic = []
              for(let y=0; y < datapos.length; y++){
                if(x.label !== "" && datapos[y].noAkun === ""){ mstat.push('Close') }
                else if(x.label !== "" && datapos[y].noAkun === "purch"){ mstat.push('Open')}
                else if(x.label !== "" && datapos[y].noAkun === "min"){ mstat.push('Open')}
                else{ mstat.push('Close')}
                mdivic.push(datapos[y].divisi)
              }
              let cariDiv = mdivic?.filter(i => i === "Purchasing");
              let cariStas = mstat?.filter(i => i === "Open");

              if(cariDiv.length > 0){
                statusX = "Forecast"
                colorX = 'primary'
              }
              else{
                if(cariStas.length > 0){
                  statusX = "Open"
                  colorX = 'danger'
                }
                else{
                  statusX = "Close"
                  colorX = 'success'
                }
              }
              
              return(
                <Accordion.Item eventKey={i}>
                <Accordion.Header>{x.label} <Badge bg={colorX} style={{marginLeft: 10, padding: 10}}>{statusX}</Badge></Accordion.Header>
                {datapos?.map((a,b)=>{
                  let status = 'Open';
                  let colorss = '#c41414';
                  let pReady = false;
                  if(x.label !== "" && a.noAkun === ""){ status = 'Close'; colorss = '#c41414'}
                  else if(x.label !== "" && a.noAkun === "purch"){ status = 'Open'; colorss = '#287bff'}
                  else if(x.label !== "" && a.noAkun === "min"){ status = 'Open'; colorss = '#287bff'}
                  else{
                    status = 'Open'; colorss = '#c41414'
                  }

                  if(a.divisi === "Purchasing"){
                    pReady = true
                  }
                  else if(status === "Open"){
                    pReady = true
                  }
                  else{
                    pReady = false
                  }
                  return(
                    <Accordion.Body>
                    <div className="row  g-2 ">
                      <div className='col-sm-12 col-md-1 col-lg-1 col-xl-1'>
                        <Form.Group as={Col} controlId="validationCustom01">
                          <Form.Label>Qty</Form.Label>
                          <Form.Control
                            type="text"
                            value={a.qty}
                            disabled
                          />
                        </Form.Group>
                      </div>
                      <div className='col-sm-12 col-md-4 col-lg-4 col-xl-4'>
                        <Form.Group as={Col} controlId="validationCustom01">
                          <Form.Label>Eksternal Provider</Form.Label>
                          <Form.Control
                            type="text"
                            value={a.expro}
                            disabled
                          />
                        </Form.Group>
                      </div>
                      <div className='col-sm-12 col-md-2 col-lg-2 col-xl-2'>
                        <Form.Group as={Col} controlId="validationCustom01">
                          <Form.Label>Tgl Kirim</Form.Label>
                          <Form.Control
                            type="text"
                            value={a.tglDatang}
                            disabled
                          />
                        </Form.Group>
                      </div>
                      <div className='col-sm-12 col-md-2 col-lg-2 col-xl-2'>
                        <Form.Group as={Col} controlId="validationCustom01">
                          <Form.Label>Divisi</Form.Label>
                          <Form.Control
                            type="text"
                            value={a.divisi}
                            disabled
                          />
                        </Form.Group>
                      </div>
                      <div className='col-sm-12 col-md-2 col-lg-2 col-xl-2'>
                        <Form.Group as={Col} controlId="validationCustom01">
                          <Form.Label>Status</Form.Label>
                          <Form.Control
                            type="text"
                            value={status}
                            style={{background : colorss, color: 'white', textAlign: 'center'}}
                            disabled
                          />
                        </Form.Group>
                      </div>
                      <div className='col-sm-12 col-md-1 col-lg-1 col-xl-1'>
                        <div className='d-flex align-items-end flex-column'>
                          <div className='d-flex align-items-end flex-wrap'>
                            <div className='row p-1'>
                              {pReady ?
                                <Button 
                                  type="submit"
                                  variant="outline-primary m-2"
                                  className='col-sm-12	col-md-12	col-lg-12	col-xl-12'
                                  onClick={(e)=> handleMoveUpdate(a.id_Pengadaan, x.label)}
                                >
                                Update
                                </Button>
                               : ""}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Accordion.Body>
                  )

                })}
                  
              </Accordion.Item>
              )
            })}
          </Accordion>
        
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    
    </>
  )
}
