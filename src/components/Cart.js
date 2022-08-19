import {
  Image,
  HStack,
  VStack,
  Heading,
  Flex,
  Spacer,
  Button,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocalStorage } from "@mantine/hooks";
import { cartRetrieve } from "../requests/cartRetrieve";
import { cartLinesRemove } from "../requests/cartLinesRemove";

export function Cart() {
  // useLocalStorage from Mantine UI and get cartId
  const [cartId, setCartId] = useLocalStorage({
    key: "cartId",
    defaultValue: "",
  });

  // send cartRetrieve request with cartId plugged into it
  const [cartData, setCartData] = useState(null);
  useEffect(() => {
    fetch(process.env.REACT_APP_SHOPIFY_DOMAIN, {
      method: "POST",
      headers: {
        "X-Shopify-Storefront-Access-Token": process.env.REACT_APP_SHOPIFY_API,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: cartRetrieve(cartId),
      }),
    })
      .then((res) => res.json())
      // eslint-disable-next-line no-sequences
      .then((data) => setCartData(data))
      .catch((error) => console.error("error:", error));
  }, []);

  function removeFromCart(thisValue) {
    fetch(process.env.REACT_APP_SHOPIFY_DOMAIN, {
      method: "POST",
      headers: {
        "X-Shopify-Storefront-Access-Token": process.env.REACT_APP_SHOPIFY_API,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: cartLinesRemove(cartId, thisValue),
      }),
    });
  }

  return cartData !== null ? (
    <VStack width="100%">
      {cartData.data.cart.lines.edges.map((edge, k) => {
        return (
          <div key={k}>
            <HStack padding={4} borderWidth="1px" borderRadius="8">
              <Image
                src={edge.node.merchandise.product.featuredImage.url}
                alt=""
                boxSize="25%"
                borderRadius={4}
              ></Image>
              <Heading>{edge.node.merchandise.product.title}</Heading>
              <Heading>{edge.node.cost.amountPerQuantity.amount}</Heading>
            </HStack>
            <Text>Quantity:{edge.node.quantity}</Text>
          </div>
        );
      })}
      <Heading>Items: {cartData.data.cart.totalQuantity}</Heading>
      <Heading>Total: {cartData.data.cart.cost.totalAmount.amount}</Heading>
      <a href={cartData.data.cart.checkoutUrl}>
        <Button>Checkout</Button>
      </a>
    </VStack>
  ) : (
    <>empty</>
  );
}
