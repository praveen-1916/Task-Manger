import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Chip,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { PlusIcon, ChevronDoubleUpIcon, ChevronUpIcon, FolderOpenIcon, EllipsisHorizontalIcon, PencilIcon, DocumentDuplicateIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
} from "@material-tailwind/react";



// function CardOptions() {
//     return (
//         <Menu placement="bottom-end">
//             <MenuHandler>
//                 <EllipsisHorizontalIcon className="h-5 w-5" />
//             </MenuHandler>
//             <MenuList>
//                 <MenuItem className="flex items-center gap-2 rounded">
//                     <FolderOpenIcon className="h-4 w-4" />
//                     <Typography className="text-xs font-bold">Open Task</Typography>
//                 </MenuItem>
//                 <MenuItem className="flex items-center gap-2 rounded">
//                     <PencilIcon className="h-4 w-4" />
//                     <Typography className="text-xs font-bold" onClick={() => editTask(task)}>Edit Task</Typography>
//                 </MenuItem>
//                 <MenuItem className="flex items-center gap-2 rounded">
//                     <PlusIcon className="h-4 w-4" />
//                     <Typography className="text-xs font-bold">Add Sub-Task</Typography>
//                 </MenuItem>
//                 <MenuItem className="flex items-center gap-2 rounded">
//                     <DocumentDuplicateIcon className="h-4 w-4" />
//                     <Typography className="text-xs font-bold">Duplicate</Typography>
//                 </MenuItem>
//                 <MenuItem className="flex items-center gap-2 rounded hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10" color="red">
//                     <TrashIcon className="h-4 w-4 text-red-500" />
//                     <Typography className="text-xs font-bold " color="red">Delete</Typography>
//                 </MenuItem>
//             </MenuList>
//         </Menu>
//     );

// }



export default function TaskItem(props) {
    const { editTask, task } = props;
    const { name, priority, date, status } = props.task;
    const [priorityColor, setPriorityColor] = useState('')

    const colorFunc = () => {
        if (priority === "High") {
            setPriorityColor('red')
        } else if (priority === "Low") {
            setPriorityColor('amber')
        } else {
            setPriorityColor('green')
        }
    }

    useEffect(() => {
        colorFunc();
    }, [])

    const capitalizing = (word) => {
        return word.toUpperCase();
    }

    return (
        <Card className="w-auto">
            <CardHeader floated={false}
                shadow={false} className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                    {priorityColor === 'red' && <ChevronDoubleUpIcon color="red" className="h-4 w-4 text-red-700" />}
                    {priorityColor === 'amber' && <ChevronUpIcon color="orange" className="h-4 w-4 text-amber-700" />}
                    <p className={`text-${priorityColor}-700 font-bold text-sm tracking-wide`}>
                        {capitalizing(priority)} PRIORITY
                    </p>
                </div>
                <Menu placement="bottom-end">
                    <MenuHandler>
                        <EllipsisHorizontalIcon className="h-5 w-5" />
                    </MenuHandler>
                    <MenuList>
                        <MenuItem className="flex items-center gap-2 rounded">
                            <FolderOpenIcon className="h-4 w-4" />
                            <Typography className="text-xs font-bold">Open Task</Typography>
                        </MenuItem>
                        <MenuItem className="flex items-center gap-2 rounded" onClick={() => editTask(task)}>
                            <PencilIcon className="h-4 w-4" />
                            <p className="text-xs font-bold">Edit Task</p>
                        </MenuItem>
                        <MenuItem className="flex items-center gap-2 rounded">
                            <PlusIcon className="h-4 w-4" />
                            <Typography className="text-xs font-bold">Add Sub-Task</Typography>
                        </MenuItem>
                        <MenuItem className="flex items-center gap-2 rounded">
                            <DocumentDuplicateIcon className="h-4 w-4" />
                            <Typography className="text-xs font-bold">Duplicate</Typography>
                        </MenuItem>
                        <MenuItem className="flex items-center gap-2 rounded hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10" color="red">
                            <TrashIcon className="h-4 w-4 text-red-500" />
                            <Typography className="text-xs font-bold " color="red">Delete</Typography>
                        </MenuItem>
                    </MenuList>
                </Menu>
            </CardHeader>
            <CardBody className="p-4">
                <div>
                    <div className="flex gap-2 items-center">
                        <p className={`h-3 w-3 rounded-full bg-${priorityColor}-900`}></p>
                        <p className="font-semibold text-sm text-cyan-500 tracking-wide">{name}</p>
                    </div>
                    <p className="text-xs my-2 text font-bold tracking-wide text-gray-600">{date}</p>

                    <hr />
                    <div className="my-2">
                        {status !== 'Completed' && <Chip variant="ghost" color={status === 'ToDo' ? 'blue' : 'amber'} size="sm" value={status} className='w-min' icon={
                            <span className={status === 'ToDo' ? "mx-auto mt-1 block h-2 w-2 rounded-full bg-blue-900 content-['']" : "mx-auto mt-1 block h-2 w-2 rounded-full bg-amber-800 content-['']"} />
                        }
                        />}
                        {status === "Completed" && <Chip variant="ghost" color="green" className='w-min' size="sm" value={status} icon={
                            <span className="mx-auto mt-1 block h-2 w-2 rounded-full bg-green-900 content-['']" />
                        }
                        />}
                    </div>
                    <hr />
                </div>
            </CardBody>
            <CardFooter className="pt-0">
                <p>No Sub-Task</p>
                <Button variant="text" className="mt-2 flex gap-2 items-center">
                    <PlusIcon className="h-4 w-4 text-black" />
                    Add Subtask
                </Button>
            </CardFooter>
        </Card>
    );
}

