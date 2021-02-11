import React from 'react';
import cn from 'classnames'
type Props = {
    children?: any
    noTheme?: boolean
    className?: string
}
const Popup = (props: Props) => {
    const themeClasses = "z-popup"
    return (
        <div className={cn(props.className, { [themeClasses]: !props.noTheme })}>
            {props.children}
        </div>
    );
};

export default Popup;