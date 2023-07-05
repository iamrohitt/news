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
    <>
      <style>
        {`
          .hover-underline-animation {
            position: relative;
            color: #0087ca;
          }

          .hover-underline-animation:after {
            content: '';
            position: absolute;
            width: 100%;
            transform: scaleX(0);
            height: 2px;
            bottom: 0;
            left: 0;
            background-color: #0087ca;
            transform-origin: bottom right;
            transition: transform 0.25s ease-out;
          }

          .hover-underline-animation:hover:after {
            transform: scaleX(1);
            transform-origin: bottom left;
          }
        `}
      </style>
      <MDBNavbar expand='lg' light bgColor='light' fixed='top'>
        <MDBContainer fluid>
          <Link to="/" className='navbar-brand'>
            Navbar
          </Link>
          <MDBNavbarToggler onClick={toggleCollapse}>
            <Icon path={isOpen ? mdiClose : mdiMenu} size={1} />
          </MDBNavbarToggler>
          <MDBCollapse show={isOpen} navbar>
            <MDBNavbarNav className='mr-auto 'style={{marginLeft:'800px'}}>
              {/* About */}
              <MDBNavbarItem>
                <MDBNavbarLink href='#' className='hover-underline-animation'>About</MDBNavbarLink>
              </MDBNavbarItem>
              {/* Services */}
              <MDBNavbarItem>
                <MDBNavbarLink href='#' className='hover-underline-animation'>Services</MDBNavbarLink>
              </MDBNavbarItem>
              {/* Contact */}
              <MDBNavbarItem>
                <MDBNavbarLink href='#' className='hover-underline-animation'>Contact</MDBNavbarLink>
              </MDBNavbarItem>
            </MDBNavbarNav>
            {/* Login/Register */}
            <MDBNavbarNav className='ml-auto'style={{marginLeft:'100px'}}>
              <MDBNavbarItem>
                <Link to="/login" className='nav-link hover-underline-animation'>Login/Signup</Link>
              </MDBNavbarItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </>
  );
};

export default Navbar;
