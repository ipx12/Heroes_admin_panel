import {useHttp} from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { heroDeleted, fetchHeroes, filteredHeroesSelector } from './heroesSlice';

import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

import './heroesList.scss';

const HeroesList = () => {
    const filtrerdHeroes = useSelector(filteredHeroesSelector)
    const {heroesLoadingStatus} = useSelector(state => state.heroes.heroesLoadingStatus);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(fetchHeroes());
        // eslint-disable-next-line
    }, []);

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const onDelete = (id) => {
        request(`http://localhost:3001/heroes/${id}`, "DELETE")
            .then(data => console.log(data, 'Deleted'))
            .then(dispatch(heroDeleted(id)))
            .catch(err => console.log(err));
        // eslint-disable-next-line  
    }

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        console.log(heroesLoadingStatus)
        return (<CSSTransition
                    timeout={0}
                    classNames="hero">
                    <h5 className="text-center mt-5">Ошибка загрузки</h5>
                 </CSSTransition>
        )
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            <CSSTransition
                timeout={0}
                classNames="hero">
                <h5 className="text-center mt-5">Героев пока нет</h5>
            </CSSTransition>
        }

        return arr.map(({id, ...props}) => {
            return (
                <CSSTransition
                    timeout={500}
                    classNames="hero"
                    key={id}>
                    <HeroesListItem {...props} onDelete={() => onDelete(id)}/>
                </CSSTransition>
            )
        })
    }

    const elements = renderHeroesList(filtrerdHeroes);
    return (
        <TransitionGroup component="ul">
            {elements}
        </TransitionGroup>
    )
}

export default HeroesList;