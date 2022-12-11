import { BrowserRouter, Route, Routes } from 'react-router-dom';


import { CustomersCategories, ProvidersCategories, ProductsCategories } from './components/categories'
import  { ProductsList, ProvidersList } from './components/cardlists'
import { Authorization, Registration } from './components/users/authentication'
import ShoppingCart from './components/users/shCart';
import StartPage from './components/startpage'
import Navigation from './components/navigation'
import Profile from './components/users/profile';
import { ProviderRegistration, ProductRegistration } from './components/providers/providerRegistration';
import ProviderSite from './components/providers/providerSite';
import ProviderOffers from './components/providers/providerOffers'


import { createContext, useState } from 'react';
export const fastProviderRegContext = createContext()

function App(){
    return(
        <BrowserRouter basename='/'>
            <Navigation />
            <Routes>
                <Route path='/' element={ <StartPage/> }/>
                <Route path='/providers/categories' element={ <ProvidersCategories/> } />
                <Route path='/customers/categories' element={ <CustomersCategories/> }/>
                <Route path='/products/categories' element={ <ProductsCategories/> }/>
                <Route path='/products' element={ <ProductsList titleVisability={true}/> }/>
                <Route path='/providers' element={ <ProvidersList/> }/>
                <Route path='/authorization' element={ <Authorization/> }/>
                <Route path='/registration' element={ <Registration/> }/>
                <Route path='/shoppingCart' element={ <ShoppingCart/> }/>
                <Route path='/profile' element={ <Profile/> }/>
                <Route path='/providerReg' element={ <ProviderRegistration/> }/>
                <Route path='/providerSite' element={ <ProviderSite/> }/>
                <Route path='/productReg' element={ <ProductRegistration/> }/>
                <Route path='/providerOffers' element={ <ProviderOffers/> }/>
            </Routes>
        </BrowserRouter>
)}

export default App