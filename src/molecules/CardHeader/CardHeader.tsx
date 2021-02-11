import React from 'react';
import ACardHeader, { CardHeaderProps as CHProps } from './ACardHeader'
import Text, { TextProps } from '../../atoms/Text/Text'
import Img, { ImgProps } from '../../atoms/Img/Img'

type Props = {
    titleTextProps?: TextProps
    subtitleTextProps?: TextProps
    imgProps?: ImgProps
    onButtonClick?: () => any
} & CHProps

export const CardHeader = (props: Props) => {
    return <ACardHeader
        {...props}
        render={{
            renderTitle: ({ data }) => {
                return <Text variant="h2" {...props.titleTextProps}>{data.text}</Text>
            },
            renderSubtitle: ({ data }) => {
                return data.text ? <Text variant="span"  {...props.subtitleTextProps}>{data.text}</Text> : null
            },
            renderHyperlink: ({ components, data }) => {
                return <a href={data.href}>{components.children}</a>
            },
            ...props.render
        }}
    />
};

export default CardHeader;
export type CardHeaderProps = Props