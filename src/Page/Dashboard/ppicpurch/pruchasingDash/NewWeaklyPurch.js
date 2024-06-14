import React, { useEffect, useState } from 'react';
import Swal from "sweetalert2";
import Select from 'react-select';
import { Card, Col, Row } from 'react-bootstrap'
import Chart from 'react-apexcharts';
import { LoadingPage } from '../../../../LoadingPage/LoadingPage';
import useDashboardStore, { selectDashPurchW, selectFetchWPurch, selectPurchWReady, selectDashPurchY, selectFetchYdash, selectPurchYReady } from '../../../../store/dataDashboard';

const moon = ['JANUARI', 'FEBRUARI', 'MARET', 'APRIL', 'MEI', 'JUNI', 'JULI', 'AGUSTUS', 'SEPTEMBER', 'OKTOBER', 'NOVEMBER', 'DESEMBER']
const labels = ['januari', 'februari', 'maret', 'april', 'mei', 'juni', 'juli','agustus','september','oktober','november','desember','avg'];

export const NewWeaklyPurch = (props) => {
    const onDashboard = useDashboardStore(selectFetchWPurch);
    const dataDashboard = useDashboardStore(selectDashPurchW);
    const dashboardReady = useDashboardStore(selectPurchWReady);
    
    const onPurchY = useDashboardStore(selectFetchYdash);
    const purchYDashboard = useDashboardStore(selectDashPurchY);
    const purchYdReady = useDashboardStore(selectPurchYReady);

    const [month, setMonth] = useState();
    const [naMat, setnaMat] = useState(props.name);
    const [bulan, setBulan] = useState([]);
    const [tahun, setTahun] = useState('');
    
    const [week1, setWeek1] = useState([]);
    const [week2, setWeek2] = useState([]);
    const [week3, setWeek3] = useState([]);
    const [week4, setWeek4] = useState([]);
    
    const [thn1, setThn1] = useState([]);
    const [thn2, setThn2] = useState([]);
    const [thn3, setThn3] = useState([]);
    const [thn4, setThn4] = useState([]);

    const [avg, setAvg] = useState([]);
    const [item, setItem] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [dataReady, setDataReady] = useState(false);
    
    useEffect(() => { 
        setIsLoading(true);
        const date = new Date();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        let bb = String(month).padStart(2, '0');
        setMonth(`${year}`);
        setBulan(`${moon[bb -1]} ${year}`)
        setTahun(`${year}`)
        onDashboard()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => { 
        setIsLoading(true);
        onDashboard()
        onPurchY()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    useEffect (() => {
        if(!dataReady) return;
        const gntiDta = async () =>{
            try {
            setIsLoading(true);
            console.log(props)
            setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
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

    useEffect(() => {
        if (!dashboardReady) return;
        onGridReady(0)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dashboardReady]);

    useEffect(() => {
        if (!purchYdReady) return;
        onGridReadys(0)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [purchYdReady]);

    const onGridReadys = (x) =>{
        setIsLoading(false); 
        const data = purchYDashboard.data;
        // console.log(data)
        const resultItem = data.filter((v,i,a)=>a.findIndex(v2=>(v2.item===v.item))===i);
        let material = resultItem.map(d => { 
            return {value:  d.item.trim(), label: d.item.trim()}
          });
          setItem(material)
    }

    const onGridReady = () =>{
        setIsLoading(false); 
        const data = dataDashboard.data;
        const data1 = purchYDashboard.data;
        let listData = [];
        let listData1 = [];
        if(dataReady){
            listData =data.filter((d) => d.item === naMat);
            listData1 =data1.filter((d) => d.item === naMat);
        }
        else{
            listData =data.filter((d) => d.item === props.name);
            listData1 =data1.filter((d) => d.item === props.name);
        }

        console.log(listData1)
        
        let dWeek1 = listData.map((d)=>{
            let nilai = 0
            if(month === "2023"){
                if(d.week1 === ''){nilai = 0}else{ nilai = parseFloat(d.week1)}
            }
            else if(month === "2024"){
                if(d.weeks1 === ''){nilai = 0}else{ nilai = parseFloat(d.weeks1)}
            }
            else{
                nilai = 0
            }
            return(
                nilai
            )
        })
        let dWeek2 = listData.map((d)=>{
            let nilai = 0
            if(month === "2023"){
                if(d.week2 === ''){nilai = 0}else{ nilai = parseFloat(d.week2)}
            }
            else if(month === "2024"){
                if(d.weeks2 === ''){nilai = 0}else{ nilai = parseFloat(d.weeks2)}
            }
            else{
                nilai = 0
            }
            return(
                nilai
            )
        })
        let dWeek3 = listData.map((d)=>{
            let nilai = 0
            if(month === "2023"){
                if(d.week3 === ''){nilai = 0}else{ nilai = parseFloat(d.week3)}
            }
            else if(month === "2024"){
                if(d.weeks3 === ''){nilai = 0}else{ nilai = parseFloat(d.weeks3)}
            }
            else{
                nilai = 0
            }
            return(
                nilai
            )
        })
        let dWeek4 = listData.map((d)=>{
            let nilai = 0;
            if(month === "2023"){
                if(d.week4 === ''){nilai = 0}else{ nilai = parseFloat(d.week4)}
            }
            else if(month === "2024"){
                if(d.weeks4 === ''){nilai = 0}else{ nilai = parseFloat(d.weeks4)}
            }
            else{
                nilai = 0
            }
            return(
                nilai
            )
        })
        let dAvg = listData.map((d)=>{
            let nilai = 0;
            if(month === "2023"){
                if(d.avg === ''){nilai = 0}else{ nilai = parseFloat(d.avg)}
            }
            else if(month === "2024"){
                if(d.avgs === ''){nilai = 0}else{ nilai = parseFloat(d.avgs)}
            }
            else{
                nilai = 0
            }
            return(
                nilai
            )
        })
        setWeek1(dWeek1);
        setWeek2(dWeek2);
        setWeek3(dWeek3);
        setWeek4(dWeek4);
        setAvg(dAvg);

        if(listData1.length > 0){
            let keys = Object.keys(listData1[0]);
            let d2021 =[];
            let d2022 =[];
            let d2023 =[];
            let d2024 =[];
            
            keys.forEach(function (key) {
                labels.map((d)=>{
                    let nilai = 0
                    if(d === key){
                        nilai = 0;
                        if(listData1[0][key].th21 === ''){nilai =0}else{nilai =listData1[0][key].th21}
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
                        if(listData1[0][key].th22 === ''){nilai = 0}else{nilai =listData1[0][key].th22}
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
                        if(listData1[0][key].th23 === ''){nilai = 0}else{nilai =listData1[0][key].th23}
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
                        if(listData1[0][key].th24 === ''){nilai = 0}else{nilai =listData1[0][key].th24}
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

            const sum = d2021.reduce((a, b) => a + b, 0);
            const tSum = (parseFloat(sum / 12).toFixed(2));
            d2021.push(parseFloat(tSum));
            const sum1 = d2022.reduce((a, b) => a + b, 0);
            const tSum1 = (parseFloat(sum1 / 12).toFixed(2));
            d2022.push(parseFloat(tSum1));
            const sum2 = d2023.reduce((a, b) => a + b, 0);
            const tSum2 = (parseFloat(sum2 / 12).toFixed(2));
            d2023.push(parseFloat(tSum2));
            const sum3 = d2024.reduce((a, b) => a + b, 0);
            const tSum3 = (parseFloat(sum3 / 12).toFixed(2));
            d2023.push(parseFloat(tSum3));
            
            setThn1(d2021);
            setThn2(d2022);
            setThn3(d2023);
            setThn4(d2024);
        }
    }
    const series = [{
            name: 'WEEK 1',
            type: 'column',
            data: week1
        },
        {
            name: 'WEEK 2',
            type: 'column',
            data: week2
        },
        {
            name: 'WEEK 3',
            type: 'column',
            data: week3
        },
        {
            name: 'Avg',
            type: 'line',
            data: avg
        },
        {
            name: 'WEEK 4',
            type: 'column',
            data: week4
        },
    ]
    const series1 = [
        {
          name: "Tahun 2021",
          data: thn1
        },
        {
          name: "Tahun 2022",
          data: thn2
        },
        {
            name: "Tahun 2023",
            data: thn3
          },
          {
            name: "Tahun 2024",
            data: thn4
          }
    ]
    const options = {
        chart: {
          type: 'bar',
          height: 350
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded'
          },
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Des'],
        },
        yaxis: {
          title: {
            text: 'Harga Satuan'
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return "Rp." + val
            }
          }
        }
      }

    const options1 = {
        chart: {
          type: 'line',
          height: 350
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded'
          },
        },
        dataLabels: {
          enabled: true
        },
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Des', 'Avg'],
        },
        yaxis: {
          title: {
            text: 'Harga Satuan'
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return "Rp." + val
            }
          }
        }
      }

    /* {
        chart: {
          height: 350,
          type: 'bar',
        },
        stroke: {
          width: [0, 4]
        },
        title: {
          text: ''
        },
        dataLabels: {
          enabled: true,
          enabledOnSeries: [3]
        },
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep','Okt','Nov','Des']
        },
        yaxis: [{
          title: {
            text: 'Harga Satuan',
          },
        
        }, ]
    } */
    const handleSelect = (e) =>{
        console.log(e.value)
    }
  return (
    <>
    <Card className='p-2 m-1'>
        <Row>
            <Col xs={6} sm={6} lg={6}>
                <h6>REPORT PER MINGGU PURCHASING - HARGA {bulan}</h6>
            </Col>
            <Col xs={6} sm={6} lg={6}>
                <Select
                    className="basic-single"
                    classNamePrefix="select"
                    value={dataReady ? 
                        item.filter(function(option) {
                            return option.value === naMat;
                        })
                        :
                        item.filter(function(option) {
                            return option.value === props.name;
                        })
                        
                    }
                    isClearable={false}
                    isSearchable={true}
                    name="color"
                    options={item}
                    onChange={e => {
                        handleSelect(e)
                        setnaMat(e.value)
                        props.sendToParent(e.value)
                        setDataReady(true)
                        onGridReady()
                    }}
                />
            </Col>
        </Row>
    
        <Chart options={options} series={series} type="line" height={350} />
    </Card>

    
    <Card className='p-2 m-1'>
        <Row>
            <Col xs={6} sm={6} lg={6}>
                <h6>REPORT PER TAHUN PURCHASING - HARGA {tahun}</h6>
            </Col>
            <Col xs={6} sm={6} lg={6}>
                <Select
                    className="basic-single"
                    classNamePrefix="select"
                    value={dataReady ? 
                        item.filter(function(option) {
                            return option.value === naMat;
                        })
                        :
                        item.filter(function(option) {
                            return option.value === props.name;
                        })
                        
                    }
                    isClearable={false}
                    isSearchable={true}
                    name="color"
                    options={item}
                    onChange={e => {
                        handleSelect(e)
                        setnaMat(e.value)
                        props.sendToParent(e.value)
                        setDataReady(true)
                        onGridReady()
                    }}
                />
            </Col>
        </Row>
    
        <Chart options={options1} series={series1} type="line" height={350} />
    </Card>

    {isLoading ? <LoadingPage /> : ""}
    </>
  )
}
