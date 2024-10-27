import './App.css'
import Home from './components/Home';
import NavbarSimple from './components/NavbarSimple';
import { BrowserRouter as Router } from "react-router-dom"
import TaskState from './context/TaskState';
// import TaskDetail from './components/TaskDetail';


function App() {

  return (
    <>
      <Router>
        <TaskState>
          <NavbarSimple />
          <Home />
          {/* <TaskDetail /> */}
        </TaskState>
      </Router>
    </>
  )
}

export default App
