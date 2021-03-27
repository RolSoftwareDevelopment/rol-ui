

import React from 'react';
import Icon, { IconProps } from './Icon'
const TableIcon = (props: IconProps) => {
    return (
        <Icon {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </Icon>
    );
};

export default TableIcon;