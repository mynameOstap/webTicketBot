import { useState } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import axios from "axios";
import { AuthModal } from "./authModal";

export const Header = () => {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  const SendRequest = async({type,Email,Password}) =>
    {
      let response;
      try{
      switch(type){
        case "Register":
          response = await axios.post("http://localhost:5244/api/register",{Email,Password});
          break;
        case "Login":
          response = await axios.post("http://localhost:5244/api/login",{Email,Password},{ withCredentials: true });
          if(response.data.success)
          {
            checkAuth()
          }
          break;
      } 
      return {success:response.status == 200, message:"Success"};
      }
      catch(error)
      {
        return { success: true ,message:error.message};
      }
    };

    const checkAuth = async () => {
      try {
        const response = await axios.get("http://localhost:5244/api/checkauth", { withCredentials: true });
        if (response.data.success) {
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }
      } catch (error) {
        setIsAuth(false);
      }
    };
    const handleLogout = async () =>
    {
      try{
        const response = await axios.get("http://localhost:5244/api/logout", { withCredentials: true })
        if (response.data.success) {
          setIsAuth(false);
        } else {
          setIsAuth(true);
        }
      } catch (error) {
        setIsAuth(false);
      }
    };
      


  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" >
        <Container>
          <Navbar.Brand>TicketBot</Navbar.Brand>
          <Navbar.Collapse id="main-navbar-nav">
            <Nav className="ms-auto">
            {isAuth ? (
                <>
                  <Nav.Link>Hello,Nigger</Nav.Link>
                  <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link onClick={() => setShowRegister(true)}>Register</Nav.Link>
                  <Nav.Link onClick={() => setShowLogin(true)}>Login</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <AuthModal  type={showRegister ? 'Register' : showLogin ? 'Login' : null} show={showRegister || showLogin} 
      handleClose={() => { setShowRegister(false); setShowLogin(false); }}
  sendRequest={SendRequest} 
  setIsAuth={setIsAuth}
  />
      
    </>
  );
};

