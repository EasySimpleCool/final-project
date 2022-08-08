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
import {productQuery} from "./ProductQuery"

export function Shirt() {
  const [selectedShirt, setShirt] = useState(null);
  const [productId, setProductId] = useState("1");
  const params = useParams();
  function getPrice() {
    const edge = selectedShirt.data.product.variants.edges.find(
      (edge) => edge.node.id === productId
    );
    if (edge === undefined) {
      return selectedShirt.data.product.priceRange.maxVariantPrice.amount
    }
    return edge.node.priceV2.amount
  }

  function SelectSize() {
    return (
      <RadioGroup onChange={setProductId} value={productId}>
        <Text fontSize="xs">Size</Text>
        <Stack direction="row" spacing={4}>
          {selectedShirt.data.product.variants.edges.map((data, k) => {
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
  useEffect(() => {
    fetch("https://talkthatshirt.myshopify.com/api/2022-07/graphql.json", {
      method: "POST",
      headers: {
        "X-Shopify-Storefront-Access-Token": "c9ffb2f297d048754557c62e2887572c",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productQuery(params.id)),
    })
      .then((response) => response.json())
      // eslint-disable-next-line no-sequences
      .then((data) => setShirt(data))
      .catch((error) => console.error("error:", error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return selectedShirt !== null ? (
    <VStack align="flex-start" spacing={4}>
      <Image
        src={selectedShirt.data.product.featuredImage.url}
        alt=""
        boxSize="100%"
        borderRadius={8}
      />
      <Heading size="lg">{selectedShirt.data.product.title}</Heading>
      <Tag>{selectedShirt.data.product.tags}</Tag>
      <Text>{selectedShirt.data.product.description}</Text>
      <Heading size="md">${getPrice()}</Heading>
      <SelectSize />
      <Button disabled="true" colorScheme="blue">
        Add to Cart
      </Button>
    </VStack>
  ) : (
    <div>EMPTY</div>
  );
}
