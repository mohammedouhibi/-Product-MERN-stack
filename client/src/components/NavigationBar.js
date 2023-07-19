import { Container, Nav, Navbar} from "react-bootstrap";

import { NavLink } from "react-router-dom";

export default function NavigationBar(){
  
    return (
    
    <Navbar bg="light" expand="lg">
    <Container>
      <Navbar.Brand href="#">Bienvenue !</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" >
        <Nav className="me-auto">
        
          <Nav.Link as={NavLink}  to="/products"
           style={({isActive})=> ({ textDecoration : isActive ? 'underline' : 'none' })}>
            Liste Produits</Nav.Link>
            <Nav.Link as={NavLink}  to="/AddProduct"
           style={({isActive})=> ({ textDecoration : isActive ? 'underline' : 'none' })}>
            Ajouter un produit</Nav.Link>
          {/* <Nav.Link as={NavLink}  to="/products/add" 
           style={({isActive})=> ({ textDecoration : isActive ? 'underline' : 'none' })} >
            Add Product</Nav.Link> 
            <Nav.Link as={NavLink} to="/cart" style={({isActive})=>({textDecoration:isActive && 'underline'})}></Nav.Link> */}
        </Nav>
       
      </Navbar.Collapse>
    </Container>
  </Navbar>)
}
