import { React, useState, useEffect } from "react";
import "./newChat.css"

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import api from "../../api"


export default ({ chatList, user, show, setShow }) => {

    const [lists, setLists] = useState([])

    useEffect(() => {
        const getList = async () => {
            if (user) {
                const results = await api.getContatList(user.id)
                setLists(results)
            }
        }
        getList()
    }, [user])

    /**
     * Função usada para não mostrar o menu de nova conversa.
     */
    const handleClose = () => {
        setShow(false)
    }

    /**
     * Função responsável por criar um novo chat. 
     */
    const addNewChat = async (secondUser) => {
        await api.addNewChat(user, secondUser)

        handleClose()
    }

    return (
        <div className="new-chat" style={{ left: show ? 0 : -415 }}>
            <div className="new-chat-head">
                <div onClick={handleClose} className="new-chat-back-button">
                    <ArrowBackIcon style={{ color: "#FFFFFF" }} />
                </div>

                <div className="new-chat-head-tittle">
                    Nova conversa
                </div>
            </div>
            <div className="new-chat-list">
                {lists.map((list, key) => (
                    <div onClick={() => addNewChat(list)} className="new-chat-item" key={key}>
                        <img className="new-chat-item-avatar" src={list.avatar} alt="" />
                        <div className="new-chat-item-name">{list.name}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}