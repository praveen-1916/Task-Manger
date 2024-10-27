import React, { useContext, useEffect } from 'react'
import SideBarSimple from './SidebarSimple'
import AllTasks from './AllTasks'
import { Routes, Route } from "react-router-dom"
import Dashboard from './Dashboard'
import TeamMembers from './TeamMembers'
import TaskContext from '../context/TaskContext'
import TaskDetail from './TaskDetail'

function Home() {
    const context = useContext(TaskContext);
    const { getAllTasks, getTeamMembers } = context;
    useEffect(() => {
        getTeamMembers();
        getAllTasks()
    }, [])


    return (

        <div className='flex'>
            <SideBarSimple />
            <div className='flex-grow'>
                <Routes>
                    <Route exact path='/' element={<Dashboard />} />
                    <Route exact path='/allTasks' element={<AllTasks />} />
                    <Route exact path='/tasks/:status' element={<AllTasks />} />
                    <Route exact path='/task/:taskId' element={<TaskDetail />} />
                    {/* <Route exact path='/tasks/inProgress' element={<AllTasks key='inProgress' status='In progress' />} />
                            <Route exact path='/tasks/todo' element={<AllTasks key='ToDo' status='ToDo' />} />
                            <Route exact path='/tasks/completed' element={<AllTasks key='completed' status='Completed' />} />*/}
                    <Route exact path='/teamMembers' element={<TeamMembers />} />
                </Routes>
            </div>
        </div>

    )
}

export default Home