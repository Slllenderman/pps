import { useContext, useEffect } from 'react'
import {Link} from 'react-router-dom'
import { fastProviderRegContext } from '../../app'

function Greeting(){
    return (
        <div className="header-greeting">
            <div className="header-greeting-container">
                <div className="header-greeting-title">
                    <p>ОптЛист:</p>
                    <p>организация поставок</p>
                    <p>для вашего бизнеса</p>
                </div>
                <Link className="header-greeting-button" to="/registration">Я заказчик</Link>
                <Link className="header-greeting-button" to="/registration">Я поставщик</Link>
            </div>
        </div>
)}

export default Greeting