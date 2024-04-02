import { BtnPengadaan } from '../Forms/PengadaanBarang/BtnPengadaan';
import { BtnPurchasing } from '../Forms/PurchasingOrder/BtnPurchasing';
import { BtnTerima } from '../Forms/KedatanganBarang/BtnTerima';
import { BtnLogbook } from '../Forms/KedatanganBarang/BtnLogbook';
import { BtnKaryawan } from '../Forms/karyawan/BtnKaryawan';

export const COLUMNS_PENGADAAN =[
    {
        headerName: 'ID',
        field : 'id_Pengadaan',
        width: 120,
        maxWidth:155,
        suppressSizeToFit: true,
        pinned: 'left',
        filter: 'agTextColumnFilter',
        headerCheckboxSelection: true,
        checkboxSelection: true,
        showDisabledCheckboxes: true,
    },
    {
        field : 'pemohon',
        valueGetter: params => {
            let nilai  = params.data.user[0].pemohon;
            return nilai;
        },
        width: 105,
        maxWidth:155,
        pinned: 'left'
    },
    {
        headerName: 'Tanggal',
        field : 't_pengadaan',
        width: 110,
        maxWidth:115,
    },
    {
        headerName: 'Nama Barang',
        field : 'tipeMaterial',
        width:150,
        maxWidth: 550
    },
    {
        headerName: 'Merk',
        field : 'brandMaterial',
        width:150,
        maxWidth: 550
    },
    {
        field : 'order',
        valueGetter: params => {
            let nilai  = params.data.qty_pengadaan[0].order;
            return nilai;
        },
        width: 90,
        maxWidth:105,
    },
    {
        headerName: 'Unit',
        field : 'satuan',
        valueGetter: params => {
            let nilai  = params.data.qty_pengadaan[0].satuan;
            return nilai;
        },
        width: 80,
        maxWidth:95,
    },
    {
        field : 'status',
        width: 110,
        maxWidth:125,
        cellClassRules: {
            "rag-green": "x < 20",
            "rag-amber": "x >= 20 && x < 25",
            "rag-red": "x >= 25"
        },
        cellStyle: function(params) {
            if (params.value ==='Pengajuan') {
                return {color: '#800000', backgroundColor: '#d07979a7', borderRadius: '8px', height: 30, lineHeight: 2, marginTop: '5px',textAlign: 'center'};
                
            }
            else if (params.value ==='Verifikasi') {
                return {color: '#120cce', backgroundColor: '#120cce60', borderRadius: '8px', height: 30, lineHeight: 2, marginTop: '3px',textAlign: 'center'};
            }
            else if (params.value ==='Selesai') {
                return {color: '#008011', backgroundColor: '#38cc4c73', borderRadius: '8px', height: 30, lineHeight: 2, marginTop: '3px',textAlign: 'center'};
            }
            else if (params.value ==='Revisi') {
                return {color: '#7a0080', backgroundColor: '#a35ea6c4', borderRadius: '8px', height: 30, lineHeight: 2, marginTop: '3px',textAlign: 'center'};
            }
            else {
                return null;
            }
        }
    },
    {
        headerName: 'Item',
        field : 'material',
        valueGetter: params => {
            let nilai  = params.data.material[0].material;
            return nilai;
        },
        width: 200,
        maxWidth:505,
    },
    {
        headerName: 'Spesifikasi',
        field : 'spesifikasi',
        width:400,
        maxWidth: 550
    },
    {
        field : 'Action',
        headerName: 'Action',
        cellRenderer: BtnPengadaan,
          cellRendererParams: {
            clicked: function (field) {
              alert(`${field} was clicked`);
            },
          },
        width: 150,
        pinned: 'right'
    }
]

export const COLUMNS_KARYAWAN =[
    {
        headerName: 'NIK',
        field : 'uuid',
        width: 200,
        suppressSizeToFit: true,
        filter: 'agTextColumnFilter',
    },
    {
        headerName: 'Nama',
        field : 'uname',
        width: 250,
        maxWidth:450,
        // cellRenderer: ImageRenderer,
    },
    {
        headerName: 'Divisi',
        field : 'udivisi',
        width: 150,
        maxWidth:175,
    },
    {
        headerName: 'SubDivisi',
        field : 'usubdiv',
        width: 150,
        maxWidth:175,
    },
    {
        headerName: 'Jabatan',
        field : 'ujabatan',
        width: 150,
        maxWidth:175,
    },
    {
        headerName: 'Plan',
        field : 'uplan',
        width: 100,
        maxWidth:155,
    },
    {
        field : '',
        headerName: '',
        cellRenderer: BtnKaryawan,
        width: 170,
        pinned: 'right'
    }
]

export const COLUMNS_PROVIDER =[
    {
        headerName: 'ID',
        field : 'id_provider',
        width: 100,
        suppressSizeToFit: true,
        filter: 'agTextColumnFilter',
    },
    {
        headerName: 'Nama Pemasok',
        width: 200,
        maxWidth:350,
        field : 'nama_provider',
    },
    {
        headerName: 'Telephon',
        field : 'tlp_provider',
        width: 150,
        maxWidth:175,
    },
    {
        headerName: 'Alamat',
        field : 'almt_provider',
        width: 400,
        maxWidth:555,
    },
    {
        field : '',
        headerName: 'Action',
        // cellRenderer: BtnProvider,
        width: 70,
        pinned: 'right'
    }
]

export const COLUMNS_BOM =[
    {
        headerName: 'ID',
        field : 'id_bom',
        width: 120,
        suppressSizeToFit: true,
        filter: 'agTextColumnFilter',
    },
    {
        headerName: 'No BOM',
        width: 100,
        maxWidth:350,
        field : 'no_bom',
    },
    {
        headerName: 'No. Item',
        field : 'id_item',
        width: 80,
        maxWidth:175,
    },
    {
        headerName: 'Deskripsi Item',
        field : 'deskripsi_item',
        width: 500,
        maxWidth:755,
    },
    {
        headerName: 'Varian',
        field : 'varian',
        width: 100,
        maxWidth:255,
    },
    {
        headerName: 'Revisi',
        field : 'revisi',
        width: 100,
        maxWidth:255,
    },
    {
        field : '',
        headerName: 'Action',
        // cellRenderer: BtnBom,
        width: 120,
        pinned: 'right'
    }
]

export const COLUMNS_GUDANG =[
    {
        headerName: 'Material',
        field : 'item',
        width: 250,
        suppressSizeToFit: true,
        filter: 'agTextColumnFilter',
    },
    {
        headerName: 'Unit',
        width: 80,
        field : 'unit',
    },
    {
        headerName: 'S_Awal',
        field : 'saldo_awal',
        width: 100,
        maxWidth:175,
    },
    {
        headerName: 'S_Akhir',
        field : 'saldo_akhir',
        width: 100,
        maxWidth:175,
    },
    {
        headerName: 'Rtrn Prod',
        field : 'ret_prod',
        width: 150,
        maxWidth:255,
    },
    {
        headerName: 'Permintaan Prod',
        field : 'perm_prod',
        width: 150,
        maxWidth:255,
    },
    {
        headerName: 'Status',
        field : 'ket_limit',
        width: 105,
        cellStyle: function(params) {
            if (params.value ==='STOCK LIMIT') {
                return {color: '#800000', backgroundColor: '#d07979a7', borderRadius: '8px', height: 30, lineHeight: 2, marginTop: '5px',textAlign: 'center'};
                
            }
            else if (params.value ==='PENGAJUAN') {
                return {color: '#918413', backgroundColor: '#e7d32260', borderRadius: '8px', height: 30, lineHeight: 2, marginTop: '5px',textAlign: 'center'};
            }
            else if (params.value ==='ORDER') {
                return {color: '#120cce', backgroundColor: '#120cce60', borderRadius: '8px', height: 30, lineHeight: 2, marginTop: '5px',textAlign: 'center'};
            }
            else if (params.value ==='AMAN') {
                return {color: '#008011', backgroundColor: '#38cc4c73', borderRadius: '8px', height: 30, lineHeight: 2, marginTop: '5px',textAlign: 'center'};
            }
            else if (params.value ==='TIDAK AKTIF') {
                return {color: '#7a0080', backgroundColor: '#a35ea6c4', borderRadius: '8px', height: 30, lineHeight: 2, marginTop: '5px',textAlign: 'center'};
            }
            else {
                return null;
            }
        }
    },
    {
        field : '',
        headerName: 'Action',
        // cellRenderer: BtnStok,
        width: 150,
        pinned: 'right'
    }
]

export const COLUMNS_OKP =[
    {
        headerName: 'No',
        field : 'no',
        width: 75,
        suppressSizeToFit: true,
        colSpan: function (params) {
            const no = params.data.no;
            if (no === 'Total') {
              // have all Russia age columns width 2
              return 3;
            }else {
              // all other rows should be just normal
              return 1;
            }
        },
    },
    {
        headerName: 'KODE OKP',
        width: 180,
        field : 'kodeOKP',
    },
    {
        headerName: 'Nama Produk',
        field : 'produk',
        width: 350,
        suppressSizeToFit: true,
    },
    {
        headerName: 'Jumlah (batch)',
        field : 'batch',
        width: 120,
    },
    {
        headerName: 'Varian Packing',
        field : 'varian',
        width: 120,
        colSpan: function (params) {
            const varian = params.data.varian;
            if (varian === '' || varian === null) {
              // have all Russia age columns width 2
              return 3;
            }else {
              // all other rows should be just normal
              return 1;
            }
        },
    },
    {
        headerName: 'REVISI',
        field : 'revisi',
        width: 100,
    },
    {
        field : '',
        headerName: 'Action',
        // cellRenderer: BtnOkp,
        width: 120,
        pinned: 'right'
    }
]

export const COLUMNS_OKPNOTE =[
    {
        headerName: '',
        field : 'no',
        width: 150,
    },
    {
        headerName: 'Note',
        width: 500,
        field : 'note',
    },
    {
        field : '',
        headerName: 'Action',
        // cellRenderer: BtnNoteOkp,
        width: 120,
        pinned: 'right'
    }
    // {
    //     field : '',
    //     headerName: 'Action',
    //     // cellRenderer: BtnStok,
    //     width: 120,
    //     pinned: 'right'
    // }
]

export const COLUMNS_PERMINTAAN =[
    {
        headerName: 'Item',
        field : 'nama_item',
        width: 150,
        maxWidth:175,
        suppressSizeToFit: true,
        pinned: 'left',
        filter: 'agTextColumnFilter',
    },
    {
        headerName: 'Estimasi',
        field : 'jmlEstimasi',
        valueGetter: params => {
            let nilai  = (parseFloat(params.data.jml_item[0].jmlEstimasi)*1000)/1000;
            return nilai;
        },
        width: 105,
        maxWidth:155,
        cellStyle: function(params) {
            return {textAlign: 'right',fontWeight: "bold"};
        }
    },
    {
        headerName: 'Permintaan',
        field : 'JmlPermintaan',
        valueGetter: params => {
            let nilaiPermint  = (parseFloat(params.data.jml_item[0].JmlPermintaan)*1000)/1000;
            return nilaiPermint;
        },
        width: 125,
        maxWidth:155,
        cellStyle: function(params) {
            return {textAlign: 'right',fontWeight: "bold"};
        }
    },
    {
        headerName: 'Pengeluaran',
        field : 'JmlPengeluaran',
        valueGetter: params => {
            let nilaiKeluar  = (parseFloat(params.data.jml_item[0].JmlPengeluaran)*1000)/1000;
            return nilaiKeluar;
        },
        width: 135,
        maxWidth:155,
        cellStyle: function(params) {
            return {textAlign: 'right',fontWeight: "bold"};
        }
    },
    {
        headerName: 'satuan',
        field : 'satuan',
        width: 100,
        maxWidth:115,
    },
    {
        headerName: 'Status Item',
        field : 'status_item',
        width: 105,
        cellStyle: function(params) {
            if (params.value ==='Pengajuan') {
                return {color: '#800000', backgroundColor: '#d07979a7', borderRadius: '8px', height: 30, lineHeight: 2, marginTop: '5px',textAlign: 'center',fontWeight: "bold"};
                
            }
            else if (params.value ==='Progress') {
                return {color: '#918413', backgroundColor: '#e7d32260', borderRadius: '8px', height: 30, lineHeight: 2, marginTop: '5px',textAlign: 'center',fontWeight: "bold"};
            }
            else if (params.value ==='Verify') {
                return {color: '#120cce', backgroundColor: '#120cce60', borderRadius: '8px', height: 30, lineHeight: 2, marginTop: '5px',textAlign: 'center',fontWeight: "bold"};
            }
            else if (params.value ==='Selesai') {
                return {color: '#008011', backgroundColor: '#38cc4c73', borderRadius: '8px', height: 30, lineHeight: 2, marginTop: '5px',textAlign: 'center',fontWeight: "bold"};
            }
            else if (params.value ==='Revisi') {
                return {color: '#7a0080', backgroundColor: '#a35ea6c4', borderRadius: '8px', height: 30, lineHeight: 2, marginTop: '5px',textAlign: 'center',fontWeight: "bold"};
            }
            else {
                return null;
            }
        }
    },
    {
        headerName: 'Waktu Kirim',
        field : 'Waktu Kirim',
        width: 130,
        maxWidth:155,
        valueGetter: params => {
            return params.data.waktu[0].jamPengiriman;
        },
        cellStyle: function(params) {
            return {textAlign: 'center',fontWeight: "bold"};
        }
    },
    {
        headerName: 'List',
        field : 'list_data',
        valueGetter: params => {
            let data = params.data.list_data;
            // console.log(data)
            let hasil = [];
            for(let x = 0; x < data.length; x ++){
                hasil.push(`${data[x].lot}(${data[x].qty}) ${data[x].supplier}`)
            }
            return hasil;;
        },
        width: 300,
        maxWidth:405,
    },
    {
        field : 'Action',
        headerName: 'Action',
        // cellRenderer: BtnPermintaan,
          cellRendererParams: {
            clicked: function (field) {
              alert(`${field} was clicked`);
            },
          },
        width: 160,
        pinned: 'right'
    }
]

export const COLUMNS_SPAREPART =[
    {
        headerName: 'Item',
        field : 'nama_item',
        width: 250,
        maxWidth:375,
        suppressSizeToFit: true,
        pinned: 'left',
        filter: 'agTextColumnFilter',
        headerCheckboxSelection: true,
        checkboxSelection: true,
        showDisabledCheckboxes: true,
    },
    {
        headerName: 'Unit',
        field : 'unit',
        width: 95,
        maxWidth:105,
    },
    {
        headerName: 'Stok',
        field : 'stok',
        width: 95,
        maxWidth:155,
    },
    {
        headerName: 'Pengeluaran Akhir',
        field : 'pengeluaran',
        width: 115,
        maxWidth:155,
    },
    {
        headerName: 'Tgl Keluar',
        field : 'tgl_keluar',
        width: 115,
        maxWidth:155,
    },
    {
        headerName: 'Buffer',
        field : 'buffer',
        width: 100,
        maxWidth:115,
    },
    {
        headerName: 'Maksimal Stok',
        field : 'maks_Stok',
        width: 100,
        maxWidth:115,
    },
    {
        headerName: 'Status',
        field : 'status_item',
        width: 105,
        cellStyle: function(params) {
            // console.log(params.value)
            if (params.value ==='STOCK LIMIT') {
                return {color: '#800000', backgroundColor: '#d07979a7', borderRadius: '8px', height: 30, lineHeight: 2, marginTop: '5px',textAlign: 'center'};
                
            }
            else if (params.value ==='PENGAJUAN') {
                return {color: '#918413', backgroundColor: '#e7d32260', borderRadius: '8px', height: 30, lineHeight: 2, marginTop: '5px',textAlign: 'center'};
            }
            else if (params.value ==='ORDER') {
                return {color: '#120cce', backgroundColor: '#120cce60', borderRadius: '8px', height: 30, lineHeight: 2, marginTop: '5px',textAlign: 'center'};
            }
            else if (params.value ==='AMAN') {
                return {color: '#008011', backgroundColor: '#38cc4c73', borderRadius: '8px', height: 30, lineHeight: 2, marginTop: '5px',textAlign: 'center'};
            }
            else if (params.value ==='TIDAK AKTIF') {
                return {color: '#7a0080', backgroundColor: '#a35ea6c4', borderRadius: '8px', height: 30, lineHeight: 2, marginTop: '5px',textAlign: 'center'};
            }
            else {
                return null;
            }
        }
    },
    {
        headerName: 'Tgl Pengajuan',
        field : 'tgl_pengajuan',
        width: 130,
        maxWidth:155,
    },
    {
        headerName: 'Tgl Order',
        field : 'tgl_order',
        width: 130,
        maxWidth:155,
    },
    {
        field : 'Action',
        headerName: 'Action',
        // cellRenderer: BtnSparepart,
          cellRendererParams: {
            clicked: function (field) {
              alert(`${field} was clicked`);
            },
          },
        width: 150,
        pinned: 'right'
    }
]

export const COLUMNS_STOCKCARD =[
    {
        headerName: 'Item',
        field : 'item',
        width: 150,
        maxWidth:375,
        suppressSizeToFit: true,
        pinned: 'left',
        filter: 'agTextColumnFilter',
        headerCheckboxSelection: true,
        checkboxSelection: true,
        showDisabledCheckboxes: true,
    },
    {
        headerName: 'Tanggal',
        field : 'tanggal',
        width: 95,
        maxWidth:155,
    },
    {
        headerName: 'Sumber',
        field : 'sumber',
        width: 95,
        maxWidth:155,
    },
    {
        headerName: 'Tipe',
        field : 'tipe',
        width: 115,
        maxWidth:155,
    },
    {
        headerName: 'Provider',
        field : 'provider',
        width: 115,
        maxWidth:155,
    },
    {
        headerName: 'No. Lot',
        field : 'lot',
        width: 100,
        maxWidth:115,
    },
    {
        headerName: 'Expired',
        field : 'expired',
        width: 100,
        maxWidth:115,
    },
    {
        headerName: 'Keterangan',
        field : 'keterangan',
        width: 130,
        maxWidth:155,
    },
    {
        headerName: 'Terima Barang',
        field : 'terima_barang',
        width: 130,
        maxWidth:155,
    },
    {
        headerName: 'Return Produksi',
        field : 'return_prod',
        width: 130,
        maxWidth:155,
    },
    {
        headerName: 'Produksi',
        field : 'produksi',
        width: 130,
        maxWidth:155,
    },
    {
        headerName: 'Pindah Barang',
        field : 'pindah_barang',
        width: 130,
        maxWidth:155,
    },
    {
        headerName: 'Saldo',
        field : 'saldo',
        width: 130,
        maxWidth:155,
    },
    {
        headerName: 'Stok Awal',
        field : 'stok_awal',
        width: 130,
        maxWidth:155,
    },
    {
        headerName: 'Stock Akhir',
        field : 'stock_akhir',
        width: 130,
        maxWidth:155,
    },
    {
        headerName: 'Petugas',
        field : 'petugas',
        width: 130,
        maxWidth:155,
    },
]

export const COLUMNS_PRODUCT =[
    {
        headerName: 'ITEMNO',
        field : 'itemno',
        width: 150,
        suppressSizeToFit: true
    },
    {
        headerName: 'ITEMDESCRIPTION',
        width: 350,
        field : 'itemdescription',
    },
    {
        headerName: 'UNIT',
        field : 'unit1',
        width: 90,
        suppressSizeToFit: true,
    },
    {
        headerName: 'UNITPRICE',
        field : 'unitprice',
        width: 120,
    },
    {
        headerName: 'KATEGORI',
        field : 'kategori',
        width: 120,
    },
    {
        headerName: 'BRAND',
        field : 'brand',
        width: 120,
    },
    {
        field : '',
        headerName: 'Action',
        cellRenderer: '',
        width: 120,
        pinned: 'right'
    }
]

export const COLUMNS_SALES =[
    {
        headerName: 'SALESMANID',
        field : 'salesmanid',
        width: 120,
        suppressSizeToFit: true
    },
    {
        headerName: 'FIRSTNAME',
        width: 350,
        field : 'firstname',
    },
    {
        headerName: 'JOBTITLE',
        field : 'jobtitle',
        width: 180,
        suppressSizeToFit: true,
    },
    {
        headerName: 'CELLULAR',
        field : 'cellular',
        width: 120,
    },
    {
        headerName: 'EMAIL',
        field : 'email',
        width: 120,
    },
    {
        headerName: 'NOTES',
        field : 'notes',
        width: 120,
    },
    {
        field : '',
        headerName: 'Action',
        cellRenderer: '',
        width: 120,
        pinned: 'right'
    }
]

export const COLUMNS_CUSTOMER =[
    {
        headerName: 'PERSONNO',
        field : 'personno',
        width: 120,
        suppressSizeToFit: true,
        pinned: 'left'
    },
    {
        headerName: 'NAME',
        width: 350,
        field : 'name',
    },
    {
        headerName: 'ADDRESSLINE',
        field : 'addressline1',
        width: 180,
        suppressSizeToFit: true,
    },
    {
        headerName: 'ADDRESSLINE2',
        field : 'addressline2',
        width: 120,
    },
    {
        headerName: 'PHONE',
        field : 'phone',
        width: 120,
    },
    {
        headerName: 'CONTACT',
        field : 'contact',
        width: 120,
    },
    {
        headerName: 'EMAIL',
        field : 'email',
        width: 120,
        suppressSizeToFit: true
    },
    {
        headerName: 'TERMSID',
        width: 250,
        field : 'termsid',
    },
    {
        headerName: 'TERMNAME',
        width: 250,
        field : 'termname',
    },
    {
        headerName: 'CREDITLIMIT',
        field : 'creditlimit',
        width: 120,
    },
    {
        headerName: 'OVERDUESILIMIT',
        field : 'overduesilimit',
        width: 120,
    },
    {
        headerName: 'TAX1ID',
        field : 'tax1id',
        width: 120,
    },
    {
        headerName: 'TAX1EXEMPTIONNO',
        field : 'tax1exemptionno',
        width: 120,
        suppressSizeToFit: true
    },
    {
        headerName: 'SALESMANID',
        width: 350,
        field : 'salesmanid',
    },
    {
        headerName: 'TYPENAME',
        field : 'typename',
        width: 180,
        suppressSizeToFit: true,
    },
    {
        headerName: 'STATUS',
        field : 'status',
        width: 120,
    },
    {
        headerName: 'KATEGORICUST',
        field : 'kategoricust',
        width: 120,
    },
    {
        field : 'include',
        headerName: 'INCLUDE',
        cellRenderer: '',
        width: 120,
        pinned: 'right'
    }
]

export const COLUMNS_DATAPO =[
    { 
        headerName: 'Nama Barang',
        field : 'material',
        width: 150,
        maxWidth:405,
        editable: true,
        pinned: 'left'
    },
    { 
        headerName: 'Jumlah',
        field : 'qty',
        width: 110,
        editable: true,
        cellRenderer: params => {
            let data = params.data;
            // console.log(data);
            data.parsial = []
            const parAwal = data.parsialAwal;
            for(let x = 0; x < parAwal.length; x++){
                data.parsial.push({
                    tgl: parAwal[x].tgl,
                    qty: parAwal[x].qty
                })
            }
            // console.log(data.parsial)
            let hSatuan = 0;
            if(data.qty === undefined || data.qty === ""){
                hSatuan = 0;
                params.data.parsial[0].qty = 0;
            }
            else{
                const awaln = parseFloat(data.qtyAwal);
                const akhrn = parseFloat(data.qty);
                hSatuan = (parseFloat(data.qty)).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                if(data.parsial.length < 2){
                    if(akhrn <= awaln){
                        params.data.parsial[0].qty = data.qty;
                    }
                    else{
                        const sisan = ((akhrn - awaln) * 1000) / 1000;
                        params.data.parsial.push({
                            tgl: params.data.parsial[0].tgl,
                            qty: String(sisan)
                        })
                    }
                }
                else{
                    const p = data.parsial;
                    if(awaln === akhrn){
                        console.log('data sama')
                    }
                    else if(akhrn < awaln){
                        let datd = [];
                        let nilaiX = akhrn;
                        for (let i = 0; i < p.length; i++) {
                            let hsl = parseFloat(data.parsial[i].qty);
                            if (hsl <= nilaiX){
                                datd.push(data.parsial[i])
                                nilaiX -= hsl;
                            }
                            else { 
                                break; 
                            }
                            
                        }

                        let sum = datd.reduce((s, a) => parseFloat(s) + parseFloat(a.qty), 0);
                        if(akhrn !== sum){
                            const sisan = ((akhrn - sum) * 1000) / 1000;
                            datd.push({
                                tgl: data.parsial[p.length-1].tgl,
                                qty: String(sisan)
                            })
                        }

                        data.parsial = [];
                        for(let x = 0; x < datd.length; x++){
                            params.data.parsial.push({
                                tgl: datd[x].tgl,
                                qty: datd[x].qty
                            })
                        }
                    }
                    else{
                        const sisan = ((akhrn - awaln) * 1000) / 1000;
                        params.data.parsial.push({
                            tgl: params.data.parsial[p.length-1].tgl,
                            qty: String(sisan)
                        })
                    }
                }
            }
            // console.log(data.parsial)
            return hSatuan
        }
    },
    { 
        headerName: 'Unit',
        field : 'satuan',
        width: 70,
        editable: false,
    },
    { 
        headerName: 'Harga Satuan',
        field : 'hargasatuan',
        width: 110,
        cellDataType: 'number',
        cellRenderer: params => {
            let data = params.data;
            let hSatuan = 0;
            if(data.hargasatuan === undefined || data.hargasatuan === ""){hSatuan = 0}
            else{
                let nilai = (parseFloat(data.hargasatuan)).toFixed(4);
                const x  = ((parseFloat(nilai)) * 10000) / 10000;
                // console.log(x);
                hSatuan = (parseFloat(x)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            return hSatuan
        }
    },
    { 
        headerName: '% Disc',
        field : 'diskon',
        width: 80,
        /* valueFormatter: params => {
            console.log(params)
            return params.data.diskon
        } */
    },
    { 
        headerName: 'Jumlah Harga',
        field : 'jmlhHarga',
        editable: false,
        width: 120,
        valueGetter: params => {
            let data = params.data;
            // console.log(params.data)
            let jmlh = 0;
            let hSatuan = 0;
            let diskon = 0;
            if(data.qty === undefined || data.qty === ""){jmlh = 0}
            else{jmlh = parseFloat(data.qty)}
            if(data.hargasatuan === undefined || data.hargasatuan === ""){hSatuan = 0}
            else{hSatuan = parseFloat(data.hargasatuan)}
            if(data.diskon === undefined || data.diskon === ""){diskon = 0}
            else{diskon = String(data.diskon).split("+")}
            let total = jmlh * hSatuan;

            if(diskon.length <2){
                let cekHarga = (parseFloat(diskon) * total) / 100;
                total = total - cekHarga;
            }
            else{
                for(let x = 0; x < diskon.length;x++){
                    let cekHarga = (parseFloat(diskon[x]) * total) / 100;
                    total = total - cekHarga;
                }
            }
            return (parseFloat(total)).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        }
    },
    { 
        headerName: 'Departemen',
        field : 'departement',
        width: 120,
        editable: false,
    },
    { 
        headerName: 'Barang',
        field : 'itemNo',
        width: 110,
        editable: false,
    },
    { 
        headerName: 'Pajak',
        field : 'pajak',
        width: 70,
        editable: true,
        cellRenderer: params => {
            let data = params.data;
            let pajak = "";
            if(data.pajak === ""){
                pajak = "";
            }
            else{
                pajak = String(data.pajak).toUpperCase();
            }
            return pajak
        }
    },
    { 
        headerName: 'Spesifikasi',
        field : 'spesifikasi',
        width: 110,
        editable: true,
        cellRenderer: params => {
            let data = params.data;
            console.log(data)
            let item = `${data.tipeMaterial} ${data.brandMaterial} ${data.spesifikasi}`;
            
            console.log(item)
            return item
        }
    },
    { 
        headerName: 'Divisi',
        field : 'divisi',
        width: 110,
        editable: true,
    },
    { 
        headerName: 'Terima',
        field : 'terima',
        width: 120,
        editable: false,
    },
    { 
        headerName: 'Tutup',
        field : 'tutup',
        width: 120,
        editable: false,
    },
]
export const COLUMNS_DEPARTEMENT =[
    {
        headerName: 'DEPTID',
        field : 'deptid',
        width: 120,
        suppressSizeToFit: true
    },
    {
        headerName: 'SUBDEPTID',
        width: 150,
        field : 'subdeptid',
    },
    {
        headerName: 'DEPTNO',
        width: 180,
        field : 'deptno',
    },
    {
        headerName: 'DEPTNAME',
        field : 'deptname',
        width: 350,
        suppressSizeToFit: true,
    },
    {
        headerName: 'PARENTNAME',
        field : 'parentname',
        width: 350,
        suppressSizeToFit: true,
    },
     
]

export const COLUMNS_SHIPTO =[
    {
        headerName: 'PERSONNO',
        field : 'personno',
        width: 120,
        suppressSizeToFit: true
    },
    {
        headerName: 'GUID',
        width: 350,
        field : 'guid',
    },
    {
        headerName: 'NAME',
        width: 280,
        field : 'name',
    },
    {
        headerName: 'ALAMAT1',
        field : 'alamat1',
        width: 350,
        suppressSizeToFit: true,
    },
    {
        headerName: 'ALAMAT2',
        field : 'alamat2',
        width: 350,
        suppressSizeToFit: true,
    },
    {
        headerName: 'KONTAK',
        field : 'kontak',
        width: 250,
        suppressSizeToFit: true,
    },
     
]

export const COLUMNS_AROUT =[
    {
        headerName: 'PERSONNO',
        field : 'personno',
        width: 120,
        suppressSizeToFit: true
    },
    {
        headerName: 'NAME',
        width: 280,
        field : 'name',
    },
    {
        headerName: 'INVOICENO',
        width: 200,
        field : 'invoiceno',
    },
    {
        headerName: 'INVOICEDATE',
        field : 'invoicedate',
        width: 200,
    },
    {
        headerName: 'INVOICEAMOUNT',
        field : 'invoiceamount',
        width: 200,
    },
    {
        headerName: 'DUEDATE',
        field : 'dudate',
        width: 150,
    },
    {
        headerName: 'SALESMANID',
        field : 'salesmanid',
        width: 150,
    },
    {
        headerName: 'OWING',
        field : 'owing',
        width: 150,
    },
     
]

export const COLUMNS_INVSALES =[
    {
        headerName: 'SALESMANID',
        field : 'salesmanid',
        width: 135,
        suppressSizeToFit: true,
    },
    {
        headerName: 'PERSONNO',
        field : 'personno',
        width: 125,
    },
    {
        headerName: 'INVOICENO',
        width: 150,
        field : 'invoiceno',
    },
    {
        headerName: 'INVOICEDATE',
        field : 'invoicedate',
        width: 150,
        suppressSizeToFit: true,
    },
    {
        headerName: 'DUEDATE',
        field : 'dudate',
        width: 120,
        suppressSizeToFit: true,
    },
    {
        headerName: 'INVOICEAMOUNT',
        field : 'invoiceamount',
        width: 170,
        suppressSizeToFit: true,
    },
    {
        headerName: 'ITEMNO',
        field : 'itemno',
        width: 130,
    },
    {
        headerName: 'QUANTITY',
        width: 130,
        field : 'quantity',
    },
    {
        headerName: 'ITEMUNIT',
        field : 'itemunit',
        width: 120,
        suppressSizeToFit: true,
    },
    {
        headerName: 'UNITPRICE',
        field : 'unitprice',
        width: 130,
        suppressSizeToFit: true,
    },
    {
        headerName: 'ITEMPRIMEAMOUNT',
        field : 'itemprimeamount',
        width: 190,
        suppressSizeToFit: true,
    },
     
]

export const COLUMNS_WAREHOUSE =[
    {
        headerName: 'WAREHOUSEID',
        field : 'warehouseid',
        width: 120,
        suppressSizeToFit: true
    },
    {
        headerName: 'NAME',
        width: 200,
        field : 'name',
    },
     
]

export const COLUMNS_PO =[
    {
        headerName: 'No PO',
        field : 'id_po',
        width: 110,
        suppressSizeToFit: true
    },
    {
        headerName: 'Data Po',
        width: 100,
        cellRenderer: params => {
            let data = params.data.dataPO;
            // console.log(data.length)
            let hSatuan = data.length;
            return hSatuan
        }
    },
    {
        headerName: 'Eksternal Provider',
        width: 350,
        field : 'expro',
    },
    {
        headerName: 'Status',
        width: 150,
        cellRenderer: params => {
            let data = params.data.status;
            let fina = params.data.statusfina;
            // console.log(data)
            if (data ==='Pengajuan' && fina === "") {
                return (
                    <div>
                    <span style={{color: '#800000', backgroundColor: '#d07979a7', borderRadius: '5px', height: 30, lineHeight: 2, marginTop: '5px',textAlign: 'center',padding: '5px'}}>{data}</span> &nbsp;
                    <i className="bi bi-circle-fill text-light"></i>
                    </div>
                )
                
            }
            else if (data ==='Pengajuan' && fina === "Upload") {
                return (
                    <div>
                    <span style={{color: '#800000', backgroundColor: '#d07979a7', borderRadius: '5px', height: 30, lineHeight: 2, marginTop: '5px',textAlign: 'center',padding: '5px'}}>{data}</span> &nbsp;
                    <i className="bi bi-circle-fill text-danger"></i>
                    </div>
                )
                
            }
            else if (data ==='Verifikasi' && fina === "") {
                return (
                    <div>
                    <span style={{color: '#120cce', backgroundColor: '#120cce60', borderRadius: '5px', height: 30, lineHeight: 2, marginTop: '5px',textAlign: 'center',padding: '5px'}}>{data}</span> &nbsp;
                    <i className="bi bi-circle-fill text-light"></i>
                    </div>
                )
            }
            else if (data ==='Verifikasi' && fina === "Upload") {
                return (
                    <div>
                    <span style={{color: '#120cce', backgroundColor: '#120cce60', borderRadius: '5px', height: 30, lineHeight: 2, marginTop: '5px',textAlign: 'center',padding: '5px'}}>{data}</span> &nbsp;
                    <i className="bi bi-circle-fill text-danger"></i>
                    </div>
                )
            }
            else if (data ==='Selesai' && fina === "") {
                return (
                    <div>
                    <span style={{color: '#008011', backgroundColor: '#38cc4c73', borderRadius: '5px', height: 30, lineHeight: 2, marginTop: '5px',textAlign: 'center',padding: '5px'}}>{data}</span> &nbsp;
                    <i className="bi bi-circle-fill text-light"></i>
                    </div>
                )      
            }
            else if (data ==='Selesai' && fina === "Upload") {
                return (
                    <div>
                    <span style={{color: '#008011', backgroundColor: '#38cc4c73', borderRadius: '5px', height: 30, lineHeight: 2, marginTop: '5px',textAlign: 'center',padding: '5px'}}>{data}</span> &nbsp;
                    <i className="bi bi-circle-fill text-danger"></i>
                    </div>
                )      
            }
            else if (data ==='Revisi' && fina === "") {
                return (
                    <div>
                    <span style={{color: '#7a0080', backgroundColor: '#a35ea6c4', borderRadius: '5px', height: 30, lineHeight: 2, marginTop: '5px',textAlign: 'center',padding: '5px'}}>{data}</span> &nbsp;
                    <i className="bi bi-circle-fill text-light"></i>
                    </div>
                )
            }
            else if (data ==='Revisi' && fina === "Upload") {
                return (
                    <div>
                    <span style={{color: '#7a0080', backgroundColor: '#a35ea6c4', borderRadius: '5px', height: 30, lineHeight: 2, marginTop: '5px',textAlign: 'center',padding: '5px'}}>{data}</span> &nbsp;
                    <i className="bi bi-circle-fill text-danger"></i>
                    </div>
                )
            }
            else {
                return null;
            }
        }
    },
    {
        headerName: 'Tgl PO',
        width: 150,
        field : 'tgl_po',
    },
    {
        headerName: 'Tgl Kirim',
        width: 150,
        field : 'tgl_kirim',
    },
    {
        field : 'Action',
        headerName: 'Action',
        cellRenderer: BtnPurchasing,
          cellRendererParams: {
            clicked: function (field) {
              alert(`${field} was clicked`);
            },
          },
        width: 170,
        pinned: 'right'
    }
]

export const COLUMNS_TERBANG =[
    {
        headerName: 'CUR',
        field : 'currency',
        width: 90,
        suppressSizeToFit: true
    },
    {
        headerName: 'NoPesanan',
        width: 110,
        field : 'no_po',
    },
    {
        headerName: 'Kode Material',
        width: 150,
        field : 'kode_item',
    },
    {
        headerName: 'Tgl Pesan',
        width: 120,
        field : 'tgl_psn',
    },
    {
        headerName: 'Tgl Kirim',
        width: 120,
        field : 'tgl_terima',
    },
    {
        headerName: 'Nama Pemasok',
        width: 150,
        field : 'eks_provider',
    },
    {
        headerName: 'NoItem',
        width: 100,
        field : 'no_fina',
    },
    {
        headerName: 'Deskripsi Item',
        width: 150,
        field : 'deskripsi_item',
    },
    {
        headerName: 'Status',
        field : 'status_brng',
        width: 150,
        cellRenderer: params => {
            let date1 = new Date();
            let date2 = new Date(params.data.tgl_terima);
            const status = params.data.status_brng

            if(status === ""){
                if (date1 < date2) {
                    return(
                        <div>
                            <span style={{color: '#7a0080', backgroundColor: '#a35ea6c4', borderRadius: '5px', height: 30, lineHeight: 2, marginTop: '5px',textAlign: 'center',padding: '5px',width:"200px"}}>Proses</span> &nbsp;
                        </div>
                    )
                    
                } else if (date1 > date2) {
                    return(
                        <div>
                            <span style={{color: '#800000', backgroundColor: '#d07979a7', borderRadius: '5px', height: 30, lineHeight: 2, marginTop: '5px',textAlign: 'center',padding: '5px'}}>Deadline</span> &nbsp;
                        </div> 
                    )
                } else {
                    <div>
                        <span style={{color: '#7a0080', backgroundColor: '#a35ea6c4', borderRadius: '5px', height: 30, lineHeight: 2, marginTop: '5px',textAlign: 'center',padding: '5px'}}>Proses</span> &nbsp;
                    </div>
                }
            }
            else{
                return(
                    <div>
                        <span style={{color: '#008011', backgroundColor: '#38cc4c73', borderRadius: '5px', height: 30, lineHeight: 2, marginTop: '5px',textAlign: 'center',padding: '5px'}}>{status}</span> &nbsp;
                    </div>
                )
            }
        }
    },
    {
        headerName: 'KtsDipesan',
        width: 100,
        field : 'qty_psn',
        cellRenderer: params => {
            let data = params.data;
            let hSatuan = 0;
            if(data.qty_psn === undefined || data.qty_psn === ""){hSatuan = 0}
            else{hSatuan = (parseFloat(data.qty_psn)).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            return hSatuan
        }
    },
    {
        headerName: 'Harga satuan',
        width: 150,
        field : 'hrga_sat',
        cellRenderer: params => {
            let data = params.data;
            let hSatuan = 0;
            if(data.hrga_sat === undefined || data.hrga_sat === ""){hSatuan = 0}
            else{hSatuan = (parseFloat(data.hrga_sat)).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            return hSatuan
        }
    },
    {
        headerName: 'Tax',
        width: 80,
        field : 'tax',
    },
    {
        headerName: 'Disc (%)',
        width: 90,
        field : 'disc',
    },
    {
        headerName: 'Jumlah (Valas)',
        width: 150,
        cellRenderer: params => {
            let data = params.data;
            let qty_psn = 0;
            let hSatuan = 0;
            let diskon = 0;
            let tax = data.tax;

            if(data.qty_psn === undefined || data.qty_psn === ""){qty_psn = 0}
            else{qty_psn = parseFloat(data.qty_psn)}

            if(data.hrga_sat === undefined || data.hrga_sat === ""){hSatuan = 0}
            else{hSatuan = parseFloat(data.hrga_sat)}

            if(data.disc === undefined || data.disc === ""){diskon = 0}
            else{diskon = String(data.disc).split("+")}

            let total = qty_psn * hSatuan;

            if(diskon.length <2){
                let cekHarga = (parseFloat(diskon) * total) / 100;
                total = total - cekHarga;
            }
            else{
                for(let x = 0; x < diskon.length;x++){
                    let cekHarga = (parseFloat(diskon[x]) * total) / 100;
                    total = total - cekHarga;
                }
            }

            let nPPN =0.0;
            let nPPH =0.0;
            if(tax === "A"){
                nPPN = 0.0;
                nPPH =(total*2.5)/100;
            }
            else if(tax === "B"){
                nPPN = 0.0;
                nPPH =(total*3)/100;
            }
            else if(tax === "D"){
                nPPN = 0.0;
                nPPH = 0.0;
            }
            else if(tax === "E"){
                nPPN = 0.0;
                nPPH = (total*10)/100;
            }
            else if(tax === "G"){
                nPPN = 0.0;
                nPPH = (total*0.5)/100;
            }
            else if(tax === "R"){
                nPPN = (total*1.1)/100;
                nPPH = 0.0;
            }
            else if(tax === "S"){
                nPPN = (total*11)/100;
                nPPH = 0.0;
            }
            else if(tax === "T"){
                nPPN = 0.0;
                nPPH = (total*2)/100;
            }
            else if(tax === "SE"){
                nPPN = (total*11)/100;
                nPPH = (total*10)/100;
            }
            else if(tax === "ST"){
                nPPN = (total*11)/100;
                nPPH = (total*2)/100;
            }
            else if(tax === "RT"){
                nPPN = (total*1.1)/100;
                nPPH = (total*2)/100;
            }
            else{
                nPPN = 0.0;
                nPPH = 0.0;
            }
            
            total = (total + nPPN) - nPPH;
            
            return (parseFloat(total)).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
    },
    {
        headerName: 'Ongkir',
        width: 120,
        field : 'ongkir',
    },
    {
        headerName: 'Tgl Terima',
        width: 110,
        field : 'tgl_datang',
    },
    {
        headerName: 'KtsDiterima',
        width: 100,
        field : 'qty_trma',
    },
    {
        headerName: 'Keterangan',
        width: 300,
        field : 'ket_purch',
    },
    {
        field : 'Action',
        headerName: 'Action',
        cellRenderer: BtnTerima,
          cellRendererParams: {
            clicked: function (field) {
              alert(`${field} was clicked`);
            },
          },
        width: 100,
        pinned: 'right'
    }
]

export const COLUMNS_LOGBOOK =[
    {
        headerName: 'NO PO',
        field : 'no_po',
        width: 110,
        pinned: 'left',
        suppressSizeToFit: true
    },
    {
        headerName: 'Kategori',
        width: 110,
        field : 'tipe_data',
    },
    {
        headerName: 'Deskripsi Item',
        width: 150,
        field : 'deskripsi_item',
    },
    {
        headerName: 'Kode Material',
        width: 150,
        field : 'kode_item',
    },
    {
        headerName: 'Tgl Kirim',
        width: 120,
        field : 'tgl_terima',
    },
    {
        headerName: 'Kts Dipesan',
        width: 150,
        field : 'qty_psn',
    },
    {
        headerName: 'Tgl Terima',
        width: 150,
        field : 'tgl_datang',
    },
    {
        headerName: 'KtsDiterima',
        width: 150,
        field : 'qty_trma',
    },
    {
        headerName: 'Satuan',
        width: 90,
        field : 'unit',
    },
    {
        headerName: 'No Surat Jalan',
        width: 120,
        field : 'no_sj',
    },
    {
        headerName: 'Tipe',
        width: 80,
        field : 'kategori_item',
    },
    {
        headerName: 'Eksternal Provider',
        width: 150,
        field : 'eks_provider',
    },
    {
        headerName: 'No Lot',
        width: 100,
        field : 'no_lot',
    },
    {
        headerName: 'Tgl Expired',
        width: 100,
        field : 'tgl_exp',
    },
    {
        headerName: 'Keterangan',
        width: 200,
        field : 'ktrng_dtng',
    },
    {
        headerName: 'Return Produksi',
        width: 100,
        field : 'retn_prod',
    },
    {
        headerName: 'Produksi',
        width: 100,
        field : 'prod',
    },
    {
        headerName: 'Pindah Barang ',
        width: 100,
        field : 'pindh_brng',
    },
    {
        headerName: 'Rincian Barang',
        width: 150,
        field : 'rincian_bar',
    },
    {
        headerName: 'No Urut',
        width: 90,
        field : 'no_urut',
    },
    {
        headerName: 'Jam Datang',
        width: 100,
        field : 'jam_dtng',
    },
    {
        headerName: 'Jam Selesai',
        width: 100,
        field : 'jam_slsai',
    },
    {
        headerName: 'Petugas',
        width: 100,
        field : 'ptgas',
    },
    {
        headerName: 'Diperiksa Oleh',
        width: 100,
        field : 'periksa_olh',
    },
    {
        headerName: 'Admin / Leader',
        width: 100,
        field : 'adm_ldr',
    },
    {
        field : 'Action',
        headerName: 'Action',
        cellRenderer: BtnLogbook,
          cellRendererParams: {
            clicked: function (field) {
              alert(`${field} was clicked`);
            },
          },
        width: 60,
        pinned: 'right'
    }
]



