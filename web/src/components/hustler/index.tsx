import { IconProps } from "@chakra-ui/react";
import { Rabbit } from "./Rabbit";
import { Dragon } from "./Dragon";
import { Monkey } from "./Monkey";
import { DragonThumbnail } from "./DragonThumbnail";
import { DragonThumbnailSelf } from "./DragonThumbnailSelf";
import { MonkeyThumbnail } from "./MonkeyThumbnail";
import { MonkeyThumbnailSelf } from "./MonkeyThumbnailSelf";
import { RabbitThumbnail } from "./RabbitThumbnail";
import { RabbitThumbnailSelf } from "./RabbitThumbnailSelf";
import { Hustler as HustlerType } from "@/dojo/types";

interface HustlerProps {
  hustler: HustlerType;
}

export const Hustler = ({ hustler, ...rest }: HustlerProps & IconProps) => {
  const hustlers = {
    [HustlerType.Dragon]: Dragon,
    [HustlerType.Monkey]: Monkey,
    [HustlerType.Rabbit]: Rabbit,
  };
  const Hustler = hustlers[hustler];

  return <Hustler {...rest} />;
};

interface HustlerThumbnailProps extends HustlerProps {
  self?: boolean;
}

export const HustlerThumbnail = ({ hustler, self, ...rest }: HustlerThumbnailProps & IconProps) => {
  const hustlers = {
    [HustlerType.Dragon]: {
      regular: DragonThumbnail,
      self: DragonThumbnailSelf,
    },
    [HustlerType.Monkey]: {
      regular: MonkeyThumbnail,
      self: MonkeyThumbnailSelf,
    },
    [HustlerType.Rabbit]: {
      regular: RabbitThumbnail,
      self: RabbitThumbnailSelf,
    },
  };
  const Hustler = self ? hustlers[hustler].self : hustlers[hustler].regular;

  return <Hustler {...rest} />;
};
