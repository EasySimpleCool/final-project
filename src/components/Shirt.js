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

export function Shirt() {
  const [selectedShirt, setShirt] = useState(null);
  const params = useParams();
  


  function SelectSize() {
    const [value, setValue] = useState("1");
    // const [selectedVariant, setSelectedVariant] = useState("")
    console.log(selectedShirt.data.product.options)

    // function handleChange(event) {
    //   setSelectedVariant(event.target.value);
    //   console.log(selectedVariant);
    // }

    return (
      <RadioGroup onChange={setValue} value={value}>
        <Text fontSize="xs">Size</Text>
        <Stack direction="row" spacing={4}>
          {selectedShirt.data.product.options.values((data, k) => (
            <Radio key={k} value={data.values}>{data.values}</Radio>
          ))}
        </Stack>
      </RadioGroup>
    );
  }

  // function SelectSize() {
  //   const [value, setValue] = useState("1");
  //   return (
  //     <RadioGroup onChange={setValue} value={value}>
  //       <Text fontSize="xs">Size</Text>
  //       <Stack direction="row" spacing={4}>
  //         <Radio value="1">Small</Radio>
  //         <Radio value="2">Medium</Radio>
  //         <Radio value="3">Large</Radio>
  //       </Stack>
  //     </RadioGroup>
  //   );
  // }

  useEffect(() => {
    fetch("https://talkthatshirt.myshopify.com/api/2022-07/graphql.json", {
      method: "POST",
      headers: {
        "X-Shopify-Storefront-Access-Token": "c9ffb2f297d048754557c62e2887572c",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `{
          product(id: "gid://shopify/Product/${params.id}") {
            title
            priceRange {
              maxVariantPrice {
                amount
              }
            }
            tags
            variants(first: 20) {
              edges {
                node {
                  title
                  id
                }
              } 
            }
            description
            options { 
              values
            }
            featuredImage {
              id
              url
            }
          }
        }`,
      }),
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
      <Heading size="md">
        {selectedShirt.data.product.priceRange.maxVariantPrice.amount}
      </Heading>
      {/* <SelectColour /> */}
      <SelectSize />
      <Button colorScheme="blue">Add to Cart</Button>
    </VStack>
  ) : (
    <div>EMPTY</div>
  );
}
