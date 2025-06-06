import React, { useEffect, useState } from 'react';
import Swal from "sweetalert2";
import { NumericFormat } from 'react-number-format';
import { Accordion, Breadcrumb, Button, Card, Col, Container, Form, InputGroup } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom';


import { LoadingPage } from '../../LoadingPage/LoadingPage';
import useAuthStore, { selectUser } from '../../store/DataUser';
import { API_AUTH } from '../../apis/apisData';

export const UpdatePrevPengada = () => { 
    const navigate = useNavigate();
    const location = useLocation();
    const userData = useAuthStore(selectUser);

    const [inputList, setInputList] = useState([{ tglDatang: '', qty: '', expro: '', po: '', noAkun: '' }]);
    const [nparsial, setNparsial] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [validated, setValidated] = useState(false);
    const [coa, setCoa] = useState(false);
    const [msds, setMsds] = useState(false);
    const [halal, setHalal] = useState(false);
    const [copyPO, setCopyPO] = useState(false);
    const [health, setHealth] = useState(false);
    const [kh, setKh] = useState(false);
    const [foodGra, setFoodGra] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        if(location.state === null) {
            navigate(`/form/pengadaan`);
            
            setIsLoading(false);
            Swal.fire('Info','Harap kembali ke halaman permintaan data tidak lengkap', 'info')
        }
        else{
            cekData();
            const data = location.state.data;
            console.log(data)
            if(data?.coa === 1){setCoa(true)}
            if(data?.halal === 1){setHalal(true)}
            if(data?.msds === 1){setMsds(true)}
            if(data?.copypo === 1){setCopyPO(true)}
            if(data?.health === 1){setHealth(true)}
            if(data?.kh === 1){setKh(true)}
            if(data?.foodgrade === 1){setFoodGra(true)}
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const cekData = () =>{
        const data = location.state.data;
        const result = Object.values(
            data.parsial_data.reduce((acc, item) => {
              acc[item.po] = acc[item.po]
                ? { ...item, qty: parseFloat(item.qty) + parseFloat(acc[item.po].qty) }
                : item;
              return acc;
            }, {})
        );
        setNparsial(result)
        setInputList(location.state.data?.parsial_data);
        setIsLoading(false)
    }

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
        const nopo =location.state.po;
        const data = location.state.data;
        const suply = data.parsial_data.filter(x=> x.po === nopo)
        setInputList([...inputList, { tglDatang: '', qty: '', expro: suply[0].expro, po: nopo, noAkun: 'new' }]);
    };

    const handleSubmit = (e) =>{
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
            setValidated(true);
            
            Swal.fire('Info','Lengkapi data','error')
        }
        else{
            const tpBtn = e.nativeEvent.submitter.name;
            let cekN =  inputList.filter(x=> x.qty === "");
            if(cekN.length === 0){
                let jum = 0;
                inputList.map((x,i)=>{
                    let nilai = parseFloat(x.qty)
                    return(
                        jum += nilai
                    )
                })

                if(location.state.data.qty_pengadaan[0].order === jum){
                    if(tpBtn === 'open'){
                        handleOpen()
                    }
                    else{
                        handleClose()
                    }
                }
                else{
                    Swal.fire('Oppss...','Harap cek kembali total qty','info')
                }

                
            }
            else{
                Swal.fire('Oppss...','Harap cek ulang qty data','info')
            }
        }
    }

    const handleClose =async () =>{
        try {
            const nilai = inputList.map((e,i)=>{
                return(
                    { 
                        tglDatang: e.tglDatang,
                        qty: e.qty,
                        expro: e.expro,
                        po: e.po,
                        noAkun: ''
                    }
                )
            })
            let file = location.state.data;
            let nop = file.newPar[0].po;
            let swabt = inputList.filter(x=> x.noAkun !== "");
            if(userData.usubdiv === file.user[0].divisi && userData.uplan === file.user[0].plan){
                setIsLoading(true)
                console.log({
                    id_Pengadaan : location.state.data.id_Pengadaan,
                    idPo : nop,
                    parsial_data: nilai,
                    swabt : swabt
                })
                const next = await API_AUTH.put(`/updatePengadaan/parsial`, {
                    id_Pengadaan : location.state.data.id_Pengadaan,
                    idPo : nop,
                    parsial_data: nilai,
                    swabt : swabt
                });
                Swal.fire(`${next.data.success}`, navigate(`/form/pengadaan`), 'success');
                setIsLoading(false);
                
            }
            else{
                Swal.fire(`Oppss...`, 'Anda tidak memiliki akses', 'info');
            }
        } catch (error) {
            Swal.fire('Info', `${error.response.data.message}`, 'warning');
            setIsLoading(false);
        }
    }

    const handleOpen =async () =>{
        try {
            let file = location.state.data;
            let nop = file.newPar[0].po;
            let swabt = inputList.filter(x=> x.noAkun !== "");
            const nilai = inputList.map((e,i)=>{
                let no = inputList.length - 1;
                let akun = '';
                if(i === no){
                    akun = 'purch';
                }
                else{
                    akun = '';
                }
                return(
                    { 
                        tglDatang: e.tglDatang,
                        qty: e.qty,
                        expro: e.expro,
                        po: e.po,
                        noAkun: akun
                    }
                )
            });
            if(userData.usubdiv === file.user[0].divisi && userData.uplan === file.user[0].plan){
                setIsLoading(true)
                const next = await API_AUTH.put(`/updatePengadaan/parsial`, {
                    id_Pengadaan : location.state.data.id_Pengadaan,
                    idPo : nop,
                    parsial_data: nilai,
                    swabt : swabt
                });
                Swal.fire(`${next.data.success}`, navigate(`/form/pengadaan`), 'success');
                setIsLoading(false);
            }
            else{
                Swal.fire(`Oppss...`, 'Anda tidak memiliki akses', 'info');
            }
        } catch (error) {
            console.log('error');
            setIsLoading(false);
        }
    }

    return (
        <>
        <div className='setContain'>
            <div className="bg-body">
                <Breadcrumb className='bg-body'>
                    <Breadcrumb.Item onClick={() =>navigate(`/form`)}>Form</Breadcrumb.Item>
                    <Breadcrumb.Item onClick={() => navigate(`/form/pengadaan`)}>Pengadaan</Breadcrumb.Item>
                    <Breadcrumb.Item active>Update Pengadaan</Breadcrumb.Item>
                </Breadcrumb>
            </div>

            <Container fluid>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <div className='row  g-2  mb-1'>
                        <div className='col-sm-4 col-md-4 col-lg-2 col-xl-2 mb-1'>
                            <Card className='mb-2' bg='white'>
                                <Card.Body>
                                    <Form.Group as={Col} controlId="validationCustom01">
                                        <Form.Label>Nama</Form.Label>
                                        <Form.Control
                                        required
                                        type="text"
                                        value={location.state.data?.user[0].pemohon}
                                        disabled
                                        />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="validationCustom01">
                                        <Form.Label>Jabatan</Form.Label>
                                        <Form.Control
                                        required
                                        type="text"
                                        value={location.state.data?.user[0].jabatan}
                                        disabled
                                        />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="validationCustom01">
                                        <Form.Label>
                                        Status Pengadaan
                                        </Form.Label>
                                        <Form.Control
                                        required
                                        type="text"
                                        placeholder="Status Pengadaan"
                                        className='btn btn-primary mb-1'
                                        value={location.state.data?.status}
                                        disabled
                                        />
                                    </Form.Group>
                                </Card.Body>
                            </Card>
                            <Card bg='white'>
                                <Card.Body>
                                    <Form.Group as={Col} controlId="validationCustom01">
                                        <Form.Label>Id Pengadaan</Form.Label>
                                        <Form.Control
                                        required
                                        type="text"
                                        placeholder="Id Pengadaan"
                                        value={location.state.data?.id_Pengadaan}
                                        disabled
                                        />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="validationCustom01">
                                        <Form.Label>Tgl Pengadaan</Form.Label>
                                        <Form.Control
                                        required
                                        type="text"
                                        placeholder="Tgl Pengadaan"
                                        value={location.state.data?.t_pengadaan}
                                        disabled
                                        />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="validationCustom01">
                                        <Form.Label>Tgl Verifikasi</Form.Label>
                                        <Form.Control
                                        required
                                        type="text"
                                        value={location.state.data?.tgl_verify}
                                        disabled
                                        />
                                    </Form.Group>
                                </Card.Body>
                            </Card>

                            <Accordion className='mt-1'>
                                {nparsial?.map((x,i) =>{
                                    return (
                                        <Accordion.Item eventKey={x}>
                                            <Accordion.Header>
                                            <div className="p-0 ms-1 me-auto">
                                                <h6>{x.po}</h6>
                                                <h6>Qty :&nbsp;{x.qty}</h6>
                                            </div>
                                            </Accordion.Header>
                                        </Accordion.Item>
                                        )
                                    })
                                }
                            </Accordion>
                        </div>

                        <div className='col-sm-8 col-md-8 col-lg-9 col-xl-9 mb-1'>
                            <Card className='mb-3' bg='white'>
                                <Card.Body>
                                    <div className="row  g-2 ">
                                        <div className='col-sm-12 col-md-4 col-lg-4 col-xl-4'>
                                            <Form.Group as={Col} controlId="validationCustom01">
                                            <Form.Label>Tipe Material</Form.Label>
                                            <Form.Control
                                                required
                                                type="text"
                                                value={location.state.data?.material[0].tipe}
                                                disabled
                                                />
                                            
                                            </Form.Group>
                                        </div>
                                        <div className='col-sm-12 col-md-8 col-lg-8 col-xl-8'>
                                            <Form.Group as={Col} controlId="validationCustom01">
                                                <Form.Label>Item</Form.Label>
                                                <Form.Control
                                                required
                                                type="text"
                                                value={location.state.data?.material[0].material}
                                                disabled
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
                                            value = {location.state.data?.material[0].material}
                                            disabled
                                            />
                                            <Form.Control.Feedback type="invalid">
                                            Harap Masukan Nama Item
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        </div>
                                    </div>

                                    <div className="row  g-2">
                                        <div className='col-sm-12 col-md-4 col-lg-4 col-xl-4'>
                                            <Form.Group as={Col} controlId="validationCustom01">
                                            <Form.Label>Jenis Item</Form.Label>
                                            <Form.Control 
                                                as="textarea" 
                                                aria-label="With textarea" 
                                                rows={1}
                                                value = {location.state.data?.tipeMaterial}
                                                disabled
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
                                                value = {location.state.data?.brand}
                                                disabled
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Harap Masukan Nama Merk/Brand
                                            </Form.Control.Feedback>
                                            </Form.Group>
                                        </div>
                                        <div className='col-sm-12 col-md-4 col-lg-4 col-xl-4'>
                                            <Form.Group as={Col} controlId="validationCustom01">
                                            <Form.Label>Mesin</Form.Label>
                                            <Form.Control 
                                                as="textarea"
                                                aria-label="With textarea"
                                                rows={1}
                                                value = {location.state.data?.mesin}
                                                disabled
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
                                            value={location.state.data?.spesifikasi}
                                            aria-label="With textarea" 
                                            placeholder='Harap isikan merk, ukuran, dan data yang lengkap'
                                            disabled
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
                                        checked={coa}
                                        disabled
                                        />
                                    </div>
                                    <div className='col-sm-12 col-md-4 col-lg-4 col-xl-4'>
                                        <Form.Check
                                        inline
                                        label="Halal"
                                        name="Halal"
                                        type='checkbox'
                                        id={`inline-checkbox-1`}
                                        checked={halal}
                                        disabled
                                        />
                                    </div>
                                    <div className='col-sm-12 col-md-4 col-lg-4 col-xl-4'>
                                        <Form.Check
                                        inline
                                        label="MSDS"
                                        name="MSDS"
                                        type='checkbox'
                                        id={`inline-checkbox-1`}
                                        checked={msds}
                                        disabled
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
                                        checked={copyPO}
                                        disabled
                                        />
                                    </div>
                                    <div className='col-sm-12 col-md-4 col-lg-4 col-xl-4'>
                                        <Form.Check
                                        inline
                                        label="Health Certificate"
                                        name="Health Certificate"
                                        type='checkbox'
                                        id={`inline-checkbox-1`}
                                        checked={health}
                                        disabled
                                        />
                                    </div>
                                    <div className='col-sm-12 col-md-4 col-lg-4 col-xl-4'>
                                        <Form.Check
                                        inline
                                        label="KH"
                                        name="KH"
                                        type='checkbox'
                                        id={`inline-checkbox-1`}
                                        checked={kh}
                                        disabled
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
                                        checked={foodGra}
                                        disabled
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
                                    console.log(x)
                                    const satuan = location.state.data.qty_pengadaan[0].satuan
                                    let setData = true;
                                    if(x.po === location.state.po && x.noAkun === ""){
                                        if(x.divisi === "Purchasing"){
                                            setData = false
                                        }
                                        else{
                                            setData = true
                                        }
                                        
                                    }
                                    else if(x.po === location.state.po && x.noAkun !== ""){
                                        setData = false
                                    }
                                    else{setData = true}
                                    return(
                                    <div className="row  g-2">
                                        <h6>Parsial Ke-{i+1}</h6>
                                        <div className='col-sm-12 col-md-3 col-lg-3 col-xl-3'>
                                            <Form.Group as={Col} controlId="validationCustom01">
                                                <Form.Label>No PO</Form.Label>
                                                <Form.Control
                                                required
                                                name="nopos"
                                                type="text"
                                                placeholder="Tanggal Kirim"
                                                value={x.po}
                                                disabled
                                                />
                                            </Form.Group>
                                        </div>

                                        <div className='col-sm-12 col-md-3 col-lg-3 col-xl-3'>
                                            <Form.Group as={Col} controlId="validationCustom01">
                                                <Form.Label>Tanggal Kirim</Form.Label>
                                                <Form.Control
                                                required
                                                name="tglDatang"
                                                type="date"
                                                placeholder="Tanggal Kirim"
                                                value={x.tglDatang}
                                                onChange={(e) => handleInputChange(e, i)}
                                                disabled={x.qty === "" ? false : true}
                                                />
                                            </Form.Group>
                                        </div>
                                        
                                        <div className='col-sm-12 col-md-3 col-lg-3 col-xl-3'>
                                            <Form.Group as={Col} controlId="validationCustom01">
                                                <Form.Label>Qty</Form.Label>
                                                <InputGroup className="mb-3">
                                                <NumericFormat 
                                                    name="qty"
                                                    customInput={Form.Control}
                                                    thousandSeparator={false}
                                                    value={x.qty}
                                                    disabled={setData}
                                                    onChange ={(e) =>{
                                                    handleInputChange(e, i)
                                                    }}
                                                    
                                                />
                                                <InputGroup.Text id="basic-addon2">{satuan}</InputGroup.Text>
                                                </InputGroup>
                                            </Form.Group>
                                        </div>

                                        <div className='col-sm-2 col-md-3 col-lg-3 col-xl-3'>
                                            <h6>&nbsp;</h6>
                                            <div style={{display: "flex"}}>
                                                
                                                {inputList.length - 1 === i && (
                                                <Button 
                                                    variant="success" 
                                                    className=' d-flex justify-content-center align-items-center h-10' 
                                                    onClick={() => handleAddClick(i)}
                                                    disabled={false}
                                                    ><i className="bi bi-plus-square"></i></Button>
                                                )}
                                                    {inputList.length !== 1 && (
                                                    <Button
                                                        variant="primary"
                                                        onClick={() => handleRemoveClick(i)}
                                                        className='d-flex justify-content-center align-items-center h-10'
                                                        style={{marginLeft: 10}}
                                                        disabled={setData}
                                                    >
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

                        <div className='col-sm-12 col-md-12	col-lg-1 col-xl-1 mb-5'>
                            <div className='d-flex align-items-end flex-column'>
                                <div className='d-flex align-items-end flex-wrap'>
                                    <div className='row p-2'>
                                        <Button 
                                            type="submit"  
                                            name="open"
                                            variant="outline-primary m-2" 
                                            className='col-sm-12 col-md-12 col-lg-12 col-xl-12'
                                            value="open"
                                        >
                                            Update Open
                                        </Button>
                                        
                                    </div>
                                    <div className='row p-2'>
                                        <Button
                                            type="submit" 
                                            name="close"
                                            variant="outline-danger m-2" 
                                            className='col-sm-12 col-md-12 col-lg-12 col-xl-12'
                                            value="close"
                                        >
                                            Update close
                                        </Button>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>
            </Container>
        </div>

        {isLoading ? <LoadingPage /> : ""}
        </>
    )
}
