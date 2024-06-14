import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Badge, Button, ButtonGroup, Col, Dropdown, Form, Modal, Pagination, Row, Stack, ToggleButton } from 'react-bootstrap';
import { NumericFormat } from 'react-number-format';
import { LoadingPage } from '../../../../LoadingPage/LoadingPage';
import useDashboardStore, { selectDashPurchY,selectFetchYdash,selectPurchYReady } from '../../../../store/dataDashboard';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
const labels = ['januari', 'februari', 'maret', 'april', 'mei', 'juni', 'juli','agustus','september','oktober','november','desember','avg'];

export const ListMounthly = () => {
    const onDashboard = useDashboardStore(selectFetchYdash);
    const dataDashboard = useDashboardStore(selectDashPurchY);
    const dashboardReady = useDashboardStore(selectPurchYReady);

    const [month, setMonth] = useState();
    const [nabar,setNabar]= useState('');
    const [thn1, setThn1] = useState([]);
    const [thn2, setThn2] = useState([]);
    const [thn3, setThn3] = useState([]);
    const [thn4, setThn4] = useState([]);
    const [isTipe, setIsTipe] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [pagiJum, setPagiJum] = useState(true);
    const [pagiHarga, setPagiHarga] = useState(false);
    const [pagiQty, setPagiQty] = useState(false);
    const [pagiDef, setPagiDef] = useState('jumlah');
    const [show, setShow] = useState(false);

    const [radioValue, setRadioValue] = useState('0');

    const radios = [
        { name: '', value: '0', icon : 'bi bi-filter-square' },
        { name: '', value: '1', icon : 'bi bi-sort-up' },
        { name: '', value: '2', icon : 'bi bi-sort-down' },
    ];

    const [fileName, setFileName] = useState([]);
    const [kurs, setKurs] = useState('Rp. ');
    let tWidth = 0;
    if(parseInt(window.innerWidth) < 1022){
        tWidth = parseInt(window.innerWidth) - 70;
    }
    else{
        tWidth = parseInt(window.innerWidth) -100 ;
    }
    const [screenWidth, setScreenWidth] = useState(tWidth);

    useEffect(() => {
        const handleResize = () => {
          let total = 0;
          if(parseInt(window.innerWidth) < 1022){
            total = parseInt(window.innerWidth) - 70;
          }
          else{
            total = parseInt(window.innerWidth) - 100 ;
          }
          setScreenWidth(total);
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

    useEffect(() => { 
        setIsLoading(true);
        const date = new Date();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        let bb = String(month).padStart(2, '0');
        setMonth(`${year}-${bb}`);
        onDashboard()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!dashboardReady) return;
        const date = new Date();
        onGridReady(date,'','jumlah',radioValue)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dashboardReady]);

    const handleClose = () => setShow(false);

    const onGridReady = (tgl,tipe,fil,nil) => {
        setIsLoading(false)
        if( fil === 'jumlah'){
            setPagiHarga(false);
            setPagiJum(true);
            setPagiQty(false);
        }
        else if( fil === 'harga'){
            setPagiHarga(true);
            setPagiJum(false);
            setPagiQty(false);
        }
        else{
            setPagiHarga(false);
            setPagiJum(false);
            setPagiQty(true);
        }
        const date = new Date(tgl);
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        let bb = String(month).padStart(2, '0');
        const data = dataDashboard.data;

        const postIds = data.map((post) => {
            let file = {};
            if(parseInt(bb) === 1){
                file = post.januari
            }
            else if(parseInt(bb) === 2){
                file = post.februari
            }
            else if(parseInt(bb) === 3){
                file = post.maret
            }
            else if(parseInt(bb) === 4){
                file = post.april
            }
            else if(parseInt(bb) === 5){
                file = post.mei
            }
            else if(parseInt(bb) === 6){
                file = post.juni
            }
            else if(parseInt(bb) === 7){
                file = post.juli
            }
            else if(parseInt(bb) === 8){
                file = post.agustus
            }
            else if(parseInt(bb) === 9){
                file = post.september
            }
            else if(parseInt(bb) === 10){
                file = post.oktober
            }
            else if(parseInt(bb) === 11){
                file = post.november
            }
            else{
                file = post.desember
            }
            let {n24, n23, n22, n21, q24, q23, q22, q21} = 0;
            if(file.th24 === ""){n24 = 0}else{n24 = parseFloat(file.th24)}
            if(file.th23 === ""){n23 = 0}else{n23 = parseFloat(file.th23)}
            if(file.th22 === ""){n22 = 0}else{n22 = parseFloat(file.th22)}
            if(file.th21 === ""){n21 = 0}else{n21 = parseFloat(file.th21)}

            if(file.qth24 === ""){q24 = 0}else{q24 = parseFloat(file.qth24)}
            if(file.qth23 === ""){q23 = 0}else{q23 = parseFloat(file.qth23)}
            if(file.qth22 === ""){q22 = 0}else{q22 = parseFloat(file.qth22)}
            if(file.qth21 === ""){q21 = 0}else{q21 = parseFloat(file.qth21)}

            const total24 = n24 * q24;
            const total23 = n23 * q23;
            const total22 = n22 * q22;
            const total21 = n21 * q21;

            let p_jum24, p_jum23, p_jum22, p_jum21 = 0;
            let p_hrg24, p_hrg23, p_hrg22, p_hrg21 = 0;
            let p_qty24, p_qty23, p_qty22, p_qty21 = 0;

            if(fil === "jumlah" || fil === ""){
                if(total24 > 0){p_jum24 =((total24 - total23) / (total23)) * 100 ;}else{p_jum24=0;}
                if(total23 > 0){p_jum23 =((total23 - total22) / (total22)) * 100 ;}else{p_jum23=0;}
                if(total22 > 0){p_jum22 =((total22 - total21) / (total21)) * 100 ;}else{p_jum22=0;}
            }
            else if(fil === "harga"){
                if(n24 > 0){p_hrg24 =((n24 - n23) / (n23)) * 100 ;}else{p_hrg24=0;}
                if(n23 > 0){p_hrg23 =((n23 - n22) / (n22)) * 100 ;}else{p_hrg23=0;}
                if(n22 > 0){p_hrg22 =((n22 - n21) / (n21)) * 100 ;}else{p_hrg22=0;}
            }
            else{
                if(q24>0){p_qty24 = ((q24 - q23) / (q23)) * 100 ;}else{p_qty24=0}
                if(q23>0){p_qty23 = ((q23 - q22) / (q22)) * 100 ;}else{p_qty23=0}
                if(q22>0){p_qty22 = ((q22 - q21) / (q21)) * 100 ;}else{p_qty22=0}
            }

            if(p_jum24 === undefined || p_jum24 === "undefined"){p_jum24 = 0}
            if(p_jum23 === undefined || p_jum23 === "undefined"){p_jum23 = 0}
            if(p_jum22 === undefined || p_jum22 === "undefined"){p_jum22 = 0}

            if(p_hrg24 === undefined || p_hrg24 === "undefined"){p_hrg24 = 0}
            if(p_hrg23 === undefined || p_hrg23 === "undefined"){p_hrg23 = 0}
            if(p_hrg22 === undefined || p_hrg22 === "undefined"){p_hrg22 = 0}
            
            if(p_qty24 === undefined || p_qty24 === "undefined"){p_qty24 = 0}
            if(p_qty22 === undefined || p_qty23 === "undefined"){p_qty23 = 0}
            if(p_qty22 === undefined || p_qty22 === "undefined"){p_qty22 = 0}

            /* console.log(p_jum24.toFixed(2), p_jum23.toFixed(2), p_jum22.toFixed(2), p_jum21.toFixed(2))
            console.log(p_hrg24.toFixed(2), p_hrg23.toFixed(2), p_hrg22.toFixed(2), p_hrg21.toFixed(2))
            console.log(p_qty24.toFixed(2), p_qty23.toFixed(2), p_qty22.toFixed(2), p_qty21.toFixed(2)) */

            return(
                { item: post.item, th24 : n24, th23 : n23, th22 : n22, th21 : n21, qth24 : q24, qth23 : q23, qth22 : q22, qth21 : q21, total21 : total21.toFixed(2), total22 : total22.toFixed(2), total23 : total23.toFixed(2), total24 : total24.toFixed(2), satuan : post.satuan, tipe : post.tipe, p_jum24: p_jum24.toFixed(2), p_jum23: p_jum23.toFixed(2), p_jum22: p_jum22.toFixed(2), p_jum21: p_jum21.toFixed(2),p_hrg24: p_hrg24.toFixed(2), p_hrg23: p_hrg23.toFixed(2), p_hrg22: p_hrg22.toFixed(2), p_hrg21: p_hrg21.toFixed(2), p_qty24: p_qty24.toFixed(2), p_qty23: p_qty23.toFixed(2), p_qty22 :p_qty22.toFixed(2), p_qty21 :p_qty21.toFixed(2)}
            )
        });
        let nilai = {}
        // console.log(postIds)
        if(tipe === ""){
            if(year === 2024){
                if(fil === "jumlah"){
                    nilai = postIds.sort(function(a, b) {
                        return b.total24 - a.total24;
                    });
                    setKurs('Rp. ')
                }
                else if(fil === "harga"){
                    nilai = postIds.sort(function(a, b) {
                        return b.th24 - a.th24;
                    });
                    setKurs('Rp. ')
                }
                else{
                    nilai = postIds.sort(function(a, b) {
                        return b.qth24 - a.qth24;
                    });
                    setKurs('')
                }
            }
            else if(year === 2023){
                if(fil === "jumlah"){
                    nilai = postIds.sort(function(a, b) {
                        return b.total23 - a.total23;
                    });
                    setKurs('Rp. ')
                }
                else if(fil === "harga"){
                    nilai = postIds.sort(function(a, b) {
                        return b.th23 - a.th23;
                    });
                    setKurs('Rp. ')
                }
                else{
                    nilai = postIds.sort(function(a, b) {
                        return b.qth23 - a.qth23;
                    });
                    setKurs('')
                }
            }
            else if(year === 2022){
                if(fil === "jumlah"){
                    nilai = postIds.sort(function(a, b) {
                        return b.total22 - a.total22;
                    });
                    setKurs('Rp. ')
                }
                else if(fil === "harga"){
                    nilai = postIds.sort(function(a, b) {
                        return b.th22 - a.th22;
                    });
                    setKurs('Rp. ')
                }
                else{
                    nilai = postIds.sort(function(a, b) {
                        return b.qth22 - a.qth22;
                    });
                    setKurs('')
                }
            }
            else{
                if(fil === "jumlah" || pagiDef === ""){
                    nilai = postIds.sort(function(a, b) {
                        return b.total21 - a.total21;
                    });
                    setKurs('Rp. ')
                }
                else if(fil === "harga"){
                    nilai = postIds.sort(function(a, b) {
                        return b.th21 - a.th21;
                    });
                    setKurs('Rp. ')
                }
                else{
                    nilai = postIds.sort(function(a, b) {
                        return b.qth21 - a.qth21;
                    });
                    setKurs('')
                }
            }
        }
        else{
            const ic_tipe= postIds.filter((x)=> x.tipe === tipe)
            // console.log(ic_tipe)
            if(year === 2024){
                if(fil === "jumlah"){
                    nilai = ic_tipe.sort(function(a, b) {
                        return b.total24 - a.total24;
                    });
                    setKurs('Rp. ')
                }
                else if(fil === "harga"){
                    nilai = ic_tipe.sort(function(a, b) {
                        return b.th24 - a.th24;
                    });
                    setKurs('Rp. ')
                }
                else{
                    nilai = ic_tipe.sort(function(a, b) {
                        return b.qth24 - a.qth24;
                    });
                    setKurs('')
                }
            }
            else if(year === 2023){
                if(fil === "jumlah" || pagiDef === ""){
                    nilai = ic_tipe.sort(function(a, b) {
                        return b.total23 - a.total23;
                    });
                    setKurs('Rp. ')
                }
                else if(fil === "harga"){
                    nilai = ic_tipe.sort(function(a, b) {
                        return b.th23 - a.th23;
                    });
                    setKurs('Rp. ')
                }
                else{
                    nilai = ic_tipe.sort(function(a, b) {
                        return b.qth23 - a.qth23;
                    });
                    setKurs('')
                }
            }
            else if(year === 2022){
                if(fil === "jumlah" || pagiDef === ""){
                    nilai = ic_tipe.sort(function(a, b) {
                        return b.total22 - a.total22;
                    });
                    setKurs('Rp. ')
                }
                else if(fil === "harga"){
                    nilai = ic_tipe.sort(function(a, b) {
                        return b.th22 - a.th22;
                    });
                    setKurs('Rp. ')
                }
                else{
                    nilai = ic_tipe.sort(function(a, b) {
                        return b.qth22 - a.qth22;
                    });
                    setKurs('')
                }
            }
            else{
                if(fil === "jumlah" || pagiDef === ""){
                    nilai = postIds.sort(function(a, b) {
                        return b.total21 - a.total21;
                    });
                    setKurs('Rp. ')
                }
                else if(fil === "harga"){
                    nilai = postIds.sort(function(a, b) {
                        return b.th21 - a.th21;
                    });
                    setKurs('Rp. ')
                }
                else{
                    nilai = postIds.sort(function(a, b) {
                        return b.qth21 - a.qth21;
                    });
                    setKurs('')
                }
            }
        }
        // console.log(nilai)
        let detail = []
        if(parseInt(nil) === 0){
            detail = nilai
        }
        else if(parseInt(nil) === 1){
            if(fil === "jumlah"){
                detail = nilai.sort(function(a, b) {
                    let nilai = parseFloat(a.p_jum24)
                    let nilai1 = parseFloat(b.p_jum24);
                    return nilai1 - nilai;
                });
                setKurs('Rp. ')
            }
            else if(fil === "harga"){
                detail = nilai.sort(function(a, b) {
                    let nilai = parseFloat(a.p_hrg24)
                    let nilai1 = parseFloat(b.p_hrg24);
                    return nilai1 - nilai;
                });
                setKurs('Rp. ')
            }
            else{
                detail = nilai.sort(function(a, b) {
                    let nilai = parseFloat(a.p_qty24)
                    let nilai1 = parseFloat(b.p_qty24);
                    return nilai1 - nilai;
                });
                setKurs('')
            }
        }
        else if(parseInt(nil) ===2){
            if(fil === "jumlah"){
                detail = nilai.sort(function(a, b) {
                    let nilai = parseFloat(a.p_jum24)
                    let nilai1 = parseFloat(b.p_jum24);
                    return nilai - nilai1;
                });
                setKurs('Rp. ')
            }
            else if(fil === "harga"){
                detail = nilai.sort(function(a, b) {
                    let nilai = parseFloat(a.p_hrg24)
                    let nilai1 = parseFloat(b.p_hrg24);
                    return nilai - nilai1;
                });
                setKurs('Rp. ')
            }
            else{
                detail = nilai.sort(function(a, b) {
                    let nilai = parseFloat(a.p_qty24)
                    let nilai1 = parseFloat(b.p_qty24);
                    return nilai - nilai1;
                });
                setKurs('')
            }
        }
        else{console.log("Log")}
        let datas = [];
        for(let x= 0; x < detail.length; x++){
            if(year === 2024){
                datas.push({ item: detail[x].item, harga : detail[x].th24 , qty : detail[x].qth24, total : detail[x].total24, satuan : detail[x].satuan, tipe : detail[x].tipe, p_jum24 : detail[x].p_jum24, p_jum23 : detail[x].p_jum23, p_jum22 : detail[x].p_jum22, p_jum21 : detail[x].p_jum21, p_hrg24 : detail[x].p_hrg24, p_hrg23 : detail[x].p_hrg23, p_hrg22 : detail[x].p_hrg22, p_hrg21 : detail[x].p_hrg21,p_qty24 : detail[x].p_qty24, p_qty23 : detail[x].p_qty23, p_qty22 :detail[x].p_qty22, p_qty21 : detail[x].p_qty21 })
            }
            else if(year === 2023){
                datas.push({ item: detail[x].item, harga : detail[x].th23 , qty : detail[x].qth23, total : detail[x].total23, satuan : detail[x].satuan, tipe : detail[x].tipe, p_jum24 : detail[x].p_jum24, p_jum23 : detail[x].p_jum23, p_jum22 : detail[x].p_jum22, p_jum21 : detail[x].p_jum21, p_hrg24 : detail[x].p_hrg24, p_hrg23 : detail[x].p_hrg23, p_hrg22 : detail[x].p_hrg22, p_hrg21 : detail[x].p_hrg21,p_qty24 : detail[x].p_qty24, p_qty23 : detail[x].p_qty23, p_qty22 :detail[x].p_qty22, p_qty21 : detail[x].p_qty21})
            }
            else if(year === 2022){
                datas.push({ item: detail[x].item, harga : detail[x].th22 , qty : detail[x].qth22, total : detail[x].total22, satuan : detail[x].satuan, tipe : detail[x].tipe, p_jum24 : detail[x].p_jum24, p_jum23 : detail[x].p_jum23, p_jum22 : detail[x].p_jum22, p_jum21 : detail[x].p_jum21, p_hrg24 : detail[x].p_hrg24, p_hrg23 : detail[x].p_hrg23, p_hrg22 : detail[x].p_hrg22, p_hrg21 : detail[x].p_hrg21,p_qty24 : detail[x].p_qty24, p_qty23 : detail[x].p_qty23, p_qty22 :detail[x].p_qty22, p_qty21 : detail[x].p_qty21})
            }
            else{
                datas.push({item: detail[x].item, harga : detail[x].th21 , qty : detail[x].qth21, total : detail[x].total21, satuan : detail[x].satuan, tipe : detail[x].tipe, p_jum24 : detail[x].p_jum24, p_jum23 : detail[x].p_jum23, p_jum22 : detail[x].p_jum22, p_jum21 : detail[x].p_jum21, p_hrg24 : detail[x].p_hrg24, p_hrg23 : detail[x].p_hrg23, p_hrg22 : detail[x].p_hrg22, p_hrg21 : detail[x].p_hrg21,p_qty24 : detail[x].p_qty24, p_qty23 : detail[x].p_qty23, p_qty22 :detail[x].p_qty22, p_qty21 : detail[x].p_qty21})
            }
            
        }
        // console.log(datas)
        setFileName(datas);
    }




    const handleShow = (e) =>{
        if(e === ""){
            console.log(e)
        }
        else{
            setShow(true);
            const data = dataDashboard.data;
            let listData =  data.filter((d) => d.item === e);
            let keys = Object.keys(listData[0]);
            let d2021 =[];
            let d2022 =[];
            let d2023 =[];
            let d2024 =[];
            
            if(pagiDef === "" || pagiDef === "jumlah" ||pagiDef === "harga"){
                keys.forEach(function (key) {
                    labels.map((d)=>{
                        let nilai = 0
                        if(d === key){
                            nilai = 0;
                            if(listData[0][key].th21 === ''){nilai =0}else{nilai =listData[0][key].th21}
                            return(
                                d2021.push(nilai)
                            )
                        }
                        else{
                            nilai = 0
                            return(
                                console.log('')
                            )
                        }
                        
                    })
                });
                keys.forEach(function (key) {
                    labels.map((d)=>{
                        let nilai = 0
                        if(d === key){
                            nilai = 0;
                            if(listData[0][key].th22 === ''){nilai = 0}else{nilai =listData[0][key].th22}
                            return(
                                d2022.push(nilai)
                            )
                        }
                        else{
                            nilai = 0
                            return(
                                console.log('')
                            )
                        }
                        
                    })
                });
                keys.forEach(function (key) {
                    labels.map((d)=>{
                        let nilai = 0
                        if(d === key){
                            nilai = 0;
                            if(listData[0][key].th23 === ''){nilai = 0}else{nilai =listData[0][key].th23}
                            return(
                                d2023.push(nilai)
                            )
                        }
                        else{
                            nilai = 0
                            return(
                                console.log('')
                            )
                        }
                        
                    })
                });
                keys.forEach(function (key) {
                    labels.map((d)=>{
                        let nilai = 0
                        if(d === key){
                            nilai = 0;
                            if(listData[0][key].th24 === ''){nilai = 0}else{nilai =listData[0][key].th24}
                            return(
                                d2024.push(nilai)
                            )
                        }
                        else{
                            nilai = 0
                            return(
                                console.log('')
                            )
                        }
                        
                    })
                });
            }
            else{
                keys.forEach(function (key) {
                    labels.map((d)=>{
                        let nilai = 0
                        if(d === key){
                            nilai = 0;
                            if(listData[0][key].qth21 === ''){nilai =0}else{nilai =listData[0][key].qth21}
                            return(
                                d2021.push(nilai)
                            )
                        }
                        else{
                            nilai = 0
                            return(
                                console.log('')
                            )
                        }
                        
                    })
                });
                keys.forEach(function (key) {
                    labels.map((d)=>{
                        let nilai = 0
                        if(d === key){
                            nilai = 0;
                            if(listData[0][key].qth22 === ''){nilai = 0}else{nilai =listData[0][key].qth22}
                            return(
                                d2022.push(nilai)
                            )
                        }
                        else{
                            nilai = 0
                            return(
                                console.log('')
                            )
                        }
                        
                    })
                });
                keys.forEach(function (key) {
                    labels.map((d)=>{
                        let nilai = 0
                        if(d === key){
                            nilai = 0;
                            if(listData[0][key].qth23 === ''){nilai = 0}else{nilai =listData[0][key].qth23}
                            return(
                                d2023.push(nilai)
                            )
                        }
                        else{
                            nilai = 0
                            return(
                                console.log('')
                            )
                        }
                        
                    })
                });
                keys.forEach(function (key) {
                    labels.map((d)=>{
                        let nilai = 0
                        if(d === key){
                            nilai = 0;
                            if(listData[0][key].qth24 === ''){nilai = 0}else{nilai =listData[0][key].qth24}
                            return(
                                d2024.push(nilai)
                            )
                        }
                        else{
                            nilai = 0
                            return(
                                console.log('')
                            )
                        }
                        
                    })
                });
            }

            const sum = d2021.reduce((a, b) => a + b, 0);
            const tSum = (parseFloat(sum / 12).toFixed(2));
            d2021.push(parseFloat(tSum));
            const sum1 = d2022.reduce((a, b) => a + b, 0);
            const tSum1 = (parseFloat(sum1 / 12).toFixed(2));
            d2022.push(parseFloat(tSum1));
            const sum2 = d2023.reduce((a, b) => a + b, 0);
            const tSum2 = (parseFloat(sum2 / 12).toFixed(2));
            d2023.push(parseFloat(tSum2));
            const sum3 = d2023.reduce((a, b) => a + b, 0);
            const tSum3 = (parseFloat(sum3 / 12).toFixed(2));
            d2024.push(parseFloat(tSum3));
            setThn1(d2021);
            setThn2(d2022);
            setThn3(d2023);
            setThn4(d2024);
        }
        
    }

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
          datalabels: {
            display: false
          },
          title: {
            display: false,
            text: 'Chart.js Line Chart',
          },
        },
    };
      
    const data = {
    labels,
    datasets: [
        {
        label: 'Tahun 2021',
        data : thn1,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
        label: 'Tahun 2022',
        data : thn2,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
        {
        label: 'Tahun 2023',
        data : thn3,
        borderColor: '#3eeb35',
        backgroundColor: '#35eb3580',
        },
        {
        label: 'Tahun 2024',
        data : thn4,
        borderColor: '#EBF400',
        backgroundColor: '#EBF400',
        },
    ],
    };
  return (
    <>
    <div className="card bg-white p-2 mb-2" style={{width: screenWidth}}>
        
        <Stack direction="horizontal" gap={3} style={{padding: "0px 10px 0px 10px"}}>
          <div className="bg-body">
          <h5 style={{textAlign: 'center'}}>List Montly Purchasing</h5>
          </div>
          <div className="ms-auto">
            <div className='row' style={{marginRight: 10, display:'flex'}}>
            <div className='col-xl-8 col-lg-6 mb-0'>
                <Pagination size="sm">
                    <Pagination.Item 
                        active={pagiJum}
                        onClick={(e)=>{
                            setPagiDef('jumlah');
                            onGridReady(month,isTipe,'jumlah',radioValue);
                        }}
                    >
                        Total
                    </Pagination.Item>
                    <Pagination.Item 
                        active={pagiHarga}
                        onClick={(e)=>{
                            setPagiDef('harga');
                            onGridReady(month,isTipe,'harga',radioValue);
                        }}
                    >
                        Harga
                    </Pagination.Item>
                    <Pagination.Item 
                        active={pagiQty}
                        onClick={(e)=>{
                            setPagiDef('qty');
                            onGridReady(month,isTipe,'qty',radioValue);
                        }}
                    >
                        Qty
                    </Pagination.Item>
                </Pagination>
            </div>
            <div className='col-xl-4 col-lg-6 mb-0'>
                <Dropdown as={ButtonGroup} size="sm">
                    <Button variant="primary">Filter</Button>

                    <Dropdown.Toggle split variant="primary" id="dropdown-split-basic" />

                    <Dropdown.Menu>
                        <Dropdown.Item 
                            onClick={()=>{
                                onGridReady(month,'',pagiDef,radioValue);
                                setIsTipe('')
                            }}
                        >Semua</Dropdown.Item>
                        <Dropdown.Item 
                            onClick={()=>{
                                onGridReady(month,'CHEMICAL',pagiDef,radioValue);
                                setIsTipe('CHEMICAL')
                            }}
                        >Chemical</Dropdown.Item>
                        <Dropdown.Item 
                            onClick={()=>{
                                onGridReady(month,'INGREDIENTS',pagiDef,radioValue);
                                setIsTipe('INGREDIENTS')
                            }}
                        >Inggredient</Dropdown.Item>
                        <Dropdown.Item 
                            onClick={()=>{
                                onGridReady(month,'PACKAGING',pagiDef,radioValue);
                                setIsTipe('PACKAGING')
                            }}
                        >Packaging</Dropdown.Item>
                        <Dropdown.Item 
                            onClick={()=>{
                                onGridReady(month,'RAWMAT',pagiDef,radioValue);
                                setIsTipe('RAWMAT')
                            }}
                        >Raw Material</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            </div>
          </div>
          <div className="vr" />
          <div className="bg-body">
            <div class="d-flex align-items-center justify-content-between mb-2">
                
                <Form.Control
                    type="month"
                    className='text-center border border-primary text-primary'
                    value={month}
                    min="2020-08"
                    onChange={(e) =>{
                        setMonth(e.target.value);
                        onGridReady(e.target.value,isTipe,pagiDef,radioValue)
                    }}
                />

            </div>
          </div>
        </Stack>
        <Row>
            <Col xs={2} >
                <ButtonGroup>
                    {radios.map((radio, idx) =>{ 
                        return(
                            <ToggleButton
                                key={idx}
                                id={`radio-${idx}`}
                                type="radio"
                                variant={idx === 0 ? "outline-secondary" : idx === 1 ? 'outline-success' : 'outline-danger'}
                                name="radio"
                                value={radio.value}
                                checked={radioValue === radio.value}
                                onChange={(e) => {
                                    setRadioValue(e.currentTarget.value);
                                    onGridReady(month,isTipe,pagiDef,e.currentTarget.value);
                                }}
                                size="sm"
                            >
                                {radio.name}&nbsp;
                                <i className={radio.icon}></i>
                            </ToggleButton>
                    )})}
                </ButtonGroup>
            </Col>
            <Col xs={10}></Col>
        </Row>
        


        
        <div className="d-flex flex-row flex-nowrap overflow-auto  m-1" >
            {fileName.map((e, i) =>{
                let stn = false;
                let nilai = 0;
                if(pagiDef === 'jumlah'){
                    nilai = e.total;
                }
                else if(pagiDef === 'harga'){
                    nilai = e.harga;
                }
                else{
                    nilai = e.qty;
                    stn = true
                }
                const date = new Date(month)
                const yy = date.getFullYear(date)
                let presentase = 0;
                let warna = 'secondary';
                let icon = '';
                if(yy === 2024){
                    if(pagiDef === 'jumlah'){
                        presentase = e.p_jum24;
                    }
                    else if(pagiDef === 'harga'){
                        presentase = e.p_hrg24;
                    }
                    else{
                        presentase = e.p_qty24;
                    }
                }
                else if(yy === 2023){
                    if(pagiDef === 'jumlah'){
                        presentase = e.p_jum24;
                    }
                    else if(pagiDef === 'harga'){
                        presentase = e.p_hrg24;
                    }
                    else{
                        presentase = e.p_qty24;
                    }
                }
                else if(yy === 2022){
                    if(pagiDef === 'jumlah'){
                        presentase = e.p_jum24;
                    }
                    else if(pagiDef === 'harga'){
                        presentase = e.p_hrg24;
                    }
                    else{
                        presentase = e.p_qty24;
                    }
                }
                else{
                    presentase = 0
                }
                
                if(parseFloat(presentase) === 0){
                    warna = 'secondary'
                    icon =''
                }
                else{
                    if(parseFloat(presentase) < 0){ 
                        warna = 'danger'
                        icon = 'bi bi-chevron-double-down'
                    }
                    else{
                        warna='success'
                        icon = 'bi bi-chevron-double-up'
                    }
                }
                return(
                    <>
                    {/* <div className="card bg-white p-2 m-2" style={{minWidth: '300px', minHeight: '70px'}}>
                        <Button 
                            variant="primary" 
                            size="sm" 
                            className='mb-1' 
                            style={{width: '30px'}} 
                            onClick={(x)=>{
                                setNabar(e.item)
                                handleShow(e.item)
                            }}
                        >
                            <i className="bi bi-graph-up"></i>
                        </Button>
                        <h6 style={{textAlign: 'center'}}>{e.item}</h6>
                        <h5 style={{textAlign: 'center',marginBottom: '10px'}}>
                            <NumericFormat value={nilai} displayType={'text'} thousandSeparator={true} prefix={kurs} />
                            &nbsp;
                            {!stn ? "" : `${e.satuan}`}
                        </h5>
                        <div className="position-absolute bottom-0 end-0 px-2 p-2 mt-5">
                            
                            <Badge bg={warna}>
                                <i className={icon}></i>
                                {presentase}&nbsp;%
                            </Badge>
                        </div>
                    
                    </div>  */}
                    <div className="card bg-white p-2 m-2" style={{minWidth: '300px', minHeight: '70px'}}>
                        <Row>
                            <Col xs={2}>
                                <Button 
                                    variant="primary" 
                                    size="sm" 
                                    className='mb-1' 
                                    style={{width: '30px'}} 
                                    onClick={(x)=>{
                                        setNabar(e.item)
                                        handleShow(e.item)
                                    }}
                                >
                                    <i className="bi bi-graph-up"></i>
                                </Button>
                            </Col>
                            <Col xs={10}>
                                    <p style={{textAlign: 'center', fontSize: '0.9em',marginBottom: '5px'}}><b>{e.item}</b></p>
                                    <p style={{textAlign: 'center', fontSize: '0.9em',marginBottom: '15px'}}>
                                        <b>
                                            <NumericFormat value={nilai} displayType={'text'} thousandSeparator={true} prefix={kurs} />
                                            &nbsp;
                                            {!stn ? "" : `${e.satuan}`}
                                        </b>
                                    </p>
                            </Col>
                        </Row>

                        <div className="position-absolute bottom-0 end-0 px-2 p-2 mt-5">
                            <Badge bg={warna}>
                                <i className={icon}></i>
                                {presentase}&nbsp;%
                            </Badge>
                        </div>
                    </div>
                    </>
                )}
            )}
                       
        </div>
    </div>

    <Modal
        show={show}
        onHide={handleClose}
        keyboard={true}
        size="lg"
        centered
      >
        <Modal.Body>
            <div class="d-flex align-items-center justify-content-between mb-2">
                <h6>REPORT PER TAHUN PURCHASING - HARGA {nabar}</h6>
            </div>
            <Line options={options} data={data} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {isLoading ? <LoadingPage/> : ""}
    </>
  )
}
