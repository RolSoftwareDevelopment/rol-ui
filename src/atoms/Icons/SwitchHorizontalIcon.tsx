import React from 'react';
import Icon, { IconProps } from './Icon'
const SwitchHorizontalIcon = (props: IconProps) => {
    return (
        <Icon {...props}>
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </Icon>
    );
};

export default SwitchHorizontalIcon;