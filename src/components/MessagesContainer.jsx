import React from 'react'
import Message from './Message'

const MessagesContainer = ({messages, user}) => {
  return (
    <div className='messages-container'>
    {messages && (
        messages.map((i, index) => {
            let uid = i.user.id
            return <Message 
                key={index}
                title={i.message}
                isSent={uid === user}                
            />
        })
    )}
    </div>
  )
}

export default MessagesContainer