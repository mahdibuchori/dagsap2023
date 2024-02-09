import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import useAuthStore, { selectUser } from '../../store/DataUser';

export const BtnPurchasing = (props) => {
    const navigate = useNavigate();
    const userData = useAuthStore(selectUser);
    const renderEdit = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          Cek Data
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
  return (

        <span style={{display: 'flex'}}>
            <OverlayTrigger
                placement="bottom"
                delay={{ show: 150, hide: 250 }}
                overlay={renderEdit}
            >
                <button
                    style={{ height: 30, lineHeight: 0.5 }}
                    onClick={() => buttonClicked()}
                    className="buttonSet"
                >
                <i className="bi bi-clipboard"></i>
                <p style={{display:"none"}}>{userData.uname}</p>
                </button>
            </OverlayTrigger>
        </span>
  )
}
