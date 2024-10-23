import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    // Collapse,
} from "@material-tailwind/react";
import {
    PresentationChartBarIcon,
    ShoppingBagIcon,
    CheckBadgeIcon,
    UserGroupIcon,
    ClockIcon,
    PlayCircleIcon
} from "@heroicons/react/24/solid";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CollapsedSideCard() {

    const navigate = useNavigate();

    return (
        <Card className="h-[calc(100vh-2rem)] mt-6 w-full max-w-[5rem] p-4 shadow-xl shadow-blue-gray-900/5">
            <List className="min-w-full items-center">
                <ListItem className="w-min hover:text-cyan-500" onClick={() => navigate('/')}>
                    <PresentationChartBarIcon className="h-5 w-5" />
                </ListItem>
                <ListItem className="w-min hover:text-cyan-500" onClick={() => navigate('/allTasks')}>
                    <ShoppingBagIcon className="h-5 w-5" />
                </ListItem>
                <ListItem className="w-min hover:text-cyan-500" onClick={() => navigate('/tasks/In Progress')}>
                    <ClockIcon className="h-5 w-5" />
                </ListItem>
                <ListItem className="w-min hover:text-cyan-500" onClick={() => navigate('/tasks/ToDo')}>
                    <PlayCircleIcon className="h-5 w-5" />
                </ListItem>
                <ListItem className="w-min hover:text-cyan-500" onClick={() => navigate('/tasks/Completed')}>
                    <CheckBadgeIcon className="h-5 w-5" />
                </ListItem>
                <ListItem className="w-min hover:text-cyan-500" onClick={() => navigate('/teamMembers')}>
                    <UserGroupIcon className="h-5 w-5" />
                </ListItem>
            </List>
        </Card>
    )
}

function SideCard() {

    const navigate = useNavigate();

    return (
        <Card className="h-[calc(100vh-2rem)] mt-6 w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
            <div className="mb-2 p-4">
                <Typography variant="h5" color="blue-gray">
                    Sidebar
                </Typography>
            </div>
            <List>
                <ListItem className="hover:text-cyan-500" onClick={() => navigate('/')}>
                    <ListItemPrefix>
                        <PresentationChartBarIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Dashboard
                </ListItem>
                <ListItem className="hover:text-cyan-500" onClick={() => navigate('/allTasks')}>
                    <ListItemPrefix>
                        <ShoppingBagIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    All Tasks
                </ListItem>
                <ListItem className="hover:text-cyan-500" onClick={() => navigate('/tasks/In Progress')}>
                    <ListItemPrefix>
                        <ClockIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    In Progress
                </ListItem>
                <ListItem className="hover:text-cyan-500" onClick={() => navigate('/tasks/ToDo')}>
                    <ListItemPrefix>
                        <PlayCircleIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    To Do
                </ListItem>
                <ListItem className="hover:text-cyan-500" onClick={() => navigate('/tasks/Completed')}>
                    <ListItemPrefix>
                        <CheckBadgeIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Completed
                </ListItem>
                <ListItem className="hover:text-cyan-500" onClick={() => navigate('/teamMembers')}>
                    <ListItemPrefix>
                        <UserGroupIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Team
                </ListItem>
            </List>
        </Card>
    )
}


function SideBarSimple() {
    const [openNav, setOpenNav] = useState(false);

    const handleWindowResize = () => {
        if (window.innerWidth >= 960) {
            setOpenNav(false)
        } else {
            setOpenNav(true)
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
            {openNav ? <CollapsedSideCard /> : <SideCard />}
        </>
    );
}

export default SideBarSimple;