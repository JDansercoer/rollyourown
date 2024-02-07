import { Icon as ChakraIcon } from "@chakra-ui/react";
import { IconProps } from "..";

export const PlasticBag = ({ ...props }: IconProps) => {
  return (
    <ChakraIcon viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path
        fillRule="evenodd"
        d="M8.286 3.5v.762h-.762v5.333h-.762v2.286H6v3.048h.762v2.285h.762v.762h.762v.762H9.81v.762h4.571v-.762h1.524v-.762h.762v-.762h.762v-1.523h.762v-1.524h.761V11.88h-.762v-1.524h-.761V8.071h-.762V3.5h-1.524v.762h-.762v2.286h-.762v2.285h-.762v.762h-.762v.762h-.762v-.762h-.762V7.31H9.81V3.5H8.286Zm6.095 3.048h.762V5.024h.762v5.333h-.762v-.762h-.762V6.548ZM8.286 5.024h.762v1.524h-.762V5.024Z"
        clipRule="evenodd"
      />
    </ChakraIcon>
  );
};
