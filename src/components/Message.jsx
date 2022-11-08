import React from 'react'

const Message = ({ title = 'none', isSent = true}) => {
    return (
        <div className="message-item__container" 
            style={{
                justifyContent: isSent ? 'flex-end' : 'start'
            }}
        >
            <div className={`message-wrapper message-wrapper__${isSent ? 'sent' : 'recived'}`}>
                <p>{title}</p>
            </div>
        </div>
    )
}

export default Message