import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MDBNavbar, MDBContainer, MDBNavbarToggler, MDBCollapse, MDBNavbarNav, MDBNavbarItem, MDBNavbarLink } from 'mdb-react-ui-kit';
import { Icon } from '@mdi/react';
import { mdiMenu, mdiClose } from '@mdi/js';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  return (
    <MDBNavbar expand='lg' light bgColor='light' fixed='top'>
      <MDBContainer fluid>
        <Link to="/" className='navbar-brand'>
          Navbar
        </Link>
        <MDBNavbarToggler onClick={toggleCollapse}>
          <Icon path={isOpen ? mdiClose : mdiMenu} size={1} />
        </MDBNavbarToggler>
        <MDBCollapse show={isOpen} navbar>
          <MDBNavbarNav className='mr-auto' style={{ marginLeft: '800px' }}>
            {/* About */}
            <MDBNavbarItem>
              <MDBNavbarLink href='#'>About</MDBNavbarLink>
            </MDBNavbarItem>
            {/* Services */}
            <MDBNavbarItem>
              <MDBNavbarLink href='#'>Services</MDBNavbarLink>
            </MDBNavbarItem>
            {/* Contact */}
            <MDBNavbarItem>
              <MDBNavbarLink href='#'>Contact</MDBNavbarLink>
            </MDBNavbarItem>
          </MDBNavbarNav>
          {/* Login/Register */}
          <MDBNavbarNav className='ml-auto' style={{ marginLeft: '100px' }}>
            <MDBNavbarItem>
              <Link to="/login" className='nav-link'>Login/Signup</Link>
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default Navbar;
