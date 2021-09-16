import {React, useState} from "react";
import "./newChat.css"

import ArrowBackIcon from '@material-ui/icons/ArrowBack';


export default ({chatList, user, show, setShow}) => {

    const [lists, setLists] = useState([
        {id: 123, avatar: "https://www.w3schools.com/howto/img_avatar2.png", name: "Mateus Varela"},
        {id: 123, avatar: "https://www.w3schools.com/howto/img_avatar2.png", name: "Mateus Varela"},
        {id: 123, avatar: "https://www.w3schools.com/howto/img_avatar2.png", name: "Mateus Varela"},
        ])

        const handleClose = () => {
            setShow(false)
        }

    return (
        <div className="new-chat" style={{left: show ? 0 : -415}}>
            <div className="new-chat-head">
                <div onClick={handleClose} className="new-chat-back-button">
                    <ArrowBackIcon style={{color: "#FFFFFF"}}/>
                </div>

                <div className="new-chat-head-tittle">
                    Nova conversa
                </div>
            </div>
            <div className="new-chat-list">
                {lists.map((list, key) => (
                    <div className="new-chat-item" key={key}>
                        <img className="new-chat-item-avatar" src={list.avatar} alt=""/>
                        <div className="new-chat-item-name">{list.name}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}