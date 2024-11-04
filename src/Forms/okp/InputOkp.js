import React, { useEffect, useState } from 'react';
import Swal from "sweetalert2";
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import { useLocation, useNavigate } from 'react-router-dom';
import { Breadcrumb, Button, Card, Col, Container, Form, Tab, Tabs } from 'react-bootstrap';


import { LoadingPage } from '../../LoadingPage/LoadingPage';

export const InputOkp = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [okp, setOkp] = useState('');
    const [tglOkp, setTglOkp] = useState('');
    const [tglProd, setTglProd] = useState('');
    const [tglRevisi, setTglRevisi] = useState('');
    const [revisi, setRevisi] = useState('');
    const [no, setNo] = useState('');
    const [panjangNote, setPanjangNote] = useState('');
    const [id, setId] = useState('');
    const [produk, setProduk] = useState([]);
    const [varian, setVarian] = useState('');
    // const [revisiProd, setRevisiProd] = useState('');
    
    const [revisiProd, setRevisiProd] = useState([]);
    const [batch, setBatch] = useState(0);
    const [selectItem, setSelectItem] = useState([]);
    const [selectItemRev, setSelectItemRev] = useState([]);

    const [noProduk, setNoProduk] = useState('');
    const [noteData, setNoteData] = useState('');

    const [isTrue, setIsTrue] = useState(true);
    const [validated, setValidated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        if(location.state === null) {
            navigate(`/form/pengadaan`);
            Swal.fire('Info','Harap kembali ke halaman permintaan data tidak lengkap', 'info')
        }
        else{
            cekData();
            // const data = location.state.data;
            setOkp(location.state.okp);
            setTglOkp(location.state.selectTgl);
            setTglProd(location.state.produksi);
            setRevisi(location.state.revisiOK);
            setTglRevisi(location.state.tglRevisi);
            let nomb = location.state.nomer ;
            setPanjangNote(location.state.noteLength);
            setNo(parseInt(nomb))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const cekData = () =>{
        setIsLoading(false)
    }

    const handleSelectChange = (e) => {
        const item = []
        // const item = dataBom.filter(x => x.deskripsi_item.toUpperCase() === e.value.toUpperCase())
        // console.log(item)
        const idTang = tglOkp.split(" ");
        let tgl ="";
        let bln ="";
        let nos = "";

        if(parseInt(no) < 10){
            nos = "0"+no;
        }
        else{
            nos = no
        }
        if(parseInt(idTang[0]) < 10){
            tgl ="0"+parseInt(idTang[0]);
        }
        else{
            tgl = parseInt(idTang[0]);
        }

        /* for(let x =0;x<monthNames.length;x++){
            if(idTang[1] === monthNames[x]){
                let xyz = x+1;
                bln = String(xyz).padStart(2, '0');
            }else{}
        } */

        const th = idTang[2].substring(2);
        const kose = "OKP"+item[0]?.id_item+th+bln+tgl+nos;

        setId(kose);
        // setRevisiProd(item[0]?.revisi);
        setVarian(item[0]?.varian);
        // console.log(item)
        setSelectItemRev([])
        let modifiedArr = item.map(function(element){
            return { value: element.revisi, label: element.revisi };
        });
        // console.log(modifiedArr)
        setSelectItemRev(modifiedArr)
        setRevisiProd(modifiedArr[0])
        setIsTrue(false)
    };  

    const handleSubmit = (e) =>{
        e.preventDefault()
        savePermintaan()
    }

    const savePermintaan = async (tglOK) =>{
        const item = [];
        // const item = dataBom.filter(x => x.deskripsi_item.toUpperCase() === produk.value.toUpperCase());
        // console.log(item[0]?.list_material.length);
        if(item.length === 0){
            Swal.fire("Info","Harap ulangi proses penyimpanan data","info");
        }
        else{
            setIsLoading(true)
            let tData = item[0]?.list_material.length;
            // let asli = [];
            for(let x  = 0 ; x <tData ; x++) {
                /* let ihaon = ""
                let qtyPermint = [{ jmlEstimasi: "0", JmlPermintaan: "0", JmlPengeluaran: "0" }];
                let waktu = [{jamPermintaan: "", jamVerify: "", jamPengiriman: ""}];
                if(item[0]?.revisi.toUpperCase() === revisiProd?.value.toUpperCase()){
                    let totalQty = parseFloat(item[0]?.list_material[x].qty) * batch; 
                    parseFloat(totalQty).toFixed(2);
                    qtyPermint = [{ jmlEstimasi: String(totalQty), JmlPermintaan: "0", JmlPengeluaran: "0" }];
                    ihaon = String(totalQty);
                }
                else{
                    qtyPermint = [{ jmlEstimasi: "0", JmlPermintaan: "0", JmlPengeluaran: "0" }];
                } */
                
                try {
                    /* const next = await API_AUTH.put(`/permintaan`, {
                        'okp': okp,
                        'tokp' : tglOK, 
                        'nama_item' : item[0]?.list_material[x].material,
                        'jml_item' : qtyPermint,
                        'satuan' : item[0]?.list_material[x].satuan,
                        "status_item" : "",
                        "pemohon" : "",
                        "pemverifikasi" : "",
                        "pengirim" : "",
                        "list_data" : [],
                        "tipe" : item[0]?.list_material[x].tipe,
                        "waktu" : waktu,
                        "plan": userData.user_plan,
                    });
                    asli.push({
                        'nama_item' : item[0]?.list_material[x].material,
                        'jml_item' : String(ihaon),
                    }) */
                } catch (error) {
                    console.log(`error.message`)
                }
            }
            // Swal.fire('Saved!', backhome(`/main/${userData.user_divisi}/OKP`), 'success');
            setIsLoading(false)
        }

    }

    const saveNote = async (e) =>{
        const form = e.currentTarget;
        e.preventDefault();
        if (form.checkValidity() === false) {
          e.preventDefault();
          e.stopPropagation();
          setValidated(true);
        }
        setSelectItem([])
        /* const splitOkp = tglOkp.split(" ");
        const splitProd = tglProd.split(" ");
        let tglOK = "";
        let tglPro = "";
        let bOkp = "";
        let bProd = ""; */

        /* for(let x =0;x<monthNames.length;x++){
            if(splitOkp[1] === monthNames[x]){
                let xyz = x+1;
                bOkp = String(xyz).padStart(2, '0');
            }else{}
            if(splitProd[1] === monthNames[x]){
                let xyz = x+1;
                bProd = String(xyz).padStart(2, '0');
            }else{}
        } */
        
        // tglOK = splitOkp[2]+'/'+bOkp+'/'+splitOkp[0];
        // tglPro = splitProd[2]+'/'+bProd+'/'+splitProd[0];

        let resNo = "";
        let resNote = "";
        resNo = noProduk.replace(/&/g, "kodeDan");
        resNo = resNo.replace(/!/g, "kodeSeru");
        resNo = resNo.replace(/#/g, "kodePagar");
        resNo = resNo.replace(/@/g, "kodeAdd");
        resNo = resNo.replace(/%/g, "kodePersen");
        resNo = resNo.replace(/,/g, "kodeKoma");
        
        resNote =  noteData.replace(/&/g, "kodeDan");
        resNote = resNote.replace(/!/g, "kodeSeru");
        resNote = resNote.replace(/#/g, "kodePagar");
        resNote = resNote.replace(/@/g, "kodeAdd");
        resNote = resNote.replace(/%/g, "kodePersen");
        resNote = resNote.replace(/,/g, "kodeKoma");
        console.log(`${resNo}&${resNote}`)
        if(panjangNote > 7){
            Swal.fire("Info","Limit pengisian note pada okp sudah mencapai batas","info")
        }
        else{
            /* if(resNote === "" || resNote === null || resNote === undefined){
                Swal.fire('Info','Harap isi keterangan note','warning')
            }
            else{
                setIsLoading(true);
                // await falseNoteOkp();
                // await fetchNoteOKP(tglOK,tglPro,revisi,resNo,resNote,"","");
                // const next = await API_GSHEET.get(`exec?tipe=saveNoteOKP&date=${tglPro}&tOkp=${tglOK}&rev=${revisi}&no=${resNo}&note=${resNote}&noLama&noteLama&sheet&tRev`);
                // Swal.fire('Saved!', backhome(`/main/${userData.user_divisi}/OKP`), 'success');
                setIsLoading(false);
            } */
        }
        
    }

    

    return (
        <>
        <div className='setContain'>
            <div className="bg-body">
                <Breadcrumb className='bg-body'>
                    <Breadcrumb.Item onClick={() =>navigate(`/form`)}>Form</Breadcrumb.Item>
                    <Breadcrumb.Item onClick={() => navigate(`/form/okp`)}>Table OKP</Breadcrumb.Item>
                    <Breadcrumb.Item active>Create</Breadcrumb.Item>
                </Breadcrumb>
            </div>

            <Container fluid>
                <div className="row mt-3">
                    <div className='col-lg-4'>
                        <Card className='mb-4'>
                            <Card.Body>
                                <h3 class="h6">No. OKP</h3>
                                <h6>{okp}</h6>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col-md-8">
                        <Card className='mb-1'>
                            <div className="row p-2">
                                <div className='col-lg-6'>
                                    <Form.Group as={Col} controlId="validationCustom01">
                                        <Form.Label>Tgl OKP</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            value={tglOkp}
                                            disabled
                                        />
                                    </Form.Group>
                                </div>

                                <div className='col-lg-6'>
                                    <Form.Group as={Col} controlId="validationCustom02">
                                        <Form.Label>Tgl Produksi</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            value={tglProd}
                                            disabled
                                        />
                                        <Form.Control.Feedback type="invalid">Harap Input Nama karyawan</Form.Control.Feedback>
                                    </Form.Group>
                                </div>
                            </div>
                            <div className="row p-2">
                                <div className='col-lg-6'>
                                    <Form.Group as={Col} controlId="validationCustom01">
                                        <Form.Label>Tgl Revisi</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            value={tglRevisi}
                                            disabled
                                        />
                                    </Form.Group>
                                </div>

                                <div className='col-lg-6 mb-1'>
                                    <Form.Group as={Col} controlId="validationCustom02">
                                        <Form.Label>Revisi</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            value={revisi}
                                            disabled
                                        />
                                    </Form.Group>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>

                <Tabs
            defaultActiveKey="home"
            transition={true}
            className="mb-3"
        >
            <Tab eventKey="home" title="OKP">
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-6 mb-1">
                        <Card className='mb-1'>
                            <div className="row p-2">
                                <Form.Group as={Col} controlId="validationCustom01">
                                    <Form.Label>No OKP</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={no}
                                        disabled
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">ID OKP tidak terbaca harap ulangi proses</Form.Control.Feedback>
                                </Form.Group>
                            </div>
                            <div className="row p-2">
                                <Form.Group as={Col} controlId="validationCustom01">
                                    <Form.Label>Produk</Form.Label>
                                    <Select
                                        title={"produk"}
                                        name={"produk"}
                                        value={produk}
                                        options={selectItem}
                                        onChange={(e) => {
                                            setProduk(e)
                                            handleSelectChange(e)
                                        }}
                                    />
                                </Form.Group>
                            </div>
                            <div className="row p-2">
                                <Form.Group as={Col} controlId="validationCustom01">
                                    <Form.Label>Kode</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={id}
                                        disabled
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">Kode produk tidak terbaca harap ulangi proses pilih produk</Form.Control.Feedback>
                                </Form.Group>
                            </div>
                            <div className="row p-2">
                                <Form.Group as={Col} controlId="validationCustom01">
                                    <Form.Label>Varian</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={varian}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">varian produk tidak terbaca harap ulangi proses pilih produk</Form.Control.Feedback>
                                </Form.Group>
                            </div>
                        </Card>
                    </div>
                    <div className="col-md-6 mb-5">
                        <Card className='mb-1'>
                            <div className="row p-2">
                                <Form.Group as={Col} controlId="validationCustom01">
                                    <Form.Label>Revisi</Form.Label>
                                    <CreatableSelect 
                                        value={revisiProd}
                                        options={selectItemRev}
                                        onChange={(e) => {
                                            setRevisiProd(e)
                                            // handleSelectChange(e)
                                        }}
                                        isDisabled={isTrue}
                                        isClearable 
                                    />
                                </Form.Group>
                            </div>
                            <div className="row p-2">
                                <Form.Group as={Col} controlId="validationCustom01">
                                    <Form.Label>Jumlah(Batch)</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={batch}
                                        onChange={(e) =>setBatch(e.target.value)}
                                    />
                                    <Form.Control.Feedback type="invalid">Harap Input Qty Batch</Form.Control.Feedback>
                                </Form.Group>
                            </div>

                            <div className="row p-2">
                                <div className='col-lg-2'></div>
                                <div className='col-lg-10 mb-1'>
                                    
                                </div>
                            </div>
                        </Card>
                        <Button type="submit" className='mt-1'><i class="bi bi-send"></i>&nbsp;Submit</Button>
                    </div>
                </div>
                
                
            </Form>
            </Tab>

            <Tab eventKey="profile" title="Note">
                <Form noValidate onSubmit={saveNote}>
                    <div className="row">
                        <div className="col-md-6">
                            <Card className='mb-1'>
                                <div className="row p-2">
                                    <Form.Group as={Col} controlId="validationCustom01">
                                        <Form.Label>No Produk</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            onChange={(e) =>setNoProduk(e.target.value)}
                                        />
                                    </Form.Group>
                                </div>
                                <div className="row p-2">
                                <Form.Group as={Col} controlId="validationCustom01">
                                    <Form.Label>Note</Form.Label>
                                    <Form.Control
                                        required
                                        as="textarea" 
                                        aria-label="With textarea" 
                                        rows={5}
                                        onChange={(e) =>setNoteData(e.target.value)}
                                    />
                                </Form.Group>
                                </div>
                            </Card>
                        </div>
                        <div className="col-md-6">
                            <Button type="submit" className='mt-1'><i class="bi bi-send"></i>&nbsp;Submit</Button>
                        </div>
                    </div>
                </Form>
            </Tab>

        </Tabs>
            </Container>
        </div>
        
        {isLoading ? <LoadingPage /> : ""}
        </>
    )
}
