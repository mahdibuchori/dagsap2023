import React, { useState } from 'react'
import Swal from "sweetalert2";
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import useAuthStore, { selectUser } from '../../store/DataUser';
import usePengadaanStore, {selectFalsePengadaan, selectPengadaanReady} from '../../store/DataPengadaan';


export const BtnPengadaan = (props) => {
    const navigate = useNavigate();
    const [cekData, setCekData] = useState('none');
    const userData = useAuthStore(selectUser);
    const pengadaanFalse = usePengadaanStore(selectFalsePengadaan);
    const pengadaanReady = usePengadaanStore(selectPengadaanReady);

    const renderVerify = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          Verify Pengadaan
        </Tooltip>
    )
  
    const renderEdit = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          Cek Data
        </Tooltip>
    )
  
    const renderPO = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          Create/Cek PO
        </Tooltip>
    )

    const handleEdit = () =>{
      navigate(`/form/pengadaan/data`,{state:{
        data : props.data
      }});
    }

    const handleVerifikasi =async () =>{
      setCekData('none')
      let level = userData.ulevel;
      let divisi = userData.udivisi.toUpperCase();
      let plan = userData.uplan;
      let divPengadaan = props.data.user[0].divisi;
      let planPengadaan = props.data.user[0].plan;
      await pengadaanFalse()
      console.log(pengadaanReady)
      if(level === 0){
          navigate(`/form/pengadaan/data`,{state:{
              data : props.data
          }});
      }
      else{
          if(planPengadaan === plan ){
              if(plan === "Sentul"){
                  
              }
          }
          else{
              Swal.fire('Oppss','Plan anda tidak sesuai', 'info')
          }
      }

      if(String(props.data.status).toUpperCase() === "PENGAJUAN"){
          if(level === 0){
              navigate(`/form/pengadaan/verfikasi`,{state:{
                  data : props.data
              }});
          }
          else{
              if(planPengadaan === plan ){
                  let myDivisi = "";
                  if(divPengadaan.toUpperCase() === "PPIC-WH" ||divPengadaan.toUpperCase() === "PURCHASING" ||divPengadaan.toUpperCase() === "FG"){
                    myDivisi = "PPIC-PURCHASING";
                  }
                  else if(divPengadaan.toUpperCase() === "FAT" ||divPengadaan.toUpperCase() === "BUDGETING" ||divPengadaan.toUpperCase() === "FAT & BUDGETING"){
                    myDivisi = "FAT";
                  }
                  else{
                    myDivisi = divPengadaan.toUpperCase();
                  }
                  
                  if(plan === "Sentul"){
                      if(myDivisi === divisi){
                          switch (divisi) {
                          case "HR-GA":
                            if(level === 3){
                              navigate(`/form/pengadaan/verfikasi`,{state:{
                                  data : props.data
                              }});
                            }
                            else{
                              Swal.fire('Info','Tidak memiliki akses','warning');
                            }
                          break;
                          case "MAINTENANCE":
                            if(level === 2 || level === 3){
                              navigate(`/form/pengadaan/verfikasi`,{state:{
                                  data : props.data
                              }});
                            }
                            else{
                              Swal.fire('Info','Tidak memiliki akses','warning');
                            }
                          break;
                          case "PRODUKSI":
                            if(level === 2){
                              navigate(`/form/pengadaan/verfikasi`,{state:{
                                  data : props.data
                              }});
                            }
                            else{
                              Swal.fire('Info','Tidak memiliki akses','warning');
                            }
                          break;
                          case "PPIC-PURCHASING":
                            if(level === 2){
                              navigate(`/form/pengadaan/verfikasi`,{state:{
                                  data : props.data
                              }});
                            }
                            else{
                              Swal.fire('Info','Tidak memiliki akses','warning');
                            }
                          break;
                          case "QAQC":
                            if(level === 2){
                              navigate(`/form/pengadaan/verfikasi`,{state:{
                                  data : props.data
                              }});
                            }
                            else{
                              Swal.fire('Info','Tidak memiliki akses','warning');
                            }
                          break;
                          case "RND":
                            if(level === 2){
                              navigate(`/form/pengadaan/verfikasi`,{state:{
                                  data : props.data
                              }});
                            }
                            else{
                              Swal.fire('Info','Tidak memiliki akses','warning');
                            }
                          break;
                          case "SSD":
                            if(level === 3){
                              navigate(`/form/pengadaan/verfikasi`,{state:{
                                  data : props.data
                              }});
                            }
                            else{
                              Swal.fire('Info','Tidak memiliki akses','warning');
                            }
                          break;
                          case "FAT":
                            if(level === 3){
                              navigate(`/form/pengadaan/verfikasi`,{state:{
                                  data : props.data
                              }});
                            }
                            else{
                              Swal.fire('Info','Tidak memiliki akses','warning');
                            }
                          break;
                          case "DEVELOP":
                              navigate(`/form/pengadaan/verfikasi`,{state:{
                                  data : props.data
                              }});
                          break;
                          default:
                            Swal.fire('Info','Tidak memiliki akses','warning');
                          }
                      }
                      else{
                          Swal.fire('info','Tidak memiliki akses','warning')
                      }
                  }
                  else if(plan === "Bantul"){
                      if(divPengadaan.toUpperCase() === divisi){
                          switch (divisi) {
                              case "FG":
                                  if(level === 2 || level === 3){
                                      navigate(`/form/pengadaan/verfikasi`,{state:{
                                          data : props.data
                                      }});
                                  }
                                  else{
                                    Swal.fire('Info','Tidak memiliki akses','warning');
                                  }
                              break;
                              case "HR-GA":
                                if(level === 2){
                                  navigate(`/form/pengadaan/verfikasi`,{state:{
                                      data : props.data
                                  }});
                                }
                                else{
                                  Swal.fire('Info','Tidak memiliki akses','warning');
                                }
                              break;
                              case "MAINTENANCE":
                                if(level === 2 || level === 3){
                                  navigate(`/form/pengadaan/verfikasi`,{state:{
                                      data : props.data
                                  }});
                                }
                                else{
                                  Swal.fire('Info','Tidak memiliki akses','warning');
                                }
                              break;
                              case "PPIC-WH":
                                if(level === 2){
                                  navigate(`/form/pengadaan/verfikasi`,{state:{
                                      data : props.data
                                  }});
                                }
                                else{
                                  Swal.fire('Info','Tidak memiliki akses','warning');
                                }
                              break;
                              case "PRODUKSI":
                                if(level === 2){
                                  navigate(`/form/pengadaan/verfikasi`,{state:{
                                      data : props.data
                                  }});
                                }
                                else{
                                  Swal.fire('Info','Tidak memiliki akses','warning');
                                }
                              break;
                              case "PURCHASING":
                                if(level === 2 || level === 3){
                                  navigate(`/form/pengadaan/verfikasi`,{state:{
                                      data : props.data
                                  }});
                                }
                                else{
                                  Swal.fire('Info','Tidak memiliki akses','warning');
                                }
                              break;
                              case "QAQC":
                                if(level === 2){
                                  navigate(`/form/pengadaan/verfikasi`,{state:{
                                      data : props.data
                                  }});
                                }
                                else{
                                  Swal.fire('Info','Tidak memiliki akses','warning');
                                }
                              break;
                              case "RND":
                                if(level === 2){
                                  navigate(`/form/pengadaan/verfikasi`,{state:{
                                      data : props.data
                                  }});
                                }
                                else{
                                  Swal.fire('Info','Tidak memiliki akses','warning');
                                }
                              break;
                              case "SSD":
                                if(level === 3){
                                  navigate(`/form/pengadaan/verfikasi`,{state:{
                                      data : props.data
                                  }});
                                }
                                else{
                                  Swal.fire('Info','Tidak memiliki akses','warning');
                                }
                              break;
                              case "DEVELOP":
                                  navigate(`/form/pengadaan/verfikasi`,{state:{
                                      data : props.data
                                  }});
                              break;
                              default:
                                Swal.fire('Info','Tidak memiliki akses','warning');
                          }
                      }
                      else{
                          Swal.fire('info','Tidak memiliki akses','warning')
                      }
                  }
                  else{
                      Swal.fire('Warning',"Plan Tidak Terdaftar",'warning')
                  }
              }
              else{
                  Swal.fire('Oppss','Plan anda tidak sesuai', 'info')
              }
          }
    
      }
      else if(String(props.data.status).toUpperCase() === "VERIFIKASI"){
          Swal.fire('info','Pengadaan barang sedang diproses oleh purchasing','info')
      }
      else{}



    }
  return (
    <>
        <span style={{display: 'flex'}}>
            <OverlayTrigger
                placement="bottom"
                delay={{ show: 150, hide: 250 }}
                overlay={renderEdit}
            >
                <button
                    style={{ height: 30, lineHeight: 0.5, marginTop : 5 }}
                    onClick={() => handleEdit()}
                    className="buttonSet"
                >
                <i className="bi bi-clipboard"></i>
                </button>
            </OverlayTrigger>

            <OverlayTrigger
                placement="bottom"
                delay={{ show: 150, hide: 250 }}
                overlay={renderVerify}
            >
                <button
                    style={{ height: 30, lineHeight: 0.5, marginTop : 5}}
                    onClick={() => handleVerifikasi()}
                    className="buttonCancel"
                >
                <i className="bi bi-check-lg"></i>
                </button>
            </OverlayTrigger>

            <OverlayTrigger
                placement="bottom"
                delay={{ show: 150, hide: 250 }}
                overlay={renderPO}
            >
                <button
                    style={{ height: 30, lineHeight: 0.5, display: cekData }}
                    // onClick={() => buttonOrder()}
                    className="buttonReset"
                >
                <i className="bi bi-pencil"></i>
                </button>
            </OverlayTrigger>
        </span>
    </>
  )
}
