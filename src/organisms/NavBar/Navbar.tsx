import React, { CSSProperties, useEffect, useState } from 'react';
import cs from 'classnames'
type LayoutInfo = {
    components: {
        navGroup: NavGroup
    },
    props: Props
}

type NavGroup = any

interface Props {
    activeNavGroup?: number,
    navGroups: NavGroup[],
    className?: string,
    styles?: {
        navBar?: string
        primary?: string
        secondary?: string
        extra?: string
    }
    style?: CSSProperties
    defaultActive?: number
    layout?: {
        navBar?: string
        navGroup?: string
        children?: string
    },
    position?: "fixed" | "absolute" | "sticky" | "relative" | "static"
    children?: React.ReactNode
    render?: { renderLayout?: (info: LayoutInfo) => JSX.Element }
    onScroll?: () => any
    onScrollDown?: () => any
    onScrollUp?: () => any
    debounce?: number
}

export const Navbar = (props: Props) => {

    const [prevScrollpos, setPrevScrollpos] = useState(0)

    const onScroll = () => {
        props.onScroll && props.onScroll()
    }
    const onScrollDown = () => {
        props.onScrollDown && props.onScrollDown()
    }
    const onScrollUp = () => {
        props.onScrollUp && props.onScrollUp()
    }

    const handleScroll = () => {
        const currentPos = window.pageYOffset
        const up = prevScrollpos >= currentPos;
        const down = prevScrollpos < currentPos;
        down && onScrollDown()
        up && onScrollUp()
        onScroll()
        setPrevScrollpos(currentPos)
    }


    useEffect(() => {
        document.addEventListener('scroll', handleScroll);
        return () => document.removeEventListener('scroll', handleScroll);
    }, [prevScrollpos, handleScroll]);


    const { activeNavGroup, navGroups, style, layout, position } = props

    let navBarLayout, childrenLayout, navGroupLayout
    if (layout) {
        navBarLayout = layout.navBar
        navGroupLayout = layout.navGroup
        childrenLayout = layout.children
    }

    let navGroup = navGroups.find((ng, i) => i === activeNavGroup)
    if (!navGroup) {
        navGroup = navGroups[0]
    }

    let classes = cs("z-navbar", { sticky: !position, [position]: position }, navBarLayout, props.className)

    let finalNavGroup
    if (React.isValidElement(navGroup)) {
        //@ts-ignore
        finalNavGroup = React.cloneElement(navGroup, { className: cs(navBarLayout, navGroup.props.className) })
    } else {
        finalNavGroup = navGroup
    }


    return <nav style={style} className={classes} >
        {finalNavGroup}
        <div className={layout ? cs(layout.children) : ''}>
            {props.children}
        </div>
    </nav >

};




export default Navbar;
export type NavbarProps = Props