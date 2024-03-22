import React, { useEffect, useState } from 'react';
import Swal from "sweetalert2";
import { useLocation, useNavigate } from 'react-router-dom';
import { NumericFormat } from 'react-number-format';
import { Breadcrumb, Button, Card, Container, FloatingLabel, Form, InputGroup } from 'react-bootstrap';


import { LoadingPage } from '../../LoadingPage/LoadingPage';
import useAuthStore, { selectUser } from '../../store/DataUser';
import { API_AUTH } from '../../apis/apisData';


export const ViewTerima = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const userData = useAuthStore(selectUser);
    const [tglKirim, setTglKirim] = useState("");
    const [currency, setCurrency] = useState("");
    const [ongkirs, setOngkirs] = useState(0);
    const [jmlValas, setJmlValas] = useState(0);
    const [validated, setValidated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [hilang, setHilang] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        if(location.state === null) {
            navigate(`/form/Kedatangan`);
            Swal.fire('Info','Harap kembali ke halaman permintaan data tidak lengkap', 'info');
            setIsLoading(false);
        }
        else{
            cekData();
            setOngkirs(parseFloat(location.state.data?.ongkir))
            let qty_psn = 0;
            let hSatuan = 0;
            let diskon = 0;
            let tax = location.state.data?.tax;

            if(location.state.data?.qty_psn === undefined || location.state.data?.qty_psn === ""){qty_psn = 0}
            else{qty_psn = parseFloat(location.state.data?.qty_psn)}

            if(location.state.data?.hrga_sat === undefined || location.state.data?.hrga_sat === ""){hSatuan = 0}
            else{hSatuan = parseFloat(location.state.data?.hrga_sat)}

            if(location.state.data?.disc === undefined || location.state.data?.disc === ""){diskon = 0}
            else{diskon = String(location.state.data?.disc).split("+")}

            let total = qty_psn * hSatuan;

            if(diskon.length <2){
                let cekHarga = (parseFloat(diskon) * total) / 100;
                total = total - cekHarga;
            }
            else{
                for(let x = 0; x < diskon.length;x++){
                    let cekHarga = (parseFloat(diskon[x]) * total) / 100;
                    total = total - cekHarga;
                }
            }

            let nPPN =0.0;
            let nPPH =0.0;
            if(tax === "A"){
                nPPN = 0.0;
                nPPH =(total*2.5)/100;
            }
            else if(tax === "B"){
                nPPN = 0.0;
                nPPH =(total*3)/100;
            }
            else if(tax === "D"){
                nPPN = 0.0;
                nPPH = 0.0;
            }
            else if(tax === "E"){
                nPPN = 0.0;
                nPPH = (total*10)/100;
            }
            else if(tax === "G"){
                nPPN = 0.0;
                nPPH = (total*0.5)/100;
            }
            else if(tax === "R"){
                nPPN = (total*1.1)/100;
                nPPH = 0.0;
            }
            else if(tax === "S"){
                nPPN = (total*11)/100;
                nPPH = 0.0;
            }
            else if(tax === "T"){
                nPPN = 0.0;
                nPPH = (total*2)/100;
            }
            else if(tax === "SE"){
                nPPN = (total*11)/100;
                nPPH = (total*10)/100;
            }
            else if(tax === "ST"){
                nPPN = (total*11)/100;
                nPPH = (total*2)/100;
            }
            else if(tax === "RT"){
                nPPN = (total*1.1)/100;
                nPPH = (total*2)/100;
            }
            else{
                nPPN = 0.0;
                nPPH = 0.0;
            }
            
            total = (total + nPPN) - nPPH;
            setJmlValas(total);
            setTglKirim(location.state.data?.tgl_terima)
            setCurrency(location.state.data?.currency)

            if(userData?.usubdiv === "Purchasing" || userData?.usubdiv === "Develop"){
                setHilang(false);
            }
            else{
                setHilang(true);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const cekData = () =>{
        setIsLoading(false);
    }

    const handleSubmit =async (e) =>{
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
            setValidated(true);
        }
        else{
            try {
                setIsLoading(true);
                const idNumb = location.state.data?.id_no;
                console.log({
                    id : idNumb,
                    tanggal : tglKirim,
                    currency : currency
                })
                const next = await API_AUTH.put(`/kedatangan/${idNumb}`, {
                    tanggal : tglKirim,
                    currency : currency
                });
                Swal.fire(`${next.data.success}`, navigate(`/form/kedatangan`), 'success');
                setIsLoading(false);
            } catch (error) {
                console.log(error)
                Swal.fire('Info', `${error.response.data.message}`, 'warning');
                setIsLoading(false);
            }
        }
    }
  return (
    <>
        <div className='setContain'>
            <div className="bg-body">
                <Breadcrumb className='bg-body'>
                <Breadcrumb.Item onClick={() =>navigate(`/form`)}>Form</Breadcrumb.Item>
                <Breadcrumb.Item onClick={() => navigate(`/form/kedatangan`)}>Terima Barang & Log Book</Breadcrumb.Item>
                <Breadcrumb.Item active>View Terima Barang</Breadcrumb.Item>
                </Breadcrumb>
            </div>

            <Container fluid>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
    
                <div className='row  g-2  mb-1'>
                  <div className='col-sm-4 col-md-4	col-lg-3 col-xl-3 mb-1'>
                    <Card bg='white'>
                      <Card.Body>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="No PO"
                            className="mb-3"
                        >
                            <Form.Control
                                required
                                type="text"
                                placeholder="No PO"
                                value={location.state.data?.no_po}
                                disabled = {true}
                            />
                        </FloatingLabel>

                        <FloatingLabel
                            controlId="floatingInput"
                            label="No Material"
                            className="mb-3"
                        >
                            <Form.Control
                                required
                                type="text"
                                placeholder="No Material"
                                value={location.state.data?.no_fina}
                                disabled
                            />
                        </FloatingLabel>

                        <FloatingLabel
                            controlId="floatingInput"
                            label="Kode Material"
                            className="mb-3"
                        >
                            <Form.Control
                                required
                                type="text"
                                value={location.state.data?.kode_item}
                                disabled
                            />
                        </FloatingLabel>

                        <FloatingLabel
                            controlId="floatingInput"
                            label="Kode Material"
                            className="mb-3"
                        >
                            <Form.Control 
                                as="textarea" 
                                aria-label="With textarea" 
                                rows={1}
                                value = {location.state.data?.deskripsi_item}
                                disabled
                            />
                        </FloatingLabel>

                        <FloatingLabel
                            controlId="floatingInput"
                            label="Eksternal provider"
                            className="mb-3"
                        >
                            <Form.Control 
                                as="textarea" 
                                aria-label="With textarea" 
                                rows={1}
                                value = {location.state.data?.eks_provider}
                                disabled
                            />
                        </FloatingLabel>
                      </Card.Body>
                    </Card>
                  </div>
                    
                  <div className='col-sm-8	col-md-8 col-lg-8 col-xl-8 mb-1'>
                    <Card className='mb-3' bg='white'>
                      <Card.Body>
                        <div className="row  g-2 ">
                          <div className='col-sm-12 col-md-4 col-lg-4 col-xl-4'>
                            <FloatingLabel
                                    controlId="floatingInput"
                                    label="Tgl Pesan"
                                    className="mb-3"
                                >
                                    <Form.Control
                                        required
                                        type="date"
                                        placeholder="No PO"
                                        value={location.state.data?.tgl_psn}
                                        disabled = {true}
                                    />
                            </FloatingLabel>
                          </div>
                          <div className='col-sm-12 col-md-4 col-lg-4 col-xl-4'>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Tgl Kirim"
                                className="mb-3"
                            >
                                <Form.Control
                                    required
                                    type="date"
                                    value={tglKirim}
                                    onChange={(e)=> setTglKirim(e.target.value)}
                                    disabled = {hilang}
                                />
                            </FloatingLabel>
                            
                          </div>
                          <div className='col-sm-12 col-md-4 col-lg-4 col-xl-4'>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Tgl Datang"
                                className="mb-3"
                            >
                                <Form.Control
                                    required
                                    type="date"
                                    placeholder="Tgl Datang"
                                    value={location.state.data?.tgl_datang}
                                    disabled
                                />
                            </FloatingLabel>
                            
                          </div>
                        </div>

                        <div className="row  g-2 ">
                          <div className='col-sm-12 col-md-6 col-lg-6 col-xl-6'>
                            <InputGroup>
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Kts Dipesan"
                                >

                                    <NumericFormat 
                                        name="qty"
                                        customInput={Form.Control}
                                        thousandSeparator={true}
                                        value={location.state.data?.qty_psn}
                                        disabled
                                    
                                    />
                                    
                                </FloatingLabel>
                                
                                <InputGroup.Text id="basic-addon2">{location.state.data?.unit}</InputGroup.Text>
                            </InputGroup>
                          </div>
                          <div className='col-sm-12 col-md-6 col-lg-6 col-xl-6 mb-3'>
                            <InputGroup>
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Kts Diterima"
                                >
                                    <NumericFormat 
                                        name="qty"
                                        customInput={Form.Control}
                                        thousandSeparator={true}
                                        value={location.state.data?.qty_trma}
                                        disabled
                                    
                                    />
                                    
                                </FloatingLabel>
                                
                                <InputGroup.Text id="basic-addon2">{location.state.data?.unit}</InputGroup.Text>
                            </InputGroup>
                            
                          </div>

                        </div>
    
                        <div className="row  g-2 ">
                          <div className='col-sm-12 col-md-12 col-lg-12 col-xl-12'>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Eksternal provider"
                                className="mb-3"
                            >
                                <Form.Control 
                                    as="textarea" 
                                    aria-label="With textarea" 
                                    rows={2}
                                    value = {location.state.data?.ket_purch}
                                    disabled
                                />
                            </FloatingLabel>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                    <div className='row g-2 mb-1'>
                            <div className='col-sm-8 col-md-8 col-lg-8 col-xl-8 mb-1'>
                            </div>
                            <div className='col-sm-4 col-md-4 col-lg-4 col-xl-4 mb-1'>
                                <div className='row g-2 mb-1'>
                                    <div className='col-sm-6 col-md-6 col-lg-6 col-xl-6'>
                                        <h6 style={{justifyContent: "center", alignItems: 'center'}}>Currency</h6>
                                    </div>
                                    <div className='col-sm-6 col-md-6 col-lg-6 col-xl-6'>
                                        <Form.Control
                                            required
                                            type="text"
                                            placeholder="USD 0/EUR 0"
                                            value={currency}
                                            onChange={(e) => {
                                                let name =String(e.target.value).toUpperCase()
                                                setCurrency(name)
                                            }}
                                            style={{ textAlign: 'right' }}
                                            disabled ={hilang}
                                        />
                                    </div>
                                </div>
                                <div className='row g-2 mb-1'>
                                    <div className='col-sm-6 col-md-6 col-lg-6 col-xl-6'>
                                        <h6>Harga Satuan</h6>
                                    </div>
                                    <div className='col-sm-6 col-md-6 col-lg-6 col-xl-6'>
                                        <NumericFormat 
                                            customInput={Form.Control}
                                            thousandSeparator={true}
                                            style={{ textAlign: 'right' }}
                                            value={location.state.data?.hrga_sat}
                                            disabled
                                        />
                                    </div>
                                </div>
                                <div className='row g-2 mb-1'>
                                    <div className='col-sm-6 col-md-6 col-lg-6 col-xl-6'>
                                        <h6>Diskon</h6>
                                    </div>
                                    <div className='col-sm-6 col-md-6 col-lg-6 col-xl-6'>
                                        <Form.Control
                                            required
                                            type="text"
                                            placeholder="0"
                                            value={location.state.data?.disc}
                                            style={{ textAlign: 'right' }}
                                            disabled
                                        />
                                    </div>
                                </div>
                                <div className='row g-2 mb-1'>
                                    <div className='col-sm-6 col-md-6 col-lg-6 col-xl-6'>
                                        <h6>Jmlh Valas</h6>
                                    </div>
                                    <div className='col-sm-6 col-md-6 col-lg-6 col-xl-6'>
                                        <NumericFormat 
                                            customInput={Form.Control}
                                            thousandSeparator={true}
                                            value={jmlValas}
                                            style={{ textAlign: 'right' }}
                                            disabled
                                        />
                                    </div>
                                </div>
                                <div className='row g-2 mb-1'>
                                    <div className='col-sm-6 col-md-6 col-lg-6 col-xl-6'>
                                        <h6>B.Antar</h6>
                                    </div>
                                    <div className='col-sm-6 col-md-6 col-lg-6 col-xl-6'>
                                    <NumericFormat 
                                    customInput={Form.Control}
                                    thousandSeparator={true}
                                    value={ongkirs}
                                    style={{ textAlign: 'right' }}
                                    disabled
                                />
                                    </div>
                                </div>
                            </div>
                        </div>
                  </div>
                  <div className='col-sm-12	col-md-12 col-lg-1 col-xl-1 mb-5'>
                  
                    <div className='d-flex align-items-end flex-column'>
                      <div className='d-flex align-items-end flex-wrap'>
                        <div className='row p-2'>
                            <Button 
                                type="submit" 
                                variant="outline-primary m-2" 
                                className='col-sm-12 col-md-12 col-lg-12 col-xl-12'
                                disabled={hilang}
                            >
                                Update
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
