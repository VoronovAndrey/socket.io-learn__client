import React from 'react'
import Message from './Message'

const MessagesContainer = ({messages, user}) => {
  return (
    <div className='messages-container'>
    {messages && (
        messages.map((i, index) => {
            let uid = i.user._id
            return <Message 
                key={index}
                data={i}
                isSent={uid === user._id}               
            />
        })
    )}
    </div>
  )
}

export default MessagesContainer