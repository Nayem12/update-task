import { Button, Modal } from 'flowbite-react';
import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { AiFillCloseCircle } from 'react-icons/ai';
import { AuthContext } from '../Context/AuthProvider';

const UpdateTask = ({ task, setShowEditTask }) => {
    const { setLoading } = useContext(AuthContext)
    const { _id, task: title, taskDescription } = task
    // const { refetch } = useQuery({})



    const updateTask = (e) => {
        e.preventDefault()
        const form = e.target
        const task = form.title.value
        const taskDescription = form.details.value
        const updateData = {
            task, taskDescription
        }
        console.log(updateData)

        fetch(`https://taskey-server.vercel.app/updateTask?id=${_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateData)
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                if (data.acknowledged) {
                    toast.success(`${task} is updated`)
                    setShowEditTask(null)
                    setLoading(true)
                }
                // refetch()
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    return (
        <section className='bg-white dark:bg-gray-900'>
            <div className='absolute top-20 bg-green-500 left-1/2 card md:w-[25%] w-[70%] p-3 rounded 
            -translate-x-1/2'>
                <form action="" className='rounded  relative' onSubmit={updateTask}>
                    <div className="form-control">
                        <input type="text" name="title" placeholder="Title" className="p-2 bg-[#0e0d0d87] w-full rounded" defaultValue={title} />
                    </div>
                    <div className="form-control">
                        <input type="text" name="details" placeholder="Details" className="p-2 bg-[#0e0d0d87] w-full mt-3 rounded" defaultValue={taskDescription} />
                    </div>
                    <div className="form-control ">
                        <input type="submit" value="submit" className='inline-flex items-center rounded-lg bg-blue-700 py-2 px-4 mt-3 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"' />
                    </div>
                    <div className='absolute top-0 right-0'>
                        <AiFillCloseCircle className='text-xl cursor-pointer' onClick={() => setShowEditTask()} />
                    </div>
                </form>
            </div>
        </section>
    );
};

export default UpdateTask;