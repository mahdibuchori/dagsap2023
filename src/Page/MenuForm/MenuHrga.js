import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';

export const MenuHrga = () => {
    return (
        <div className='setContain'>
            <Container fluid>
                <Row xs={1} md={4} className="mb-5 g-4 mt-2">
                    {/* Data karyawan */}
                    <NavLink to={"/form/karyawan"} className='link'>
                        <Col>
                        <Card className="text-center divisiWidgets">
                            <span className='icon'><i class="bi bi-person-circle"></i></span>
                            <Card.Body>
                            <Card.Text>Data Karyawan</Card.Text>
                            </Card.Body>
                        </Card>
                        </Col>
                    </NavLink>
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
            </Row>
            </Container>
      </div>
    )
}
