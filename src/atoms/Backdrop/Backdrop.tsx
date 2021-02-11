import React, { useState } from 'react';
import cn from 'classnames'
type Props = {
    show?: boolean
    children?: any
    noTheme?: boolean
}
const Backdrop = (props: Props) => {

    return (
        <div className={cn({ "hidden": !props.show, "z-backdrop": !props.noTheme })}>
            {props.children}
        </div>
    );
};

export default Backdrop;