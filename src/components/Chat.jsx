import React, {useEffect, useState} from 'react'
import MessagesContainer from './MessagesContainer'
import InputContainer from './InputContainer'

export const Chat = ({ socket, user }) => {
	const [messages, setMessages] = useState([])

	useEffect(() => {
		socket.on('recive_message', data => {
			console.log('recive_message useefect', data);
			setMessages(prev => [...prev, data])
		})

		return () => {
			socket.off('recive_message')
		}
	}, []);
	return (
		<>
			<MessagesContainer
				messages={messages}
				user={user}
			/>
			<InputContainer
				socket={socket}
				user={user}
			/>
		</>
	)
}