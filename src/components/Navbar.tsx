import { Button, Container, Nav, Navbar as NavbarBs } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useShoppingCart } from '../context/ShoppingCartContext';

export function Navbar() {
  const { openCart, cartQuantity } = useShoppingCart();

  return <NavbarBs sticky="top" className="bg-white shadow-sm mb-3">
    <Container>
      <Nav className="me-auto">
        <Nav.Link to="/" as={NavLink}>Home</Nav.Link>
        <Nav.Link to="/store" as={NavLink}>Store</Nav.Link>
        <Nav.Link to="/about" as={NavLink}>About</Nav.Link>
      </Nav>
      {cartQuantity > 0 && (
        <Button
          onClick={openCart}
          style={{
            width: "3rem", height: "3rem", position: "relative", display: "flex",
            justifyContent: "center", alignItems: "center", padding: '0.4rem'
          }}
          variant="outline-primary"
          className="rounded-circle">
          <svg viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"
            stroke="#000000" transform="rotate(0)">
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="5.12"></g>
            <g id="SVGRepo_iconCarrier"> <title>shopping-cart</title>
              <g id="Page-1" strokeWidth="17.919999999999998" fill="none" fillRule="evenodd">
                <g id="icon" fill="#000000" transform="translate(42.666667, 85.333333)">
                  <path d="M7.10542736e-15,-1.42108547e-14 L70.3622093,-1.42108547e-14 L89.7493333,85.3333333 L378.389061,85.3333333 L337.246204,277.333333 L89.6377907,277.333333 L36.288,42.6666667 L7.10542736e-15,42.6666667 L7.10542736e-15,-1.42108547e-14 Z M325.610667,128 L99.456,128 L123.690667,234.666667 L302.741333,234.666667 L325.610667,128 Z M138.666667,384 C156.339779,384 170.666667,369.673112 170.666667,352 C170.666667,334.326888 156.339779,320 138.666667,320 C120.993555,320 106.666667,334.326888 106.666667,352 C106.666667,369.673112 120.993555,384 138.666667,384 Z M288,384 C305.673112,384 320,369.673112 320,352 C320,334.326888 305.673112,320 288,320 C270.326888,320 256,334.326888 256,352 C256,369.673112 270.326888,384 288,384 Z" id="Combined-Shape"> </path>
                </g>
              </g>
            </g>
          </svg>
          <div className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
            style={{
              color: "white", width: "1.5rem", height: "1.5rem",
              position: "absolute", bottom: 0, right: 0, transform: "translate(25%, 25%)"
            }}
          >{cartQuantity}</div>
        </Button>
      )}
    </Container>
  </NavbarBs >
}