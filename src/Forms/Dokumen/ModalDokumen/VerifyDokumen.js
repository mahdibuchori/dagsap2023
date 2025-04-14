import React, { useEffect, useState } from 'react';
import Swal from "sweetalert2";
import { format } from "date-fns";
import id from 'date-fns/locale/id';
import {Button, Form, Modal } from 'react-bootstrap';

import '../../PengadaanBarang/pengadaan.css';
import { API_AUTH } from '../../../apis/apisData';
import { LoadingPage } from '../../../LoadingPage/LoadingPage';
import useAuthStore, { selectUser } from '../../../store/DataUser';
import useDokumenStore, {selectFetchDokumen, selectFalseDokumen} from '../../../store/DataDokumen'

export const VerifyDokumen = (props) => {
    const userData = useAuthStore(selectUser);
    const fetchDokumen = useDokumenStore(selectFetchDokumen);
    const dokumenFalse = useDokumenStore(selectFalseDokumen);

    const [status, setStatus] = useState('');
    const [code, setCode] = useState('');
    const [dokumen, setDokumen] = useState('');
    const [keterangan, setKeterangan] = useState('');
    const [pengirim, setPengirim] = useState('');
    const [via, setVia] = useState('');
    const [jasa, setJasa] = useState('');
    const [nopol, setNopol] = useState('');
    const [tglTerima, setTglTerima] = useState('');
    const [tglKirim, setTglKirim] = useState('');
    const [tujuan, setTujuan] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {
        const createUniq = () => {
            setIsLoading(true)
            if(props.data[0] !== undefined || props.data[0] !== undefined){
                const data = props.data[0].data;
                // console.log(data);
                setStatus(data.status);
                setCode(data.idForm);
                setDokumen(data.dokumen);
                setKeterangan(data.keterangan);
                setPengirim(data.pengirim);
                setTglTerima(data?.tgl_terima);
                setTglKirim(data?.tgl_kirim);
                setTujuan(data?.tujuan)

            }
            else{
                console.log(null)
            }
            
            if(props.sender !== undefined || props.sender !== undefined){
                // console.log(props.sender);
                const send = props.sender[0];
                setVia(send?.jasa);
                setJasa(send?.kirim);
                setNopol(send?.nores);
            }
            else{
                console.log(null)
            }
            
            setIsLoading(false)
        }
        createUniq()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props]);

    const handleSwap =async (e, i) =>{
        try {
            let tanggal = format(new Date(), "yyyy-MM-dd", { locale: id });
            // await dokumenFalse()

            if(i === "Selesai"){
                if(tujuan === ""){
                    Swal.fire("Oppss..","Harap input tujuan pengiriman","info")
                }
            }
            let mFile = {
                idDoc : e.idDoc,
                idForm : e.data.idForm,
                status : i,
                tanggal : tanggal,
                tujuan : tujuan
            }
            handleVerify(mFile)
            
        } catch (error) {
            console.log(error) 
        }
    }

    const handleVerify = async (e) =>{
        console.log(e)
        try {
            if(userData.udivisi === "Develop" || userData.udivisi === "BOD/BOC" || userData.uuid === "DEE-SSM02" ){
                setIsLoading(true)
                await dokumenFalse()
                let tanggal = format(new Date(), "yyyy-MM", { locale: id });
                const next = await API_AUTH.put(`/dokumen/verify/${e.idDoc}`, {
                    "idDoc": e.idDoc,
                    "idForm": e.idForm,
                    "status": e.status,
                    "tanggal": e.tanggal,
                    "tujuan" : e.tujuan
                });
                await fetchDokumen(`${tanggal}`);
                Swal.fire(`${next.data.success}`,'', 'success');
                props.onAddGoal(`${tanggal}`)
                handleClose()
                /* console.log({
                    "idDoc": e.idDoc,
                    "idForm": e.idForm,
                    "status": e.status,
                    "tanggal": e.tanggal,
                    "tujuan" : e.tujuan
                }) */
                setIsLoading(false)
            }
            else{

            }
            
        } catch (error) {
            console.log(error.response.data.message);
            setIsLoading(false);
        }
    }

    const handleClose =() =>{
        setStatus('');
        setCode('');
        setDokumen('');
        setKeterangan('');
        setPengirim('');
        setVia('');
        setJasa('');
        setNopol('');
        setTglTerima('');
        setTglKirim('');
        setTujuan('');
        props.onClose();
        props.close()
    }
    return (
        <>
        <Modal
            show={props.onShow}
            aria-labelledby="contained-modal-title-vcenter"
            size="lg"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">Data Item Dokumen</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form style={{paddingLeft: 20, paddingRight: 20}}>
                    <div className="row  g-4">
                        <div className='col-sm-4 col-md-4 col-lg-4 col-xl-4'>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label><b>ID dokumen</b></Form.Label>
                                <Form.Control
                                    type="text"
                                    value={code}
                                    disabled
                                />
                            </Form.Group>
                        </div>
                        <div className='col-sm-4 col-md-4 col-lg-4 col-xl-4'>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label><b>Pengirim</b></Form.Label>
                                <Form.Control
                                    type="text"
                                    value={pengirim}
                                    disabled
                                />
                            </Form.Group>
                        </div>
                        <div className='col-sm-4 col-md-4 col-lg-4 col-xl-4'>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label><b>Status</b></Form.Label>
                                <Form.Control
                                    type="text"
                                    className={
                                        (status === "Hold") ? "btn btn-warning"
                                        : (status === "Verifikasi") ? "btn btn-primary"
                                        : (status === "Selesai") ? "btn btn-success"
                                        : "btn btn-danger"
                                    }
                                    value={status}
                                    disabled
                                />
                            </Form.Group>
                        </div>
                    </div>
                    <div className="row  g-4">
                        <div className='col-sm-4 col-md-4 col-lg-4 col-xl-4'>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label><b>Via Pengiriman</b></Form.Label>
                                <Form.Control
                                    type="text"
                                    value={via}
                                    disabled
                                />
                            </Form.Group>
                        </div>
                        <div className='col-sm-4 col-md-4 col-lg-4 col-xl-4'>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label><b>Jasa Pengiriman</b></Form.Label>
                                <Form.Control
                                    type="text"
                                    value={jasa}
                                    disabled
                                />
                            </Form.Group>
                        </div>
                        <div className='col-sm-4 col-md-4 col-lg-4 col-xl-4'>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label><b>No Resi/ Nopol Mobil</b></Form.Label>
                                <Form.Control
                                    type="text"
                                    value={nopol}
                                    disabled
                                />
                            </Form.Group>
                        </div>
                    </div>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={{}}>
                        <Form.Label>Nama Dokumen</Form.Label>
                        <Form.Control
                            type="text"
                            value={dokumen}
                            disabled
                        />
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label>Keterangan</Form.Label>
                        <Form.Control 
                            as="textarea"
                            rows={2} 
                            value={keterangan}
                            disabled
                        />
                    </Form.Group>
                    {
                        (status === "Verifikasi" || status === "Selesai") &&
                        <div className="row  g-4">
                            <div className='col-sm-4 col-md-4 col-lg-4 col-xl-4'>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label><b>Tgl Verifikasi</b></Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={tglTerima}
                                        disabled
                                    />
                                </Form.Group>
                            </div>
                            <div className='col-sm-4 col-md-4 col-lg-4 col-xl-4'>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label><b>Tanggal Kirim Ulang</b></Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={tglKirim}
                                        disabled
                                    />
                                </Form.Group>
                            </div>
                            <div className='col-sm-4 col-md-4 col-lg-4 col-xl-4'>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label><b>Tujuan Pengiriman</b></Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={tujuan}
                                        onChange={(e)=> setTujuan(e.target.value)}
                                        disabled={(status === "Verifikasi") && false}
                                    />
                                </Form.Group>
                            </div>
                        </div>
                    }
                </Form>
            </Modal.Body>
            <Modal.Footer>
                {
                    (status === "Pengajuan" || status === "Hold" || status === "Reject")
                    ?
                    <div>
                        <Button variant="warning" className="me-2" onClick={(e)=>{handleSwap(props.data[0], 'Hold')}}>
                            Hold
                        </Button>
                        <Button variant="danger" className="me-2" onClick={(e)=>{handleSwap(props.data[0], 'Reject')}}>
                            Reject
                        </Button>
                        <Button variant="primary" className="me-2" onClick={(e)=>{handleSwap(props.data[0], 'Verifikasi')}}>
                            Verify
                        </Button>
                        <Button variant="secondary" className="me-2" onClick={()=> props.close()}>
                            Close
                        </Button>
                    </div>
                    :
                    (status === "Verifikasi")
                    ?
                    <div>
                        <Button 
                            variant="success"
                            className="me-2"
                            onClick={(e)=>{
                                (tujuan === "") ?
                                Swal.fire("Oppss..","Harap input tujuan pengiriman","info")
                                : handleSwap(props.data[0], 'Selesai')
                            }}
                        >
                            Save
                        </Button>
                        <Button variant="secondary" className="me-2"  onClick={()=> props.close()}>
                            Close
                        </Button>
                    </div>
                    :
                    <Button className="secondary" onClick={()=> props.close()}>
                        Close
                    </Button>
                
                }
            </Modal.Footer>
        </Modal>

        {isLoading && <LoadingPage/>}
        </>
    )
}
