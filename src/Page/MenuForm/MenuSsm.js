import React from 'react'
import { Container, Row } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'

export const MenuSsm = () => {
  return (
    <div className='divisi'>
        <Container fluid>
            <Row xs={1} md={4} className="mb-5 g-4 mt-2">
                {/* OKP */}
                <Link to={"/"} className='link'>
                    <div className="card text-center bg-white">
                        <span className='icon'><i className="bi bi-file-earmark-ruled"></i></span>
                            <div class="card-body">
                                <div class="card-text">OKP</div>
                            </div>
                    </div>
                </Link>
                {/* Pengadaan barang */}
                <NavLink to={"/form/pengadaan"} className='link'>
                    <div className="card text-center bg-white">
                        <span className='icon'><i className="bi bi-cart2"></i></span>
                            <div class="card-body">
                                <div class="card-text">Pengadaan Barang</div>
                            </div>
                    </div>
                </NavLink>
                {/* Permintaan Barang */}
                <Link to={"/"} className='link'>
                    <div className="card text-center bg-white">
                        <span className='icon'><i className="bi bi-box-seam"></i></span>
                            <div class="card-body">
                                <div class="card-text">Permintaan Barang</div>
                            </div>
                    </div>
                </Link>
            </Row>
        </Container>
    </div>
  )
}
