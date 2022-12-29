import { useQuery } from '@tanstack/react-query';
import { Card, Dropdown } from 'flowbite-react';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../Context/AuthProvider';
import Spinner from '../Loading/spinner';
import UpdateTask from '../UpdateTask/UpdateTask';

const MyTask = () => {
    const { user } = useContext(AuthContext)
    const [showEditTask, setShowEditTask] = useState(null)
    const [tasks, setTasks] = useState([])

    //
    const {
        data: fetchedData = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["fetchedData", user?.email],
        queryFn: async () => {
            const res = await fetch(`https://taskey-server.vercel.app/task/${user?.email}`, {
                headers: {
                    //   authorization: bearer ${localStorage.getItem("accessToken")},
                },
            });
            const data = await res.json();
            setTasks(data);
            refetch();
            return data;
        },
    });
    const fetchData = () => {
        fetch(`https://taskey-server.vercel.app/task/${user?.email}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setTasks(data)

            })
    }


    // useEffect(() => {
    //     fetchData()
    // }, [user?.email])

    // 
    const handleUpdate = (id) => {
        fetch(`https://taskey-server.vercel.app/task/${id}`, {
            method: "PUT"
        })
            .then(res => res.json())
            .then(data => {
                fetchData(data)
                if (data.acknowledged) {
                    toast.fire(
                        'Good job!',
                        'Task Completed Successfully',
                        'success'
                    )
                }
            })
            .catch(error => console.error(error))

    }
    const handleDelete = id => {
        fetch(`https://taskey-server.vercel.app/task/${id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                fetchData(data)
                if (data.acknowledged) {
                    toast(
                        'Opps!',
                        'Task Deleted Successfully',
                        'success'
                    )

                }
            })
            .catch(err => console.error(err))
    }
    const editTask = (task) => {
        console.log(task)
        setShowEditTask(task)
    }
    if (isLoading) {
        return <Spinner />
    }
    return (
        <div>
            <section className='bg-white dark:bg-gray-900'>
                <div className="mb-1 items-center text-xl font-medium text-black dark:text-white">
                    {
                        user?.email && <p>Welcome, {user?.email}</p>
                    }
                </div>
                <div className='container flex items-center justify-center min-h-screen px-6 mx-auto'>
                    <div className="max-w-sm">
                        {
                            tasks?.filter(data => data.isCompleted !== true).map(task =>
                                <Card className='mt-2 bg-neutral-500'>

                                    <div className="flex flex-col items-center pb-10">

                                        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                                            {task.task}
                                        </h5>
                                        <div className="mt-4 flex space-x-3 lg:mt-6">
                                            <button
                                                className="inline-flex items-center rounded-lg bg-blue-700 py-2 px-4 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                            >
                                                Details
                                            </button>
                                            <button onClick={() => editTask(task)}
                                                className="inline-flex items-center rounded-lg border border-gray-300 bg-white py-2 px-4 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                                            >
                                                Update Task
                                            </button>
                                            <button onClick={() => handleDelete(task._id)} className="inline-flex items-center rounded-lg border border-gray-300 bg-white py-2 px-4 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700">Delete Task</button>
                                        </div>
                                        <div className='d-flex justify-content-center mt-3'>
                                            <button className="inline-flex items-center rounded-lg bg-blue-700 py-2 px-4 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => handleUpdate(task._id)}>Completed Task</button>
                                        </div>
                                    </div>
                                </Card>
                            )
                        }
                    </div>
                </div>
                {showEditTask && <UpdateTask task={showEditTask} setShowEditTask={setShowEditTask} />}
            </section>

        </div>
    );
};

export default MyTask;