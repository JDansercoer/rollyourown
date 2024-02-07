import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useDojoContext } from "./useDojoContext";
import { shortString } from "starknet";

export interface PlayerStats {
  dmg: {
    base_tier: number;
    current_tier: number;
    item_name: string;
  };
  def: {
    base_tier: number;
    current_tier: number;
    item_name: string;
  };
  spd: {
    base_tier: number;
    current_tier: number;
    item_name: string;
  };
  inv: {
    base_tier: number;
    current_tier: number;
    item_name: string;
  };
}

export const useProfileInfo = () => {
  const router = useRouter();
  const gameId = router.query.gameId as string;
  const {
    playerEntityStore,
    account,
    setup: {
      network: { call },
    },
  } = useDojoContext();
  const { playerEntity } = playerEntityStore;
  const [playerStats, setPlayerStats] = useState<PlayerStats>();

  useEffect(() => {
    const getStuff = async () => {
      const playerStats = (await call(account!, "profile", "get_power_stats", [
        Number(gameId),
        account!.address,
      ])) as any;

      setPlayerStats({
        dmg: {
          base_tier: Number(playerStats.base_dmg_tier),
          current_tier: Number(playerStats.current_dmg_tier),
          item_name: shortString.decodeShortString(playerStats.dmg_item_name),
        },
        def: {
          base_tier: Number(playerStats.base_def_tier),
          current_tier: Number(playerStats.current_def_tier),
          item_name: shortString.decodeShortString(playerStats.def_item_name),
        },
        spd: {
          base_tier: Number(playerStats.base_spd_tier),
          current_tier: Number(playerStats.current_spd_tier),
          item_name: shortString.decodeShortString(playerStats.spd_item_name),
        },
        inv: {
          base_tier: Number(playerStats.base_inv_tier),
          current_tier: Number(playerStats.current_inv_tier),
          item_name: shortString.decodeShortString(playerStats.inv_item_name),
        },
      });
    };

    if (account) {
      getStuff();
    }
  }, [account, call, gameId]);

  return { playerStats, playerEntity };
};
