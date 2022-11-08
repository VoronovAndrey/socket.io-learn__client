import React from 'react'
import SendIcon from './send.svg'

const InputContainer = () => {
  return (
    <div className='input-wrapper'>
        <input type={'text'} className='input'/>
        <button className='input-wrapper__btn'>
            <img src={SendIcon} alt="" />
        </button>
    </div>
  )
}

export default InputContainer