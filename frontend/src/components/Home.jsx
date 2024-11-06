import React, { useContext, useEffect, useState } from 'react'
import SideBarSimple from './SidebarSimple'
import AllTasks from './AllTasks'
import { Routes, Route } from "react-router-dom"
import Dashboard from './Dashboard'
import TeamMembers from './TeamMembers'
import TaskContext from '../context/TaskContext'
import TaskDetail from './TaskDetail'
import { AddSubTaskForm } from './TaskFroms'
import { Dialog } from '@material-tailwind/react'

function Home() {
    const context = useContext(TaskContext);
    const { getAllTasks, getTeamMembers, openAddSubTaskForm, handleOpenAddSubTaskForm, getUser } = context;

    const [openNav, setOpenNav] = useState(false);

    const handleWindowResize = () => {
        if (window.innerWidth >= 960) {
            setOpenNav(false)
        } else {
            setOpenNav(true)
        }
    }

    useEffect(() => {
        getTeamMembers();
        getAllTasks();
        getUser();
        window.addEventListener("resize", handleWindowResize);
        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, []);



    return (
        <>
            <div className='flex'>
                {!openNav && <SideBarSimple />}
                <div className='flex-grow bg-gray-50'>
                    <Routes>
                        <Route exact path='/' element={<Dashboard />} />
                        <Route exact path='allTasks' element={<AllTasks />} />
                        <Route exact path='tasks/:status' element={<AllTasks />} />
                        <Route exact path='task/:taskId' element={<TaskDetail />} />
                        <Route exact path='teamMembers' element={<TeamMembers />} />
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