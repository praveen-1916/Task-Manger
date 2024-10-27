import React, { useState } from 'react'
import TaskContext from './TaskContext'

function TaskState(props) {



    //creating new task 
    const createTask = async (taskData) => {
        try {
            const apiUrl = import.meta.env.VITE_URL_END_POINT + import.meta.env.VITE_ADD_TASK;
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZmYmNjZmMwN2RlOTRkNjBhOTRmZThkIn0sImlhdCI6MTcyOTY3Mzk2Nn0.0cTrpO3RK8haJQQ2VgitohW0mjinys1zsSkjAHlZET0"
                },
                body: JSON.stringify(taskData),
            });
            const data = await response.json();
            if (data.success) {
                getAllTasks();
            }
            console.log(data)
        } catch (error) {
            console.error(error.message);
        }
    }


    //updating a existing task

    const [editingTask, setEditingTask] = React.useState();
    const [openEditForm, setOpenEditForm] = React.useState(false);
    const handleOpenEditForm = () => setOpenEditForm(!openEditForm);

    const editTask = (task) => {
        setOpenEditForm(!openEditForm);
        setEditingTask(task);
    }

    const updateTask = async (taskId, taskData) => {
        try {
            const apiUrl = import.meta.env.VITE_URL_END_POINT + import.meta.env.VITE_UPDATE_TASK + taskId;
            const response = await fetch(apiUrl, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZmYmNjZmMwN2RlOTRkNjBhOTRmZThkIn0sImlhdCI6MTcyOTY3Mzk2Nn0.0cTrpO3RK8haJQQ2VgitohW0mjinys1zsSkjAHlZET0"
                },
                body: JSON.stringify(taskData),
            });
            const data = await response.json();
            if (data.success) {
                getAllTasks();
            }
            console.log(data)
        } catch (error) {
            console.error(error.message);
        }
    }

    //deleting an existing task

    const deleteTask = async (taskId) => {
        try {
            const apiUrl = import.meta.env.VITE_URL_END_POINT + import.meta.env.VITE_DELETE_TASK + taskId;
            const response = await fetch(apiUrl, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZmYmNjZmMwN2RlOTRkNjBhOTRmZThkIn0sImlhdCI6MTcyOTY3Mzk2Nn0.0cTrpO3RK8haJQQ2VgitohW0mjinys1zsSkjAHlZET0"
                },
            });
            const data = await response.json();
            console.log(data)
        } catch (error) {
            console.error(error.message);
        }
    }


    //fetching all tasks
    const [allTasks, setAllTasks] = useState([])
    const getAllTasks = async () => {
        try {
            const apiUrl = import.meta.env.VITE_URL_END_POINT + import.meta.env.VITE_GET_ALL_TASKS;
            const response = await fetch(apiUrl, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZmYmNjZmMwN2RlOTRkNjBhOTRmZThkIn0sImlhdCI6MTcyOTY3Mzk2Nn0.0cTrpO3RK8haJQQ2VgitohW0mjinys1zsSkjAHlZET0",
                    "admin": true
                }
            });
            const data = await response.json();
            setAllTasks(data.allTasks);
            console.log(data);
        } catch (error) {
            console.error(error.message);
        }
    }

    const [statusTasks, setStatusTasks] = useState([])
    const taskStatusCheck = (status) => {
        // console.log(allTasks)
        const tasks = allTasks.filter(task => { return task.taskStatus === status })
        console.log(tasks)
        setStatusTasks(tasks);
    }

    const [detailedTask, setDetailedTask] = useState(null)
    const getTaskdetails = (taskId) => {
        // console.log(typeof (taskId));
        const task = allTasks.find(task => task._id === taskId);
        console.log(task)
        setDetailedTask(task);
    }


    const [teamMembers, setTeamMembers] = useState([])
    const getTeamMembers = async () => {
        try {
            const apiUrl = import.meta.env.VITE_URL_END_POINT + import.meta.env.VITE_GET_TEAM;
            const response = await fetch(apiUrl, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZmYmNjZmMwN2RlOTRkNjBhOTRmZThkIn0sImlhdCI6MTcyOTY3Mzk2Nn0.0cTrpO3RK8haJQQ2VgitohW0mjinys1zsSkjAHlZET0",
                    "admin": 'true'
                }
            });
            const data = await response.json();
            console.log(data)
            setTeamMembers(data.teamMembersDetails);
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <TaskContext.Provider value={{ createTask, getAllTasks, updateTask, deleteTask, getTeamMembers, teamMembers, allTasks, openEditForm, editingTask, handleOpenEditForm, editTask, taskStatusCheck, statusTasks, getTaskdetails, detailedTask }}>
            {props.children}
        </TaskContext.Provider>
    )
}

export default TaskState