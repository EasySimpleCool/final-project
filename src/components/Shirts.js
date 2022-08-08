import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { productsQuery } from "./ProductsQuery";
import {
  Button,
  Image,
  VStack,
  Heading,
  Radio,
  RadioGroup,
  Grid,
  GridItem,
} from "@chakra-ui/react";

export function Shirts() {
  const [productInfo, setProductInfo] = useState(null);

  useEffect(() => {
    fetch("https://talkthatshirt.myshopify.com/api/2022-07/graphql.json", {
      method: "POST",
      headers: {
        "X-Shopify-Storefront-Access-Token": "c9ffb2f297d048754557c62e2887572c",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: productsQuery,
      }),
    })
      .then((res) => res.json())
      // eslint-disable-next-line no-sequences
      .then((data) => setProductInfo(data))
      .catch((error) => console.error("error:", error));
  }, []);

  return productInfo !== null ? (
    <Grid templateColumns="repeat(2, 1fr)" rowGap="8" columnGap="4">
      {productInfo.data.products.edges.map((shirt, k) => (
        <Link key={k} to={`/shirts/${shirt.node.id}`}>
          <GridItem>
            <VStack align="flex-start">
              <Image
                src={shirt.node.featuredImage.url}
                alt=""
                boxSize="100%"
                borderRadius={4}
              />
              <Heading size="md">{shirt.node.title}</Heading>
              <Heading size="sm">${shirt.node.priceRange.maxVariantPrice.amount}</Heading>
            </VStack>
          </GridItem>
        </Link>
      ))}
    </Grid>
  ) : (
    <div>WE BLANK</div>
  );
}
