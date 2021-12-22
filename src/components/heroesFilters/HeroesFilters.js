import {useHttp} from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addFilters, setFilterName} from '../../actions';
import { v4 as uuidv4 } from 'uuid';
import classNames from 'classnames/bind';



// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {

    const {filters, filterName} = useSelector(state => state.filters);
    const {request} = useHttp();
    const dispatch = useDispatch();

    useEffect(() => {

        request("http://localhost:3001/filters")
            .then(data => dispatch(addFilters(data)))
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