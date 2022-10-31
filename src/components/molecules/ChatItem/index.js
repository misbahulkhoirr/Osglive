import React from 'react'
import IsMe from './IsMe'
import Other from './Other'

const ChatItem = ({ content, time, isMe }) =>
{
    if(isMe)
    {
        return <IsMe content={content} time={time} />
    }

    return <Other content={content} time={time} />
}

export default ChatItem