import React, { useEffect, useState } from 'react';
import Swal from "sweetalert2";
import { format } from "date-fns";
import Select from 'react-select';
import id from 'date-fns/locale/id';
import { Accordion, Badge, Button, Card, Col, Form, Modal, Row } from 'react-bootstrap';

import { API_AUTH } from '../../../apis/apisData';
import { FileDepoCabang } from '../../../datafile/FileSelect';
import { LoadingPage } from '../../../LoadingPage/LoadingPage';
import useAuthStore, { selectUser } from '../../../store/DataUser';
import useDokumenStore, {selectFetchDokumen, selectFalseDokumen} from '../../../store/DataDokumen'

export const DokumenCreate = (props) => {
    const userData = useAuthStore(selectUser);
    const fetchDokumen = useDokumenStore(selectFetchDokumen);
    const dokumenFalse = useDokumenStore(selectFalseDokumen);

    const [kode, setKode] = useState('');
    const [subkode, setSubKode] = useState('');
    const [idDepo, setIdDepo] = useState('');
    const [namaDepo, setNamaDepo] = useState();
    const [tgl, setTgl] = useState('');
    const [tang, setTang] = useState('');
    const [inputList, setInputList] = useState([{ iddokumen: '', namadokumen: '', keterangan: '', status: 'Pengajuan', tglTerima : '', tglUlang: '',tujuan:''}]);

    const [validated, setValidated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const createUniq = () => {
            let bln = format(new Date(), "MM", { locale: id });
            let tahu = format(new Date(), "yy", { locale: id });
            let time = format(new Date(), "hh", { locale: id });
            let minute = format(new Date(), "mm", { locale: id });
            let second = format(new Date(), "ss", { locale: id });
      
            let bul = format(new Date(), "MM", { locale: id });
            let bula = format(new Date(), "MMMM", { locale: id });
            let days = format(new Date(), "dd", { locale: id });
            let yea = format(new Date(), "yyyy", { locale: id });
            const xsd = Math.random().toString(36).slice(-4);
            const ut = 'DOC'+xsd.toUpperCase();
            setTgl(`${yea}-${bul}-${days}`);
            setTang(`${days} ${bula} ${yea}`);
            setKode(ut+bln+tahu);
            setSubKode(ut)
            inputList[0]['iddokumen'] = ut+time+minute+second
            dokumenFalse()
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
        setInputList([...inputList, { iddokumen: subkode+time+minute+second, namadokumen: '', keterangan: '', status: 'Pengajuan',tglTerima : '',tglUlang : '',tujuan:''}]);
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
        
            const next = await API_AUTH.post(`/dokumen`, {
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
            Swal.fire(`${next.data.success}`,'', 'success');
            /* console.log({
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
            }) */
            props.onAddGoal(`${tahu}-${bln}`)
            handleClose()
            setIsLoading(false)
        } catch (error) {
          console.log(error)
        }
    }

    const handleClose =() =>{
        setKode('');
        setSubKode('');
        setIdDepo('');
        setNamaDepo();
        setTgl('');
        setTang('');
        setInputList([{ iddokumen: '', namadokumen: '', keterangan: '', status: 'Pengajuan', tglTerima : '', tglUlang: '',tujuan:''}]);
        setValidated(false)
        props.onClose()
    }

    return (
        <>
        <Modal
            show={props.onShow}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                Create Dokumen
                </Modal.Title>
            </Modal.Header>
            <div style={{padding: 20}}>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Card className='mb-2' bg='white'>
                        <Card.Body>
                            <Row className="mb-3">
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
                                        className='btn btn-danger'
                                        value={'Pengajuan'}
                                        disabled
                                    />
                                </Form.Group>
                            </Row>
                        </Card.Body>
                    </Card>
                    <Card className='mb-2' bg='white'>
                        <Card.Body>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="validationCustom01">
                                    <Form.Label>Nama</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        value={userData.uname}
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
                                    options = {FileDepoCabang}
                                    isSearchable = {false}
                                    />
                                </Form.Group>
                            </Row>
                        </Card.Body>
                    </Card>
                    <Card className='mb-2' bg='white'>
                        <Card.Body>
                            <Accordion defaultActiveKey="0">
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>Data Dokumen</Accordion.Header>
                                    <Accordion.Body>
                                    {inputList.map((x, i) => {
                                        let colo = 'danger'
                                        if(x.status === 'Pengajuan'){
                                        colo = 'danger';
                                        }
                                        else if(x.status === 'Veirifikasi'){
                                        colo = 'primary'
                                        }
                                        else if(x.status === 'Hold'){
                                        colo = 'warning'
                                        }
                                        else if(x.status === 'Selesai'){
                                        colo = 'success'
                                        }
                                        else{
                                        colo = 'danger';
                                        }
                                        return(
                                        <div className="row  g-2 ">
                                            <h5>Dokumen Ke-{i+1} <Badge bg={colo}>{x.status}</Badge></h5>
                                            <div className='col-sm-12 col-md-12 col-lg5 col-xl-2'>
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
                        </Card.Body>
                    </Card>
                    
                    

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                        <Button type="submit" variant="primary">Save changes</Button>
                    </Modal.Footer>
                </Form>
            </div>
            
        </Modal>

        {isLoading && <LoadingPage/>}
        </>
    )
}
