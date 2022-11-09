import React, {useEffect, useState} from 'react'
import MessagesContainer from './MessagesContainer'
import InputContainer from './InputContainer'
import { Link, useParams } from 'react-router-dom'

export const Chat = ({ socket, user }) => {
	const [messages, setMessages] = useState([])
	const {room_id} = useParams()

	useEffect(() => {
		socket.on('recive_message', data => {
			// console.log('recive_message useefect', data);
			setMessages(prev => [...prev, data])
		})
		socket.on('join_room_response', data => {
			// console.log('join_room_response useefect', data);
			setMessages(data)
		})
		// console.log('room', room_id);

		socket.emit('join_room', {room_id})

		return () => {
			socket.off('recive_message')
			socket.off('join_room_response')
		}
	}, []);
	return (
		<>
		<Link to='/' className='back-btn'>← Back</Link>
			<MessagesContainer
				messages={messages}
				user={user}
			/>
			<InputContainer
				socket={socket}
				user={user}
				room_id={room_id}
			/>
		</>
	)
}