import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    filters: [],
    heroesLoadingStatus: 'idle',
    filterName: 'all'
}

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        filtersFetching: state => {state.heroesLoadingStatus = 'loading'},
        addFilters: (state , action) => {
            state.heroesLoadingStatus = 'idle';
            state.filters = action.payload;
        },
        setFilterName: (state, action) => {state.filterName = action.payload}
    }
});

const {actions, reducer} = filterSlice;

export default reducer;
export const {
    filtersFetching,
    addFilters,
    setFilterName
} = actions