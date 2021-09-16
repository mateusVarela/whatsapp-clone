import React from "react";
import api from "../../api";
import "./login.css"

export default ({onReceive}) => {
    const handleFacebookLogin = async () => {
        const resultOfUserLogin = await api.facebookPopUp()
        
        if(!resultOfUserLogin) return alert("Houve algum erro...")

        onReceive(resultOfUserLogin.user)
    }

    return(
        <div className="login">
            <button onClick={handleFacebookLogin}>Logar com Facebook</button>
        </div>
    )
}