import produce from 'immer';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { API_AUTH } from '../apis/apisData';
const initialKaryawan = [];
const karyawanByID = [];
const useUserStore = create(
    persist(
        (set) => ({
            dataKaryawan: initialKaryawan,
            karyawanByID: karyawanByID,
            userReady: false,
            userIdReady: false,
            onEmployee: async () => {
                try {
                    const data  = await API_AUTH.get('/profile');
                    set(produce((state) => {
                        state.dataKaryawan = data.data;
                        state.userReady = true;
                    }))
                } catch (error) {
                    set(produce((state) => {
                        state.errorLogin = error.message;
                    }))
                }
            },
            falseEmployee : async () => {
                try {
                    set(produce((state) => {
                        state.userReady = false;
                    }))
                } catch (error) {
                    console.log(error);
                }
            },
            /* filterKaryawan: async (id) => {
                try {
                    const data  = await API_PROFIL.get(id);
                    set(produce((state) => {
                        state.karyawanByID = data.data;
                        state.userIdReady = true;
                    }))
                } catch (error) {
                    set(produce((state) => {
                        state.errorLogin = error.message;
                    }))
                }
            }, */
            /* deleteKaryawan: async (id) => {
                try {
                    await API_PROFIL.delete(id);
                    set(produce((state) => {
                        state.pengadaanIdReady = true;
                    }))
                } catch (error) {
                    set(produce((state) => {
                        state.errorLogin = error.message;
                    }))
                }
            }, */
        }),
        {
            name: 'user-storage',
            getStorage: () => sessionStorage,
        }
    )
);

export const selectUserReady = (state) => state.userReady;
export const selectOnEmployee = (state) => state.onEmployee;
export const selectKaryawan = (state) => state.dataKaryawan;
export const selectFalseEmployee = (state) => state.falseEmployee;
// export const selectDeleteKaryawan = (state) => state.deleteKaryawan;

// export const selectUserIdReady = (state) => state.userIdReady;
// export const selectFilterKaryawan = (state) => state.filterKaryawan;
// export const selectKaryawanByID = (state) => state.karyawanByID;

export default useUserStore;
