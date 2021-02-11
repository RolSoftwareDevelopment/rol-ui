import React, { ReactNode } from 'react';
import classNames from 'classnames'

type TitleInfo = {
    data: {
        text: string| JSX.Element
    },
    props: Props
}

type SubtitleInfo = {
    data: {
        text: string| JSX.Element
    },
    props: Props
}

type ImgInfo = {
    data: {
        img?: {
            src: string
        }
        imgLayout?: string
    },
    props: Props
}

type HyperlinkInfo = {
    data: {
        href: string
    },
    components: {
        children: ReactNode
    }
    props: Props
}


type BaseProps = {
    /**
     * Titulo
     */
    title?: string | JSX.Element
    /**
     * Subtitulo
     */
    subtitle?: string | JSX.Element
    /**
     * Imagen
     */
    img?: JSX.Element
    /**
     * True to show the action component
     */
    hideAction?: boolean
    /**
     * Action component
     */
    action?: any
    /**
     * Conjunto de classNames para el Layout del CardHeader
     */
    layout?: {
        /**
         * ClassName del contenedor
         */
        cardHeader?: string
        title?: string
        subtitle?: string
        img?: string
        action?: string
    }
    /**
     * ClassName (Evitar pasar el layout por aca)
     */
    className?: string
}

type Props = BaseProps & {
    /**
     * Componentes que necesita renderizar el Card Header
     */
    render: {
        renderTitle: (info: TitleInfo) => JSX.Element,
        renderSubtitle: (info: SubtitleInfo) => JSX.Element,
        // renderImg: (info: ImgInfo) => JSX.Element,
        renderHyperlink: (info: HyperlinkInfo) => JSX.Element
    }
}

export const ACardHeader = (props: Props) => {

    const { hideAction, action, layout, render, className, title, subtitle, img } = props

    let cardHeaderLayout, titleLayout, subtitleLayout, imgLayout, actionLayout
    if (layout) {
        cardHeaderLayout = layout.cardHeader
        titleLayout = layout.title
        subtitleLayout = layout.subtitle
        imgLayout = layout.img
        actionLayout = layout.action
    }

    let Title = render.renderTitle({ data: { text: props.title }, props })
    // if (titleHref) Title = render.renderHyperlink({ data: { href: titleHref }, components: { children: Title }, props })

    let Subtitle = render.renderSubtitle({ data: { text: props.subtitle }, props })
    // if (subtitleHref) Subtitle = render.renderHyperlink({ data: { href: subtitleHref }, components: { children: Subtitle }, props })

    let Img = img
    // let Img = render.renderImg({ data: { img, imgLayout }, props })
    // if (imgHref) Img = render.renderHyperlink({ data: { href: imgHref }, components: { children: Img }, props })

    let Action = action



    const cardHeader = <div className={classNames(cardHeaderLayout, className)}>
        {title && React.cloneElement(Title, { className: classNames(Title.props.className, titleLayout) })}
        {subtitle && React.cloneElement(Subtitle, { className: classNames(Subtitle.props.className, subtitleLayout) })}
        {img && React.cloneElement(Img, { className: classNames(Img.props.className, imgLayout) })}
        {!hideAction && action && React.cloneElement(Action, { className: classNames(Action.props.className, actionLayout) })}
    </div>

    return cardHeader
};

export default ACardHeader;
export type ACardHeaderProps = Props
export type CardHeaderProps = BaseProps & {
    render?: {
        renderTitle?: (info: TitleInfo) => JSX.Element,
        renderSubtitle?: (info: SubtitleInfo) => JSX.Element,
        renderImg?: (info: ImgInfo) => JSX.Element,
        renedrHyperlink?: (info: HyperlinkInfo) => JSX.Element
    }
}