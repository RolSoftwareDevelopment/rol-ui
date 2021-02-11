import React from 'react';
import AMenu, { MenuProps as MProps } from './AMenu'
import List, { ListProps } from '../../atoms/List'

type Props = {
    ListProps?: ListProps
} & MProps
export const Menu = (props: Props) => {
    return <AMenu
        {...props}
        render={{
            renderList: ({ components }) => {
                return <List {...props.ListProps}>{components.children}</List>
            },
            ...props.render
        }} />
};

export default Menu;
export type MenuProps = Props