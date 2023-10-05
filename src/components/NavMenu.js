import React from "react";
import { Link } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

/*
function NavMenu (){
    return(
        <>
            <Link to = "/" >Home</Link>{'  '}
            <Link to = "All" >All Tasks</Link>{'  '}
            <Link to = "Pending" >Pending Tasks</Link>{'  '}
            <Link to = "Completed" >Completed Tasks</Link>{'  '}
            <Link to = "/About" >About</Link>{'  '}
            <Link to = "/Contact" >Contact</Link>            
        </>
    );
}
export default NavMenu; */

function NavMenu({handleGoogleSignIn, handleLogout, user}) {
    return (
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <Navbar bg="primary" data-bs-theme="dark">
          <Container>
            <Nav className="me-auto">
              {user?(
                <>
              <Nav.Link><Link to="/">Home</Link></Nav.Link>
              <Nav.Link><Link to="/About" >About</Link></Nav.Link>
              <Nav.Link><Link to="/Contact" >Contact</Link></Nav.Link>
              <Nav.Link><Link to="" onClick = {handleLogout}>Logout</Link></Nav.Link>
                </>
              ):(
                <>
              <Nav.Link><Link to="" onClick = {handleGoogleSignIn}>Login</Link></Nav.Link>
                </>
              )}

            </Nav>
          </Container>
        </Navbar> 
      <br />
      </div>
    );
  }
  
  export default NavMenu;