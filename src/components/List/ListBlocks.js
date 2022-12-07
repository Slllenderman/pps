import { ProductCard, UserCard } from './cards'

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