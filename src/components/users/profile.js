import React, { useState } from "react"
import { ShCardsList } from "../cardlists/ListBlocks"
import { useNavigate } from 'react-router-dom'

function Profile(){
    const [isProvider, setIs] = useState(true)
    const navigate = useNavigate()

    return(
        <div className="profile-container">
            <div className="profile-title">Профиль: login@mail.ru</div>
            { isProvider ?
                <button className="profile-providerBt" onClick={() => navigate("/providerSite")}>
                    Профиль поставщика
                </button>
            :
                <button className="profile-providerBt" onClick={() => navigate("/providerReg")}>
                    Регистрация поставщика
                </button>
            }
            <ShCardsList/>
        </div>
    )
}

export default Profile