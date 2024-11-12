import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    IconButton
} from "@material-tailwind/react";
import {
    PresentationChartBarIcon,
    CheckBadgeIcon,
    UserGroupIcon,
    ClockIcon,
    PlayCircleIcon,
    Square3Stack3DIcon,
} from "@heroicons/react/24/solid";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";


export default function SideBarSimple(props) {

    const navigate = useNavigate();
    const location = useLocation();
    const { openNav, closeDrawer } = props;

    const navigation = (route) => {
        navigate(route);
        if (openNav) {
            closeDrawer();
        }
    }

    return (
        <>
            <Card className="h-[calc(100vh-66px)] lg:shadow-none shadow-md lg:border-b border-b-0 border-b-gray-500 rounded-sm sticky top-[66px] max-w-[20rem] p-4">
                {openNav && <div className="mb-2 p-4 flex justify-between items-center">
                    <Typography variant="h5" color="blue-gray">
                        Task Manager
                    </Typography>
                    <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="h-5 w-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </IconButton>
                </div>}
                <List>
                    <ListItem className="hover:text-cyan-500" selected={location.pathname === '/' ? true : false} onClick={() => navigation('/')}>
                        <ListItemPrefix>
                            <PresentationChartBarIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Dashboard
                    </ListItem>
                    <ListItem className="hover:text-cyan-500" selected={location.pathname === '/allTasks' ? true : false} onClick={() => navigation('/allTasks')}>
                        <ListItemPrefix>
                            <Square3Stack3DIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        All Tasks
                    </ListItem>
                    <ListItem className="hover:text-cyan-500" selected={location.pathname === '/tasks/In%20Progress' ? true : false} onClick={() => navigation('/tasks/In Progress')}>
                        <ListItemPrefix>
                            <ClockIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        In Progress
                    </ListItem>
                    <ListItem className="hover:text-cyan-500" selected={location.pathname === '/tasks/ToDo' ? true : false} onClick={() => navigation('/tasks/ToDo')}>
                        <ListItemPrefix>
                            <PlayCircleIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        To Do
                    </ListItem>
                    <ListItem className="hover:text-cyan-500" selected={location.pathname === '/tasks/Completed' ? true : false} onClick={() => navigation('/tasks/Completed')}>
                        <ListItemPrefix>
                            <CheckBadgeIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Completed
                    </ListItem>
                    <ListItem className="hover:text-cyan-500" selected={location.pathname === '/teamMembers' ? true : false} onClick={() => navigation('/teamMembers')}>
                        <ListItemPrefix>
                            <UserGroupIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Team
                    </ListItem>
                </List>
            </Card>
        </>
    );
}

