import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {useHttp} from '../../hooks/http.hook';


const initialState = {
    filters: [],
    heroesLoadingStatus: 'idle',
    filterName: 'all'
}

export const fetchFilters = createAsyncThunk(
    'filters/fetchFilters',
    () => {
        const {request} = useHttp();
        return request("http://localhost:3001/filters")
    }
);

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setFilterName: (state, action) => {state.filterName = action.payload}
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFilters.pending, state => {state.heroesLoadingStatus = 'loading'})
            .addCase(fetchFilters.fulfilled, (state , action) => {
                state.heroesLoadingStatus = 'idle';
                state.filters = action.payload;
            })
            .addCase(fetchFilters.rejected, state => {state.heroesLoadingStatus = 'error'})
            .addDefaultCase(() => {})
    }
});

const {actions, reducer} = filterSlice;

export default reducer;
export const {
    filtersFetching,
    addFilters,
    setFilterName
} = actions