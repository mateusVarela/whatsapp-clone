import {React, useState} from "react"
import EmojiPicker from "emoji-picker-react";
import "./chatWindow.css"
 
import SearchIcon from '@material-ui/icons/Search';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import CloseIcon from '@material-ui/icons/Close';
import SendIcon from '@material-ui/icons/Send';
import MicIcon from '@material-ui/icons/Mic';

export default () => {

  const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

  /**
   * Estado do menu de emoji.
   */
  const [emojiOpen, setEmojiOpen] = useState(false)

  /**
   * Estado do input de envio de mensagem.
   */
  const [inputText, setInputText] = useState('')
  
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

  const handleMicClick = () => {}

  const handleSendClick = () => {}

  return (
    <div className="chat-window">
      <div className="chat-window-header">
        <div className="chat-window-header-info">
          <img className="chat-window-avatar" src="https://www.w3schools.com/howto/img_avatar2.png" />
          <div className="chat-window-name">Mateus Varela</div>
        </div>

        <div className="chat-window-buttons">
            <div className="chat-window-button">
              <SearchIcon style={{color: "#919191"}}/>
            </div>
            
            <div className="chat-window-button">
              <MoreVertIcon style={{color: "#919191"}}/>
            </div>
        </div>
      </div>

      <div className="chat-window-body"></div>

      <div className="chat-window-emoji" 
        style={{height: emojiOpen? "200px" : "0px"}}>
        <EmojiPicker
          onEmojiClick={handleEmojiClick}
          disableSearchBar
          disableSkinTonePicker
        />
      </div>

      <div className="chat-window-footer">
        <div className="left-icons">
          <div style={{width: emojiOpen ? "40px" : "0px"}} className="chat-window-button">
            <CloseIcon 
              style={{color: "#919191"}}
              onClick={handleCloseEmoji}
              />
          </div>
          <div className="chat-window-button">
            <SentimentVerySatisfiedIcon 
            style={{color:  emojiOpen ? "#009688" : "#919191"}}
            onClick={handleOpenEmoji}
            />
          </div>
          <div className="chat-window-button">
              <AttachFileIcon style={{color: "#919191"}}/>
            </div>
        </div>
        <div className="chat-window-input">
            <input className="chat-window-input-message"
              placeholder="Digite uma mensagem"
              value={inputText}
              onChange={e=> setInputText(e.target.value)}
            />
        </div>
        <div className="right-icons">
          {!inputText && 
            <div onChange={handleMicClick} className="chat-window-button">
              <MicIcon style={{color: "#919191"}}/>
            </div>
          }

        {inputText &&         
          <div onChange={handleSendClick} className="chat-window-button">
            <SendIcon style={{color: "#919191"}}/>
          </div>
        }
        </div>
      </div>
    </div>)
}