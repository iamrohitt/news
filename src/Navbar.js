import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MDBNavbar, MDBContainer, MDBNavbarToggler, MDBCollapse, MDBNavbarNav, MDBNavbarItem, MDBNavbarLink } from 'mdb-react-ui-kit';
import { Icon } from '@mdi/react';
import { mdiMenu, mdiClose } from '@mdi/js';
import newspaper from './newspaper.png'; // Import the PNG image
import './Navbar.css'
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <MDBNavbar expand='lg' light bgColor='light' fixed='top'>
        <MDBContainer fluid>
          <Link to="/" className='navbar-brand'>
            <img src={newspaper} alt="newspaper" />
            <span className="navbar-heading">DNC</span>
          </Link>
          <div className='nav-style'>
          <MDBNavbarToggler onClick={toggleCollapse}>
            <Icon path={isOpen ? mdiClose : mdiMenu} size={1} />
          </MDBNavbarToggler>
          <MDBCollapse show={isOpen} navbar>
            <MDBNavbarNav className='ml-auto'>
              {/* About */}
              <MDBNavbarItem>
                <Link to="/about" className='nav-link hover-underline-animation'>About</Link>
              </MDBNavbarItem>
            
            
            </MDBNavbarNav>
            {/* Login/Register */}
            <MDBNavbarNav className='ml-auto'>
              <MDBNavbarItem>
                <Link to="/login" className='nav-link hover-underline-animation'>Login/Signup</Link>
              </MDBNavbarItem>
            </MDBNavbarNav>
          </MDBCollapse>
          </div>
        </MDBContainer>
      </MDBNavbar>
    </>
  );
};

export default Navbar;