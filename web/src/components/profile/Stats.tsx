import { useDojoContext } from "@/dojo/hooks/useDojoContext";
import { HStack, Text, VStack } from "@chakra-ui/react";
import { Hustler } from "../hustler";
import { PowerMeter } from "../PowerMeter";

export default function Stats() {
  const { playerEntityStore } = useDojoContext();
  const { playerEntity } = playerEntityStore;

  if (!playerEntity) return null;

  return (
    <VStack w="40%">
      <Text fontSize="48px">{playerEntity.name}</Text>
      <HStack flexGrow={1} alignSelf="stretch" justifyContent="center" spacing={16}>
        <Hustler hustler={playerEntity.hustler} w="100px" h="270px" />
        <VStack alignItems="stretch">
          <PowerMeter text="ATK" basePower={2} power={3} maxPower={6} displayedPower={6} />
          <PowerMeter text="Def" basePower={2} maxPower={4} displayedPower={6} />
          <PowerMeter text="SPD" basePower={2} power={4} maxPower={5} displayedPower={6} />
          <PowerMeter text="INV" basePower={2} maxPower={4} displayedPower={6} />
        </VStack>
      </HStack>
    </VStack>
  );
}
