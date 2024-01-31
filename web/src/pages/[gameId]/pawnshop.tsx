import { Footer } from "@/components/Footer";
import Layout from "@/components/Layout";
import Button from "@/components/Button";
import { VStack, HStack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { ItemSlot, ShopItemInfo } from "@/dojo/types";
import { useDojoContext } from "@/dojo/hooks/useDojoContext";
import { useSystems } from "@/dojo/hooks/useSystems";
import { playSound, Sounds } from "@/hooks/sound";
import { useToast } from "@/hooks/toast";

import { getLocationById } from "@/dojo/helpers";
import { useAvailableShopItems } from "@/dojo/hooks/useAvailableShopItems";
import { MarketEventData, displayMarketEvents } from "@/dojo/events";
import { getIconForItem } from "@/utils/items";

export default function PawnShop() {
  const router = useRouter();
  const gameId = router.query.gameId as string;

  const { playerEntityStore } = useDojoContext();
  const { buyItem, isPending } = useSystems();
  const { availableShopItems } = useAvailableShopItems(gameId);

  const { playerEntity } = playerEntityStore;

  const [isBuying, setIsBuying] = useState(false);

  const toaster = useToast();

  const [selectedShopItem, setSelectedShopItem] = useState<ShopItemInfo | undefined>(undefined);

  const selectItem = (shopItem: ShopItemInfo) => {
    // do checks
    if (selectedShopItem === shopItem) {
      setSelectedShopItem(undefined);
    } else {
      setSelectedShopItem(shopItem);
    }
  };

  const buy = async () => {
    if (!selectedShopItem) return;

    setIsBuying(true);

    try {
      playSound(Sounds.Trade);
      const itemSlotValue = ItemSlot[selectedShopItem.slot as keyof typeof ItemSlot];
      const { hash, events } = await buyItem(gameId, itemSlotValue);

      toaster.toast({
        message: `${selectedShopItem.name} equiped!`,
        link: `http://amazing_explorer/${hash}`,
      });

      if (events) {
        displayMarketEvents(events as MarketEventData[], toaster);
      }

      router.push(`/${gameId}/travel`);
    } catch (e) {
      console.log(e);
    }

    setIsBuying(false);
  };

  if (!playerEntity) {
    return null;
  }

  return (
    <Layout
      leftPanelProps={{
        prefixTitle: "Welcome to the ...",
        title: "Pawn Shop",
        imageSrc: "/images/pawnshop.png",
      }}
      footer={
        <Footer>
          <Button w="full" px={["auto", "20px"]} onClick={() => router.back()}>
            Back
          </Button>
          <Button
            w="full"
            px={["auto", "20px"]}
            isLoading={isBuying}
            isDisabled={isPending || !selectedShopItem || selectedShopItem.upgrade_cost > playerEntity.cash}
            onClick={buy}
          >
            Buy
          </Button>
        </Footer>
      }
    >
      <VStack w="full" pt={["0px", "20px"]} gap="20px" margin="auto">
        <VStack w="full" alignItems="flex-start" mt="10px">
          <Text textStyle="subheading" fontSize="10px" color="neon.500">
            For sale - choose one
          </Text>
        </VStack>

        <VStack w="full" margin="auto" gap={["10px", "16px"]} fontSize={["16px", "20px"]} pr="8px">
          {availableShopItems &&
            availableShopItems.map((shopItem, index) => {
              const Icon = getIconForItem(shopItem.name);

              return (
                <Button
                  w="full"
                  h="auto"
                  key={index}
                  position="relative"
                  padding="16px"
                  onClick={() => selectItem(shopItem)}
                  variant="selectable"
                  isActive={shopItem === selectedShopItem}
                  isDisabled={isPending || shopItem.upgrade_cost > playerEntity.cash}
                  justifyContent="stretch"
                  p={3}
                >
                  <HStack w="full" gap={4}>
                    <Icon boxSize={10} />
                    <VStack flexGrow={1} alignItems="flex-start" spacing={0}>
                      <Text fontSize="10px" opacity={0.5} fontFamily="broken-console">
                        {shopItem.slot} upgrade
                      </Text>
                      <Text textStyle="heading" fontSize="16px" textTransform="capitalize">
                        {shopItem.name}
                      </Text>
                    </VStack>
                    <VStack alignItems="flex-end" spacing={0}>
                      <Text fontSize="10px" opacity={0.5} fontFamily="broken-console">
                        + {shopItem.impacting_stat}
                      </Text>
                      <Text fontSize="16px">${shopItem.upgrade_cost.toLocaleString()}</Text>
                    </VStack>
                  </HStack>
                </Button>
              );
            })}
        </VStack>
      </VStack>
    </Layout>
  );
}
