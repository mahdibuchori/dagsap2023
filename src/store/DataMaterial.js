import produce from 'immer';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { API_GSHEET } from '../apis/apisData';
const initialMaterial = [];
const useDataMaterial = create(
    persist(
        (set) => ({
            material: initialMaterial,
            materialReady: false,
            fetchMaterial : async () => {
                /* let jo = {};
                let data = []; */
                try {
                    /* const response = await API_FINA.get('select%20i.ITEMTYPE,%20i.ITEMNO,%20i.ITEMDESCRIPTION,%20i.UNIT1,%20i.UNIT2,%20i.UNIT3,%20i.CATEGORYID,(select%20ic.NAME%20from%20ITEMCATEGORY%20ic%20where%20ic.CATEGORYID%20=%20i.CATEGORYID)kategori%20,%20g.QUANTITY%20available_stok%20from%20item%20i%20left%20outer%20join%20GetItemQuantity(i.ItemNo,%20current_date,%20-1)%20g%20on%20i.ItemNo%20=%20g.ItemNo_Qty%20where%20i.SUSPENDED=0%20and%20i.CATEGORYID%20%3E0%20ORDER%20BY%20I.ITEMDESCRIPTION/1');

                    let file = response.data.result[0].data;
                    for(let i = 0; i < file.length;i++){
                        let dataRow = file[i];
                        data.push({
                        itemtype : dataRow[0], 
                        itemno : dataRow[1], 
                        itemdescription : dataRow[2], 
                        unit1 : dataRow[3], 
                        unit2 : dataRow[4],
                        unit3 : dataRow[5], 
                        categoryid : dataRow[6], 
                        kategori : dataRow[7],
                        available_stok : dataRow[8], 
                        })
                    } */
                    const { data } = await API_GSHEET.get(`exec?tipe=dataMaterial`,{
                        headers: {
                           "Access-Control-Allow-Origin": "*",
                           "Access-Control-Allow-Methods": "GET, POST, OPTION",
                           "Content-Type": "application/json"
                        }});
                    // jo.material = data;
                    set(produce((state) => {
                        state.material = data;
                        state.materialReady = true;
                    }))
                } catch (error) {
                    console.log(error);
                }
            },
            falseMaterial : async () => {
                try {
                    set(produce((state) => {
                        state.materialReady = false;
                    }))
                } catch (error) {
                    console.log(error);
                }
            },
        }),
        {
            name: 'material-storage',
            getStorage: () => localStorage,
        }
    )
);

export const selectMaterial = (state) => state.material;
export const selectFetchMaterial = (state) => state.fetchMaterial;
export const selectMaterialReady = (state) => state.materialReady;
export const selectFalseMaterial = (state) => state.falseMaterial;

export default useDataMaterial;


