import React, { ButtonHTMLAttributes, CSSProperties, HTMLAttributes } from 'react';
import cn from 'classnames'

type Props = {
    /**
     * Tamaño del boton
     */
    size?: "sm" | "md" | "lg" | "xl" | "2xl" | "container" | "container-width" | "container-height" | "fit",
    /**
     * Estilos
     */
    style?: CSSProperties,
    children?: React.ReactNode,
    /**
     * Accion luego de un click
     */
    onClick?: (e) => any
    onFocus?: (e) => any
    onBlur?: (e) => any
    className?: string
    noTheme?: boolean
    buttonProps?: ButtonHTMLAttributes<HTMLButtonElement>
    name?: string

}


export const Button = (props: Props) => {
    const { size, noTheme, buttonProps, ...customButtonProps } = props
    let btnStyle: string

    switch (size) {
        case ("sm"):
            btnStyle = "py-0 px-0.5"
            break;
        case ("md"):
            btnStyle = "py-0.5 px-1"
            break;
        case ("lg"):
            btnStyle = "py-1 px-2"
            break;
        case ("xl"):
            btnStyle = "py-2 px-4"
            break;
        case ("2xl"):
            btnStyle = "py-4 px-8"
            break;
        case ("container"):
            btnStyle = "w-full h-full"
            break;
        case ("container-width"):
            btnStyle = "w-full"
            break;
        case ("container-height"):
            btnStyle = "h-full"
            break;
    }

    const themeClasses = "font-button font-buttonw tracking-button text-button"

    return (
        <button {...buttonProps} {...customButtonProps} className={cn(btnStyle, "cursor-pointer", props.className, { [themeClasses]: !noTheme })}  >
            {props.children}
        </button>
    );
};

export default Button;

export interface ButtonProps extends Props { }