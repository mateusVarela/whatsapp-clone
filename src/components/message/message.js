import { React, useState, useEffect } from "react";
import "./message.css"

export default ({ data, user }) => {

    /**
     * Estado da data da última mensagem.
     */
    const [time, setTime] = useState("")

    /**
     * Normaliza data da última mensagem para apresentar na tela.
     */
    useEffect(() => {
        if (data.date) {
            const date = new Date(data.date.seconds * 1000)
            const hours = date.getHours()

            const minutes = date.getMinutes()
            const hoursNormalized = hours < 10 ? `0${hours}` : hours
            const minutesNormalized = minutes < 10 ? `0${minutes}` : minutes
            setTime(`${hoursNormalized}:${minutesNormalized}`)
        }
    }, [data])
    return (
        <div className="message-line"
            style={{ justifyContent: user.id === data.author ? "flex-end" : "flex-start" }}
        >
            <div className="message-item"
                style={{
                    backgroundColor: user.id === data.author ? "#DCF8C6" : "#FFF"
                }}
            >
                <div className="message-text">{data.body}</div>
                <div className="message-date">{time}</div>
            </div>
        </div>
    )
}