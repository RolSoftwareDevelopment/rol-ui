import React from 'react';
import cn from 'classnames'

export type LoadingProps = {
    Spinner?: any
    children?: any,
    loading?: boolean
    classNames?: string
} & {
    showComponentOnLoading?: true
    spinnerOnTop: boolean
} & { showComponentOnLoading?: true }

export const Loading = (props: LoadingProps) => {
    return <div className={props.classNames}>
        <div className={cn({ "hidden": !props.loading })}>
            {props.Spinner}
        </div>
        <div className={cn({ "hidden": !props.showComponentOnLoading && props.loading })}>
            {props.children}
        </div>
    </div>
};

export default Loading;
