import React from 'react'
import TaskItem from './TaskItem';
// import TaskContext from '../context/TaskContext';
// import { useParams } from 'react-router-dom';

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



export default function BroadViewTask(props) {
    const { tasks } = props;

    return (
        <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-5' >
            {tasks ? tasks.map((task, index) => (
                <TaskItem key={index} task={task} />
            )) : 'Loading...'}
        </div>
    )

    // const context = useContext(TaskContext);
    // const { allTasks, statusTasks, taskStatusCheck } = context;

    // const { status } = useParams()
    // useEffect(() => {
    //     console.log(status)
    //     if (status) {
    //         taskStatusCheck(status)
    //     }
    // }, [status])


    // if (status) {
    //     return (
    //         <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-5' >
    //             {statusTasks.length > 0 ? statusTasks.map((task, index) => (
    //                 <TaskItem key={index} task={task} />
    //             )) : 'Loading...'}
    //         </div>
    //     )
    // } else {
    //     return (
    //         <>
    //             <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-5' >
    //                 {allTasks.length > 0 ? allTasks.map((task, index) => (
    //                     <TaskItem key={index} task={task} />
    //                 )) : 'Loading...'}
    //             </div>
    //         </>
    //     )
    // }
}

