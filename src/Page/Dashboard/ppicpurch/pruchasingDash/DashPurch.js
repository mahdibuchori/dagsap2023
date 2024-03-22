import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import { Container, Form } from 'react-bootstrap';
import { WeaklyPurch } from './WeaklyPurch';
import { MonthlyPurch } from './MonthlyPurch';
import { ParetoPurch } from './ParetoPurch';
import { ListMounthly } from './ListMounthly';
import { LoadingPage } from '../../../../LoadingPage/LoadingPage';
import useAuthStore, { selectUser } from '../../../../store/DataUser';
import useDashboardStore, { selectDashPurchY,selectFetchYdash,selectPurchYReady } from '../../../../store/dataDashboard';
import usePengadaanStore, {selectPengadaan, selectFetchPengadaan, selectPengadaanReady, selectFalsePengadaan} from '../../../../store/DataPengadaan';
//useDashboardStore, { selectDashPurchY,selectFetchPurch,selectPurchYReady,selectFalsePurch}

export const DashPurch = () => {
  const navigate = useNavigate();
  const userData = useAuthStore(selectUser);

  const onPurchY = useDashboardStore(selectFetchYdash);
  const PurchYDashboard = useDashboardStore(selectDashPurchY);
  const purchYdReady = useDashboardStore(selectPurchYReady);

  const newPengadaan = usePengadaanStore(selectPengadaan);
  const fetchPengadaan = usePengadaanStore(selectFetchPengadaan);
  const pengadaanReady = usePengadaanStore(selectPengadaanReady);
  const pengadaanFalse = usePengadaanStore(selectFalsePengadaan);
    
  const [nabar, setNabar] = useState('');
  const [naMat, setNaMet] = useState([{value:'',label:''}]);
  const [month, setMonth] = useState();
  const [isMaterial, setIsMaterial] = useState('');
  const [jmlPengajuan, setJmlPengajuan] = useState(0);
  const [jmlRevisi, setJmlRevisi] = useState(0);
  const [jmlVerify, setJmlVerify] = useState(0);
  const [jmlSelesai, setJmlSelesai] = useState(0);

  const [item, setItem] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => { 
    setIsLoading(true);
    onPurchY()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!purchYdReady) return;
    onGridReady(0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [purchYdReady]);

  useEffect(() => { 
    setIsLoading(true);
    // pengadaanFalse();
    const date = new Date();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    let bb = String(month).padStart(2, '0');
    setMonth(`${year}-${bb}`);
    fetchPengadaan(`${year}-${bb}`, userData.uplan);
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // setIsLoading(true);
    if (!pengadaanReady) return;
    onDataReady()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pengadaanReady]);

  useEffect(() => {
    performRefresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMaterial]);

  const onGridReady = (x) =>{
    setIsLoading(false); 
    const data = PurchYDashboard.data;
    // console.log(data);
    const resultItem = data.filter((v,i,a)=>a.findIndex(v2=>(v2.item===v.item))===i);
    let material = resultItem.map(d => { 
      return {value:  d.item.trim(), label: d.item.trim()}
    });
    setItem(material)
    // console.log(material)
    if(material.length > 0){
        let nama = material[0].value;
        if(nama === undefined){
            setNabar()
        }
        else{
            setNabar(nama)
        }


    }
  }

  const onDataReady = () =>{
    setIsLoading(false);
    const jumPengajuan = newPengadaan.filter(x => x.status.toUpperCase() === "PENGAJUAN");  
    const jumRevisi = newPengadaan.filter(x => x.status.toUpperCase() === "REVISI");       
    const jumVerify = newPengadaan.filter(x => x.status.toUpperCase() === "VERIFIKASI");    
    const jumSelesai = newPengadaan.filter(x => x.status.toUpperCase() === "SELESAI");

    setJmlPengajuan(jumPengajuan.length);
    setJmlRevisi(jumRevisi.length);
    setJmlVerify(jumVerify.length);
    setJmlSelesai(jumSelesai.length);
  }

  const handleSelect = (e) =>{
    setNabar(e.value)
  }

  const onSetDate =async (event) => {
    setIsLoading(true)
    pengadaanFalse();
    setMonth(event.target.value);
    await fetchPengadaan(event.target.value, userData.uplan);
  }

  const performRefresh = () =>{
    if(isMaterial === ""){
      console.log(isMaterial);
    }
    else{
      try {
        setNaMet({value: isMaterial, label: isMaterial});
        setNabar(isMaterial);
      } catch (error) {
        // Swal.fire('Opsss..','Terjadi Kesalahan Harap Refresh Page','error')
      }
    }
  }

  return (
    <>
    <div>
      <Container className='mt-2' fluid>
        <ListMounthly />
        <div className='row'>
          <div className='col-xl-2 col-lg-2 mb-1'>
            <h6 className=''>Pengadan Barang</h6>
            <div class="d-flex align-items-center justify-content-between mb-1">
              <Form.Control
                type="month"
                className='text-center border border-primary text-primary'
                value={month}
                min="2020-08"
                onChange={(e) =>onSetDate(e)}
              />
            </div>
            <div className='row'>
              <div className='col-xl-12 col-lg-12 mb-2'>
                <div className='widget-flat card card bg-white'>
                  <div className='card-body'>
                    <div className='float-end text-danger'>
                      <i class="bi bi-arrow-right-square"></i>
                    </div>
                    <h6 className='fw-normal mt-0 text-muted'>Pengajuan </h6>
                    <h3 className='mt-1 mb-0 float-end'>{jmlPengajuan}</h3>
                  </div>
                </div>
              </div>
              <div className='col-xl-12 col-lg-12 mb-2'>
                <div className='widget-flat card bg-white'>
                  <div className='card-body'>
                    <div className='float-end text-warning'>
                      <i className="bi bi-recycle"></i>
                    </div>
                    <h6 className='fw-normal mt-0 text-muted'>Revisi</h6>
                    <h3 className='mt-1 mb-0 float-end'>{jmlRevisi}</h3>
                  </div>
                </div>
              </div>
              <div className='col-xl-12 col-lg-12 mb-2'>
                <div className='widget-flat card bg-white'>
                  <div className='card-body'>
                    <div className='float-end text-primary'>
                      <i className="bi bi-check2-circle"></i>
                    </div>
                    <h6 className='fw-normal mt-0 text-muted'>Verifikasi</h6>
                    <h3 className='mt-1 mb-0 float-end'>{jmlVerify}</h3>
                  </div>
                </div>
              </div>
              <div className='col-xl-12 col-lg-12 mb-2'>
                <div className='widget-flat card bg-white'>
                  <div className='card-body'>
                    <div className='float-end text-success'>
                      <i className="bi bi-truck"></i>
                    </div>
                    <h6 className='fw-normal mt-0 text-muted'>Selesai</h6>
                    <h3 className='mt-1 mb-0 float-end'>{jmlSelesai}</h3>
                  </div>
                </div>
              </div>
              <div className='col-sm-12'>
                <h6 
                  className='mt-3 mb-3 float-end text-primary mylinkBo' 
                  style={{borderBottom : '2px solid #287bff'}} 
                  onClick={() =>navigate(`/form/pengadaan`)}>
                  pergi ke pengadaan
                  <i className="bi bi-arrow-right-short"></i>
                </h6>
              </div>
            </div>
          </div>
          <div className='col-xl-7 col-lg-7 mb-1'>
            <div className='row'>
              <div className='col-xl-4 col-lg-4'>
                <h6 className='mt-1 mb-1 float-end text-dark'>Nama Item : </h6>
              </div>
              <div className='col-xl-8 col-lg-8'>
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  value={naMat}
                  isClearable={false}
                  isSearchable={true}
                  name="color"
                  options={item}
                  onChange={e => handleSelect(e)}
                />
              </div>
              <div className='col-xl-12 col-lg-12 mb-2'>
                <WeaklyPurch name={nabar}/>
              </div>
              <div className='col-xl-12 col-lg-12 mb-2'>
                <MonthlyPurch name={nabar}/>
              </div>
            </div>
          </div>
          <div className='col-xl-3 col-lg-3 mb-1'>
            <ParetoPurch sendToParent={setIsMaterial}/>
          </div>
        </div>
      </Container>
    </div>

    {isLoading ? <LoadingPage/> : ""}
    </>
  )
}
