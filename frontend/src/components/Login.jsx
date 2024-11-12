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
    const { userLogin, loginError, loadingLoginBtn } = context;

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
        <div className='w-full min-h-screen flex items-center justify-center bg-[#f3f4f6]'>
            <div className='w-full md:w-auto flex gap-0 md:gap-20 flex-col md:flex-row items-center justify-center'>
                {/* left side */}
                <div className='h-full w-full lg:w-2/3'>
                    <div className='w-full md:max-w-lg 2xl:max-w-3xl flex flex-col items-center justify-center gap-5 md:gap-y-10 md:mt-0 mt-5'>
                        <Chip color='indigo' variant='gradient' className='shadow-lg shadow-indigo-400 w-min tracking-wide' value='Manage all your tasks in one place' />
                        <Typography className='flex flex-col gap-0 md:gap-4 text-4xl md:text-5xl lg:text-6xl font-black text-center'>
                            <span className='bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500'>Cloud-Based</span>
                            <span className='bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>Task Manager</span>
                        </Typography>

                        <div className='w-16 h-16 rounded-full shadow-lg shadow-pink-500 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-bounce'>
                        </div>
                    </div>
                </div>

                <Card className='p-12 m-4 shadow-gray-600'>
                    <CardHeader floated={false} shadow={false} className='p-0 m-0'>
                        <div className='flex items-center gap-1 pb-4'>
                            <CubeIcon className='h-5 w-5' strokeWidth={3} color='indigo' />
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

                            <Button loading={loadingLoginBtn} className="mt-4" type='submit' color='indigo' fullWidth>
                                Login
                            </Button>
                        </form>

                        {loginError && <Typography variant='small' color='red' className='mt-2 text-center'>{loginError.errorMsg}</Typography>}
                    </CardBody>
                    <CardFooter className='p-0'>
                        <Typography variant="small" className="flex justify-center items-center lg:text-sm md:text-xs text-sm ">
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