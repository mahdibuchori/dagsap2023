import produce from 'immer';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { API_AUTH } from '../apis/apisData';

const initialIdPo = [];
const initialPo = [];

const useDataPo = create(
    persist(
        (set) => ({
            noPo: initialIdPo,
            dataPo : initialPo,
            nopoReady: false,
            poReady : false,
            fetchNoPo: async (token,plan) => {
                try {
                    const data  = await API_AUTH.get(`/ponumber/${token}/${plan}`);
                    set(produce((state) => {
                        state.noPo = data;
                        state.nopoReady = true;
                    }))
                } catch (error) {
                    console.log(error);
                }
            },
            falseNoPo : async () => {
                try {
                    set(produce((state) => {
                        state.nopoReady = false;
                    }))
                } catch (error) {
                    console.log(error);
                }
            },
            fetchPo: async (token,plan) => {
                try {
                    const data  = await API_AUTH.get(`/purchaseorder/${token}/${plan}`);
                    set(produce((state) => {
                        state.dataPo = data;
                        state.poReady = true;
                    }))
                } catch (error) {
                    console.log(error);
                }
            },
            falsePo : async () => {
                try {
                    set(produce((state) => {
                        state.poReady = false;
                    }))
                } catch (error) {
                    console.log(error);
                }
            },
        }),
        {
            name: 'purchase-storage', // nama untuk menyimpan di storage
            getStorage: () => sessionStorage, // (optional) by default akan 'localStorage', bisa pakai sessionStorage, dll
        }
    )
);

// selector bisa dibuat di sini, biar bisa reusesable
export const selectFetchNoPo = (state) => state.fetchNoPo;
export const selectFalseNoPo = (state) => state.falseNoPo;
export const selectNoPo = (state) => state.noPo;
export const selectNopoReady = (state) => state.nopoReady;

export const selectFetchPo = (state) => state.fetchPo;
export const selectFalsePo = (state) => state.falsePo;
export const selectDataPo = (state) => state.dataPo;
export const selectPoReady = (state) => state.poReady;

export default useDataPo;