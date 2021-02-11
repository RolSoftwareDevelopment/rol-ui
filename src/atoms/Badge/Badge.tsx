import React from 'react';
import cn from 'classnames'
type Props = {
    children?: any,
    content?: any,
    size?: "sm" | "md" | "lg" | "xl"
    className?: string
}

const Badge = (props: Props) => {

    let classes = cn("absolute top-0 right-0 rounded-full", props.className)
    switch (props.size) {
        case "sm":
            classes = cn(classes, "w-1 h-1")
            break;
        case "lg":
            classes = cn(classes, "w-1 h-1")
            break;
        case "xl":
            classes = cn(classes, "w-1 h-1")
            break;
        default:
            classes = cn(classes, "w-1 h-1")
            break;
    }
    return (
        <span className={cn("relative inline-flex")}>
            {props.children}
            <span className={classes}>
                {props.content}
            </span>
        </span>
    );
};

export type BadgeProps = Props
export const ThemeBadge = Badge;
export default ThemeBadge