import React from 'react'
import Message from './Message'

const MessagesContainer = () => {
  return (
    <div className='messages-container'>
        <Message />
        <Message 
            isSent={false}
        />
    </div>
  )
}

export default MessagesContainer