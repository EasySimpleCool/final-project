import { useState, useEffect } from "react";
import "./App.css";
import { Box, Image, Grid, GridItem } from "@chakra-ui/react";

const productsQuery = `
{
    products(first: 10) {
      edges {
        node {
          id
          title
          priceRange {
            maxVariantPrice {
              amount
            }
          }
          featuredImage {
            id
            url
          }
        }
      }
    }
  }
  `;

function ProductLibrary() {
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
      .then((response) => response.json())
      .then((data) => setProductInfo(data))
      .catch((error) => console.error("error:", error));
  }, []);

  return productInfo !== null ? (
    <div>
      <Grid templateColumns="repeat(5, 1fr)" gap={40}>
        {productInfo.data.products.edges.map((edge, k) => (
          <GridItem>
            <div key={k}>
              <Box boxSize="sm">
                <Image
                  src={edge.node.featuredImage.url}
                  alt={edge.node.title}
                />
              </Box>
              <p>{edge.node.title}</p>
              <p>{edge.node.priceRange.maxVariantPrice.amount}</p>
            </div>
          </GridItem>
        ))}
      </Grid>
      <Grid templateColumns="repeat(5, 1fr)" gap={6}>
        <Box boxSize="sm">
          <Image src="https://bit.ly/dan-abramov" alt="Dan Abramov" />
        </Box>
        <Box boxSize="sm">
          <Image src="https://bit.ly/dan-abramov" alt="Dan Abramov" />
        </Box>
      </Grid>
    </div>
  ) : (
    <div>WE BLANK</div>
  );
}

export default ProductLibrary;
