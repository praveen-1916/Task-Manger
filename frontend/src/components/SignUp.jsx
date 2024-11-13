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
    const { createUserAccount, userCreationError, loadingSignUpBtn } = context;

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
        <div className='w-full min-h-screen flex items-center justify-center bg-[#f3f4f6]'>
            <div className='w-full md:w-auto flex gap-0 md:gap-20 flex-col md:flex-row items-center justify-center'>
                {/* left side */}
                <div className='h-full w-full lg:w-2/4'>
                    <div className='w-full md:max-w-lg 2xl:max-w-3xl flex flex-col items-center justify-center gap-5 md:gap-y-10 md:mt-0 mt-5'>
                        <Chip color='indigo' variant='gradient' className='shadow-lg shadow-indigo-400 w-min tracking-wide' value='Manage all your tasks in one place' />
                        <Typography className='flex flex-col gap-0 md:gap-4 text-4xl md:text-5xl lg:text-6xl font-black text-center'>
                            <span className='bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>Cloud-Based</span>
                            <span className='bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500'>Task Manager</span>
                        </Typography>

                        <div className='flex items-center gap-5'>
                            <div className='w-16 h-16 rounded-full shadow-lg shadow-pink-500 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-bounce'>
                            </div>
                            <div className='w-16 h-16 rounded-full shadow-lg shadow-pink-500 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-spin'>
                            </div>
                        </div>
                    </div>
                </div>

                <Card className='px-12 py-10 m-4 shadow-blue-gray-600'>
                    <CardHeader floated={false} shadow={false} className='p-0 m-0'>
                        <div className='flex items-center gap-1 pb-4'>
                            <CubeIcon className='h-5 w-5' strokeWidth={3} color='indigo' />
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
                            <Button loading={loadingSignUpBtn} className="mt-4" type='submit' color='indigo' fullWidth>
                                Create Account
                            </Button>
                        </form>

                        {userCreationError && <Typography variant='small' className='mt-2 text-center' color='red'>{userCreationError.errorMsg}</Typography>}
                    </CardBody>
                    <CardFooter className='p-0'>
                        <Typography variant="small" className="lg:text-sm md:text-xs text:sm flex items-center justify-center">
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