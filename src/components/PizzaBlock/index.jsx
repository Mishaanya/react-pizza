import React, {useEffect, useState} from 'react';
import plusSvg from "../../assets/img/plus.svg"
import {useDispatch, useSelector} from "react-redux";
import {addItem} from '../../redux/slices/cartSlice'

const PizzaBlock = ({id, title, imageUrl, price, sizes, types}) => {

    const dispatch = useDispatch()
    const [activeSize, setActiveSize] = useState(0)
    const [activeType, setActiveType] = useState(0)
    const cartItems = useSelector(state => state.cart.items)
    const cartItem = cartItems.find(obj => obj.id === id)
    const [count, setCount] = useState(0)
    const typeNames = ['тонке', 'традиційне']

    const itemCount = () => {
        const findItem = cartItems.find(obj =>
            obj.id === id &&
            obj.type === typeNames[activeType] &&
            obj.size === sizes[activeSize])
        if (!findItem) {
            return 0
        }
        return findItem.count
    }

    useEffect(() => {
        if (cartItem) {
            setCount(itemCount())
        }
    }, [activeType, activeSize])

    const onClickAdd = () => {
        const item = {
            id,
            title,
            price,
            imageUrl,
            type: typeNames[activeType],
            size: sizes[activeSize],
        }
        dispatch(addItem(item))
        setCount(count + 1)
    }

    return (
        <div className="pizza-block">
            <img
                className="pizza-block__image"
                src={imageUrl}
                alt="Pizza"
            />
            <h4 className="pizza-block__title">{title}</h4>
            <div className="pizza-block__selector">
                <ul>
                    {types.map((typeId, i) => (
                        <li
                            className={activeType === i ? "active" : ""}
                            onClick={() => setActiveType(typeId)}
                            key={typeId}
                        >{typeNames[typeId]}</li>
                    ))}
                </ul>
                <ul>
                    {sizes.map((size, i) => (
                        <li
                            className={activeSize === i ? "active" : ""}
                            onClick={() => setActiveSize(i)}
                            key={i}
                        >{size} cм.</li>
                    ))}
                </ul>
            </div>
            <div className="pizza-block__bottom">
                <div className="pizza-block__price">від {price} грн.</div>
                <button onClick={onClickAdd} className="button button--outline button--add">
                    <img className="plus-logo" width="12" src={plusSvg} alt="Pizza logo"/>
                    <span>Додати</span>
                    {count > 0 && <i>{count}</i>}
                </button>
            </div>
        </div>
    );
};

export default PizzaBlock;