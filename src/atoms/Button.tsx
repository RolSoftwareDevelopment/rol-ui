import React, { ButtonHTMLAttributes, CSSProperties, FC } from "react";
import cn from "classnames";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Tamaño del boton
   */
  size?:
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "container"
    | "container-width"
    | "container-height"
    | "fit";
  /**
   * Estilos
   */
  children?: React.ReactNode;
  className?: string;
  noTheme?: boolean;
  name?: string;
}

export const Button: FC<ButtonProps> = (props) => {
  const { size, noTheme, ...rest } = props;
  let btnStyle: string;

  switch (size) {
    case "sm":
      btnStyle = "py-0 px-0.5";
      break;
    case "md":
      btnStyle = "py-0.5 px-1";
      break;
    case "lg":
      btnStyle = "py-1 px-2";
      break;
    case "xl":
      btnStyle = "py-2 px-4";
      break;
    case "2xl":
      btnStyle = "py-4 px-8";
      break;
    case "container":
      btnStyle = "w-full h-full";
      break;
    case "container-width":
      btnStyle = "w-full";
      break;
    case "container-height":
      btnStyle = "h-full";
      break;
  }

  const themeClasses = "font-button font-buttonw tracking-button text-button";

  return (
    <button
      {...rest}
      className={cn(btnStyle, "cursor-pointer", props.className, {
        [themeClasses]: !noTheme,
      })}
    >
      {props.children}
    </button>
  );
};

export default Button;
