import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import debounce from 'lodash.debounce'
import styles from './Search.module.scss'
import searchSvg from '../../assets/img/search.svg'
import closeSvg from '../../assets/img/close.svg'
import {setSearchValue} from '../../redux/slices/filterSlice'
import {useDispatch} from "react-redux";

const Search = () => {
    const [value, setValue] = useState('')
    const dispatch = useDispatch()
    const inputRef = useRef()

    const onClickClear = () => {
        setValue('')
        dispatch(setSearchValue(''))
        inputRef.current.focus()
    }

    const updataSearchValue = useCallback(
        debounce((str) => {
            dispatch(setSearchValue(str))
        }, 500),
        []
    )

    const onChangeInput = value => {
        setValue(value)
        updataSearchValue(value)
    }

    return (
        <div className={styles.root}>
            <img className={styles.searchIcon} src={searchSvg} alt="Search icon"/>
            <input
                ref={inputRef}
                className={styles.input}
                value={value}
                onChange={(e) => onChangeInput(e.target.value)}
                placeholder='Пошук піци...'/>

            {value && <img
                className={styles.closeIcon}
                onClick={onClickClear}
                src={closeSvg}
                alt="Close icon"/>}
        </div>
    );
};

export default Search;