import { Divider, HStack, StyleProps, Text, VStack, Card } from "@chakra-ui/react";

import React from "react";
import { useDojoContext } from "@/dojo/hooks/useDojoContext";
import { getDrugById } from "@/dojo/helpers";
import { Bag, Home } from "./icons";
import { useRouter } from "next/router";
import Link from "next/link";

export const Inventory = ({ ...props }: StyleProps) => {
  const router = useRouter();
  const { gameId } = router.query as { gameId: string };
  const { playerEntityStore } = useDojoContext();
  const { playerEntity } = playerEntityStore;

  return (
    <VStack {...props} w="full" align="flex-start" pb="0" gap={[0, "6px"]}>
      <HStack w="full" justify={"space-between"}>
        <Text textStyle="subheading" pt={["0px", "20px"]} fontSize="11px" color="neon.500">
          Inventory
        </Text>

        <HStack color={playerEntity?.drugCount === 0 ? "neon.500" : "yellow.400"} justify="center">
          <Bag />
          <Text>
            {playerEntity?.drugCount}/{playerEntity?.transport}
          </Text>
        </HStack>
      </HStack>

      <HStack alignSelf="stretch" gap={4}>
        {playerEntity?.canUseShop ? (
          <Link href={`/${gameId}/pawnshop`}>
            <Card
              h="40px"
              w="120px"
              alignItems="center"
              flexDir="row"
              gap={2}
              bg="neon.800"
              justifyContent="center"
              color="neon.200"
            >
              <Home />
              <Text>Open</Text>
            </Card>
          </Link>
        ) : (
          <Card h="40px" w="120px" alignItems="center" flexDir="row" gap={2} justifyContent="center" color="neon.500">
            <Home />
            <Text>Closed</Text>
          </Card>
        )}
        <Card h="40px" px="20px" justify="center" flexGrow={1}>
          <HStack gap="10px" justify="center">
            {playerEntity?.drugCount === 0 ? (
              <Text color="neon.500">Your bag is empty</Text>
            ) : (
              playerEntity?.drugs.map((drug, key) => {
                return (
                  drug.quantity > 0 && (
                    <>
                      <HStack gap="10px" key={`item-${key * 2}`}>
                        <HStack color="yellow.400">
                          {getDrugById(drug.id)?.icon({ boxSize: "26" })}
                          <Text>{drug.quantity}</Text>
                        </HStack>
                      </HStack>
                      <Divider
                        key={`item-${key * 2 + 1}`}
                        _last={{ display: "none" }}
                        h="10px"
                        orientation="vertical"
                        borderWidth="1px"
                        borderColor="neon.600"
                      />
                    </>
                  )
                );
              })
            )}
          </HStack>
        </Card>
      </HStack>
    </VStack>
  );
};
