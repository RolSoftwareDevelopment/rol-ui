import React from 'react';
import Icon, { IconProps } from './Icon'
const ChevronLeftIcon = (props: IconProps) => {
    return (
        <Icon {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </Icon>
    );
};

export default ChevronLeftIcon;