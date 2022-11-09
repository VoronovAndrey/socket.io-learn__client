import React from 'react'

const Message = ({data, isSent = true}) => {
    return (
        <div className="message-item__container" 
            style={{
                justifyContent: isSent ? 'flex-end' : 'start'
            }}
        >
            <div className={`message-wrapper message-wrapper__${isSent ? 'sent' : 'recived'}`}>
                <p className='message-item__username'>{isSent ? 'You' : data.user.username}</p>
                <p className='message-item__content'>{data.message}</p>
            </div>
        </div>
    )
}

export default Message