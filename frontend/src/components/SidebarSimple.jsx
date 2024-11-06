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
    ShoppingBagIcon,
    CheckBadgeIcon,
    UserGroupIcon,
    ClockIcon,
    PlayCircleIcon,
} from "@heroicons/react/24/solid";
import React from "react";
import { useNavigate } from "react-router-dom";

// function CollapsedSideCard() {

//     const navigate = useNavigate();

//     return (
//         <Card className="h-[calc(100vh-2rem)] sticky top-10 w-full max-w-[5rem] p-4 shadow-xl shadow-blue-gray-900/5">
//             <List className="min-w-full items-center">
//                 <ListItem className="w-min hover:text-cyan-500" onClick={() => navigate('/')}>
//                     <PresentationChartBarIcon className="h-5 w-5" />
//                 </ListItem>
//                 <ListItem className="w-min hover:text-cyan-500" onClick={() => navigate('/allTasks')}>
//                     <ShoppingBagIcon className="h-5 w-5" />
//                 </ListItem>
//                 <ListItem className="w-min hover:text-cyan-500" onClick={() => navigate('/tasks/In Progress')}>
//                     <ClockIcon className="h-5 w-5" />
//                 </ListItem>
//                 <ListItem className="w-min hover:text-cyan-500" onClick={() => navigate('/tasks/ToDo')}>
//                     <PlayCircleIcon className="h-5 w-5" />
//                 </ListItem>
//                 <ListItem className="w-min hover:text-cyan-500" onClick={() => navigate('/tasks/Completed')}>
//                     <CheckBadgeIcon className="h-5 w-5" />
//                 </ListItem>
//                 <ListItem className="w-min hover:text-cyan-500" onClick={() => navigate('/teamMembers')}>
//                     <UserGroupIcon className="h-5 w-5" />
//                 </ListItem>
//             </List>
//         </Card>
//     )
// }

// export function SideCard() {


//     return (

//     )
// }


export default function SideBarSimple(props) {

    const navigate = useNavigate();
    const { openNav, closeDrawer } = props;

    const navigation = (route) => {
        navigate(route);
        if (openNav) {
            closeDrawer();
        }
    }

    return (
        <>
            <Card className="h-[calc(100vh-66px)] lg:shadow-none shadow-md lg:border-b border-b-0 border-b-gray-500 rounded-sm sticky top-[66px] w-max max-w-[20rem] p-4">
                <div className="mb-2 p-4 flex justify-between items-center">
                    {openNav && <Typography variant="h5" color="blue-gray">
                        Sidebar
                    </Typography>}
                    {openNav && <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
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
                    </IconButton>}
                </div>
                <List>
                    <ListItem className="hover:text-cyan-500" onClick={() => navigation('/')}>
                        <ListItemPrefix>
                            <PresentationChartBarIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Dashboard
                    </ListItem>
                    <ListItem className="hover:text-cyan-500" onClick={() => navigation('/allTasks')}>
                        <ListItemPrefix>
                            <ShoppingBagIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        All Tasks
                    </ListItem>
                    <ListItem className="hover:text-cyan-500" onClick={() => navigation('/tasks/In Progress')}>
                        <ListItemPrefix>
                            <ClockIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        In Progress
                    </ListItem>
                    <ListItem className="hover:text-cyan-500" onClick={() => navigation('/tasks/ToDo')}>
                        <ListItemPrefix>
                            <PlayCircleIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        To Do
                    </ListItem>
                    <ListItem className="hover:text-cyan-500" onClick={() => navigation('/tasks/Completed')}>
                        <ListItemPrefix>
                            <CheckBadgeIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Completed
                    </ListItem>
                    <ListItem className="hover:text-cyan-500" onClick={() => navigation('/teamMembers')}>
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

