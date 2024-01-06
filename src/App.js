import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { Dashboard } from './component/Dashboard';
import { Portofolio } from './Portofolio/Portofolio';
import PageNotFo from './component/PageNotFo';
import Home from './Page/Dashboard/Home';
import Profil from './Page/Profil/Profil';
import News from './Page/Bulletin/News';
import MenuCenter from './Page/MenuForm/MenuCenter';
import Pengadaan from './Forms/PengadaanBarang/Pengadaan';
import { CreatePengadaan } from './Forms/PengadaanBarang/CreatePengadaan';
import { UpdatePengadaan } from './Forms/PengadaanBarang/UpdatePengadaan';
import { VerifyPengadaan } from './Forms/PengadaanBarang/VerifyPengadaan';
import { PurcahsingOrder } from './Forms/PurchasingOrder/PurcahsingOrder';
import { CreatePo } from './Forms/PurchasingOrder/CreatePo';
import { ViewPo } from './Forms/PurchasingOrder/ViewPo';
import { PrintPo } from './Forms/PurchasingOrder/PrintPo';
import { KedatanganBarang } from './Forms/KedatanganBarang/KedatanganBarang';
import { ViewTerima } from './Forms/KedatanganBarang/ViewTerima';
import { LogBook } from './Forms/KedatanganBarang/LogBook';
import { ViewLogbook } from './Forms/KedatanganBarang/ViewLogbook';
import { LabelPrint } from './Forms/KedatanganBarang/LabelPrint';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard />} errorElement={<PageNotFo />}>
        <Route path='' element={<Home />}></Route>
        <Route path='/profile' element={<Profil />}></Route>
        <Route path='/news' element={<News />}></Route>
        <Route path='/form' element={<MenuCenter />} errorElement={<PageNotFo />}></Route>
        <Route path="/form/pengadaan" element={<Pengadaan />} /> 
        <Route path="/form/pengadaan/create" element={<CreatePengadaan />} /> 
        <Route path="/form/pengadaan/data" element={<UpdatePengadaan />} /> 
        <Route path="/form/pengadaan/verfikasi" element={<VerifyPengadaan />} /> 
        <Route path="/form/purchaseorder" element={<PurcahsingOrder />} /> 
        <Route path="/form/purchaseorder/create" element={<CreatePo />} />  
        <Route path="/form/purchaseorder/data" element={<ViewPo />} /> 
        <Route path="/form/purchaseorder/printview" element={<PrintPo />} /> 
        <Route path="/form/Kedatangan" element={<KedatanganBarang />} /> 
        <Route path="/form/Kedatangan/terimaview" element={<ViewTerima />} /> 
        <Route path="/form/Kedatangan/logbook" element={<LogBook />} /> 
        <Route path="/form/Kedatangan/logbookview" element={<ViewLogbook />} /> 
        <Route path="/form/Kedatangan/labelbarang" element={<LabelPrint />} /> 
        </Route>
        <Route path='/login' element={<Portofolio />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
