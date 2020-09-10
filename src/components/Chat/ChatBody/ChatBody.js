import React, { useEffect } from 'react'
import './ChatBody.css'
import { useStateValue } from '../../../Redux/StateProvider'
import { AlwaysScrollToBottom } from './AlwaysScrollBottom'


function ChatBody({ messages }) {
  const [{ user }, dispatch] = useStateValue();



  return (
    <div className="chat__body">
      {messages.map((message, index) => (
        <p key={index} className={`chat__message ${message.name === user.displayName && 'chat__receiver'}`}>
          {message.message}
          <span className="chat__name">{message.name}</span>
          <span className="chat__timestamp">

            {new Date(message.timestamp?.toDate()).toUTCString()}
          </span>
        </p>
      ))}
      <AlwaysScrollToBottom />
    </div>
  )
}

export default ChatBody
