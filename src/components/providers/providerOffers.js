import { ShoppingCartsList } from "../cardlists"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from "react"

function ProviderOffers(){
    const auth = useSelector((state) => state.user.isAuthorized)
    const navigate = useNavigate()
    useEffect(() => {if(!auth) navigate("/") }, [])
    return(
        <div className='profile-container'>
            <div className='profile-title'>Список заказов</div>
            <ShoppingCartsList titleVisability={true}/>
        </div> 
)}

export default ProviderOffers