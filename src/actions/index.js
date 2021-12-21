export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}

export const deleteHero = (id) => {
    return {
        type: 'DELETE_HERO',
        payload: id
    }
}

export const addHero = (objNewHero) => {
    return {
        type: 'ADD_HERO',
        payload: objNewHero
    }
}

export const addFilters = (filters) => {
    return {
        type: 'FILTERS_FETCHIMG',
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