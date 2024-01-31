import { Box, Grid, HStack, Text, VStack } from "@chakra-ui/react";
import { AK47 } from "../icons/items";

export default function Loadout() {
  return (
    <Grid templateColumns="36px max-content max-content" columnGap={4} rowGap={6} justifyContent="center" w="full">
      <AK47 boxSize={9} />
      <VStack alignItems="stretch" spacing={0} paddingRight={16}>
        <HStack justifyContent="space-between" fontFamily="broken-console" fontSize="10px" color="neon.500">
          <Text>Weapon</Text>
          <Text>ATK</Text>
        </HStack>
        <Text fontSize="14px">Blood-Stained Shirt</Text>
      </VStack>
      <VStack spacing={0} alignItems="flex-start" fontSize="14px">
        <Text color="yellow.400">+ Extended Mag</Text>
        <Text color="neon.600">+ Recoil Compensator</Text>
        <Text color="neon.600">+ Laser Sight</Text>
      </VStack>
      <Box h="px" bg="neon.700" gridColumn="1 / -1" />
      <AK47 boxSize={9} />
      <VStack alignItems="stretch" spacing={0} paddingRight={16}>
        <HStack justifyContent="space-between" fontFamily="broken-console" fontSize="10px" color="neon.500">
          <Text>Weapon</Text>
          <Text>ATK</Text>
        </HStack>
        <Text fontSize="14px">Blood-Stained Shirt</Text>
      </VStack>
      <VStack spacing={0} alignItems="flex-start" fontSize="14px">
        <Text color="yellow.400">+ Extended Mag</Text>
        <Text color="neon.600">+ Recoil Compensator</Text>
        <Text color="neon.600">+ Laser Sight</Text>
      </VStack>
      <Box h="px" bg="neon.700" gridColumn="1 / -1" />
    </Grid>
  );
}
