import { Icon as ChakraIcon } from "@chakra-ui/react";
import { IconProps } from "..";

export const FannyPack = ({ ...props }: IconProps) => {
  return (
    <ChakraIcon viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path
        fill="#11ED83"
        fillRule="evenodd"
        d="M14.395 5.6H18.4v.799h.8v.8H20v2.406h-.8v2.399h-.8v3.198h-.799v1.6h-.8v.8h-1.599v.799h-3.206v-.8h-1.6v-.8H8.799v-.799h-.8v-.8h-.8v-.8H5.6v-.799h-.8v-.8H4V9.598h.8v-.8h.8v-.799h1.598v-.8h3.199v-.8h3.998V5.6Zm-8.788 5.596h-.8v-.791h.8v-.8h1.6v-.8h3.198v-.799h3.998v-.8h3.99v.792h-.8v.8h-1.599v.8h-2.399v.799H7.998v.8h-1.6v.799h-.79v-.8Zm11.187.8h-1.592v-.792h1.592v.792Zm-1.6.008v.792h-3.998v.8h-.791v-.8h-.8v-.792h5.59Z"
        clipRule="evenodd"
      />
    </ChakraIcon>
  );
};
