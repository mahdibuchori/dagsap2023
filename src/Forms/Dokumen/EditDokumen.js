import React, { useEffect, useState } from 'react';
import Swal from "sweetalert2";
import Select from 'react-select';
import { format } from "date-fns";
import id from 'date-fns/locale/id';
import { useNavigate, useLocation } from 'react-router-dom';
import { Accordion, Badge, Breadcrumb, Button, Card, Col, Container, Form, Stack } from 'react-bootstrap';
import '../PengadaanBarang/pengadaan.css';

import { API_AUTH } from '../../apis/apisData';
import { LoadingPage } from '../../LoadingPage/LoadingPage';
import useAuthStore, { selectUser } from '../../store/DataUser';
import { FileDepoCabang } from '../../datafile/FileSelect';
import useDokumenStore, {selectFetchDokumen, selectFalseDokumen} from '../../store/DataDokumen';

export const EditDokumen = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const userData = useAuthStore(selectUser);
    const fetchDokumen = useDokumenStore(selectFetchDokumen);
    const dokumenFalse = useDokumenStore(selectFalseDokumen);

    const [kode, setKode] = useState('');
    const [subkode, setSubKode] = useState('');
    const [idDepo, setIdDepo] = useState('');
    const [namaDepo, setNamaDepo] = useState();
    const [tgl, setTgl] = useState('');
    const [tang, setTang] = useState('');
    const [nstatus, setNstatus] = useState('Pengajuan');
    const [clrBtn, setClrBtn] = useState('btn btn-danger'); 
    const [inputList, setInputList] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [validated, setValidated] = useState(false);
    const [btnValue, setBtnValue] = useState(false);
    
    useEffect(() => {
        const createUniq = () => {
            setIsLoading(true)
            let data = location.state.data.data;
            let bln = format(new Date(), "MM", { locale: id });
            let tahu = format(new Date(), "yy", { locale: id });
      
            let bul = format(new Date(), "MM", { locale: id });
            let bula = format(new Date(), "MMMM", { locale: id });
            let days = format(new Date(), "dd", { locale: id });
            let yea = format(new Date(), "yyyy", { locale: id });
            const xsd = String(data.idForm).substring(0,7);
            setTgl(`${yea}-${bul}-${days}`);
            setTang(`${days} ${bula} ${yea}`);
            setKode(xsd+bln+tahu);
            setSubKode(xsd);
            dokumenFalse();
            const list = location.state.inputList;
            const cabs = location.state.depo;
            let cobs = list.sort((a, b) => b.status.localeCompare(a.status));
            let cekCab = FileDepoCabang.filter(i=> {
                return(
                    i.idDepo === cabs[0].idDepo
                )
            });
            console.log(location.state.data)
            let filPengajuan = list.filter(a => a.status === "Pengajuan");
            let filVerifikasi = list.filter(a => a.status === "Verifikasi");
            let filSelesai = list.filter(a => a.status === "Selesai");
            let filHold = list.filter(a => a.status === "Hold");
            if(filHold.length > 0){
                if(userData.uuid === location.state.data.uuid){
                    setBtnValue(false);
                }
                else{
                    setBtnValue(true);
                }
                setNstatus('Hold');
                setClrBtn('btn btn-warning')
            }
            else{
                if(filPengajuan.length === list.length){
                    if(userData.uuid === location.state.data.uuid){
                        setBtnValue(false);
                    }
                    else{
                        setBtnValue(true);
                    }
                    setNstatus('Pengajuan');
                    setClrBtn('btn btn-danger')
                }
                else if(filVerifikasi.length === list.length){
                    setBtnValue(true);
                    setNstatus('Verifikasi');
                    setClrBtn('btn btn-primary')
                }
                else if(filSelesai.length === list.length){
                    setBtnValue(true);
                    setNstatus('Selesai')
                    setClrBtn('btn btn-success')
                }
                else{
                    if(userData.uuid === location.state.data.uuid){
                        setBtnValue(false);
                    }
                    else{
                        setBtnValue(true);
                    }
                    setNstatus('Pengajuan');
                    setClrBtn('btn btn-danger')
                }
            }
            setIdDepo(cekCab[0].idDoc);
            setNamaDepo(cekCab[0].label);
            setInputList(cobs)
            setIsLoading(false)
        }
        createUniq()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
    };
    
    const handleRemoveClick = (index) => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };
    
    const handleAddClick = () => {
        let time = format(new Date(), "hh", { locale: id });
        let minute = format(new Date(), "mm", { locale: id });
        let second = format(new Date(), "ss", { locale: id });
        setInputList([...inputList, { iddokumen: subkode+time+minute+second, namadokumen: '', keterangan: '', status: 'Pengajuan',tglTerima : '',tglUlang : ''}]);
    };
    
    const handleSubmit = (e) =>{
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
        e.stopPropagation();
        setValidated(true);
        if(idDepo === ""){
            Swal.fire('Oppss..','Harap Pilih Data Depo/Cabang', 'info')
        }
        }
        else{
            handleSave()
        }
    }
    
    const handleSave = async () =>{
        try {
            setIsLoading(true)
            await dokumenFalse()
            let bln = format(new Date(), "MM", { locale: id });
            let tahu = format(new Date(), "yyyy", { locale: id });
        
            const next = await API_AUTH.put(`/dokumen/update/${kode}`, {
                id_Form : kode,
                pengirim : [{
                    id: userData.uuid,
                    pemohon : userData.uname,
                    plan : userData.uplan,
                }],
                cabang : namaDepo,
                tglKirim : tgl,
                filter_bulan : `${tahu}-${bln}`,
                data : inputList,
            });
            await fetchDokumen(`${tahu}-${bln}`);
            /* console.log({
                id_Form : kode,
                pengirim : userData?.uname,
                cabang : namaDepo,
                tglKirim : tgl,
                filter_bulan : `${tahu}-${bln}`,
                data : inputList,
            }) */
            Swal.fire(`${next.data.success}`, navigate('/form/dokumen'), 'success');
            setIsLoading(false)
        } catch (error) {
            console.log(error.response.data.message);
            setIsLoading(false);
        }
    }
    
    return (
    <>
        <div className='setContain'>
            <Stack direction="horizontal" gap={3} style={{padding: "0px 10px 0px 10px"}}>
                <div className="bg-body">
                <Breadcrumb className="bg-body m-2">
                    <Breadcrumb.Item onClick={() =>navigate('/form')}>Form</Breadcrumb.Item>
                    <Breadcrumb.Item onClick={() =>navigate('/form/dokumen')}>Table Dokumen</Breadcrumb.Item>
                    <Breadcrumb.Item active>Create Dokumen</Breadcrumb.Item>
                </Breadcrumb>
                </div>
                <div className="ms-auto">
                </div>
                <div className="bg-body">
                </div>
            </Stack>

            <Container fluid>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <div className='row  g-2  mb-4'>
                    <div className='col-sm-4	col-md-4	col-lg-2	col-xl-2 mb-1'>
                    <Card className='mb-2' bg='white'>
                        <Card.Body>
                        <Form.Group as={Col} controlId="validationCustom01">
                            <Form.Label>Nama</Form.Label>
                            <Form.Control
                            required
                            type="text"
                            value={location.state.data.data.pengirim}
                            disabled
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="validationCustom01">
                            <Form.Label>Depo/Cabang</Form.Label>
                            <Select 
                            required
                            onChange={(value) => {
                                setIdDepo(value.idDoc);
                                setNamaDepo(value.label);
                            }}
                            defaultValue={location.state.depo}
                            options = {FileDepoCabang}
                            isSearchable = {false}
                            isDisabled ={btnValue}
                            
                            />
                            <Form.Control.Feedback type="invalid">
                                Harap Masukan Keterangan Dokumen
                            </Form.Control.Feedback>
                        </Form.Group>
                        </Card.Body>
                    </Card>
                    <Card className='mb-2' bg='white'>
                        <Card.Body>
                        <Form.Group as={Col} controlId="validationCustom01">
                            <Form.Label>Id Pengajuan</Form.Label>
                            <Form.Control
                            required
                            type="text"
                            placeholder="Id Pengadaan"
                            value={kode}
                            disabled = {true}
                            />
                        </Form.Group>
                        <Form.Group as={Col} controlId="validationCustom01">
                            <Form.Label>Tgl Pengajuan</Form.Label>
                            <Form.Control
                            required
                            type="text"
                            placeholder="Tgl Pengadaan"
                            value={tang}
                            disabled
                            />
                        </Form.Group>
                        <Form.Group as={Col} controlId="validationCustom01">
                            <Form.Label>Status Dokumen</Form.Label>
                            <Form.Control
                            required
                            type="text"
                            placeholder="Status Pengadaan"
                            className={clrBtn}
                            value={nstatus}
                            disabled
                            />
                        </Form.Group>
                        </Card.Body>
                    </Card>
                    </div>
                    <div className='col-sm-8	col-md-8	col-lg-8	col-xl-9 mb-1'>
                    <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                        <Accordion.Header>Data Dokumen</Accordion.Header>
                        <Accordion.Body>
                        {inputList.map((x, i) => {
                            let d = false
                            let colo = 'danger'
                            if(x.status === 'Pengajuan'){
                                colo = 'danger';
                                d = false;
                            }
                            else if(x.status === 'Verifikasi'){ 
                                colo = 'primary'
                                d = true;
                            }
                            else if(x.status === 'Hold'){
                                colo = 'warning'
                                d = false;
                            }
                            else if(x.status === 'Selesai'){
                            colo = 'success'
                                d = true;
                            }
                            else{
                            colo = 'danger';
                                d = false;
                            }
                            return(
                            <div className="row  g-2 ">
                                <h5>Dokumen Ke-{i+1} <Badge bg={colo}>{x.status}</Badge></h5>
                                {
                                    d ?
                                    <div style={{marginBottom: '10px'}}>
                                        <div className="row  g-2 ">
                                            <div className='col-sm-12 col-md-12 col-lg-2 col-xl-2'>
                                                <Form.Group as={Col} controlId="validationCustom01">
                                                    <Form.Label>Id Dokumen</Form.Label>
                                                    <Form.Control
                                                    required
                                                    name="idDokumen"
                                                    type="text"
                                                    placeholder="ID Dokumen"
                                                    value={x.iddokumen}
                                                    disabled
                                                    />
                                                </Form.Group>
                                            </div>
                                            <div className='col-sm-12 col-md-12 col-lg-5 col-xl-5'>
                                                <Form.Group as={Col} controlId="validationCustom01">
                                                    <Form.Label>Nama Dokumen</Form.Label>
                                                    <Form.Control
                                                    required
                                                    name="namadokumen"
                                                    type="text"
                                                    placeholder="Nama Dokumen"
                                                    value={x.namadokumen}
                                                    onChange={(e) => handleInputChange(e, i)}
                                                    disabled={d}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        Harap Masukan Nama Dokumen
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </div>
                                            <div className='col-sm-12 col-md-12 col-lg-2 col-xl-2'>
                                                <Form.Group as={Col} controlId="validationCustom01">
                                                    <Form.Label>Tgl Terima</Form.Label>
                                                    <Form.Control
                                                    required
                                                    name="idDokumen"
                                                    type="text"
                                                    value={x.tglTerima}
                                                    disabled
                                                    />
                                                </Form.Group>
                                            </div>
                                            <div className='col-sm-12 col-md-12 col-lg-2 col-xl-2'>
                                                <Form.Group as={Col} controlId="validationCustom01">
                                                    <Form.Label>Tgl Kirim Ulang</Form.Label>
                                                    <Form.Control
                                                    required
                                                    name="namadokumen"
                                                    type="text"
                                                    value={x.tglUlang}
                                                    onChange={(e) => handleInputChange(e, i)}
                                                    disabled={d}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        Harap Masukan Nama Dokumen
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </div>
                                            <div className='col-sm-12 col-md-12 col-lg-2 col-xl-1'>
                                            </div>
                                        </div>
                                        <div className="row  g-2 ">
                                            <div className='col-sm-12 col-md-12 col-lg-11 col-xl-11'>
                                                <Form.Group as={Col} controlId="formGridArea">
                                                    <Form.Label>Keterangan</Form.Label>
                                                    <Form.Control 
                                                    as="textarea" 
                                                    aria-label="With textarea" 
                                                    placeholder='Harap isikan keterangan data yang lengkap'
                                                    name="keterangan"
                                                    value={x.keterangan}
                                                    onChange={(e) => handleInputChange(e, i)}
                                                    disabled={d}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        Harap Masukan Keterangan Dokumen
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </div>
                                            <div className='col-sm-12 col-md-12 col-lg-2 col-xl-1'>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <div className="row  g-2 ">
                                        <div className='col-sm-12 col-md-12 col-lg-5 col-xl-2'>
                                            <Form.Group as={Col} controlId="validationCustom01">
                                                <Form.Label>Id Dokumen</Form.Label>
                                                <Form.Control
                                                required
                                                name="idDokumen"
                                                type="text"
                                                placeholder="ID Dokumen"
                                                value={x.iddokumen}
                                                disabled
                                                />
                                            </Form.Group>
                                        </div>
                                        <div className='col-sm-12 col-md-12 col-lg-5 col-xl-4'>
                                            <Form.Group as={Col} controlId="validationCustom01">
                                                <Form.Label>Nama Dokumen</Form.Label>
                                                <Form.Control
                                                required
                                                name="namadokumen"
                                                type="text"
                                                placeholder="Nama Dokumen"
                                                value={x.namadokumen}
                                                onChange={(e) => handleInputChange(e, i)}
                                                disabled={d}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    Harap Masukan Nama Dokumen
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </div>
                                        <div className='col-sm-12 col-md-12 col-lg-5 col-xl-5'>
                                            <Form.Group as={Col} controlId="formGridArea">
                                                <Form.Label>Keterangan</Form.Label>
                                                <Form.Control 
                                                as="textarea" 
                                                aria-label="With textarea" 
                                                placeholder='Harap isikan keterangan data yang lengkap'
                                                name="keterangan"
                                                value={x.keterangan}
                                                onChange={(e) => handleInputChange(e, i)}
                                                required
                                                disabled={d}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    Harap Masukan Keterangan Dokumen
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </div>
                                        <div className='col-sm-12 col-md-12 col-lg-2 col-xl-1'>
                                            <h6>&nbsp;</h6>
                                            <div style={{display: "flex"}}>
                                                
                                                {inputList.length - 1 === i && (
                                                <Button 
                                                    variant="success"
                                                    className=' d-flex justify-content-center align-items-center h-10'
                                                    onClick={() => handleAddClick(i)}
                                                >
                                                    <i className="bi bi-plus-square"></i>
                                                </Button>
                                                )}
                                                    {inputList.length !== 1 && (
                                                    <Button 
                                                        variant="primary"
                                                        onClick={() => handleRemoveClick(i)}
                                                        className='d-flex justify-content-center align-items-center h-10'
                                                        style={{marginLeft: 10}}
                                                    >
                                                        <i className="bi bi-trash"></i>
                                                    </Button>
                                                    )}
                                            </div>
                                        </div>
                                    </div>
                                }
                                
                            </div>
                            )
                        })}
                        </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                    </div>
                    <div className='col-sm-12	col-md-12	col-lg-1	col-xl-1 mb-5'>
                    <div className='d-flex align-items-end flex-wrap'>
                        <div className='row p-2'>
                            <Button 
                            type="submit"
                            variant="outline-primary m-2"
                            className='col-sm-12	col-md-12	col-lg-12	col-xl-12'
                            disabled={btnValue}
                            >
                            Simpan
                            </Button>
                            <Button
                                variant="outline-danger m-2"
                                className='col-sm-12	col-md-12	col-lg-12	col-xl-12'
                                onClick={() =>navigate('/form/dokumen')}
                            >
                            Batal
                            </Button>
                        </div>
                        </div>
                    
                    </div>
                </div>
                </Form>
            </Container>

            {isLoading && <LoadingPage/>}
        </div>
    </>
    )
}
