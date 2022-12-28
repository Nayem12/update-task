import { Accordion, Card } from 'flowbite-react';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../Context/AuthProvider';

const CompletedTask = () => {
    const { user } = useContext(AuthContext)

    const [tasks, setTasks] = useState([])



    const fetchData = () => {
        fetch(`http://localhost:5000/task/${user?.email}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setTasks(data)

            })
    }


    useEffect(() => {
        fetchData()
    }, [user?.email])

    const handleNotCompleted = (id) => {
        fetch(`http://localhost:5000/tasks/${id}`, {
            method: "PUT"
        })
            .then(res => res.json())
            .then(data => {
                fetchData(data)
                console.log(data)

            })
            .catch(error => console.error(error))
    }
    const handleOnSubmit = event => {
        event.preventDefault()
        const form = event.target
        const comment = form.comment.value
        const addComment = { comment }


        fetch(`http://localhost:5000/taskcomment`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(addComment)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast(
                        'Great!',
                        'Comment Added Successfully',
                        'success'
                    )
                    form.reset()
                }
            })
            .catch(err => console.error(err))
    }
    const handleDelete = id => {
        fetch(`http://localhost:5000/task/${id}`, {
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

    return (
        <div>
            <section className='bg-white dark:bg-gray-900'>
                <div className="mb-1 items-center text-xl font-medium text-white">
                    {
                        user?.email && <p>Welcome, {user?.email}</p>
                    }
                </div>
                <div className='container flex items-center justify-center min-h-screen px-6 mx-auto'>
                    <div className="max-w-sm">
                        {
                            tasks?.filter(data => data.isCompleted === true).map(task =>

                                <Card className='mt-2'>


                                    <div className="flex flex-col items-center pb-10">
                                        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                                            {task.task}
                                        </h5>
                                        <div className="mt-4 flex space-x-3 lg:mt-6">
                                            <button onClick={() => handleDelete(task._id)} className="inline-flex items-center rounded-lg bg-blue-700 py-2 px-4 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Delete Task</button>
                                            <button className="inline-flex items-center rounded-lg bg-blue-700 py-2 px-4 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => handleNotCompleted(task._id)}>Not Completed</button>
                                        </div>
                                    </div>
                                    <Accordion>
                                        <Accordion.Panel>
                                            <Accordion.Title>
                                                Add a Comment
                                            </Accordion.Title>
                                            <Accordion.Content>
                                                <form onSubmit={handleOnSubmit}>
                                                    <textarea
                                                        type='text'
                                                        name="comment"
                                                        className='block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40'
                                                        placeholder='Text your comment'
                                                    />
                                                    <button className='w-full mt-5 px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50'>
                                                        Add comment
                                                    </button>
                                                </form>
                                            </Accordion.Content>
                                        </Accordion.Panel>
                                    </Accordion>
                                </Card>

                            )
                        }

                    </div>
                </div>
            </section>

        </div>
    );
};

export default CompletedTask;