import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';

export const MenuPurchasing = () => {
    return (
        <div className='setContain'>
            <Container fluid>
                <Row xs={1} md={4} className="g-4">
            {/* Eksternal Provider */}
                    <Link to={"/"} className='link'>
                        <Col>
                            <Card className="text-center divisiWidgets">
                                <span className='icon'><i class="bi bi-briefcase"></i></span>
                                <Card.Body>
                                <Card.Text>Eksternal Provider</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Link>
                    {/* OKP */}
                    <Link to={"/"} className='link'>
                        <Col>
                            <Card className="text-center divisiWidgets">
                                <span className='icon'><i class="bi bi-file-earmark-ruled"></i></span>
                                <Card.Body>
                                <Card.Text>OKP</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Link>
                    {/* Pengadaan barang */}
                    <NavLink to={"/form/pengadaan"} className='link'>
                        <Col>
                        <Card className="text-center divisiWidgets">
                            <span className='icon'><i class="bi bi-cart2"></i></span>
                            <Card.Body>
                            <Card.Text>Pengadaan Barang</Card.Text>
                            </Card.Body>
                        </Card>
                        </Col>
                    </NavLink>
                    {/* Permintaan Barang */}
                    <Link to={"/"} className='link'>
                        <Col>
                        <Card className="text-center divisiWidgets">
                            <span className='icon'><i className="bi bi-box-seam"></i></span>
                            <Card.Body>
                            <Card.Text>Permintaan Barang</Card.Text>
                            </Card.Body>
                        </Card>
                        </Col>
                    </Link>
                    {/* Purchasing order */}
                    <NavLink to={"/form/purchaseorder"} className='link'>
                        <Col>
                        <Card className="text-center divisiWidgets">
                            <span className='icon'><i className="bi bi-shop"></i></span>
                            <Card.Body>
                            <Card.Text>Purchasing Order</Card.Text>
                            </Card.Body>
                        </Card>
                        </Col>
                    </NavLink>
                    {/* Terima Barang */}
                    <Link to={"/form/Kedatangan"} className='link'>
                        <Col>
                            <Card className="text-center divisiWidgets">
                                <span className='icon'><i className="bi bi-truck"></i></span>
                                <Card.Body>
                                <Card.Text>Terima Barang</Card.Text>
                                </Card.Body>
                            </Card> 
                        </Col>
                    </Link>

            </Row>
            </Container>
      </div>
    )
}
