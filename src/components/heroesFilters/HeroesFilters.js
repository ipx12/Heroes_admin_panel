import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setFilterName, fetchFilters } from './filterSlice'
import { v4 as uuidv4 } from 'uuid';
import classNames from 'classnames/bind';

const HeroesFilters = () => {

    const {filters, filterName} = useSelector(state => state.filters);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFilters());
        // eslint-disable-next-line
    }, []);

    const renderFilters = (arr) => {
        return arr.map(item => {
            const activeClass = classNames({
                'active': item.name === filterName
            });
            return <button onClick={() => dispatch(setFilterName(item.name))} 
                key={uuidv4()} 
                className={`${item.className} ${activeClass}`}>{item.name}</button>
        })
    }

    const filterItems = renderFilters(filters);

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {filterItems}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;