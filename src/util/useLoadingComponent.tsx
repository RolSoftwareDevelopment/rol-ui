// import React, { useState } from 'react';
// import { Loading, LoadingProps } from '../atoms/Loading';

// type Props = {
//     ResultComponent: any
// } & LoadingProps

// export const LoadingComponent = (props: Props) => {
//     // const { ResultComponent, ...loadingProps } = props
//     return <div>
//         {/* <div className="" >
//             {ResultComponent ? ResultComponent : null}
//         </div>
//         <Loading {...loadingProps}>
//             {props.children}
//         </Loading> */}
//         Hola
//     </div>
// }

// type InitialValue = {
//     loading: boolean

// }

// export const useLoadingComponent = (initialValue: InitialValue) => {
//     const [loading, setLoading] = useState(false)
//     const [ResultComponent, setResultComponent] = useState(null)
//     return [LoadingComponent, loading, setLoading, ResultComponent, setResultComponent]
// };


// export default useLoadingComponent;




import React, { useState } from 'react';
import { Loading, LoadingProps } from '../atoms/Loading';
import cn from 'classnames'

type Props = {
    ResultComponent?: any
    showResultOnLoading?: boolean
    showComponentOnResult?: boolean
} & LoadingProps

type LoadingComponentType = React.FC<Props>

export const LoadingComponent: LoadingComponentType = (props) => {
    const { ResultComponent, showResultOnLoading, showComponentOnResult, ...loadingProps } = props
    return <div>
        <div className={cn({ "hidden": showResultOnLoading })} >
            {ResultComponent ? ResultComponent : null}
        </div>
        <Loading {...loadingProps}>
            {props.children}
        </Loading>
    </div>
}

type InitialLoadingComponentProps = {
    ResultComponent?: any
    loading?: boolean
}


export const useLoadingComponent = () => {
    const [loading, setLoading] = useState(false)
    const [ResultComponent, setResultComponent] = useState(null)

    let props: InitialLoadingComponentProps = {
        ResultComponent,
        loading,
    }

    let arr: [LoadingComponentType, InitialLoadingComponentProps, React.Dispatch<React.SetStateAction<boolean>>, React.Dispatch<any>, boolean, any]

    arr = [LoadingComponent, props, setLoading, setResultComponent, loading, ResultComponent]

    return arr
};


export default useLoadingComponent;