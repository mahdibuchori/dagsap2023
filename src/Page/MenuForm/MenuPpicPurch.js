import React from 'react';
import { Card, Container, Row } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';

export const MenuPpicPurch = () => {
    return (
        <div className='divisi'>
            <Container fluid>
            <Row xs={1} md={4} className="mb-3 g-2">
    
                    <Link to={"/"} className='link'>
                        <div className="card text-center bg-white">
                            <span className='icon'><i className="bi bi-file-earmark-text"></i></span>
                            <div class="card-body">
                                <div class="card-text">Data BOM</div>
                            </div>
                        </div>
                    </Link>
  
                    <Link to={"/"} className='link'>
                        <div className="card text-center bg-white">
                            <span className='icon'><i className="bi bi-tools"></i></span>
                            <Card.Body>
                            <Card.Text>Data Sparepart</Card.Text>
                            </Card.Body>
                        </div>
                    </Link>
  
                    <Link to={"/"} className='link'>
                        <div className="card text-center bg-white">
                            <span className='icon'><i className="bi bi-inboxes"></i></span>
                            <div class="card-body">
                                <div class="card-text">Data Stock</div>
                            </div>
                        </div>
                    </Link>
  
                    <Link to={"/"} className='link'>
                        <div className="card text-center bg-white">
                            <span className='icon'><i className="bi bi-card-list"></i></span>
                            <div class="card-body">
                                <div class="card-text">Kartu Stock</div>
                            </div>
                        </div>
                    </Link>
  
                    <Link to={"/"} className='link'>
                        <div className="card text-center bg-white">
                            <span className='icon'><i className="bi bi-briefcase"></i></span>
                            <div class="card-body">
                                <div class="card-text">Eksternal Provider</div>
                            </div>
                        </div>
                    </Link>
  
                    <Link to={"/"} className='link'>
                        <div className="card text-center bg-white">
                            <span className='icon'><i className="bi bi-file-earmark-ruled"></i></span>
                            <div class="card-body">
                                <div class="card-text">OKP</div>
                            </div>
                        </div>
                    </Link>
              
                    <NavLink to={"/form/pengadaan"} className='link'>
                        <div className="card text-center bg-white">
                            <span className='icon'><i className="bi bi-cart2"></i></span>
                            <div class="card-body">
                                <div class="card-text">Pengadaan Barang</div>
                            </div>
                        </div>
                    </NavLink>
            
                    <Link to={"/"} className='link'>
                        <div className="card text-center bg-white">
                            <span className='icon'><i className="bi bi-box-seam"></i></span>
                            <div class="card-body">
                                <div class="card-text">Permintaan Barang</div>
                            </div>
                        </div>
                    </Link>
      
                    <Link to="" className='link'>
                        <div className="card text-center bg-white">
                            <span className='icon'><i className="bi bi-recycle"></i></span>
                            <div class="card-body">
                                <div class="card-text">Pindah Barang</div>
                            </div>
                        </div>
                    </Link>
  
                    <NavLink to={"/form/purchaseorder"} className='link'>
                        <div className="card text-center bg-white">
                            <span className='icon'><i className="bi bi-shop"></i></span>
                            <div class="card-body">
                                <div class="card-text">Purchasing Order</div>
                            </div>
                        </div>
                    </NavLink>
      
                    <Link to="" className='link'>
                        <div className="card text-center bg-white">
                            <span className='icon'><i className="bi-arrow-return-left"></i></span>
                            <div class="card-body">
                                <div class="card-text">Retur Produksi</div>
                            </div>
                        </div>
                    </Link>
      
                    <Link to={""} className='link'>
                        <div className="card text-center bg-white">
                            <span className='icon'><i className="bi bi-clipboard-check"></i></span>
                            <div class="card-body">
                                <div class="card-text">Tally Sheet</div>
                            </div>
                        </div>
                    </Link>
      
                    <Link to={"/form/Kedatangan"} className='link'>
                        <div className="card text-center bg-white">
                            <span className='icon'><i className="bi bi-truck"></i></span>
                            <div class="card-body">
                                <div class="card-text">Terima Barang</div>
                            </div>
                        </div>
                    </Link>
  
                </Row>
            </Container>
        </div>
    )
}
