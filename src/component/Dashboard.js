import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import { API_AUTH } from '../apis/apisData';
import { LoadingPage } from '../LoadingPage/LoadingPage';
import { SideBar } from './SideBar';
import TopBar from './TopBar';
import BottomBar from './BottomBar';
import useAuthStore, { selectOnAuth, selectAuthReady } from '../store/DataUser';
import useDataMaterial, { selectFetchMaterial, selectMaterialReady } from '../store/DataMaterial';
import useDataProvider, { selectFetchProvider,selectProviderReady } from '../store/DataProvider';
import useDataDepartemen, { selectFetchDepartemen,selectDepartemenReady } from '../store/DataDepartemen';

export const Dashboard = () => {
    const navigate = useNavigate();
    const [token, setToken] = useState(''); 
    const [expire, setExpire] = useState('');
    const [users, setUsers] = useState([]);
    const [menu, setMenu] = useState('dashboard');
    const onAuth = useAuthStore(selectOnAuth);
    const authReady = useAuthStore(selectAuthReady);

    const onProduct = useDataMaterial(selectFetchMaterial);
    const productReady = useDataMaterial(selectMaterialReady);
    const onProvider = useDataProvider(selectFetchProvider);
    const providerReady = useDataProvider(selectProviderReady);
    const onDepartemen = useDataDepartemen(selectFetchDepartemen);
    const departemenReady = useDataDepartemen(selectDepartemenReady);
    const [isReady, setIsReady] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    axios.defaults.withCredentials = true
    const axiosJWT = axios.create({
        baseURL: process.env.REACT_APP_API_KEY_YT,
        withCredentials : true,
        crossDomain: true,
        headers: {
        'Content-Type': 'application/json',
        },
        SameSite: 'None',
    });

    useEffect(() => {
        refreshToken();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        // setIsLoading(true);
        if (!authReady) return;
        onGridReady()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authReady]);

    useEffect(() => { 
        // setIsLoading(true);
        onProduct()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => { 
        // setIsLoading(true);
        onProduct()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => { 
        // setIsLoading(true);
        onProvider()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => { 
        // setIsLoading(true);
        onDepartemen()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        // setIsLoading(true);
        if (!productReady) return;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productReady]);

    useEffect(() => {
        if (!providerReady) return;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [providerReady]);

    useEffect(() => {
        if (!departemenReady) return;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [departemenReady]);

    useEffect (() => {
        if(!isReady) return;
        const gntiDta = async () =>{
            try {
                if(!token){
                    setIsLoading(false)
                    alert("TOken tidak ditemukan")
                    navigate('/login')
                }
                else{
                    const response = await axiosJWT.get(`${process.env.REACT_APP_API_KEY_YT}/users`,{
                        headers:{
                            Authorization: `Bearer ${token}`
                        }
                        });
                    setUsers(response.data);
                    await onAuth(response.data?.uuid);
                    setIsLoading(false);
                }
                    
            } catch (error) {
                navigate('/login')
                setIsLoading(false)
            }
            setIsReady(false);
        } 
    
        gntiDta();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      },[isReady]);

    const refreshToken = async () => {
        try {
            setIsLoading(true)
            const response = await API_AUTH.get(`/token`,{headers: { 
                'Access-Control-Allow-Origin': '*', 
                'Content-type': 'Application/json', 
                }})
            setToken(response.data.accessToken);
            const decode = jwtDecode(response.data.accessToken);
            setExpire(decode.exp);
            setIsReady(true)
        } catch (error) {
            setIsLoading(false)
            navigate('/login');
            if(error.response){
                navigate('/login');
            }
        }
    }

    axiosJWT.interceptors.request.use(async(config) =>{
        const currentDate = new Date();
        if(expire * 1000 < currentDate.getTime()){
            const response = await axiosJWT.get(`/token`,{headers: { 
                'Access-Control-Allow-Origin': '*', 
                'Content-type': 'Application/json', 
            }})
            config.headers.Authorization = `Bearer ${response.data.accessToken}`;
            setToken(response.data.accessToken);
            const decode = jwtDecode(response.data.accessToken);
            setExpire(decode.expire);
            setIsReady(true)
        }
        return config;
    }, (error)=>{
        return Promise.reject(error);
    });
    
    const onGridReady =async () =>{
        await onAuth(users?.uuid);
    }

  return (
    <>
    <div className="container-fluid">
            <div className="row flex-nowrap">
                
                <TopBar user={users}/>
                <SideBar menubar={setMenu} data={menu}/>
                <div className="col p-0 m-0">
                    <p>{menu}</p>
                    <Outlet />
                </div>
                <BottomBar menubar={setMenu} data={menu}/>
            </div>
        </div>
    {isLoading ? <LoadingPage/> : ""}
    </>
  )
}
