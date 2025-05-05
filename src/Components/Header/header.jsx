import { useState } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import axios from "axios";
import { AuthModal } from "./authModal";
const SendRequest = async({type,email,password}) =>
  {
    let response;
    try{
    switch(type){
      case "Register":
        response = await axios.post("api/register",{email,password});
        break;
      case "Login":
        response = await axios.post("api/login",{email,password});
        break;
    } 
    return {success:response.status == 200, message:"Succes"};
    }
    catch(error)
    {
      return { success: true ,message:error.message};
    }
  };
export const Header = () => {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" >
        <Container>
          <Navbar.Brand>TicketBot</Navbar.Brand>
          <Navbar.Collapse id="main-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link onClick={() => setShowRegister(true)}>Register</Nav.Link>
              <Nav.Link onClick={() => setShowLogin(true)}>Login</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <AuthModal  type={showRegister ? 'Register' : showLogin ? 'Login' : null} show={showRegister || showLogin} 
      handleClose={() => { setShowRegister(false); setShowLogin(false); }}
  sendRequest={SendRequest} />
      
    </>
  );
};

