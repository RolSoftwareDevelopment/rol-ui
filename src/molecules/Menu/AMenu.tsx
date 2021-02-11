import React, { useEffect, useState } from 'react';
import classNames from 'classnames'

type RenderList = (info: ListInfo) => JSX.Element

type ListInfo = {
    components: {
        children: any
    }
    props: Props
}
type AProps = {
    render: {
        renderList: RenderList
    }
}

type BaseProps = {
    defaultActive?: number,
    children?: any
    layout?: {
        menu?: string
    }
    className?: string
    onMenuItemClick?: (e: any, i: number) => void
}

type Props = BaseProps & AProps
const Menu = (props: Props) => {
    const [active, setActive] = useState(props.defaultActive ? props.defaultActive : 0)
    const { render, layout } = props

    let menuLayout
    if (layout) menuLayout = layout.menu

    const onMenuItemClick = (e, i) => {
        setActive(i)
        props.onMenuItemClick && props.onMenuItemClick(e, i)
    }

    const children =
        props.children
            ? props.children.length
                ? props.children.map((child, i) => React.cloneElement(child, { active: i === active, key: i, onClick: (e) => onMenuItemClick(e, i) }))
                : React.cloneElement(props.children, { active: 0 === active })
            : null
    const List = render.renderList({ props, components: { children } })

    return React.cloneElement(List, { className: classNames(menuLayout, props.className) })

};

export default Menu;
export type MenuProps = BaseProps & {
    render?: {
        renderList?: RenderList
    }
}
export type AMenuProps = Props 