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
    Textarea,
    List,
    ListItem,
    ListItemPrefix,
    Collapse,
    CardHeader,
    CardBody,
    Chip,
    CardFooter
} from "@material-tailwind/react";
import { ArrowRightCircleIcon, ChevronDownIcon, ChevronRightIcon, ChevronUpIcon, EyeIcon, EyeSlashIcon, QuestionMarkCircleIcon, XMarkIcon } from '@heroicons/react/24/solid';

import TaskContext from '../context/TaskContext';



export function AddTaskForm(props) {

    const [open, setOpen] = useState(false);

    const toggleOpen = () => setOpen((cur) => !cur);


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

    const selectTeamMember = (e) => {
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
        <Card color="transparent">
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
                        <Input name='taskName' required minLength={3} onChange={inputChange} label='Name' placeholder='Enter Task Name' />
                        <Input name='taskDescription' required minLength={5} onChange={inputChange} label='Description' placeholder='Enter Task Description' />
                        <Select onChange={selectPriority} label='Select Priority'>
                            <Option value='High'>High Priority</Option>
                            <Option value='Low'>Low Priority</Option>
                            <Option value='Normal'>Normal Priority</Option>
                        </Select>
                        <Select onChange={selectStatus} label="Select Status">
                            <Option value='In Progress'>In Progress</Option>
                            <Option value='ToDo'>ToDo</Option>
                            <Option value='Completed'>Completed</Option>
                        </Select>

                        <div className='relative'>
                            <Button onClick={toggleOpen} fullWidth variant='outlined' className={`flex justify-between items-center px-3 py-[10px] border-gray-400 ${open ? 'border-black border-2' : ''}`} style={{ '--tw-ring-opacity': 0 }}>
                                <p className='font-light text-gray-600'>Select Users</p>
                                <ChevronUpIcon
                                    strokeWidth={5}
                                    className={`h-3 w-3 transition-transform ${open && "rotate-180"}`} />
                            </Button>
                            <Collapse className='absolute -top-64 bg-white shadow-lg shadow-blue-gray-500/10' open={open} >
                                <Card className='border border-blue-gray-50 rounded-md'>
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
                                                            onChange={selectTeamMember}
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
                                                        <Typography color="blue-gray">{firstName} {lastName}</Typography>
                                                        <Chip color='red' size='sm' value={role} />
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
        <Card color="transparent">
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


export function AddTaskTimelineForm(props) {

    const context = useContext(TaskContext);
    const { userDetails, addActivity, timelineIcons } = context;

    const { handleOpenAddActivityForm, taskId } = props;

    const [activityDetails, setActivityDetails] = useState({
        userName: userDetails.firstName,
        userMsg: '',
        iconLabel: '',
    })

    const selectActivity = (e) => {
        setActivityDetails({
            ...activityDetails,
            iconLabel: e
        })
    }

    const textAreaMsg = (e) => {
        setActivityDetails({
            ...activityDetails,
            userMsg: e.target.value
        })
    }

    const formSubmit = (e) => {
        e.preventDefault();
        addActivity(taskId, activityDetails);
    }

    return (
        <Card color="transparent" >
            <CardHeader floated={false} shadow={false} className='flex justify-between items-center p-6 m-0 pb-0'>
                <Typography variant="h4" color="blue-gray">
                    Add Activity
                </Typography>
                <IconButton
                    size="sm"
                    variant="text"
                    onClick={handleOpenAddActivityForm}
                >
                    <XMarkIcon className="h-4 w-4 stroke-2" />
                </IconButton>
            </CardHeader>
            <CardBody>
                <form onSubmit={formSubmit}>
                    <Select onChange={selectActivity} label="Select Activity">
                        {timelineIcons.map(({ label, icon, color }, index) => (
                            <Option key={index} value={label}>
                                <div className='flex items-center gap-2'>
                                    {React.createElement(icon, {
                                        className: `h-6 w-6 text-${color}-900`,
                                    })}
                                    <Typography variant='small' color='blue-gray'>Task {label}</Typography>
                                </div>
                            </Option>
                        ))}
                    </Select>
                    <div className='mt-4 mb-2'>
                        <Textarea color="gray" name='userMsg' onChange={textAreaMsg} required label="Message" />
                    </div>

                    <Button type='submit' fullWidth onClick={handleOpenAddActivityForm}>Add Activity</Button>
                </form>
            </CardBody>
        </Card >
    )

}

export function AddSubTaskForm() {

    const subTaskRoles = ['Designing', 'Developing', 'Testing', 'Bug Fixing', 'Planning', 'UI&UX',]

    const context = useContext(TaskContext);
    const { addSubTask, handleOpenAddSubTaskForm, subTaskId } = context;

    const [subTaskDetails, setSubTaskDetails] = useState({
        subTaskName: '',
        subTaskRole: '',
    })

    const selectSubTaskRole = (e) => {
        setSubTaskDetails({
            ...subTaskDetails,
            subTaskRole: e
        })
    }

    const inputChange = (e) => {
        setSubTaskDetails({
            ...subTaskDetails,
            subTaskName: e.target.value
        })
    }

    const formSubmit = (e) => {
        e.preventDefault();
        addSubTask(subTaskId, subTaskDetails);
    }

    return (
        <Card color="transparent">
            <CardHeader floated={false} shadow={false} className='flex justify-between items-center p-6 m-0 pb-0'>
                <Typography variant="h4" color="blue-gray">
                    Add Sub-Task
                </Typography>
                <IconButton
                    size="sm"
                    variant="text"
                    onClick={handleOpenAddSubTaskForm}
                >
                    <XMarkIcon className="h-4 w-4 stroke-2" />
                </IconButton>
            </CardHeader>
            <CardBody>
                <form onSubmit={formSubmit}>
                    <Select onChange={selectSubTaskRole} label="Select Activity">
                        {subTaskRoles.map((role, index) => (
                            <Option key={index} value={role}>
                                <div className='flex items-center gap-2'>
                                    <ArrowRightCircleIcon className='h-5 w-5' stroke={2} />
                                    <Typography variant='small' className='font-medium tracking-wide' color='blue-gray'>{role}</Typography>
                                </div>
                            </Option>
                        ))}
                    </Select>
                    <div className='my-4'>
                        <Input color="gray" minLength={3} placeholder='Enter Sub-Task Name' onChange={inputChange} required label="Sub-Task Name" />
                    </div>

                    <Button type='submit' fullWidth onClick={handleOpenAddSubTaskForm}>Add Sub-Task</Button>
                </form>
            </CardBody>
        </Card >
    )

}

export function AddTeamMemberForm(props) {
    const { handleOpenAddTeamMemberForm } = props;
    const teamMemberRoles = ['UI&UX Designer', 'Frontend Developer', 'Backend Developer', 'Full-Stack Developer', 'Cloud Engineer', 'Tester', 'Business Analyst', 'DevOps Engineer', 'Others'];

    const [teamMemberDetails, setTeamMmberDetails] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: '',
    })
    const context = useContext(TaskContext);
    const { createTeamMemberAccount } = context;

    const inputChange = (e) => {
        setTeamMmberDetails({
            ...teamMemberDetails,
            [e.target.name]: e.target.value,
        })
    }

    const selectRole = (e) => {
        setTeamMmberDetails({
            ...teamMemberDetails,
            role: e
        })
    }

    const formSubmit = (e) => {
        e.preventDefault();
        console.log(teamMemberDetails);
        createTeamMemberAccount(teamMemberDetails);
        setTeamMmberDetails({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            role: '',
        })
    }

    const [passwordType, setPasswordType] = useState('password');
    const showPass = () => {
        if (passwordType === 'password') {
            setPasswordType('text');
        } else {
            setPasswordType('password')
        }
    }

    return (
        <Card color="transparent">
            <CardHeader floated={false} shadow={false} className='flex justify-between items-center p-6 m-0 pb-0'>
                <Typography variant="h4" color="blue-gray">
                    Add Team Member
                </Typography>
                <IconButton
                    size="sm"
                    variant="text"
                    onClick={handleOpenAddTeamMemberForm}
                >
                    <XMarkIcon className="h-4 w-4 stroke-2" />
                </IconButton>
            </CardHeader>
            <CardBody>
                <form onSubmit={formSubmit}>
                    <div className="mb-1 flex flex-col gap-6">
                        <Input type='text' name='firstName' required minLength={3} onChange={inputChange} label='First Name' placeholder='Enter First Name' />
                        <Input type='text' name='lastName' minLength={1} onChange={inputChange} label='Last Name' placeholder='Enter Last Name' />
                        <Input type='email' required name='email' onChange={inputChange} label='Email' placeholder='Enter Email' />
                        <Input type={passwordType} required name='password' onChange={inputChange} label='Password' placeholder='Enter Password' icon={passwordType === 'password' ? <EyeSlashIcon onClick={showPass} className='h-5 w-5 cursor-pointer' /> : <EyeIcon onClick={showPass} className='h-5 w-5 cursor-pointer' />} />
                        <Select onChange={selectRole} label='Select Role'>
                            {teamMemberRoles.map((role, index) => (
                                <Option key={index} value={role}>{role}</Option>
                            ))}
                        </Select>
                    </div>
                    <Button className="mt-6" type='submit' fullWidth>
                        Add Member
                    </Button>
                </form>
            </CardBody>
        </Card>
    )
}

export function DeleteTaskDialog() {

    const context = useContext(TaskContext);
    const { handleOpenDeleteDialog, deleteTask, deleteTaskId } = context;

    const confirmDeleteTask = () => {
        deleteTask(deleteTaskId);
        handleOpenDeleteDialog();
    }


    return (
        <Card >
            <CardHeader className='mx-auto' shadow={false} floated={false} >
                <QuestionMarkCircleIcon className='h-16 w-16 text-red-600' />
            </CardHeader>
            <CardBody className='text-center'>
                <Typography className='tracking-wide' variant='small' color='blue-gray'>Are you sure you want to delete the selected task?</Typography>
            </CardBody>
            <CardFooter>
                <div className='flex items-center justify-center gap-4'>
                    <Button variant='gradient' color='white' onClick={handleOpenDeleteDialog}>Cancel</Button>
                    <Button variant='gradient' color='red' onClick={confirmDeleteTask}>Confirm</Button>
                </div>
            </CardFooter>
        </Card>
    )
}

export function DuplicateTaskDialog() {

    const context = useContext(TaskContext);
    const { handleOpenDuplicateDialog, createTask, duplicatingTask } = context;

    const confirmDuplicateTask = () => {
        createTask(duplicatingTask);
        handleOpenDuplicateDialog();
    }


    return (
        <Card>
            <CardHeader className='mx-auto' shadow={false} floated={false} >
                <QuestionMarkCircleIcon className='h-16 w-16 text-indigo-600' />
            </CardHeader>
            <CardBody className='text-center'>
                <Typography className='tracking-wide' variant='small' color='blue-gray'>Are you sure you want to duplicate the selected task?</Typography>
            </CardBody>
            <CardFooter>
                <div className='flex items-center justify-center gap-4'>
                    <Button variant='gradient' color='white' onClick={handleOpenDuplicateDialog}>Cancel</Button>
                    <Button variant='gradient' color='indigo' onClick={confirmDuplicateTask}>Confirm</Button>
                </div>
            </CardFooter>
        </Card>
    )
}