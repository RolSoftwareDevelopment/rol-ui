
import React from 'react';
import Icon, { IconProps } from './Icon'
const MenuIcon = (props: IconProps) => {
    return (
        <Icon {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </Icon>
    );
};

export default MenuIcon;