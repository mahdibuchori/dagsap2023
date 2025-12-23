import { BtnPengadaan } from '../Forms/PengadaanBarang/BtnPengadaan';
import { BtnPurchasing } from '../Forms/PurchasingOrder/BtnPurchasing';
import { BtnTerima } from '../Forms/KedatanganBarang/BtnTerima';
import { BtnLogbook } from '../Forms/KedatanganBarang/BtnLogbook';
import { BtnKaryawan } from '../Forms/karyawan/BtnKaryawan';
import { PopupCellRenderer } from '../Forms/PurchasingOrder/PopupCellRenderer';

import { format } from "date-fns";
import id from 'date-fns/locale/id';


const departement = ["", "GW-LAMPUNG", "GW-PUSAT", "GW-SERANG", "JABAR-BANDUNG", "JABAR-SUBANG", "JATENG-BANTUL", "JATENG-SEMARANG", "JATIM-BANJARMASIN", "JATIM-JEMBER", "JATIM-MADIUN", "JATIM-SURABAYA", "PABRIK SENTUL", "PABRIK YOGYA", "RPA" ];

export const COLUMNS_PENGADAAN =[
    /* ID */
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
    /* pemohon */
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
    /* Tgl Permohonan */
    {
        headerName: 'Tgl Permohonan',
        field : 't_pengadaan',
        width: 110,
    },
    /* Tgl Verifikasi */
    {
        headerName: 'Tgl Verifikasi',
        field : 'tgl_verify',
        width: 110,
    },
    /* Nama Barang */
    {
        headerName: 'Nama Barang',
        field : 'tipeMaterial',
        width:150,
        maxWidth: 550
    },
    /* Merk */
    {
        headerName: 'Merk',
        field : 'brandMaterial',
        width:150,
        maxWidth: 550
    },
    /* order */
    {
        field : 'order',
        valueGetter: params => {
            let nilai  = params.data.qty_pengadaan[0].order;
            return nilai;
        },
        width: 90,
        maxWidth:105,
    },
    /* Unit */
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
    /* status */
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
            else if (params.value ==='Reject') {
                return {color: '#7a0080', backgroundColor: '#F0C571', borderRadius: '8px', height: 30, lineHeight: 2, marginTop: '3px',textAlign: 'center'};
            }
            else {
                return null;
            }
        }
    },
    /* Item */
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
    /* Spesifikasi */
    {
        headerName: 'Spesifikasi',
        field : 'spesifikasi',
        width:400,
        maxWidth: 850
    },
    /* NO PO */
    {
        headerName: 'NO PO',
        field : 'material',
        valueGetter: params => {
            const data = params.data.parsial_data
            
            let file = [];
            for(let x =0; x < data.length; x++){
                if(data[x] !== ""){
                    file.push(data[x].po)
                }
            }
            let unique = [...new Set(file)];
            var filtered = unique.filter(function (el) {
                return el !== '';
              });
            return filtered;
        },
        width: 200,
        maxWidth:505,
    },
    /* Action */
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

export const COLUMNS_PENGADAAN1 =[
    /* ID */
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
    /* pemohon */
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
    /* Tgl Permohonan */
    {
        headerName: 'Tgl Permohonan',
        field : 't_pengadaan',
        width: 110,
    },
    /* Tgl Verifikasi */
    {
        headerName: 'Tgl Verifikasi',
        field : 'tgl_verify',
        width: 110,
    },
    /* Nama Barang */
    {
        headerName: 'Nama Barang',
        field : 'tipeMaterial',
        width:150,
        maxWidth: 550
    },
    /* Merk */
    {
        headerName: 'Merk',
        field : 'brandMaterial',
        width:150,
        maxWidth: 550
    },
    /* order */
    {
        field : 'order',
        valueGetter: params => {
            let nilai  = params.data.qty_pengadaan[0].order;
            return nilai;
        },
        width: 90,
        maxWidth:105,
    },
    /* Unit */
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
    /* status */
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
            else if (params.value ==='Reject') {
                return {color: '#7a0080', backgroundColor: '#F0C571', borderRadius: '8px', height: 30, lineHeight: 2, marginTop: '3px',textAlign: 'center'};
            }
            else {
                return null;
            }
        }
    },
    /* Item */
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
    /* Spesifikasi */
    {
        headerName: 'Spesifikasi',
        field : 'spesifikasi',
        width:400,
        maxWidth: 850
    },
    /* NO PO */
    {
        headerName: 'NO PO',
        field : 'material',
        valueGetter: params => {
            const data = params.data.parsial_data
            
            let file = [];
            for(let x =0; x < data.length; x++){
                if(data[x] !== ""){
                    file.push(data[x].po)
                }
            }
            let unique = [...new Set(file)];
            var filtered = unique.filter(function (el) {
                return el !== '';
              });
            return filtered;
        },
        width: 120,
        maxWidth:505,
        pinned: 'right'
    }
]

export const COLUMNS_KARYAWAN =[
    /* NIK */
    {
        headerName: 'NIK',
        field : 'uuid',
        width: 200,
        suppressSizeToFit: true,
        filter: 'agTextColumnFilter',
    },
    /* Nama */
    {
        headerName: 'Nama',
        field : 'uname',
        width: 250,
        maxWidth:450,
        // cellRenderer: ImageRenderer,
    },
    /* Divisi */
    {
        headerName: 'Divisi',
        field : 'udivisi',
        width: 150,
        maxWidth:175,
    },
    /* SubDivisi */
    {
        headerName: 'SubDivisi',
        field : 'usubdiv',
        width: 150,
        maxWidth:175,
    },
    /* Jabatan */
    {
        headerName: 'Jabatan',
        field : 'ujabatan',
        width: 150,
        maxWidth:175,
    },
    /* Plan */
    {
        headerName: 'Plan',
        field : 'uplan',
        width: 100,
        maxWidth:155,
    },
    /* action */
    {
        field : '',
        headerName: '',
        cellRenderer: BtnKaryawan,
        width: 170,
        pinned: 'right'
    }
]

export const COLUMNS_PROVIDER =[
    /* ID */
    {
        headerName: 'ID',
        field : 'id_provider',
        width: 100,
        suppressSizeToFit: true,
        filter: 'agTextColumnFilter',
    },
    /* Nama Pemasok */
    {
        headerName: 'Nama Pemasok',
        width: 200,
        maxWidth:350,
        field : 'nama_provider',
    },
    /* Telephon */
    {
        headerName: 'Telephon',
        field : 'tlp_provider',
        width: 150,
        maxWidth:175,
    },
    /* Alamat */
    {
        headerName: 'Alamat',
        field : 'almt_provider',
        width: 400,
        maxWidth:555,
    },
    /* action */
    {
        field : '',
        headerName: 'Action',
        // cellRenderer: BtnProvider,
        width: 70,
        pinned: 'right'
    }
]

export const COLUMNS_BOM =[
    /* ID */
    {
        headerName: 'ID',
        field : 'id_bom',
        width: 120,
        suppressSizeToFit: true,
        filter: 'agTextColumnFilter',
    },
    /* No BOM */
    {
        headerName: 'No BOM',
        width: 100,
        maxWidth:350,
        field : 'no_bom',
    },
    /* No. Item */
    {
        headerName: 'No. Item',
        field : 'id_item',
        width: 80,
        maxWidth:175,
    },
    /* Deskripsi Item */
    {
        headerName: 'Deskripsi Item',
        field : 'deskripsi_item',
        width: 500,
        maxWidth:755,
    },
    /* Varian */
    {
        headerName: 'Varian',
        field : 'varian',
        width: 100,
        maxWidth:255,
    },
    /* Revisi */
    {
        headerName: 'Revisi',
        field : 'revisi',
        width: 100,
        maxWidth:255,
    },
    /* Action */
    {
        field : '',
        headerName: 'Action',
        // cellRenderer: BtnBom,
        width: 120,
        pinned: 'right'
    }
]

export const COLUMNS_GUDANG =[
    /* Material */
    {
        headerName: 'Material',
        field : 'item',
        width: 250,
        suppressSizeToFit: true,
        filter: 'agTextColumnFilter',
    },
    /* Unit */
    {
        headerName: 'Unit',
        width: 80,
        field : 'unit',
    },
    /* S_Awal */
    {
        headerName: 'S_Awal',
        field : 'saldo_awal',
        width: 100,
        maxWidth:175,
    },
    /* S_Akhir */
    {
        headerName: 'S_Akhir',
        field : 'saldo_akhir',
        width: 100,
        maxWidth:175,
    },
    /* Rtrn Prod */
    {
        headerName: 'Rtrn Prod',
        field : 'ret_prod',
        width: 150,
        maxWidth:255,
    },
    /* Permintaan Prod */
    {
        headerName: 'Permintaan Prod',
        field : 'perm_prod',
        width: 150,
        maxWidth:255,
    },
    /* Status */
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
    /* Action */
    {
        field : '',
        headerName: 'Action',
        // cellRenderer: BtnStok,
        width: 150,
        pinned: 'right'
    }
]

export const COLUMNS_OKP =[
    /* No */
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
    /* KODE OKP */
    {
        headerName: 'KODE OKP',
        width: 180,
        field : 'kodeOKP',
    },
    /* Nama Produk */
    {
        headerName: 'Nama Produk',
        field : 'produk',
        width: 350,
        suppressSizeToFit: true,
    },
    /* Jumlah (batch) */
    {
        headerName: 'Jumlah (batch)',
        field : 'batch',
        width: 120,
    },
    /* Varian Packing */
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
    /* REVISI */
    {
        headerName: 'REVISI',
        field : 'revisi',
        width: 100,
    },
    /* Action */
    {
        field : '',
        headerName: 'Action',
        // cellRenderer: BtnOkp,
        width: 120,
        pinned: 'right'
    }
]

export const COLUMNS_OKPNOTE =[
    /* no */
    {
        headerName: '',
        field : 'no',
        width: 150,
    },
    /* Note */
    {
        headerName: 'Note',
        width: 500,
        field : 'note',
    },
    /* Action */
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
    /* Item */
    {
        headerName: 'Item',
        field : 'nama_item',
        width: 150,
        maxWidth:175,
        suppressSizeToFit: true,
        pinned: 'left',
        filter: 'agTextColumnFilter',
    },
    /* Estimasi */
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
    /* Permintaan */
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
    /* Pengeluaran */
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
    /* satuan */
    {
        headerName: 'satuan',
        field : 'satuan',
        width: 100,
        maxWidth:115,
    },
    /* Status Item */
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
            else if (params.value ==='Reject') {
                return {color: '#7a0080', backgroundColor: '#F0C571', borderRadius: '8px', height: 30, lineHeight: 2, marginTop: '3px',textAlign: 'center'};
            }
            else {
                return null;
            }
        }
    },
    /* Waktu Kirim */
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
    /* List */
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
    /* Action */
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
    /* Item */
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
    /* Unit */
    {
        headerName: 'Unit',
        field : 'unit',
        width: 95,
        maxWidth:105,
    },
    /* Stok */
    {
        headerName: 'Stok',
        field : 'stok',
        width: 95,
        maxWidth:155,
    },
    /* Pengeluaran Akhir */
    {
        headerName: 'Pengeluaran Akhir',
        field : 'pengeluaran',
        width: 115,
        maxWidth:155,
    },
    /* Tgl Keluar */
    {
        headerName: 'Tgl Keluar',
        field : 'tgl_keluar',
        width: 115,
        maxWidth:155,
    },
    /* Buffer */
    {
        headerName: 'Buffer',
        field : 'buffer',
        width: 100,
        maxWidth:115,
    },
    /* Maksimal Stok */
    {
        headerName: 'Maksimal Stok',
        field : 'maks_Stok',
        width: 100,
        maxWidth:115,
    },
    /* Status */
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
    /* Tgl Pengajuan */
    {
        headerName: 'Tgl Pengajuan',
        field : 'tgl_pengajuan',
        width: 130,
        maxWidth:155,
    },
    /* Tgl Order */
    {
        headerName: 'Tgl Order',
        field : 'tgl_order',
        width: 130,
        maxWidth:155,
    },
    /* Action */
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
    /* Item */
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
    /* Tanggal */
    {
        headerName: 'Tanggal',
        field : 'tanggal',
        width: 95,
        maxWidth:155,
    },
    /* Sumber */
    {
        headerName: 'Sumber',
        field : 'sumber',
        width: 95,
        maxWidth:155,
    },
    /* Tipe */
    {
        headerName: 'Tipe',
        field : 'tipe',
        width: 115,
        maxWidth:155,
    },
    /* Provider */
    {
        headerName: 'Provider',
        field : 'provider',
        width: 115,
        maxWidth:155,
    },
    /* No. Lot */
    {
        headerName: 'No. Lot',
        field : 'lot',
        width: 100,
        maxWidth:115,
    },
    /* Expired */
    {
        headerName: 'Expired',
        field : 'expired',
        width: 100,
        maxWidth:115,
    },
    /* Keterangan */
    {
        headerName: 'Keterangan',
        field : 'keterangan',
        width: 130,
        maxWidth:155,
    },
    /* Terima Barang */
    {
        headerName: 'Terima Barang',
        field : 'terima_barang',
        width: 130,
        maxWidth:155,
    },
    /* Return Produksi */
    {
        headerName: 'Return Produksi',
        field : 'return_prod',
        width: 130,
        maxWidth:155,
    },
    /* Produksi */
    {
        headerName: 'Produksi',
        field : 'produksi',
        width: 130,
        maxWidth:155,
    },
    /* Pindah Barang */
    {
        headerName: 'Pindah Barang',
        field : 'pindah_barang',
        width: 130,
        maxWidth:155,
    },
    /* Saldo */
    {
        headerName: 'Saldo',
        field : 'saldo',
        width: 130,
        maxWidth:155,
    },
    /* Stok Awal */
    {
        headerName: 'Stok Awal',
        field : 'stok_awal',
        width: 130,
        maxWidth:155,
    },
    /* Stock Akhir */
    {
        headerName: 'Stock Akhir',
        field : 'stock_akhir',
        width: 130,
        maxWidth:155,
    },
    /* Petugas */
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
        pinned: 'left',
    },
    { 
        headerName: 'Nama Barang',
        field : 'newMaterial',
        width: 150,
        maxWidth:405, 
        hide : true
    },
    { 
        headerName: 'Tipe',
        field : 'tipe',
        width: 150,
        maxWidth:405,
        hide : true
    },
    { 
        headerName: 'Jumlah',
        field : 'qty',
        width: 110,
        editable: true,
        cellRenderer: params => {
            let data = params.data;
            data.parsial = []
            const parAwal = data.parsialAwal;
            let bln = format(new Date(), "MM", { locale: id });
            let tahun = format(new Date(), "yyyy", { locale: id });
            let day = format(new Date(), "dd", { locale: id });

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
                let akhrn = parseFloat(data.qty);
                let saldo = akhrn - awaln;
                hSatuan = (parseFloat(data.qty)).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                if(awaln !== akhrn){
                    data.parsial = [];
                    const dt_A = data.parsi;
                    const nec = dt_A.map((obj, i)=>{
                        return({
                            "po": obj.po,
                            "qty": obj.qty,
                            "expro": obj.expro,
                            "noAkun": obj.noAkun,
                            "tglDatang": obj.tglDatang
                        })
                    }) 
                    const cb = []
                    for(let x =0; x < nec.length; x++){
                        if(nec[x].po === "" && nec[x].noAkun === "min"){
                            cb.push(x)
                        }
                    }
                    if(cb.length !== 0){
                        let total = parseFloat(dt_A[cb[0]].qty);
                        for(let i = 1; i < cb.length; i++){
                            let id = cb[i];
                            total += parseFloat(dt_A[id].qty);
                            nec.splice(id, 1)
                            
                        }
                        nec[cb[0]].qty = `${total}`
                        nec[cb[0]].noAkun = ""
                    }
                    const cek = nec.filter((i)=> i.po === "");
                    let sum = cek.reduce(function (s, a) {
                        return s + parseFloat(a.qty);
                    }, 0);
                    let newSaldo = akhrn - sum;
                    if(newSaldo !== 0){
                        if(saldo > 0){
                            let files = []
                            let jml = 0
                            for(let x = 0; x < cek.length ; x++){
                                if(cek[x].po === ""){
                                    jml += parseFloat(cek[x].qty)
                                    if(jml <= akhrn){
                                        files.push({tgl: cek[x].tglDatang, qty: cek[x].qty})
                                    }
                                    
                                }
                            }
                            // console.log(files)
                            let ttl = akhrn - jml;
                            // console.log(ttl)
                            // console.log(jml)
                            if(ttl > 0){
                                files.push({
                                    tgl : `${tahun}-${bln}-${day}`,
                                    qty : `${ttl}`
                                })
                            }
                            else{
                                let sums = files.reduce(function (s, a) {
                                    return s + parseFloat(a.qty);
                                }, 0);
                                // console.log(sums)
                                let tts = akhrn - sums;
                                files.push({
                                    tgl : `${tahun}-${bln}-${day}`,
                                    qty : `${tts}`
                                })
                            }
                            data.parsial.length = 0;
                            
                            for(let y = 0; y < files.length; y++){
                                params.data.parsial.push(files[y])
                            }
                        }
                        else{
                            let filen = []
                            let jml = akhrn
                            let ttl = 0
                            for(let x = 0; x < cek.length ; x++){
                                let n = parseFloat(cek[x].qty) - parseFloat(jml)
                                if(cek[x].po === ''){
                                    if(parseFloat(jml) === parseFloat(cek[x].qty)){
                                        filen.push({
                                            tgl : `${cek[x].tglDatang}`,
                                            qty : `${cek[x].qty}`
                                        });
                                        break
                                    }
                                    else if(parseFloat(jml) < parseFloat(cek[x].qty)){
                                        ttl += n
                                        break
                                    }
                                    else{
                                        filen.push({
                                            tgl : `${cek[x].tglDatang}`,
                                            qty : `${cek[x].qty}`
                                        })
                                        jml -= parseFloat(cek[x].qty)
                                    }
                                    
                                }
                            }
                            
                            // console.log(ttl)
                            if(filen.length > 0){
                                if(ttl > 0){
                                    filen.push({
                                        tgl : `${tahun}-${bln}-${day}`,
                                        qty : `${jml}`
                                    })
                                }
                                else{}
                            }
                            else{
                                if(ttl > 0){
                                    filen.push({
                                        tgl : `${tahun}-${bln}-${day}`,
                                        qty : `${akhrn}`
                                    })
                                }
                                else{} 
                            }

                            
                            data.parsial.length = 0;
                            
                            for(let y = 0; y < filen.length; y++){
                                params.data.parsial.push(filen[y])
                            }
                            // console.log(filen)
                        }
                    }
                    else{
                        for(let y = 0; y < cek.length; y++){
                            params.data.parsial.push({qty : cek[y].qty, tgl : cek[y].tglDatang})
                        };
                        console.log('log = 0')
                    }
                }
                else{
                    console.log('sama')
                }
            }
            console.log(hSatuan)
            console.log(data)
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
        headerName: 'Unit',
        field : 'newSatuan',
        width: 70,
        editable: false,
        hide : true
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
        editable: true,
        cellEditor: "agSelectCellEditor",
        cellEditorParams: {
            values: departement,
        },
    },
    { 
        headerName: 'Barang',
        field : 'itemNo',
        width: 110,
    },
    { 
        headerName: '',
        colId: 'action',
        editable: false,
        maxWidth: 15,
        cellStyle: {padding: 0},
        cellRenderer: PopupCellRenderer,
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
        field : 'newSpek',
        width: 200,
        editable: true,
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

export const COLUMNS_DATAPOEDIT =[
    { 
        headerName: 'Nama Barang',
        field : 'material',
        width: 150,
        maxWidth:405,
        editable: true,
        pinned: 'left',
    },
    { 
        headerName: 'Nama Barang',
        field : 'newMaterial',
        width: 150,
        maxWidth:405, 
        hide : true
    },
    { 
        headerName: 'Tipe',
        field : 'tipe',
        width: 150,
        maxWidth:405,
        hide : true
    },
    { 
        headerName: 'Jumlah',
        field : 'qty',
        width: 110,
        editable: true,
        cellRenderer: params => {
            let data = params.data;
            let bln = format(new Date(), "MM", { locale: id });
            let tahun = format(new Date(), "yyyy", { locale: id });
            let day = format(new Date(), "dd", { locale: id });
            let hSatuan = 0;
            if(data.qty === undefined || data.qty === ""){
                hSatuan = 0;
                params.data.parsial[0].qty = 0;
            }
            else{
                // const awaln = parseFloat(data.qtyAwal);
                let akhrn = parseFloat(data.qty);
                hSatuan = (parseFloat(data.qty)).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                data.parsial = [];
                const dt_A = data.parsi;
                const id = data.mypo
                const hil_max = dt_A.findIndex((i) => i.noAkun === "max" && i.po === id);
                if(hil_max >= 0){dt_A.splice(hil_max, 1)}else{};
                const nec = dt_A.map((obj, i)=>{
                    let cc = "";
                    let epro = ""
                    if(obj.po === id){cc = ""; epro =""}else{cc = obj.po; epro = obj.expro}
                    return({
                        "po": cc,
                        "qty": obj.qty,
                        "expro": epro,
                        "noAkun": obj.noAkun,
                        "tglDatang": obj.tglDatang
                    })
                })
                const cb = []
                for(let x =0; x < nec.length; x++){
                    if(nec[x].po === "" && nec[x].noAkun === "min"){
                        cb.push(x)
                    }
                }
                if(cb.length !== 0){
                    let total = parseFloat(nec[cb[0]].qty);
                    for(let i = 1; i < cb.length; i++){
                        let id = cb[i];
                        total += parseFloat(nec[id].qty);
                        nec.splice(id, 1)
                        
                    }
                    nec[cb[0]].qty = `${total}`
                    nec[cb[0]].noAkun = ""
                }
                const cek = nec.filter((i)=> i.po === "");
                // console.log(cek)
                let sum = cek.reduce(function (s, a) {
                    return s + parseFloat(a.qty);
                }, 0);
                let newSaldo = akhrn - sum;
                // console.log(newSaldo)
                if(newSaldo !== 0){
                    if(newSaldo > 0){
                        let files = []
                        let jml = 0
                        for(let x = 0; x < cek.length ; x++){
                            if(cek[x].po === ""){
                                jml += parseFloat(cek[x].qty)
                                if(jml <= akhrn){
                                    files.push({tgl: cek[x].tglDatang, qty: cek[x].qty})
                                }
                                
                            }
                        }
                        console.log(files)
                        let ttl = akhrn - jml;
                        // console.log(ttl)
                        if(ttl > 0){
                            files.push({
                                tgl : `${tahun}-${bln}-${day}`,
                                qty : `${ttl}`
                            })
                        }
                        data.parsial.length = 0;
                        
                        for(let y = 0; y < files.length; y++){
                            params.data.parsial.push(files[y])
                        }
                    }
                    else{
                        let filen = []
                        let jml = akhrn
                        let ttl = 0
                        for(let x = 0; x < cek.length ; x++){
                            let n = parseFloat(cek[x].qty) - parseFloat(jml)
                            if(cek[x].po === ''){
                                if(parseFloat(jml) === parseFloat(cek[x].qty)){
                                    filen.push({
                                        tgl : `${cek[x].tglDatang}`,
                                        qty : `${cek[x].qty}`
                                    });
                                    break
                                }
                                else if(parseFloat(jml) < parseFloat(cek[x].qty)){
                                    ttl += n
                                    break
                                }
                                else{
                                    filen.push({
                                        tgl : `${cek[x].tglDatang}`,
                                        qty : `${cek[x].qty}`
                                    })
                                    jml -= parseFloat(cek[x].qty)
                                }
                                
                            }
                        }
                        
                        // console.log(ttl)
                        if(filen.length > 0){
                            if(ttl > 0){
                                filen.push({
                                    tgl : `${tahun}-${bln}-${day}`,
                                    qty : `${jml}`
                                })
                            }
                            else{}
                        }
                        else{
                            if(ttl > 0){
                                filen.push({
                                    tgl : `${tahun}-${bln}-${day}`,
                                    qty : `${akhrn}`
                                })
                            }
                            else{} 
                        }

                        
                        data.parsial.length = 0;
                        
                        for(let y = 0; y < filen.length; y++){
                            params.data.parsial.push(filen[y])
                        }
                        // console.log(filen)
                    }
                }
                else{
                    // console.log(cek)
                    for(let y = 0; y < cek.length; y++){
                        params.data.parsial.push({qty : cek[y].qty, tgl : cek[y].tglDatang})
                    };
                    console.log('log = 0')
                }
                
            }
            // console.log(data)
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
        headerName: 'Unit',
        field : 'newSatuan',
        width: 70,
        editable: false,
        hide : true
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
        editable: true,
        cellEditor: "agSelectCellEditor",
        cellEditorParams: {
            values: departement,
        },
    },
    { 
        headerName: 'Barang',
        field : 'itemNo',
        width: 110,
    },
    { 
        headerName: '',
        colId: 'action',
        editable: false,
        maxWidth: 15,
        cellStyle: {padding: 0},
        cellRenderer: PopupCellRenderer,
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
        field : 'newSpek',
        width: 200,
        editable: true,
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

export const COLUMNS_DATAPOVIEW =[
    { 
        headerName: 'Nama Barang',
        field : 'material',
        width: 150,
        maxWidth:405,
        pinned: 'left',
    },
    { 
        headerName: 'Jumlah',
        field : 'qty',
        width: 110,
    },
    { 
        headerName: 'Unit',
        field : 'satuan',
        width: 70,
    },
    { 
        headerName: 'Harga Satuan',
        field : 'hargasatuan',
        width: 110,
        cellDataType: 'number',
    },
    { 
        headerName: '% Disc',
        field : 'diskon',
        width: 80,
    },
    { 
        headerName: 'Jumlah Harga',
        field : 'jmlhHarga',
        width: 120,
    },
    { 
        headerName: 'Departemen',
        field : 'departement',
        width: 120,
    },
    { 
        headerName: 'Barang',
        field : 'itemNo',
        width: 110,
    },
    { 
        headerName: 'Pajak',
        field : 'pajak',
        width: 70,
    },
    { 
        headerName: 'Spesifikasi',
        field : 'newSpek',
        width: 200,
    },
    { 
        headerName: 'Divisi',
        field : 'divisi',
        width: 110,
    },
    { 
        headerName: 'Terima',
        field : 'terima',
        width: 120,
    },
    { 
        headerName: 'Tutup',
        field : 'tutup',
        width: 120,
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
        headerName: 'Dibuat Oleh',
        width: 150,
        field : 'user',
        /* cellRenderer: params => {
            let data = params.data;
            // console.log(data)
        } */
    },
    {
        headerName: 'Tgl Verifikasi',
        width: 150,
        field : 'tgl_verify',
    },
    {
        headerName: 'Tgl Approved',
        width: 150,
        field : 'tgl_approve',
    },
    {
        headerName: 'Tgl Email',
        width: 150,
        field : 'tgl_email',
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

export const COLUMNS_EXPRO =[
    { 
        headerName: 'ID',
        field : 'id',
        width: 150,
        maxWidth:405,
        pinned: 'left',
    },
    { 
        headerName: 'Person No',
        field : 'personno',
        width: 150,
        maxWidth:405, 
    },
    { 
        headerName: 'Name',
        field : 'name',
        width: 350,
        maxWidth:405,
    },
    { 
        headerName: 'Currency ID',
        field : 'currencyid',
        width: 110,
    },
    { 
        headerName: 'Currency Name',
        field : 'currencyname',
        width: 70,
    },
    { 
        headerName: 'Term ID',
        field : 'termid',
        width: 70,
    },
    { 
        headerName: 'Term Name',
        field : 'termname',
        width: 110,
    },
    { 
        headerName: 'Tax 1 ID',
        field : 'tax1id',
        width: 80,
    },
    { 
        headerName: 'Tax 1 Code',
        field : 'tax1code',
        width: 80,
    },
    { 
        headerName: 'Tax 1 Name',
        field : 'tax1name',
        width: 80,
    },
    { 
        headerName: 'Tax 1 Rate',
        field : 'tax1rate',
        width: 80,
    },
    { 
        headerName: 'Tax 2 ID',
        field : 'tax2id',
        width: 80,
    },
    { 
        headerName: 'Tax 2 Code',
        field : 'tax2code',
        width: 80,
    },
    { 
        headerName: 'Tax 2 Name',
        field : 'tax2name',
        width: 80,
    },
    { 
        headerName: 'Tax 2 Rate',
        field : 'tax2rate',
        width: 80,
    },
    { 
        headerName: 'address 1',
        field : 'addressline1',
        width: 80,
    },
    { 
        headerName: 'addressline 2',
        field : 'addressline2',
        width: 80,
    },
    { 
        headerName: 'City',
        field : 'city',
        width: 80,
    },
    { 
        headerName: 'State Prov',
        field : 'stateprov',
        width: 80,
    },
    { 
        headerName: 'Zipcode',
        field : 'zipcode',
        width: 80,
    },
    { 
        headerName: 'country',
        field : 'Country',
        width: 80,
    },
    { 
        headerName: 'Phone',
        field : 'phone',
        width: 80,
    },
    { 
        headerName: 'email',
        field : 'email',
        width: 80,
    }
]

export const COLUMNS_MATERIAL =[
    { 
        headerName: 'Item No',
        field : 'itemno',
        width: 150,
        maxWidth:405, 
        pinned: 'left',
    },
    { 
        headerName: 'Item Type',
        field : 'itemtype',
        width: 150,
        maxWidth:405,
    },
    { 
        headerName: 'Item Description',
        field : 'itemdescription',
        width: 350,
        maxWidth:405,
    },
    { 
        headerName: 'Unit 1',
        field : 'unit1',
        width: 100,
    },
    { 
        headerName: 'Unit 2',
        field : 'unit2',
        width: 100,
    },
    { 
        headerName: 'Unit 3',
        field : 'unit3',
        width: 100,
    },
    { 
        headerName: 'Category Id',
        field : 'categoryid',
        width: 150,
    },
    { 
        headerName: 'Kategori',
        field : 'kategori',
        width: 150,
    },
]

export const COLUMNS_DEPARTEMEN =[
    { 
        headerName: 'Dept Id',
        field : 'deptId',
        width: 200,
        maxWidth:405,
        pinned: 'left',
    },
    { 
        headerName: 'Dept No',
        field : 'deptNo',
        width: 200,
        maxWidth:405, 
    },
    { 
        headerName: 'Dept Name',
        field : 'deptName',
        width: 350,
        maxWidth:405,
    },
    { 
        headerName: 'Sub Dept Id',
        field : 'subDeptId',
        width: 200,
    },
    { 
        headerName: 'Parent Name',
        field : 'parentName',
        width: 200,
    },
]

// Nomer	Nama Pengirim	Nama doc	Tanggal Kirim	Tanggal Terima	Status Doc	Keterangan doc

//id, pengirim, iddoc, nama_Doc, tgl_kirim, tgl_terima, status_Doc, keterangan_doc
export const COLUMNS_FORMKIRIM =[
    { 
        headerName: 'Id',
        field : 'id',
        width: 120,
        maxWidth:405,
        pinned: 'left',
    },
    { 
        headerName: 'Nama Pengirim',
        field : 'pengirim',
        width: 150,
        maxWidth:405, 
    },
    { 
        headerName: 'ID Dokumen',
        field : 'iddoc',
        width: 150,
        maxWidth:405,
    },
    { 
        headerName: 'Nama Dokumen',
        field : 'nama_Doc',
        width: 200,
        maxWidth:405,
    },
    { 
        headerName: 'Tanggal Kirim',
        field : 'tgl_kirim',
        width: 150,
    },
    { 
        headerName: 'Tanggal Terima',
        field : 'tgl_terima',
        width: 150,
    },
    { 
        headerName: 'Tanggal Kirim Ulang',
        field : 'tgl_ulang',
        width: 180,
    },
    { 
        headerName: 'Status Doc',
        field : 'status_Doc',
        width: 130,
    },
    { 
        headerName: 'Keterangan Dokumen',
        field : 'keterangan_doc',
        maxWidth:555, 
    },
]




