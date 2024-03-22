import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';

export const MenuPpic = () => {
    return (
      <div className='divisi'>
        <Container fluid>
            <Row xs={1} md={4} className="mb-5 g-4">
                {/* data Spare Part */}
                <Link to={"/"} className='link'>
                    <div className="card text-center bg-white">
                        <span className='icon'><i className="bi bi-tools"></i></span>
                        <div class="card-body">
                            <div class="card-text">Data Sparepart</div>
                        </div>
                    </div>
                </Link>
                {/* Data Stock */}
                <Link to={"/"} className='link'>
                    <div className="card text-center bg-white">
                        <span className='icon'><i className="bi bi-inboxes"></i></span>
                        <div class="card-body">
                            <div class="card-text">Data Stock</div>
                        </div>
                    </div>
                </Link>
                {/* Kartu Stock */}
                <Link to={"/"} className='link'>
                    <div className="card text-center bg-white">
                        <span className='icon'><i className="bi bi-card-list"></i></span>
                        <div class="card-body">
                            <div class="card-text">Kartu Stock</div>
                        </div>
                    </div>
                </Link>
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
                {/* Pindah Barang */}
                <Link to="" className='link'>
                    <div className="card text-center bg-white">
                        <span className='icon'><i className="bi bi-recycle"></i></span>
                        <div class="card-body">
                            <div class="card-text">Pindah Barang</div>
                        </div>
                    </div>
                </Link>
                {/* Return Prod */}
                <Link to="" className='link'>
                    <div className="card text-center bg-white">
                        <span className='icon'><i className="bi bi-arrow-return-left"></i></span>
                        <div class="card-body">
                            <div class="card-text">Retur Produksi</div>
                        </div>
                    </div>
                </Link>
                {/* Tallysheet */}
                <Link to={""} className='link'>
                    <div className="card text-center bg-white">
                        <span className='icon'><i className="bi bi-clipboard-check"></i></span>
                        <div class="card-body">
                            <div class="card-text">Tally Sheet</div>
                        </div>
                    </div>
                </Link>
                {/* Terima Barang */}
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
