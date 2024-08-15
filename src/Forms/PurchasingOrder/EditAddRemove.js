import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Swal from "sweetalert2";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Form, InputGroup, Stack, Tab, Tabs, Button, Modal } from 'react-bootstrap';

import { COLUMNS_PENGADAAN1 } from '../../datafile/columns';
import { LoadingPage } from '../../LoadingPage/LoadingPage';
import useAuthStore, { selectUser } from '../../store/DataUser';
import usePengadaanStore, {selectPengadaan, selectFetchPengadaan, selectPengadaanReady, selectFalsePengadaan} from '../../store/DataPengadaan';

export const EditAddRemove = (props) => {
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
    const [rowSales, setRowSales] = useState();
    const [dataPo, setDataPo] = useState([]);
    const [fileBox, setFileBox] = useState([]);
    const [dataPos, setdataPos] = useState([]);

    const [usFg, setUsFg] = useState(true);
    const [usHrga, setUsHrga] = useState(true);
    const [usMaintenance, setUsMaintenance] = useState(true);
    const [usPpic, setUsPpic] = useState(true);
    const [usProduksi, setUsProduksi] = useState(true);
    const [usPurchasing, setUsPurchasing] = useState(true);
    const [usQaqc, setUsQaqc] = useState(true);
    const [usSsd, setUsSsd] = useState(true);
    const [usRnd, setUsRnd] = useState(true);
    const [usFat, setUsFat] = useState(true);
    const [usBudg, setUsBudg] = useState(true);
    const [usSales, setUsSales] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [dataReady, setDataReady] = useState(false);
    const [fileReady, setFileReady] = useState(false);
    // const [cekReady, setCekReady] = useState(false);
    const [cekUbah, setCekUbah] = useState(false);

    const tHeigt = parseInt(window.innerHeight) - 300;
    let tWidth = 0;
    if(parseInt(window.innerWidth) < 1022){
        tWidth = parseInt(window.innerWidth) - 50;
    }
    else{
        tWidth = parseInt(window.innerWidth) - 50;
    }
    const [screenWidth, setScreenWidth] = useState(tWidth);
    const [screenHeight, setScreenHeight] = useState(tHeigt);

    useEffect(() => {
        const handleResize = () => {
          let total = 0;
          let tinggi = parseInt(window.innerHeight) - 300
          if(parseInt(window.innerWidth) < 1022){
            total = parseInt(window.innerWidth) - 50;
          }
          else{
            total = parseInt(window.innerWidth) - 50;
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

    useEffect(() => {
        setdataPos(props.data)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    useEffect(()=>{
        const cekList = () => {
            const meme = userData.usubdiv;
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
                setUsBudg(true);
                setUsFat(true);
                setUsSales(true);
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
                setUsRnd(true);
                setUsBudg(true);
                setUsFat(true);
                setUsSales(true);
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
                setUsBudg(true);
                setUsFat(true);
                setUsSales(true);
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
                setUsBudg(true);
                setUsFat(true);
                setUsSales(true);
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
                setUsBudg(true);
                setUsFat(true);
                setUsSales(true);
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
                setUsBudg(false);
                setUsFat(false);
                setUsSales(false);
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
                setUsBudg(true);
                setUsFat(true);
                setUsSales(true);
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
                setUsSsd(true);
                setUsBudg(true);
                setUsFat(true);
                setUsSales(true);
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
                setUsBudg(true);
                setUsFat(true);
                setUsSales(true);
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
                setUsBudg(false);
                setUsFat(false);
                setUsSales(false);
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
                setUsBudg(false);
                setUsFat(false);
                setUsSales(false);
            break;
            case "BOD/BOC":
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
                setUsBudg(false);
                setUsFat(false);
                setUsSales(false);
            break;
            case "FAT":
                setKey("FAT");
                setUsFg(true);
                setUsHrga(true);
                setUsMaintenance(true);
                setUsPpic(true);
                setUsProduksi(true);
                setUsPurchasing(true);
                setUsQaqc(true);
                setUsSsd(true);
                setUsRnd(true);
                setUsBudg(true);
                setUsFat(false);
                setUsSales(true);
            break;
            case "FAT & Budgeting":
                setKey("FAT");
                setUsFg(true);
                setUsHrga(true);
                setUsMaintenance(true);
                setUsPpic(true);
                setUsProduksi(true);
                setUsPurchasing(true);
                setUsQaqc(true);
                setUsSsd(true);
                setUsRnd(true);
                setUsBudg(false);
                setUsFat(false);
                setUsSales(true);
            break;
            case "Sales-Marketing":
                setKey("SSD");
                setUsFg(true);
                setUsHrga(true);
                setUsMaintenance(true);
                setUsPpic(true);
                setUsProduksi(true);
                setUsPurchasing(true);
                setUsQaqc(true);
                setUsSsd(true);
                setUsRnd(true);
                setUsBudg(true);
                setUsFat(true);
                setUsSales(false);
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
            setFileReady(true)
        } 

        gntiDta();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[dataReady]);

    useEffect (() => {
        if(!fileReady) return;
        const gntiDta = async () =>{
          try {
            setIsLoading(true);
            let uniqueChars = [...new Set(dataPo)];
            let next = uniqueChars.map((e)=>{
              let cekData = newPengadaan.filter((i)=>i.id_Pengadaan === e);
              let status = "";
              if(cekData[0].status === "Verifikasi" || cekData[0].status === "Selesai"){status = "Verifikasi"}else{status = "Pengajuan"}
              
              return(
                {status : status}
              )  
            });

            let fData = next.filter((i)=>i.status !== "Verifikasi");
            if(fData.length === 0){
              let posCek = dataPos;
              let newArray = newPengadaan.filter((array22) => uniqueChars.some((array11) => array11 === array22.id_Pengadaan));
              if(posCek.length === 0){
                setdataPos(newArray)
              }
              else{
                if(newArray.length > 0){
                  let isi = [...dataPos, ...newArray]
                  const same = dataPos.filter((item, index, self) =>
                    index === self.findIndex((t) => (
                      t.id_Pengadaan === item.id_Pengadaan
                    ))
                  );
                  const dataAda = same.filter((item) => item.filter_bulan === bulan)
                  const datatdk = same.filter((item) => item.filter_bulan !== bulan)
                  if(dataAda.length > 0 && datatdk.length === 0){
                    if(dataAda.length < newArray.length){
                      setdataPos(newArray)
                    }
                    else if(dataAda.length > newArray.length){
                      setdataPos(newArray)
                    }
                    else{}
                  }
                  else if(dataAda.length === 0 && datatdk.length > 0){
                    if(dataAda.length < newArray.length){
                      // let isi = [...dataSementara, ...newArray]
                      setdataPos(isi)
                    }
                    else if(dataAda.length > newArray.length){
                        setdataPos(isi)
                    }
                    else{}
                  }
                  else if(dataAda.length > 0 && datatdk.length > 0){
                    if(dataAda.length < newArray.length){
                      let isi = [...dataPos, ...newArray]
                      const same = isi.filter((item, index, self) =>
                        index === self.findIndex((t) => (
                          t.id_Pengadaan === item.id_Pengadaan
                        ))
                      );
                      setdataPos(same)
                    }
                    else if(dataAda.length > newArray.length){
                        setdataPos([...datatdk, ...newArray])
                    }
                    else{}
                  }
                  else{
                    console.log("test data")
                  }
                  // setDataSementara(isi)
                }
                else{
                  const same = dataPos.filter((item, index, self) =>
                    index === self.findIndex((t) => (
                      t.id_Pengadaan === item.id_Pengadaan
                    ))
                  );
                  const dataAda = same.filter((item) => item.filter_bulan === bulan);
                  const datatdk = same.filter((item) => item.filter_bulan !== bulan);
                  if(dataAda.length > 0 && datatdk.length === 0){
                    setdataPos([])
                  }
                  else if(dataAda.length === 0 && datatdk.length > 0){
                    setdataPos(datatdk)
                  }
                  else if(dataAda.length > 0 && datatdk.length > 0){
                    if(cekUbah === true){
                        setdataPos([...dataAda, ...datatdk])
                    }
                    else{
                        setdataPos(datatdk)
                    }
                    
                  }
                  else{}
                  setCekUbah(false);
                  setDataReady(false);
                  setFileReady(false);
                //   setCekReady(false);
                }
                
              }
            }
            else{
            //   console.log(dataPos)
              Swal.fire('Oppss..','Harap cek kembali pilihan anda masih ada status pengajuan, revisi atau sudah selsai dalam pengadaan','warning')
            }
            setIsLoading(false);
          } catch (error) {
              setIsLoading(false);
              Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Pengambilan Data Pengadaan Gagal!2',
              footer: error
            })
          }
          setFileReady(false);
        //   setCekReady(true)
        } 
    
        gntiDta();
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
      },[fileReady]);

    const onGridReady =async () =>{
        try {
            setDataPo([])
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
            const sales = newPengadaan.filter(x => x.user[0].divisi.toUpperCase() === "SALES-MARKETING");
        
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
            sales.sort(function(a, b) {
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
            setRowSales(sales);

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
        setDataReady(false);
        setFileReady(false);
        // setCekReady(false);
        setCekUbah(true)
        await fetchPengadaan(event.target.value, userData.uplan);
    }

    const columns = useMemo(() => COLUMNS_PENGADAAN1, []);

    const defaultColDef = useMemo(() => {
        return {
            editable: false,
            sortable: true,
            filter: true,
            resizable: true,
        };
    }, []);

    const onSelectionChanged = useCallback((params) => {
        const list = []
        params.api.forEachNode((node,i) => {
            let myStatus = "";
            const filt = props.data.filter((c) => c.id_Pengadaan === node.data.id_Pengadaan)
            if(node.data.status === "Selesai"){
                if(filt.length > 0){
                    if(node.selected === true){
                        myStatus = true;
                    }
                    else{
                        myStatus = false;
                    }
                    
                }
                else{
                    myStatus = false;
                }
            }
            else{
                myStatus = node.selected;
            }
            node.setSelected(myStatus)
            list.push({name: node.data.id_Pengadaan, assigned: myStatus});
        });
        setFileBox(list)
        setDataReady(true)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onRowDataUpdated = useCallback((params) => {
        const nodesToSelect = [];
        params.api.forEachNode((node) => {
          if(dataPos.length > 0){
            for(let x =0; x < dataPos.length; x++){
              if (node.data && node.data.id_Pengadaan === dataPos[x].id_Pengadaan){
                nodesToSelect.push(node);
              }
            }
          }
        });
        params.api.setNodesSelected({ nodes: nodesToSelect, newValue: true });
    }, [dataPos]);

    const createPurchase = () =>{
        if(userData.usubdiv === "Purchasing"){
            console.log(dataPos)
            console.log(props.data)
            // let fData = dataPos.filter((i)=>i.status !== "Verifikasi");
            props.onAddGoal(dataPos);
            props.close();
            /* if(fData.length === 0){
                props.onAddGoal(dataPos);
                props.close();
            }
            else{
                Swal.fire('Oppss..','Harap cek kembali pilihan anda masih ada status pengajuan, revisi atau sudah selsai dalam pengadaan','warning')
            } */
    
        }
        else{
          Swal.fire('Oppss...','Anda tidak memilik akses','error')
        }   
    }

    const handleClose =() =>{
        props.close()
    }

    return (
        <>
        <Modal
            show={props.show}
            cancel={props.close}
            fullscreen={true}
            centered
        >
            <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">Tabel Pengadaan</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <Stack direction="horizontal" gap={3} style={{padding: "0px 10px 0px 10px"}}>
                    <div className="bg-body">
                    </div>
                    <div className="ms-auto">
                    </div>
                    <div className="vr" />
                    <div className="bg-body">
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
                    </Stack>

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
                                    onRowDataUpdated={onRowDataUpdated}
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
                                onRowDataUpdated={onRowDataUpdated}
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
                                onRowDataUpdated={onRowDataUpdated}
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
                                onRowDataUpdated={onRowDataUpdated}
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
                                onRowDataUpdated={onRowDataUpdated}
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
                                onRowDataUpdated={onRowDataUpdated}
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
                                onRowDataUpdated={onRowDataUpdated}
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
                                onRowDataUpdated={onRowDataUpdated}
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
                                onRowDataUpdated={onRowDataUpdated}
                                onSelectionChanged={onSelectionChanged}
                            ></AgGridReact>
                            </div>
                        </Tab>
                        <Tab eventKey="FAT" title="FAT" disabled={usFat}>
                            <div style={{height: screenHeight, width: screenWidth, padding: 10}} className="ag-theme-alpine">
                            <AgGridReact
                                ref={gridRef}
                                rowData={rowFat}
                                columnDefs={columns}
                                defaultColDef={defaultColDef}
                                pagination={false}
                                cacheQuickFilter={true}
                                rowSelection={'multiple'}
                                onRowDataUpdated={onRowDataUpdated}
                                onSelectionChanged={onSelectionChanged}
                            ></AgGridReact>
                            </div>
                        </Tab>
                        <Tab eventKey="Budgeting" title="Budgeting" disabled={usBudg}>
                            <div style={{height: screenHeight, width: screenWidth, padding: 10}} className="ag-theme-alpine">
                            <AgGridReact
                                ref={gridRef}
                                rowData={rowBudget}
                                columnDefs={columns}
                                defaultColDef={defaultColDef}
                                pagination={false}
                                cacheQuickFilter={true}
                                rowSelection={'multiple'}
                                onRowDataUpdated={onRowDataUpdated}
                                onSelectionChanged={onSelectionChanged}
                            ></AgGridReact>
                            </div>
                        </Tab>
                        <Tab eventKey="Sales-Marketing" title="Sales-Marketing" disabled={usSales}>
                            <div style={{height: screenHeight, width: screenWidth, padding: 10}} className="ag-theme-alpine">
                            <AgGridReact
                                ref={gridRef}
                                rowData={rowSales}
                                columnDefs={columns}
                                defaultColDef={defaultColDef}
                                pagination={false}
                                cacheQuickFilter={true}
                                rowSelection={'multiple'}
                                onRowDataUpdated={onRowDataUpdated}
                                onSelectionChanged={onSelectionChanged}
                            ></AgGridReact>
                            </div>
                        </Tab>
                    
                    </Tabs>
                    <span id="selectedRows"></span>
                </div>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button 
                variant="primary"
                onClick={createPurchase}
            >
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
        {isLoading ? <LoadingPage/> : ""}
        </>
    )
}
