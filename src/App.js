import React, { useState, useEffect } from "react"

import ChatListItem from "./components/chatList/chatListItem";
import ChatInfo from "./components/chatIntro/chatIntro"
import ChatWindow from "./components/chatWindow/chatWindow"

import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import './App.css'

export default () => {

  const [chatList, setChatList] = useState([
    { chatId: 1, title: "Mateus", image: "https://www.w3schools.com/howto/img_avatar2.png" },
    { chatId: 2, title: "Max", image: "https://www.w3schools.com/howto/img_avatar2.png" },
    { chatId: 3, title: "João", image: "https://www.w3schools.com/howto/img_avatar2.png" },
    { chatId: 4, title: "Pai", image: "https://www.w3schools.com/howto/img_avatar2.png" },
    { chatId: 5, title: "Lucas", image: "https://www.w3schools.com/howto/img_avatar2.png" }
  ])

  const [activeChat, setActiveChat] = useState({})

  return (
    <div className="app-window">
      <div className="sidebar">
        <header>
          <img className="header-avatar" src="https://www.w3schools.com/howto/img_avatar2.png" alt="" />
          <div className="header-buttons">
            <div className="header-button">
              <DonutLargeIcon style={{ color: '#919191' }} />
            </div>
            <div className="header-button">
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
          <ChatWindow />
        }
        {!activeChat.chatId &&
          <ChatInfo />}
      </div>
    </div>
  )
}