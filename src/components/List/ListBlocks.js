import { ProductCard, UserCard, ShCartCard } from './cards'

export function ProductsCardsList(){
    return (
        <>
        <ProductCard title="Молоко Пятёрочка" price="89" provname="Пятёрочка"/>
        <ProductCard title="Молоко Пятёрочка" price="89" provname="Пятёрочка"/>
        <ProductCard title="Молоко Пятёрочка" price="89" provname="Пятёрочка"/>
        </>
)}

export function UsersCardsList(){
    return (
        <>
        <UserCard title="Пятёрочка" location="Россия, Москва" description="Описание"/>
        <UserCard title="Пятёрочка" location="Россия, Москва" description="Описание"/>
        <UserCard title="Пятёрочка" location="Россия, Москва" description="Описание"/>
        </>
)}

export function ShCardsList(){
    return(
        <>
        <ShCartCard id="1" location="Мытищи" sum="300000" date="15.12.2022"/>
        <ShCartCard id="1" location="Мытищи" sum="300000" date="15.12.2022"/>
        <ShCartCard id="1" location="Мытищи" sum="300000" date="15.12.2022"/>
        </>
)}