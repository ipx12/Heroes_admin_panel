const initialState = {
    filters: [],
    heroesLoadingStatus: 'idle',
    filterName: 'all'
}

const filters = (state = initialState, action) => {
    switch (action.type) {
        case 'FILTERS_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'FILTERS_FETCHED':
            return {
                ...state,
                filters: action.payload,
                heroesLoadingStatus: 'idle'
            }
        case 'SET_FILTER_NAME':
            return {
                ...state,
                filterName: action.payload
            }
        default: return state
    }
}

export default filters;