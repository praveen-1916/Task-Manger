import React, { useContext, useEffect } from 'react'
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Chip,
} from "@material-tailwind/react";
import { ArrowRightStartOnRectangleIcon, ChevronDoubleUpIcon, ChevronUpIcon, ClipboardDocumentCheckIcon, ClipboardDocumentListIcon, PlusIcon } from '@heroicons/react/24/solid';
import TaskContext from '../context/TaskContext';
import { useParams } from 'react-router-dom';

// const detailedTask = {
//     "_id": "671a156ec51109fbd95c7d13",
//     "taskName": "Task Manager",
//     "taskDescription": "Create a full stack task manager website using MERN stack",
//     "taskPriority": "High",
//     "taskStatus": "In Progress",
//     "taskMembers": [
//         {
//             "_id": "66fbd0604a2dfe80bff48670",
//             "firstName": "Gopi",
//             "lastName": "Battu",
//             "role": "Developer"
//         },
//         {
//             "_id": "6718c53f7929ce82ffcb462d",
//             "firstName": "Hemanth",
//             "lastName": "Akurathi",
//             "role": "Tester"
//         },
//         {
//             "_id": "6718c53f7929ce82ffcb462d",
//             "firstName": "Hemanth",
//             "lastName": "Battu",
//             "role": "UX Designer"
//         }
//     ],
//     "date": "2024-10-23T16:36:45.000Z",
//     "adminId": "66fbccfc07de94d60a94fe8d",
//     "taskTimeLine": [],
//     "subTask": [
//         {
//             "subTaskName": "Create a login component",
//             "subTaskRole": "Designing"
//         },
//         {
//             "subTaskName": "Admin dashboard",
//             "subTaskRole": "Website App"
//         }
//     ]
// }
function TaskDetail() {

    const capitalizing = (word) => {
        return word.toUpperCase();
    }
    const taskDate = (date) => {
        return new Date(date).toDateString();
    }

    const context = useContext(TaskContext);
    const { detailedTask, getTaskdetails, allTasks } = context;

    const { taskId } = useParams();

    useEffect(() => {
        console.log(taskId)
        console.log(typeof (taskId))
        getTaskdetails(taskId);
    }, [taskId, allTasks])


    return (
        <>
            {detailedTask ? <Tabs value="taskInfo" className='m-6'>
                <TabsHeader className="rounded-none bg-transparent p-0 gap-5"
                    indicatorProps={{
                        className:
                            "bg-transparent border-b-2 border-gray-900 rounded-none",
                    }}>
                    <Tab value='taskInfo' className='w-max p-2 bg-gray-50 shadow-md shadow-gray-500 '>
                        <div className='flex items-center gap-1'>
                            <ClipboardDocumentCheckIcon className='h-4 w-4' />
                            <p className='font-semibold text-sm'>Task Details</p>
                        </div>
                    </Tab>
                    <Tab value='taskActivities' className='w-max p-2 bg-gray-50 shadow-md shadow-gray-500'>
                        <div className='flex items-center gap-1'>
                            <ClipboardDocumentListIcon className='h-4 w-4' />
                            <p className='font-semibold text-sm'>Activities/Timeline</p>
                        </div>
                    </Tab>
                </TabsHeader>
                <TabsBody animate={{
                    initial: { y: 250 },
                    mount: { y: 0 },
                    unmount: { y: 250 },
                }}
                >
                    <TabPanel className='px-0' value='taskInfo'>
                        <Card shadow={false} className='shadow-inner rounded-none'>
                            <CardHeader floated={false} shadow={false}>
                                <div className="flex gap-2 items-center">
                                    {detailedTask.taskPriority !== 'Normal' && <p className={detailedTask.taskPriority === 'High' ? 'h-3 w-3 rounded-full bg-red-900' : 'h-5 w-5 rounded-full bg-amber-900'}></p>}
                                    {detailedTask.taskPriority === 'Normal' && <p className={'h-3 w-3 rounded-full bg-green-900'}></p>}
                                    <Typography variant="h2" color="blue-gray" className="text-2xl tracking-wide">
                                        {detailedTask.taskName}
                                    </Typography>
                                </div>
                                <div className="my-4 flex flex-col sm:items-center gap-6 sm:flex-row">
                                    {detailedTask.taskPriority === "High" &&
                                        <div className='flex items-center gap-1'>
                                            <ChevronDoubleUpIcon className="h-5 w-5 text-red-900" />
                                            <Typography className='tracking-wide font-bold text-red-900' >
                                                {capitalizing(detailedTask.taskPriority)} PRIORITY
                                            </Typography>
                                        </div>
                                    }
                                    {detailedTask.taskPriority === 'Low' &&
                                        <div className='flex items-center gap-1'>
                                            <ChevronUpIcon className='h-5 w-5 text-amber-900' />
                                            <Typography className='tracking-wide font-bold text-amber-900' >
                                                {capitalizing(detailedTask.taskPriority)} PRIORITY
                                            </Typography>
                                        </div>
                                    }
                                    {detailedTask.taskPriority === 'Normal' &&
                                        <Typography className='tracking-wide font-bold text-green-700'>
                                            {capitalizing(detailedTask.taskPriority)} PRIORITY
                                        </Typography>
                                    }

                                    {detailedTask.taskStatus !== 'Completed' &&
                                        <Chip variant="ghost" color={detailedTask.taskStatus === 'ToDo' ? 'blue' : 'amber'} value={detailedTask.taskStatus} className={detailedTask.taskStatus === 'ToDo' ? 'w-min text-sm shadow-md shadow-blue-800' : 'w-min text-sm shadow-md shadow-amber-800'} icon={
                                            <span className={detailedTask.taskStatus === 'ToDo' ? "mx-auto mt-1.5 block h-2 w-2 rounded-full bg-blue-900 content-['']" : "mx-auto mt-1.5 block h-2 w-2 rounded-full bg-amber-800 content-['']"} />
                                        } />}
                                    {detailedTask.taskStatus === "Completed" &&
                                        <Chip variant="ghost" color="green" className='w-min shadow-md shadow-green-600 text-sm' value={detailedTask.taskStatus} icon={
                                            <span className=" mt-1.5 block h-2 w-2 rounded-full bg-green-900 content-['']" />
                                        } />}

                                </div>
                            </CardHeader>
                            <CardBody>
                                <Typography variant='h6' color='gray' className="mt-4 mb-2">Created At : <span className='text-cyan-500'>{taskDate(detailedTask.date)}</span>
                                </Typography>
                                <Typography color='gray' className='mb-4' variant='h6'>Description: <span className='text-blue-gray-800 text-base'>{detailedTask.taskDescription}</span></Typography>
                                <hr />
                                <div className="my-2">
                                    <Typography color="blue-gray" className="text-base text-gray-900 font-bold tracking-wide">
                                        Sub-Task : {detailedTask.subTask.length}
                                    </Typography>
                                </div>
                                <hr />
                                <div className="mt-10 mb-4">
                                    <Typography variant="h6" color="blue-gray" className='mb-2'>
                                        TASK TEAM
                                    </Typography>
                                    <div className="divide-y divide-gray-200">
                                        {detailedTask.taskMembers.map(({ firstName, lastName, role }, index) => (
                                            <div key={index} className="pb-2 pt-2 last:pb-0">
                                                <div className="flex items-center gap-5">
                                                    <div className="h-10 w-10 flex justify-center items-center rounded-full bg-indigo-900 shadow-md shadow-indigo-600">
                                                        <p className='text-white font-medium'>{firstName.slice(0, 1) + lastName.slice(0, 1)}</p>
                                                    </div>
                                                    <div>
                                                        <Typography color="blue-gray" variant="h6">
                                                            {firstName} {lastName}
                                                        </Typography>
                                                        <Typography variant="small" color="gray">
                                                            {role}
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </CardBody>
                            <CardFooter>
                                <Typography variant="h6" color="blue-gray" className='mb-2'>
                                    SUB-TASKS
                                </Typography>
                                <div className="divide-y divide-gray-200">
                                    {detailedTask.subTask.length > 0 ?
                                        detailedTask.subTask.map(({ subTaskName, subTaskRole }, index) => (
                                            // <div>
                                            <div key={index} className='flex items-center gap-5 py-3 last:pb-0'>
                                                <div className='h-10 w-10 rounded-full shadow-lg shadow-indigo-600 flex items-center justify-center bg-indigo-900'>
                                                    <ArrowRightStartOnRectangleIcon stroke={5} className='h-6 w-6' color='white' />
                                                </div>
                                                <div>
                                                    <div className='flex items-center gap-4'>
                                                        <p className="text-sm font-bold tracking-wide text-gray-600">{taskDate(detailedTask.date)}
                                                        </p>
                                                        <Chip color='indigo' value={subTaskRole} className='shadow-md shadow-indigo-600' />
                                                    </div>
                                                    <Typography color="blue-gray" className='font-semibold mt-2'>
                                                        {subTaskName}
                                                    </Typography>
                                                </div>
                                            </div>
                                        )) :
                                        <Typography color="blue-gray" variant='lead'>
                                            No Sub-Tasks
                                        </Typography>
                                    }
                                </div>
                                <Button color='indigo' variant='gradient' className="mt-8 flex gap-2 items-center">
                                    <PlusIcon className="h-5 w-5 text-white" />
                                    Add Subtask
                                </Button>
                            </CardFooter>
                        </Card>
                    </TabPanel>
                    <TabPanel className='px-0' value='taskActivities'>
                        <Card>
                            <CardBody>
                                <h4>Coming</h4>
                            </CardBody>
                        </Card>
                    </TabPanel>
                </TabsBody>
            </Tabs> :
                <h3>Loading...</h3>}
        </>
    )
}

export default TaskDetail