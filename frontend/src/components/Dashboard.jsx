import React, { useContext } from 'react'
import { Card, CardBody, IconButton, Typography, CardHeader, } from '@material-tailwind/react';
import TaskContext from '../context/TaskContext';
import { ArrowLeftStartOnRectangleIcon, CheckBadgeIcon, ClockIcon, PlayCircleIcon } from '@heroicons/react/24/solid';
import Chart from "react-apexcharts";
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";

function Dashboard() {

    const context = useContext(TaskContext);
    const { allTasks } = context;

    const taskStatusLength = (status) => {
        const length = allTasks.filter((task) => (task.taskStatus === status)).length;
        return length;
    }

    const taskPriorityLength = (priority) => {
        const length = allTasks.filter((task) => (task.taskPriority === priority)).length;
        return length;
    }




    const chartConfig = {
        type: "bar",
        height: 240,
        series: [
            {
                name: "Priority",
                data: [taskPriorityLength('High'), taskPriorityLength('Low'), taskPriorityLength('Normal')],
            },
        ],
        options: {
            chart: {
                toolbar: {
                    show: false,
                },
            },
            title: {
                show: "",
            },
            dataLabels: {
                enabled: false,
            },
            colors: ["#020617"],
            plotOptions: {
                bar: {
                    columnWidth: "40%",
                    borderRadius: 2,
                },
            },
            xaxis: {
                axisTicks: {
                    show: false,
                },
                axisBorder: {
                    show: false,
                },
                labels: {
                    style: {
                        colors: "#616161",
                        fontSize: "12px",
                        fontFamily: "inherit",
                        fontWeight: 400,
                    },
                },
                categories: [
                    "High",
                    "Low",
                    "Normal",
                ],
            },
            yaxis: {
                labels: {
                    style: {
                        colors: "#616161",
                        fontSize: "12px",
                        fontFamily: "inherit",
                        fontWeight: 400,
                    },
                },
            },
            grid: {
                show: true,
                borderColor: "#dddddd",
                strokeDashArray: 5,
                xaxis: {
                    lines: {
                        show: true,
                    },
                },
                padding: {
                    top: 5,
                    right: 20,
                },
            },
            fill: {
                opacity: 0.8,
            },
            tooltip: {
                theme: "dark",
            },
        },
    };

    return (
        <>
            <div className='m-6'>
                <div className='grid lg:grid-cols-4 md:grid-cols-2 gap-3'>
                    <Card className='rounded-sm'>
                        <CardBody>
                            <Typography variant='h6' color='blue-gray'>TOTAL TASKS</Typography>
                            <div className='flex justify-between items-center mt-2'>
                                <Typography variant='h5' color='blue-gray'>{allTasks.length}</Typography>
                                <IconButton size='sm' className='rounded-full'>
                                    <ArrowLeftStartOnRectangleIcon className='h-5 w-5' />
                                </IconButton>
                            </div>
                        </CardBody>
                    </Card>
                    <Card className='rounded-sm'>
                        <CardBody>
                            <Typography variant='h6' color='blue-gray'>COMPLETED TASKS</Typography>
                            <div className='flex justify-between items-center mt-2'>
                                <Typography variant='h5' color='blue-gray'>{taskStatusLength('Completed')}</Typography>
                                <IconButton size='sm' color='green' className='rounded-full'>
                                    <CheckBadgeIcon className='h-5 w-5' />
                                </IconButton>
                            </div>
                        </CardBody>
                    </Card>
                    <Card className='rounded-sm'>
                        <CardBody>
                            <Typography variant='h6' color='blue-gray'>TASK IN PROGRESS</Typography>
                            <div className='flex justify-between items-center mt-2'>
                                <Typography variant='h5' color='blue-gray'>{taskStatusLength('In Progress')}</Typography>
                                <IconButton size='sm' color='orange' className='rounded-full'>
                                    <ClockIcon className='h-5 w-5' />
                                </IconButton>
                            </div>
                        </CardBody>
                    </Card>
                    <Card className='rounded-sm'>
                        <CardBody>
                            <Typography variant='h6' color='blue-gray'>TODOS</Typography>
                            <div className='flex justify-between items-center mt-2'>
                                <Typography variant='h5' color='blue-gray'>{taskStatusLength('ToDo')}</Typography>
                                <IconButton size='sm' variant='gradient' color='cyan' className='rounded-full'>
                                    <PlayCircleIcon className='h-5 w-5' />
                                </IconButton>
                            </div>
                        </CardBody>
                    </Card>
                </div>
                <Card className='my-6 rounded-sm'>
                    <CardHeader
                        floated={false}
                        shadow={false}
                        color="transparent"
                        className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
                    >
                        <div className="w-max rounded-lg bg-gray-900 p-5 text-white">
                            <Square3Stack3DIcon className="h-6 w-6" />
                        </div>
                        <div>
                            <Typography variant="h6" color="blue-gray">
                                Task Priority Chart
                            </Typography>
                            <Typography
                                variant="small"
                                color="gray"
                                className="max-w-sm font-normal"
                            >
                                Visualizing the data in a simple way using
                                priority of the tasks. Here we go!
                            </Typography>
                        </div>
                    </CardHeader>
                    <CardBody className="px-2 pb-0">
                        <Chart {...chartConfig} />
                    </CardBody>
                </Card>
            </div>
        </>
    )
}

export default Dashboard