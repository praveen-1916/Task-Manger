import React, { useContext, useState } from 'react'
import {
    Card,
    Input,
    Checkbox,
    Button,
    IconButton,
    Typography,
    Select,
    Option,
    List,
    ListItem,
    ListItemPrefix,
    Collapse,
    CardHeader,
    CardBody,
    Chip
} from "@material-tailwind/react";
import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/solid';
import TaskContext from '../context/TaskContext';



export function AddTaskForm(props) {

    const [open, setOpen] = useState(false);

    const toggleOpen = () => setOpen((cur) => !cur);

    // const allUsers = [
    //     {
    //         userId: '66fedfde58743fffb9292eeb',
    //         userName: 'Praveen',
    //         role: 'developer'
    //     },
    //     {
    //         userId: '66fedfde58743fffb9292eec',
    //         userName: 'hemanth',
    //         role: 'tester'
    //     },
    //     {
    //         userId: '66fedfde58743fffb9292eed',
    //         userName: 'Gopi',
    //         role: 'designer'
    //     },
    // ]

    const [task, setTask] = useState({
        taskName: '',
        taskDescription: '',
        taskPriority: '',
        taskStatus: '',
        taskMembers: [],
    })

    const inputChange = (e) => {
        setTask({
            ...task,
            [e.target.name]: e.target.value,
        })
    }

    const selectPriority = (e) => {
        // console.log(e);
        setTask({
            ...task,
            taskPriority: e
        })
    }
    const selectStatus = (e) => {
        // console.log(e);
        setTask({
            ...task,
            taskStatus: e
        })
    }

    const selectUser = (e) => {
        const { checked, id } = e.target;
        if (checked) {
            setTask({
                ...task,
                taskMembers: [
                    ...task.taskMembers,
                    teamMembers.find(member => member._id === id),
                ]
            })
        } else {
            setTask({
                ...task,
                taskMembers: [
                    ...task.taskMembers.filter(member => member._id !== id)
                ]
            })
        }
    }

    const formSubmit = (e) => {
        e.preventDefault();
        createTask(task);
        setTask({
            taskName: '',
            taskDescription: '',
            taskPriority: '',
            taskStatus: '',
            taskMembers: [],
        })
    }

    const context = useContext(TaskContext);
    const { createTask, teamMembers } = context;


    return (
        <Card color="transparent" shadow={false}>
            <CardHeader floated={false} shadow={false} className='flex justify-between items-center p-6 m-0 pb-0'>
                <Typography variant="h4" color="blue-gray">
                    Add Task
                </Typography>
                <IconButton
                    size="sm"
                    variant="text"
                    onClick={props.handleOpenAddForm}
                >
                    <XMarkIcon className="h-4 w-4 stroke-2" />
                </IconButton>
            </CardHeader>
            <CardBody>
                <form onSubmit={formSubmit}>
                    <div className="mb-1 flex flex-col gap-6">
                        {/* <Typography variant="h6"  color="blue-gray" className="-mb-3">
                        Task Name
                    </Typography> */}
                        <Input name='taskName' required minLength={3} onChange={inputChange} label='Name' placeholder='Enter Task Name' />
                        {/* <Typography variant="h6" color="blue-gray" className="-mb-3">
                        Task Description
                    </Typography> */}
                        <Input name='taskDescription' required minLength={5} onChange={inputChange} label='Description' placeholder='Enter Task Description' />
                        <div>
                            {/* <Typography variant="h6" color="blue-gray" className="mb-3">
                                Task Priority
                            </Typography> */}
                            <Select onChange={selectPriority} label='Select Priority'>
                                <Option value='High'>High Priority</Option>
                                <Option value='Low'>Low Priority</Option>
                                <Option value='Normal'>Normal Priority</Option>
                            </Select>
                        </div>
                        <div>
                            {/* <Typography variant="h6" color="blue-gray" className="mb-3">
                                Task Status
                            </Typography> */}
                            <Select onChange={selectStatus} label="Select Status">
                                <Option value='In Progress'>In Progress</Option>
                                <Option value='ToDo'>ToDo</Option>
                                <Option value='Completed'>Completed</Option>
                            </Select>
                        </div>

                        <div>
                            <Button onClick={toggleOpen} fullWidth variant='outlined' className={`flex justify-between items-center px-3 py-[10px] border-gray-400 ${open ? 'border-black border-2' : ''}`} style={{ '--tw-ring-opacity': 0 }}>
                                <p className='font-light text-gray-600'>Select Users</p>
                                <ChevronDownIcon
                                    strokeWidth={2.5}
                                    className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""
                                        }`} />
                            </Button>
                            <Collapse open={open} >
                                <Card shadow={false}>
                                    <List>
                                        {teamMembers.map(({ firstName, lastName, _id, role }) => (
                                            // <Badge content={role}>
                                            <ListItem key={_id} className="p-0">
                                                <label
                                                    htmlFor={_id}
                                                    className="flex w-full cursor-pointer items-center px-3 py-2"
                                                >
                                                    <ListItemPrefix className="mr-3">
                                                        <Checkbox
                                                            onChange={selectUser}
                                                            value={_id}
                                                            id={_id}
                                                            className="hover:before:opacity-0"
                                                            containerProps={{
                                                                className: "p-0",
                                                            }}
                                                        />
                                                    </ListItemPrefix>
                                                    {/* <Typography color="blue-gray" className="font-medium">
                                                        {firstName}
                                                    </Typography> */}
                                                    <div color="blue-gray" className="font-medium w-full flex justify-between items-center">
                                                        <Typography>{firstName} {lastName}</Typography>
                                                        <Chip color='red' value={role} />
                                                    </div>
                                                </label>
                                            </ListItem>
                                        ))}
                                    </List>
                                </Card>
                            </Collapse>
                        </div>
                    </div>
                    <Button className="mt-6" type='submit' onClick={props.handleOpenAddForm} fullWidth>
                        Add Task
                    </Button>
                </form>
            </CardBody>
        </Card>
    );
}




export function EditTaskForm() {
    const context = useContext(TaskContext);
    const { editingTask, handleOpenEditForm, updateTask } = context
    const { taskName, taskDescription, taskPriority, taskStatus, _id } = editingTask;

    const [editTask, setEditTask] = useState({
        taskName: taskName,
        taskDescription: taskDescription,
        taskPriority: taskPriority,
        taskStatus: taskStatus,
    })

    const inputChange = (e) => {
        setEditTask({
            ...editTask,
            [e.target.name]: e.target.value,
        })
    }

    const selectPriority = (e) => {
        setEditTask({
            ...editTask,
            taskPriority: e
        })
    }
    const selectStatus = (e) => {
        setEditTask({
            ...editTask,
            taskStatus: e
        })
    }

    const formSubmit = (e) => {
        e.preventDefault();
        updateTask(_id, editTask)
        // console.log(task);
    }
    return (
        <Card color="transparent" shadow={false}>
            <CardHeader floated={false} shadow={false} className='flex justify-between items-center p-6 m-0 pb-0'>
                <Typography variant="h4" color="blue-gray">
                    Edit Task
                </Typography>
                <IconButton
                    size="sm"
                    variant="text"
                    onClick={handleOpenEditForm}
                >
                    <XMarkIcon className="h-4 w-4 stroke-2" />
                </IconButton>
            </CardHeader>
            <CardBody>
                <form onSubmit={formSubmit}>
                    <div className="mb-1 flex flex-col gap-6">
                        {/* <Typography variant="h6"  color="blue-gray" className="-mb-3">
                        Task Name
                    </Typography> */}
                        <Input name='taskName' value={editTask.taskName} required minLength={3} onChange={inputChange} label='Edit Name' />
                        {/* <Typography variant="h6" color="blue-gray" className="-mb-3">
                        Task Description
                    </Typography> */}
                        <Input name='taskDescription' value={editTask.taskDescription} minLength={5} required onChange={inputChange} label='Edit Description' />
                        <div>
                            {/* <Typography variant="h6" color="blue-gray" className="mb-3">
                                Task Priority
                            </Typography> */}
                            <Select onChange={selectPriority} value={editTask.taskPriority} label='Change Priority'>
                                <Option className='mt-1' value='High'>High Priority</Option>
                                <Option className='mt-1' value='Low'>Low Priority</Option>
                                <Option className='mt-1' value='Normal'>Normal Priority</Option>
                            </Select>
                        </div>
                        <div>
                            {/* <Typography variant="h6" color="blue-gray" className="mb-3">
                                Task Status
                            </Typography> */}
                            <Select onChange={selectStatus} value={editTask.taskStatus} label="Change Status">
                                <Option className='mt-1' value='In Progress'>In Progress</Option>
                                <Option className='mt-1' value='ToDo'>ToDo</Option>
                                <Option className='mt-1' value='Completed'>Completed</Option>
                            </Select>
                        </div>
                    </div>
                    <Button className="mt-6" type='submit' onClick={handleOpenEditForm} fullWidth>
                        Edit Task
                    </Button>
                </form>
            </CardBody>
        </Card>
    )
}

