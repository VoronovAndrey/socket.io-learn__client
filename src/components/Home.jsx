import React, { useRef, useState, useEffect } from 'react'
import UserListItem from './UserListItem'

const Home = ({ socket, user: { user, setUser }, users }) => {
	const inputRef = useRef('')
	const [listShown, setListShown] = useState(false)
	const [members, setMembers] = useState([])
	const [chatList, setChatList] = useState([])

	const addMembersHandler = (id) => {
		let tmp = members.filter(i => id === i)
		if (tmp.length > 0) {
			let _filtred = members.filter(i => id !== i)
			setMembers(_filtred)
		} else {
			setMembers(prev => [...prev, id])
		}
	}

	const createChatHandler = () => {
		let name = window.prompt("New chat name is:", `${user.username} room`)
		if (name === null) return
		name = name.trim() === '' ? `${user.username} room` : name
		let room_id = `${user.username}-${Date.now()}`
		socket.emit('create_room', { 
			members: [...members, user._id], 
			name, 
			room_id 
		})

		setMembers([])
		setListShown(false)
	}

	const onSubmiteHandler = () => {
		if (inputRef.current.value.trim() === '') return

		let data = {
			socket_id: socket.id,
			username: inputRef.current.value,
			_id: `${inputRef.current.value}-${socket.id}`
		}
		setUser(data)
		socket.emit('new_user', data)
	}

	useEffect(() => {
		socket.on('new_chat_response', (data) => {
			console.log('new_chat_response', data);
			setChatList(data)
		})
		return () => {
			socket.off('new_chat_response')
		};
	}, []);

	if (!user) return (
		<div className='home-auth'>
			<h3 className='home-auth__title'>Your nickname is:</h3>
			<input
				type="text"
				ref={inputRef}
				className='input home-auth__input'
				placeholder='Your nick...'
			/>
			<button onClick={onSubmiteHandler} className='home-auth__btn'>sign in</button>
		</div>
	)


	return (
		<>
			<div className="user-list__row">
				<h3 className='home-auth__title'>Hello, <span style={{
					fontWeight: '800'
				}}>{user.username}</span>!</h3>
				<button
					className={`user-list__btn ${listShown ? 'user-list__btn_active' : ''}`}
					onClick={() => setListShown(!listShown)}
				>New Chat</button>
			</div>

			{(chatList && !listShown) && (
				<>
					{chatList.map(i => {
						return <p key={i.room_id}>{i.name}</p>
					})}
				</>
			)}

			{(users && listShown) && (
				<>
				<div className='user-list__container'>
					{ users.map(i => {
						let selected = members.findIndex(el => el === i._id)
					if (i._id !== user._id) return <UserListItem
						info={i}
						key={i._id}
						click={() => addMembersHandler(i._id)}
						selected={selected >= 0}
					/>
					return null
					})}
				</div>
				<button
					className={`user-list__btn create-chat__btn ${members.length === 0 ? 'create-chat__btn_disabled' : ''}`}
					disabled={members.length === 0}
					onClick={createChatHandler}
				>Create chat with selected ({members.length})</button>
				</>
			)}
		</>

	)
}

export default Home