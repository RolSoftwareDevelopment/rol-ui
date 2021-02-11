import React from 'react';

type FooterComponents = {
    SectionList: any,
    Bottom: any
}

type Items = {
    text?: string,
    icon?: string,
    href?: string
}

type SectionProps = {
    items?: Items[],
    title?: string
}

type BaseProps = {
    sections: SectionProps[],
    bottomSection?: SectionProps[],
    className?: string,
    styles?: {
        footer: string
    }
}
type Props = BaseProps & {
    render: {
        renderLayout: ({ components }: { components: FooterComponents }) => any,
        renderItemList: ({ items, title }: { items: Items[], title: String }) => any,
        renderBottomList: ({ items, title }: { items: Items[], title: String }) => any
    }
}


export const AFooter = (props: Props) => {

    const { sections, bottomSection, render, className, styles } = props


    const SectionList = sections.map(sect => {
        return render.renderItemList({ items: sect.items, title: sect.title })
    })


    const Bottom = bottomSection.map(valBottom => {
        return render.renderBottomList({ items: valBottom.items, title: valBottom.title })
    })
    // const SectionList = render.renderSectionList({ ItemList })
    // const Bottom = bottomText ? <Text text={bottomText} variant="p" /> : null

    const FooterLayout = render.renderLayout({ components: { SectionList, Bottom } })

    let classes = className
    classes += styles ? + ' ' + styles.footer : ''
    return <footer className={classes}> {FooterLayout}</footer>
}

export default AFooter;
export type FooterProps = BaseProps & {
    render?: {
        renderLayout?: ({ components }: { components: FooterComponents }) => any,
        renderItemList?: ({ items, title }: { items: Items[], title: String }) => any,
        renderBottomList?: ({ items, title }: { items: Items[], title: String }) => any
    }
}