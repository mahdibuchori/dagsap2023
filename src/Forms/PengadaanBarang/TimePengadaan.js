import React, { useEffect, useState } from 'react';
import { format } from "date-fns";
import { Badge } from 'primereact/badge';
import id from 'date-fns/locale/id';
import Modal from 'react-bootstrap/Modal';
import { Timeline } from 'primereact/timeline';
import { LoadingPage } from '../../LoadingPage/LoadingPage';
import { API_AUTH } from '../../apis/apisData';
import useAuthStore, { selectUser } from '../../store/DataUser';

export const TimePengadaan = (props) => {
    const userData = useAuthStore(selectUser);
    const [isLoading, setIsLoading] = useState(false);
    const handleClose = () =>{props.close()}
    const [events, setEvents] = useState([]);
    
    useEffect(() => {
        if (!props.show) return;
        const dataPo =async () => {
            try {
                setIsLoading(true)
                const par =  props.data.parsial_data;
                const IdPo = [];
                const events = [];
                for(let i = 0; i < par.length; i++){
                    if(par[i].po !== ""){
                        IdPo.push(par[i].po)
                    }else{}
                }
                if(props.data.status === "Pengajuan"){
                    events.push({ status: 'Pengajuan', date: props.data.t_pengadaan, icon: 'pi pi-cart-arrow-down', color: '#c41414' })
                } 
                else if(props.data.status === "Verifikasi"){
                    if(IdPo.length === 0){
                        events.push(
                            { status: 'Pengajuan', date: props.data.t_pengadaan, icon: 'pi pi-cart-arrow-down', color: '#c41414' },
                            { status: 'Verifikasi', date: props.data.tgl_verify, icon: 'pi pi-check', color: '#287bff' }
                        )
                    }
                    else{}
                }
                else if(props.data.status === "Selesai"){
                    let file = await API_AUTH.post(`/po/orderby`, {
                        "plan" : userData.uplan,
                        "data" : IdPo
                    })
                    const test = file.data
                    const findData = test.map((e,i)=>{
                        if(e.status === "Pengajuan"){
                            return(
                                { status: 'Pengajuan', date: format(new Date(e.tgl_po), "dd/MM/yyyy", { locale: id }), icon: 'pi pi-cart-arrow-down', color: '#c41414' 
                            })
                        } 
                        else if(e.status === "Verifikasi"){
                            return(
                                { status: 'Pengajuan', date: format(new Date(e.tgl_po), "dd/MM/yyyy"), icon: 'pi pi-cart-arrow-down', color: '#c41414' },
                                { status: 'Verifikasi', date: format(new Date(e.tgl_verify), "dd/MM/yyyy", { locale: id }), icon: 'pi pi-check', color: '#287bff' }
                            )
                        } 
                        else if(e.status === "Selesai"){
                            return(
                                { status: 'Pengajuan', date: format(new Date(e.tgl_po), "dd/MM/yyyy"), icon: 'pi pi-cart-arrow-down', color: '#c41414' },
                                { status: 'Verifikasi', date: format(new Date(e.tgl_verify), "dd/MM/yyyy", { locale: id }), icon: 'pi pi-check', color: '#287bff' },
                                { status: 'Verifikasi', date: format(new Date(e.tgl_approve), "dd/MM/yyyy", { locale: id }), icon: 'pi pi-check', color: '#287bff' }
                            
                            )
                        } 
                        else{
                            return({ status: e.status, date: '', icon: 'pi pi-cart-arrow-down', color: '#c41414' })
                        }
                    })

                    console.log(findData)
                    let chiso =[];
                    for(let i = 0; i < test.length; i++){
                        let isu = []
                        let e = test[i]
                        if(e.status === "Pengajuan"){
                            isu.push(
                                { po: e.id_po, expro: e.expro, status: 'Pengajuan', date: format(new Date(e.tgl_po), "dd/MM/yyyy", { locale: id }), icon: 'pi pi-cart-arrow-down', color: 'danger' 
                            })
                        }
                        else if(e.status === "Verifikasi"){
                            isu.push(
                                { po: e.id_po, expro: e.expro, status: 'Pengajuan', date: format(new Date(e.tgl_po), "dd/MM/yyyy"), icon: 'pi pi-cart-arrow-down', color: 'danger' },
                                { po: e.id_po, expro: e.expro, status: 'Verifikasi', date: format(new Date(e.tgl_verify), "dd/MM/yyyy", { locale: id }), icon: 'pi pi-check', color: 'info' }
                            )
                        } 
                        else if(e.status === "Selesai"){
                            isu.push(
                                { po: e.id_po, expro: e.expro, status: 'Pengajuan', date: format(new Date(e.tgl_po), "dd/MM/yyyy"), icon: 'pi pi-cart-arrow-down', color: 'danger' },
                                { po: e.id_po, expro: e.expro, status: 'Verifikasi', date: format(new Date(e.tgl_verify), "dd/MM/yyyy", { locale: id }), icon: 'pi pi-check', color: 'info' },
                                { po: e.id_po, expro: e.expro, status: 'Selesai', date: format(new Date(e.tgl_approve), "dd/MM/yyyy", { locale: id }), icon: 'pi pi-check', color: 'success' }
                            
                            )
                        } 
                        else{
                            isu.push({ po: e.id_po, expro: e.expro, status: e.status, date: '', icon: 'pi pi-cart-arrow-down', color: 'warning' })
                        }

                        chiso.push(isu)
                    }
                    console.log(chiso)
                    
                    events.push(
                        { status: 'Pengajuan', date: props.data.t_pengadaan, icon: 'pi pi-cart-arrow-down', color: '#c41414' },
                        { status: 'Verifikasi', date: props.data.tgl_verify, icon: 'pi pi-check', color: '#287bff' },
                        { status: 'Selesai', date: props.data.tgl_verify, icon: 'pi pi-receipt', color: '#59A89C' ,file: chiso }
                    )
                }
                else{}
                setEvents(events)
                setIsLoading(false)
            } catch (error) {
                setIsLoading(false)
            }
        }
        dataPo()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.show]);

    const customizedMarker = (item) => {
        return (
            <span 
                className="flex w-2rem h-2rem align-items-center justify-content-center text-white border-circle z-1 shadow-1"
                style={{ backgroundColor: item.color, borderRadius: 5, textAlign: 'center', padding: 5 }}
            >
                <i className={item.icon}></i>
            </span>
        );
    };

    const customizedContent = (item) => {
        let cek = item.file
        return (
            <div>
                <span>
                    <h4>{item.status}</h4>
                    <h6 style={{marginLeft: 10}}>({item.date})</h6>
                </span>
                {(cek !== undefined) && 
                    <div style={{display:'flex'}}>
                    {
                        cek.map((e,i)=>{
                            return(
                                <div className="card flex flex-wrap gap-6 m-2">
                                <h6 style={{textAlign:'center'}}>{e[0].po}</h6>
                                <Timeline 
                                    value={e} 
                                    opposite={(items) => {
                                        return(
                                            <Badge value={items.status} severity={items.color}></Badge>
                                        )
                                    }} 
                                    content={(items) => <small className="text-color-secondary">{items.date}</small>} 
                                />
                                <h6 style={{textAlign:'center'}}>{e[0].expro}</h6>
                                </div>
                            )
                        })
                    }
                    </div>
                    
                }
                
            </div>
        );
    };

    
  return (
    <>
    <Modal show={props.show} onHide={handleClose} size="xl" centered>
        <h5 style={{textAlign: 'center', padding: 10}}>Time Line Pengadaan</h5>
        <Modal.Body>
        {isLoading ? <LoadingPage/> : 
            <Timeline 
                value={events}
                align="alternate"
                className="customized-timeline"
                marker={customizedMarker}
                content={customizedContent} 
            />
        }
            
        </Modal.Body>
    </Modal>
    </>
  )
}
