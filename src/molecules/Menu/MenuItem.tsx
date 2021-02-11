import React from 'react';
import cn from 'classnames'
type Props = {
    children?: any,
    active?: boolean
    className?: string
    activeClassName?: string
    inactiveClassName?: string
    childActiveClassName?: string
    childInactiveClassName?: string
    onClick?: any
}

const MenuItem = (props: Props) => {
    const { children, active, className, activeClassName, inactiveClassName, childActiveClassName, childInactiveClassName } = props
    let classes = cn(className, { [activeClassName]: active, [inactiveClassName]: !active })
    let childClasses = cn({ [childActiveClassName]: active, [childInactiveClassName]: !active })


    return <li onClick={props.onClick} className={classes}>
        {React.cloneElement(children, { className: cn(childClasses, children.props.className) })}
    </li>
};

export default MenuItem;