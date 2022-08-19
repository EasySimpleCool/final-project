import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { productsQuery } from "./ProductsQuery";
import { Image, VStack, Heading, Grid, GridItem } from "@chakra-ui/react";

export function Shirts() {
  const [productInfo, setProductInfo] = useState(null);

  useEffect(() => {
    fetch(process.env.REACT_APP_SHOPIFY_DOMAIN, {
      method: "POST",
      headers: {
        "X-Shopify-Storefront-Access-Token": process.env.REACT_APP_SHOPIFY_API,
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
              <Heading size="sm">
                ${shirt.node.priceRange.maxVariantPrice.amount}
              </Heading>
            </VStack>
          </GridItem>
        </Link>
      ))}
    </Grid>
  ) : (
    <div>WE BLANK</div>
  );
}
