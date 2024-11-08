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
    Dialog,
} from "@material-tailwind/react";

import {
    Timeline,
    TimelineItem,
    TimelineConnector,
    TimelineHeader,
    TimelineIcon,
    TimelineBody,
    Breadcrumbs
} from "@material-tailwind/react";
import { ArrowRightStartOnRectangleIcon, ChevronDoubleUpIcon, ChevronUpIcon, ClipboardDocumentCheckIcon, ClipboardDocumentListIcon, PlusIcon } from '@heroicons/react/24/solid';
import TaskContext from '../context/TaskContext';
import { Link, useParams } from 'react-router-dom';
import { AddTaskTimelineForm } from './TaskFroms';

// const taskDetails = {
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
//     "taskTimeLine": [
//         {
//             "userName": "Praveen kumar Battu",
//             "userMsg": "This is praveen",
//             "iconLabel": "Started",
//             "date": "2024-10-23T18:48:45.000Z",
//         },
//         {
//             "userName": "Praveen kumar Battu",
//             "userMsg": "This is praveen",
//             "date": "2024-10-23T18:52:45.000Z",
//             "iconLabel": "Commented",
//         },
//         {
//             "userName": "Praveen kumar Battu",
//             "userMsg": "This is praveen",
//             "date": "2024-10-27T18:59:45.000Z",
//             "iconLabel": "Completed",
//         },
//         {
//             "userName": "Praveen kumar Battu",
//             "userMsg": "This is praveen",
//             "date": "2024-10-27T18:59:45.000Z",
//             "iconLabel": "Bug",
//         },
//         {
//             "userName": "Praveen kumar Battu",
//             "userMsg": "This is praveen",
//             "date": "2024-10-27T18:59:45.000Z",
//             "iconLabel": "Doubt",
//         },
//         {
//             "userName": "Praveen kumar Battu",
//             "userMsg": "This is praveen",
//             "date": "2024-10-27T18:59:45.000Z",
//             "iconLabel": "In Progress",
//         },
//     ],
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

    const context = useContext(TaskContext);
    const { taskDetails, getTaskdetails, allTasks, timelineIcons, openSubTaskForm } = context;

    const iconFinder = (label) => {
        return timelineIcons.find(timelineIcon => timelineIcon.label === label)?.icon;
    }
    const colorFinder = (label) => {
        return timelineIcons.find(timelineIcon => timelineIcon.label === label)?.color;
    }

    const capitalizing = (word) => {
        return word.toUpperCase();
    }
    const taskDate = (date) => {
        return new Date(date).toDateString();
    }

    const taskTimelineDate = (date) => {
        return new Date(date).toLocaleString();
    }


    const { taskId } = useParams();

    useEffect(() => {
        getTaskdetails(taskId);
    }, [taskId, allTasks])

    const [openAddActivityForm, setOpenAddActivityForm] = React.useState(false);
    const handleOpenAddActivityForm = () => {
        setOpenAddActivityForm(!openAddActivityForm);
    }


    return (
        <>
            <Breadcrumbs className='bg-transparent mx-8 my-6'>
                <Link to="/" className="opacity-60 text-base">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                </Link>
                <Link to="/allTasks" className="text-base opacity-60">
                    <span>All Tasks</span>
                </Link>
                <Link to={`/tasks/${taskDetails.taskStatus}`} className="text-base opacity-60">
                    <span>{taskDetails.taskStatus}</span>
                </Link>
                <Typography className="text-base opacity-60">
                    <span>Detailed Task</span>
                </Typography>
            </Breadcrumbs>

            {taskDetails ?
                <Tabs value="taskInfo" className='m-6'>
                    <TabsHeader className="rounded-none bg-transparent mx-4 p-0 pb-3 gap-5"
                        indicatorProps={{
                            className:
                                "bg-transparent border-b-2 border-gray-900 rounded-none",
                        }}>
                        <Tab value='taskInfo' className='w-max p-2 bg-white shadow-md shadow-gray-500 '>
                            <div className='flex items-center gap-1'>
                                <ClipboardDocumentCheckIcon className='h-4 w-4' />
                                <p className='font-Normal tracking-wide'>Task Details</p>
                            </div>
                        </Tab>
                        <Tab value='taskActivities' className='w-max p-2 bg-white shadow-md shadow-gray-500'>
                            <div className='flex items-center gap-1'>
                                <ClipboardDocumentListIcon className='h-4 w-4' />
                                <p className='font-Normal tracking-wide'>Activities/Timeline</p>
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
                            <Card className='rounded-sm mx-4'>
                                <CardHeader floated={false} shadow={false}>
                                    <div className="flex gap-2 items-center">
                                        {taskDetails.taskPriority !== 'Normal' && <p className={taskDetails.taskPriority === 'High' ? 'h-3 w-3 rounded-full bg-red-900' : 'h-5 w-5 rounded-full bg-amber-900'}></p>}
                                        {taskDetails.taskPriority === 'Normal' && <p className={'h-3 w-3 rounded-full bg-green-900'}></p>}
                                        <Typography variant="h2" color="blue-gray" className="text-2xl tracking-wide">
                                            {taskDetails.taskName}
                                        </Typography>
                                    </div>
                                    <div className="my-4 flex flex-col sm:items-center gap-6 sm:flex-row">
                                        {taskDetails.taskPriority === "High" &&
                                            <div className='flex items-center gap-1'>
                                                <ChevronDoubleUpIcon className="h-5 w-5 text-red-900" />
                                                <Typography className='tracking-wide font-bold text-red-900' >
                                                    {capitalizing(taskDetails.taskPriority)} PRIORITY
                                                </Typography>
                                            </div>
                                        }
                                        {taskDetails.taskPriority === 'Low' &&
                                            <div className='flex items-center gap-1'>
                                                <ChevronUpIcon className='h-5 w-5 text-amber-900' />
                                                <Typography className='tracking-wide font-bold text-amber-900' >
                                                    {capitalizing(taskDetails.taskPriority)} PRIORITY
                                                </Typography>
                                            </div>
                                        }
                                        {taskDetails.taskPriority === 'Normal' &&
                                            <Typography className='tracking-wide font-bold text-green-700'>
                                                {capitalizing(taskDetails.taskPriority)} PRIORITY
                                            </Typography>
                                        }

                                        {taskDetails.taskStatus !== 'Completed' &&
                                            <Chip variant="ghost" color={taskDetails.taskStatus === 'ToDo' ? 'blue' : 'amber'} value={taskDetails.taskStatus} className={taskDetails.taskStatus === 'ToDo' ? 'w-min text-sm shadow-md shadow-blue-800' : 'w-min text-sm shadow-md shadow-amber-800'} icon={
                                                <span className={taskDetails.taskStatus === 'ToDo' ? "mx-auto mt-1.5 block h-2 w-2 rounded-full bg-blue-900 content-['']" : "mx-auto mt-1.5 block h-2 w-2 rounded-full bg-amber-800 content-['']"} />
                                            } />}
                                        {taskDetails.taskStatus === "Completed" &&
                                            <Chip variant="ghost" color="green" className='w-min shadow-md shadow-green-600 text-sm' value={taskDetails.taskStatus} icon={
                                                <span className=" mt-1.5 block h-2 w-2 rounded-full bg-green-900 content-['']" />
                                            } />}

                                    </div>
                                </CardHeader>
                                <CardBody>
                                    <Typography variant='h6' color='gray' className="mt-4 mb-2">Created At : <span className='text-cyan-500'>{taskDate(taskDetails.date)}</span>
                                    </Typography>
                                    <Typography color='gray' className='mb-4' variant='h6'>Description: <span className='text-blue-gray-800 text-base'>{taskDetails.taskDescription}</span></Typography>
                                    <hr />
                                    <div className="my-2">
                                        <Typography color="blue-gray" className="text-base text-gray-900 font-bold tracking-wide">
                                            Sub-Task : {taskDetails.subTask.length}
                                        </Typography>
                                    </div>
                                    <hr />
                                    <div className="mt-10 mb-4">
                                        <Typography variant="h6" color="blue-gray" className='mb-2'>
                                            TASK TEAM
                                        </Typography>
                                        <div className="divide-y divide-gray-200">
                                            {taskDetails.taskMembers.map(({ firstName, lastName, role }, index) => (
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
                                        {taskDetails.subTask.length > 0 ?
                                            taskDetails.subTask.map(({ subTaskName, subTaskRole, date }, index) => (
                                                // <div>
                                                <div key={index} className='flex items-center gap-5 py-3 last:pb-0'>
                                                    <div className='h-10 w-10 rounded-full shadow-lg shadow-indigo-600 flex items-center justify-center bg-indigo-900'>
                                                        <ArrowRightStartOnRectangleIcon stroke={5} className='h-6 w-6' color='white' />
                                                    </div>
                                                    <div>
                                                        <div className='flex items-center gap-4'>
                                                            <p className="text-sm font-bold tracking-wide text-gray-600">{taskDate(date)}
                                                            </p>
                                                            <Chip color='indigo' value={subTaskRole !== '' ? subTaskRole : 'Sub-Assignment'} className='shadow-md shadow-indigo-600' />
                                                        </div>
                                                        <Typography color="blue-gray" className='mt-2'>
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
                                    {localStorage.getItem('admin') === 'true' && <Button color='indigo' variant='gradient' className="mt-8 flex gap-2 items-center" onClick={() => openSubTaskForm(taskDetails._id)}>
                                        <PlusIcon className="h-5 w-5 text-white" />
                                        Add Sub-Task
                                    </Button>}
                                </CardFooter>
                            </Card>
                        </TabPanel>
                        <TabPanel className='px-0' value='taskActivities'>
                            <Card className='rounded-sm mx-4'>
                                <CardHeader floated={false} shadow={false}>
                                    <div className="flex gap-2 items-center">
                                        {taskDetails.taskPriority !== 'Normal' && <p className={taskDetails.taskPriority === 'High' ? 'h-3 w-3 rounded-full bg-red-900' : 'h-5 w-5 rounded-full bg-amber-900'}></p>}
                                        {taskDetails.taskPriority === 'Normal' && <p className={'h-3 w-3 rounded-full bg-green-900'}></p>}
                                        <Typography variant="h2" color="blue-gray" className="text-2xl tracking-wide">
                                            {taskDetails.taskName}
                                        </Typography>
                                    </div>
                                </CardHeader>
                                <CardBody className='flex sm:flex-row sm:gap-0 gap-5 flex-col justify-between'>
                                    {taskDetails.taskTimeLine.length > 0 ?
                                        <div className="w-auto">
                                            <Timeline>
                                                {taskDetails.taskTimeLine.map(({ userName, userMsg, date, iconLabel }, index) => (
                                                    <TimelineItem key={index}>
                                                        <TimelineConnector />
                                                        <TimelineHeader className='gap-5 shadow-cyan-600'>
                                                            <TimelineIcon className={`h-10 w-10 bg-${colorFinder(iconLabel)}-900 flex items-center justify-center shadow-lg shadow-${colorFinder(iconLabel)}-600`}>
                                                                {React.createElement(iconFinder(iconLabel), {
                                                                    className: 'h-6 w-6',
                                                                    color: 'white'
                                                                })}
                                                            </TimelineIcon>
                                                            <div>
                                                                <Typography variant="h5" color="blue-gray">
                                                                    {userName}
                                                                </Typography>
                                                                <div className='shadow-red-600 flex items-center gap-3'>
                                                                    <Typography variant="small" color="gray" className="font-normal">
                                                                        {taskTimelineDate(date)}
                                                                    </Typography>
                                                                    <Chip color='indigo' value={iconLabel} className='shadow-md shadow-indigo-600' />
                                                                </div>
                                                            </div>
                                                        </TimelineHeader>
                                                        <TimelineBody className="pb-8 gap-5">
                                                            <Typography color="gray" className="font-normal text-gray-600">
                                                                {userMsg}
                                                            </Typography>
                                                        </TimelineBody>
                                                    </TimelineItem>
                                                ))}
                                            </Timeline>
                                        </div> :
                                        <Typography variant="h2" color="blue-gray" className="text-xl tracking-wide">
                                            No Activities to show.
                                        </Typography>}


                                    <Button className='h-max' color='indigo' onClick={handleOpenAddActivityForm}>Add Activity</Button>
                                    <Dialog size='sm' open={openAddActivityForm} handler={handleOpenAddActivityForm}>
                                        <AddTaskTimelineForm taskId={taskDetails._id} handleOpenAddActivityForm={handleOpenAddActivityForm} />
                                    </Dialog>
                                </CardBody>
                            </Card>
                        </TabPanel>
                    </TabsBody >
                </Tabs > :
                <h3>Loading...</h3>
            }
        </>
    )
}


export default TaskDetail