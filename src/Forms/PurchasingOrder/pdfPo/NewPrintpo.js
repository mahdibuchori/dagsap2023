import React from 'react';
import 'react-multi-email/dist/style.css';
import '../styles/poStyle.css';
import { PDFDownloadLink } from "@react-pdf/renderer";
import { DokumenPo } from './DokumenPo';
import { Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';


export const NewPrintpo = (props) => {
  const handleDownload = (blob) => {
    Swal.fire({
      title: `Data ${props.data.idpo} sudah tersimpan ke folder anda`,
      showDenyButton: false,
      showCancelButton: false,
      confirmButtonText: "OK",
      denyButtonText: `Don't save`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        props.closeMail()
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };
  const styles = {
    container: {
      width: '220px',
      borderRadius: '5px',
      padding: '15px 12px',
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
      boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)',
    },
    flex: { width: '100%', display: 'flex', gap: '5px', alignItems: 'center' },
    bold: { fontSize: '13px', fontWeight: 600 },
    thin: { fontSize: '11px', color: '#6f6f6f', fontWeight: 500 },
    btn: {
      borderRadius: '3px',
      border: '1px solid gray',
      display: 'flex',
      alignItems: 'center',
      gap: '2px',
      padding: '3px',
      fontSize: '11px',
      color: '#4f4f4f',
      fontWeight: 600,
      cursor: 'pointer',
      userSelect: 'none',
    },
    btn_no:{
      color: "#fff",
      padding: "8px 15px 8px 15px",
      backgroundColor : "#E02B35",
      borderRadius: '5px',
      marginRight: '20px',
      cursor: 'pointer'
    },
    btn_yes:{
      color: "#fff",
      padding: "8px 20px 8px 20px",
      backgroundColor : "#287bff",
      borderRadius: '5px',
    },
    btn_mail:{
      color: "#fff",
      padding: "8px 20px 8px 20px",
      backgroundColor : "#F0C571",
      borderRadius: '5px',
      marginRight: '20px',
    }
  };
  return (
    <>
    <Modal show={props.show} centered>
        <Modal.Header>
          <h3>Apakah akan mengirimkan pesan po?</h3>
        </Modal.Header>
        <Modal.Footer>
          <div style={{ ...styles.flex, ...{ flexDirection: 'row-reverse' } }}>
            <div style={styles.btn_yes}>
              <PDFDownloadLink document={<DokumenPo data={props.data} list={props.list} dtPar={props.dtPar} dtNote={props.dtNote}/>} fileName={`${props.data.idpo}.pdf`} onDownload={handleDownload}>
                {({ blob, url, loading, error }) => (
                  <button style={{color: "#fff",cursor: 'pointer'}} onClick={() => {handleDownload(blob)}}>
                    <span>Ya</span>
                  </button>
                )}
              </PDFDownloadLink>
            </div>
            <button style={styles.btn_mail} onClick={()=> props.closeMail()}>Email</button>
            <button style={styles.btn_no} onClick={()=> props.close()}>Tidak</button>
          </div>
        </Modal.Footer>
    </Modal>
    </>
    
    
  )
}