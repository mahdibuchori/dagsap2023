export const FileBulan = [
    { value: '1', label: 'Januari' },
    { value: '2', label: 'Februari' },
    { value: '3', label: 'Maret' },
    { value: '4', label: 'April' },
    { value: '5', label: 'Mei' },
    { value: '6', label: 'Juni' },
    { value: '7', label: 'Juli' },
    { value: '8', label: 'Agustus' },
    { value: '9', label: 'September' },
    { value: '10', label: 'Oktober' },
    { value: '11', label: 'November' },
    { value: '12', label: 'Desember' }
]

export const FileTahun = [
  { value: '2021', label: '2021' },
  { value: '2022', label: '2022' },
  { value: '2023', label: '2023' },
  { value: '2024', label: '2024' },
  { value: '2025', label: '2025' },
  { value: '2026', label: '2026' },
  { value: '2027', label: '2027' },
  { value: '2028', label: '2028' },
  { value: '2029', label: '2029' }
]

export const FileDivisi = [
  { value: 'All', label: 'All', subDiv :[{lab: 'All', valu: 'All'}]},
  { value: 'BOD/BOC', label: 'BOD/BOC', subDiv :[{lab: 'BOD/BOC', valu: 'BOD/BOC'}]},
  { value: 'FAT', label: 'FAT', subDiv :[{lab: 'FAT', valu: 'FAT'},{lab: 'Budgeting', valu: 'Budgeting'},{lab: 'FAT & Budgeting', valu: 'FAT & Budgeting'}]},
  { value: 'HR-GA', label: 'HR-GA', subDiv :[{lab: 'HR-GA', valu: 'HR-GA'}]},
  { value: 'Maintenance', label: 'Maintenance', subDiv :[{lab: 'Maintenance', valu: 'Maintenance'}]},
  { value: 'PPIC-Purchasing', label: 'PPIC-Purchasing', subDiv :[{lab: 'PPIC-WH', valu: 'PPIC-WH'},{lab: 'Purchasing', valu: 'Purchasing'},{lab: 'WIP', valu: 'WIP'},{lab: 'FG', valu: 'FG'},{lab: 'Koperasi', valu: 'Koperasi'}]},
  { value: 'Produksi', label: 'Produksi', subDiv :[{lab: 'Produksi', valu: 'Produksi'}]},
  { value: 'QAQC', label: 'QAQC', subDiv :[{lab: 'QAQC', valu: 'QAQC'}]},
  { value: 'RnD', label: 'RnD', subDiv :[{lab: 'RnD', valu: 'RnD'}]},
  { value: 'Sales-Marketing', label: 'Sales-Marketing', subDiv :[{lab: 'Marketing', valu: 'Marketing'},{lab: 'Sales', valu: 'Sales'}]},
  { value: 'SSD', label: 'SSD', subDiv :[{lab: 'SSD', valu: 'SSD'}]},
]

export const SubDivisi = [
  { value: 'FG', label: 'FG' },
  { value: 'PPIC-WH', label: 'PPIC-WH' },
  { value: 'Purchasing', label: 'Purchasing' },
]

export const FileTipe = [
  { value: 'Daging', label: 'Daging' },
  { value: 'Inggredient', label: 'Inggredient' },
  { value: 'Kimia', label: 'Kimia' },
  { value: 'Packaging', label: 'Packaging' },
  { value: 'Lain-Lain', label: 'Lain-Lain' },
]

export const FilePlan = [
  { value: 'GW', label: 'GW' },
  { value: 'Sentul', label: 'Sentul' },
  { value: 'Yogyakarta', label: 'Yogyakarta' }
]

export const FileLevel = [
  { value: 1, label: 'Level1', jabatan :[{lab: 'BOD/BOC', val : 'BOD/BOC'}]},
  { value: 2, label: 'Level2', jabatan :[{lab: 'Manager', val : 'Manager'}]},
  { value: 3, label: 'Level3', jabatan :[{lab: 'Supervisor', val : 'Supervisor'}]},
  { value: 4, label: 'Level4', jabatan :[{lab: 'Leader', val : 'Leader'}]},
  { value: 5, label: 'Level5', jabatan :[{lab: 'Admin', val : 'Admin'},{lab: 'Staff', val : 'Staff'}]},
  { value: 6, label: 'Level6', jabatan :[{lab: 'Operator', val : 'Operator'}, {lab: 'Helper', val : 'Helper'}]},
  { value: 7, label: 'Level7', jabatan :[{lab: 'None', val : 'None'}]},
]

export const FileSatuan = [
  { value: 'Batang', label: 'Batang' },
  { value: 'Kg', label: 'Kg' },
  { value: 'Kubik', label: 'Kubik' },
  { value: 'Lembar', label: 'Lembar' },
  { value: 'Liter', label: 'Liter' },
  { value: 'Meter', label: 'Meter' },
  { value: 'Pcs', label: 'Pcs' },
  { value: 'Roll', label: 'Roll' },
  { value: 'Sak', label: 'Sak' },
  { value: 'Unit', label: 'Unit' }
]

export const FileBarang = [
  { value: '', label: '' }
]

export const FilePart = [
  { value: 'Baut & Mur', label: 'Baut & Mur' },
  { value: 'Bearing', label: 'Bearing' },
  { value: 'Ekspedisi', label: 'Ekspedisi' },
  { value: 'Elektrik', label: 'Elektrik' },
  { value: 'Mekanikal', label: 'Mekanikal' },
  { value: 'Seal & Ring', label: 'Seal & Ring' },
  { value: 'Utility', label: 'Utility' },
  { value: 'V Belt', label: 'V Belt' },
  { value: 'Non Inventory', label: 'Non Inventory' },
]

export const FileRevOKP = [
  { value: '---', label: '---' },
  { value: 'Rev1', label: 'Rev1' },
  { value: 'Rev2', label: 'Rev2' },
  { value: 'Rev3', label: 'Rev3' },
  { value: 'Rev4', label: 'Rev4' },
  { value: 'Rev5', label: 'Rev5' },
]

export const FilePajak = [
  { value: '', label: '', ppn: '0', pph: '0' },	
  { value: 'A', label: 'A', ppn: '0', pph: '2.5' },
  { value: 'B', label: 'B', ppn: '0', pph: '3' },
  { value: 'D', label: 'D', ppn: '0', pph: '0' },
  { value: 'E', label: 'E', ppn: '0', pph: '10' },
  { value: 'G', label: 'G', ppn: '0', pph: '0.5' },
  { value: 'R', label: 'R', ppn: '1.1', pph: '0' },
  { value: 'S', label: 'S', ppn: '11', pph: '0' },
  { value: 'T', label: 'T', ppn: '0', pph: '2' },
  { value: 'SE', label: 'SE', ppn: '11', pph: '10' },
  { value: 'ST', label: 'ST', ppn: '11', pph: '2' },
  { value: 'RT', label: 'RT', ppn: '1.1', pph: '2' },
]

export const FileSyarat = [
  { value: 'COD', label: 'COD' },
  { value: 'Net 3', label: 'Net 3' },
  { value: 'Net 7', label: 'Net 7' },
  { value: 'Net 14', label: 'Net 14' },
  { value: 'Net 21', label: 'Net 21' },
  { value: 'Net 30', label: 'Net 30' },
  { value: 'Net 45', label: 'Net 45' },
  { value: 'Net 60', label: 'Net 60' },
]

export const FileTukar = [
  { value: 'IDR', label: 'IDR' },
  { value: 'USD', label: 'USD' },
  { value: 'EUR', label: 'EUR' },
  { value: 'YEN', label: 'YEN' },
  { value: 'SGD', label: 'SGD' },
]

export const FileKartu = [
  { value: 'ITS', label: 'ITS (Pindah Barang dari Sentul ke Yogya)' },
  { value: 'ITY', label: 'ITY (Pindah Barang dari Yogya ke Sentul)' },
  { value: 'OKP', label: 'OKP (Order Kerja Produksi)' },
  { value: 'PB', label: 'PB (Penyesuaian Barang)' },
  { value: 'RI', label: 'RI (Recived Item)' },
  { value: 'SO', label: 'SO (Stock Opname)' },
  { value: 'SJ', label: 'SJ (Surat Jalan)' },
]

export const FileTally = [
  { value: 'A-ID', label: 'A-ID' },
  { value: 'A-IDK', label: 'A-IDK' },
  { value: 'A-IID', label: 'A-IID' },
  { value: 'K4', label: 'K4' },
  { value: 'M4', label: 'M4' }
]