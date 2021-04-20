import React from "react";
import Icon, { IconProps } from "./Icon";
const PlusIcon = (props: IconProps) => {
  return (
    <Icon {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
      />
    </Icon>
  );
};

export default PlusIcon;
