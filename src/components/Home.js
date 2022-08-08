import {
  Image,
  VStack,
  Heading,
  Input,
  Center,
} from "@chakra-ui/react";
import { useState } from "react";
import shirt from "../blank-shirt.png";

export function Home() {
  const [shirtText, setShirtText] = useState("");
  function handleChange(event) {
    setShirtText(event.target.value);
  }

  return (
    <VStack spacing={4}>
      <Center>
        <Image src={shirt} alt="" boxSize="100%" borderRadius={4} />
        <Heading
          position="absolute"
          bottom="65%"
          fontSize="md"
          textColor="white"
        >
          {shirtText}
        </Heading>
      </Center>
      <Input textAlign="center" placeholder='Talk Some Sh*rt' maxLength={20} onChange={handleChange} />
    </VStack>
  );
}
