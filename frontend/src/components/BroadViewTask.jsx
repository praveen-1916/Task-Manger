import React from 'react'
import { EditTaskForm } from "./TaskFroms";
import TaskItem from './TaskItem';
import { Dialog } from '@material-tailwind/react';

const TABLE_ROWS = [
    {
        name: "John Michael",
        priority: "High",
        date: "23/04/18",
        status: "In Progress"

    },
    {
        name: "Alexa Liras",
        priority: "Low",
        date: "23/04/18",
        status: "In Progress"
    },
    {
        name: "Laurent Perrier",
        priority: "High",
        date: "19/09/17",
        status: "Completed"
    },
    {
        name: "Michael Levi",
        priority: "Low",
        date: "24/12/08",
        status: "ToDo"
    },
    {
        name: "Richard Gran",
        priority: "Normal",
        date: "04/10/21",
        status: "Completed"
    },
];



export default function BroadViewTask() {

    const [editingTask, setEditingTask] = React.useState();
    const [openEditForm, setOpenEditForm] = React.useState(false);
    const handleOpenEditForm = () => setOpenEditForm(!openEditForm);

    const editTask = (task) => {
        setOpenEditForm(!openEditForm);
        setEditingTask(task);
    }

    return (
        <>
            <Dialog size='sm' aria-hidden={openEditForm} open={openEditForm} handler={handleOpenEditForm} >
                <EditTaskForm editingTask={editingTask} handleOpenEditForm={handleOpenEditForm} />
            </Dialog>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-5' >
                {TABLE_ROWS.map((row, index) => {
                    return <TaskItem key={index} task={row} editTask={editTask} />
                })}
            </div>
        </>
    )
}

