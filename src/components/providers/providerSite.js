import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { ProductsList } from "../cardlists"
import axios from "axios"
import { useSelector } from "react-redux"
import mock from '../../static/box.png'

function ProviderSite(){
    const navigate = useNavigate()
    const providerId = useSelector((state) => state.user.provider)
    const[isProviderView, setProviderView] = useState(false)
    const[params, setParams] = useSearchParams()
    const[products, setProducts] = useState([])
    const[provider, setProvider] = useState({
        name : '',
        location : '',
        description : '',
        photo : ''
    })

    useEffect(() => {
        const provider = params.get('providerName')
        setProviderView(providerId == params.get('provider'))
        axios.get(`/providers?name=${provider}`).then(response => {
            setProvider({
                name : response.data[0].name,
                location : response.data[0].location,
                description : response.data[0].description,
                photo : response.data[0].photo
            })
        })
    }, [])

    return(
        <div>
            <div className="card-provider">
                <div className='card-container'>
                    <img src={provider.photo ? provider.photo : mock}/>
                    <div className="card-content-container">
                        <div className="card-title">{provider.name}</div>
                        <div className="card-location">{provider.location}</div>
                        <div className="card-description">{provider.description}</div>
                    </div>
                </div>
                    { isProviderView ?
                    <div className="card-countProd"> 
                        <Link to={`/productReg?provider=${params.get('provider')}`} className="card-countButton">
                            <svg className="card-bt-plus" viewBox="0 0 15 15"><path d="M7.5,0C3.364,0,0,3.364,0,7.5S3.364,15,7.5,15S15,11.636,15,7.5S11.636,0,7.5,0z M7.5,14C3.916,14,1,11.084,1,7.5  S3.916,1,7.5,1S14,3.916,14,7.5S11.084,14,7.5,14z"/><polygon points="8,3.5 7,3.5 7,7 3.5,7 3.5,8 7,8 7,11.5 8,11.5 8,8 11.5,8 11.5,7 8,7 "/></svg>
                            <span className="card-bt-plus-text">Добавить продукт</span>
                        </Link>
                        <button className="card-shCarts" onClick={() => navigate(`/providerOffers?provider=${providerId}`)}>Посмотреть заказы</button>
                    </div> : ""
                    }
            </div>
            <div>
                <ProductsList providerView={isProviderView} products={products}/>
            </div>
        </div>
)}

export default ProviderSite