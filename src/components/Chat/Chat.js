import React, { useState, useEffect } from 'react'
import './Chat.css'
import { Avatar, IconButton } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import AttachFile from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import { useParams } from 'react-router-dom';
import db from '../../firebase';
import { FieldValue } from '../../firebase'
import { useStateValue } from '../../Redux/StateProvider'
import { AlwaysScrollToBottom } from './ChatBody/AlwaysScrollBottom'

function Chat() {
  const [seed, setSeed] = useState('');
  const [input, setInput] = useState('');
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState();
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();


  useEffect(() => {
    if (roomId) {
      db.collection('rooms').doc(roomId).onSnapshot(
        snapshot => setRoomName(snapshot.data().name));

      db.collection('rooms')
        .doc(roomId)
        .collection('messages')
        .orderBy('timestamp', 'asc')
        .onSnapshot(snapshot => (
          setMessages(snapshot.docs.map(doc => doc.data()))
        ))
    }

  }, [roomId])

  useEffect(() => {
    setSeed(Math.floor((Math.random() * 100)))
  }, [roomId])

  const sendMessage = (e) => {
    e.preventDefault();

    db.collection('rooms').doc(roomId)
      .collection('messages').add({
        name: user.displayName,
        timestamp: FieldValue.serverTimestamp(),
        message: input
      })

    setInput("");
  }

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>
            Last{" "}
            {new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()}
          </p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

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

      <div className="chat__footer">
        <InsertEmoticonIcon />
        <form>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            type="text"
            placeholder="Type a message" />
          <button
            type="submit"
            onClick={sendMessage}>
            Send a message
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  )
}

export default Chat
