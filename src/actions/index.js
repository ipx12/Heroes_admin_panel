import { createAction } from "@reduxjs/toolkit";

export const fetchHeroes = (request) => (dispatch) => {
    dispatch(heroesFetching());
    request("http://localhost:3001/heroes")
        .then(data => dispatch(heroesFetched(data)))
        .catch(() => dispatch(heroesFetchingError()))
}

export const fetchFilters = (request) => (dispatch) => {
    dispatch(filtersFetching());
    request("http://localhost:3001/filters")
            .then(data => dispatch(addFilters(data)))
            .catch(() => dispatch(heroesFetchingError()))
}

// export const heroesFetching = () => {
//     return {
//         type: 'HEROES_FETCHING'
//     }
// }

export const heroesFetching = createAction('HEROES_FETCHING');

// export const heroesFetched = (heroes) => {
//     return {
//         type: 'HEROES_FETCHED',
//         payload: heroes
//     }
// }

export const heroesFetched = createAction('HEROES_FETCHED')

// export const heroesFetchingError = () => {
//     return {
//         type: 'HEROES_FETCHING_ERROR'
//     }
// }

export const heroesFetchingError = createAction('HEROES_FETCHING_ERROR');

// export const heroDeleted = (id) => {
//     return {
//         type: 'DELETE_HERO',
//         payload: id
//     }
// }

export const heroDeleted = createAction('DELETE_HERO');

// export const addHero = (objNewHero) => {
//     return {
//         type: 'ADD_HERO',
//         payload: objNewHero
//     }
// }

export const addHero = createAction('ADD_HERO');

export const filtersFetching = () => {
    return {
        type: 'FILTERS_FETCHING',
    }
}

export const addFilters = (filters) => {
    return {
        type: 'FILTERS_FETCHED',
        payload: filters
    }
}

export const allFilter = () => {
    return {
        type: 'FILTER_ALL'
    }
}

export const setFilterName = (name) => {
    return {
        type: 'SET_FILTER_NAME',
        payload: name
    }
}

