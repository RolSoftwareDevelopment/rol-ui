import React, { CSSProperties, FunctionComponent } from 'react';
import cn from 'classnames'

type BaseProps = {
    /**
     * Tag html que usara el texto
     */
    variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span",
    /**
     * Como se mostrara el texto (un "<p>" puede verse como un "<h1>")
     */
    variantStyle?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span",
    /**
     * Texto
     */
    text?: string,
    /**
     * Children (se ubica a la derecha del texto de la propiedad "text")
     */
    children?: any
    /**
     * Indica si NO carga el CSS predefinido del Theme
     */
    noTheme?: boolean,
    className?: string,
    /**
     * Estilos css
     */
    style?: CSSProperties
}

type Props = BaseProps

const getStyle = (variant) => {
    let classes
    switch (variant) {
        case "h1":
            classes = "font-h1 font-h1w tracking-h1 text-h1"
            break;
        case "h2":
            classes = "font-h2 font-h2w tracking-h2 text-h2"
            break;
        case "h3":
            classes = "font-h3 font-h3w tracking-h3 text-h3"
            break;
        case "h4":
            classes = "font-h4 font-h4w tracking-h4 text-h4"
            break;
        case "h5":
            classes = "font-h5 font-h5w tracking-h5 text-h5"
            break;
        case "h6":
            classes = "font-h6 font-h6w tracking-h6 text-h6"
            break;
        case "span":
            classes = "font-span font-spanw tracking-span text-span"
            break;
        default:
            classes = "font-p font-pw tracking-p text-p"
            break;
    }
    return classes
}

/**
 * Texto que utiliza el Theme actual
 */
export const Text = (props: Props) => {
    const { variant, variantStyle, children, text, noTheme, ...textProps } = props

    let className = ""
    if (!noTheme) {
        if (variantStyle) {
            className = getStyle(variantStyle)
        } else {
            className = getStyle(variant)
        }
    }

    let classes = cn(className, "p-0 m-0", props.className)


    let elem
    switch (variant) {
        case "h1":
            elem = <h1 {...textProps} className={classes} > {text} {children}</h1>
            break;
        case "h2":
            elem = <h2 {...textProps} className={classes} > {text} {children}</h2>
            break;
        case "h3":
            elem = <h3 {...textProps} className={classes} > {text} {children}</h3>
            break;
        case "h4":
            elem = <h4 {...textProps} className={classes} > {text} {children}</h4>
            break;
        case "h5":
            elem = <h5 {...textProps} className={classes} > {text} {children}</h5>
            break;
        case "h6":
            elem = <h6 {...textProps} className={classes} > {text} {children}</h6>
            break;
        case "span":
            elem = <span {...textProps} className={classes} > {text} {children}</span>
            break;
        default:
            elem = <p {...textProps} className={classes} > {text} {children}</p>
            break;
    }

    return elem
};

export default Text;
export type TextComponent = FunctionComponent<Props>
export type TextProps = Props