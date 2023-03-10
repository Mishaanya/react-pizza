import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    activeCategory: 0,
    currentPage: 1,
    searchValue: '',
    sort: {
        sortProperty: 'rating',
        title: 'популярності'
    }
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategory(state, action) {
            state.activeCategory = action.payload
        },
        setSort(state, action) {
            state.sort = action.payload
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload
        },
        setSearchValue(state, action) {
            state.searchValue = action.payload
        },
        setFilters(state, action) {
            state.sort = action.payload.sort
            state.activeCategory = Number(action.payload.activeCategory)
            state.currentPage = Number(action.payload.currentPage)
        }
    }
})

export const {setCategory, setSort, setCurrentPage, setSearchValue, setFilters} = filterSlice.actions

export default filterSlice.reducer