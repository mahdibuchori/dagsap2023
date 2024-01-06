import React from 'react';
import { Breadcrumb, Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { TerimaBarang } from './TerimaBarang';

export const TerimaPurch = () => {
    const navigate = useNavigate();
    return (
        <>
            <div>
                <Stack direction="horizontal" gap={3} style={{padding: "0px 10px 0px 10px"}}>
                    <div className="bg-body">
                        <Breadcrumb className="bg-body m-2">
                            <Breadcrumb.Item onClick={() =>navigate('/form')}>Form</Breadcrumb.Item>
                            <Breadcrumb.Item active>Terima Barang</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <div className="ms-auto">
                        <div style={{marginRight: 10, display:'flex'}}>
                        </div>
                    </div>
                    <div className="vr" />
                    <div className="bg-body">
                    </div>
                </Stack>
                
                <TerimaBarang />
            </div>
        </>
    )
}
