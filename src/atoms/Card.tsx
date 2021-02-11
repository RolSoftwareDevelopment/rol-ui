import React from 'react';
import classNames from 'classnames'
type ElementProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>

type DivProps =
    {
        /**
         * Tag html que tendra el contenedor de la Card
         */
        variant?: "div" | null | undefined
    } & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

type SectionProps =
    {
        /**
        * Tag html que tendra el contenedor de la Card
        */
        variant?: "section"
    } &
    ElementProps
type ArticleProps =
    {
        /**
        * Tag html que tendra el contenedor de la Card
        */
        variant?: "article"
    } &
    ElementProps

type Props = DivProps | SectionProps | ArticleProps


export const Card: React.FC<Props> = (props: Props) => {

    let Element = <div></div>
    switch (props.variant) {
        case ("article"):
            Element = <article></article>
            break;
        case ("section"):
            Element = <section></section>
            break;
        case ("div"):
            Element = <div></div>
            break;
    }

    const { variant, ...elementProps } = props
    return React.cloneElement(Element, {
        ...elementProps,
        className: classNames(elementProps.className)
    })
};

export default Card;
export type CardProps = Props