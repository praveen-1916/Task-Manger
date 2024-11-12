import React from 'react'
import TaskItem from './TaskItem';
import { Typography } from '@material-tailwind/react';

export default function BroadViewTask(props) {
    const { tasks } = props;

    return (
        <>
            {tasks.length > 0 ?
                <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-5' >
                    {tasks.map((task, index) => (
                        <TaskItem key={index} task={task} />
                    ))}
                </div> :
                <Typography variant='h4' color='blue-gray' className='text-center' >No Tasks To Show! Please Add Tasks & Start your journey</Typography>}
        </>

    )

}

