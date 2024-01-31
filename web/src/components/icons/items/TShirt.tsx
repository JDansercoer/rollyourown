import { Icon as ChakraIcon } from "@chakra-ui/react";
import { IconProps } from "..";

export const TShirt = ({ ...props }: IconProps) => {
  return (
    <ChakraIcon viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path
        fillRule="evenodd"
        d="M8.435 4.5v.74H6.957v.738H5.478v.74H4v1.478h.74v1.478h.738v.739h.74v.74h1.478v2.956h.739v2.956h.739v.74h.739v.739h4.435v-.74h2.217v-.739h.74v-5.913h1.478v-.739h.739v-.74h.739V8.197H21V6.717h-1.478v-.739h-1.478V5.24h-1.479V4.5h-2.217v1.478h-.74v.74h-2.217v-.74h-.739V4.5H8.435Zm11.087 3.696v1.478h-.74V8.196h.74Zm0 0h.739v-.74h-.74v.74Zm-.74 1.478v.739h-.738v-.74h.739Zm-12.565 0h-.739V8.196h.74v1.478Zm0 0v.739h.74v-.74h-.74Zm-.739-1.478H4.74v-.74h.74v.74Zm9.609-2.957h.74v1.478h-.74V5.24Zm-.74 2.218v-.74h.74v.74h-.74Zm-3.695 0h3.696v.739h-3.696v-.74Zm-.739-.74h.74v.74h-.74v-.74Zm0 0V5.24h-.74v1.478h.74Z"
        clipRule="evenodd"
      />
    </ChakraIcon>
  );
};
