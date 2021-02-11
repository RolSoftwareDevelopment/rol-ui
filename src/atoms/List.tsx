import React from 'react';
import cn from 'classnames'
import ListItem from './ListItem';

type BaseProps = {
    /**
     * Conjunto de classNames para el Layout de la lista
     */
    layout?: {
        list?: string
    }
    /**
     * Componentes que seran List Items de la lista
     */
    children?: any
    /**
     * ClassNames (Evitar poner las classNames de layout aca)
     */
    className?: string
    listItemClassName?: string
    generateListItems?: boolean
}

/* type List = { variant?: "ul" | null | undefined | "" } | { variant?: "ol" } */
type AProps = { variant?: "ul" | null | undefined | "" } & React.HTMLAttributes<HTMLUListElement> | { variant?: "ol" } & React.HTMLAttributes<HTMLOListElement>
type Props = BaseProps & AProps

export const List = (props: Props) => {

    const { layout, children, listItemClassName, generateListItems, ...elementProps } = props

    let List
    switch (props.variant) {
        case ("ol"):
            List = <ol></ol>
            break;
        default: //ul
            List = <ul></ul>
            break;
    }

    let listLayout
    if (layout) {
        listLayout = layout.list
    }

    const getChild = (child: any) => React.cloneElement(child, { ...child.props, className: cn(child.props.className, listItemClassName) })

    let listItems =
        children
            ? children.length
                ? React.Children.map(children, child => {
                    if (!React.isValidElement(child)) return
                    if (!generateListItems) {
                        // @ts-ignore
                        return getChild(child)
                    } else {
                        return <ListItem>{getChild(child)}</ListItem>
                    }
                })
                : generateListItems ? <ListItem>{getChild(children)}</ListItem> : getChild(children)
            : null
    return React.cloneElement(List, { ...elementProps, children: listItems, className: cn("list-none", props.className, listLayout) })
};

export default List;
export type ListProps = Props