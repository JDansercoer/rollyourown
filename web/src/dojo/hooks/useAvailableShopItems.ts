import { useState, useEffect } from "react";
import { useDojoContext } from "./useDojoContext";
import { ItemTextEnum, ShopItemInfo } from "../types";
import { shortString } from "starknet";

export const useAvailableShopItems = (gameId: string) => {
  const {
    account,
    setup: {
      network: { provider, call },
    },
  } = useDojoContext();

  const [availableShopItems, setAvailableShopItems] = useState<ShopItemInfo[]>([]);

  useEffect(() => {
    const update = async () => {
      try {
        const items = (await call(account!, "shop", "available_items", [Number(gameId), account!.address])) as any[];
        console.log(items);

        const shopItems = items.map((i) => {
          return {
            impacting_stat: i.impacting_stat.activeVariant(),
            name: shortString.decodeShortString(i.name),
            upgrade_cost: Number(i.upgrade_cost),
            slot: i.slot.activeVariant(),
            upgrade_name: shortString.decodeShortString(i.upgrade_name),
          } as ShopItemInfo;
        });

        setAvailableShopItems(shopItems);
      } catch (e) {
        console.log(e);
        // shop is closed
        setAvailableShopItems([]);
      }
    };

    if (gameId) {
      update();
    }
  }, [gameId, account, call]);

  return { availableShopItems };
};
