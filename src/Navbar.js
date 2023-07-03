import React from 'react';
import { MDBNavbar, MDBContainer, MDBNavbarBrand } from 'mdb-react-ui-kit';

const Navbar = () => {
  return (
    <MDBNavbar light bgColor='light' fixed='top'> {/* Add 'fixed="top"' */}
      <MDBContainer fluid>
        <MDBNavbarBrand>Navbar</MDBNavbarBrand>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default Navbar;
