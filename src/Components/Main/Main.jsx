import { Container } from "react-bootstrap";
import backgroundImage from "./background.png"

export const Main = () => 
{
    return(
        <>
        <Container>
        <div  style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '60rem',
        position: 'relative',
      }}>
        <h1>Snoop Dogg Loh</h1> 
        </div>
        </Container>
        
        </>
    );
}