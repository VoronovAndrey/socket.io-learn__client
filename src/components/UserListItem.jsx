import React from 'react'
// import { useNavigate } from 'react-router-dom'

const UserListItem = ({ info, selected, click }) => {
	// const navigate = useNavigate()
	return (
		<div className={`user-list-item ${selected ? 'user-list-item_selected' : ''}`}
			onClick={() => {
				// navigate('/chat')
				click()
			}}
		>
			<p>{info.username}</p>
		</div>
	)
}

export default UserListItem