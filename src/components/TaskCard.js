import React, { useContext, useState, useEffect } from 'react';
import { Card, CardHeader, CardFooter, CardBody, Button } from 'reactstrap';
import jsPDF from 'jspdf'
import { ListContext } from '../App';
import EditTask from '../modal/EditTask';
import missionPassed from '../asset/mission-passed.png'
import logicWind from '../asset/logicwing.png'

const TaskCard = ({ Title, List, date, due, id, ListLength, isDone }) => {
    let curr = new Date();
    let du = new Date(due);
    // console.log('curr :>> ', curr);
    // console.log('due :>> ', due);
    // let da = new Date(date);
    // console.log('da :>> ', da);
    // console.log('du :>> ', du);
    const { allTask, setAllTasks } = useContext(ListContext);
    let c = 0, n, m;
    console.log('isDone :>> ', isDone);
    const [modal, setModal] = useState(false);
    const toggle = () => { setModal(!modal); }
    const [taskList, setTaskList] = useState(List);
    const [checked, setChecked] = useState(false);
    const [count, setCount] = useState(1)
    const [dateID, setDateID] = useState('');
    const [itemId, setItemId] = useState('');
    const [done, setDone] = useState(isDone);
    const [completeTime, setCompleteTime] = useState('')
    console.log('due :>> ', due);
    const colors = [
        {
            primaryColor: "#73adff",
            secondaryColor: "#ECF3FC"
        },
        {
            primaryColor: "#F9D288",
            secondaryColor: "#FEFAF1"
        },
        {
            primaryColor: "#5DC250",
            secondaryColor: "#F2FAF1"
        },
        {
            primaryColor: "#F48687",
            secondaryColor: "#FDF1F1"
        },
        {
            primaryColor: "#B964F7",
            secondaryColor: "#F3F0FD"
        }
    ]

    const generatePDF = () => {
        setDone(true)
        let yes = window.confirm("Do you want to download acknowledgement?");
        if (yes) {
            var doc = new jsPDF('p', 'pt');

            doc.text(230, 60, `Title : ${Title}`)
            // doc.text(x, y, string or array)
            doc.text(0, 90, `_____________________________________________________________________________________________________________________`)
            doc.text(90, 140, 'Task                                                completed at')
            doc.text(70, 160, '------------------------------------------------------------------------------')
            const arr = List.map((e, index) => {
                return `        ${index + 1}.  ${e.name}    ------------------------>   ${e.time}`;
            })

            doc.text(20, 200, arr);

            doc.addImage(logicWind, 'PNG', 35, 750, 135, 27)
            doc.addImage(missionPassed, 'PNG', 422, 730, 139, 53)
            // doc.addImage(image, 'PNG', x, y, width, height)
            doc.text(0, 800, `_____________________________________________________________________________________________________________________`)

            deleteCard();
            doc.save(`${Title}.pdf`)
        }
        else {

        }
    }
    const deleteCard = () => {
        let n = window.confirm("are you sure to want to delete ?");
        if (n) {
            let newArr = allTask.filter((e, index) => {
                return index !== id;
            })
            setAllTasks(newArr);
        }
        else {
        }
    }

    function updateCard(newTask) {
        setModal(false);

        let a = allTask.map((t, index) => {

            if (t.date === dateID) {
                return {
                    ...t,
                    Title: newTask?.Title ? newTask.Title : (alert("Title must not be empty"), setModal(true)),
                    Items: newTask?.Items ? newTask.Items : (alert("List should not be empty"), setModal(true)),
                    due: newTask?.due ? newTask.due : (alert("Due date should not be empty"), setModal(true)),
                }
            }
            else {
                return t;
            }
        })
        setAllTasks(a);
    };

    const handleCheck = (name, itemNum) => {
        let checkName = document.getElementById(name);
        setItemId(itemNum);

        if (checkName.checked) {
            setCount(count + 1);
            setChecked(true);
            let d = new Date();
            let s = `${d.toLocaleTimeString()}, ${d.toDateString()} `;
            setCompleteTime(s);
        }
        else {
            setCount(count - 1);
            setChecked(false);
        }
    }

    useEffect(() => {
        setCount(c);

        let a = allTask.map((t) => {

            if (t.date === date) {
                let b = t?.Items?.map((item) => {
                    if (item.id === itemId) {
                        return { ...item, check: checked, time: completeTime }
                    }
                    else {
                        return item;
                    }
                }
                )
                return { ...t, Items: b, done: done };
            }
            else {
                return t;
            }
        })
        setAllTasks(a);
    }, [count, done])


    return (
        <div>
            <Card className="card-box mx-0 my-3">
                <CardHeader style={{ "borderTop": `6px solid ${colors[id % 5].primaryColor}`, "color": colors[id % 5].primaryColor }}>
                    <h5>{Title}</h5>
                    <small>Task Created at</small>
                    <span style={{ 'color': '#a5a5a5' }}><small>&nbsp; : &nbsp; {date}</small></span>
                    <small style={{ 'float': 'right' }}>Due Date&nbsp; : &nbsp;
                        {/* <span style={{ 'color': '#a5a5a5' }}>&nbsp; : &nbsp; {due}</span></small> */}
                        <span className={`${du < curr ? "passed" : "remain"}`}>{due}</span></small>

                </CardHeader>
                <CardBody>

                    <ul>
                        {

                            List.map((e, index) => {

                                if (e.check === true) {
                                    n = true;
                                    c++;
                                }
                                else {
                                    n = false
                                }

                                {/* { console.log("after c = ", c) } */ }
                                return (
                                    <>
                                        <li type="none" id={`checkbox-label-${id}-${index}`} className={`${e.check === true ? 'stroke' : 'noStroke'}`}>
                                            <span  >
                                                <input type="checkbox" name="" className='check' id={e.name}
                                                    onClick={() => { handleCheck(e.name, e.id) }} disabled={done || du < curr ? true : false} checked={n} />&nbsp;&nbsp;&nbsp;{e?.name}
                                            </span>
                                        </li>
                                    </>

                                )
                            })
                        }
                    </ul>
                </CardBody>

                <CardFooter>
                    <Button className='editBtn pb-0 pt-0' outline color='dark'>
                        <b className="far fa-trash-alt add-btn my-2" style={{ "color": colors[id % 5].primaryColor }} onClick={deleteCard}></b>
                    </Button>
                    <Button className='submit pt-0 pb-0' color="success" outline disabled={c === ListLength ? false : true}
                        onClick={generatePDF}>
                        <b> <small>{done ? 'Download' : 'Done'}</small></b>
                    </Button>
                    <Button className='editBtn pb-0 pt-0' outline color='dark' disabled={done ? true : false}>
                        <b class="far fa-edit mr-3 my-2" style={{ "color": colors[id % 5].primaryColor }} onClick={() => { setDateID(date); setModal(true) }} ></b>
                    </Button>
                </CardFooter>

                <EditTask Title={Title} taskList={taskList} setTaskList={setTaskList} date={dateID} modal={modal} toggle={toggle} updateCard={updateCard} due={due} />
            </Card>
        </div >

    );
}
export default TaskCard;