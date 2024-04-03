import React, { useEffect, useState } from 'react';
import Swal from "sweetalert2";
import Select from 'react-select';
import { useLocation, useNavigate } from 'react-router-dom';
import { NumericFormat } from 'react-number-format';
import useAuthStore, { selectUser } from '../../store/DataUser';
import { Accordion, Breadcrumb, Button, Card, Col, Container, Form, InputGroup } from 'react-bootstrap';
import usePengadaanStore, {selectFalsePengadaan, selectFetchPengadaan} from '../../store/DataPengadaan';


import { FileBarang } from '../../datafile/FileSelect';
import { LoadingPage } from '../../LoadingPage/LoadingPage';
import useDataMaterial, { selectMaterial } from '../../store/DataMaterial';
import { API_AUTH } from '../../apis/apisData';

export const VerifyPengadaan = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userData = useAuthStore(selectUser);
  const material = useDataMaterial(selectMaterial);
  const fetchPengadaan = usePengadaanStore(selectFetchPengadaan);
  const pengadaanFalse = usePengadaanStore(selectFalsePengadaan);
  
  const [kode, setKode] = useState('');
  const [tgl, setTgl] = useState('');
  const [status, setStatus] = useState('');
  const [ tibar, setTibar ] = useState('');
  const [ materil, setMateril ] = useState('');

  const [ satuan, setSatuan ] = useState('');
  const [ spesifikasi, setSpesifikasi ] = useState('');

  const [tipeMaterial, setTipeMaterial] = useState('');
  const [brand, setBrand] = useState('');
  const [mesin, setMesin] = useState('');
  
  const [fileNab, setFileNab] = useState(FileBarang);
  const [fileBar, setFileBar] = useState(FileBarang);
  const [fileMaterial, setFileMaterial] = useState(FileBarang);
  const [inputList, setInputList] = useState([{ tglDatang: '', qty: '', expro: '', po: '', noAkun: '' }]);
  
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [coa, setCoa] = useState(false);
  const [msds, setMsds] = useState(false);
  const [halal, setHalal] = useState(false);
  const [copyPO, setCopyPO] = useState(false);
  const [health, setHealth] = useState(false);
  const [kh, setKh] = useState(false);
  const [foodGra, setFoodGra] = useState(false);

  useEffect(() => {
    const result = material.material?.reduce((unique, o) => {
        if(!unique.some(obj => obj.kategori === o.kategori)) {
          unique.push({
            value :o.kategori,
            label :o.kategori,
            kategori :o.kategori,
            labelId :o.categoryid,
          });
        }
        return unique;
    },[]);
    setFileNab(result);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setIsLoading(true);
    if(location.state === null) {
        navigate(`/form/pengadaan`);
        Swal.fire('Info','Harap kembali ke halaman permintaan data tidak lengkap', 'info')
    }
    else{
        cekData();
        const data = location.state.data;
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
    const data = location.state.data
    const result = material.material?.reduce((unique, o) => {
        if(!unique.some(obj => obj.kategori === o.kategori)) {
          unique.push({
            value :o.kategori,
            label :o.kategori,
            kategori :o.kategori,
            labelId :o.categoryid,
          });
        }
        return unique;
    },[]);
    const filTipe = result.filter(x => x.value.toUpperCase() === String(data?.material[0].tipe).toUpperCase());
    const newFileNab = material.material?.filter(x => x.kategori.toUpperCase() === String(data?.material[0].tipe).toUpperCase());
    let modifiedArr = newFileNab.map(function(element){
        return { value: element.itemno, label: `${element.itemno} - ${element.itemdescription}`, item: element.itemdescription , satuan: element.unit1 };
    });
    const filMate = modifiedArr.filter(x => x.value.toUpperCase() === String(data?.material[0].itemNo).toUpperCase());
    setFileBar(modifiedArr);
    setKode(data?.id_Pengadaan);
    setMateril(data?.material[0].material);
    setSpesifikasi(data?.spesifikasi);
    setStatus(data?.status);
    setFileMaterial(filMate[0])
    setInputList(data?.parsial_data);
    setTibar({value: filTipe[0]?.value, label: filTipe[0]?.label, kategori: filTipe[0]?.kategori, labelId: filTipe[0]?.labelId});
    setSatuan(data?.qty_pengadaan[0].satuan);
    setTgl(data?.t_pengadaan)
    setBrand(data?.brandMaterial)
    setMesin(data?.mesin)
    setTipeMaterial(data?.tipeMaterial)
    setIsLoading(false);
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    setValidated(true);
    const form = e.currentTarget;
    console.log(form.checkValidity());
    Swal.fire({
        title: 'Apakah anda ingin memverifikasi pengadaan?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Simpan',
        denyButtonText: `Revisi`,
      }).then((result) => {
        if (result.isConfirmed) {
            handleSave('Verifikasi','');
        } else if (result.isDenied) {
            Swal.fire({
                text: "Masukan keterangan revisi",
                icon: 'warning',
                input: 'textarea',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Simpan',
                cancelButtonText: 'Batal',
            }).then((results) => {
                if (results.isConfirmed) {
                if(results.value === ""){
                    Swal.fire('Harap input keterangan revisi','','info');
                }
                else{
                  handleSave('Revisi',results.value);
                }
                }
            })
        }
      })
  }

  const handleSave =async (stat,rev) =>{
    setIsLoading(true);
    try {
      await pengadaanFalse();
      const date = new Date();
      let mm = parseInt(date.getMonth()) + 1;
      let yy = date.getFullYear();
      let dd = date.getDate();
      let bulan = String(mm).padStart(2, '0');
      let tang = String(dd).padStart(2, '0');
      /* console.log({
          id_Pengadaan : location.state.data.id_Pengadaan,
          status : stat,
          tgl_verify : `${yy}-${bulan}-${tang}`,
          tgl_approve : rev,
      }) */
      const next = await API_AUTH.put(`/verifyPengadaan`, {
        id_Pengadaan : location.state.data.id_Pengadaan,
        status : stat,
        tgl_verify : `${yy}-${bulan}-${tang}`,
        tgl_approve : rev,
      });

      await fetchPengadaan(`${yy}-${bulan}`, userData.uplan);
      
      Swal.fire(`${next.data.success}`, navigate(`/form/pengadaan`), 'success');
      // Swal.fire(navigate(`/form/pengadaan`), navigate(0), 'success');
      setIsLoading(false);
  } catch (error) {
      Swal.fire('Info', `${error.response.data.message}`, 'warning');
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
            <Breadcrumb.Item active>Verifikasi Data</Breadcrumb.Item>
            </Breadcrumb>
          </div>

          <Container fluid>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <div className='row  g-2  mb-1'>
                <div className='col-sm-4	col-md-4	col-lg-2	col-xl-2 mb-1'>
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
                        <Form.Label>Status Pengadaan</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          placeholder="Status Pengadaan"
                          className='btn btn-danger'
                          value={status}
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
                          value={kode}
                          disabled = {true}
                        />
                      </Form.Group>
  
                      <Form.Group as={Col} controlId="validationCustom01">
                        <Form.Label>Tgl Pengadaan</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          placeholder="Tgl Pengadaan"
                          value={tgl}
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
                </div>
                  
                <div className='col-sm-8	col-md-8	col-lg-8	col-xl-8 mb-1'>
                  <Card className='mb-3' bg='white'>
                    <Card.Body>
                      <div className="row  g-2 ">
                        <div className='col-sm-12 col-md-4 col-lg-4 col-xl-4'>
                        <Form.Group as={Col} controlId="validationCustom01">
                          <Form.Label>Jenis Material</Form.Label>
                          <Select 
                              required
                              value={tibar}
                              options = {fileNab}
                              isSearchable = {false}
                              isDisabled
                          />
                        </Form.Group>
                        </div>
                        <div className='col-sm-12 col-md-8 col-lg-8 col-xl-8'>
                          <Form.Group as={Col} controlId="validationCustom01">
                            <Form.Label>Item</Form.Label>
                            <Select 
                              required
                              value={fileMaterial}
                              options = {fileBar}
                              isSearchable = {true}
                              isDisabled
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
                              value = {materil}
                              required
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
                            value = {tipeMaterial}
                            onChange = {e => setTipeMaterial(e.target.value)}
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
                          value = {brand}
                          disabled
                          
                        />
                        <Form.Control.Feedback type="invalid">
                          Harap Masukan Nama Merk/Brand
                        </Form.Control.Feedback>
                      </Form.Group>
                    </div>
                    <div className='col-sm-12 col-md-4 col-lg-4 col-xl-4'>
                      <Form.Group as={Col} controlId="validationCustom01">
                        <Form.Label>Kegunaan</Form.Label>
                        <Form.Control 
                          as="textarea" 
                          aria-label="With textarea" 
                          rows={1}
                          value = {mesin}
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
                            value={spesifikasi}
                            aria-label="With textarea" 
                            placeholder='Harap isikan merk, ukuran, dan data yang lengkap'
                            required
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
                          return(
                          <div className="row  g-2 ">
                              <h6>Parsial Ke-{i+1}</h6>
                              <div className='col-sm-12 col-md-4 col-lg4 col-xl-4'>
                              <Form.Group as={Col} controlId="validationCustom01">
                                  <Form.Label>Tanggal Kirim</Form.Label>
                                  <Form.Control
                                  required
                                  name="tglDatang"
                                  type="date"
                                  placeholder="Tanggal Kirim"
                                  value={x.tglDatang}
                                  disabled
                                  />
                              </Form.Group>
                              </div>
                              
                              <div className='col-sm-12 col-md-4 col-lg-4 col-xl-4'>
                              <Form.Group as={Col} controlId="validationCustom01">
                                  <Form.Label>Qty</Form.Label>
                                  <InputGroup className="mb-3">
                                  <NumericFormat 
                                      name="qty"
                                      customInput={Form.Control}
                                      thousandSeparator={true}
                                      value={x.qty}
                                      disabled
                                      
                                  />
                                  <InputGroup.Text id="basic-addon2">{satuan}</InputGroup.Text>
                                  </InputGroup>
                              </Form.Group>
                              </div>
  
                              <div className='col-sm-12 col-md-4 col-lg-4 col-xl-4'>
                              <Form.Group as={Col} controlId="validationCustom01">
                                  <Form.Label>Tanggal Kirim</Form.Label>
                                  <Form.Control
                                  required
                                  name="po"
                                  type="text"
                                  placeholder="No. PO"
                                  value={x.po}
                                  disabled
                                  />
                              </Form.Group>
                              </div>
                          </div>
                          )
                      })}
                      </Accordion.Body>
                      </Accordion.Item>
                  </Accordion>
                </div>

                <div className='col-sm-12	col-md-12	col-lg-2	col-xl-2 mb-5'>
                  <div className='d-flex align-items-end flex-column'>
                    <div className='d-flex align-items-end flex-wrap'>
                      <div className='row p-2'>
                        <Button 
                          type="submit" 
                          variant="outline-primary m-2" 
                          className='col-sm-12 col-md-12 col-lg-12 col-xl-12'
                        >
                          Verifikasi Data
                        </Button>

                        <Button 
                          variant="outline-danger m-2" 
                          className='col-sm-12 col-md-12 col-lg-12 col-xl-12'
                          onClick={() => navigate(`/form/pengadaan`)}
                        >
                          Batal
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
