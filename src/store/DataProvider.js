import produce from 'immer';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { API_GSHEET } from '../apis/apisData';
const initialProvider = [];
const useDataProvider = create(
    persist(
        (set) => ({
            provider: initialProvider,
            providerReady: false,
            fetchProvider : async () => {
                /* let jo = {};
                let data = []; */
                try {
                    /* const response = await API_FINA.get(`select%20p.ID,%20p.personno,%20p.name,%20C.CURRENCYID,%20c.CURRENCYNAME,%20T.TERMID,%20T.TERMNAME,%20P.TAX1ID,coalesce%20((select%20TA.TAXCODE%20FROM%20TAX%20TA%20WHERE%20TA.TAXID%20=%20P.TAX1ID),'')TAX1CODE,%20coalesce%20((select%20TA.TAXNAME%20FROM%20TAX%20TA%20WHERE%20TA.TAXID%20=%20P.TAX1ID),'')TAX1NAME,CAST(coalesce%20((select%20TA.RATE%20FROM%20TAX%20TA%20WHERE%20TA.TAXID%20=%20P.TAX1ID),'0')AS%20numeric%20(18,2))TAX1RATE,P.TAX2ID,coalesce%20((select%20TA.TAXCODE%20FROM%20TAX%20TA%20WHERE%20TA.TAXID%20=%20P.TAX2ID),'')TAX2CODE,%20coalesce%20((select%20TA.TAXNAME%20FROM%20TAX%20TA%20WHERE%20TA.TAXID%20=%20P.TAX2ID),'')TAX2NAME,CAST(coalesce%20((select%20TA.RATE%20FROM%20TAX%20TA%20WHERE%20TA.TAXID%20=%20P.TAX2ID),'0')AS%20numeric%20(18,2))TAX2RATE%20,%20p.ADDRESSLINE1,%20p.ADDRESSLINE2,%20p.CITY,%20p.STATEPROV,%20p.ZIPCODE,%20p.COUNTRY,%20p.PHONE,%20p.EMAIL%20from%20PERSONDATA%20p%20join%20CURRENCY%20c%20on%20c.CURRENCYID%20=%20p.CURRENCYID%20LEFT%20JOIN%20TERMOPMT%20T%20ON%20T.TERMID%20=%20P.TERMSID%20where%20p.PERSONTYPE=1%20and%20p.SUSPENDED=0%20ORDER%20BY%203/1`); */
                    /* let file = response.data.result[0].data;
                    for(let i = 0; i < file.length;i++){
                        let dataRow = file[i];
                        data.push({ 
                        id : dataRow[0],
                        personno : dataRow[1],
                        name : dataRow[2],
                        currencyid : dataRow[3],
                        currencyname : dataRow[4],
                        termid : dataRow[5],
                        termname : dataRow[6],
                        tax1id : dataRow[7],
                        tax1code : dataRow[8],
                        tax1name : dataRow[9],
                        tax1rate : dataRow[10],
                        tax2id : dataRow[11],
                        tax2code : dataRow[12],
                        tax2name : dataRow[13],
                        tax2rate : dataRow[14],
                        addressline1 : dataRow[15],
                        addressline2 : dataRow[16],
                        city : dataRow[17],
                        stateprov : dataRow[18],
                        zipcode : dataRow[19],
                        country : dataRow[20],
                        phone : dataRow[21],
                        email : dataRow[22],
                        })
                    }
                    jo.provider = data; */
                    const { data } = await API_GSHEET.get(`exec?tipe=dataProv`);
                    console.log(data)
                    set(produce((state) => {
                        state.provider = data;
                        state.providerReady = true;
                    }))
                } catch (error) {
                    console.log(error);
                }
            },
            falseProvider : async () => {
                try {
                    set(produce((state) => {
                        state.providerReady = false;
                    }))
                } catch (error) {
                    console.log(error);
                }
            },
        }),
        {
            name: 'provider-storage',
            getStorage: () => localStorage,
        }
    )
);

export const selectProvider = (state) => state.provider;
export const selectFetchProvider = (state) => state.fetchProvider;
export const selectProviderReady = (state) => state.providerReady;
export const selectFalseProvider = (state) => state.falseProvider;

export default useDataProvider;

