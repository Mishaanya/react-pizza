import React from 'react';
import {Link} from "react-router-dom";
import cartDarkSvg from '../assets/img/cart-dark.svg'
import trashDarkSvg from '../assets/img/trash.svg'
import {useDispatch, useSelector} from "react-redux";
import CartItem from '../components/CartItem'
import CartEmpty from '../components/CartEmpty'
import {clearItems} from '../redux/slices/cartSlice'

const Cart = () => {
    const dispatch = useDispatch()
    const {totalPrice, items} = useSelector(state => state.cart)
    const totalCount = items.reduce((sum, obj) => obj.count + sum, 0)

    const cartClear = () => {
        if (window.confirm('Взагалі не голодний?'))
            dispatch(clearItems())
    }

    if (!totalCount) {
        return <CartEmpty/>
    }

    return (
        <div className="container container--cart">
            <div className="cart">
                <div className="cart__top">
                    <h2 className="content__title">
                        <img width="48" src={cartDarkSvg} alt="Cart logo"/>
                        Корзина
                    </h2>
                    <div onClick={cartClear} className="cart__clear">
                        <img width="20" src={trashDarkSvg} alt="Cart logo"/>
                        <span>Очистити корзину</span>
                    </div>
                </div>
                <div className="content__items">
                    {items.map((item, i) => (
                        <CartItem key={i} {...item}/>
                    ))}
                </div>
                <div className="cart__bottom">
                    <div className="cart__bottom-details">
                        <span> Всього піц: <b>{totalCount}</b> </span>
                        <span> Сума заказу: <b>{totalPrice} грн.</b> </span>
                    </div>
                    <div className="cart__bottom-buttons">
                        <Link to="/" className="button button--outline button--add go-back-btn">
                            <svg width="8" height="14" viewBox="0 0 8 14" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 13L1 6.93015L6.86175 1" stroke="#D3D3D3" strokeWidth="1.5"
                                      strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>

                            <span>Повернутись назад</span>
                        </Link>
                        <div className="button pay-btn">
                            <span>Оплатити зараз</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;