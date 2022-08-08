import { useEffect, useState, useContext } from "react";
import {
  Button,
  Image,
  HStack, VStack,
  Heading,
  Radio,
  RadioGroup,
  Box,
  Flex, Spacer
} from "@chakra-ui/react";

export function Cart() {
  return (
    <VStack width="100%" >
      <p>Cart Items</p>
      <HStack borderWidth='1px' borderRadius="8" padding="4" width="100%" spacing="4">
        <Image boxSize="100px" src="https://via.placeholder.com/900" alt=""/>
        <Flex width="100%" >
          <Heading>Design Title</Heading>
          <Spacer></Spacer>
          <Heading>$30</Heading>
        </Flex>
      </HStack>
    </VStack>
  );
}
