import produce from 'immer';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { API_GSHEET } from '../apis/apisData';

const initialPurchY = [];
const initialPurchW = [];
const initialFinishgood = [];
const initialPpic = [];
const initialWip = [];

const useDashboardStore = create(
    persist(
        (set) => ({
            dashPurchY: initialPurchY,
            dashPurchW: initialPurchW,
            dashFg : initialFinishgood,
            dashPpic : initialPpic,
            dashWip : initialWip,
            purchYReady: false,
            purchWReady: false,
            fgReady: false,
            ppicReady: false,
            wipReady: false,
            fetchWPurch : async () => {
                let date = new Date()
                try {
                    const { data } = await API_GSHEET.get(`exec?tipe=reportPurch&date=${date}`);
                    set(produce((state) => {
                        state.dashPurchW = data;
                        state.purchWReady = true;
                    }))
                } catch (error) {
                    console.log(error);
                }
            },
            falseWPurch : async () => {
                try {
                    set(produce((state) => {
                        state.purchWReady = false;
                    }))
                } catch (error) {
                    console.log(error);
                }
            },
            fetchYdash : async () => {
                let date = new Date()
                try {
                    const { data } = await API_GSHEET.get(`exec?tipe=reportYearPurch&date=${date}`);
                    set(produce((state) => {
                        state.dashPurchY = data;
                        state.purchYReady = true;
                    }))
                } catch (error) {
                    console.log(error);
                }
            },
            falseYdash : async () => {
                try {
                    set(produce((state) => {
                        state.purchYReady = false;
                    }))
                } catch (error) {
                    console.log(error);
                }
            },
        }),
        {
            name: 'dashboard-storage',
            getStorage: () => localStorage,
        }
    )

);


export const selectDashPurchW = (state) => state.dashPurchW;
export const selectFetchWPurch = (state) => state.fetchWPurch;
export const selectPurchWReady = (state) => state.purchWReady;
export const selectFalseWPurch = (state) => state.falseWPurch;

export const selectDashPurchY = (state) => state.dashPurchY;
export const selectFetchYdash = (state) => state.fetchYdash;
export const selectPurchYReady = (state) => state.purchYReady;
export const selectFalseYdash = (state) => state.falseYdash;
export default useDashboardStore;

//