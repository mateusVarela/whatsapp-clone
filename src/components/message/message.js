import React from "react";
import "./message.css"

export default ({data, user}) => {
    console.log(data, user)
    return(
        <div className="message-line"
            style={{justifyContent: user.id === data.author ? "flex-end" : "flex-start" }}
        >
            <div className="message-item"
                style={{
                    backgroundColor: user.id === data.author ? "#DCF8C6" : "#FFF"
                }}
            >
                <div className="message-text">{data.body}</div>
                <div className="message-date">19h00</div>
            </div>
        </div>
    )
}