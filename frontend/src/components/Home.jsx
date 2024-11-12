import React, { useContext, useEffect, useState } from 'react'
import SideBarSimple from './SidebarSimple'
import AllTasks from './AllTasks'
import { Routes, Route, useNavigate } from "react-router-dom"
import Dashboard from './Dashboard'
import TeamMembers from './TeamMembers'
import TaskContext from '../context/TaskContext'
import TaskDetail from './TaskDetail'
import { AddSubTaskForm } from './TaskFroms'
import { Alert, Dialog } from '@material-tailwind/react'
import LoadingBar from 'react-top-loading-bar'
import UserProfile from './UserProfile'

function Home() {
    const navigate = useNavigate();
    const context = useContext(TaskContext);
    const { getAllTasks, getTeamMembers, openAddSubTaskForm, handleOpenAddSubTaskForm, getUser, progress, alertData } = context;

    const [openNav, setOpenNav] = useState(false);

    const handleWindowResize = () => {
        if (window.innerWidth >= 960) {
            setOpenNav(false)
        } else {
            setOpenNav(true)
        }
    }

    useEffect(() => {
        if (localStorage.getItem('authToken')) {
            getTeamMembers();
            getAllTasks();
            getUser();
        } else {
            navigate('/login');
        }
        window.addEventListener("resize", handleWindowResize);
        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, []);



    return (
        <>
            <LoadingBar progress={progress} color='#1a237e' />
            {alertData && <Alert className={alertData.success ? 'w-max shadow-lg shadow-[#bdfdc7] bg-[#f0fff1] text-[#2ec945] border-l-4 border-l-[#2ec946] px-5 z-50 rounded-sm fixed bottom-5 right-5' : 'w-max shadow-xl shadow-[#fdb9b9] bg-[#fdf0d5] text-[#d00000] border-l-4 border-l-[#d00000] px-5 z-50 rounded-sm fixed bottom-5 right-5'}
                icon={React.createElement(alertData.icon, {
                    className: `h-6 w-6`,
                })}
                animate={{
                    mount: { y: 0 },
                    unmount: { y: 100 },
                }}
            >
                {alertData.msg}
            </Alert>}
            <div className='flex'>
                {!openNav && <SideBarSimple />}
                <div className='flex-grow bg-gray-50'>
                    <Routes>
                        <Route exact path='/' element={<Dashboard />} />
                        <Route exact path='allTasks' element={<AllTasks />} />
                        <Route exact path='tasks/:status' element={<AllTasks />} />
                        <Route exact path='task/:taskId' element={<TaskDetail />} />
                        <Route exact path='teamMembers' element={<TeamMembers />} />
                        <Route exact path='profile' element={<UserProfile />} />
                    </Routes>
                </div>
            </div>
            <Dialog size='sm' open={openAddSubTaskForm} handler={handleOpenAddSubTaskForm}>
                <AddSubTaskForm />
            </Dialog>
        </>

    )
}

export default Home