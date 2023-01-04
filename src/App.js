import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie'
import { ThroughProvider } from 'react-through'

import { ProvidersCategories, ProductsCategories } from './components/categories'
import { Product } from './components/providers/productSite';
import  { ProductsList, ProvidersList, ProviderOffersList } from './components/cardlists'
import { Authorization, Registration } from './components/users/authentication'
import { ShoppingCart, ShoppingCartView } from './components/users/shCart';
import StartPage from './components/startpage'
import Navigation from './components/navigation'
import Profile from './components/users/profile';
import { ProviderRegistration, ProductRegistration } from './components/providers/providerRegistration';
import ProviderSite from './components/providers/providerSite';
import Store from './redux'

function App(){
    return(
        <CookiesProvider>
            <ThroughProvider>
                <Provider store={Store}>
                    <BrowserRouter basename='/'>
                        <Navigation />
                        <Routes>
                            <Route name="" path='/' element={ <StartPage/> }/>
                            <Route name="Поставщики" path='/providers/categories' element={ <ProvidersCategories/> } />
                            <Route path='/products/categories' element={ <ProductsCategories/> }/>
                            <Route path='/products' element={ <ProductsList titleVisability={true}/> }/>
                            <Route path='/providers' element={ <ProvidersList/> }/>
                            <Route path='/authorization' element={ <Authorization/> }/>
                            <Route path='/registration' element={ <Registration/> }/>
                            <Route path='/shoppingCart' element={ <ShoppingCart/> }/>
                            <Route path='/shoppingCartView' element={ <ShoppingCartView/> }/>
                            <Route path='/profile' element={ <Profile/> }/>
                            <Route path='/providerReg' element={ <ProviderRegistration/> }/>
                            <Route path='/providerSite' element={ <ProviderSite/> }/>
                            <Route path='/productReg' element={ <ProductRegistration/> }/>
                            <Route path='/providerOffers' element={ <ProviderOffersList/> }/>
                            <Route path='/productSite' element={ <Product/> }/>
                        </Routes>
                    </BrowserRouter>
                </Provider>
            </ThroughProvider>
        </CookiesProvider>
)}

export default App