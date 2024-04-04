import React from "react";
import { Container, Stack, Button } from "./styled";
import { ReactComponent as Logo } from "../images/logo.svg";
import { ReactComponent as CartIcon } from "../images/cart.svg";
import { Link } from "react-router-dom";
import Box from "../components/styled/Box";

const Header = () => {
  return (
    <>
      <Container
        size="fullwidth"
        position="fixed"
        background="grey.800"
        zIndex={999}
      >
        <Stack direction="column" align="center">
          <Container>
            <Stack
              justify="space-between"
              align="center"
              width="100%"
              height={["64px", "72px"]}
            >
              <Link to="/" style={{ textDecoration: "none" }}>
                <Logo />
              </Link>
              <Link to="/checkout">
                <Button variant="text">
                  <CartIcon></CartIcon>
                </Button>
              </Link>
              <Box display={["none", "black"]}>
                <h4>Header</h4>
              </Box>
            </Stack>
          </Container>
        </Stack>
      </Container>
      <Box height={["64px", "72px"]} width="100%"></Box>
    </>
  );
};

export default Header;
