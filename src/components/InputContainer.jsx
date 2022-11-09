import React from 'react'
import SendIcon from './send.svg'

const InputContainer = ({ socket, user, room_id }) => {
	const inputRef = React.useRef('')
	const onSendHandler = () => {
		if (inputRef.current.value !== '') {
			let sendData = {
				message: inputRef.current.value,
				user,
				room_id,
				time: new Date().toISOString()
			}
			socket.emit("send_message", sendData )
			inputRef.current.value = ''
		}
	}
	return (
		<div className='input-wrapper'>
			<input type={'text'} className='input' ref={inputRef}/>
			<button className='input-wrapper__btn'
				onClick={onSendHandler}
			>
				<img src={SendIcon} alt="" />
			</button>
		</div>
	)
}

export default InputContainer