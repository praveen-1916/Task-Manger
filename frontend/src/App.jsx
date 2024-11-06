import './App.css'
import Home from './components/Home';
import NavbarSimple from './components/NavbarSimple';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import TaskState from './context/TaskState';
import Login from './components/login';
import SignUp from './components/SignUp';
import Footer from './components/Footer';
// import TaskDetail from './components/TaskDetail';


function App() {

  return (
    <>
      <Router>
        <TaskState>
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
