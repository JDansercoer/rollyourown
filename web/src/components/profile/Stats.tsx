import { HStack, Text, VStack } from "@chakra-ui/react";
import { Hustler } from "../hustler";
import { PowerMeter } from "../PowerMeter";
import { useProfileInfo } from "@/dojo/hooks/useProfileInfo";

export default function Stats() {
  const { playerEntity, playerStats } = useProfileInfo();

  if (!playerEntity || !playerStats) return null;

  return (
    <VStack w="40%">
      <Text fontSize="48px">{playerEntity.name}</Text>
      <HStack flexGrow={1} alignSelf="stretch" justifyContent="center" spacing={16}>
        <Hustler hustler={playerEntity.hustler} w="100px" h="270px" />
        <VStack alignItems="stretch">
          <PowerMeter
            text="ATK"
            basePower={playerStats.dmg.base_tier}
            power={playerStats.dmg.current_tier}
            maxPower={6}
            displayedPower={6}
          />
          <PowerMeter
            text="Def"
            basePower={playerStats.def.base_tier}
            power={playerStats.def.current_tier}
            maxPower={4}
            displayedPower={6}
          />
          <PowerMeter
            text="SPD"
            basePower={playerStats.spd.base_tier}
            power={playerStats.spd.current_tier}
            maxPower={5}
            displayedPower={6}
          />
          <PowerMeter
            text="INV"
            basePower={playerStats.inv.base_tier}
            power={playerStats.inv.current_tier}
            maxPower={5}
            displayedPower={6}
          />
        </VStack>
      </HStack>
    </VStack>
  );
}
