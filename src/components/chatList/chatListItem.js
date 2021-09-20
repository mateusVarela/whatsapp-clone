import {React, useState, useEffect} from 'react'
import './chatListItem.css'

export default ({ onClick, active, data }) => {
    
    /**
     * Estado da data da última mensagem.
     */
    const [time, setTime] = useState("")

    /**
     * Normaliza data da última mensagem para apresentar na tela.
     */
    useEffect(() => {
        if (data.lastMessageDate) {
            const date = new Date(data.lastMessageDate.seconds * 1000)
            const hours = date.getHours()

            const minutes = date.getMinutes()
            const hoursNormalized = hours < 10 ? `0${hours}` : hours
            const minutesNormalized = minutes < 10 ? `0${minutes}` : minutes
            console.log(`${hoursNormalized}:${minutesNormalized}`);
            setTime(`${hoursNormalized}:${minutesNormalized}`)
        }
    }, [data])
 
    return (
        <div onClick={onClick} className={`chat-list-item ${active ? "active" : ""}`}>
            <img className="chat-list-item-avatar" src={data.image} ></img>
            <div className="chat-list-item-lines">
                <div className="chat-list-item-line">
                    <div className="chat-list-item-name">
                        {data.title}
                    </div>
                    <div className="chat-list-item-date">
                        {time}
                    </div>
                </div>
                <div className="chat-list-item-line">
                    <div className="chat-list-item-last-message">
                        <p>{data.lastMessage}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}