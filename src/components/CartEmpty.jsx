import React from 'react';
import {Link} from "react-router-dom";
import emptyCartPng  from '../../src/assets/img/empty-cart.png'


const CartEmpty = () => {
    return (
        <>
            <div className="cart cart--empty">
                <h2>Корзина пуста 😢</h2>
                <p>
                    Ти нічого не замовив! <br/>
                    Швиденько замовляй та повертайся:)
                </p>
                <img src={emptyCartPng} alt="Empty cart"/>
                <Link to ="/" className="button button--black">
                    <span>Повернутись назад</span>
                </Link>
            </div>
        </>
    );
};

export default CartEmpty;