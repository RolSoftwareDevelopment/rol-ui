import React from 'react';
import Icon, { IconProps } from './Icon'
const ChevronLeftIcon = (props: IconProps) => {
    return (
        <Icon {...props}>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </Icon>
    );
};

export default ChevronLeftIcon;