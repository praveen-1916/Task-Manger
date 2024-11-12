import React, { useState } from 'react'
import TaskContext from './TaskContext'
import { BugAntIcon, ChatBubbleLeftEllipsisIcon, CheckCircleIcon, CircleStackIcon, ClockIcon, HandThumbUpIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';

function TaskState(props) {
    const navigate = useNavigate();

    // Top loading bar
    const [progress, setProgress] = useState(0);

    //showing alert to actions
    const [alertData, setAlertData] = useState(null);

    const showAlert = (data) => {
        if (data.success) {
            setAlertData({
                msg: data.msg,
                icon: CheckCircleIcon,
                success: true
            });
        } else {
            setAlertData({
                msg: data.errorMsg,
                icon: QuestionMarkCircleIcon,
                success: false
            });
        }

        setTimeout(() => {
            setAlertData(null);
        }, 5000);
    }

    const timelineIcons = [
        {
            label: "Started",
            icon: HandThumbUpIcon,
            color: "indigo"
        },
        {
            label: '',
            icon: CircleStackIcon,
            color: "pink"
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

    //duplicating an existing task

    const [openDuplicateDialog, setOpenDuplicateDialog] = React.useState(false);
    const handleOpenDuplicateDialog = () => setOpenDuplicateDialog(!openDuplicateDialog);


    const [duplicatingTask, setDuplicatingTask] = useState(null)
    const duplicateTask = (task) => {
        setDuplicatingTask(task);
        setOpenDuplicateDialog(!openDuplicateDialog);
    }

    const createTask = async (taskData) => {
        setProgress(10);
        try {
            const apiUrl = import.meta.env.VITE_URL_END_POINT + import.meta.env.VITE_ADD_TASK;
            setProgress(40);
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authToken": localStorage.getItem('authToken')
                },
                body: JSON.stringify(taskData),
            });
            const data = await response.json();
            setProgress(70);
            if (data.success) {
                getAllTasks();
            }
            showAlert(data);
        } catch (error) {
            console.error(error.message);
        }
        setProgress(100);
    }


    //updating a existing task

    const [openEditForm, setOpenEditForm] = React.useState(false);
    const handleOpenEditForm = () => setOpenEditForm(!openEditForm);

    const [editingTask, setEditingTask] = React.useState();
    const editTask = (task) => {
        setEditingTask(task);
        setOpenEditForm(!openEditForm);
    }

    const updateTask = async (taskId, taskData) => {
        setProgress(10);
        try {
            const apiUrl = import.meta.env.VITE_URL_END_POINT + import.meta.env.VITE_UPDATE_TASK + taskId;
            setProgress(40);
            const response = await fetch(apiUrl, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "authToken": localStorage.getItem('authToken')
                },
                body: JSON.stringify(taskData),
            });
            setProgress(70);
            const data = await response.json();
            if (data.success) {
                getAllTasks();
            }
            showAlert(data);
        } catch (error) {
            console.error(error.message);
        }
        setProgress(100);
    }

    //deleting an existing task

    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
    const handleOpenDeleteDialog = () => setOpenDeleteDialog(!openDeleteDialog);

    const [deleteTaskId, setDeleteTaskId] = useState(null)
    const openDeleteTaskDialog = (id) => {
        setDeleteTaskId(id);
        setOpenDeleteDialog(!openDeleteDialog);
    }

    const deleteTask = async (taskId) => {
        setProgress(10);
        try {
            const apiUrl = import.meta.env.VITE_URL_END_POINT + import.meta.env.VITE_DELETE_TASK + taskId;
            setProgress(40);
            const response = await fetch(apiUrl, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "authToken": localStorage.getItem('authToken')
                },
            });
            const data = await response.json();
            setProgress(70);
            if (data.success) {
                getAllTasks();
            }
            showAlert(data);

        } catch (error) {
            console.error(error.message);
        }
        setProgress(100);
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

        } catch (error) {
            console.error(error.message);
        }

    }



    // filtering tasks by its status 
    const [statusTasks, setStatusTasks] = useState([])
    const taskStatusCheck = (status) => {
        const tasks = allTasks.filter(task => { return task.taskStatus === status })
        setStatusTasks(tasks);
    }

    // filtering a task from all tasks by clicking on a particular task
    const [taskDetails, setTaskDetails] = useState(null)
    const getTaskdetails = (taskId) => {
        const task = allTasks.find(task => task._id === taskId);
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
            setTeamMembers(data.teamMembersDetails);
        } catch (error) {
            console.error(error.message);
        }
    }

    // fetching user details
    const [userDetails, setUserDetails] = useState(null);
    const getUser = async () => {
        setProgress(10);
        try {
            const apiUrl = import.meta.env.VITE_URL_END_POINT + import.meta.env.VITE_GET_USER;
            setProgress(40);
            const response = await fetch(apiUrl, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "authToken": localStorage.getItem('authToken'),
                }
            });
            const data = await response.json();
            setProgress(70);
            setUserDetails(data.userDetails);
        } catch (error) {
            console.error(error.message);
        }
        setProgress(100);
    }


    // adding activities to task with proper security

    const addActivity = async (taskId, activityDetails) => {
        setProgress(10);
        try {
            const apiUrl = import.meta.env.VITE_URL_END_POINT + import.meta.env.VITE_ADD_ACTIVITY + taskId;
            setProgress(40);
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authToken": localStorage.getItem('authToken')
                },
                body: JSON.stringify(activityDetails),
            });
            const data = await response.json();
            setProgress(70);
            if (data.success) {
                getAllTasks();
            }
            showAlert(data);

        } catch (error) {
            console.error(error.message);
        }
        setProgress(100);
    }


    //adding a subtask to a particular task

    const [openAddSubTaskForm, setOpenAddSubTaskForm] = React.useState(false);
    const handleOpenAddSubTaskForm = () => setOpenAddSubTaskForm(!openAddSubTaskForm);

    const [subTaskId, setSubTaskId] = useState(null)
    const openSubTaskForm = (id) => {
        setSubTaskId(id);
        setOpenAddSubTaskForm(!openAddSubTaskForm);
    }

    const addSubTask = async (taskId, subTaskDetails) => {
        setProgress(10);
        try {
            const apiUrl = import.meta.env.VITE_URL_END_POINT + import.meta.env.VITE_ADD_SUB_TASK + taskId;
            setProgress(40);
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authToken": localStorage.getItem('authToken')
                },
                body: JSON.stringify(subTaskDetails),
            });
            const data = await response.json();
            setProgress(70);
            if (data.success) {
                getAllTasks();
            }
            showAlert(data);
        } catch (error) {
            console.error(error.message);
        }
        setProgress(100);
    }

    //ADDING LOGIN COMPONENT FUNCTIONALITY

    const [userCreationError, setUserCreationError] = useState(null);
    const [loadingSignUpBtn, setLoadingSignUpBtn] = useState(false);

    const createUserAccount = async (userDetails) => {
        try {
            setLoadingSignUpBtn(true);
            const apiUrl = import.meta.env.VITE_URL_END_POINT + import.meta.env.VITE_SIGNUP;
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userDetails),
            });
            const data = await response.json();
            if (data.success) {
                showAlert(data);
                navigate('/login');
                setUserCreationError(null);
                setLoadingSignUpBtn(false);
            } else {
                setUserCreationError(data);
                setLoadingSignUpBtn(false);
            }
            ;
        } catch (error) {
            console.error(error.message);
        }
    }

    const createTeamMemberAccount = async (teamMemberDetails) => {
        setProgress(10);
        try {
            const apiUrl = import.meta.env.VITE_URL_END_POINT + import.meta.env.VITE_ADD_MEMBER;
            setProgress(40);
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authToken": localStorage.getItem('authToken'),
                },
                body: JSON.stringify(teamMemberDetails),
            });
            const data = await response.json();
            setProgress(70);
            if (data.success) {
                getTeamMembers();
            }
            showAlert(data);
            ;
        } catch (error) {
            console.error(error.message);
        }
        setProgress(100);
    }

    const [loginError, setLoginError] = useState(null);
    const [loadingLoginBtn, setLoadingLoginBtn] = useState(false);

    const userLogin = async (userDetails) => {
        try {
            setLoadingLoginBtn(true);
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
                showAlert(data);
                localStorage.setItem('authToken', data.authToken);
                localStorage.setItem('admin', data.admin);
                setLoginError(null);
                setLoadingLoginBtn(false);
                navigate('/');
            } else {
                setLoginError(data);
                setLoadingLoginBtn(false);
            }
            ;
        } catch (error) {
            console.error(error.message);
        }
    }



    return (
        <TaskContext.Provider value={{ progress, alertData, loginError, loadingLoginBtn, loadingSignUpBtn, userCreationError, createTask, getAllTasks, updateTask, deleteTask, getTeamMembers, teamMembers, allTasks, openEditForm, editingTask, handleOpenEditForm, editTask, openDeleteDialog, handleOpenDeleteDialog, deleteTaskId, openDeleteTaskDialog, taskStatusCheck, statusTasks, getTaskdetails, taskDetails, userDetails, getUser, addActivity, timelineIcons, addSubTask, openAddSubTaskForm, openSubTaskForm, subTaskId, handleOpenAddSubTaskForm, createTeamMemberAccount, createUserAccount, userLogin, openDuplicateDialog, handleOpenDuplicateDialog, duplicatingTask, duplicateTask }}>
            {props.children}
        </TaskContext.Provider>
    )
}

export default TaskState