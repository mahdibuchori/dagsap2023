import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';

export const MenuPpicPurch = () => {
    return (
        <div className='divisi'>
            <div className='divisiWidgets'>
                <Row xs={1} md={4} className="g-4">
    
                    <Link to={"/"} className='link'>
                        <Col>
                        <Card className="text-center">
                            <span className='icon'><i className="bi bi-file-earmark-text"></i></span>
                            <Card.Body>
                            <Card.Text>Data BOM</Card.Text>
                            </Card.Body>
                        </Card>
                        </Col>
                    </Link>
  
                    <Link to={"/"} className='link'>
                        <Col>
                        <Card className="text-center">
                        <span className='icon'><i className="bi bi-tools"></i></span>
                        <Card.Body>
                            <Card.Text>Data Spare Part</Card.Text>
                        </Card.Body>
                        </Card>
                        </Col>
                    </Link>
  
                    <Link to={"/"} className='link'>
                        <Col>
                        <Card className="text-center">
                        <span className='icon'><i className="bi bi-inboxes"></i></span>
                        <Card.Body>
                            <Card.Text>Data Stock</Card.Text>
                        </Card.Body>
                        </Card>
                        </Col>
                    </Link>
  
                    <Link to={"/"} className='link'>
                        <Col>
                        <Card className="text-center">
                            <span className='icon'><i className="bi bi-card-list"></i></span>
                            <Card.Body>
                            <Card.Text>Kartu Stock</Card.Text>
                            </Card.Body>
                        </Card>
                        </Col>
                    </Link>
  
                    <Link to={"/"} className='link'>
                        <Col>
                            <Card className="text-center">
                                <span className='icon'><i class="bi bi-briefcase"></i></span>
                                <Card.Body>
                                <Card.Text>Eksternal Provider</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Link>
  
                    <Link to={"/"} className='link'>
                        <Col>
                            <Card className="text-center">
                                <span className='icon'><i class="bi bi-file-earmark-ruled"></i></span>
                                <Card.Body>
                                <Card.Text>OKP</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Link>
              
                    <NavLink to={"/form/pengadaan"} className='link'>
                        <Col>
                        <Card className="text-center">
                            <span className='icon'><i class="bi bi-cart2"></i></span>
                            <Card.Body>
                            <Card.Text>Pengadaan Barang</Card.Text>
                            </Card.Body>
                        </Card>
                        </Col>
                    </NavLink>
            
                    <Link to={"/"} className='link'>
                        <Col>
                        <Card className="text-center">
                            <span className='icon'><i className="bi bi-box-seam"></i></span>
                            <Card.Body>
                            <Card.Text>Permintaan Barang</Card.Text>
                            </Card.Body>
                        </Card>
                        </Col>
                    </Link>
      
                    <Link to="" className='link'>
                        <Col>
                        <Card className="text-center">
                            <span className='icon'><i className="bi bi-recycle"></i></span>
                            <Card.Body>
                            <Card.Text>Pindah Barang</Card.Text>
                            </Card.Body>
                        </Card>
                        </Col>
                    </Link>
  
                    <NavLink to={"/form/purchaseorder"} className='link'>
                        <Col>
                        <Card className="text-center">
                            <span className='icon'><i className="bi bi-shop"></i></span>
                            <Card.Body>
                            <Card.Text>Purchasing Order</Card.Text>
                            </Card.Body>
                        </Card>
                        </Col>
                    </NavLink>
      
                    <Link to="" className='link'>
                        <Col>
                        <Card className="text-center">
                            <span className='icon'><i className="bi bi-arrow-return-left"></i></span>
                            <Card.Body>
                            <Card.Text>Retur Produksi</Card.Text>
                            </Card.Body>
                        </Card>
                        </Col>
                    </Link>
      
                    <Link to={""} className='link'>
                        <Col>
                        <Card className="text-center">
                            <span className='icon'><i className="bi bi-clipboard-check"></i></span>
                            <Card.Body>
                            <Card.Text>Tally Sheet</Card.Text>
                            </Card.Body>
                        </Card>
                        </Col>
                    </Link>
      
                    <Link to={"/form/Kedatangan"} className='link'>
                        <Col>
                        <Card className="text-center">
                            <span className='icon'><i className="bi bi-truck"></i></span>
                            <Card.Body>
                            <Card.Text>Terima Barang</Card.Text>
                            </Card.Body>
                        </Card>
                        </Col>
                    </Link>
  
                </Row>
            </div>
        </div>
    )
}
