import React from 'react'
import { Typography, Chip, Tooltip, Card, } from "@material-tailwind/react";
import { ChevronDoubleUpIcon, PencilIcon, ChevronUpDownIcon, ChevronUpIcon, TrashIcon } from '@heroicons/react/24/solid';

const TABLE_HEAD = ["Task Title", "Priority", "Created On", "Status", "Team", "", ""];
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

export default function TableViewTask() {

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
                    {TABLE_ROWS.map(({ name, priority, date, status }, index) => (
                        <tr key={index} className="even:bg-blue-gray-50/50">
                            <td className="p-4 flex items-center gap-2">
                                {priority !== 'Normal' && <p className={priority === 'High' ? 'h-3 w-3 rounded-full bg-red-900' : 'h-3 w-3 rounded-full bg-amber-900'}></p>}
                                {priority === 'Normal' && <p className={'h-3 w-3 rounded-full bg-green-900'}></p>}
                                <Typography variant="small" color="blue-gray" className="text-sm text-cyan-500 tracking-wide">
                                    {name}
                                </Typography>
                            </td>
                            <td className="p-4">
                                {priority === "High" &&
                                    <div className='flex items-center gap-2'>
                                        <ChevronDoubleUpIcon className="h-4 w-4 text-red-900" />
                                        <Typography variant="small" className='tracking-wide font-medium text-red-900' >
                                            {priority} Priority
                                        </Typography>
                                    </div>
                                }
                                {priority === 'Low' &&
                                    <div className='flex items-center gap-2'>
                                        <ChevronUpIcon className='h-4 w-4 text-amber-900' />
                                        <Typography variant="small" className='tracking-wide font-medium text-amber-900' >
                                            {priority} Priority
                                        </Typography>
                                    </div>
                                }
                                {/* {priority !== 'Normal' && <Typography variant="small" className={priority === 'High' ? 'tracking-wide font-medium text-red-900' : 'tracking-wide font-medium text-amber-900'}>
                                    {priority} Priority
                                </Typography>} */}
                                {priority === 'Normal' && <Typography variant="small" className={'tracking-wide font-medium text-green-700'}>
                                    {priority} Priority
                                </Typography>}
                            </td>
                            <td className="p-4">
                                <Typography variant="small" color="blue-gray" className="font-normal">
                                    {date}
                                </Typography>
                            </td>
                            <td className="p-4">
                                {status !== 'Completed' && <Chip
                                    variant="ghost"
                                    color={status === 'ToDo' ? 'blue' : 'amber'}
                                    size="sm"
                                    value={status}
                                    className='w-min'
                                    icon={
                                        <span className={status === 'ToDo' ? "mx-auto mt-1 block h-2 w-2 rounded-full bg-blue-900 content-['']" : "mx-auto mt-1 block h-2 w-2 rounded-full bg-amber-800 content-['']"} />
                                    }
                                />}
                                {status === "Completed" && <Chip
                                    variant="ghost"
                                    color="green"
                                    size="sm"
                                    value={status}
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
                            <td className="p-4">
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
