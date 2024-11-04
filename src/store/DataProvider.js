import produce from 'immer';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';
const initialProvider = [];
const useDataProvider = create(
    persist(
        (set) => ({
            provider: initialProvider,
            providerReady: false,
            fetchProvider : async () => {
                try {
                    const { data }  = await axios.get(`${process.env.REACT_APP_API_KEY_RAIL}/provider`);
                    set(produce((state) => {
                        state.provider = data;
                        state.providerReady = true;
                    }))
                } catch (error) {
                    console.log('error');
                }
            },
            falseProvider : async () => {
                try {
                    set(produce((state) => {
                        state.providerReady = false;
                    }))
                } catch (error) {
                    console.log('error');
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

