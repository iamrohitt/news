import React from 'react';
import { Link } from 'react-router-dom';
import { MDBNavbar, MDBContainer, MDBNavbarBrand, MDBNavbarNav, MDBNavbarItem, MDBNavbarLink } from 'mdb-react-ui-kit';

const Navbar = () => {
  return (
    <MDBNavbar expand='lg' light bgColor='light' fixed='top'>
      <MDBContainer fluid>
        <MDBNavbarBrand>
          <h3 className='navbar-brand'>Navbar</h3>
        </MDBNavbarBrand>
        <MDBNavbarNav className='mb-2 mb-lg-0'>
          {/* Home */}
          <MDBNavbarItem>
            <Link to="/" className='nav-link'>Home</Link>
          </MDBNavbarItem>
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
          {/* Login/Register */}
          <MDBNavbarItem>
            <Link to="/login" className='nav-link'>Login/SignUp</Link>
          </MDBNavbarItem>
        </MDBNavbarNav>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default Navbar;
