import React from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {setCategory} from '../redux/slices/filterSlice'

const Categories = () => {
    const value = useSelector((state) => state.filter.activeCategory)
    const dispatch = useDispatch()
    const categories = ['Всі', `М'ясні`, 'Вегетареанські', 'Гриль', 'Гострі', 'Закриті',]

    return (
        <div className="categories">
            <ul>
                {categories.map((category, i) => (
                    <li
                        className={value === i ? "active" : ''}
                        onClick={() => dispatch(setCategory(i))}
                        key={i}
                    >{category}</li>
                ))}
            </ul>
        </div>
    );
};

export default Categories;