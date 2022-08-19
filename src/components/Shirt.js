import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Image,
  Stack,
  VStack,
  Heading,
  Radio,
  RadioGroup,
  Text,
  Tag,
} from "@chakra-ui/react";
import { productQuery } from "./ProductQuery";
import { useLocalStorage } from "@mantine/hooks";
import { cartLinesAdd } from "../requests/cartLinesAdd";

export function Shirt() {
  const [shirtData, setShirtData] = useState(null);

  const [productId, setProductId] = useState("");

  // params is the end of the URL. Then plug it into getProduct request
  const params = useParams();
  useEffect(() => {
    fetch(process.env.REACT_APP_SHOPIFY_DOMAIN, {
      method: "POST",
      headers: {
        "X-Shopify-Storefront-Access-Token": process.env.REACT_APP_SHOPIFY_API,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productQuery(params.id)),
    })
      .then((response) => response.json())
      // eslint-disable-next-line no-sequences
      .then((data) => setShirtData(data))
      .catch((error) => console.error("error:", error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useLocalStorage from Mantine UI and get cartId
  const [cartId, getCartId] = useLocalStorage({});
  useEffect(() => {
    const localCartId = localStorage.getItem("cartId");
    getCartId(localCartId);
    // console.log(cartId);
  }, []);

  function getPrice() {
    const edge = shirtData.data.product.variants.edges.find(
      (edge) => edge.node.id === productId
    );
    if (edge === undefined) {
      return shirtData.data.product.priceRange.maxVariantPrice.amount;
    }
    return edge.node.priceV2.amount;
  }

  function SelectSize() {
    return (
      <RadioGroup onChange={setProductId} value={productId}>
        <Text fontSize="xs">Size</Text>
        <Stack direction="row" spacing={4}>
          {shirtData.data.product.variants.edges.map((data, k) => {
            const title = data.node.title;
            const node = data.node.id;
            return (
              <Radio key={k} value={node}>
                {title}
              </Radio>
            );
          })}
        </Stack>
      </RadioGroup>
    );
  }

  function addToCart() {
    fetch(process.env.REACT_APP_SHOPIFY_DOMAIN, {
      method: "POST",
      headers: {
        "X-Shopify-Storefront-Access-Token": process.env.REACT_APP_SHOPIFY_API,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: cartLinesAdd(cartId, productId),
      }),
    });
  }

  return shirtData !== null ? (
    <div>
      <Image
        src={shirtData.data.product.featuredImage.url}
        alt=""
        boxSize="100%"
        borderRadius={8}
      />
      <Heading size="lg">{shirtData.data.product.title}</Heading>
      <Tag>{shirtData.data.product.tags}</Tag>
      <Text>{shirtData.data.product.description}</Text>
      <Heading size="md">${getPrice()}</Heading>
      <SelectSize />
      <Button onClick={addToCart} colorScheme="blue">
        Add to Cart
      </Button>
    </div>
  ) : (
    <div>EMPTY</div>
  );
}
