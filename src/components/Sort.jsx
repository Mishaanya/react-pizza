import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setSort} from '../redux/slices/filterSlice'

export const fields = [
    {
        sortProperty: 'rating',
        title: 'популярності'
    },
    {
        sortProperty: 'price',
        title: 'ціні'
    },
    {
        sortProperty: 'title',
        title: 'алфавіту'
    },
]

const Sort = ({value, setValue}) => {
    const [isActive, setIsActive] = useState(false)
    const sortType = useSelector(state => state.filter.sort)
    const dispatch = useDispatch()
    const sortRef = useRef()

    const setSelectedItem = (obj) => {
        dispatch(setSort(obj))
        setIsActive(!isActive)
    }

    useEffect(() => {
        const handleClickOutside = ev => {
            if (!ev.composedPath().includes(sortRef.current)) {
                setIsActive(false)
            }
        }
        document.body.addEventListener('click', handleClickOutside)
        return () => document.body.removeEventListener('click', handleClickOutside)
    }, [])

    return (
        <div ref={sortRef} className="sort">
            <div className="sort__label">
                <b>▾ Сортування по:</b>
                <span onClick={() => setIsActive(!isActive)}>{sortType.title}</span>
            </div>
            {isActive && (
                <div className="sort__popup">
                    <ul>
                        {fields.map((obj, i) => (
                            <li
                                className={sortType.sortProperty === obj.sortProperty ? "active" : ""}
                                onClick={() => setSelectedItem(obj)}
                                key={i}
                            >{obj.title}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Sort;