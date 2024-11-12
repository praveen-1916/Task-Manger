import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Chip,
    Popover,
    PopoverHandler,
    PopoverContent,
} from "@material-tailwind/react";
import React, { useContext, useEffect, useState } from "react";
import { PlusIcon, ChevronDoubleUpIcon, ChevronUpIcon, FolderOpenIcon, EllipsisHorizontalIcon, PencilIcon, DocumentDuplicateIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
} from "@material-tailwind/react";
import TaskContext from "../context/TaskContext";
import { useNavigate } from "react-router-dom";



function TaskItem(props) {

    const navigate = useNavigate();
    const { task } = props;
    const { taskName, taskPriority, date, taskStatus, _id, subTask, taskMembers } = props.task;
    const [priorityColor, setPriorityColor] = useState('');


    const colorFunc = () => {
        if (taskPriority === "High") {
            setPriorityColor('red')
        } else if (taskPriority === "Low") {
            setPriorityColor('amber')
        } else {
            setPriorityColor('green')
        }
    }

    const context = useContext(TaskContext);
    const { editTask, openSubTaskForm, openDeleteTaskDialog, duplicateTask } = context

    useEffect(() => {
        colorFunc();
    }, [task])

    const capitalizing = (word) => {
        return word.toUpperCase();
    }
    const taskDate = (date) => {
        return new Date(date).toDateString();
    }


    return (
        <Card className="w-auto h-max">
            <CardHeader floated={false}
                shadow={false} className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                    {priorityColor === 'red' && <ChevronDoubleUpIcon color="red" className="h-4 w-4 text-red-700" />}
                    {priorityColor === 'amber' && <ChevronUpIcon color="orange" className="h-4 w-4 text-amber-700" />}
                    <p className={`text-${priorityColor}-700 font-bold text-sm tracking-wide`}>
                        {capitalizing(taskPriority)} PRIORITY
                    </p>
                </div>
                {localStorage.getItem('admin') === 'true' ?
                    <Menu placement="bottom-end">
                        <MenuHandler>
                            <EllipsisHorizontalIcon className="h-5 w-5" />
                        </MenuHandler>
                        <MenuList>
                            <MenuItem className="flex items-center gap-2 rounded" onClick={() => navigate(`/task/${_id}`)}>
                                <FolderOpenIcon className="h-4 w-4" />
                                <Typography className="text-xs font-bold">Open Task</Typography>
                            </MenuItem>
                            <MenuItem className="flex items-center gap-2 rounded" onClick={() => editTask(task)}>
                                <PencilIcon className="h-4 w-4" />
                                <p className="text-xs font-bold">Edit Task</p>
                            </MenuItem>
                            <MenuItem className="flex items-center gap-2 rounded" onClick={() => openSubTaskForm(_id)}>
                                <PlusIcon className="h-4 w-4" />
                                <Typography className="text-xs font-bold">Add Sub-Task</Typography>
                            </MenuItem>
                            <MenuItem className="flex items-center gap-2 rounded" onClick={() => duplicateTask(task)}>
                                <DocumentDuplicateIcon className="h-4 w-4" />
                                <Typography className="text-xs font-bold">Duplicate</Typography>
                            </MenuItem>
                            <MenuItem className="flex items-center gap-2 rounded hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10" color="red" onClick={() => openDeleteTaskDialog(_id)}>
                                <TrashIcon className="h-4 w-4 text-red-500" />
                                <Typography className="text-xs font-bold " color="red">Delete</Typography>
                            </MenuItem>
                        </MenuList>
                    </Menu> :
                    <Menu placement="bottom-end">
                        <MenuHandler>
                            <EllipsisHorizontalIcon className="h-5 w-5" />
                        </MenuHandler>
                        <MenuList>
                            <MenuItem className="flex items-center gap-2 rounded" onClick={() => navigate(`/task/${_id}`)}>
                                <FolderOpenIcon className="h-4 w-4" />
                                <Typography className="text-xs font-bold">Open Task</Typography>
                            </MenuItem>
                            <MenuItem className="flex items-center gap-2 rounded" onClick={() => editTask(task)}>
                                <PencilIcon className="h-4 w-4" />
                                <p className="text-xs font-bold">Edit Task</p>
                            </MenuItem>
                        </MenuList>
                    </Menu>}
            </CardHeader>
            <CardBody className="p-4">
                <div>
                    <div className="flex gap-2 items-center">
                        <p className={`h-3 w-3 rounded-full bg-${priorityColor}-900`}></p>
                        <p className="font-semibold text-sm text-cyan-500 tracking-wide">{taskName}</p>
                    </div>
                    <p className="text-xs my-2 text font-bold tracking-wide text-gray-600">{date}</p>

                    <hr />
                    <div className="my-2 flex justify-between items-center">
                        {taskStatus !== 'Completed' && <Chip variant="ghost" color={taskStatus === 'ToDo' ? 'blue' : 'amber'} value={taskStatus} size="sm" className='w-min shadow-md shadow-blue-gray-300' icon={
                            <span className={taskStatus === 'ToDo' ? "mx-auto mt-1 block h-2 w-2 rounded-full bg-blue-900 content-['']" : "mx-auto mt-1 block h-2 w-2 rounded-full bg-amber-800 content-['']"} />
                        }
                        />}
                        {taskStatus === "Completed" && <Chip variant="ghost" color="green" size="sm" className='w-min shadow-md shadow-green-600' value={taskStatus} icon={
                            <span className="mx-auto mt-1 block h-2 w-2 rounded-full bg-green-900 content-['']" />
                        }
                        />}
                        <div className="flex items-center cursor-pointer">
                            {taskMembers.map(({ firstName, lastName, role, email }, index) => (
                                <Popover placement="top-end" key={index}>
                                    <PopoverHandler>
                                        <div className="h-8 w-8 -translate-x-1 first:translate-x-0 flex justify-center items-center rounded-full bg-indigo-900 shadow-md shadow-indigo-600">
                                            <p className='text-white text-sm font-medium'>{firstName.slice(0, 1) + lastName.slice(0, 1)}</p>
                                        </div>
                                    </PopoverHandler>
                                    <PopoverContent className="z-50">
                                        <div className="flex items-center gap-3">
                                            <div className="h-12 w-12 flex justify-center items-center rounded-full bg-indigo-900 shadow-md shadow-indigo-600">
                                                <Typography className='text-white text-lg'>{firstName.slice(0, 1) + lastName.slice(0, 1)}</Typography>
                                            </div>
                                            <div>
                                                <Typography color="blue-gray" variant="h6">
                                                    {firstName} {lastName}
                                                </Typography>
                                                <Typography variant="small" color="gray">
                                                    {role}
                                                </Typography>
                                                <Typography variant="small" color="indigo">
                                                    {email ? email : 'abc@gmail.com'}
                                                </Typography>
                                            </div>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            ))}
                        </div>
                    </div>
                    <hr />
                </div>
            </CardBody>
            <CardFooter className="pt-0">
                <Typography color="blue-gray" className='text-sm mb-2 font-semibold'>
                    SUB-TASKS
                </Typography>
                <div className="divide-y divide-gray-200">
                    {subTask.length > 0 ?
                        subTask.map(({ subTaskName, subTaskRole, date }, index) => (
                            <div key={index} className='flex items-center gap-2 py-3 last:pb-0'>
                                <div>
                                    <div className='flex items-center gap-4'>
                                        <p className="text-xs font-bold tracking-wide text-gray-600">{taskDate(date)}
                                        </p>
                                        <Chip color='indigo' value={subTaskRole} className='shadow-md shadow-indigo-600' />
                                    </div>
                                    <Typography className='mt-2 font-semibold text-sm tracking-wide text-gray-700'>
                                        {subTaskName}
                                    </Typography>
                                </div>
                            </div>
                        )) :
                        <Typography color="blue-gray" variant='lead' className="text-sm">
                            No Sub-Tasks
                        </Typography>
                    }
                </div>
                {localStorage.getItem('admin') === 'true' && <Button size="sm" variant="text" className="mt-4 flex gap-2 items-center" onClick={() => openSubTaskForm(_id)}>
                    <PlusIcon className="h-4 w-4 text-black" />
                    Add Sub-Task
                </Button>}
            </CardFooter>
        </Card>
    );
}


export default TaskItem