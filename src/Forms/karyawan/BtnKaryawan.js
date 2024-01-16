import React from 'react'
import Swal from "sweetalert2";
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { API_AUTH } from '../../apis/apisData';
import { useNavigate } from 'react-router-dom';

export const BtnKaryawan = (props) => {
  const navigate = useNavigate();
  const buttonDelete =async () =>{
    Swal.fire({
    title: `Apakah anda ingin menghapus data karyawan dengan NIK ${props.data.uuid}`,
    showDenyButton: true,
    confirmButtonText: 'Hapus',
    denyButtonText: `Batal`,
    }).then((result) => {
    if (result.isConfirmed) {
        deleteData(props.data.uuid);
    } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
    }
    })
  }

  const deleteData = async (id) =>{
    try {
      await API_AUTH.delete(`profile/${id}`);
      Swal.fire('Data berhasil dihapus', navigate(0), 'success')
    } catch (error) {
        Swal.fire('Oppss',`${error.response.data.message}`,'error')
        // Swal.fire('Changes are not saved', '', 'info')
    }
    
  }

  const renderHapus = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Hapus Data
    </Tooltip>
  )

  const renderEdit = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Cek Data
    </Tooltip>
  )

  const resetPass = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Resset Password
    </Tooltip>
  )

  return (
    <>
    <span>
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
          </button>
      </OverlayTrigger>

      <OverlayTrigger
          placement="bottom"
          delay={{ show: 150, hide: 250 }}
          overlay={renderHapus}
      >
          <button
              style={{ height: 30, lineHeight: 0.5 }}
              onClick={() => buttonDelete()}
              className="buttonCancel"
          >
          <i className="bi bi-trash3-fill"></i>
          </button>
      </OverlayTrigger>

      <OverlayTrigger
          placement="bottom"
          delay={{ show: 150, hide: 250 }}
          overlay={resetPass}
      >
          <button
              style={{ height: 30, lineHeight: 0.5 }}
              // onClick={() => buttonResset()}
              className="buttonReset"
          >
          <i class="bi bi-arrow-clockwise"></i>
          </button>
      </OverlayTrigger>
    </span>
    </>
  )
}
