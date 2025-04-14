import React, { useEffect, useState } from 'react';
import Swal from "sweetalert2";
import { format } from "date-fns";
import Select from 'react-select';
import id from 'date-fns/locale/id';
import { Accordion, Badge, Button, Card, Col, Form, Modal, Row } from 'react-bootstrap';

import { API_AUTH } from '../../../apis/apisData';
import { FileDepoCabang, FileTransport } from '../../../datafile/FileSelect';
import { LoadingPage } from '../../../LoadingPage/LoadingPage';
import useDokumenStore, {selectFetchDokumen, selectFalseDokumen} from '../../../store/DataDokumen'

export const JasaDokumen = (props) => {
    const tHeigt = parseInt(window.innerHeight) / 3;
    const fetchDokumen = useDokumenStore(selectFetchDokumen);
    const dokumenFalse = useDokumenStore(selectFalseDokumen);
    
    const [kode, setKode] = useState('');
    const [idDepo, setIdDepo] = useState('');
    const [namaDepo, setNamaDepo] = useState();
    const [tgl, setTgl] = useState('');
    const [tang, setTang] = useState('');
    const [pengirim, setPengirim] = useState('');
    const [jasa, setJasa] = useState('');
    const [nores, setNores] = useState('');
    const [nstatus, setNstatus] = useState('Pengajuan');
    const [clrBtn, setClrBtn] = useState('btn btn-danger'); 
    const [inputList, setInputList] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        const createUniq = () => {
            setIsLoading(true)
            if(props.data.data !== undefined || props.data.data !== undefined){
                console.log(props)
                let data = props.data.data;
                let bln = format(new Date(), "MM", { locale: id });
                let tahu = format(new Date(), "yy", { locale: id });
            
                let bul = format(new Date(), "MM", { locale: id });
                let bula = format(new Date(), "MMMM", { locale: id });
                let days = format(new Date(), "dd", { locale: id });
                let yea = format(new Date(), "yyyy", { locale: id });
                const xsd = String(data.idForm).substring(0,7);
                const listDta = props.inputList;
                const list = listDta.map((e, i)=>{
                    return e
                })
                const cabs = props.depo;
                let cobs = list.sort((a, b) => b.status.localeCompare(a.status));
                let cekCab = FileDepoCabang.filter(i=> {
                    return(
                        i.idDepo === cabs[0].idDepo
                    )
                });

                let filPengajuan = list.filter(a => a.status === "Pengajuan");
                let filVerifikasi = list.filter(a => a.status === "Verifikasi");
                let filSelesai = list.filter(a => a.status === "Selesai");
                let filHold = list.filter(a => a.status === "Hold");

                if(filHold.length > 0){
                    setNstatus('Hold');
                    setClrBtn('btn btn-warning')
                }
                else{
                    if(filPengajuan.length === list.length){
                        setNstatus('Pengajuan');
                        setClrBtn('btn btn-danger')
                    }
                    else if(filVerifikasi.length === list.length){
                        setNstatus('Verifikasi');
                        setClrBtn('btn btn-primary')
                    }
                    else if(filSelesai.length === list.length){
                        setNstatus('Selesai')
                        setClrBtn('btn btn-success')
                    }
                    else{
                        setNstatus('Pengajuan');
                        setClrBtn('btn btn-danger')
                    }
                }

                setTgl(`${yea}-${bul}-${days}`);
                setTang(`${days} ${bula} ${yea}`);
                setKode(xsd+bln+tahu);
                setIdDepo(cekCab[0].idDoc);
                setNamaDepo(cekCab[0].label);
                setJasa(props.data.kirim);
                setNores(props.data.nores);
                setPengirim(props.data.jasa)
                setInputList(cobs)
                dokumenFalse();
            }
            else{
                console.log(null)
            }
            setIsLoading(false)
        }
        createUniq()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props]);
    
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
    };
    
    const handleSubmit = (e) =>{
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
        e.stopPropagation();
        setValidated(true);
        if(pengirim === ""){
            Swal.fire('Oppss..','Harap Pilih Pengiriman', 'info')
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
            const next = await API_AUTH.put(`/dokumen/jasa/${kode}`, {
                id_Form : kode,
                jasa : pengirim,
                pengirim : jasa,
                nores : nores 
            });
            await fetchDokumen(`${tahu}-${bln}`);
            Swal.fire(`${next.data.success}`,'', 'success');
            
            
            props.onAddGoal(`${tahu}-${bln}`)
            handleClose()
            setIsLoading(false)
        } catch (error) {
            console.log(error.response.data.message);
            console.log(idDepo)
            console.log(namaDepo)
            console.log(tgl)
            setIsLoading(false);
        }
    }

    const handleClose =() =>{
        setKode('');
        setIdDepo('');
        setNamaDepo();
        setTgl('');
        setTang('');
        setInputList([]);
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
                Update Dokumen
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
                                        className={clrBtn}
                                        value={nstatus}
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
                                        value={props.data.data?.pengirim}
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
                                        defaultValue={props.depo}
                                        options = {FileDepoCabang}
                                        isSearchable = {false}
                                        isDisabled ={true}
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
                                    <Accordion.Body style={{height:tHeigt, overflow:'auto'}}>
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
                                                                disabled
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
                                                                disabled
                                                                />
                                                                <Form.Control.Feedback type="invalid">
                                                                    Harap Masukan Keterangan Dokumen
                                                                </Form.Control.Feedback>
                                                            </Form.Group>
                                                        </div>
                                                    </div>
                                                }
                                                
                                            </div>
                                            )
                                        })}
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </Card.Body>
                    </Card>

                    <Card className='mb-2' bg='white'>
                        <Card.Body>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="validationCustom01">
                                    <Form.Label>Pengiriman Dengan</Form.Label>
                                    <Select 
                                        required
                                        onChange={(value) => {
                                            setJasa('')
                                            setNores('')
                                            setPengirim(value.label);
                                            if(value.label === "Internal"){setJasa('Driver')}
                                        }}
                                        options = {FileTransport}
                                        defaultValue={{value:props.data.jasa, label: props.data.jasa}}
                                        isSearchable = {false}
                                        
                                    />
                                </Form.Group>
                                <Form.Group as={Col} controlId="validationCustom01">
                                    <Form.Label>Jasa Pengiriman</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Nama Jasa Pengiriman"
                                        value={jasa}
                                        onChange={(e) => setJasa(e.target.value)}
                                        disabled={(pengirim === "Internal" ? true : false)}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} controlId="validationCustom01">
                                    <Form.Label>No Resi / Nopol Kendaraan</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="No Resi / Nopol Kendaraan"
                                        value={nores}
                                        onChange={(e) => setNores(e.target.value)}
                                    />
                                </Form.Group>
                            </Row>
                        </Card.Body>
                    </Card>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                        <Button type="submit" variant="primary">Save Data</Button>
                    </Modal.Footer>
                </Form>
            </div>
            
        </Modal>

        {isLoading && <LoadingPage/>}
        </>
    )
}
