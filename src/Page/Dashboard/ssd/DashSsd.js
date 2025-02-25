import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form } from 'react-bootstrap';

import { LoadingPage } from '../../../LoadingPage/LoadingPage';
import useAuthStore, { selectUser } from '../../../store/DataUser';
import usePengadaanStore, {selectPengadaan, selectFetchPengadaan, selectPengadaanReady, selectFalsePengadaan} from '../../../store/DataPengadaan';

export const DashSsd = () => {
  const navigate = useNavigate();
  const userData = useAuthStore(selectUser);

  const newPengadaan = usePengadaanStore(selectPengadaan);
  const fetchPengadaan = usePengadaanStore(selectFetchPengadaan);
  const pengadaanReady = usePengadaanStore(selectPengadaanReady);
  const pengadaanFalse = usePengadaanStore(selectFalsePengadaan);

  const [month, setMonth] = useState('');
  const [jmlPengajuan, setJmlPengajuan] = useState(0);
  const [jmlRevisi, setJmlRevisi] = useState(0);
  const [jmlVerify, setJmlVerify] = useState(0);
  const [jmlSelesai, setJmlSelesai] = useState(0);
  const [jmlReject, setJmlReject] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

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

  const onDataReady = () =>{
    setIsLoading(false);
    console.log(month)
    const jumPengajuan = newPengadaan.filter(x => x.status.toUpperCase() === "PENGAJUAN");  
    const jumRevisi = newPengadaan.filter(x => x.status.toUpperCase() === "REVISI");       
    const jumVerify = newPengadaan.filter(x => x.status.toUpperCase() === "VERIFIKASI");    
    const jumSelesai = newPengadaan.filter(x => x.status.toUpperCase() === "SELESAI");  
    const jumReject = newPengadaan.filter(x => x.status.toUpperCase() === "REJECT");

    let fPengajuan = jumPengajuan.filter(i=> i.user[0].divisi === "SSD");
    let fRevisi = jumRevisi.filter(i=> i.user[0].divisi === "SSD");
    let fVerifikasi = jumVerify.filter(i=> i.user[0].divisi === "SSD");
    let fSelesai = jumSelesai.filter(i=> i.user[0].divisi === "SSD");
    let fReject = jumReject.filter(i=> i.user[0].divisi === "SSD");
    
    setJmlPengajuan(fPengajuan.length);
    setJmlRevisi(fRevisi.length);
    setJmlVerify(fVerifikasi.length);
    setJmlSelesai(fSelesai.length);
    setJmlReject(fReject.length);
  }

  const onSetDate =async (event) => {
    setIsLoading(true)
    pengadaanFalse();
    setMonth(event.target.value);
    await fetchPengadaan(event.target.value, userData.uplan);
  }

  return (
    <>
      <Container className='mt-2' fluid>
        <div className='row' xs={1} md={2}>
          <div className='col-sm-12 col-md-2 col-lg-2 col-xl-2 mb-2'>
            <h3>Pengadaan Barang</h3>
          </div>
          <div className='col-sm-12 col-md-2 col-lg-2 col-xl-2 mb-2'>
            <Form.Control
              type="month"
              className='text-center border border-primary text-primary'
              value={month}
              min="2020-08"
              onChange={(e) =>onSetDate(e)}
            />
          </div>
        </div>
        
        <div className='row' xs={1} md={2}>
          <div className='col-sm-12 col-md-2 col-lg-2 col-xl-2 mb-2'>
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
          <div className='col-sm-12 col-md-2 col-lg-2 col-xl-2 mb-2'>
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
          <div className='col-sm-12 col-md-2 col-lg-2 col-xl-2 mb-2'>
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
          <div className='col-sm-12 col-md-2 col-lg-2 col-xl-2 mb-2'>
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
          <div className='col-sm-12 col-md-2 col-lg-2 col-xl-2 mb-2'>
            <div className='widget-flat card bg-white'>
              <div className='card-body'>
                <div className='float-end text-success'>
                  <i className="bi bi-truck"></i>
                </div>
                <h6 className='fw-normal mt-0 text-muted'>Reject</h6>
                <h3 className='mt-1 mb-0 float-end'>{jmlReject}</h3>
              </div>
            </div>
          </div>
          <div className='col-sm-12 col-md-2 col-lg-2 col-xl-2 '>
            <h6 
              className='mt-3 mb-3 float-end text-primary mylinkBo' 
              style={{borderBottom : '2px solid #287bff'}} 
              onClick={() =>navigate(`/form/pengadaan`)}>
              pergi ke pengadaan
              <i className="bi bi-arrow-right-short"></i>
            </h6>
          </div>
        </div>
      </Container>
        {/* 'col-sm-12' | 'col-md-2' | 'col-lg-2' | 'col-xl-2' */}
      {isLoading && <LoadingPage/>}
    </>
  )
}
