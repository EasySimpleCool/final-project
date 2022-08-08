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
  Input,
  Center,
} from "@chakra-ui/react";
import { useState } from "react";
import shirt from "../blank-shirt.png"

export function Home() {
  const [shirtText, setShirtText] = useState("");
  function handleChange(event) {
    setShirtText(event.target.value);
    console.log(shirtText);
  }

  return (
    <VStack spacing={4}>
      <Heading>This is my homepage with Jack sh*te on it</Heading>
      <Center>
        <Image
          src={shirt}
          alt=""
          boxSize="100%"
          borderRadius={4}
        />
        <Heading textColor="white" position="absolute">{shirtText}</Heading>
      </Center>

      <Input onChange={handleChange} />
      <Button>Buy</Button>
    </VStack>
  );
}
