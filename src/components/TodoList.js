import React, { useState, useContext, useEffect, createContext } from 'react'
import { Button, Col, Container, List, Row } from 'reactstrap';
import { ListContext } from '../App';
import TaskCard from './TaskCard'
import CreateTask from '../modal/CreateTask';

export const modalContext = createContext();

export default function TodoList() {

    const [modal, setModal] = useState(false)
    const toggle = () => { setModal(!modal); }

    const { allTask, setAllTasks } = useContext(ListContext);

    function saveTask(newTask) {
        setModal(false);
        let temp = [...allTask, newTask];
        setAllTasks(temp);
    }

    //saving data to localStorage
    useEffect(() => {
        localStorage.setItem('task', JSON.stringify(allTask));
    }, [allTask])

    return (
        <>
            <div className='header text-center'>
                <h1>To - Do</h1>
                <Button className='create'
                    color="light"
                    outline
                    onClick={() => { setModal(true) }}
                ><b>create to-do</b></Button>
            </div>
            <div>
                <div className="tasks">
                    <CreateTask toggle={toggle} modal={modal} saveTask={saveTask} />
                </div>
            </div>

            <Container>

                <Row xs="1" md="1" className='card-row'>

                    {allTask?.map((obj, index) => {
                        {/* console.log(obj.Title); */ }
                        {/* { alert(obj?.Items.length) } */ }
                        return (
                            <Col>
                                <modalContext.Provider value={{ modal, setModal, toggle }}>
                                    <TaskCard key={index} Title={obj?.Title} List={obj?.Items} id={index} date={obj?.date} due={obj?.due} ListLength={obj?.Items.length} isDone={obj.done} />
                                </modalContext.Provider>

                            </Col>
                        )
                    })}
                </Row>
            </Container>

        </>
    )
}
