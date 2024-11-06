import React, { useContext } from 'react'
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
    Dialog,
    Button,
    Typography
} from "@material-tailwind/react";
import { ListBulletIcon, Squares2X2Icon } from '@heroicons/react/24/solid';
import TableViewTask from './TableViewTask';
import BroadViewTask from './BroadViewTask';
import { AddTaskForm, EditTaskForm } from './TaskFroms';
import TaskContext from '../context/TaskContext';
import { useParams } from 'react-router-dom';


function AllTasks() {

    const context = useContext(TaskContext);
    const { openEditForm, handleOpenEditForm, allTasks, statusTasks, taskStatusCheck } = context;

    const [openAddForm, setOpenAddForm] = React.useState(false);
    const handleOpenAddForm = () => {
        setOpenAddForm(!openAddForm);
    }

    const [tableView, setTableView] = React.useState(true);

    const handleWindowResize = () => {
        if (window.innerWidth <= 880) {
            setTableView(false)
        } else {
            setTableView(true)
        }
    }

    const { status } = useParams();

    React.useEffect(() => {
        if (status) {
            // console.log(status)
            taskStatusCheck(status);
        }
        window.addEventListener("resize", handleWindowResize);

        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, [status, allTasks]);


    return (
        <>
            <div className='flex items-center justify-between tracking-wide m-6'>
                <Typography variant='h4' className='drop-shadow-[0_5px_5px_#3949ab] hover:drop-shadow-xl ' color='blue-gray'>{status ? status : 'All'} Tasks</Typography>
                {localStorage.getItem('admin') === 'true' && <Button color='indigo' onClick={handleOpenAddForm} variant="gradient">Add Task</Button>}
            </div>
            <Dialog size='sm' open={openAddForm} handler={handleOpenAddForm} >
                <AddTaskForm handleOpenAddForm={handleOpenAddForm} />
            </Dialog>
            <Dialog size='sm' open={openEditForm} handler={handleOpenEditForm} >
                <EditTaskForm />
            </Dialog>

            <Tabs value="broadView" className='m-6'>
                <TabsHeader className="rounded-none bg-transparent pb-3 gap-5"
                    indicatorProps={{
                        className:
                            "bg-transparent border-b-2 border-gray-900 rounded-none",
                    }}>
                    <Tab value='broadView' className='w-max p-2 bg-white shadow-md shadow-gray-500'>
                        <div className='flex items-center gap-1'>
                            <Squares2X2Icon className='h-4 w-4' />
                            <p className='font-normal tracking-wide'>Broad View</p>
                        </div>
                    </Tab>
                    <Tab value='tableView' className='w-max p-2 bg-white shadow-md shadow-gray-500' disabled={!tableView}>
                        <div className='flex items-center gap-1'>
                            <ListBulletIcon className='h-5 w-5' />
                            <p className='font-normal tracking-wide'>Table View</p>
                        </div>
                    </Tab>
                </TabsHeader>
                <TabsBody animate={{
                    initial: { y: 250 },
                    mount: { y: 0 },
                    unmount: { y: 250 },
                }}
                >
                    <TabPanel className='px-0' value='broadView'>
                        {status ? <BroadViewTask tasks={statusTasks} />
                            : <BroadViewTask tasks={allTasks} />}
                    </TabPanel>
                    {tableView ? <TabPanel className='px-0' value='tableView'>
                        {status ? <TableViewTask tasks={statusTasks} />
                            : <TableViewTask tasks={allTasks} />}
                    </TabPanel> :
                        <Typography variant='h6' color='blue-gray' className='text-center mt-8'>Table view is not supported in small screens. Please switch to the Broad View</Typography>}
                </TabsBody>
            </Tabs>
        </>
    )
}

export default AllTasks