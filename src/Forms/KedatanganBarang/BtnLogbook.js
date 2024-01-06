import React from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

export const BtnLogbook = (props) => {
    const navigate = useNavigate();

    const renderEdit = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          Cek Data
        </Tooltip>
    )

    const handleEdit = () =>{
      navigate(`/form/Kedatangan/logbookview`,{state:{
        data : props.data
      }});
    }

    return (
        <>
            <span style={{
                display : 'flex',
                justifyContent : 'center',
                alignItems : 'center',
                marginTop : '3px'
            }}>
                <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 150, hide: 250 }}
                    overlay={renderEdit}
                >
                    <button
                        style={{ height: 30, lineHeight: 0.5 }}
                        onClick={() => handleEdit()}
                        className="buttonSet"
                    >
                    <i className="bi bi-clipboard"></i>
                    </button>
                </OverlayTrigger>
            </span>
        </>
    )
}
