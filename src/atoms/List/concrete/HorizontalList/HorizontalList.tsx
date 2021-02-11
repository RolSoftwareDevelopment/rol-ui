import React from 'react';
import AList, { ListProps } from '../../List'

export const HorizontalList = (props: ListProps) => {
    return <AList
        layout={{ list: "flex" }}
        {...props}
    />
};

export default HorizontalList;