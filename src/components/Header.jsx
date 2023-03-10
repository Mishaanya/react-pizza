import React from 'react';
import logoPng from '../assets/img/true-pizza-logo.png'
import cartSvg from '../assets/img/cart.svg'
import {Link} from "react-router-dom";
import Search from "../components/Search";
import {useSelector} from "react-redux";

const Header = () => {
    const {items, totalPrice} = useSelector((state) => state.cart)

    const totalCount = items.reduce((sum, obj) => obj.count + sum, 0)

    return (
        <div className="header">
            <div className="container">
                <div className="link-wrapper">
                    <Link to="/">
                        <div className="header__logo">
                            <img width="48" src={logoPng} alt="Pizza logo"/>
                            <div>
                                <h1>Pizza u Mishelio </h1>
                                <p>сама смачна піца у всесвіті</p>
                            </div>
                        </div>
                    </Link>
                    <Search/>
                </div>

                <div className="header__cart">
                    <Link to="/cart" className="button button--cart">
                        <span>{totalPrice} грн.</span>
                        <div className="button__delimiter"></div>
                        <img className="button__logo" width="18" src={cartSvg} alt="Cart logo"/>
                        <span>{totalCount}</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Header;