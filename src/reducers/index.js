const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: [],
    allHeroes: [],
    filterName: 'all'
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle',
                allHeroes: action.payload
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'DELETE_HERO':
            return {
                ...state,
                allHeroes: state.allHeroes.filter(item => item.id !== action.payload),
                heroes: state.heroes.filter(item => item.id !== action.payload)

            }
        case 'ADD_HERO':
            return {
                ...state,
                heroes: [...state.heroes, action.payload],
                allHeroes: [...state.allHeroes, action.payload]
            }
        case 'FILTERS_FETCHIMG':
            return {
                ...state,
                filters: action.payload
            }
        case 'SET_FILTER_NAME':
            return {
                ...state,
                filterName: action.payload,
                heroes: state.allHeroes.filter(item => item.element === action.payload)
            }
        case 'FILTER_ALL':
            return {
                ...state,
                filterName: 'all',
                heroes: state.allHeroes
            }
        default: return state
    }
}

export default reducer;