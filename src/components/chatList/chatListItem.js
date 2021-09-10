import React from 'react'
import './chatListItem.css'

export default ({ onClick, active, data }) => {
    return (
        <div onClick={onClick} className={`chat-list-item ${active ? "active" : ""}`}>
            <img className="chat-list-item-avatar" src={data.image} ></img>
            <div className="chat-list-item-lines">
                <div className="chat-list-item-line">
                    <div className="chat-list-item-name">
                        {data.title}
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