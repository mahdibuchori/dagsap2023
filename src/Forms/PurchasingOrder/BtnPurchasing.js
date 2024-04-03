import React, { useEffect, useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import useAuthStore, { selectUser } from '../../store/DataUser';

export const BtnPurchasing = (props) => {
    const navigate = useNavigate();
    const userData = useAuthStore(selectUser);
    const [cekList, setCekList] = useState('none');
    const [cekPrint, setcekPrint] = useState('none');
    const [cekEdit, setCekEdit] = useState('block');
    const [cekVerified, setCekVerified] = useState('block');
    let data = props.data.status;
    let fina = props.data.statusfina;
    
    

    useEffect(() => {
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
    }, []);
    const renderEdit = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          Cek PO
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
        if(props?.data.status === "Pengajuan" && userData.usubdiv === "Purchasing" && userData.uplan === "Sentul"){
            navigate(`/form/purchaseorder/update`,{state:{
                data : props.data
            }});
        }
        else{
            navigate(`/form/purchaseorder/data`,{state:{
                data : props.data
            }});
        }
      
      };

    const buttonPrint = () =>{
        const data = props.data;
        console.log(data)
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

    const buttonReload = () =>{
        const data = props.data;
        navigate(`/form/purchaseorder/reloadpo`,{state:{
            data : data
        }});
    }
  return (
        <span style={{display: 'flex'}}>
            <OverlayTrigger
                placement="bottom"
                delay={{ show: 150, hide: 250 }}
                overlay={reloadPO}
            >
                <button
                    style={{ height: 30, lineHeight: 0.5, display: cekList }}
                    onClick={() => buttonReload()}
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
        </span>
        
  )
}
