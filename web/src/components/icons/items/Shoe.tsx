import { Icon as ChakraIcon } from "@chakra-ui/react";
import { IconProps } from "..";

export const Shoe = ({ ...props }: IconProps) => {
  return (
    <ChakraIcon viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path
        fillRule="evenodd"
        d="M8.932 5.845H7.689v1.23H6.46v2.46H5.23v2.459H4v2.472h2.46v1.23h2.46v1.23h2.459v1.23h6.161v-1.23H20v-2.472h-1.23v-1.23h-2.46v-1.23h-1.23v-1.23h-1.23v-1.23h-1.229v-1.23h-2.46v-1.23h-1.23v-1.23Zm2.46 3.702v1.217h1.217V9.547H11.39Zm2.447 2.447H12.62v-1.218h1.217v1.218Zm1.23 1.23H13.85v-1.218h1.217v1.218Zm.012 1.23h1.217v-1.218h-1.217v1.217Z"
        clipRule="evenodd"
      />
    </ChakraIcon>
  );
};
