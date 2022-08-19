import { Home } from "./components/Home";
import { Shirts } from "./components/Shirts";
import { Shirt } from "./components/Shirt";
import { Cart } from "./components/Cart";
import { useEffect } from "react";
import * as React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import "./App.css";
import {
  Container,
  Heading,
  HStack,
  VStack,
  Spacer,
  Center,
} from "@chakra-ui/react";
import { useLocalStorage } from "@mantine/hooks";
import { cartCreate } from "./requests/cartCreate";
import { cartRetrieve } from "./requests/cartRetrieve";

function App() {
  // This is the navbar selected and deselected styling
  let activeStyle = {
    opacity: "1",
  };
  let inactiveStyle = {
    opacity: ".1",
  };

  // Setting a cart id in local storage
  const [cartId, setCartId] = useLocalStorage({
    key: "cartId",
    defaultValue: "",
  });

  useEffect(() => {
    if (cartId === "") {
      fetch("https://talkthatshirt.myshopify.com/api/2022-07/graphql.json", {
        method: "POST",
        headers: {
          "X-Shopify-Storefront-Access-Token":
            "c9ffb2f297d048754557c62e2887572c",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: cartCreate,
        }),
      })
        .then((res) => res.json())
        // eslint-disable-next-line no-sequences
        .then((data) => setCartId(data.data.cartCreate.cart.id))
        .catch((error) => console.error("error:", error));
    }
  }, []);

  return (
    <>
      <Center padding={8} borderBottom="1px" borderColor="gray.200">
        <Heading size="md">TalkingSh*rt</Heading>
      </Center>
      <Container padding={8}>
        <BrowserRouter>
          <VStack>
            <HStack overflow="hidden">
              <NavLink
                to="/"
                style={({ isActive }) =>
                  isActive ? activeStyle : inactiveStyle
                }
              >
                <Heading size="4xl">Home</Heading>
              </NavLink>
              <NavLink
                to="/shirts"
                style={({ isActive }) =>
                  isActive ? activeStyle : inactiveStyle
                }
              >
                <Heading size="4xl">Shirts</Heading>
              </NavLink>
              <NavLink
                to="/cart"
                style={({ isActive }) =>
                  isActive ? activeStyle : inactiveStyle
                }
              >
                <Heading size="4xl">Cart</Heading>
              </NavLink>
            </HStack>
            <Spacer />
            <Container borderWidth="1px" borderRadius="8" padding="4">
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
    </>
  );
}

export default App;
