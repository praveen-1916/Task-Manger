import React, { useContext } from 'react'
import TaskContext from '../context/TaskContext'
import { Button, Card, Chip, Dialog, Typography } from '@material-tailwind/react';
import { ChevronUpDownIcon } from '@heroicons/react/24/solid';
import { AddTeamMemberForm } from './TaskFroms';

const TABLE_HEAD = ["Full Name", "Email", "Role", "Status"];


function TeamMembers() {

    const context = useContext(TaskContext);
    const { teamMembers } = context;


    const [openAddTeamMemberForm, setOpenAddTeamMemberForm] = React.useState(false);
    const handleOpenAddTeamMemberForm = () => {
        setOpenAddTeamMemberForm(!openAddTeamMemberForm);
    }

    return (
        <>
            <div className='flex items-center justify-between tracking-wide m-6'>
                <Typography variant='h4' className='drop-shadow-[0_5px_5px_#3949ab] hover:drop-shadow-xl' color='blue-gray'>Team Members</Typography>
                {localStorage.getItem('admin') && <Button color='indigo' variant="gradient" onClick={handleOpenAddTeamMemberForm}>Add Member</Button>}
            </div>
            <Dialog size='sm' open={openAddTeamMemberForm} handler={handleOpenAddTeamMemberForm} >
                <AddTeamMemberForm handleOpenAddTeamMemberForm={handleOpenAddTeamMemberForm} />
            </Dialog>
            {teamMembers.length > 0 ?
                <div>
                    <Card className="overflow-hidden m-6 rounded-sm md:block hidden">
                        <table className="w-full h-max table-fixed text-left">
                            <thead>
                                <tr>
                                    {TABLE_HEAD.map((head, index) => (
                                        <th key={index} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                            <div className='flex items-center gap-1'>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal leading-none opacity-70"
                                                >
                                                    {head}
                                                </Typography>
                                                <ChevronUpDownIcon className='h-5 w-5' />
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {teamMembers.map(({ firstName, lastName, role, email }, index) => (
                                    <tr key={index} className="even:bg-blue-gray-50/50">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3 cursor-pointer">
                                                <div className="h-10 w-10 flex justify-center items-center rounded-full bg-indigo-900 shadow-md shadow-indigo-600">
                                                    <p className='text-white text-sm font-medium'>{firstName.slice(0, 1) + lastName.slice(0, 1)}</p>
                                                </div>
                                                <Typography color="blue-gray">
                                                    {firstName} {lastName}
                                                </Typography>
                                            </div>
                                        </td>
                                        <td className="p-4 text-pretty">
                                            <Typography color="indigo">
                                                {email}
                                            </Typography>
                                        </td>
                                        <td className="p-4 text-pretty">
                                            <Typography color="blue-gray">
                                                {role}
                                            </Typography>
                                        </td>
                                        <td className="p-4">
                                            <Chip color={index % 2 === 0 ? 'teal' : 'cyan'} value={index % 2 === 0 ? 'Active' : 'Offline'} size="sm" className='w-min shadow-md shadow-indigo-300' />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Card>
                    <Card className='overflow-hidden m-6 rounded-sm md:hidden block'>
                        <div className="divide-y divide-gray-200 p-3">
                            {teamMembers.map(({ firstName, lastName, role, email }, index) => (
                                <div key={index} className="pb-2 pt-2 last:pb-0">
                                    <div className="flex items-center gap-5">
                                        <div className="h-12 w-12 flex justify-center items-center rounded-full bg-indigo-900 shadow-md shadow-indigo-600">
                                            <p className='text-white font-medium'>{firstName.slice(0, 1) + lastName.slice(0, 1)}</p>
                                        </div>
                                        <div>
                                            <Typography color="blue-gray" variant="h6">
                                                {firstName} {lastName}
                                            </Typography>
                                            <Typography variant="small" color="gray">
                                                {role}
                                            </Typography>
                                            <Typography variant="small" color="indigo" className='mt-1 tracking-wide'>
                                                {email}
                                            </Typography>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div> :
                <h4>No Team Members</h4>}
        </>
    )
}


export default TeamMembers