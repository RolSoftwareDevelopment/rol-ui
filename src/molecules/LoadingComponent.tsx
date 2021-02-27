import React from 'react';
import { Loading, LoadingProps } from '../atoms/Loading';

type Props = {
    ResultComponent?: any
} & LoadingProps

type LoadingComponentType = React.FC<Props>

export const LoadingComponent: LoadingComponentType = (props) => {
    const { ResultComponent, ...loadingProps } = props
    return <div>

        <Loading {...loadingProps}>
            <div className="" >
                {ResultComponent ? ResultComponent : null}
            </div>
            {props.children}
        </Loading>
    </div>
}

export default LoadingComponent;