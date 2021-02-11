import React from 'react';
import cn from 'classnames'


export type LinkProps = React.HTMLAttributes<HTMLAnchorElement> & {
    href?: string,
    isActive?: boolean,
    activeClassName?: string,
    inactiveClassName?: string
    activeChildClassName?: string,
    inactiveChildClassName?: string,
}

export const Link = (props: LinkProps) => {
    const { isActive, activeClassName, activeChildClassName, inactiveChildClassName, inactiveClassName, ...otherProps } = props
    let children
    if (activeChildClassName || inactiveClassName) {
        children = React.Children.map(props.children, child => {
            if (React.isValidElement(child)) return React.cloneElement(child, { className: cn({ [activeChildClassName]: isActive, [inactiveChildClassName]: !isActive }) })
            else return child
        })
    } else children = props.children

    return (
        <a {...otherProps} className={cn("cursor-pointer", props.className, { [activeClassName]: isActive, [inactiveClassName]: !isActive })}>
            {children}
        </a>
    );
};

export default Link;