import { Home } from "./components/Home";
import { Shirts } from "./components/Shirts";
import { Shirt } from "./components/Shirt";
import { Cart } from "./components/Cart";
import * as React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import "./App.css";
import {
  Container,
  Heading,
  HStack,
  VStack,
  Spacer,
} from "@chakra-ui/react";

function App() {
  let activeStyle = {
    opacity: "1",
  };

  let inactiveStyle = {
    opacity: ".1",
  };

  return (
    <Container>
      <BrowserRouter>
        <VStack>
          <HStack>
            <NavLink
              to="/"
              style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
            >
              <Heading size='4xl'>Home</Heading>
            </NavLink>
            <NavLink
              to="/shirts"
              style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
            >
              <Heading size='4xl'>Shirts</Heading>
            </NavLink>
            <NavLink
              to="/cart"
              style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
            >
              <Heading size='4xl'>Cart</Heading>
            </NavLink>
          </HStack>
          <Spacer />
          <Container borderWidth='1px' borderRadius="8" padding="4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shirts">
                <Route index element={<Shirts />} />
                <Route path="gid://shopify/Product/:id" element={<Shirt />} />
              </Route>
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<p>Page not found</p>} />
            </Routes>
          </Container>
        </VStack>
      </BrowserRouter>
    </Container>
  );
}

export default App;
