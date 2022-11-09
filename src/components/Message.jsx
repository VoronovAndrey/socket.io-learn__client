import React from 'react'

const Message = ({data, isSent = true}) => {
    const dateFormater = () => {
        const date = data.time.split('T')[0]
        let time = data.time.split('T')[1]
        time = time.split(':')
        let time_f = `${time[0]}:${time[1]}`
        return `${date} ${time_f}`
    }
    return (
        <div className="message-item__container" 
            style={{
                justifyContent: isSent ? 'flex-end' : 'start'
            }}
        >
            <div className={`message-wrapper message-wrapper__${isSent ? 'sent' : 'recived'}`}>
                <p className='message-item__username'>{isSent ? 'You' : data.user.username}</p>
                <p className='message-item__content'>{data.message}</p>
                {data.time && (
                    <p className='message-item__time'>{dateFormater()}</p>
                )}
            </div>
        </div>
    )
}

export default Message