import React, { useContext } from 'react'
import {
    Typography, Chip, Tooltip, Card, Popover,
    PopoverHandler,
    PopoverContent,
} from "@material-tailwind/react";
import { ChevronDoubleUpIcon, PencilIcon, ChevronUpDownIcon, ChevronUpIcon, TrashIcon } from '@heroicons/react/24/solid';
import TaskContext from '../context/TaskContext';

const TABLE_HEAD = ["Task Title", "Priority", "Created On", "Status", "Team"];


export default function TableViewTask(props) {
    const { tasks } = props;
    const context = useContext(TaskContext);
    const { editTask, openDeleteTaskDialog } = context;

    const taskDate = (date) => {
        return new Date(date).toLocaleDateString();
    }

    return (
        <Card className="h-full w-full overflow-hidden rounded">
            <table className="w-full min-w-min table-fixed text-left">
                <thead>
                    <tr>
                        {TABLE_HEAD.map((head, index) => (
                            <th key={index} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                <div className='flex items-center gap-1'>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal leading-none opacity-70"
                                    >
                                        {head}
                                    </Typography>
                                    <ChevronUpDownIcon className='h-5 w-5' />
                                </div>
                            </th>
                        ))}
                        {localStorage.getItem('admin') === 'true' && <th className='w-16 border-b border-blue-gray-100 bg-blue-gray-50 p-4'></th>}
                        {localStorage.getItem('admin') === 'true' && <th className='w-16 border-b border-blue-gray-100 bg-blue-gray-50 p-4'></th>}
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task, index) => (
                        <tr key={index} className="even:bg-blue-gray-50/50">
                            <td className="p-4">
                                <div className='flex items-center gap-2'>
                                    {task.taskPriority !== 'Normal' && <p className={task.taskPriority === 'High' ? 'h-3 w-3 rounded-full bg-red-900' : 'h-3 w-3 rounded-full bg-amber-900'}></p>}
                                    {task.taskPriority === 'Normal' && <p className={'h-3 w-3 rounded-full bg-green-900'}></p>}
                                    <Typography variant="small" color="blue-gray" className="text-sm text-cyan-500 tracking-wide">
                                        {task.taskName}
                                    </Typography>
                                </div>
                            </td>
                            <td className="p-4">
                                {task.taskPriority === "High" &&
                                    <div className='flex items-center gap-2'>
                                        <ChevronDoubleUpIcon className="h-4 w-4 text-red-900" />
                                        <Typography variant="small" className='tracking-wide font-medium text-red-900' >
                                            {task.taskPriority} Priority
                                        </Typography>
                                    </div>
                                }
                                {task.taskPriority === 'Low' &&
                                    <div className='flex items-center gap-2'>
                                        <ChevronUpIcon className='h-4 w-4 text-amber-900' />
                                        <Typography variant="small" className='tracking-wide font-medium text-amber-900' >
                                            {task.taskPriority} Priority
                                        </Typography>
                                    </div>
                                }
                                {task.taskPriority === 'Normal' && <Typography variant="small" className='tracking-wide font-medium text-green-700'>
                                    {task.taskPriority} Priority
                                </Typography>}
                            </td>
                            <td className="p-4">
                                <Typography variant="small" color="blue-gray" className="font-normal">
                                    {taskDate(task.date)}
                                </Typography>
                            </td>
                            <td className="p-4">
                                {task.taskStatus !== 'Completed' && <Chip
                                    variant="ghost"
                                    color={task.taskStatus === 'ToDo' ? 'blue' : 'amber'}
                                    size="sm"
                                    value={task.taskStatus}
                                    className='w-min shadow-md shadow-blue-gray-300'
                                    icon={
                                        <span className={task.taskStatus === 'ToDo' ? "mx-auto mt-1 block h-2 w-2 rounded-full bg-blue-900 content-['']" : "mx-auto mt-1 block h-2 w-2 rounded-full bg-amber-800 content-['']"} />
                                    }
                                />}
                                {task.taskStatus === "Completed" && <Chip
                                    variant="ghost"
                                    color="green"
                                    size="sm"
                                    value={task.taskStatus}
                                    className='w-min shadow-md shadow-green-600'
                                    icon={
                                        <span className="mx-auto mt-1 block h-2 w-2 rounded-full bg-green-900 content-['']" />
                                    }
                                />}
                            </td>
                            <td className="p-4">
                                <div className="flex items-center cursor-pointer">
                                    {task.taskMembers.map(({ firstName, lastName, role, email }, index) => (
                                        <Popover placement="top-end" key={index}>
                                            <PopoverHandler >
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
                                                            {email ? email : 'abcd@gmail.com'}
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    ))}
                                </div>
                            </td>
                            {localStorage.getItem('admin') === 'true' &&
                                <td className="p-2" onClick={() => { editTask(task) }}>
                                    <Tooltip content="Edit" animate={{
                                        mount: { scale: 1, y: 0 },
                                        unmount: { scale: 0, y: 25 },
                                    }}>
                                        <PencilIcon className='h-5 w-5' />
                                    </Tooltip>
                                </td>}
                            {localStorage.getItem('admin') === 'true' &&
                                <td className="p-2" onClick={() => openDeleteTaskDialog(task._id)}>
                                    <Tooltip content="Delete" className='bg-red-500/25 text-red-500'
                                        animate={{
                                            mount: { scale: 1, y: 0 },
                                            unmount: { scale: 0, y: 25 },
                                        }}>
                                        <TrashIcon className='h-5 w-5 text-red-500' />
                                    </Tooltip>
                                </td>}
                        </tr>
                    ))}
                </tbody>
            </table>
        </Card>
    )
}
