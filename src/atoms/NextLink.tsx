import React from 'react';
import NLink, { LinkProps as NLinkProps } from 'next/link'
import Link, { LinkProps } from './Link'
export type NextLinkProps = NLinkProps & LinkProps & {
    activeClassName?: string
}

const NextLink = (props: NextLinkProps) => {
    const { href, as, replace, scroll, shallow, prefetch, locale, ...otherProps } = props
    const nextProps = { href, as, replace, scroll, shallow, prefetch, locale }
    return (
        <NLink passHref {...nextProps}>
            <Link {...otherProps} className={props.className}>
                {props.children}
            </Link>
        </NLink>
    );
};

export default NextLink;


