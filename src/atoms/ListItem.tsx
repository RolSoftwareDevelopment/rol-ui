import React from 'react';

export type ListProps = {

} & React.HTMLAttributes<HTMLLIElement>

export const ListItem = (props: ListProps) => {
    return <li>{props.children}</li>

};


export default ListItem;