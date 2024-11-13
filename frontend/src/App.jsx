import './App.css'
import Home from './components/Home';
import NavbarSimple from './components/NavbarSimple';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import TaskState from './context/TaskState';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Footer from './components/Footer';
import { useContext } from 'react';
import TaskContext from './context/TaskContext';
import { Alert } from '@material-tailwind/react';


function App() {

  const context = useContext(TaskContext);
  const { alertData } = context;



  return (
    <>
      <Router>
        <TaskState>
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
          </Al>}
          <Routes>
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/signup' element={<SignUp />} />
            <Route exact path='/*' element={
              <>
                <NavbarSimple />
                <Home />
                <Footer />
              </>
            } />
          </Routes>

        </TaskState>
      </Router>
    </>
  )
}

export default App
