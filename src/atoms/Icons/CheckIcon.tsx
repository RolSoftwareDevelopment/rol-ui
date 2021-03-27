import React from 'react';
import Icon, { IconProps } from './Icon'
const CheckIcon = (props: IconProps) => {
    return (
        <Icon {...props}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </Icon>
    );
};

export default CheckIcon;