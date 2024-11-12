import { UserIcon } from "@heroicons/react/24/solid";
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Chip,
} from "@material-tailwind/react";
import React from 'react'
import { useContext } from "react";
import TaskContext from "../context/TaskContext";

function UserProfile() {

    const { userDetails } = useContext(TaskContext);
    const { firstName, lastName, email, role, date } = userDetails;

    return (
        <>
            <Typography variant='h3' className=' m-6 drop-shadow-[0_5px_5px_#3949ab] hover:drop-shadow-xl' color='blue-gray'>My Profile</Typography>
            <Card className="m-6 rounded-sm">
                <CardHeader floated={false} shadow={false} className="m-6 mb-0 flex flex-col items-center justify-center gap-5ks">
                    <Typography color="blue-gray" className="tracking-wide font-normal text-2xl">Your Details</Typography>
                    <div className="bg-gradient-to-tr from-indigo-500 to-pink-500 shadow-lg shadow-indigo-300 w-32 h-32 rounded-full flex items-center justify-center">
                        <UserIcon className="h-24 w-24 text-white" />
                    </div>
                    <Chip className="w-max" size={role.length > 7 ? 'md' : 'lg'} color="indigo" value={role} />
                </CardHeader>
                <CardBody>
                    <div className="grid sm:grid-cols-2 gap-4 tracking-wide">
                        <div className="flex flex-col gap-1">
                            <Typography color="gray" className="text-base">First Name :</Typography>
                            <Typography color="blue-gray" className="ml-2 font-normal px-3 py-2 rounded bg-[#eeeeee] text-lg">
                                {firstName}
                            </Typography>
                        </div>
                        <div className="flex flex-col gap-1">
                            <Typography color="gray" className="text-base">Last Name :</Typography>
                            <Typography color="blue-gray" className="ml-2 font-normal px-3 py-2 rounded bg-[#eeeeee] text-lg">
                                {lastName}
                            </Typography>
                        </div>
                        <div className="flex flex-col gap-1">
                            <Typography color="gray" className="text-base">Email Adress :</Typography>
                            <Typography color="blue-gray" className="ml-2 font-normal px-3 py-2 rounded bg-[#eeeeee] text-lg">
                                {email}
                            </Typography>
                        </div>
                        <div className="flex flex-col gap-1">
                            <Typography color="gray" className="text-base">Created Date :</Typography>
                            <Typography color="blue-gray" className="ml-2 font-normal px-3 py-2 rounded bg-[#eeeeee] text-base">
                                {date}
                            </Typography>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </>
    )
}

export default UserProfile