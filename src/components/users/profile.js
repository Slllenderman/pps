import React, { useState } from "react"
import { ShCardsList } from "../cardlists/ListBlocks"
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from "react"

function Profile(){
    const [isProvider, setIs] = useState(true)
    const auth = useSelector((state) => state.root.isAuthorized)
    const navigate = useNavigate()
    useEffect(() => {if(!auth) navigate("/") }, [])

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