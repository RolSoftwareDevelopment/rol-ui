import React from 'react'
import { useRouter } from 'next/router'
import NextLink, { NextLinkProps } from './NextLink'
type Props = NextLinkProps

export const NextActiveLink = (props: Props) => {
    const router = useRouter()
    return <NextLink {...props} isActive={router.pathname === props.href} />
}

export default NextActiveLink