import { setFastProviderRegistration, resetFastProviderRegistration } from "../../redux/userSlice"
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"

function Greeting(){
    const dispatch = useDispatch()
    const [customerLink, setCustomerLink] = useState('/registration')
    const [providerLink, setProviderLink] = useState('/registration')
    const auth = useSelector((state) => state.user.isAuthorized)
    const fastProviderClick = () => {
        dispatch( setFastProviderRegistration() )
    }

    useEffect(()=>{
        dispatch( resetFastProviderRegistration() )
        if(auth){
            setCustomerLink('/profile')
            setProviderLink('/providerReg')
        }
    },[auth])

    return (
        <div className="header-greeting">
            <div className="header-greeting-container">
                <div className="header-greeting-title">
                    <p>ОптЛист:</p>
                    <p>организация поставок</p>
                    <p>для вашего бизнеса</p>
                </div>
                <Link className="header-greeting-button" to={customerLink}>Я заказчик</Link>
                <Link className="header-greeting-button" onClick={ () => fastProviderClick() } to={providerLink}>Я поставщик</Link>
            </div>
        </div>
)}

export default Greeting