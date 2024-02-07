import { Icon as ChakraIcon } from "@chakra-ui/react";
import { IconProps } from "..";

export const DuffelBag = ({ ...props }: IconProps) => {
  return (
    <ChakraIcon viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12.116 4v.888h.888v.898h-.897v-.889H7.674v.889h-.888v.888h-.889v3.545h.889v.897h-.898v-.888H5V5.777h.888v-.889h.889V4h5.339Z" />
      <path
        fillRule="evenodd"
        d="M13.883 5.777h2.674v.888h.889v.889h.888v.888h.888v3.562h-.888v.889h-.888v.888h-.889v.889h-.888v.888h-.888v.888h-.889v.889h-.888v.888h-.888v.889h-.889V20h-4.45v-.888h-.889v-.889H5v-4.45h.888v-.889h.889v-.888h.888v-.889h.888v-.888h1.777V9.33h.888v-.888h.889v-.888h.888v-.889h.888v-.888Zm-2.656 9.772h.88v-1.768h-.88v1.768Zm-.888-1.777h.88v-1.768h-.88v1.768Zm2.656 3.554h-.88v-1.768h.88v1.768Zm-2.665-5.33H8.562v-.88h1.768v.88Zm4.442 0v-.88h-.88v.88h.88Zm.009-.889h.879v-.88h-.88v.88Z"
        clipRule="evenodd"
      />
    </ChakraIcon>
  );
};
