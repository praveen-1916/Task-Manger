import React, { useContext } from 'react'
import { Typography, Chip, Tooltip, Card, } from "@material-tailwind/react";
import { ChevronDoubleUpIcon, PencilIcon, ChevronUpDownIcon, ChevronUpIcon, TrashIcon } from '@heroicons/react/24/solid';
import TaskContext from '../context/TaskContext';

const TABLE_HEAD = ["Task Title", "Priority", "Created On", "Status", "Team", "", ""];
// const TABLE_ROWS = [
//     {
//         name: "John Michael",
//         priority: "High",
//         date: "23/04/18",
//         status: "In Progress"

//     },
//     {
//         name: "Alexa Liras",
//         priority: "Low",
//         date: "23/04/18",
//         status: "In Progress"
//     },
//     {
//         name: "Laurent Perrier",
//         priority: "High",
//         date: "19/09/17",
//         status: "Completed"
//     },
//     {
//         name: "Michael Levi",
//         priority: "Low",
//         date: "24/12/08",
//         status: "ToDo"
//     },
//     {
//         name: "Richard Gran",
//         priority: "Normal",
//         date: "04/10/21",
//         status: "Completed"
//     },
// ];

export default function TableViewTask(props) {
    const { tasks } = props;
    const context = useContext(TaskContext);
    const { editTask } = context;

    const taskDate = (date) => {
        return new Date(date).toLocaleDateString();
    }

    // const {}
    // const context = useContext(TaskContext);
    // const { allTasks, statusTasks } = context;

    return (
        <Card className="h-full w-full overflow-hidden">
            <table className="w-full min-w-min table-auto text-left">
                <thead>
                    <tr>
                        {TABLE_HEAD.map((head, index) => (
                            <th key={index} className=" border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                <div className='flex items-center gap-1'>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal leading-none opacity-70"
                                    >
                                        {head}
                                    </Typography>
                                    {head && <ChevronUpDownIcon className='h-5 w-5' />}
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task, index) => (
                        <tr key={index} className="even:bg-blue-gray-50/50">
                            <td className="p-4 flex items-center gap-2">
                                {task.taskPriority !== 'Normal' && <p className={task.taskPriority === 'High' ? 'h-3 w-3 rounded-full bg-red-900' : 'h-3 w-3 rounded-full bg-amber-900'}></p>}
                                {task.taskPriority === 'Normal' && <p className={'h-3 w-3 rounded-full bg-green-900'}></p>}
                                <Typography variant="small" color="blue-gray" className="text-sm text-cyan-500 tracking-wide">
                                    {task.taskName}
                                </Typography>
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
                                {/* {priority !== 'Normal' && <Typography variant="small" className={priority === 'High' ? 'tracking-wide font-medium text-red-900' : 'tracking-wide font-medium text-amber-900'}>
                                    {priority} Priority
                                </Typography>} */}
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
                                    className='w-min'
                                    icon={
                                        <span className={task.taskStatus === 'ToDo' ? "mx-auto mt-1 block h-2 w-2 rounded-full bg-blue-900 content-['']" : "mx-auto mt-1 block h-2 w-2 rounded-full bg-amber-800 content-['']"} />
                                    }
                                />}
                                {task.taskStatus === "Completed" && <Chip
                                    variant="ghost"
                                    color="green"
                                    size="sm"
                                    value={task.taskStatus}
                                    className='w-min'
                                    icon={
                                        <span className="mx-auto mt-1 block h-2 w-2 rounded-full bg-green-900 content-['']" />
                                    }
                                />}
                            </td>
                            <td className="p-4">
                                <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                                    Team
                                </Typography>
                            </td>
                            <td className="p-4" onClick={() => { editTask(task) }}>
                                <Tooltip content="Edit" animate={{
                                    mount: { scale: 1, y: 0 },
                                    unmount: { scale: 0, y: 25 },
                                }}>
                                    <PencilIcon className='h-5 w-5' />
                                </Tooltip>
                            </td>
                            <td className="p-4">
                                <Tooltip content="Delete" className='bg-red-500/25 text-red-500'
                                    animate={{
                                        mount: { scale: 1, y: 0 },
                                        unmount: { scale: 0, y: 25 },
                                    }}>
                                    <TrashIcon className='h-5 w-5 text-red-500' />
                                </Tooltip>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Card>
    )
}
