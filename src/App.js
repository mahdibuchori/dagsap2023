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
import { Karyawan } from './Forms/karyawan/Karyawan';
import { InputKaryawan } from './Forms/karyawan/InputKaryawan';
// import { EditPo } from './Forms/PurchasingOrder/EditPo';
import { UpdatePrevPengada } from './Forms/PengadaanBarang/UpdatePrevPengada';
import { CetakPengadaan } from './Forms/PengadaanBarang/CetakPengadaan';
import { Okp } from './Forms/okp/Okp';
import { CetakOkp } from './Forms/okp/CetakOkp';
import { InputOkp } from './Forms/okp/InputOkp';
import { VerifikasiPo } from './Forms/PurchasingOrder/VerifikasiPo';
import { ReloadPo } from './Forms/PurchasingOrder/ReloadPo';
import { TableAddRemove } from './Forms/PengadaanBarang/TableAddRemove';
import { NewEditPo } from './Forms/PurchasingOrder/NewEditPo';
import { TabelExpro } from './Forms/EksternalProvider/TabelExpro';
import { TabelMaterial } from './Forms/Material/TabelMaterial';
import { TabelDepartemen } from './Forms/Departemen/TabelDepartemen';
import { TableDokumen } from './Forms/Dokumen/TableDokumen';
import { CreateDokumen } from './Forms/Dokumen/CreateDokumen';
import { EditDokumen } from './Forms/Dokumen/EditDokumen';
import { PrintDokumen } from './Forms/Dokumen/PrintDokumen';

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
        <Route path="/form/pengadaan/update" element={<UpdatePrevPengada />} />
        <Route path="/form/pengadaan/verfikasi" element={<VerifyPengadaan />} />
        <Route path="/form/pengadaan/printview" element={<CetakPengadaan />} />
        <Route path="/form/pengadaan/tableadd" element={<TableAddRemove />} />

        <Route path="/form/purchaseorder" element={<PurcahsingOrder />} />
        <Route path="/form/purchaseorder/create" element={<CreatePo />} />
        {/* <Route path="/form/purchaseorder/update" element={<EditPo />} /> */}
        <Route path="/form/purchaseorder/update" element={<NewEditPo />} />
        <Route path="/form/purchaseorder/data" element={<ViewPo />} />
        <Route path="/form/purchaseorder/verifikasi" element={<VerifikasiPo />} />
        <Route path="/form/purchaseorder/reloadpo" element={<ReloadPo />} />
        <Route path="/form/purchaseorder/printview" element={<PrintPo />} />

        <Route path="/form/Kedatangan" element={<KedatanganBarang />} />
        <Route path="/form/Kedatangan/terimaview" element={<ViewTerima />} />
        <Route path="/form/Kedatangan/logbook" element={<LogBook />} />
        <Route path="/form/Kedatangan/logbookview" element={<ViewLogbook />} />
        <Route path="/form/Kedatangan/labelbarang" element={<LabelPrint />} />

        <Route path="/form/karyawan" element={<Karyawan />} />
        <Route path="/form/karyawan/create" element={<InputKaryawan />} />
        
        <Route path="/form/okp" element={<Okp />} />
        <Route path="/form/okp/create" element={<InputOkp />} />
        <Route path="/form/okp/printview" element={<CetakOkp />} />

        <Route path="/form/expro" element={<TabelExpro />} />
        <Route path="/form/material" element={<TabelMaterial />} />
        <Route path="/form/departemen" element={<TabelDepartemen />} />

        
        <Route path="/form/dokumen" element={<TableDokumen />} />
        <Route path="/form/dokumen/create" element={<CreateDokumen />} />
        <Route path="/form/dokumen/update" element={<EditDokumen />} /> 
        <Route path="/form/dokumen/view" element={<PrintDokumen />} />
        </Route>
        <Route path='/login' element={<Portofolio />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
