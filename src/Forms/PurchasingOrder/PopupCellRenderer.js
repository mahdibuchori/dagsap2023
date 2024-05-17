import React, { useEffect, useRef, useState } from 'react';
import Swal from "sweetalert2";
import Tippy from '@tippyjs/react';
import Select from 'react-select'
import { Card } from 'react-bootstrap';
import { FileBarang } from '../../datafile/FileSelect';  
import useDataMaterial, { selectMaterial } from '../../store/DataMaterial';

export const PopupCellRenderer = (props) => {
    const tippyRef = useRef();
    const material = useDataMaterial(selectMaterial);

    const [fileNab, setFileNab] = useState(FileBarang);
    const [fileBar, setFileBar] = useState(FileBarang);
    const [fileMaterial, setFileMaterial] = useState(FileBarang);

    const [ tibar, setTibar ] = useState('');

    const [visible, setVisible] = useState(false);
    const [dataReady, setDataReady] = useState(false);
    const show = () => {
        setVisible(true)
    };
    const hide = () => setVisible(false);
    /* console.log(props.data); */

    useEffect(() => {
        const result = material.material?.reduce((unique, o) => {
          if(!unique.some(obj => obj.kategori === o.kategori)) {
            unique.push({
              value :o.kategori,
              label :o.kategori,
              kategori :o.kategori,
              labelId :o.categoryid,
            });
          }
          return unique;
        },[]);
        // console.log(result)
        setFileNab(result);
        cekData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
    
    useEffect (() => {
        if(!dataReady) return;
        const gntiDta = async () =>{
          try {
            const newFileNab = material.material?.filter(x => x.kategori === tibar.value);
            let modifiedArr = newFileNab.map(function(element){
                return { value: element.itemno, label: `${element.itemno} - ${element.itemdescription}`, item: element.itemdescription , satuan: element.unit1 };
            });
            setFileBar(modifiedArr);
          } catch (error) {
              Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Pengambilan Data Pengadaan Gagal!',
              footer: error
              })
          }
          setDataReady(false);
        } 
    
        gntiDta();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[dataReady]);

    const cekData = () =>{
        const data = props.data;
        const result = material.material?.reduce((unique, o) => {
            if(!unique.some(obj => obj.kategori === o.kategori)) {
              unique.push({
                value :o.kategori,
                label :o.kategori,
                kategori :o.kategori,
                labelId :o.categoryid,
              });
            }
            return unique;
        },[]);
        const filTipe = result.filter(x => x.value.toUpperCase() === String(data?.tipe).toUpperCase());
        const newFileNab = material.material?.filter(x => x.kategori.toUpperCase() === String(data?.tipe).toUpperCase());
        let modifiedArr = newFileNab.map(function(element){
            return { value: element.itemno, label: `${element.itemno} - ${element.itemdescription}`, item: element.itemdescription , satuan: element.unit1 };
        });
        const filMate = modifiedArr.filter(x => x.value.toUpperCase() === String(data?.itemNo).toUpperCase());
        setFileBar(modifiedArr);
        setFileMaterial(filMate[0])
        setTibar({value: filTipe[0]?.value, label: filTipe[0]?.label, kategori: filTipe[0]?.kategori, labelId: filTipe[0]?.labelId});
    }
    
      
    const dropDownContent = (
        <Card className='mb-3' bg='white'>
            <Card.Body>
                <div className="row  g-2 ">
                <div className='col-sm-12 col-md-12 col-lg-12 col-xl-12'>
                <h6>Tipe Material</h6>
                <Select
                    onChange={(value) => {
                        setTibar(value)
                        setFileBar([
                            { value: '', label: '' }
                          ])
                        setFileMaterial([
                            { value: '', label: '' }
                        ])
                        setDataReady(true)
                    }}
                    value={tibar}
                    options = {fileNab}
                    isSearchable = {false}
                    />
                </div>
                <div className='col-sm-12 col-md-12 col-lg-12 col-xl-12'>
                    <h6>Item</h6>
                    <Select 
                          required
                          onChange={(value) => {
                            onClickHandler(value)
                            setFileMaterial(value)
                          }}
                          value={fileMaterial}
                          options = {fileBar}
                          isSearchable = {true}
                    />
                </div>
                </div>
            </Card.Body>
        </Card>
                
    );

    const onClickHandler = (option) => {
        hide();
        const itemsToUpdate = [];
        const data = props.data;
        console.log(data)
        console.log(option)
        data.newMaterial = option.item
        data.tipe = tibar.value
        data.itemNo = option.value 
        data.newSatuan = option.satuan
        itemsToUpdate.push(data);
        props.api.applyTransaction({
            update: itemsToUpdate
        });
        
        /* if (option === 'create') {
        props.api.applyTransaction({
            update: [{ make: 'Toyota1', model: 'Celica', price: 35000 }],
        });
        }
        if (option === 'delete') {
        props.api.applyTransaction({ remove: [props.data] });
        }

        if (option === 'edit') {
        console.log(props);
        props.api.startEditingCell({
            rowIndex: props.rowIndex,
            data: [{ make: 'Toyota2' }],
            colKey: 'make',
        });
        }

        if (option === 'update') {
        console.log(props.data);
        const itemsToUpdate = [];
        const data = props.data;
        data.make = 'BMW'
        itemsToUpdate.push(data);
        props.api.applyTransaction({
            update: itemsToUpdate
        });
        } */
    };

    return (
        <Tippy
        ref={tippyRef}
        content={dropDownContent}
        visible={visible}
        onClickOutside={hide}
        allowHTML={true}
        arrow={false}
        appendTo={document.body}
        interactive={true}
        placement="left"
        >
        
      <button className="btntippy btn-light" onClick={visible ? hide : show}>
        <i className="bi bi-grip-vertical"></i>
      </button>
    </Tippy>
    )
}
