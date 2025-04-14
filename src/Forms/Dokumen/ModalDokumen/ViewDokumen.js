import React, { useEffect, useState } from 'react';
import { Accordion, Badge, Button, Card, Col, Form, Modal, Row } from 'react-bootstrap';
import { LoadingPage } from '../../../LoadingPage/LoadingPage';

export const ViewDokumen = (props) => {
    const tHeigt = parseInt(window.innerHeight) / 3;

    const [kode, setKode] = useState('');
    const [idDepo, setIdDepo] = useState('');
    const [tang, setTang] = useState('');
    const [status, setStatus] = useState('');
    const [pengirim, setPengirim] = useState('');
    const [via, setVia] = useState('');
    const [jasa, setJasa] = useState('');
    const [nores, setNores] = useState('');
    const [inputList, setInputList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const createUniq = () => {
            setIsLoading(true)
            if(props.data[0] !== undefined || props.data[0] !== undefined){
                console.log(props.data[0])
                let data = props.data[0]
                let file = data?.data;
                let filPengajuan = file.filter(a => a.status === "Pengajuan");
                let filVerifikasi = file.filter(a => a.status === "Verifikasi");
                let filSelesai = file.filter(a => a.status === "Selesai");
                let filHold = file.filter(a => a.status === "Hold");
                const list = file.map((e, i)=>{
                    return e
                })
                let cobs = list.sort((a, b) => a.status.localeCompare(b.status));
                setKode(data?.idForm)
                setTang(data?.tglKirim)
                if(filHold.length > 0){setStatus("Hold")}
                else{
                    if(filPengajuan.length === file.length){setStatus("Pengajuan")}
                    else if(filVerifikasi.length === file.length){setStatus("Verifikasi")}
                    else if(filSelesai.length === file.length){setStatus("Selesai")}
                    else{setStatus("Pengajuan")}
                }
                setPengirim(data?.pengirim[0].pemohon);
                setIdDepo(data?.cabang);
                setInputList(cobs);
                setVia(data?.jasa);
                setJasa(data?.jasa);
                setNores(data?.nores);
            }
            else{
                console.log(null)
            }
            setIsLoading(false)
        }
        createUniq()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props]);
    
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
                    <Form>
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
                                            value={status}
                                            className={
                                                (status === "Hold") ? "btn btn-warning"
                                                : (status === "Verifikasi") ? "btn btn-primary"
                                                : (status === "Selesai") ? "btn btn-success"
                                                : "btn btn-danger"
                                            }
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
                                            value={pengirim}
                                            disabled
                                        />
                                    </Form.Group>
                                    
                                    <Form.Group as={Col} controlId="validationCustom01">
                                        <Form.Label>Depo/Cabang</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            value={idDepo}
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
                                        <Form.Label>Pengiriman Dengan</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            placeholder="Nama Jasa Pengiriman"
                                            value={via}
                                            disabled
                                        />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="validationCustom01">
                                        <Form.Label>Jasa Pengiriman</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            placeholder="Nama Jasa Pengiriman"
                                            value={jasa}
                                            disabled
                                        />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="validationCustom01">
                                        <Form.Label>No Resi / Nopol Kendaraan</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            placeholder="No Resi / Nopol Kendaraan"
                                            value={nores}
                                            disabled
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
                                                return(
                                                <div className="row  g-2 ">
                                                    <h5>
                                                        Dokumen Ke-{i+1}
                                                        <Badge 
                                                            bg={
                                                                (x.status === "Hold") ? "warning"
                                                                : (x.status === "Verifikasi") ? "primary"
                                                                : (x.status === "Selesai") ? "success"
                                                                : "danger"
                                                            }
                                                            style={{marginLeft:"10px"}}
                                                        >
                                                            {x.status}
                                                        </Badge>
                                                    </h5>
                                                    <div style={{marginBottom: '10px'}}>
                                                        <div className="row  g-2 ">
                                                            <div className='col-sm-12 col-md-12 col-lg-3 col-xl-3'>
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
                                                            <div className='col-sm-12 col-md-12 col-lg-3 col-xl-3'>
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
                                                            <div className='col-sm-12 col-md-12 col-lg-3 col-xl-3'>
                                                                <Form.Group as={Col} controlId="validationCustom01">
                                                                    <Form.Label>Tgl Kirim Ulang</Form.Label>
                                                                    <Form.Control
                                                                    required
                                                                    name="namadokumen"
                                                                    type="text"
                                                                    value={x.tglUlang}
                                                                    disabled
                                                                    />
                                                                    <Form.Control.Feedback type="invalid">
                                                                        Harap Masukan Nama Dokumen
                                                                    </Form.Control.Feedback>
                                                                </Form.Group>
                                                            </div>
                                                            <div className='col-sm-12 col-md-12 col-lg-3 col-xl-3'>
                                                                <Form.Group as={Col} controlId="validationCustom01">
                                                                    <Form.Label>Tujuan pengiriman</Form.Label>
                                                                    <Form.Control
                                                                    required
                                                                    name="namadokumen"
                                                                    type="text"
                                                                    value={x.tujuan}
                                                                    disabled
                                                                    />
                                                                    <Form.Control.Feedback type="invalid">
                                                                        Harap Masukan Nama Dokumen
                                                                    </Form.Control.Feedback>
                                                                </Form.Group>
                                                            </div>
                                                        </div>
                                                        <div className="row  g-2 ">
                                                            <div className='col-sm-12 col-md-12 col-lg-12 col-xl-12'>
                                                                <Form.Group as={Col} controlId="validationCustom01">
                                                                    <Form.Label>Nama Dokumen</Form.Label>
                                                                    <Form.Control
                                                                    required
                                                                    name="namadokumen"
                                                                    type="text"
                                                                    placeholder="Nama Dokumen"
                                                                    value={x.namadokumen}
                                                                    disabled
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
                                                            <div className='col-sm-12 col-md-12 col-lg-12 col-xl-12'>
                                                                <Form.Group as={Col} controlId="formGridArea">
                                                                    <Form.Label>Keterangan</Form.Label>
                                                                    <Form.Control 
                                                                    as="textarea" 
                                                                    aria-label="With textarea" 
                                                                    placeholder='Harap isikan keterangan data yang lengkap'
                                                                    name="keterangan"
                                                                    value={x.keterangan}
                                                                    disabled
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
                                                </div>
                                                )
                                            })}
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </Card.Body>
                        </Card>
                        
                        

                        <Modal.Footer>
                            <Button variant="secondary" onClick={()=> props.close()}>Close</Button>
                        </Modal.Footer>
                    </Form>
                </div>
                
            </Modal>

            {isLoading && <LoadingPage/>}
            </>
    )
}
