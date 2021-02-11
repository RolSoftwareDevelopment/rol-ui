import React from 'react';

export type IconProps = {
    className?: string
    children?: any
}
const Icon = (props: IconProps) => {
    return (
        <svg className={props.className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {props.children}
        </svg>
    );
};

export default Icon;