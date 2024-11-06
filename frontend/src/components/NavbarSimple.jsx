import React from "react";
import {
    Navbar,
    Typography,
    Button,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Avatar,
    Drawer,
} from "@material-tailwind/react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import {
    UserCircleIcon,
    ChevronDownIcon,
    Cog6ToothIcon,
    InboxArrowDownIcon,
    LifebuoyIcon,
    PowerIcon,

} from "@heroicons/react/24/solid";
import SideBarSimple from "./SidebarSimple";
import { useNavigate } from "react-router-dom";


const profileMenuItems = [
    {
        label: "My Profile",
        icon: UserCircleIcon,
    },
    {
        label: "Edit Profile",
        icon: Cog6ToothIcon,
    },
    {
        label: "Inbox",
        icon: InboxArrowDownIcon,
    },
    {
        label: "Help",
        icon: LifebuoyIcon,
    },
    {
        label: "Sign Out",
        icon: PowerIcon,
    },
];

function ProfileMenu() {
    const navigate = useNavigate();

    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const closeMenu = () => setIsMenuOpen(false);
    const logout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('admin');
        navigate('/login');
    }

    return (
        <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
            <MenuHandler>
                <Button
                    variant="text"
                    color="blue-gray"
                    className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
                >
                    <Avatar
                        variant="circular"
                        size="sm"
                        alt="tania andrew"
                        className="border border-gray-900 p-0.5"
                        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                    />
                    <ChevronDownIcon
                        strokeWidth={2.5}
                        className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""
                            }`}
                    />
                </Button>
            </MenuHandler>
            <MenuList className="p-1">
                {profileMenuItems.map(({ label, icon }, key) => {
                    const isLastItem = key === profileMenuItems.length - 1;
                    return (
                        <MenuItem
                            key={label}
                            onClick={isLastItem ? logout : closeMenu}
                            className={`flex items-center gap-2 rounded ${isLastItem
                                ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                                : ""
                                }`}
                        >
                            {React.createElement(icon, {
                                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                                strokeWidth: 2,
                            })}
                            <Typography
                                as="span"
                                variant="small"
                                className="font-normal"
                                color={isLastItem ? "red" : "inherit"}
                            >
                                {label}
                            </Typography>
                        </MenuItem>
                    );
                })}
            </MenuList>
        </Menu>
    );
}


export default function NavbarSimple() {
    const [openNav, setOpenNav] = React.useState(false);

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

    const [open, setOpen] = React.useState(false);
    const openDrawer = () => setOpen(true);
    const closeDrawer = () => setOpen(false);

    return (
        <>
            <Navbar className="w-full lg:shadow-none shadow-md max-w-full sticky top-0 z-50 lg:border-b border-b-0 border-b-gray-400 rounded-sm px-6 py-3">
                <div className="flex items-center justify-between text-blue-gray-900">
                    {openNav && <div>
                        <Bars3Icon className="h-5 w-5" color="black" onClick={openDrawer} />
                        <Drawer open={open} onClose={closeDrawer}>
                            <SideBarSimple closeDrawer={closeDrawer} openNav={openNav} />
                        </Drawer>
                    </div>}
                    <Typography
                        variant="h5"
                        className="mr-4 cursor-pointer py-1.5"
                    >
                        Task Manager
                    </Typography>
                    <div className="lg:block">
                        <ProfileMenu />
                    </div>
                </div>
            </Navbar>
        </>
    );
}


