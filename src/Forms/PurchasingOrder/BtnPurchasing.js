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
    let data = props.data.status;
    let fina = props.data.statusfina;
    
    

    useEffect(() => {
        const coba = () =>{
            if (data ==='Pengajuan' && fina === "") {
                setCekList('none');
                setCekEdit('block');
            }
            else if (data ==='Pengajuan' && fina === "Upload") {
                setCekList('none');
                setCekEdit('block');
            }
            else if (data ==='Verifikasi' && fina === "") {
                setCekList('none');
                setCekEdit('block');
            }
            else if (data ==='Verifikasi' && fina === "Upload") {
                setCekList('none');
                setCekEdit('block');
            }
            else if (data ==='Selesai' && fina === "") {
                setCekList('block');
                setCekEdit('none');      
            }
            else if (data ==='Selesai' && fina === "Upload") {
                setCekList('none');
                setCekEdit('none');     
            }
            else if (data ==='Revisi' && fina === "") {
                setCekList('none');
                setCekEdit('block');
            }
            else if (data ==='Revisi' && fina === "Upload") {
                setCekList('none');
                setCekEdit('block');
            }
            else {
                setCekList('none');
                setCekEdit('block');
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
  return (
        <span style={{display: 'flex'}}>
            <OverlayTrigger
                placement="bottom"
                delay={{ show: 150, hide: 250 }}
                overlay={reloadPO}
            >
                <button
                    style={{ height: 30, lineHeight: 0.5, display: cekList }}
                    // onClick={() => buttonClicked()}
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
                    style={{ height: 30, lineHeight: 0.5 }}
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
        </span>
        
  )
}
