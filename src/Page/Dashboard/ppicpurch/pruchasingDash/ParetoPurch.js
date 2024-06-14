import React, {useState, useEffect} from 'react';
import { Badge, Button, ButtonGroup, Dropdown, Form, ListGroup, Pagination } from 'react-bootstrap';
import { NumericFormat } from 'react-number-format';
import { LoadingPage } from '../../../../LoadingPage/LoadingPage';
import useDashboardStore, { selectDashPurchY,selectFetchYdash,selectPurchYReady } from '../../../../store/dataDashboard';

export const ParetoPurch = (props) => {
  const onDashboard = useDashboardStore(selectFetchYdash);
  const dataDashboard = useDashboardStore(selectDashPurchY);
  const dashboardReady = useDashboardStore(selectPurchYReady);

  const [month, setMonth] = useState();
  const [isTipe, setIsTipe] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [pagiJum, setPagiJum] = useState(true);
  const [pagiHarga, setPagiHarga] = useState(false);
  const [pagiQty, setPagiQty] = useState(false);
  const [fileName, setFileName] = useState([]);
  const [kurs, setKurs] = useState('Rp. ');
  const [pagiDef, setPagiDef] = useState('jumlah');

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
      onGridReady(date,'','jumlah')
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dashboardReady]);

  const onGridReady = (tgl,tipe,fil) =>{
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
            if(fil === "jumlah" || pagiDef === ""){
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
            if(fil === "jumlah" || pagiDef === ""){
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
    let datas = [];
    let jm = 0;
    if(nilai.length <=10){jm = nilai.length} else {jm = 10};
    for(let x= 0; x < jm; x++){
        if(year === 2024){
            datas.push({ item: nilai[x].item, harga : nilai[x].th24 , qty : nilai[x].qth24, total : nilai[x].total24, satuan : nilai[x].satuan, tipe : nilai[x].tipe, p_jum24 : nilai[x].p_jum24, p_jum23 : nilai[x].p_jum23, p_jum22 : nilai[x].p_jum22, p_jum21 : nilai[x].p_jum21, p_hrg24 : nilai[x].p_hrg24, p_hrg23 : nilai[x].p_hrg23, p_hrg22 : nilai[x].p_hrg22, p_hrg21 : nilai[x].p_hrg21,p_qty24 : nilai[x].p_qty24, p_qty23 : nilai[x].p_qty23, p_qty22 :nilai[x].p_qty22, p_qty21 : nilai[x].p_qty21 })
        }
        else if(year === 2023){
            datas.push({ item: nilai[x].item, harga : nilai[x].th23 , qty : nilai[x].qth23, total : nilai[x].total23, satuan : nilai[x].satuan, tipe : nilai[x].tipe, p_jum24 : nilai[x].p_jum24, p_jum23 : nilai[x].p_jum23, p_jum22 : nilai[x].p_jum22, p_jum21 : nilai[x].p_jum21, p_hrg24 : nilai[x].p_hrg24, p_hrg23 : nilai[x].p_hrg23, p_hrg22 : nilai[x].p_hrg22, p_hrg21 : nilai[x].p_hrg21,p_qty24 : nilai[x].p_qty24, p_qty23 : nilai[x].p_qty23, p_qty22 :nilai[x].p_qty22, p_qty21 : nilai[x].p_qty21})
        }
        else if(year === 2022){
            datas.push({ item: nilai[x].item, harga : nilai[x].th22 , qty : nilai[x].qth22, total : nilai[x].total22, satuan : nilai[x].satuan, tipe : nilai[x].tipe, p_jum24 : nilai[x].p_jum24, p_jum23 : nilai[x].p_jum23, p_jum22 : nilai[x].p_jum22, p_jum21 : nilai[x].p_jum21, p_hrg24 : nilai[x].p_hrg24, p_hrg23 : nilai[x].p_hrg23, p_hrg22 : nilai[x].p_hrg22, p_hrg21 : nilai[x].p_hrg21,p_qty24 : nilai[x].p_qty24, p_qty23 : nilai[x].p_qty23, p_qty22 :nilai[x].p_qty22, p_qty21 : nilai[x].p_qty21})
        }
        else{
            datas.push({item: nilai[x].item, harga : nilai[x].th21 , qty : nilai[x].qth21, total : nilai[x].total21, satuan : nilai[x].satuan, tipe : nilai[x].tipe, p_jum24 : nilai[x].p_jum24, p_jum23 : nilai[x].p_jum23, p_jum22 : nilai[x].p_jum22, p_jum21 : nilai[x].p_jum21, p_hrg24 : nilai[x].p_hrg24, p_hrg23 : nilai[x].p_hrg23, p_hrg22 : nilai[x].p_hrg22, p_hrg21 : nilai[x].p_hrg21,p_qty24 : nilai[x].p_qty24, p_qty23 : nilai[x].p_qty23, p_qty22 :nilai[x].p_qty22, p_qty21 : nilai[x].p_qty21})
        }
        
    }

    setFileName(datas);
      
  }

  return (
    <>
        <h6 className=''>Top 10 Monthly Purchashing</h6>
        <div class="d-flex align-items-center justify-content-between mb-2">
            
            <Form.Control
                type="month"
                className='text-center border border-primary text-primary'
                value={month}
                min="2020-08"
                onChange={(e) =>{
                    setMonth(e.target.value);
                    onGridReady(e.target.value,isTipe,pagiDef)
                }}
            />

        </div>
        <div className='row'>
            <div className='col-xl-6 col-lg-6 col-sm-6 mb-0'>
                <Pagination size="sm">
                    <Pagination.Item 
                        active={pagiJum}
                        onClick={(e)=>{
                            setPagiDef('jumlah');
                            onGridReady(month,isTipe,'jumlah');
                        }}
                    >
                        Total
                    </Pagination.Item>
                    <Pagination.Item 
                        active={pagiHarga}
                        onClick={(e)=>{
                            setPagiDef('harga');
                            onGridReady(month,isTipe,'harga');
                        }}
                    >
                        Harga
                    </Pagination.Item>
                    <Pagination.Item 
                        active={pagiQty}
                        onClick={(e)=>{
                            setPagiDef('qty');
                            onGridReady(month,isTipe,'qty');
                        }}
                    >
                        Qty
                    </Pagination.Item>
                </Pagination>
            </div>
            <div className='col-xl-6 col-lg-6 col-sm-6 mb-0'>
                <Dropdown as={ButtonGroup} size="sm">
                    <Button variant="primary">Filter</Button>

                    <Dropdown.Toggle split variant="primary" id="dropdown-split-basic" />

                    <Dropdown.Menu>
                        <Dropdown.Item 
                            onClick={()=>{
                                onGridReady(month,'',pagiDef);
                                setIsTipe('')
                            }}
                        >Semua</Dropdown.Item>
                        <Dropdown.Item 
                            onClick={()=>{
                                onGridReady(month,'CHEMICAL',pagiDef);
                                setIsTipe('CHEMICAL')
                            }}
                        >Chemical</Dropdown.Item>
                        <Dropdown.Item 
                            onClick={()=>{
                                onGridReady(month,'INGREDIENTS',pagiDef);
                                setIsTipe('INGREDIENTS')
                            }}
                        >Inggredient</Dropdown.Item>
                        <Dropdown.Item 
                            onClick={()=>{
                                onGridReady(month,'PACKAGING',pagiDef);
                                setIsTipe('PACKAGING')
                            }}
                        >Packaging</Dropdown.Item>
                        <Dropdown.Item
                            onClick={()=>{
                                onGridReady(month,'RAWMAT',pagiDef);
                                setIsTipe('RAWMAT')
                            }}
                        >Raw Material</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
        

        <div style={{ maxHeight: "310px", overflowY: "auto" }}>
            <ListGroup className='h-75' numbered>
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
                        <ListGroup.Item
                            as="li"
                            className="d-flex justify-content-between align-items-start cekOut"
                            onClick={() => {props.sendToParent(e.item)}}
                        >
                            <div className="ms-2 me-auto">
                                <div className="fw-bold" style={{fontSize: '0.7em'}}>{e.item}</div>
                                <p style={{textAlign: 'center', fontSize: '0.9em',marginBottom: '5px'}}>
                                    <b>
                                        <NumericFormat value={nilai} displayType={'text'} thousandSeparator={true} prefix={kurs} />
                                        &nbsp;
                                        {!stn ? "" : `${e.satuan}`}
                                    </b>
                                </p>
                            </div>
                            <Badge bg={warna}>
                                <i className={icon}></i>
                                {presentase}&nbsp;%
                            </Badge>
                        </ListGroup.Item>
                    )}
                )}
            </ListGroup>
        </div>
        {isLoading ? <LoadingPage/> : ""}
    </>
  )
}
