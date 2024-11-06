import React from 'react'
import { CubeIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import { Card, CardBody, CardHeader, Typography, Input, Button, CardFooter, Checkbox, Chip } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import TaskContext from '../context/TaskContext';
import { useContext } from 'react';


function SignUp() {
    const [newUserDetails, setNewUserDetails] = React.useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        admin: '',
    })

    const context = useContext(TaskContext);
    const { createUserAccount } = context;

    const inputChange = (e) => {
        setNewUserDetails({
            ...newUserDetails,
            [e.target.name]: e.target.value,
        })
    }


    const adminAccount = (e) => {
        setNewUserDetails({
            ...newUserDetails,
            admin: e.target.checked,
        })
    }

    const formSubmit = (e) => {
        e.preventDefault();
        console.log(newUserDetails);
        createUserAccount(newUserDetails);
        setNewUserDetails({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            admin: '',
        })
    }

    const [passwordType, setPasswordType] = React.useState('password');
    const showPass = () => {
        if (passwordType === 'password') {
            setPasswordType('text');
        } else {
            setPasswordType('password')
        }
    }

    return (
        <div className='md:h-[100vh] h-full py-5 w-full flex items-center justify-center' id='gradiantBackground'>
            <div className='flex md:flex-row flex-col items-center justify-center gap-16'>
                <div className='flex flex-col justify-center gap-10 w-80'>
                    <div>
                        <Typography variant='h3' className='bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500'>Cloud-based </Typography>
                        <Typography variant='h1' className='bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500'>Task Manager </Typography>
                    </div>
                    <Typography variant='h6' color='indigo' ><span className='text-pink-500'>Note :</span> If your  a Admin or Manager to your organization then only create account here! && If you wnat to you this website for your personal then go ahead.  </Typography>
                    <Chip color='indigo' variant='gradient' className='shadow-lg shadow-indigo-400 w-min tracking-wide' value='Manage all your tasks in one place' />
                </div>
                <Card className='px-12 py-10 m-4 shadow-blue-gray-600'>
                    <CardHeader floated={false} shadow={false} className='p-0 m-0'>
                        <div className='flex items-center gap-1 pb-4'>
                            <CubeIcon className='h-5 w-5' stroke={3} color='indigo' />
                            <Typography variant='h6' color='gray' className='tracking-wide'>Task Manager</Typography>
                        </div>
                        <Typography variant="h6" color="gray">
                            Welcome to Task Manager!👋
                        </Typography>
                        <Typography variant="small" color="gray" className='mt-1 tracking-wide text-xs'>
                            Please create an account and start the adventure!
                        </Typography>
                    </CardHeader>
                    <CardBody className='py-6 px-0'>
                        <form onSubmit={formSubmit}>
                            <div className="flex flex-col gap-6 mb-2">
                                <Input type='text' name='firstName' required minLength={3} onChange={inputChange} label='First Name' placeholder='Enter First Name' />
                                <Input type='text' name='lastName' minLength={1} onChange={inputChange} label='Last Name' placeholder='Enter Last Name' />
                                <Input type='email' required name='email' onChange={inputChange} label='Email' placeholder='Enter Email' />
                                <Input type={passwordType} required name='password' minLength={5} onChange={inputChange} label='Password' placeholder='Enter Password' icon={passwordType === 'password' ? <EyeSlashIcon onClick={showPass} className='h-5 w-5 cursor-pointer' /> : <EyeIcon onClick={showPass} className='h-5 w-5 cursor-pointer' />} />
                            </div>
                            <Checkbox required onChange={adminAccount}
                                label={
                                    <Typography color="blue-gray" className="text-sm font-medium">
                                        I agree with the terms and conditions
                                    </Typography>
                                }
                            />
                            <Button className="mt-4" type='submit' color='indigo' fullWidth>
                                Create Account
                            </Button>
                        </form>
                    </CardBody>
                    <CardFooter className='p-0'>
                        <Typography variant="small" className="flex justify-center">
                            Already have an account?
                            <Link
                                to="/login"
                                className="text-cyan-400 tracking-wide text-sm hover:underline ml-1 font-bold"
                            >
                                Sign In
                            </Link>
                        </Typography>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}


export default SignUp