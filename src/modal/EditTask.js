import React, { useEffect } from 'react'
import { useContext, useState } from 'react';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import { ListContext } from '../App';


export default function EditTask({ Title, taskList, setTaskList, modal, toggle, updateCard, due }) {

    const { input, setInput } = useContext(ListContext);
    // const { toggle, modal } = useContext(modalContext);
    const [icon, setIcon] = useState(true);
    const [title, setTitle] = useState(Title);
    const [edited, setEdited] = useState(null)
    const [dueDate, setDueDate] = useState(due)

    // const [editedDate, setEditedDate] = useState(null)
    // setTaskList(List);
    // console.log(Title);
    // console.log("List", taskList);
    let n = 1;

    const addItem = () => {
        if (!input) {
        }
        else if (input && !icon) {    //for edited item
            setTaskList(taskList.map((element) => {
                if (element.id === edited) {
                    return { ...element, name: input }
                }
                return element;
            }))
            setIcon(true);
            setInput('');
            setEdited(null);
        }
        else {
            const newItem = {
                id: new Date().getTime().toString(),
                name: input
            }
            setTaskList([...taskList, newItem]);
            setInput('');
        }
    }

    const editItem = (id) => {
        let newItem = taskList.find((element) => {
            return element.id === id;
        })
        setIcon(false);
        setInput(newItem.name);
        setEdited(id);
    }
    const deleteItem = (id) => {
        const newArr = taskList.filter((element) => {
            return element.id !== id
        })
        setTaskList(newArr);
        setInput('');
        setIcon(true);
    }

    const update = () => {

        // let taskObj = {};
        // taskObj['Title'] = title;
        // taskObj['Items'] = taskList;
        // taskObj['date'] = date;
        // let d = new Date(dueDate)
        // console.log('date :>> ', date);
        // d > date ? alert("due date is not valid") : taskObj['due'] = `${d.toDateString()}`;

        // updateCard(taskObj, date);

        let date = new Date();
        let d = new Date(dueDate);
        // console.log('dueDate :>> ', dueDate);
        // console.log('d :>> ', d);
        // console.log('date :>> ', date);
        // d < date ? console.log("yess") : console.log("nooo")
        // let x = d.getDate() < date.getDate() && d.getMonth() < date.getMonth() && d.getFullYear() < date.getFullYear();

        if (d < date) {
            alert("due date is not valid");
        }
        else {
            let taskObj = {};
            taskObj['Title'] = title;
            taskObj['Items'] = taskList;
            taskObj['date'] = `${date.toLocaleTimeString()}, ${date.toDateString()} `;
            taskObj['due'] = `${d.toDateString()}`;

            updateCard(taskObj);
            // setTitle('');
            // setTaskList([]);
            // setDueDate(new Date());
        }


    }

    useEffect(() => {
        setTaskList(taskList);
    }, [])
    // console.log("edit : ", dueDate);
    return (
        <div>
            <Modal isOpen={modal} toggle={toggle} scrollable={true}>
                <ModalHeader toggle={toggle}>Update Task</ModalHeader>
                <ModalBody>
                    <form>

                        <input type="text" placeholder='Task Title...' className='enterTitle' value={title} onChange={(e) => { setTitle(e?.target?.value) }} />
                        <div className="due">
                            <small>
                                <b>Set Due Date :&nbsp;&nbsp;&nbsp;</b>
                                <input type="date" value={dueDate} onChange={(e) => setDueDate(e?.target?.value)} style={{ 'border': 'none' }} />
                            </small>
                        </div>
                        <div className="list">
                            <b align="center" className='my-3'>Update Your List</b>

                            <div className='add'>
                                <input type="text" className='enterItem' placeholder='✍️ add item' value={input} onChange={(e) => { setInput(e?.target?.value) }} />
                                {
                                    icon ? <i className="fa plus add-btn plusBtn" onClick={addItem}><h3>+</h3></i>
                                        : <b className="fa edit add-btn plusBtn" onClick={addItem}>✅</b>
                                }
                            </div>
                        </div>

                        <div className="showItems">
                            {
                                taskList.map((element) => {
                                    return (
                                        <div className="eachItem" key={element?.id}>
                                            <h5>&nbsp;&nbsp;
                                                <div id='id'><b>{n++}&nbsp;.</b></div>
                                                <div id='name'>{element?.name}</div>
                                            </h5>
                                            <div className="todo-btn">
                                                &nbsp;
                                                <b onClick={() => editItem(element?.id)}>📝</b>&nbsp;
                                                <b onClick={() => deleteItem(element?.id)}>🗑️</b>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            {/* {console.log(title)} */}

                        </div>

                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={update}>Update</Button>
                    <Button color="danger" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}
