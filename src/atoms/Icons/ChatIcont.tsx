
import React from 'react';
import Icon, { IconProps } from './Icon'
const ChatIcon = (props: IconProps) => {
    return (
        <Icon {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
        </Icon>
    );
};

export default ChatIcon;