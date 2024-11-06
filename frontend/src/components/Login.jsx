import { CubeIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import { Card, CardBody, CardHeader, Typography, Input, Button, CardFooter, Chip } from '@material-tailwind/react';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import TaskContext from '../context/TaskContext';


function Login() {
    const [userDetails, setUserDetails] = React.useState({
        email: '',
        password: '',
    })

    const context = useContext(TaskContext);
    const { userLogin } = context;

    const inputChange = (e) => {
        setUserDetails({
            ...userDetails,
            [e.target.name]: e.target.value,
        })
    }

    const formSubmit = (e) => {
        e.preventDefault();
        userLogin(userDetails);
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
                    <Typography variant='h6' className='bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500'><span className='text-indigo-900'>Note :</span> If your not a Admin or Manager to your organization then ask your admin for login credentials.</Typography>
                    <Chip color='indigo' variant='gradient' className='shadow-lg shadow-indigo-400 w-min tracking-wide' value='Manage all your tasks in one place' />
                </div>
                <Card className='p-12 m-4 shadow-gray-600'>
                    <CardHeader floated={false} shadow={false} className='p-0 m-0'>
                        <div className='flex items-center gap-1 pb-4'>
                            <CubeIcon className='h-5 w-5' stroke={3} color='indigo' />
                            <Typography variant='h6' color='gray' className='tracking-wide'>Task Manager</Typography>
                        </div>
                        <Typography variant="h6" color="gray">
                            Welcome to Task Manager!👋
                        </Typography>
                        <Typography variant="small" color="gray" className='mt-1 tracking-wide text-xs'>
                            Please sign-in to your account and start the adventure
                        </Typography>
                    </CardHeader>
                    <CardBody className='py-8 px-0'>
                        <form onSubmit={formSubmit}>
                            <div className="flex flex-col gap-6">
                                <Input type='email' required name='email' onChange={inputChange} label='Email' placeholder='Enter Email' />
                                <Input type={passwordType} required name='password' minLength={5} onChange={inputChange} label='Password' placeholder='Enter Password' icon={passwordType === 'password' ? <EyeSlashIcon onClick={showPass} className='h-5 w-5 cursor-pointer' /> : <EyeIcon onClick={showPass} className='h-5 w-5 cursor-pointer' />} />
                            </div>

                            <Button className="mt-6" type='submit' color='indigo' fullWidth>
                                Login
                            </Button>
                        </form>
                    </CardBody>
                    <CardFooter className='p-0'>
                        <Typography variant="small" className="flex justify-center">
                            Don&apos;t have an account?
                            <Link
                                to="/signup"
                                href="#signup"
                                className="text-cyan-400 tracking-wide text-sm hover:underline ml-1 font-bold"
                            >
                                Sign up
                            </Link>
                        </Typography>
                    </CardFooter>
                </Card>
            </div>

        </div>
    )
}

export default Login