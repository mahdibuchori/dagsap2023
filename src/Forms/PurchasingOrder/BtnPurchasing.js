import React, { useEffect, useState } from 'react';
// import Swal from "sweetalert2";
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import useAuthStore, { selectUser } from '../../store/DataUser';
import { API_AUTH } from '../../apis/apisData';

export const BtnPurchasing = (props) => {
    const navigate = useNavigate();
    const userData = useAuthStore(selectUser);
    // const [cekList, setCekList] = useState('none');
    // const [cekPrint, setcekPrint] = useState('none');
    // const [cekEdit, setCekEdit] = useState('block');
    // const [cekVerified, setCekVerified] = useState('block');

    const [clikUpdate, setclikUpdate] = useState('none');
    const [clickPrint, setclickPrint] = useState('none');
    const [clickReload, setclickReload] = useState('none');
    const [clickVery, setclickVery] = useState('none');
    // const [clickDelete, setClickDelete] = useState('none');
    const [clickView, setclickView] = useState('block');
    
    let data = props.data.status;
    let fina = props.data.statusfina;

    useEffect(() => {
        const handleLogout =async (e) =>{
            try {
                if(userData === undefined){
                    await API_AUTH.delete("/logout");
                    navigate('/login');
                }
            } catch (error) {
                console.log(error)
            }
        }
        handleLogout()
        
       // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    /* setclikUpdate('none')
    setclickPrint('none')
    setclickReload('none')
    setclickVery('none')
    setclickView('block') */

    /* useEffect(() => {
        const coba = () =>{
            if (data ==='Pengajuan' && fina === "") {
                setCekList('none');
                setCekEdit('block');
                setCekVerified('block');
            }
            else if (data ==='Pengajuan' && fina === "Upload") {
                setCekList('none');
                setCekEdit('block');
                setCekVerified('block')
            }
            else if (data ==='Verifikasi' && fina === "") {
                setCekList('none');
                setCekEdit('none');
                setCekVerified('block')
            }
            else if (data ==='Verifikasi' && fina === "Upload") {
                setCekList('none');
                setCekEdit('none');
                setCekVerified('block');
            }
            else if (data ==='Selesai' && fina === "") {
                setCekList('block');
                setCekEdit('none');  
                setCekVerified('none')    
            }
            else if (data ==='Selesai' && fina === "Upload") {
                setCekList('none');
                setCekEdit('none');   
                setCekVerified('none')  
            }
            else if (data ==='Revisi' && fina === "") {
                setCekList('none');
                setCekEdit('block');
                setCekVerified('none')
            }
            else if (data ==='Revisi' && fina === "Upload") {
                setCekList('none');
                setCekEdit('block');
                setCekVerified('none')
            }
            else {
                setCekList('none');
                setCekEdit('block');
                setCekVerified('none')
            }

            if(data === "Selesai" || data === "Verifikasi"){
                setcekPrint('block')
            }
            else{
                setcekPrint('none')
            }
        }
       coba(); 
       // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); */
    useEffect(() => {
        const coba = () =>{
            // console.log(userData)
            if (data ==='Pengajuan' && fina === "") {
                if(userData?.usubdiv === "Purchasing"){
                    if(userData?.ulevel === 3){
                        setclikUpdate('block');
                        // setClickDelete('block');
                    }
                    else{
                        setclikUpdate('none');
                    }
                    
                }
                else if(userData?.usubdiv === "PPIC-WH" && userData?.ulevel === 2){
                    setclickVery('block')
                }
                else{}
            }
            else if (data ==='Pengajuan' && fina === "Upload") {
                if(userData?.usubdiv === "Purchasing"){
                    if(userData?.ulevel === 3){
                        setclikUpdate('block');
                        // setClickDelete('block');
                    }
                    else{
                        setclikUpdate('none');
                    }
                }
                else if(userData?.usubdiv === "PPIC-WH" && userData?.ulevel === 2){
                    setclickVery('block')
                }
                else{}
            }
            else if (data ==='Verifikasi' && fina === "") {
                if(userData?.usubdiv === "Purchasing"){
                    setclickPrint('block')
                }
                else if(userData?.usubdiv === "BOD/BOC"){
                    setclickVery('block')
                }
                else{}
            }
            else if (data ==='Verifikasi' && fina === "Upload") {
                if(userData?.usubdiv === "Purchasing"){
                    setclickPrint('block')
                }
                else if(userData?.usubdiv === "BOD/BOC"){
                    setclickVery('block')
                }
                else{}
            }
            else if (data ==='Selesai' && fina === "") {
                if(userData?.usubdiv === "Purchasing"){
                    setclickPrint('block')
                    setclickReload('block')
                }
                else{
                    setclickPrint('none')
                    setclickReload('none')
                }  
            }
            else if (data ==='Selesai' && fina === "Upload") {
                if(userData?.usubdiv === "Purchasing"){
                    setclickPrint('block')
                }
                else{
                    setclickPrint('none')
                }  
            }
            else if (data ==='Revisi' && fina === "") {
                if(userData?.usubdiv === "Purchasing"){
                    if(userData?.ulevel === 3){
                        setclikUpdate('block')
                    }
                    else{
                        setclikUpdate('none')
                    }
                    
                }
                else if(userData?.usubdiv === "PPIC-WH" && userData?.ulevel === 2){
                    setclickVery('block')
                }
                else{}
            }
            else if (data ==='Revisi' && fina === "Upload") {
                if(userData?.usubdiv === "Purchasing"){
                    if(userData?.ulevel === 3){
                        setclikUpdate('block')
                    }
                    else{
                        setclikUpdate('none')
                    }
                    
                }
                else if(userData?.usubdiv === "PPIC-WH" && userData?.ulevel === 2){
                    setclickVery('block')
                }
                else{}
            }
            else {
                setclikUpdate('none')
                setclickPrint('none')
                setclickReload('none')
                setclickVery('none')
                setclickView('block')
            }

            /* if(data === "Selesai" || data === "Verifikasi"){
                setcekPrint('block')
            }
            else{
                setcekPrint('none')
            } */
        }
       coba(); 
       // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    const renderEdit = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          Read PO
        </Tooltip>
    )

    const renderPO = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          Edit PO
        </Tooltip>
    )

    const renderPrint = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          Print PO
        </Tooltip>
    )

    /* const renderDelete = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          Delete PO
        </Tooltip>
    ) */

    const renderVerified = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          Verifikasi PO
        </Tooltip>
    )

    const reloadPO = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          Reload PO
        </Tooltip>
    )

    const buttonClicked = () => {
        if(props?.data.status === "Pengajuan" && userData?.usubdiv === "Purchasing" && userData?.uplan === "Sentul"){
            if(userData?.ulevel === 3){
                navigate(`/form/purchaseorder/update`,{state:{
                    data : props.data
                }});
            }
            else{
                bacaData()
            }
        }
        else if(props?.data.status === "Revisi" && userData?.usubdiv === "Purchasing" && userData?.uplan === "Sentul"){
            if(userData?.ulevel === 3){
                navigate(`/form/purchaseorder/update`,{state:{
                    data : props.data
                }});
            }
            else{
                bacaData()
            }
        }
        else{
            bacaData()
        }
      
    };

    const bacaData = () =>{
        navigate(`/form/purchaseorder/data`,{state:{
            data : props.data
        }});
    }

    const buttonPrint = () =>{
        const data = props.data;
        navigate(`/form/purchaseorder/printview`,{state:{
          data : data
        }});
    }

    const buttonVerified = () =>{
        const data = props.data;
        navigate(`/form/purchaseorder/verifikasi`,{state:{
            data : data
        }});
    }

    const buttonReload = (e) =>{
        const data = props.data;
        navigate(`/form/purchaseorder/reloadpo`,{state:{
            data : data
        }});
    }

    /* const handleDelete = () =>{
        Swal.fire({
            title: `Apakah anda tetap melanjutkan proses delete data ${props.data.id_po}?`,
            text: "",
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Yes',
            denyButtonText: 'No',
            customClass: {
              actions: 'my-actions',
              confirmButton: 'order-2',
              denyButton: 'order-3',
            },
          }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('Data PO dihapus', '', 'success')
            } else if (result.isDenied) {
              Swal.fire('Data PO batal dihapus', '', 'info')
            }
          })
    } */
    
  return (
        <>
        {/* <span style={{display: 'flex'}}>
            <OverlayTrigger
                placement="bottom"
                delay={{ show: 150, hide: 250 }}
                overlay={reloadPO}
            >
                <button
                    style={{ height: 30, lineHeight: 0.5, display: cekList }}
                    onClick={(e) => buttonReload(e)}
                    className="buttonCancel"
                >
                <i className="bi bi-arrow-clockwise"></i>
                <p style={{display:"none"}}>{userData.uname}</p>
                </button>
            </OverlayTrigger>

            
            <OverlayTrigger
                placement="bottom"
                delay={{ show: 150, hide: 250 }}
                overlay={renderPrint}
            >
                <button
                    style={{ height: 30, lineHeight: 0.5, display : cekPrint }}
                    onClick={() => buttonPrint()}
                    className="buttonPrint"
                >
                <i className="bi bi-printer-fill"></i>
                <p style={{display:"none"}}>{userData.uname}</p>
                </button>
            </OverlayTrigger>


            <OverlayTrigger
                placement="bottom"
                delay={{ show: 150, hide: 250 }}
                overlay={renderEdit}
            >
                <button
                    style={{ height: 30, lineHeight: 0.5, display:'none' }}
                    // onClick={() => buttonClicked()}
                    className="buttonSet"
                >
                <i className="bi bi-clipboard"></i>
                <p style={{display:"none"}}>{userData.uname}</p>
                </button>
            </OverlayTrigger>

            <OverlayTrigger
                placement="bottom"
                delay={{ show: 150, hide: 250 }}
                overlay={renderPO}
            >
                <button
                    style={{ height: 30, lineHeight: 0.5, display: cekEdit}}
                    onClick={() => buttonClicked()}
                    className="buttonReset"
                >
                <i className="bi bi-pencil"></i>
                </button>
            </OverlayTrigger>

            <OverlayTrigger
                placement="bottom"
                delay={{ show: 150, hide: 250 }}
                overlay={renderVerified}
            >
                <button
                    style={{ height: 30, lineHeight: 0.5, display: cekVerified}}
                    onClick={() => buttonVerified()}
                    className="buttonSet"
                >
                <i className="bi bi-check-lg"></i>
                </button>
            </OverlayTrigger>
        </span> */}

        <span style={{display: 'flex'}}>
            {/* buton reload PO */}
            <OverlayTrigger
                placement="bottom"
                delay={{ show: 150, hide: 250 }}
                overlay={reloadPO}
            >
                <button
                    style={{ height: 30, lineHeight: 0.5, display: clickReload}}
                    onClick={(e) => buttonReload(e)}
                    className="buttonCancel"
                >
                <i className="bi bi-arrow-clockwise"></i>
                <p style={{display:"none"}}>{userData?.uname}</p>
                </button>
            </OverlayTrigger>

            {/* buton print */}
            <OverlayTrigger
                placement="bottom"
                delay={{ show: 150, hide: 250 }}
                overlay={renderPrint}
            >
                <button
                    style={{ height: 30, lineHeight: 0.5, display: clickPrint}}
                    onClick={() => buttonPrint()}
                    className="buttonPrint"
                >
                <i className="bi bi-printer-fill"></i>
                <p style={{display:"none"}}>{userData?.uname}</p>
                </button>
            </OverlayTrigger>

            {/* buton edit */}
            <OverlayTrigger
                placement="bottom"
                delay={{ show: 150, hide: 250 }}
                overlay={renderPO}
            >
                <button
                    style={{ height: 30, lineHeight: 0.5, display: clikUpdate}}
                    onClick={() => buttonClicked()}
                    className="buttonReset"
                >
                <i className="bi bi-pencil"></i>
                </button>
            </OverlayTrigger>

            {/* buton verifikasi */}
            <OverlayTrigger
                placement="bottom"
                delay={{ show: 150, hide: 250 }}
                overlay={renderVerified}
            >
                <button
                    style={{ height: 30, lineHeight: 0.5, display: clickVery}}
                    onClick={() => buttonVerified()}
                    className="buttonSet"
                >
                <i className="bi bi-check-lg"></i>
                </button>
            </OverlayTrigger>
            
            {/* buton delete */}
            {/* <OverlayTrigger
                placement="bottom"
                delay={{ show: 150, hide: 250 }}
                overlay={renderDelete}
            >
                <button
                    style={{ height: 30, lineHeight: 0.5, display: clickDelete}}
                    onClick={() => handleDelete()}
                    className="buttonCancel"
                >
                <i className="bi bi-trash3-fill"></i>
                </button>
            </OverlayTrigger> */}

            {/* buton read */}
            <OverlayTrigger
                placement="bottom"
                delay={{ show: 150, hide: 250 }}
                overlay={renderEdit}
            >
                <button
                    style={{ height: 30, lineHeight: 0.5, display: clickView}}
                    onClick={() => bacaData()}
                    className="buttonRead"
                >
                <i className="bi bi-journal-text"></i>
                </button>
            </OverlayTrigger>

            
        </span>
        


        </>
        
  )
}
