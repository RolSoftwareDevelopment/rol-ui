import React from 'react';
import Icon, { IconProps } from './Icon'
const CloseIcon = (props: IconProps) => {
    return (
        <Icon {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </Icon>
    );
};

export default CloseIcon;