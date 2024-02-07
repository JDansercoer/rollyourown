import { Footer } from "@/components/Footer";
import Layout from "@/components/Layout";
import { Heading, Text, VStack, HStack, Grid } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Button from "@/components/Button";
import { Hustler } from "@/components/hustler";
import { Arrow } from "@/components/icons";
import { PowerMeter } from "@/components/PowerMeter";
import React, { useEffect, useState } from "react";
import { GameMode, Hustler as HustlerType } from "@/dojo/types";
import { useSystems } from "@/dojo/hooks/useSystems";
import { useDojoContext } from "@/dojo/hooks/useDojoContext";
import { validateAndParseAddress } from "starknet";
import { shortString } from "starknet";

export default function HustlerPage() {
  const router = useRouter();
  const name = router.query.name as string;
  const [error, setError] = useState("");
  const [availableHustlers, setAvailableHustlers] = useState<any[]>([]);
  const [selectedHustlerIndex, setSelectedHustlerIndex] = useState(0);

  const {
    account,
    burner: { create: createBurner, isDeploying: isBurnerDeploying },

    setup: {
      network: { call },
    },
  } = useDojoContext();
  const { createGame, isPending } = useSystems();

  useEffect(() => {
    const getStuff = async () => {
      const hustlers = (await call(account!, "hustler", "get_available_hustlers", [])) as any[];

      setAvailableHustlers(hustlers);
    };

    if (account) {
      getStuff();
    }
  }, [account]);

  const start = async (gameMode: GameMode) => {
    let address: bigint;
    const avatarId = 0;

    setError("");
    if (name === "" || name.length > 20 || name.length < 3) {
      setError("Invalid name, at least 3 chars, max 20!");
      return;
    }

    try {
      let value = validateAndParseAddress("");
      address = BigInt(value);
      setError("");
    } catch (e) {
      setError("Invalid address !");
      return;
    }

    try {
      if (!account) {
        // create burner account
        await createBurner();
      }

      const selectedHustler = availableHustlers[selectedHustlerIndex];

      const selectedHustlerName: string = selectedHustler.hustler.activeVariant();

      const { gameId } = await createGame(
        gameMode,
        name,
        HustlerType[selectedHustlerName as keyof typeof HustlerType],
        avatarId,
        address,
      );

      router.push(`/${gameId}/travel`);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Layout
        isSinglePanel
        footer={
          <Footer>
            {error && (
              <Text w="full" align="center" color="red">
                {error}
              </Text>
            )}
            <Button
              w={["full", "auto"]}
              px={["auto", "60px"]}
              onClick={() => {
                start(GameMode.Unlimited);
              }}
              isLoading={isPending}
            >
              Play
            </Button>
          </Footer>
        }
      >
        <VStack>
          <Text textStyle="subheading" fontSize={["10px", "11px"]} letterSpacing="0.25em">
            Choose your
          </Text>
          <Heading fontSize={["36px", "48px"]} fontWeight="400" textAlign="center">
            Hustler...
          </Heading>
          {(() => {
            if (availableHustlers.length === 0) {
              return (
                <Text fontSize="14px" textAlign="center">
                  Loading...
                </Text>
              );
            }

            const stats = [
              {
                name: "attack",
                stat: "ATK",
                slot: "weapon",
              },
              {
                name: "defense",
                stat: "DEF",
                slot: "shirt",
              },
              {
                name: "speed",
                stat: "SPD",
                slot: "shoes",
              },
              {
                name: "transport",
                stat: "INV",
                slot: "bag",
              },
            ];

            const selectedHustler = availableHustlers[selectedHustlerIndex];

            const selectedHustlerName: string = selectedHustler.hustler.activeVariant();

            return (
              <Grid
                templateColumns={["1fr max-content 1fr", "1fr max-content max-content 1fr"]}
                templateAreas={[
                  `"left hustler right"
                    "stats stats stats"`,
                  "unset",
                ]}
                gap={12}
                alignItems="center"
              >
                <Arrow
                  direction="left"
                  cursor="pointer"
                  style="outline"
                  boxSize={10}
                  onClick={() => {
                    setSelectedHustlerIndex((selectedHustlerIndex - 1) % availableHustlers.length);
                  }}
                  justifySelf="end"
                />
                <Hustler hustler={HustlerType[selectedHustlerName as keyof typeof HustlerType]} w={100} h={270} />
                <Grid
                  gridTemplateColumns="165px max-content"
                  columnGap={8}
                  rowGap={4}
                  alignItems="center"
                  gridArea={["stats", "unset"]}
                >
                  {stats.map((singleStat) => {
                    const { name, stat, slot } = singleStat;

                    const itemName = shortString.decodeShortString(selectedHustler.items[`${name}Item`]);
                    const initialTier = selectedHustler.initialTiers[`${name}Tier`].activeVariant();
                    const initialPower = parseInt(initialTier.match(/[+-]?\d+/));

                    return (
                      <React.Fragment key={name}>
                        <VStack spacing="px" alignItems="flex-start">
                          <Text fontFamily="broken-console" fontSize="10px" color="neon.500" lineHeight={1}>
                            {slot}
                          </Text>
                          <Text fontSize="14px" lineHeight={1}>
                            {itemName}
                          </Text>
                        </VStack>
                        <PowerMeter text={stat} basePower={initialPower} maxPower={6} />
                      </React.Fragment>
                    );
                  })}
                </Grid>
                <Arrow
                  direction="right"
                  cursor="pointer"
                  style="outline"
                  boxSize={10}
                  onClick={() => {
                    setSelectedHustlerIndex((selectedHustlerIndex + 1) % availableHustlers.length);
                  }}
                />
              </Grid>
            );
          })()}
        </VStack>
      </Layout>
    </>
  );
}
