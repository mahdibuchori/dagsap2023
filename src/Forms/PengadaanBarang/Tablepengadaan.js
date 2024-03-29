import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Swal from "sweetalert2";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import { useNavigate } from 'react-router-dom';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Breadcrumb, Card, Dropdown, DropdownButton, Form, InputGroup, Stack, Tab, Tabs } from 'react-bootstrap';

import { LoadingPage } from '../../LoadingPage/LoadingPage';
import useAuthStore, { selectUser } from '../../store/DataUser';
import usePengadaanStore, {selectPengadaan, selectFetchPengadaan, selectPengadaanReady, selectFalsePengadaan} from '../../store/DataPengadaan';

export const Tablepengadaan = ({columns}) => {
    
  const arrDiv = ['FG', 'HR-GA', 'Maintenance', 'PPIC-WH', 'Produksi', 'Purchasing', 'QAQC', 'RnD', 'SSD']
  let navigate = useNavigate();
  const gridRef = useRef();
  const userData = useAuthStore(selectUser);
  const newPengadaan = usePengadaanStore(selectPengadaan);
  const fetchPengadaan = usePengadaanStore(selectFetchPengadaan);
  const pengadaanReady = usePengadaanStore(selectPengadaanReady);
  const pengadaanFalse = usePengadaanStore(selectFalsePengadaan);

  const [key, setKey] = useState('FG');

  const [bulan, setBulan] = useState();
  
  const [rowFg, setRowFg] = useState();
  const [rowHrga, setRowHrga] = useState();
  const [rowMaintenance, setRowMaintenance] = useState();
  const [rowPpic, setRowPpic] = useState();
  const [rowProduksi, setRowProduksi] = useState();
  const [rowPurchasing, setRowPurchasing] = useState();
  const [rowQaqc, setRowQaqc] = useState();
  const [rowRnD, setrowRnD] = useState();
  const [rowSsd, setRowSsd] = useState();
  const [rowFat, setRowFat] = useState();
  const [rowBudget, setRowBudget] = useState();
  const [dataPo, setDataPo] = useState([]);
  const [fileBox, setFileBox] = useState([]);

  const [usFg, setUsFg] = useState(true);
  const [usHrga, setUsHrga] = useState(true);
  const [usMaintenance, setUsMaintenance] = useState(true);
  const [usPpic, setUsPpic] = useState(true);
  const [usProduksi, setUsProduksi] = useState(true);
  const [usPurchasing, setUsPurchasing] = useState(true);
  const [usQaqc, setUsQaqc] = useState(true);
  const [usSsd, setUsSsd] = useState(true);
  const [usRnd, setUsRnd] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [dataReady, setDataReady] = useState(false);

//   const toggleShow = () => setShow(p => !p);

  const tHeigt = parseInt(window.innerHeight) - 300;
  let tWidth = 0;
  if(parseInt(window.innerWidth) < 1022){
    tWidth = parseInt(window.innerWidth) - 30;
  }
  else{
    tWidth = parseInt(window.innerWidth) - 99 ;
  }
  const [screenWidth, setScreenWidth] = useState(tWidth);
  const [screenHeight, setScreenHeight] = useState(tHeigt);

  const [jmlPengajuan, setJmlPengajuan] = useState(0);
  const [jmlRevisi, setJmlRevisi] = useState(0);
  const [jmlVerify, setJmlVerify] = useState(0);
  const [jmlSelesai, setJmlSelesai] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      let total = 0;
      let tinggi = parseInt(window.innerHeight) - 300
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
    pengadaanFalse();
    const date = new Date();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    let bb = String(month).padStart(2, '0');
    setBulan(`${year}-${bb}`);
    fetchPengadaan(`${year}-${bb}`, userData.uplan);
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
      // setIsLoading(true);
      if (!pengadaanReady) return;
      onGridReady()
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pengadaanReady]);

  useEffect(()=>{
    const cekList = () => {
      let meme = "";
      if(userData.udivisi.toUpperCase() === "PPIC-PURCHASING" && userData.ulevel === 2){
        meme = "PPIC-Purchasing"
      }
      else{
        meme = userData.usubdiv;
      }
      // const meme = userData.usubdiv;

      switch (meme) {
        case "FG":
            setKey("FG");
            setUsFg(false);
            setUsHrga(true);
            setUsMaintenance(true);
            setUsPpic(true);
            setUsProduksi(true);
            setUsPurchasing(true);
            setUsQaqc(true);
            setUsSsd(true);
            setUsRnd(true);
        break;
        case "HR-GA":
            setKey("HR-GA");
            setUsFg(true);
            setUsHrga(false);
            setUsMaintenance(true);
            setUsPpic(true);
            setUsProduksi(true);
            setUsPurchasing(true);
            setUsQaqc(true);
            setUsSsd(true);
        break;
        case "Maintenance":
            setKey("Maintenance");
            setUsFg(true);
            setUsHrga(true);
            setUsMaintenance(false);
            setUsPpic(true);
            setUsProduksi(true);
            setUsPurchasing(true);
            setUsQaqc(true);
            setUsSsd(true);
            setUsRnd(true);
        break;
        case "PPIC-WH":
            setKey("PPIC-WH");
            setUsFg(true);
            setUsHrga(true);
            setUsMaintenance(true);
            setUsPpic(false);
            setUsProduksi(true);
            setUsPurchasing(true);
            setUsQaqc(true);
            setUsSsd(true);
            setUsRnd(true);
        break;
        case "Produksi":
            setKey("Produksi");
            setUsFg(true);
            setUsHrga(true);
            setUsMaintenance(true);
            setUsPpic(true);
            setUsProduksi(false);
            setUsPurchasing(true);
            setUsQaqc(true);
            setUsSsd(true);
            setUsRnd(true);
        break;
        case "Purchasing":
            setKey("Purchasing");
            setUsFg(false);
            setUsHrga(false);
            setUsMaintenance(false);
            setUsPpic(false);
            setUsProduksi(false);
            setUsPurchasing(false);
            setUsQaqc(false);
            setUsSsd(false);
            setUsRnd(false);
        break;
        case "QAQC":
            setKey("QAQC");
            setUsFg(true);
            setUsHrga(true);
            setUsMaintenance(true);
            setUsPpic(true);
            setUsProduksi(true);
            setUsPurchasing(true);
            setUsQaqc(false);
            setUsSsd(true);
            setUsRnd(true);
        break;
        case "RnD":
            setKey("RnD");
            setUsRnd(false);
            setUsFg(true);
            setUsHrga(true);
            setUsMaintenance(true);
            setUsPpic(true);
            setUsProduksi(true);
            setUsPurchasing(true);
            setUsQaqc(true);
            setUsRnd(false);
            setUsSsd(true);
        break;
        case "SSD":
            setKey("SSD");
            setUsFg(true);
            setUsHrga(true);
            setUsMaintenance(true);
            setUsPpic(true);
            setUsProduksi(true);
            setUsPurchasing(true);
            setUsQaqc(true);
            setUsSsd(false);
            setUsRnd(true);
        break;
        case "PPIC-Purchasing":
            setKey("FG");
            setUsFg(false);
            setUsHrga(false);
            setUsMaintenance(false);
            setUsPpic(false);
            setUsProduksi(false);
            setUsPurchasing(false);
            setUsQaqc(false);
            setUsSsd(false);
            setUsRnd(false);
        break;
        case "Develop":
            setKey("FG");
            setUsFg(false);
            setUsHrga(false);
            setUsMaintenance(false);
            setUsPpic(false);
            setUsProduksi(false);
            setUsPurchasing(false);
            setUsQaqc(false);
            setUsSsd(false);
            setUsRnd(false);
        break;
        default:
              setKey("");
              setUsFg(true);
              setUsHrga(true);
              setUsMaintenance(true);
              setUsPpic(true);
              setUsProduksi(true);
              setUsPurchasing(true);
              setUsQaqc(true);
              setUsSsd(true);
      }
    }
    cekList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  useEffect (() => {
    if(!dataReady) return;
    const gntiDta = async () =>{
      try {
        setIsLoading(true);
        if(dataPo.length === 0){
          fileBox.map((e)=>{
            if(e.assigned){
              return (setDataPo(prev => [...prev, e.name]))
            }
            else{return(console.log(e.assigned))}
          })
        }
        else{
          fileBox.map((e)=>{
            if(e.assigned){
              // let data =[...dataPo]
              return (setDataPo(prev => [...prev, e.name]))
            }
            else{
              return(
                setDataPo((current) => current.filter((i) => {
                  return(
                    i !== e.name
                  )})
                )
              )
            }
          })
        }
        // let uniqueChars = [...new Set(dataPo)]
        // setDataPo(uniqueChars)
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

  const onGridReady =async () =>{
    try {
      setDataPo([])
      console.log(newPengadaan)
      const fg = newPengadaan.filter(x => x.user[0].divisi.toUpperCase() === "FG");
      const hrga =newPengadaan.filter(x => x.user[0].divisi.toUpperCase() === "HR-GA");
      const maintenance = newPengadaan.filter(x => x.user[0].divisi.toUpperCase() === "MAINTENANCE");
      const ppic = newPengadaan.filter(x => x.user[0].divisi.toUpperCase() === "PPIC-WH");
      const produksi = newPengadaan.filter(x => x.user[0].divisi.toUpperCase() === "PRODUKSI");
      const purchasing =newPengadaan.filter(x => x.user[0].divisi.toUpperCase() === "PURCHASING");
      const qaqc =newPengadaan.filter(x => x.user[0].divisi.toUpperCase() === "QAQC");
      const rnd =newPengadaan.filter(x => x.user[0].divisi.toUpperCase() === "RND");
      const ssd = newPengadaan.filter(x => x.user[0].divisi.toUpperCase() === "SSD");
      const fat = newPengadaan.filter(x => x.user[0].divisi.toUpperCase() === "FAT");
      const budg = newPengadaan.filter(x => x.user[0].divisi.toUpperCase() === "BUDGETING");

      const jumPengajuan = newPengadaan.filter(x => x.status.toUpperCase() === "PENGAJUAN");  
      const jumRevisi = newPengadaan.filter(x => x.status.toUpperCase() === "REVISI");       
      const jumVerify = newPengadaan.filter(x => x.status.toUpperCase() === "VERIFIKASI");    
      const jumSelesai = newPengadaan.filter(x => x.status.toUpperCase() === "SELESAI");

      fg.sort(function(a, b) {
        const dateA = new Date(a.t_pengadaan);
        const dateB = new Date(b.t_pengadaan);
        return dateB - dateA;
      });
      hrga.sort(function(a, b) {
        const dateA = new Date(a.t_pengadaan);
        const dateB = new Date(b.t_pengadaan);
        return dateB - dateA;
      });
      maintenance.sort(function(a, b) {
        const dateA = new Date(a.t_pengadaan);
        const dateB = new Date(b.t_pengadaan);
        return dateB - dateA;
      });
      ppic.sort(function(a, b) {
        const dateA = new Date(a.t_pengadaan);
        const dateB = new Date(b.t_pengadaan);
        return dateB - dateA;
      });
      produksi.sort(function(a, b) {
        const dateA = new Date(a.t_pengadaan);
        const dateB = new Date(b.t_pengadaan);
        return dateB - dateA;
      });
      purchasing.sort(function(a, b) {
        const dateA = new Date(a.t_pengadaan);
        const dateB = new Date(b.t_pengadaan);
        return dateB - dateA;
      });
      qaqc.sort(function(a, b) {
        const dateA = new Date(a.t_pengadaan);
        const dateB = new Date(b.t_pengadaan);
        return dateB - dateA;
      });
      rnd.sort(function(a, b) {
        const dateA = new Date(a.t_pengadaan);
        const dateB = new Date(b.t_pengadaan);
        return dateB - dateA;
      });
      ssd.sort(function(a, b) {
        const dateA = new Date(a.t_pengadaan);
        const dateB = new Date(b.t_pengadaan);
        return dateB - dateA;
      });
      fat.sort(function(a, b) {
        const dateA = new Date(a.t_pengadaan);
        const dateB = new Date(b.t_pengadaan);
        return dateB - dateA;
      });
      budg.sort(function(a, b) {
        const dateA = new Date(a.t_pengadaan);
        const dateB = new Date(b.t_pengadaan);
        return dateB - dateA;
      });
      
      setRowFg(fg); 
      setRowHrga(hrga);
      setRowMaintenance(maintenance);
      setRowPpic(ppic);
      setRowProduksi(produksi);
      setRowPurchasing(purchasing);
      setRowQaqc(qaqc);
      setrowRnD(rnd)
      setRowSsd(ssd);
      setRowFat(fat);
      setRowBudget(budg);

      setJmlPengajuan(jumPengajuan.length);
      setJmlRevisi(jumRevisi.length);
      setJmlVerify(jumVerify.length);
      setJmlSelesai(jumSelesai.length);
      await pengadaanFalse()
      if(pengadaanReady){
        await pengadaanFalse()
      }
      setIsLoading(false);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Pengambilan Data Pengadaan Gagal!',
        footer: error.message
      })
      setIsLoading(false);
    }
  }

  const onSetDate =async (event) => {
    setIsLoading(true)
    pengadaanFalse();
    setBulan(event.target.value);
    await fetchPengadaan(event.target.value, userData.uplan);
    
  }

  const defaultColDef = useMemo(() => {
    return {
    editable: false,
    sortable: true,
    filter: true,
    resizable: true,
    };
  }, []);

  const handleDrop = (data,key) =>{
    const fg = newPengadaan.filter(x => x.user[0].divisi.toUpperCase() === "FG" && x.status.toUpperCase() === data.toUpperCase());
    const hrga =newPengadaan.filter(x => x.user[0].divisi.toUpperCase() === "HR-GA" && x.status.toUpperCase() === data.toUpperCase());
    const maintenance = newPengadaan.filter(x => x.user[0].divisi.toUpperCase() === "MAINTENANCE" && x.status.toUpperCase() === data.toUpperCase());
    const ppic = newPengadaan.filter(x => x.user[0].divisi.toUpperCase() === "PPIC-WH" && x.status.toUpperCase() === data.toUpperCase());
    const produksi = newPengadaan.filter(x => x.user[0].divisi.toUpperCase() === "PRODUKSI" && x.status.toUpperCase() === data.toUpperCase());
    const purchasing =newPengadaan.filter(x => x.user[0].divisi.toUpperCase() === "PURCHASING" && x.status.toUpperCase() === data.toUpperCase());
    const qaqc =newPengadaan.filter(x => x.user[0].divisi.toUpperCase() === "QAQC" && x.status.toUpperCase() === data.toUpperCase());
    const rnd =newPengadaan.filter(x => x.user[0].divisi.toUpperCase() === "RND" && x.status.toUpperCase() === data.toUpperCase());
    const ssd = newPengadaan.filter(x => x.user[0].divisi.toUpperCase() === "SSD" && x.status.toUpperCase() === data.toUpperCase());
    const fat = newPengadaan.filter(x => x.user[0].divisi.toUpperCase() === "FAT" && x.status.toUpperCase() === data.toUpperCase());
    const budg = newPengadaan.filter(x => x.user[0].divisi.toUpperCase() === "BUDGETING" && x.status.toUpperCase() === data.toUpperCase());

    fg.sort(function(a, b) {
      const dateA = new Date(a.t_pengadaan);
      const dateB = new Date(b.t_pengadaan);
      return dateB - dateA;
    });
    hrga.sort(function(a, b) {
      const dateA = new Date(a.t_pengadaan);
      const dateB = new Date(b.t_pengadaan);
      return dateB - dateA;
    });
    maintenance.sort(function(a, b) {
      const dateA = new Date(a.t_pengadaan);
      const dateB = new Date(b.t_pengadaan);
      return dateB - dateA;
    });
    ppic.sort(function(a, b) {
      const dateA = new Date(a.t_pengadaan);
      const dateB = new Date(b.t_pengadaan);
      return dateB - dateA;
    });
    produksi.sort(function(a, b) {
      const dateA = new Date(a.t_pengadaan);
      const dateB = new Date(b.t_pengadaan);
      return dateB - dateA;
    });
    purchasing.sort(function(a, b) {
      const dateA = new Date(a.t_pengadaan);
      const dateB = new Date(b.t_pengadaan);
      return dateB - dateA;
    });
    qaqc.sort(function(a, b) {
      const dateA = new Date(a.t_pengadaan);
      const dateB = new Date(b.t_pengadaan);
      return dateB - dateA;
    });
    rnd.sort(function(a, b) {
      const dateA = new Date(a.t_pengadaan);
      const dateB = new Date(b.t_pengadaan);
      return dateB - dateA;
    });
    ssd.sort(function(a, b) {
      const dateA = new Date(a.t_pengadaan);
      const dateB = new Date(b.t_pengadaan);
      return dateB - dateA;
    });
    fat.sort(function(a, b) {
      const dateA = new Date(a.t_pengadaan);
      const dateB = new Date(b.t_pengadaan);
      return dateB - dateA;
    });
    budg.sort(function(a, b) {
      const dateA = new Date(a.t_pengadaan);
      const dateB = new Date(b.t_pengadaan);
      return dateB - dateA;
    });

    setRowFg(fg);
    setRowHrga(hrga);
    setRowMaintenance(maintenance);
    setRowPpic(ppic);
    setRowProduksi(produksi);
    setRowPurchasing(purchasing);
    setRowQaqc(qaqc);
    setrowRnD(rnd)
    setRowSsd(ssd);
    setRowFat(fat);
    setRowBudget(budg);
    /* 
    uuid	
    uname	
    udivisi	
    usubdiv
    */
    if(userData.uplan === "Sentul"){
      if(userData.udivisi.toUpperCase() === "PPIC-PURCHASING" && userData.ulevel === 2 ){
        setKey(key)
      }
      else{
        if(userData.usubdiv.toUpperCase() === "PURCHASING" || userData.usubdiv.toUpperCase() === "DEVELOP"){
          setKey(key)
        }
        else{
          if(key.toUpperCase() === userData.usubdiv.toUpperCase()){
            setKey(key);
          }
          else{
            Swal.fire("Info","Anda tidak memiliki akses",'warning');
          }
        }
      }
    }
    else{}
  }

  const printChange = () => {
    /* if(userData.user_divisi === "Purchasing" || userData.user_divisi === "Develop"){
        if(pilihPrint.length === 0){
            Swal.fire({
                title: 'Oops...',
                icon: 'error',
                text: 'Harap Pilih Data Yang Akan Di Cetak',
            })
        }
        else{
            let path = `Preview`;
            navigate(path, {state:{data: pilihPrint}})
            
        }
    }
    else{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Anda Tidak Memiliki Akses',
            footer: 'Harap Hubungi Divisi Purchasing'
          })
    } */
    let uniqueChars = [...new Set(dataPo)];
      let next = uniqueChars.map((e)=>{
          let cekData = newPengadaan.filter((i)=>i.id_Pengadaan === e);
          return(
            {status : cekData[0].status}
          )
          
      })
      let fData = next.filter((i)=>i.status !== "Verifikasi");
      if(fData.length === 0){
        let newArray = newPengadaan.filter(
          (array22) => uniqueChars.some((array11) => array11 === array22.id_Pengadaan));
          console.log(newArray)
          navigate(`/form/pengadaan/printview`,{state:{
            data : newArray
          }
        }
        );
      }
      else{
        Swal.fire('Oppss..','Harap cek kembali pilihan anda masih ada status pengajuan, revisi atau sudah selsai dalam pengadaan','warning')
      }
    
  }

  const onSelectionChanged = useCallback((params) => {
    const list = []
    params.api.forEachNode((node,i) => {
      list.push({name: node.data.id_Pengadaan, assigned: node.selected});
    });
    setFileBox(list)
    setDataReady(true)
  }, []);

  const createPurchase = () =>{
    if(userData.usubdiv === "Purchasing"){
      let uniqueChars = [...new Set(dataPo)];
      let next = uniqueChars.map((e)=>{
          let cekData = newPengadaan.filter((i)=>i.id_Pengadaan === e);
          return(
            {status : cekData[0].status}
          )
          
      })
      let fData = next.filter((i)=>i.status !== "Verifikasi");
      if(fData.length === 0){
        let newArray = newPengadaan.filter(
          (array22) => uniqueChars.some((array11) => array11 === array22.id_Pengadaan));
          navigate(`/form/purchaseorder/create`,{state:{
            data : newArray
          }}
        );
      }
      else{
        Swal.fire('Oppss..','Harap cek kembali pilihan anda masih ada status pengajuan, revisi atau sudah selsai dalam pengadaan','warning')
      }

    }
    else{
      Swal.fire('Oppss...','Anda tidak memilik akses','error')
    }

    
    
  }

  const refreshPage = () => {
    window.location.reload(false);
  }
  return (
    
    <>
      <div>
        <Stack direction="horizontal" gap={3} style={{padding: "0px 10px 0px 10px"}}>
          <div className="bg-body">
              <Breadcrumb className="bg-body m-2">
                  <Breadcrumb.Item onClick={() =>navigate('/form')}>Form</Breadcrumb.Item>
                  <Breadcrumb.Item active>Pengadaan</Breadcrumb.Item>
              </Breadcrumb>
          </div>
          <div className="ms-auto">
            <div style={{marginRight: 10, display:'flex'}}>
              <InputGroup variant="outline-primary">
                <Form.Control
                  type="month"
                  value={bulan}
                  min="2020-08"
                  onChange={(e) =>onSetDate(e)}
                />
              </InputGroup>
            </div>
          </div>
          <div className="vr" />
          <div className="bg-body">
            <Dropdown>
              <Dropdown.Toggle variant="primary">
              Menu
              </Dropdown.Toggle>
      
              <Dropdown.Menu variant="dark">
                <Dropdown.Item onClick={(e) => navigate('/form/pengadaan/create')}><i class="bi bi-pencil"></i> Create Pengadaan</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={createPurchase}><i class="bi bi-pencil"></i> Create PO</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={printChange}><i className="bi bi-printer"></i> Print</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={refreshPage}><i className="bi bi-arrow-clockwise"></i> Refresh</Dropdown.Item>
                  
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Stack>
        <div className="row mb-1 mt-1" style={{padding: "0px 10px 0px 10px"}}>
            <div className="col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3">
                <Card className='mb-1'>
                    <div className="radius-10 border-start border-0 border-3 border-dark">
                        <Card.Body style={{height: "50px", padding: '8px'}}>
                            <Stack direction="horizontal" gap={3}>
                                <div>
                                    <h6>Pengajuan ({jmlPengajuan})</h6>
                                </div>
                                <div className="bg-light ms-auto">
                                    <DropdownButton id="dropdown-basic-button" variant="outline-dark" size='sm'>
                                      {arrDiv.map((x, i) => {
                                        let index = arrDiv[i].toString();
                                        let index1 = '';
                                        let index2 = '';
                                        if(index === "Semua"){
                                          index1 = newPengadaan;
                                        }
                                        else{
                                          index1 = newPengadaan.filter(x => x.user[0].divisi.toUpperCase() === index.toUpperCase() && x.status.toUpperCase() === "PENGAJUAN");
                                        }
                                        
                                        index2 = `${index} (${index1.length})`
                                        
                                        return(
                                          <Dropdown.Item onClick={(e)=> handleDrop("PENGAJUAN",index)}>{index2}</Dropdown.Item>
                                        )
                                          
                                      })}
                                    </DropdownButton>
                                </div>
                            </Stack>
                        </Card.Body>
                    </div>
                </Card>
            </div>
            <div className="col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3">
                <Card className='mb-1'>
                    <div className="radius-10 border-start border-0 border-3 border-warning">
                        <Card.Body style={{height: "50px", padding: '8px'}}>
                            <Stack direction="horizontal" gap={3}>
                                <div>
                                    <h6>Revisi ({jmlRevisi})</h6>
                                </div>
                                <div className="bg-light ms-auto">
                                    <DropdownButton id="dropdown-basic-button" variant="outline-warning" size='sm'>
                                        {arrDiv.map((x, i) => {
                                            let index = arrDiv[i].toString();
                                            let index1 = '';
                                            let index2 = '';
                                            if(index === "Semua"){
                                                index1 = newPengadaan;
                                            }
                                            else{
                                                index1 = newPengadaan.filter(x => x.user[0].divisi.toUpperCase() === index.toUpperCase() && x.status.toUpperCase() === "REVISI");
                                                
                                            }
                                            
                                            index2 = `${index} (${index1.length})`
                                            
                                            return(
                                                <Dropdown.Item onClick={(e)=> handleDrop("REVISI",index)}>{index2}</Dropdown.Item>
                                            )
                                            
                                        })}
                                    </DropdownButton>
                                </div>
                            </Stack>
                        </Card.Body>
                    </div>
                </Card>
            </div>
            <div className="col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3">
                <Card className='mb-1'>
                    <div className="radius-10 border-start border-0 border-3 border-primary">
                        <Card.Body style={{height: "50px", padding: '8px'}}>
                            <Stack direction="horizontal" gap={3}>
                                <div>
                                    <h6>Verifikasi ({jmlVerify})</h6>
                                </div>
                                <div className="bg-light ms-auto">
                                    <DropdownButton id="order" variant="outline-primary" size='sm'>
                                        {arrDiv.map((x, i) => {
                                            let index = arrDiv[i].toString();
                                            let index1 = '';
                                            let index2 = '';
                                            if(index === "Semua"){
                                                index1 = newPengadaan;
                                            }
                                            else{
                                                index1 = newPengadaan.filter(x => x.user[0].divisi.toUpperCase() === index.toUpperCase() && x.status.toUpperCase() === "VERIFIKASI");
                                                
                                            }
                                            
                                            index2 = `${index} (${index1.length})`
                                            
                                            return(
                                                <Dropdown.Item onClick={(e)=> handleDrop("VERIFIKASI",index)}>{index2}</Dropdown.Item>
                                            )
                                            
                                        })}
                                    </DropdownButton>
                                </div>
                            </Stack>
                        </Card.Body>
                    </div>
                </Card>
            </div>
            <div className="col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3">
                <Card className='mb-1'>
                    <div className="radius-10 border-start border-0 border-3 border-success">
                        <Card.Body style={{height: "50px", padding: '8px'}}>
                            <Stack direction="horizontal" gap={3}>
                                <div>
                                    <h6>Selesai ({jmlSelesai})</h6>
                                </div>
                                <div className="bg-light ms-auto">
                                    <DropdownButton id="dropdown-basic-button" variant="outline-success" size='sm'>
                                        {arrDiv.map((x, i) => {
                                            let index = arrDiv[i].toString();
                                            let index1 = '';
                                            let index2 = '';
                                            if(index === "Semua"){
                                                index1 = newPengadaan;
                                            }
                                            else{
                                                index1 = newPengadaan.filter(x => x.user[0].divisi.toUpperCase() === index.toUpperCase() && x.status.toUpperCase() === "SELESAI");
                                                
                                            }
                                            
                                            index2 = `${index} (${index1.length})`
                                            
                                            return(
                                                <Dropdown.Item onClick={(e)=> handleDrop("SELESAI",index)}>{index2}</Dropdown.Item>
                                            )
                                            
                                        })}
                                    </DropdownButton>
                                </div>
                                
                            </Stack>
                        </Card.Body>
                    </div>
                </Card>
            </div>
        </div>

        <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => {
                setKey(k);
                // onGridReady();
            }}
            className="mb-1"
        >
            <Tab eventKey="FG" title="FG" disabled={usFg}>
                <div style={{height: screenHeight, width: screenWidth, padding: 10}} className="ag-theme-alpine">
                    <AgGridReact
                        ref={gridRef}
                        rowData={rowFg}
                        columnDefs={columns}
                        defaultColDef={defaultColDef}
                        pagination={false}
                        cacheQuickFilter={true}
                        rowSelection={'multiple'}
                        onSelectionChanged={onSelectionChanged}
                    ></AgGridReact>
                </div>
            </Tab>
            <Tab eventKey="HR-GA" title="HR-GA" disabled={usHrga}>
                <div style={{height: screenHeight, width: screenWidth, padding: 10}} className="ag-theme-alpine">
                    <AgGridReact
                    ref={gridRef}
                    rowData={rowHrga}
                    columnDefs={columns}
                    defaultColDef={defaultColDef}
                    rowSelection={'multiple'}
                    onSelectionChanged={onSelectionChanged}
                    pagination={false}
                    cacheQuickFilter={true}
                    ></AgGridReact>
                </div>
            </Tab>
            <Tab eventKey="Maintenance" title="Maintenance" disabled={usMaintenance}>
                <div style={{height: screenHeight, width: screenWidth, padding: 10}} className="ag-theme-alpine">
                    <AgGridReact
                    ref={gridRef}
                    rowData={rowMaintenance}
                    columnDefs={columns}
                    defaultColDef={defaultColDef}
                    pagination={false}
                    cacheQuickFilter={true}
                    rowSelection={'multiple'}
                    onSelectionChanged={onSelectionChanged}
                    ></AgGridReact>
                </div>
            </Tab>
            <Tab eventKey="PPIC-WH" title="PPIC-WH" disabled={usPpic}>
                <div style={{height: screenHeight, width: screenWidth, padding: 10}} className="ag-theme-alpine">
                    <AgGridReact
                    ref={gridRef}
                    // ref={gridPP}
                    rowData={rowPpic}
                    columnDefs={columns}
                    defaultColDef={defaultColDef}
                    rowSelection={'multiple'}
                    onSelectionChanged={onSelectionChanged}
                    pagination={false}
                    cacheQuickFilter={true}
                    ></AgGridReact>
                </div>
            </Tab>
            <Tab eventKey="Produksi" title="Produksi" disabled={usProduksi}>
                <div style={{height: screenHeight, width: screenWidth, padding: 10}} className="ag-theme-alpine">
                    <AgGridReact
                    ref={gridRef}
                    rowData={rowProduksi}
                    columnDefs={columns}
                    defaultColDef={defaultColDef}
                    pagination={false}
                    rowSelection={'multiple'}
                    onSelectionChanged={onSelectionChanged}
                    cacheQuickFilter={true}
                    ></AgGridReact>
                </div>
            </Tab>
            <Tab eventKey="Purchasing" title="Purchasing" disabled={usPurchasing}>
                <div style={{height: screenHeight, width: screenWidth, padding: 10}} className="ag-theme-alpine">
                    <AgGridReact
                    ref={gridRef}
                    // ref={gridPur}
                    rowData={rowPurchasing}
                    columnDefs={columns}
                    defaultColDef={defaultColDef}
                    rowSelection={'multiple'}
                    onSelectionChanged={onSelectionChanged}
                    rowMultiSelectWithClick={true}
                    pagination={false}
                    cacheQuickFilter={true}
                    ></AgGridReact>
                </div>
            </Tab>
            <Tab eventKey="QAQC" title="QAQC" disabled={usQaqc}>
                <div style={{height: screenHeight, width: screenWidth, padding: 10}} className="ag-theme-alpine">
                    <AgGridReact
                      ref={gridRef}
                      rowData={rowQaqc}
                      columnDefs={columns}
                      defaultColDef={defaultColDef}
                      pagination={false}
                      cacheQuickFilter={true}
                      rowSelection={'multiple'}
                      onSelectionChanged={onSelectionChanged}
                    ></AgGridReact>
                </div>
            </Tab>
            <Tab eventKey="RnD" title="RnD" disabled={usRnd}>
                <div style={{height: screenHeight, width: screenWidth, padding: 10}} className="ag-theme-alpine">
                  <AgGridReact
                    ref={gridRef}
                    rowData={rowRnD}
                    columnDefs={columns}
                    defaultColDef={defaultColDef}
                    pagination={false}
                    cacheQuickFilter={true}
                    rowSelection={'multiple'}
                    onSelectionChanged={onSelectionChanged}
                  ></AgGridReact>
                </div>
            </Tab>
            <Tab eventKey="SSD" title="SSD" disabled={usSsd}>
                <div style={{height: screenHeight, width: screenWidth, padding: 10}} className="ag-theme-alpine">
                  <AgGridReact
                    ref={gridRef}
                    rowData={rowSsd}
                    columnDefs={columns}
                    defaultColDef={defaultColDef}
                    pagination={false}
                    cacheQuickFilter={true}
                    rowSelection={'multiple'}
                    onSelectionChanged={onSelectionChanged}
                  ></AgGridReact>
                </div>
            </Tab>
            <Tab eventKey="FAT" title="FAT" disabled={usSsd}>
                <div style={{height: screenHeight, width: screenWidth, padding: 10}} className="ag-theme-alpine">
                  <AgGridReact
                    ref={gridRef}
                    rowData={rowFat}
                    columnDefs={columns}
                    defaultColDef={defaultColDef}
                    pagination={false}
                    cacheQuickFilter={true}
                    rowSelection={'multiple'}
                    onSelectionChanged={onSelectionChanged}
                  ></AgGridReact>
                </div>
            </Tab>
            <Tab eventKey="Budgeting" title="Budgeting" disabled={usSsd}>
                <div style={{height: screenHeight, width: screenWidth, padding: 10}} className="ag-theme-alpine">
                  <AgGridReact
                    ref={gridRef}
                    rowData={rowBudget}
                    columnDefs={columns}
                    defaultColDef={defaultColDef}
                    pagination={false}
                    cacheQuickFilter={true}
                    rowSelection={'multiple'}
                    onSelectionChanged={onSelectionChanged}
                  ></AgGridReact>
                </div>
            </Tab>
        
        </Tabs>
        <span id="selectedRows"></span>
      </div>

      {isLoading ? <LoadingPage/> : ""}
    </>
  )
}
