import React from 'react'
import { useParams } from 'react-router-dom'

function TaskStatus() {

    const { status } = useParams();

    return (
        <div>
            <h1>{status}</h1>
            TaskStatus:{status}
        </div>
    )
}

export default TaskStatus
