import React, { useEffect, useState } from 'react';
import Swal from "sweetalert2";
import { format } from "date-fns";
import id from 'date-fns/locale/id';
import { useLocation, useNavigate } from 'react-router-dom';
import { NumericFormat } from 'react-number-format';
import { Accordion, Breadcrumb, Button, Container, FloatingLabel, Form, InputGroup } from 'react-bootstrap';


import { LoadingPage } from '../../LoadingPage/LoadingPage';
import useAuthStore, { selectUser } from '../../store/DataUser';
import { API_AUTH } from '../../apis/apisData';

export const ViewLogbook = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const userData = useAuthStore(selectUser);
    const [tglDatang, setTglDatang] = useState('');
    const [tglExp, setTglExp] = useState('');
    const [qtyTrm, setQtyTrm] = useState('');
    const [srtJalan, setSrtJalan] = useState('');
    const [wktDatang, setWktDatang] = useState('');
    const [wktSelesai, setWktSelesai] = useState('');
    const [rincian, setRincian] = useState('');
    const [ketBar, setKetBar] = useState('');
    const [lot, setLot] = useState('');
    const [ustatus, setUstatus] = useState('');
    const [tipe, setTipe] = useState('');
    const [bag, setBag] = useState('');
    const [warna, setWarna] = useState('btn btn-danger mb-2 text-center');
    const [validated, setValidated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [hilang, setHilang] = useState(true);
    const [printLab, setPrintLab] = useState(true);
  
    useEffect(() => {
        setIsLoading(true);
        if(location.state === null) {
            navigate(`/form/Kedatangan`);
            Swal.fire('Info','Harap kembali ke halaman permintaan data tidak lengkap', 'info');
            setIsLoading(false);
        }
        else{
            cekData();
            setWktDatang(location.state.data?.jam_dtng);
            setWktSelesai(location.state.data?.jam_slsai);
            setTglDatang(location.state.data?.tgl_datang);
            setTglExp(location.state.data?.tgl_exp);
            setSrtJalan(location.state.data?.no_sj);
            setQtyTrm(location.state.data?.qty_trma);
            setRincian(location.state.data?.rincian_bar);
            setKetBar(location.state.data?.ktrng_dtng);
            setTipe(location.state.data?.kategori_item);
            setBag(location.state.data?.bag);
            const status = location.state.data?.status_brng
            if(status === ""){
              setWarna("btn btn-danger mb-2 text-center");
              setUstatus("Proses");
              setPrintLab(true);
            }
            else{
              setWarna("btn btn-success mb-2 text-center");
              setUstatus(location.state.data?.status_brng);
              setPrintLab(false);
            }
  
            if(userData?.usubdiv === "PPIC-WH" || userData?.usubdiv === "Develop"){
                setHilang(false);
            }
            else{
                setHilang(true);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  
    useEffect(() => {
      const createUniq = () => {
          let bb = format(new Date(), "MM", { locale: id });
          let tt = format(new Date(), "yy", { locale: id });
          let dd = format(new Date(), "dd", { locale: id });
          let hh = format(new Date(), "HH", { locale: id });
          let mm = format(new Date(), "mm", { locale: id });
          
          let bln = parseInt(bb)
          let numb = "ZZ"
          setWktSelesai(`${hh}:${mm}`);
          switch(bln) {
            case 1:
              numb = "A"
              break;
            case 2:
              numb = "B"
              break;
            case 3:
              numb = "C"
              break;
            case 4:
              numb = "D"
              break;
            case 5:
              numb = "E"
              break;
            case 6:
              numb = "F"
              break;
            case 7:
              numb = "G"
              break;
            case 8:
              numb = "H"
              break;
            case 9:
              numb = "I"
              break;
            case 10:
              numb = "J"
              break;
            case 11:
              numb = "K"
              break;
            case 12:
              numb = "L"
              break;
            default:
              numb = "ZZ"
          }
        setLot(`${numb}${dd}${tt}`)
      }
      createUniq()
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
  
              const next = await API_AUTH.put(`/logbook/${idNumb}`, {
                srtJalan : srtJalan,
                lot : lot,
                tipe : tipe,
                wktSelesai : wktSelesai,
                tglDatang : tglDatang,
                tglExp : tglExp,
                qtyTrm : qtyTrm,
                rincian : rincian,
                ket : ketBar,
                user: userData?.uname,
                plan : userData?.uplan,
              });
              Swal.fire(`${next.data.success}`, navigate(`/form/kedatangan`), 'success');
              setIsLoading(false);
            } catch (error) {
                console.log('error')
                Swal.fire('Info', `${error.response.data.message}`, 'warning');
                setIsLoading(false);
            }
        }
    }
  
    const handlePrint = () =>{
      navigate(`/form/Kedatangan/labelbarang`,{state:{
        data : location.state.data
      }});
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
                  <Accordion defaultActiveKey="0" className='mb-2'>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>
                        Waktu Kedatangan
                      </Accordion.Header>
                      <Accordion.Body>
                        <FloatingLabel
                          controlId="floatingInput"
                          label="No Urut"
                          className="mb-1"
                        >
                          <Form.Control
                            required
                            type="text"
                            placeholder="No Urut"
                            value={location.state.data?.no_urut}
                            disabled
                          />
                        </FloatingLabel>
  
                        <FloatingLabel
                          controlId="floatingInput"
                          label="Jam Kedatangan"
                          className="mb-1"
                        >
                          <Form.Control
                            required
                            type="text"
                            placeholder="Jam Kedatangan"
                            value={wktDatang}
                            disabled
                          />
                        </FloatingLabel>
  
                        <FloatingLabel
                          controlId="floatingInput"
                          label="Jam Selesai"
                          className="mb-1"
                        >
                          <Form.Control
                            required
                            type="time"
                            placeholder="Jam Selesai"
                            value={wktSelesai}
                            disabled
                          />
                        </FloatingLabel>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                  <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>
                        Detail Item
                      </Accordion.Header>
                      <Accordion.Body>
                        <FloatingLabel
                          controlId="floatingInput"
                          label="No PO"
                          className="mb-1"
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
                          label="No Surat Jalan"
                          className="mb-1"
                        >
                          <Form.Control
                            required
                            type="text"
                            placeholder="No Surat Jalan"
                            value={srtJalan}
                            onChange={(e)=> setSrtJalan(e.target.value)}
                            disabled = {hilang}
                          />
                        </FloatingLabel>
  
                        <FloatingLabel
                          controlId="floatingInput"
                          label="No Lot"
                          className="mb-1"
                        >
                          <Form.Control
                            required
                            type="text"
                            placeholder="No lot"
                            value={lot}
                            disabled
                          />
                        </FloatingLabel>
  
                        <FloatingLabel
                          controlId="floatingInput"
                          label="No Material"
                          className="mb-1"
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
                          label="Kategori Barang"
                          className="mb-1"
                        >
                          <Form.Control
                            required
                            type="text"
                            value={location.state.data?.tipe_data}
                            disabled
                          />
                        </FloatingLabel>
  
                        <FloatingLabel
                          controlId="floatingInput"
                          label="Kode Material"
                          className="mb-1"
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
                          label="Deskirpsi Material"
                          className="mb-1"
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
                          className="mb-1"
                        >
                          <Form.Control 
                            as="textarea" 
                            aria-label="With textarea" 
                            rows={1}
                            value = {location.state.data?.eks_provider}
                            disabled
                          />
                        </FloatingLabel>
                      
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
  
                <div className='col-sm-8	col-md-8 col-lg-8 col-xl-8 mb-1'>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Status"
                  >
                    <Form.Control
                      required
                      type="text"
                      value={ustatus}
                      className={warna}
                      disabled = {true}
                    />
                  </FloatingLabel>
                  <Accordion defaultActiveKey="0" className='mb-2'>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>
                        Tgl Pesan, Tgl Kirim & Qty Dipesan
                      </Accordion.Header>
                      <Accordion.Body>
                        <div className="row g-2">
                          <div className='col-sm-12 col-md-4 col-lg-4 col-xl-4'>
                            <FloatingLabel
                              controlId="floatingInput"
                              label="Tgl Pesan"
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
                            >
                              <Form.Control
                                required
                                type="date"
                                value={location.state.data?.tgl_terima}
                                disabled
                              />
                            </FloatingLabel>
                          </div>
                          <div className='col-sm-12 col-md-4 col-lg-4 col-xl-4'>
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
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
  
                  <Accordion defaultActiveKey="0" className='mb-2'>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>
                        Tgl Datang, Tgl Expired, Qty Kirim & Pack/Bag
                      </Accordion.Header>
                      <Accordion.Body>
                        <div className="row g-1 mb-2">
                          <div className='col-sm-12 col-md-3 col-lg-3 col-xl-3'>
                            <FloatingLabel
                              controlId="floatingInput"
                              label="Tgl Datang"
                            >
                              <Form.Control
                                required
                                type="date"
                                placeholder="Tgl Datang"
                                value={tglDatang}
                                onChange={(e)=>setTglDatang(e.target.value)}
                                disabled = {hilang}
                              />
                            </FloatingLabel>
                          </div>
                          <div className='col-sm-12 col-md-3 col-lg-3 col-xl-3'>
                            <FloatingLabel
                              controlId="floatingInput"
                              label="Tgl Expired"
                            >
                              <Form.Control
                                type="date"
                                placeholder="Tgl Expired"
                                value={tglExp}
                                onChange={(e)=> setTglExp(e.target.value)}
                                disabled = {hilang}
                              />
                            </FloatingLabel>
                          </div>
                          <div className='col-sm-12 col-md-3 col-lg-3 col-xl-3'>
                            <InputGroup>
                              <FloatingLabel
                                controlId="floatingInput"
                                label="Kts Diterima"
                              >
                                <NumericFormat 
                                  required
                                  name="qty"
                                  customInput={Form.Control}
                                  thousandSeparator={true}
                                  value={qtyTrm}
                                  onValueChange={(e)=>{
                                    setQtyTrm(e.value)
                                  }}
                                  disabled = {hilang}
                                
                                />
                              </FloatingLabel>
                              <InputGroup.Text id="basic-addon2">{location.state.data?.unit}</InputGroup.Text>
                            </InputGroup>
                          </div>
                          <div className='col-sm-12 col-md-3 col-lg-3 col-xl-3'>
                            <InputGroup>
                              <FloatingLabel
                                controlId="floatingInput"
                                label="Pack / Bag"
                              >
                                <NumericFormat 
                                  name="qty"
                                  customInput={Form.Control}
                                  thousandSeparator={true}
                                  value={bag}
                                  onValueChange={(e)=>{
                                    setBag(e.value)
                                  }}
                                  disabled = {hilang}
                                
                                />
                              </FloatingLabel>
                              <InputGroup.Text id="basic-addon2">{location.state.data?.unit}</InputGroup.Text>
                            </InputGroup>
                          </div>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
  
                  <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>
                        Tipe, Rincian Barang, Keterangan
                      </Accordion.Header>
                      <Accordion.Body>
                        <div className="row g-2 mb-2">
                          <div className='col-sm-12 col-md-6 col-lg-6 col-xl-6'>
                            <FloatingLabel controlId="floatingSelect" label="Tipe">
                              <Form.Select 
                                aria-label="Tipe" 
                                required={true} 
                                value={tipe} 
                                onChange={(e)=> setTipe(e.target.value)}
                                disabled={hilang}
                              >
                              <option value=""></option>
                                <option value="SJ">SJ</option>
                                <option value="IT">IT</option>
                                <option value="TG">TG</option>
                              </Form.Select>
                            </FloatingLabel>
                          </div>
                          <div className='col-sm-12 col-md-6 col-lg-6 col-xl-6'>
                            <FloatingLabel
                              controlId="floatingInput"
                              label="Rincian Barang"
                              className="mb-1"
                            >
                              <Form.Control
                                type="text"
                                value={rincian}
                                onChange={(e)=> setRincian(e.target.value)}
                                disabled = {hilang}
                              />
                            </FloatingLabel>
                          </div>
                        </div>
  
                        <div className='col-sm-12 col-md-12 col-lg-12 col-xl-12'>
                          <FloatingLabel
                            controlId="floatingInput"
                            label="Keterangan Terima Barang"
                            className="mb-3"
                          >
                            <Form.Control 
                              as="textarea" 
                              aria-label="With textarea" 
                              rows={2}
                              defaultValue={ketBar}
                              onChange={(e)=>setKetBar(e.target.value)}
                              disabled={hilang}
                            />
                          </FloatingLabel>
                        </div>
                      
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                  
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
  
                          <Button
                              variant="outline-primary m-2" 
                              className='col-sm-12 col-md-12 col-lg-12 col-xl-12'
                              onClick={(e)=>{handlePrint()}}
                              disabled={printLab}
                          >
                              View Label
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
