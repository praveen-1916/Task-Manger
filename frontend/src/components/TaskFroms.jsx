import React, { useState } from 'react'
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
    CardBody
} from "@material-tailwind/react";
import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/solid';



export function AddTaskForm(props) {

    const [open, setOpen] = useState(false);

    const toggleOpen = () => setOpen((cur) => !cur);

    const allUsers = [
        {
            userId: '1',
            userName: 'Praveen',
            role: 'developer'
        },
        {
            userId: '2',
            userName: 'hemanth',
            role: 'tester'
        },
        {
            userId: '3',
            userName: 'Gopi',
            role: 'designer'
        },
    ]
    // const [user, setUser] = useState(allUsers);
    const [task, setTask] = useState({
        taskName: '',
        taskDescription: '',
        taskPriority: '',
        taskStatus: '',
        taskMembers: [],
    })

    const inputChange = (e) => {
        // console.log(e);
        setTask({
            ...task,
            [e.target.name]: e.target.value,
        })
        // console.log(task);
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
                    allUsers.find(u => u.userId === id),
                ]
            })
        } else {
            setTask({
                ...task,
                taskMembers: [
                    ...task.taskMembers.filter(member => member.userId !== id)
                ]
            })
        }
    }

    const formSubmit = (e) => {
        e.preventDefault();
        console.log(task);
    }

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
                        <Input name='taskName' required onChange={inputChange} label='Name' placeholder='Enter Task Name' />
                        {/* <Typography variant="h6" color="blue-gray" className="-mb-3">
                        Task Description
                    </Typography> */}
                        <Input name='taskDescription' required onChange={inputChange} label='Description' placeholder='Enter Task Description' />
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
                                <Option value='In progress'>In Progress</Option>
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
                                        {allUsers.map(({ userName, userId }, index) => (
                                            <ListItem key={index} className="p-0">
                                                <label
                                                    htmlFor={userId}
                                                    className="flex w-full cursor-pointer items-center px-3 py-2"
                                                >
                                                    <ListItemPrefix className="mr-3">
                                                        <Checkbox
                                                            onChange={selectUser}
                                                            value={userId}
                                                            id={userId}
                                                            className="hover:before:opacity-0"
                                                            containerProps={{
                                                                className: "p-0",
                                                            }}
                                                        />
                                                    </ListItemPrefix>
                                                    <Typography color="blue-gray" className="font-medium">
                                                        {userName}
                                                    </Typography>
                                                </label>
                                            </ListItem>
                                        ))}
                                    </List>
                                </Card>
                            </Collapse>
                        </div>
                    </div>
                    <Button className="mt-6" type='submit' fullWidth>
                        sign up
                    </Button>
                </form>
            </CardBody>
        </Card>
    );
}




export function EditTaskForm(props) {
    const { name, date, priority, status } = props.editingTask;

    const [editTask, setEditTask] = useState({
        taskName: name,
        taskDescription: date,
        taskPriority: priority,
        taskStatus: status,
    })

    const inputChange = (e) => {
        setEditTask({
            ...editTask,
            [e.target.name]: e.target.value,
        })
        // console.log(task);
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
        console.log(task);
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
                    onClick={props.handleOpenEditForm}
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
                        <Input name='taskName' value={editTask.taskName} required onChange={inputChange} label='Edit Name' />
                        {/* <Typography variant="h6" color="blue-gray" className="-mb-3">
                        Task Description
                    </Typography> */}
                        <Input name='taskDescription' value={editTask.taskDescription} required onChange={inputChange} label='Edit Description' />
                        <div>
                            {/* <Typography variant="h6" color="blue-gray" className="mb-3">
                                Task Priority
                            </Typography> */}
                            <Select onChange={selectPriority} value={editTask.taskPriority} label='Change Priority'>
                                <Option value='High'>High Priority</Option>
                                <Option value='Low'>Low Priority</Option>
                                <Option value='Normal'>Normal Priority</Option>
                            </Select>
                        </div>
                        <div>
                            {/* <Typography variant="h6" color="blue-gray" className="mb-3">
                                Task Status
                            </Typography> */}
                            <Select onChange={selectStatus} value={editTask.taskStatus} label="Change Status">
                                <Option value='In Progress'>In Progress</Option>
                                <Option value='ToDo'>ToDo</Option>
                                <Option value='Completed'>Completed</Option>
                            </Select>
                        </div>
                    </div>
                    <Button className="mt-6" type='submit' fullWidth>
                        Edit Task
                    </Button>
                </form>
            </CardBody>
        </Card>
    )
}

