import { useHttp } from "../../hooks/http.hook";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from "react";
import { useState } from "react";

import { useCreateHeroMutation } from "../../api/apiSlice";



// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {

    const [createHero] = useCreateHeroMutation();

    const {request} = useHttp();
    const [elements, setElements] = useState([])

    const getElements = () => {
        request(`http://localhost:3001/filters`)
            .then(setElements)
            .catch(() => new Error('error'));


    }

    useEffect(() => {
        getElements();
        // eslint-disable-next-line
    }, [])

    const renderElements = (arr) => {
        return arr.map(element => (<option key={uuidv4()} value={element.name}>{element.name}</option>))
    }

    const items = renderElements(elements)

    return (
        <Formik 
            initialValues={{
                id: '',
                name: '',
                description: '',
                element: ''
            }}
            onSubmit={(values, {resetForm}) => {
                values.id = uuidv4();
                createHero(values).unwrap()
                setTimeout(() => resetForm({
                    id: '',
                    name: '',
                    description: '',
                    element: ''
                }), 1000)
                
            }}>
            <Form className="border p-4 shadow-lg rounded">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                    <Field 
                        required
                        type="text" 
                        name="name" 
                        className="form-control" 
                        id="name" 
                        placeholder="Как меня зовут?"/>
                    <ErrorMessage className="error" name="name"/>
                </div>
                
                <div className="mb-3">
                    <label htmlFor="text" className="form-label fs-4">Описание</label>
                    <Field
                        required
                        name="description" 
                        className="form-control" 
                        id="text" 
                        placeholder="Что я умею?"
                        style={{"height": '130px'}}
                        as="textarea"/>
                </div>

                <div className="mb-3">
                    <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                    <Field 
                        required
                        className="form-select" 
                        id="element" 
                        name="element"
                        as='select'>
                        <option >Я владею элементом...</option>
                        {items}
                    </Field>
                </div>

                <button type="submit" className="btn btn-primary">Создать</button>
            </Form>
        </Formik>
    )
}

export default HeroesAddForm;