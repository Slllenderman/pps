import { ShCardsList } from "../cardlists/ListBlocks"
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from "react"

function ProviderOffers(){
    const auth = useSelector((state) => state.root.isAuthorized)
    const navigate = useNavigate()
    useEffect(() => {if(!auth) navigate("/") }, [])
    return(
        <div className='profile-container'>
            <div className='profile-title'>Список заказов</div>
            <ShCardsList/>
        </div> 
)}

export default ProviderOffers