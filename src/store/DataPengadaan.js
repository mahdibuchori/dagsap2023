import produce from 'immer';
import {create} from 'zustand';
import { persist } from 'zustand/middleware';
import { API_AUTH } from '../apis/apisData';

const initialPengadaan = [];
const pengadaanByID = [];
const pengadaanID = [];
const pengadaanArr = [];

const usePengadaanStore = create(
    persist(
        (set) => ({
            pengadaan: initialPengadaan,
            pengadaanById : pengadaanByID,
            pengadaanId : pengadaanID,
            pengadaanArr : pengadaanArr,
            pengadaanReady: false,
            pengadaanIdReady: false,
            pengadaanIsReady: false,
            pengadaanArrReady: false,
            fetchPengadaan: async (id,plan) => {
                try {
                    const { data } =  await API_AUTH.get(`pengadaan/${id}/${plan}`);
                    set(produce((state) => {
                        state.pengadaan = data.reverse();
                        state.pengadaanReady = true;
                    }))
                } catch (error) {
                    console.log('error');
                }
            },
            falsePengadaan : async () => {
                try {
                    set(produce((state) => {
                        state.pengadaanReady = false;
                    }))
                } catch (error) {
                    console.log('error');
                }
            },
            filterPengadaan: async (id) => {
                try {
                    const data  = await API_AUTH.get(`pengadaan/${id}`);
                    set(produce((state) => {
                        state.pengadaanById = data.data;
                        state.pengadaanIdReady = true;
                    }))
                } catch (error) {
                    set(produce((state) => {
                        state.errorLogin = error.message;
                    }))
                }
            },
            filterIdPengadaan: async (id) => {
                try {
                    const data  = await API_AUTH.get(`pengadaanId/${id}`);
                    set(produce((state) => {
                        state.pengadaanId = data.data;
                        state.pengadaanIsReady = true;
                    }))
                } catch (error) {
                    set(produce((state) => {
                        state.errorLogin = error.message;
                    }))
                }
            },
        }),
        {
            name: 'pengadaan-storage',
            getStorage: () => localStorage,
        }
    )
);

export const selectPengadaan = (state) => state.pengadaan;
export const selectFetchPengadaan = (state) => state.fetchPengadaan;
export const selectPengadaanReady = (state) => state.pengadaanReady;
export const selectFalsePengadaan = (state) => state.falsePengadaan;

export const selectPengadaanID = (state) => state.pengadaanById;
export const selectFilterPengadaan = (state) => state.filterPengadaan;
export const selectPengadaanIdReady = (state) => state.pengadaanIdReady;

export const selectPengadaanId = (state) => state.pengadaanId;
export const selectFilterIdPengadaan = (state) => state.filterIdPengadaan;
export const selectPengadaanIsReady = (state) => state.pengadaanIsReady;

export default usePengadaanStore;
