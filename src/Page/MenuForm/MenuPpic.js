import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';

export const MenuPpic = () => {
    return (
      <div className='divisi'>
          <div className='divisiWidgets'>
              <Row xs={1} md={4} className="g-4">
                  {/* data Spare Part */}
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
                  {/* Data Stock */}
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
                  {/* Kartu Stock */}
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
                  {/* OKP */}
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
                  {/* Pengadaan barang */}
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
                  {/* Permintaan Barang */}
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
                  {/* Pindah Barang */}
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
                  {/* Return Prod */}
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
                  {/* Tallysheet */}
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
                  {/* Terima Barang */}
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
