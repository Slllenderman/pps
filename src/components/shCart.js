import { ProductsCardsList } from '../components/List/ListBlocks'

function ShoppingCart(){
    return(
        <>
        <div className="shCart-container">
            <div className="shCart-title">
                <svg className="header-navigation-rightpart-image" viewBox="0 0 459.529 459.529"><g><g><path d="M17,55.231h48.733l69.417,251.033c1.983,7.367,8.783,12.467,16.433,12.467h213.35c6.8,0,12.75-3.967,15.583-10.2l77.633-178.5c2.267-5.383,1.7-11.333-1.417-16.15c-3.117-4.817-8.5-7.65-14.167-7.65H206.833c-9.35,0-17,7.65-17,17s7.65,17,17,17H416.5l-62.9,144.5H164.333L94.917,33.698c-1.983-7.367-8.783-12.467-16.433-12.467H17c-9.35,0-17,7.65-17,17S7.65,55.231,17,55.231z"/><path d="M135.433,438.298c21.25,0,38.533-17.283,38.533-38.533s-17.283-38.533-38.533-38.533S96.9,378.514,96.9,399.764S114.183,438.298,135.433,438.298z"/><path d="M376.267,438.298c0.85,0,1.983,0,2.833,0c10.2-0.85,19.55-5.383,26.35-13.317c6.8-7.65,9.917-17.567,9.35-28.05c-1.417-20.967-19.833-37.117-41.083-35.7c-21.25,1.417-37.117,20.117-35.7,41.083C339.433,422.431,356.15,438.298,376.267,438.298z"/></g></g></svg>
                Заполняемая корзина
            </div>
            <div className="shCart-label">Дата доставки</div>
            <input className="shCart-textBlock" type="text"/>
            <div className="shCart-label">Место доставки</div>
            <div className="shCart-grid">
                <input className="shCart-textBlock" type="text"/>
                <button className="shCart-confirm"><span>Принять</span></button>
            </div>
            <ProductsCardsList/>
        </div>
        </>
)}

export default ShoppingCart