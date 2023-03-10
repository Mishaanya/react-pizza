import React, {useContext, useEffect, useRef, useState} from 'react';
import qs from 'qs'
import {useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";
import {setFilters} from '../redux/slices/filterSlice.js'
import {fields} from '../components/Sort'

const Home = () => {
    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isSearch = useRef(false)
    const isMounted = useRef(false)

    const {activeCategory, currentPage, searchValue, sort} = useSelector(state => state.filter)

    const fetchPizzas = () => {
        setIsLoading(true)

        const category = activeCategory > 0 ? `category=${activeCategory}` : ''
        const sortType = sort.sortProperty
        const order = sortType === 'rating' ? 'desc' : 'esc'
        const search = searchValue ? `&search${searchValue}` : ''

        axios
            .get(`https://63ecbb6c32a0811723a0d1c7.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortType}&order=${order}`)
            .then(res => {
                setItems(res.data)
                setIsLoading(false)
            })
    }

    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1))
            const sort = fields.find(obj => obj.sortProperty === params.sortProperty)

            dispatch(
                setFilters({
                    ...params,
                    sort,
                })
            )
            isSearch.current = true
        }
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0)

        if (!isSearch.current) {
            fetchPizzas()
        }

        isSearch.current = false
    }, [activeCategory, sort, searchValue, currentPage])

    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sort.sortProperty,
                activeCategory,
                currentPage
            }, {addQueryPrefix: true})

            navigate(queryString)
        }
        isMounted.current = true
    }, [activeCategory, sort, searchValue, currentPage])

    const filtredPizzas = items
        .filter(obj => obj.title.toLowerCase().includes(searchValue.toLowerCase()))
        .map((pizza, i) => <PizzaBlock {...pizza} key={i}/>)
    const skeletons = [...new Array(4)].map((_, i) => <Skeleton key={i}/>)

    return (
        <div className="container">
            <div className="content__top">
                <Categories/>
                <Sort/>
            </div>
            <h2 className="content__title">Всі піци</h2>
            <div className="content__items">
                {isLoading ? skeletons : filtredPizzas}
            </div>
            <Pagination currentPage={currentPage}/>
        </div>
    );
};

export default Home;