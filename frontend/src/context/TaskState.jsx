import React, { useState } from 'react'
import TaskContext from './TaskContext'

function TaskState(props) {
    const [first, setfirst] = useState('Gopi')
    return (
        <TaskContext.Provider value={{ first }}>
            {props.children}
        </TaskContext.Provider>
    )
}

export default TaskState