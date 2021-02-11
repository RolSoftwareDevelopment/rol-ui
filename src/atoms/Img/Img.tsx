import React from 'react';

type Props = {
    styles?: {
        img: string
    }
} & React.ImgHTMLAttributes<any>

export const Img = (props: Props) => {

    let { style, ...imgProps } = props
    let classes = props.className
    classes += props.styles && props.styles.img ?  ' ' + props.styles.img : ''
    return <img {...imgProps} style={{ maxWidth: "100%",...style}} className={classes}/>
};

export default Img;
export type ImgProps = Props