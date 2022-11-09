import React from 'react'
import { Link } from 'react-router-dom'

const ChatListItem = ({data}) => {
  return (
    <Link to={`/chat_${data.room_id}`} className='chatlist-item__wrapper'>
        {data.name}
    </Link>
  )
}

export default ChatListItem