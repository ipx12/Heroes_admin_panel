import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { useGetHeroesQuery, useDeleteHeroMutation } from '../../api/apiSlice';

import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

import './heroesList.scss';

const HeroesList = () => {

    const {
        data: heroes = [], 
        isLoading,
        isError,
    } = useGetHeroesQuery();

    const [deleteHero] = useDeleteHeroMutation();

    const activeFilter = useSelector(state => state.filters.filterName);

    const filtrerdHeroes =  useMemo(() => {
        const filtrerdHeroes = heroes.slice();

        if (activeFilter === 'all') {
            return filtrerdHeroes;
        } else {
            return filtrerdHeroes.filter(item => item.element === activeFilter)
        }
    }, [heroes, activeFilter]);

    const onDelete = (id) => {
        deleteHero(id)
    };

    if (isLoading) {
        return <Spinner/>;
    } else if (isError) {
        return (<CSSTransition
                    timeout={0}
                    classNames="hero">
                    <h5 className="text-center mt-5">Ошибка загрузки</h5>
                 </CSSTransition>
        )
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return (
                <CSSTransition
                    timeout={0}
                    classNames="hero">
                    <h5 className="text-center mt-5">Героев пока нет</h5>
                </CSSTransition>
            )
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