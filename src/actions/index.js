import {heroesFetchingError} from '../components/heroesList/heroesSlice';
import {addFilters, filtersFetching} from '../components/heroesFilters/filterSlice';


export const fetchFilters = (request) => (dispatch) => {
    dispatch(filtersFetching());
    request("http://localhost:3001/filters")
            .then(data => dispatch(addFilters(data)))
            .catch(() => dispatch(heroesFetchingError()))
}


