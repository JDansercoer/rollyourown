import { Box, Grid, HStack, Text, VStack } from "@chakra-ui/react";
import { useProfileInfo } from "@/dojo/hooks/useProfileInfo";
import { getIconForItem, getUnlockedUpgrades } from "@/utils/items";

const STATS = ["DMG", "DEF", "SPD", "INV"];

export default function Loadout() {
  const { playerEntity, playerStats } = useProfileInfo();

  if (!playerEntity || !playerStats) return null;

  return (
    <Grid templateColumns="36px max-content max-content" columnGap={4} rowGap={6} justifyContent="center" w="full">
      {STATS.map((stat) => {
        const statKey = `${stat.toLowerCase()}` as keyof typeof playerStats;
        const statInfo = playerStats[statKey];
        const Icon = getIconForItem(statInfo.item_name);
        const unlockedUpgrades = getUnlockedUpgrades(statInfo.item_name, statInfo.current_tier - statInfo.base_tier);

        return (
          <>
            <Icon boxSize={9} />
            <VStack alignItems="stretch" spacing={0} paddingRight={16}>
              <HStack justifyContent="space-between" fontFamily="broken-console" fontSize="10px" color="neon.500">
                <Text>Weapon</Text>
                <Text>{stat}</Text>
              </HStack>
              <Text fontSize="14px">{statInfo.item_name}</Text>
            </VStack>
            <VStack spacing={0} alignItems="flex-start" fontSize="14px">
              {Object.entries(unlockedUpgrades).map(([upgrade, upgraded]) => {
                return (
                  <Text key={upgrade} color={upgraded ? "yellow.400" : "neon.600"}>
                    + {upgrade}
                  </Text>
                );
              })}
            </VStack>
            <Box h="px" bg="neon.700" gridColumn="1 / -1" />
          </>
        );
      })}
    </Grid>
  );
}
