import React from 'react'
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
    Tooltip,
    Dialog,
    Button
} from "@material-tailwind/react";
import { ListBulletIcon, Squares2X2Icon } from '@heroicons/react/24/solid';
import TableViewTask from './TableViewTask';
import BroadViewTask from './BroadViewTask';
import { AddTaskForm } from './TaskFroms';

function AllTasks() {
    const [openAddForm, setOpenAddForm] = React.useState(false);
    const handleOpenAddForm = () => setOpenAddForm(!openAddForm);

    const [tableView, setTableView] = React.useState(true);

    const handleWindowResize = () => {
        if (window.innerWidth <= 780) {
            setTableView(false)
        } else {
            setTableView(true)
        }
    }

    React.useEffect(() => {
        window.addEventListener("resize", handleWindowResize);

        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, []);

    return (
        <>
            <Button onClick={handleOpenAddForm} variant="gradient">Add Task</Button>
            <Dialog size='sm' open={openAddForm} handler={handleOpenAddForm} >
                <AddTaskForm handleOpenAddForm={handleOpenAddForm} />
            </Dialog>
            <Tabs value="broadView" className='m-6'>
                <TabsHeader>
                    <Tab value='broadView'>
                        <div className='flex items-center gap-1'>
                            <Squares2X2Icon className='h-4 w-4' />
                            <p className='font-normal tracking-wide'>Broad View</p>
                        </div>
                    </Tab>
                    <Tooltip content='Table view not supported in smallscreens'
                        animate={{
                            mount: { scale: 1, y: 0 },
                            unmount: { scale: 0, y: 25 },
                        }}>
                        <Tab value='tableView' disabled={!tableView}>
                            <div className='flex items-center gap-1'>
                                <ListBulletIcon className='h-5 w-5' />
                                <p className='font-normal tracking-wide'>Table View</p>
                            </div>
                        </Tab>
                    </Tooltip>
                </TabsHeader>
                <TabsBody animate={{
                    initial: { y: 250 },
                    mount: { y: 0 },
                    unmount: { y: 250 },
                }}
                >
                    <TabPanel className='px-0' value='broadView'>
                        <BroadViewTask />
                    </TabPanel>
                    {tableView && <TabPanel className='px-0' value='tableView'>
                        <TableViewTask />
                    </TabPanel>}
                </TabsBody>
            </Tabs>
        </>
    )
}

export default AllTasks