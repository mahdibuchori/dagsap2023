import React, { useEffect, useMemo, useState } from 'react';
import Swal from "sweetalert2";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import { useNavigate } from 'react-router-dom';
import { Breadcrumb, Dropdown, Stack } from 'react-bootstrap';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import { LoadingPage } from '../../LoadingPage/LoadingPage';
import useUserStore, { selectUserReady, selectOnEmployee, selectKaryawan, selectFalseEmployee } from '../../store/dataKaryawan';


//useUserStore, 
export const TableKaryawan = ({columns, data}) => {
  let navigate = useNavigate();
  const onEmploye = useUserStore(selectOnEmployee);
  const dataKaryawan = useUserStore(selectKaryawan);
  const userReady = useUserStore(selectUserReady);
  const falseReady = useUserStore(selectFalseEmployee);

  
  const [isLoading, setIsLoading] = useState(false);
  const [rowData, setRowData] = useState();

  const tHeigt = parseInt(window.innerHeight) - 200;
  let tWidth = 0;
  if(parseInt(window.innerWidth) < 1022){
    tWidth = parseInt(window.innerWidth) - 30;
  }
  else{
    tWidth = parseInt(window.innerWidth) - 99 ;
  }
  const [screenWidth, setScreenWidth] = useState(tWidth);
  const [screenHeight, setScreenHeight] = useState(tHeigt);

  useEffect(() => {   
    falseReady();
    onEmploye();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleResize = () => {
      let total = 0;
      let tinggi = parseInt(window.innerHeight) - 300
      if(parseInt(window.innerWidth) < 1022){
      total = parseInt(window.innerWidth) - 30;
      }
      else{
      total = parseInt(window.innerWidth) - 99 ;
      }
      setScreenWidth(total);
      setScreenHeight(tinggi);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

useEffect(() => {
  setIsLoading(true);
  if (!userReady) return;
  onGridReady()
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [userReady]);

const onGridReady = () => {
  try {
    const response = dataKaryawan.filter((e)=> e.udivisi !== "Develop")
    setRowData(response);
    setIsLoading(false);
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Pengambilan Data Pengadaan Gagal!',
      footer: error.message
    })
  }
  
};

const defaultColDef = useMemo(() => {
  return {
  editable: false,
  sortable: true,
  filter: true,
  resizable: true,
  };
}, []);


  return (
    <>
    <div>
      <Stack direction="horizontal" gap={3} style={{padding: "0px 10px 0px 10px"}}>
        <div className="bg-body">
          <Breadcrumb className="bg-body m-2">
            <Breadcrumb.Item onClick={() =>navigate('/form')}>Form</Breadcrumb.Item>
            <Breadcrumb.Item active>Table Karyawan</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="ms-auto">
          <div style={{marginRight: 10, display:'flex'}}>
          </div>
        </div>
        <div className="vr" />
        <div className="bg-body">
          <Dropdown>
            <Dropdown.Toggle variant="primary">
            Menu
            </Dropdown.Toggle>

            <Dropdown.Menu variant="dark">
              <Dropdown.Item onClick={() =>navigate('/form/karyawan/create')}><i class="bi bi-pencil"></i> Create Karyawan</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={onGridReady}><i className="bi bi-arrow-clockwise"></i> Refresh</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Stack>
      <div style={{height: screenHeight, width: screenWidth, padding: 10}} className="ag-theme-alpine">
        <AgGridReact
          rowData={rowData}
          columnDefs={columns}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
        ></AgGridReact>
      </div>
    </div>

    {isLoading ? <LoadingPage/> : ""}
    </>
  )
}
