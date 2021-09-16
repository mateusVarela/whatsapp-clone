import React, { useState, useEffect } from "react"

import ChatListItem from "./components/chatList/chatListItem";
import ChatInfo from "./components/chatIntro/chatIntro"
import ChatWindow from "./components/chatWindow/chatWindow"
import NewChat from "./components/newChat/newChat";
import Login from "./components/login/login";
import api from "./api"

import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import './App.css'

export default () => {

  const [chatList, setChatList] = useState([])

  const [activeChat, setActiveChat] = useState({})

  /**
   * Estado responsável por mostrar area de nova conversa na tela.
   */
  const [showNewContactChat, setShowNewContactChat] = useState(false)

  const [user, setUser] = useState({
    id: "pchhEiZcjxTmCVYbkTDIIrG8BsG3",
    name: "Mateus Varela",
    avatar: "https://graph.facebook.com/1743806615810318/picture"
  })

  const handleLoginData = async (userInformation) => {
    const newUser = {
      id: userInformation.uid,
      name: userInformation.displayName,
      avatar: userInformation.photoURL
    }
    await api.addUser(newUser)
    setUser(newUser)
  }

  if (!user) return (<Login onReceive={handleLoginData} />)

  const handleOpenNewChat = () => {
    setShowNewContactChat(true)
  }

  return (
    <div className="app-window">
      <div className="sidebar">
        <NewChat
          chatList={chatList}
          user={user}
          show={showNewContactChat}
          setShow={setShowNewContactChat}
        />
        <header>
          <img className="header-avatar" src={user.avatar} alt="" />
          <div className="header-buttons">
            <div className="header-button">
              <DonutLargeIcon style={{ color: '#919191' }} />
            </div>
            <div onClick={handleOpenNewChat} className="header-button">
              <ChatIcon style={{ color: '#919191' }} />
            </div>
            <div className="header-button">
              <MoreVertIcon style={{ color: '#919191' }} />
            </div>
          </div>
        </header>
        <div className="search">
          <div className="search-input">
            <SearchIcon fontSize="small" style={{ color: '#919191' }} />
            <input type="search" placeholder="Procurar ou começar uma nova conversa." />
          </div>
        </div>
        <div className="chat-list">
          {chatList.map((item, key) => (
            <ChatListItem key={key}
              data={item}
              active={activeChat.chatId === chatList[key].chatId}
              onClick={() => setActiveChat(chatList[key])} />
          ))}
        </div>
      </div>
      <div className="content-area">
        {
          activeChat.chatId &&
          <ChatWindow
            user={user}
          />
        }
        {!activeChat.chatId &&
          <ChatInfo />}
      </div>
    </div>
  )
}