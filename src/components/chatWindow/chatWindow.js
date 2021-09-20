import { React, useState, useEffect, useRef } from "react"
import EmojiPicker from "emoji-picker-react";
import "./chatWindow.css"
import MessageItem from "../message/message";

import SearchIcon from '@material-ui/icons/Search';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import CloseIcon from '@material-ui/icons/Close';
import SendIcon from '@material-ui/icons/Send';
import MicIcon from '@material-ui/icons/Mic';

import onChatContent from "../../api"
import api from "../../api";

export default ({ user, data }) => {

  const body = useRef()

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

  const recognition = SpeechRecognition ? new SpeechRecognition() : false

  /**
   * Estado do menu de emoji.
   */
  const [emojiOpen, setEmojiOpen] = useState(false)

  /**
   * Estado do input de envio de mensagem.
   */
  const [inputText, setInputText] = useState('')


  const [listening, setListening] = useState(false)


  const [lists, setLits] = useState([])

  const [users, setUsers] = useState([])

  useEffect(() => {
    if (body.current.scrollHeight > body.current.offsetHeight) {
      body.current.scrollTop = body.current.scrollHeight - body.current.offsetHeight
    }
  }, [lists])

  /**
   * Monitora envio de mensagens, caso tenha um novo envio sera mostrado aqui.
   */
  useEffect(() => {

    setLits([])
    const onSubmit = api.onChatContent(data.chatId, setLits, setUsers)
    return onSubmit
  }, [data.chatId])

  /**
   * Função usada para mostrar emoji selecionado.
   */
  const handleEmojiClick = (event, emojiObject) => {
    setInputText(inputText + emojiObject.emoji)
  }

  /**
   * Função usada para mostrar menu de emoji.
   */
  const handleOpenEmoji = () => {
    setEmojiOpen(true)
  }

  /**
   * Função usada para não mostrar menu de emoji.
   */
  const handleCloseEmoji = () => {
    setEmojiOpen(false)
  }

  /**
   * Função responsável por habilitar o microfone, escutar e transformar em texto.
   */
  const handleMicClick = () => {

    if (recognition) {
      recognition.onstart = () => {
        setListening(true)
      }

      recognition.onend = () => {
        setListening(false)
      }

      recognition.onresult = function (e) {
        setInputText(e.results[0][0].transcript)
      }

      recognition.start()
    }
  }

  /**
   * Evento de clique para enviar mensagem.
   */
  const handleSendClick = () => {
    if (!inputText) return

    api.sendMessage(data, user.id, 'text', inputText, users)
    setInputText("")
    setEmojiOpen(false)
  }

  /**
   * Envia a mensagem com a tecla enter. 
   */
  const handleInputKeyUp = (e) => {
    if (e.keyCode == 13) {
      handleSendClick()
    }
  }

  return (
    <div className="chat-window">
      <div className="chat-window-header">
        <div className="chat-window-header-info">
          <img className="chat-window-avatar" src={data.image} />
          <div className="chat-window-name">{data.title}</div>
        </div>

        <div className="chat-window-buttons">
          <div className="chat-window-button">
            <SearchIcon style={{ color: "#919191" }} />
          </div>

          <div className="chat-window-button">
            <MoreVertIcon style={{ color: "#919191" }} />
          </div>
        </div>
      </div>

      <div ref={body} className="chat-window-body">
        {lists.map((list, key) => (
          <MessageItem
            key={key}
            data={list}
            user={user}
          />
        ))}
      </div>

      <div className="chat-window-emoji"
        style={{ height: emojiOpen ? "200px" : "0px" }}>
        <EmojiPicker
          onEmojiClick={handleEmojiClick}
          disableSearchBar
          disableSkinTonePicker
        />
      </div>

      <div className="chat-window-footer">
        <div className="left-icons">
          <div style={{ width: emojiOpen ? "40px" : "0px" }} className="chat-window-button">
            <CloseIcon
              style={{ color: "#919191" }}
              onClick={handleCloseEmoji}
            />
          </div>
          <div className="chat-window-button">
            <SentimentVerySatisfiedIcon
              style={{ color: emojiOpen ? "#009688" : "#919191" }}
              onClick={handleOpenEmoji}
            />
          </div>
          <div className="chat-window-button">
            <AttachFileIcon style={{ color: "#919191" }} />
          </div>
        </div>
        <div className="chat-window-input">
          <input className="chat-window-input-message"
            placeholder="Digite uma mensagem"
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            onKeyUp={handleInputKeyUp}
          />
        </div>
        <div className="right-icons">
          {!inputText &&
            <div onClick={handleMicClick} className="chat-window-button">
              <MicIcon style={{ color: listening ? "#126ECE" : "#919191" }} />
            </div>
          }

          {inputText &&
            <div onClick={handleSendClick} className="chat-window-button">
              <SendIcon style={{ color: "#919191" }} />
            </div>
          }
        </div>
      </div>
    </div>)
}