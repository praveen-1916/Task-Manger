import React from 'react'
import TaskItem from './TaskItem';


export default function BroadViewTask(props) {
    const { tasks } = props;

    return (
        <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-5' >
            {tasks ? tasks.map((task, index) => (
                <TaskItem key={index} task={task} />
            )) : <h4>Loading...</h4>}
        </div>
    )

}

