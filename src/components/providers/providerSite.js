import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { ProductsList } from "../cardlists"
import logo from '../../static/logo.jpg'

function ProviderSite(){

    const[isProviderView, setProviderView] = useState(true)
    const navigate = useNavigate()

    return(
        <div>
            <div className="card-provider">
                <div className='card-container'>
                    <img src={logo}/>
                    <div className="card-content-container">
                        <div className="card-title">"Пятёрочка"</div>
                        <div className="card-location">Москва</div>
                        <div className="card-description">Описание</div>
                    </div>
                </div>
                    { isProviderView ?
                    <div className="card-countProd"> 
                        <Link to="/productReg" className="card-countButton">
                            <svg className="card-bt-plus" viewBox="0 0 15 15"><path d="M7.5,0C3.364,0,0,3.364,0,7.5S3.364,15,7.5,15S15,11.636,15,7.5S11.636,0,7.5,0z M7.5,14C3.916,14,1,11.084,1,7.5  S3.916,1,7.5,1S14,3.916,14,7.5S11.084,14,7.5,14z"/><polygon points="8,3.5 7,3.5 7,7 3.5,7 3.5,8 7,8 7,11.5 8,11.5 8,8 11.5,8 11.5,7 8,7 "/></svg>
                            <span className="card-bt-plus-text">Добавить продукт</span>
                        </Link>
                        <button className="card-shCarts" onClick={() => navigate("/providerOffers")}>Посмотреть заказы</button>
                    </div> : ""
                    }
            </div>
            <div>
                <ProductsList providerView={isProviderView}/>
            </div>
        </div>
)}

export default ProviderSite