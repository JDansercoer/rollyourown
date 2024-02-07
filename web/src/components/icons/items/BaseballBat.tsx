import { Icon as ChakraIcon } from "@chakra-ui/react";
import { IconProps } from "..";

export const BaseballBat = ({ ...props }: IconProps) => {
  return (
    <ChakraIcon viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M16.444 3.5v.889h-.888v.889h-.89v.889h-.888v.889h-.89v.888H12v.89h-.889v.888h-.889V11.5h-.889v.889h-.889v1.778h-.888v.889h-.89v.888h-.888v.89H4v1.777h.889v.889h1.778v-1.778h.889v-.889h.888v-.889h.89v-.888h1.777v-.89H12v-.888h1.778v-.89h.889V11.5h.889v-.889h.888v-.889h.89v-.889h.888v-.889h.89v-.888H20V4.389h-.889V3.5h-2.667Zm-8 11.556h-.888v.888h-.89v.89h-.888v.888h-.89v.89h.89v-.89h.889v-.889h.889v-.889h.888v-.888Zm0 0h.89v-.89h-.89v.89Zm7.112-7.112v-.888h.888v-.89h.89v-.888h-.89v.889h-.888v.889h-.89v.888h.89Z"
        clipRule="evenodd"
      />
    </ChakraIcon>
  );
};
