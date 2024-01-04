import React, { useEffect, useState } from 'react';
import icon from '../assets/img/dee.png';
import { Container, Navbar, Nav, Modal } from "react-bootstrap";
import { Login } from './Login';
// import Login from './Login';

const Header = () => {
    const [show, setShow] = useState(false);
    const [activeLink, setActiveLink] = useState('home');
    const [scrolled, setScrolled] = useState(false);

    const handleClick = (num) => {
        setShow(num)
        console.log('argument from Child: ', num);
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        const onScroll = () => {
        if (window.scrollY > 50) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
        }

        window.addEventListener("scroll", onScroll);

        return () => window.removeEventListener("scroll", onScroll);
    }, [])

    const onUpdateActiveLink = (value) => {
        setActiveLink(value);
    }

  return (
    <>
        <Navbar expand="lg" className={scrolled ? "scrolled" : ""}>
            <Container fluid="lg">
                <Navbar.Brand href="/">
                    <img src={icon} width="35" height="35"alt="Logo" />
                    &nbsp;
                    <span className='logText'>PT. Dagsap Endura Eatore</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav">
                    <span className="navbar-toggler-icon"></span>
                </Navbar.Toggle>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                    <Nav.Link href="#home" className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('home')}>Home</Nav.Link>
                    <Nav.Link href="#visi" className={activeLink === 'visi' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('visi')}>Visi</Nav.Link>
                    <Nav.Link href="#misi" className={activeLink === 'misi' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('misi')}>Misi</Nav.Link>
                    <Nav.Link href="#barnd" className={activeLink === 'barnd' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('skills')}>Brand</Nav.Link>
                    <Nav.Link href="#contact" className={activeLink === 'contact' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('projects')}>Contact</Nav.Link>
                    </Nav>
                    <span className="navbar-text">
                    <div className="social-icon">
                    </div>
                    <button className="vvd" onClick={handleShow}><span>Login</span></button>
                    </span>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <Modal Modal show={show} onHide={handleClose} animation={false} centered>
            <Login handleClick={handleClick}/>
            
        </Modal>
    </>
  )
}

export default Header