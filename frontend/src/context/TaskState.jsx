import React, { useState } from 'react'
import TaskContext from './TaskContext'
import { BugAntIcon, ChatBubbleLeftEllipsisIcon, CheckCircleIcon, ClockIcon, HandThumbUpIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';

function TaskState(props) {
    const navigate = useNavigate();

    const timelineIcons = [
        {
            label: "Started",
            icon: HandThumbUpIcon,
            color: "indigo"
        },
        {
            label: "Doubt",
            icon: QuestionMarkCircleIcon,
            color: "gray",
        },
        {
            label: "Completed",
            icon: CheckCircleIcon,
            color: "green"
        },
        {
            label: "In Progress",
            icon: ClockIcon,
            color: "amber"
        },
        {
            label: "Comment",
            icon: ChatBubbleLeftEllipsisIcon,
            color: "purple"
        },
        {
            label: "Bug",
            icon: BugAntIcon,
            color: "red"
        },
    ];


    //creating new task 
    const createTask = async (taskData) => {
        try {
            const apiUrl = import.meta.env.VITE_URL_END_POINT + import.meta.env.VITE_ADD_TASK;
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authToken": localStorage.getItem('authToken')
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
                    "authToken": localStorage.getItem('authToken')
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
                    "authToken": localStorage.getItem('authToken')
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
                    "authToken": localStorage.getItem('authToken'),
                    "admin": localStorage.getItem('admin'),
                }
            });
            const data = await response.json();
            setAllTasks(data.allTasks);
            console.log(data);
        } catch (error) {
            console.error(error.message);
        }
    }


    // filtering tasks by its status 
    const [statusTasks, setStatusTasks] = useState([])
    const taskStatusCheck = (status) => {
        const tasks = allTasks.filter(task => { return task.taskStatus === status })
        console.log(tasks)
        setStatusTasks(tasks);
    }

    // filtering a task from all tasks by clicking on a particular task
    const [taskDetails, setTaskDetails] = useState(null)
    const getTaskdetails = (taskId) => {
        const task = allTasks.find(task => task._id === taskId);
        console.log(task);
        setTaskDetails(task);
    }

    //fetching all team members 
    const [teamMembers, setTeamMembers] = useState([])
    const getTeamMembers = async () => {
        try {
            const apiUrl = import.meta.env.VITE_URL_END_POINT + import.meta.env.VITE_GET_TEAM;
            const response = await fetch(apiUrl, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "authToken": localStorage.getItem('authToken'),
                    "admin": localStorage.getItem('admin'),
                }
            });
            const data = await response.json();
            console.log(data)
            setTeamMembers(data.teamMembersDetails);
        } catch (error) {
            console.error(error.message);
        }
    }

    // fetching user details
    const [userDetails, setUserDetails] = useState()
    const getUser = async () => {
        try {
            const apiUrl = import.meta.env.VITE_URL_END_POINT + import.meta.env.VITE_GET_USER;
            const response = await fetch(apiUrl, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "authToken": localStorage.getItem('authToken'),
                }
            });
            const data = await response.json();
            console.log(data);
            setUserDetails(data.userDetails);
        } catch (error) {
            console.error(error.message);
        }
    }


    // adding activities to task with proper security

    const addActivity = async (taskId, activityDetails) => {
        try {
            const apiUrl = import.meta.env.VITE_URL_END_POINT + import.meta.env.VITE_ADD_ACTIVITY + taskId;
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authToken": localStorage.getItem('authToken')
                },
                body: JSON.stringify(activityDetails),
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


    //adding a subtask to a particular task

    const [openAddSubTaskForm, setOpenAddSubTaskForm] = React.useState(false);
    const handleOpenAddSubTaskForm = () => {
        setOpenAddSubTaskForm(!openAddSubTaskForm);
    }

    const [subTaskId, setSubTaskId] = useState(null)
    const openSubTaskForm = (id) => {
        console.log('Sub Task Clicked');
        setSubTaskId(id);
        setOpenAddSubTaskForm(!openAddSubTaskForm);
    }

    const addSubTask = async (taskId, subTaskDetails) => {
        try {
            const apiUrl = import.meta.env.VITE_URL_END_POINT + import.meta.env.VITE_ADD_SUB_TASK + taskId;
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authToken": localStorage.getItem('authToken')
                },
                body: JSON.stringify(subTaskDetails),
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

    //ADDING LOGIN COMPONENT FUNCTIONALITY

    const createUserAccount = async (userDetails) => {
        try {
            const apiUrl = import.meta.env.VITE_URL_END_POINT + import.meta.env.VITE_SIGNUP;
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userDetails),
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error(error.message);
        }
    }

    const createTeamMemberAccount = async (teamMemberDetails) => {
        try {
            const apiUrl = import.meta.env.VITE_URL_END_POINT + import.meta.env.VITE_ADD_MEMBER;
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authToken": localStorage.getItem('authToken'),
                },
                body: JSON.stringify(teamMemberDetails),
            });
            const data = await response.json();
            console.log(data);
            if (data.success) {
                getTeamMembers();
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    const userLogin = async (userDetails) => {
        try {
            const apiUrl = import.meta.env.VITE_URL_END_POINT + import.meta.env.VITE_LOGIN;
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userDetails),
            });
            const data = await response.json();
            if (data.success) {
                localStorage.setItem('authToken', data.authToken);
                localStorage.setItem('admin', data.admin);
                navigate('/');
            }
            console.log(data);
        } catch (error) {
            console.error(error.message);
        }
    }



    return (
        <TaskContext.Provider value={{ createTask, getAllTasks, updateTask, deleteTask, getTeamMembers, teamMembers, allTasks, openEditForm, editingTask, handleOpenEditForm, editTask, taskStatusCheck, statusTasks, getTaskdetails, taskDetails, userDetails, getUser, addActivity, timelineIcons, addSubTask, openAddSubTaskForm, openSubTaskForm, subTaskId, handleOpenAddSubTaskForm, createTeamMemberAccount, createUserAccount, userLogin }}>
            {props.children}
        </TaskContext.Provider>
    )
}

export default TaskState