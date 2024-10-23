import React from 'react'
import SideBarSimple from './SidebarSimple'
import AllTasks from './AllTasks'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Dashboard from './Dashboard'
import TaskStatus from './TaskStatus'
import TeamMembers from './TeamMembers'

function Home() {
    return (
        <Router>
            <div className='flex'>
                <SideBarSimple />
                <div className='flex-grow'>
                    <Routes>
                        <Route exact path='/' element={<Dashboard />} />
                        <Route exact path='/allTasks' element={<AllTasks />} />
                        <Route exact path='/tasks/:status' element={<TaskStatus />} />
                        <Route exact path='/teamMembers' element={<TeamMembers />} />
                    </Routes>
                </div>
            </div>
        </Router>

    )
}

export default Home