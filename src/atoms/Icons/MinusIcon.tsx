import React from "react";
import Icon, { IconProps } from "./Icon";
const MinusIcon = (props: IconProps) => {
  return (
    <Icon {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M20 12H4"
      />
    </Icon>
  );
};

export default MinusIcon;
