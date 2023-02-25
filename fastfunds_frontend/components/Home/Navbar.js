import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Navbar, Container, Nav } from "react-bootstrap";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignupModal";

export default function NavigationBar(props) {
  const [show, setshow] = useState(false);
  const [user, setUser] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setshow(true);
    const user = JSON.parse(localStorage.getItem("user"));
    if (user !== null) setUser(true);
    else setUser(false);
  }, []);
  let logoStyles;
  let loginStyles;
  logoStyles = {
    width: "15%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  loginStyles = {
    color: "white",
    fontWeight: "bold",
    backgroundColor: "#2E358F",
    borderRadius: "5px",
    // fontSize: "1.15rem",
    marginRight: "1.5rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100px",
    paddingTop: "0.5rem",
    paddingBottom: "0.5rem",
  };
  const navigationStyles = {
    maxHeight: "100px",
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
  };

  const navDeetsStyles = {
    fontSize: "1.15rem",
    color: "black",
    fontWeight: "500",
  };

  const logotext = {
    fontWeight: "700",
  };

  const nav = {
    boxShadow: "0px 3px 3px #888888",
    position: "fixed",
  };
  const onOpenModal = () => props.setOpen(true);
  const onCloseModal = () => props.setOpen(false);
  const onOpenSignUpModal = () => props.setSignUpOpen(true);
  const onCloseSignUpModal = () => props.setSignUpOpen(false);

  const logout = async () => {
    localStorage.removeItem("user");
    setUser(false);
    router.push("/");
  };

  return (
    <>
      {show && (
        <Navbar bg="white" expand="lg" fixed="top" style={nav}>
          <Container fluid>
            <Navbar.Brand href="/" style={logoStyles}>
              <img src="/logo.jpeg" alt="logo" width={"30%"} />
              <Navbar.Brand style={logotext}>FAST FUNDS</Navbar.Brand>
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="navbarScroll" />

            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={navigationStyles}
                navbarScroll
              >
                <Nav.Link style={navDeetsStyles} href="/#home">
                  Home
                </Nav.Link>
                <Nav.Link style={navDeetsStyles} href="/#features">
                  Features
                </Nav.Link>
                <Nav.Link style={navDeetsStyles} href="/#help">
                  Help
                </Nav.Link>
                <Nav.Link style={navDeetsStyles} href="/#contact">
                  Contact Us
                </Nav.Link>
              </Nav>
              {user ? (
                <Nav.Link style={loginStyles} href="#" onClick={logout}>
                  Logout
                </Nav.Link>
              ) : (
                <Nav.Link style={loginStyles} href="#" onClick={onOpenModal}>
                  Login
                </Nav.Link>
              )}
            </Navbar.Collapse>
          </Container>
          <LoginModal
            open={props.open}
            onCloseModal={onCloseModal}
            setOpen={props.setOpen}
            signUpOpen={props.signUpOpen}
            onOpenSignUpModal={onOpenSignUpModal}
            onCloseSignUpModal={onCloseSignUpModal}
            setForgotOpen={props.setForgotOpen}
            setUser={setUser}
          />
          <SignUpModal
            open={props.signUpOpen}
            onCloseModal={onCloseSignUpModal}
          />
        </Navbar>
      )}
    </>
  );
}
