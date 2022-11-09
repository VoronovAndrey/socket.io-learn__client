import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'

import { io } from 'socket.io-client'
import { Chat } from './components/Chat'
const socket = io('http://192.168.1.33:3001')


const NavigationContainer = () => {
	const [user, setUser] = useState(null)
	const [users, setUsers] = useState([])
	const [chatList, setChatList] = useState([])


	useEffect(() => {
		socket.on("connect", () => {
			console.log('connect', socket.id);
		});
		socket.on("disconnect", (reason) => {
			// ...
			console.log("disconnect", reason);
		});

		socket.on('new_user_response', (data) => {
			console.log('new_user_response', data);
			setUsers(data)
		})

		const socketEvents = [
			"connect",
			"disconnect",
			'new_user_response',
		]

		return () => {
			socketEvents.map(i => {
				socket.off(i)
			})
		}
	}, []);

	useEffect(() => {
		if ( (window.location.pathname !== '/') && (!user) ) {
			window.location.replace('/')
		}
	}, [window.location.pathname])

	useEffect(() => {
		console.log('eff users', users);
	}, [users])
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={
					<Home
						socket={socket}
						user={{ user, setUser }}
						users={users}
						chatList={{ chatList, setChatList }}
					/>
				} />
				<Route path='/chat_:room_id' element={
					<Chat
						socket={socket}
						user={user}
					/>
				} />
			</Routes>
		</BrowserRouter>
	)
}

export default NavigationContainer