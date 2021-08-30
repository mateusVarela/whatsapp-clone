import React from 'react'
import './chatListItem.css'

export default () => {
    return (
        <div className="chat-list-item">
            <img className="chat-list-item-avatar" src="https://www.w3schools.com/howto/img_avatar2.png" ></img>
            <div className="chat-list-item-lines">
                <div className="chat-list-item-line">
                    <div className="chat-list-item-name">
                        Mateus
                    </div>
                    <div className="chat-list-item-date">
                        19:00
                    </div>
                </div>
                <div className="chat-list-item-line">
                    <div className="chat-list-item-last-message">
                        <p> Opa, tudo bem?</p>
                    </div>
                </div>
            </div>
        </div>
    )
}