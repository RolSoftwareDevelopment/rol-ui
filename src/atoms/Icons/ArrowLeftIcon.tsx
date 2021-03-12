



import React from 'react';
import Icon, { IconProps } from './Icon'
const ArrowLeftIcon = (props: IconProps) => {
    return (
        <Icon {...props}>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </Icon>
    );
};

export default ArrowLeftIcon;