import React, { useEffect, useState } from 'react';
import Swal from "sweetalert2";
import Select from 'react-select';
import { NumericFormat } from 'react-number-format';
import { Breadcrumb, Button, Card, Col, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { LoadingPage } from '../../LoadingPage/LoadingPage';
import useAuthStore, { selectUser } from '../../store/DataUser';
import { FileBarang, FileDivisi, FileLevel, FilePlan } from '../../datafile/FileSelect';
import { API_AUTH } from '../../apis/apisData';

export const InputKaryawan = () => {
    const navigate = useNavigate();
    const userData = useAuthStore(selectUser);

    const [nik, setNik] = useState("");
    const [nama, setNama] = useState("");
    const [level, setLevel] = useState(0);
    const [fileJbtn, setFileJbtn] = useState(FileBarang);
    const [fileDiv, setfileDiv] = useState(FileBarang);
    const [selectedValue, setSelectedValue] = useState();
    const [divisi, setDivisi] = useState("");
    const [subDiv, setSubDiv] = useState();
    const [plan, setPlan] = useState("");
    const [cutTah, setCutTah] = useState(0);
    const [cutBes, setCutBes] = useState(0);
    
    const [picture, setPicture] = useState('https://bootdey.com/img/Content/avatar/avatar7.png');

    const [isLoading, setIsLoading] = useState(false);
    const [dataReady, setDataReady] = useState(false);
    const [jbtnReady, setjbtnReady] = useState(true);
    const [fileReady, setFileReady] = useState(false);
    const [divReady, setDivReady] = useState(true);
    
    useEffect (() => {
        if(!dataReady) return;
        const gntiDta = async () =>{
          try {
            setIsLoading(true);
            setSelectedValue(null)
            if(level === null){
                setFileJbtn([
                    { value: '', label: '' }
                ])
                setjbtnReady(true);
            }
            else{
                setFileJbtn([
                    { value: '', label: '' }
                ])
                let modifiedArr = level.jabatan.map(function(element){
                    return { value: element.val, label: element.lab};
                });
                setFileJbtn(modifiedArr);
                setjbtnReady(false);
            }
            
            
            setIsLoading(false);
          } catch (error) {
              setIsLoading(false);
              Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Pengambilan Data Pengadaan Gagal!',
              footer: error
              })
          }
          setDataReady(false);
        } 
    
        gntiDta();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[dataReady]);

    useEffect (() => {
        if(!fileReady) return;
        const gntiDta = async () =>{
            try {
                setIsLoading(true);
                setSubDiv(null)
                if(divisi === null){
                    setfileDiv([
                        { value: '', label: '' }
                    ])
                    setDivReady(true);
                }
                else{
                    setfileDiv([
                        { value: '', label: '' }
                    ])
                    let modifiedArr = divisi.subDiv.map(function(element){
                        return { value: element.valu, label: element.lab};
                    });
                    setfileDiv(modifiedArr);
                    setDivReady(false);
                }
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Pengambilan Data Pengadaan Gagal!',
                footer: error
                })
            }
            setFileReady(false);
        } 
    
        gntiDta();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[fileReady]);

    const handleSubmit =async (e) =>{
        e.preventDefault();
        setIsLoading(true)
        setPicture('https://bootdey.com/img/Content/avatar/avatar7.png')
        if(userData.udivisi === "Develop" || userData.udivisi === "HR-GA" ){
            if(nik === ""){
                Swal.fire(`Oppsss...`, `Harap ulangi input nik karyawan`, 'info');
                setIsLoading(false);
            }
            else{
                handleSave()
            }
            
        }
        else{
            Swal.fire('oppss','Anda tidak memiliki akses','info')
        }
        
    }

    const handleSave = async () =>{  
        try {
            const next = await API_AUTH.post(`/register`, 
                {
                    "id" : nik,
                    "name" : nama,
                    "divisi" : divisi.value,
                    "subdivisi" : subDiv.value,
                    "jabatan" : selectedValue.value,
                    "level" : level.value,
                    "plan" : plan.value,
                    "img" : picture,
                    "password" : "dagsap123",
                    "confPassword" : "dagsap123"
                }
            )
            Swal.fire(`${next.data.success}`, navigate(`/form/karyawan`), 'success');
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            Swal.fire('Opsss',`${error.response.data.message}`,'error');
            setNik('')
            console.log(`error.response.data.message`);
        }
    }
  return (
    <>
    <div className='setContain'>
        <div className='p-2'>
            <Breadcrumb>
            <Breadcrumb.Item onClick={() =>navigate(`/form`)}>Form</Breadcrumb.Item>
            <Breadcrumb.Item onClick={() => navigate(`/form/karyawan`)}>Karyawan</Breadcrumb.Item>
            <Breadcrumb.Item active>Create</Breadcrumb.Item>
            </Breadcrumb>
        </div>
        <Container className='mt-1' fluid>
        {/*  noValidate validated={validated} onSubmit={handleSubmit} */}
            <Form onSubmit={handleSubmit}>
                <div className="row g-3">
                    <div className='col-12 col-sm-12 col-md-3 col-xl-3 col-lg-3'>
                        <Card className='mb-0' bg='white'>
                            <Card.Body>
                                <h3 class="h6">Avatar</h3>
                                <div className="d-flex flex-column align-items-center text-center">
                                    <img src={picture} alt="Admin" className="rounded-circle" style={{width :200, height:200 }} />
                                    
                                    {/* <div class="row mt-3 ms-5">
                                        <div class="col-lg-6">
                                            <div className="d-flex text-end">
                                                <div className="hstack gap-4">
                                                    <input
                                                    type="file"
                                                    name="file-input"
                                                    id="file-input"
                                                    className="file-input__input"
                                                    // onChange={event =>handleImageUpload(event)}
                                                    />
                                                    <label class="file-input__label" for="file-input">
                                                        <svg 
                                                            aria-hidden="true"
                                                            focusable="false"
                                                            data-prefix="fas"
                                                            data-icon="upload"
                                                            role="img"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="currentColor"
                                                            className="bi bi-plus-circle"
                                                            viewBox="0 0 16 16"
                                                        >
                                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                                        </svg>
                                                    </label>
                                                    <Button 
                                                        className="btn btn-danger btn-sm btn-icon-text" 
                                                        // onClick={event =>handleCancleImageUpload(event)}
                                                    >
                                                        <i className="bi bi-backspace-reverse"></i> 
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
                                </div>
                            </Card.Body>
                        </Card>
                    </div>

                    <div className='col-12 col-sm-12 col-md-3 col-xl-7 col-lg-7'>
                        <h3 className="h4 mb-2">Buat Data Baru</h3>
                        <Card className='mb-3' bg='white'>
                            <Card.Body>
                                <div className="row g-3">
                                    <div className='col-lg-6'>
                                        <Form.Group as={Col} controlId="validationCustom01">
                                            <Form.Label>NIK</Form.Label>
                                            <Form.Control
                                                required
                                                type="text"
                                                value={nik}
                                                onChange={ (e) =>{
                                                    const nilai = e.target.value.toUpperCase();
                                                    setNik(nilai)
                                                } }
                                            />
                                            <Form.Control.Feedback type="invalid">Harap Input NIK</Form.Control.Feedback>
                                        </Form.Group>
                                    </div>

                                    <div className='col-lg-6'>
                                        <Form.Group as={Col} controlId="validationCustom02">
                                            <Form.Label>Nama</Form.Label>
                                            <Form.Control
                                                required
                                                type="text"
                                                onChange={ (e) => setNama(e.target.value) }
                                            />
                                            <Form.Control.Feedback type="invalid">Harap Input Nama karyawan</Form.Control.Feedback>
                                        </Form.Group>
                                    </div>
                                </div>

                                <div className="row g-3">
                                    <div className='col-lg-6'>
                                        <Form.Group as={Col} controlId="validationCustom02">
                                            <Form.Label>Level</Form.Label>
                                            <Select 
                                                required
                                                onChange={(value) => {
                                                    setLevel(value)
                                                    setDataReady(true)
                                                }}
                                                options = {FileLevel}
                                                isSearchable = {false}
                                                isClearable = {true}
                                            />
                                        </Form.Group>
                                    </div>
                                    <div className='col-lg-6'>
                                        <Form.Group as={Col} controlId="validationCustom01">
                                            <Form.Label>Jabatan</Form.Label>
                                            <Select
                                                required
                                                className="basic-single"
                                                classNamePrefix="select"
                                                value={selectedValue}
                                                isClearable={true}
                                                isSearchable={true}
                                                isDisabled={jbtnReady}
                                                name="selectValue"
                                                options={fileJbtn}
                                                onChange={(value) => {
                                                    setSelectedValue(value)
                                                    }
                                                }
                                            />
                                        </Form.Group>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                        <Card className='mb-3' bg='white'>
                            <Card.Body>
                                <div className="row g-3">
                                    <div className='col-xl-4 col-lg-4'>
                                        <Form.Group as={Col} controlId="validationCustom02">
                                            <Form.Label>Divisi</Form.Label>
                                            <Select 
                                                required
                                                value={divisi}
                                                onChange={(value) => {
                                                    setDivisi(value)
                                                    setFileReady(true)
                                                }}
                                                options = {FileDivisi}
                                                isSearchable = {true}
                                                isClearable = {true}
                                            />
                                        </Form.Group>
                                    </div>

                                    <div className='col-xl-4 col-lg-4'>
                                        <Form.Group as={Col} controlId="validationCustom02">
                                            <Form.Label>SubDivisi</Form.Label>
                                            <Select
                                                required
                                                className="basic-single"
                                                classNamePrefix="select"
                                                value={subDiv}
                                                isClearable={true}
                                                isSearchable={true}
                                                isDisabled={divReady}
                                                name="subDiv"
                                                options={fileDiv}
                                                onChange={(value) => {
                                                // setFileReady(true)
                                                setSubDiv(value)}}
                                            />
                                        </Form.Group>
                                    </div>

                                    <div className='col-xl-4 col-lg-4'>
                                        <Form.Group as={Col} controlId="validationCustom01">
                                            <Form.Label>Plan</Form.Label>
                                            <Select 
                                                required
                                                onChange={(value) => {
                                                    setPlan(value)
                                                }}
                                                value={plan}
                                                options = {FilePlan}
                                                isSearchable = {true}
                                                isClearable = {true}
                                            />
                                        </Form.Group>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                        <Card bg='white'>
                            <Card.Body>
                                <div className="row g-3">
                                    <div className='col-lg-6'>
                                        <Form.Group as={Col} controlId="validationCustom01">
                                            <Form.Label>Cuti Tahunan</Form.Label>
                                            <NumericFormat 
                                                customInput={Form.Control}
                                                thousandSeparator={true}
                                                value={cutTah}
                                                style={{ textAlign: 'right' }}
                                                onValueChange ={e => {
                                                    setCutTah(e.value)
                                                }}
                                            />
                                        </Form.Group>
                                    </div>

                                    <div className='col-lg-6'>
                                        <Form.Group as={Col} controlId="validationCustom02">
                                            <Form.Label>Cuti Besar</Form.Label>
                                            <NumericFormat 
                                                customInput={Form.Control}
                                                thousandSeparator={true}
                                                value={cutBes}
                                                style={{ textAlign: 'right' }}
                                                onValueChange ={e => {
                                                    setCutBes(e.value)
                                                }}
                                            />
                                        </Form.Group>
                                    </div>

                                </div>
                            </Card.Body>
                            
                        </Card>
                        
                    </div>

                    <div className='col-12 col-sm-12 col-md-3 col-xl-2 col-lg-2 text-center'>
                        <Button type="submit" className='w-100 mt-4' variant="outline-primary">
                            <i className="bi bi-send-fill"></i>&nbsp;Simpan
                        </Button>
                        <Button 
                            onClick={(e) => navigate('/form/karyawan')}
                            className='w-100 mt-2 mb-5' variant="outline-danger"
                        >
                            <i className="bi bi-backspace-fill"></i>&nbsp;Batal
                        </Button>
                    </div>
                    
                </div>
                
                
            </Form>
        </Container>
    </div>
    {isLoading ? <LoadingPage/> : ""}
    </>
  )
}
