import Home from "./Home";
import ProductLibrary from "./ProductLibrary";
import ProductDetails from "./ProductDetails";
import * as React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { HStack } from "@chakra-ui/react";
import "./App.css"

function App() {
  return (
    <BrowserRouter>
      <HStack spacing='8px'>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/shop">Shop</NavLink>
        <NavLink to="/cart">Cart</NavLink>
      </HStack>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<ProductLibrary />}>
          <Route path=":id" element={<ProductDetails />} />
        </Route>
        <Route path="*" element={<p>Page not found</p>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
