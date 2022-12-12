import mocklogo from '../../static/logo.jpg'
import shCartImg from '../../static/shCart.svg'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useSelector } from 'react-redux'

export function UserCard({provider}){

    return(
        <Link to="/providerSite" className="card-userlink">
            <div className='card-container'>
                <img src={provider.photo}/>
                <div className="card-content-container">
                    <div className="card-title">{provider.name}</div>
                    <div className="card-location">{provider.city}</div>
                    <div className="card-description">{provider.description}</div>
                </div>
            </div>
        </Link>
)}


export function ProductCard({product, isProviderView}){
    const store = useSelector((state) => state.root)
    const navigate = useNavigate()

    const plusClick = () => {
        if(!store.isAuthorized){
            alert('Для добавления продукта необходима регистрация')
            navigate('/registration')
        }
    }

    const minusClick = () => {
        if(!store.isAuthorized){
            alert('Для добавления продукта необходима регистрация')
            navigate('/registration')
        }
    }

    return(
       <div className="card-container">
            <img src={product.photo}/>
            <div className="card-content-container">
                <div className="card-title">{product.name}</div>
                <div className="card-location">{product.cost + " р"}</div>
                <Link className="card-company" to="/somecompany">
                    <img src={product.provider.photo}/>
                    {product.provider.name}
                </Link>
                <div className="card-countProd">
                    { 
                        isProviderView ?
                        <button className="card-countButton minus">
                            <svg className='card-bt-minus' viewBox="0 0 15 15"><path d="M7.5,0C3.364,0,0,3.364,0,7.5S3.364,15,7.5,15S15,11.636,15,7.5S11.636,0,7.5,0z M7.5,14C3.916,14,1,11.084,1,7.5  S3.916,1,7.5,1S14,3.916,14,7.5S11.084,14,7.5,14z"/><rect height="1" width="8" x="3.5" y="7"/></svg>
                            <span className="card-bt-minus-text">Удалить товар</span>
                        </button>
                        :
                        <>
                        <button onClick={() => minusClick()} className="card-countButton minus">
                            <svg className='card-bt-minus' viewBox="0 0 15 15"><path d="M7.5,0C3.364,0,0,3.364,0,7.5S3.364,15,7.5,15S15,11.636,15,7.5S11.636,0,7.5,0z M7.5,14C3.916,14,1,11.084,1,7.5  S3.916,1,7.5,1S14,3.916,14,7.5S11.084,14,7.5,14z"/><rect height="1" width="8" x="3.5" y="7"/></svg>
                        </button>
                        <span className="card-count">0</span>
                        <button onClick={() => plusClick()} className="card-countButton plus">
                            <svg className='card-bt-plus' viewBox="0 0 15 15"><path d="M7.5,0C3.364,0,0,3.364,0,7.5S3.364,15,7.5,15S15,11.636,15,7.5S11.636,0,7.5,0z M7.5,14C3.916,14,1,11.084,1,7.5  S3.916,1,7.5,1S14,3.916,14,7.5S11.084,14,7.5,14z"/><polygon points="8,3.5 7,3.5 7,7 3.5,7 3.5,8 7,8 7,11.5 8,11.5 8,8 11.5,8 11.5,7 8,7 "/></svg>
                        </button>
                        </>
                    }
                </div>
            </div>
        </div>
)}

export function ShCartCard(props){

    const[isConfirmed, setIsConfirmed] = useState(true)

    return(
        <Link to="/shoppingCart" className="card-userlink">
            <div className='card-container'>
                <img src={shCartImg}/>
                <div className="card-content-container">
                    <div className="card-title">{"Корзина #" + props.id}</div>
                    {
                        isConfirmed ?
                            <div className="card-processing">Заказ обрабатывается</div> :
                            <div className="card-confirmed">Заказ принят</div>
                    }
                    <div className="card-description">
                        <p>{`Локация: ${props.location};`}</p>
                        <p>{`Дата: ${props.date}`}</p>
                    </div>
                </div>
            </div>
        </Link>
)}
