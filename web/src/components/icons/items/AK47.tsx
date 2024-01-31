import { Icon as ChakraIcon } from "@chakra-ui/react";
import { IconProps } from "..";

export const AK47 = ({ ...props }: IconProps) => {
  return (
    <ChakraIcon viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.625 2.5h2.25v2.25H19.75V3.625h-1.125V2.5Z" />
      <path
        d="M18.625 4.75V3.625H17.5V4.75h-1.125v1.125H15.25V4.75h-1.125V3.625H13V4.75h1.125V7H13v1.125h-1.125V9.25H10.75v1.125H9.625V11.5H8.5v1.125H7.375v1.125H6.25v1.125H5.125V16H4v2.25h1.125v1.125H6.25V20.5h1.125v-1.125H8.5v-2.25h1.125V16h1.125v1.125h1.125v1.125H13v-1.125h1.125V16H13v-1.125h1.125V13.75h4.5V11.5H15.25v-1.125h1.125V9.25H17.5V7h1.125V5.875h1.125V4.75h-1.125ZM17.5 5.875V4.75h1.125v1.125H17.5Zm0 0V7h-1.125V5.875H17.5Zm-3.375 7.875v-1.125H13v1.125h1.125Zm-7.875 4.5H5.125v-1.125H6.25v1.125Zm0 0h1.125v1.125H6.25V18.25Z"
        clipRule="evenodd"
      />
    </ChakraIcon>
  );
};
