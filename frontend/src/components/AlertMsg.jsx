import React, { useContext } from 'react';
import { Alert } from '@material-tailwind/react';
import TaskContext from '../context/TaskContext';


function AlertMsg() {

    const context = useContext(TaskContext);
    const { alertData } = context;

    return (
        <>
            {alertData && <Alert className={alertData.success ? 'w-max shadow-lg shadow-[#bdfdc7] bg-[#f0fff1] text-[#2ec945] border-l-4 border-l-[#2ec946] px-5 z-50 rounded-sm fixed bottom-5 right-5' : 'w-max shadow-xl shadow-[#fdb9b9] bg-[#fdf0d5] text-[#d00000] border-l-4 border-l-[#d00000] px-5 z-50 rounded-sm fixed bottom-5 right-5'}
                icon={React.createElement(alertData.icon, {
                    className: `h-6 w-6`,
                })}
                animate={{
                    mount: { y: 0 },
                    unmount: { y: 100 },
                }}
            >
                {alertData.msg}
            </Alert>}
        </>

    )
}

export default AlertMsg