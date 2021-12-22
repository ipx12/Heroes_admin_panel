const initialState = {
    filters: [],
    filterName: 'all'
}

const filters = (state = initialState, action) => {
    switch (action.type) {
        case 'FILTERS_FETCHIMG':
            return {
                ...state,
                filters: action.payload
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