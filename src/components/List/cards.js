import mocklogo from '../../imgs/logo.jpg'
import shCartImg from '../../imgs/shCart.svg'
import { Link } from 'react-router-dom'

export function UserCard(props){
    return(
        <Link to="/provider" className="card-userlink">
            <div className='card-container'>
                <img src={mocklogo}/>
                <div className="card-content-container">
                    <div className="card-title">{props.title}</div>
                    <div className="card-location">{props.location}</div>
                    <div className="card-description">{props.description}</div>
                </div>
            </div>
        </Link>
)}


export function ProductCard(props){
    return(
       <div className="card-container">
            <img src={mocklogo}/>
            <div className="card-content-container">
                <div className="card-title">{props.title}</div>
                <div className="card-location">{props.price + " р"}</div>
                <Link className="card-company" to="/somecompany">
                    <img src={mocklogo}/>
                    {props.provname}
                </Link>
                <div className="card-countProd">
                    <button className="card-countButton">
                        <svg viewBox="0 0 15 15"><path d="M7.5,0C3.364,0,0,3.364,0,7.5S3.364,15,7.5,15S15,11.636,15,7.5S11.636,0,7.5,0z M7.5,14C3.916,14,1,11.084,1,7.5  S3.916,1,7.5,1S14,3.916,14,7.5S11.084,14,7.5,14z"/><rect height="1" width="8" x="3.5" y="7"/></svg>
                    </button>
                    <span className="card-count">0</span>
                    <button className="card-countButton">
                        <svg viewBox="0 0 15 15"><path d="M7.5,0C3.364,0,0,3.364,0,7.5S3.364,15,7.5,15S15,11.636,15,7.5S11.636,0,7.5,0z M7.5,14C3.916,14,1,11.084,1,7.5  S3.916,1,7.5,1S14,3.916,14,7.5S11.084,14,7.5,14z"/><polygon points="8,3.5 7,3.5 7,7 3.5,7 3.5,8 7,8 7,11.5 8,11.5 8,8 11.5,8 11.5,7 8,7 "/></svg>
                    </button>
                </div>
            </div>
        </div>
)}

export function ShCartCard(props){
    return(
        <Link to="/shoppingCart" className="card-userlink">
            <div className='card-container'>
                <img src={shCartImg}/>
                <div className="card-content-container">
                    <div className="card-title">{"Корзина #" + props.id}</div>
                    <div className="card-location">{`Общая сумма ${props.sum} р`}</div>
                    <div className="card-description">
                        <p>{`Локация: ${props.location};`}</p>
                        <p>{`Дата: ${props.date}`}</p>
                    </div>
                </div>
            </div>
        </Link>
)}
