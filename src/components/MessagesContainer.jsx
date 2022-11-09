import React, {useEffect, useRef} from 'react'
import Message from './Message'

const MessagesContainer = ({messages, user}) => {
  const lastMessageRef = useRef(null)
  useEffect(() => {
    // scroll to bottom every time messages change
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
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
    <div
      ref={lastMessageRef}
    />
    </div>
  )
}

export default MessagesContainer