import { Text, Box, MenuItem } from "@chakra-ui/react";
import Button from "@/components/Button";
import { useDojoContext } from "@/dojo/hooks/useDojoContext";
import { headerButtonStyles } from "@/theme/styles";
import { useRouter } from "next/router";
import { HustlerThumbnail } from "./hustler";

export const ProfileLink = () => {
  const router = useRouter();
  const gameId = router.query.gameId as string;

  const { account, playerEntityStore } = useDojoContext();
  const { playerEntity } = playerEntityStore;

  const onClick = () => {
    if (router.pathname === "/[gameId]/logs") {
      router.back();
    } else {
      router.push(`/${gameId}/logs`);
    }
  };

  if (!account || !playerEntity) return null;

  return (
    <>
      <Button as={Box} cursor="pointer" h={["40px", "48px"]} {...headerButtonStyles} onClick={onClick}>
        <HustlerThumbnail hustler={playerEntity.hustler} />
      </Button>
    </>
  );
};

export const ProfileLinkMobile = () => {
  const router = useRouter();
  const gameId = router.query.gameId as string;

  const { account, playerEntityStore } = useDojoContext();
  const { playerEntity } = playerEntityStore;

  const onClick = () => {
    if (router.pathname === "/[gameId]/logs") {
      router.back();
    } else {
      router.push(`/${gameId}/logs`);
    }
  };

  if (!account || !playerEntity) return null;

  return (
    <>
      <MenuItem h="48px" borderRadius={0} onClick={onClick}>
        <HustlerThumbnail hustler={playerEntity.hustler} />
        <Text ml="10px">{playerEntity.name}</Text>
      </MenuItem>
    </>
  );
};
