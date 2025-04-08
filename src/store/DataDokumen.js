import produce from 'immer';
import {create} from 'zustand';
import { persist } from 'zustand/middleware';
import { API_AUTH } from '../apis/apisData';

const initialDokumen = [];
const useDokumenStore = create(
    persist(
        (set) => ({
            dokumen: initialDokumen,
            dokumenReady: false,
            fetchDokumen: async (id) => {
                try {
                    const { data } =  await API_AUTH.get(`dokumen/${id}`);
                    console.log(id)
                    set(produce((state) => {
                        state.dokumen = data;
                        state.dokumenReady = true;
                    }))
                } catch (error) {
                    console.log('error');
                }
            },
            falseDokumen : async () => {
                try {
                    set(produce((state) => {
                        state.dokumenReady = false;
                    }))
                } catch (error) {
                    console.log('error');
                }
            },
        }),
        {
            name: 'dokumen-storage',
            getStorage: () => localStorage,
        }
    )
)

export const selectDokumen = (state) => state.dokumen;
export const selectFetchDokumen = (state) => state.fetchDokumen;
export const selectDokumenReady = (state) => state.dokumenReady;
export const selectFalseDokumen = (state) => state.falseDokumen;

export default useDokumenStore;