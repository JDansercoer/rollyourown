import { useDojoContext } from "@/dojo/hooks/useDojoContext";
import { HStack, Text, VStack } from "@chakra-ui/react";
import { Hustler } from "../hustler";
import { PowerMeter } from "../PowerMeter";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

interface PlayerStats {
  base_dmg_tier: bigint;
  current_dmg_tier: bigint;
  base_def_tier: bigint;
  current_def_tier: bigint;
  base_spd_tier: bigint;
  current_spd_tier: bigint;
  base_inv_tier: bigint;
  current_inv_tier: bigint;
}

export default function Stats() {
  const router = useRouter();
  const gameId = router.query.gameId as string;
  const { playerEntityStore } = useDojoContext();
  const { playerEntity } = playerEntityStore;
  const {
    account,
    setup: {
      network: { call },
    },
  } = useDojoContext();
  const [playerStats, setPlayerStats] = useState<PlayerStats>();

  useEffect(() => {
    const getStuff = async () => {
      const playerStats = (await call(account!, "profile", "get_power_stats", [
        Number(gameId),
        account!.address,
      ])) as PlayerStats;
      setPlayerStats(playerStats);
    };

    if (account) {
      getStuff();
    }
  }, [account, call, gameId]);

  if (!playerEntity || !playerStats) return null;

  return (
    <VStack w="40%">
      <Text fontSize="48px">{playerEntity.name}</Text>
      <HStack flexGrow={1} alignSelf="stretch" justifyContent="center" spacing={16}>
        <Hustler hustler={playerEntity.hustler} w="100px" h="270px" />
        <VStack alignItems="stretch">
          <PowerMeter
            text="ATK"
            basePower={Number(playerStats.base_dmg_tier)}
            power={Number(playerStats.current_dmg_tier)}
            maxPower={6}
            displayedPower={6}
          />
          <PowerMeter
            text="Def"
            basePower={Number(playerStats.base_def_tier)}
            power={Number(playerStats.current_def_tier)}
            maxPower={4}
            displayedPower={6}
          />
          <PowerMeter
            text="SPD"
            basePower={Number(playerStats.base_spd_tier)}
            power={Number(playerStats.current_spd_tier)}
            maxPower={5}
            displayedPower={6}
          />
          <PowerMeter
            text="INV"
            basePower={Number(playerStats.base_inv_tier)}
            power={Number(playerStats.current_inv_tier)}
            maxPower={4}
            displayedPower={6}
          />
        </VStack>
      </HStack>
    </VStack>
  );
}
