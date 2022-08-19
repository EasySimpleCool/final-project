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
// import { cartCreate } from "../requests/cartCreate";
// import { getByPlaceholderText } from "@testing-library/react";
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
    fetch("https://talkthatshirt.myshopify.com/api/2022-07/graphql.json", {
      method: "POST",
      headers: {
        "X-Shopify-Storefront-Access-Token": "c9ffb2f297d048754557c62e2887572c",
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

  // function CartItem(props) {
  //   <div>
  //     <Image src={props.url} alt="" boxSize="100%" borderRadius={4} />
  //     <Heading>{props.title}</Heading>
  //     <Spacer></Spacer>
  //     <Heading>{props.price}</Heading>
  //   </div>;
  // }

  function removeFromCart(thisValue) {
    fetch("https://talkthatshirt.myshopify.com/api/2022-07/graphql.json", {
      method: "POST",
      headers: {
        "X-Shopify-Storefront-Access-Token": "c9ffb2f297d048754557c62e2887572c",
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
            {/* <Button onClick={removeFromCart(edge.node.merchandise.id)}>
              {edge.node.merchandise.id}
            </Button> */}
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
