import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";

const Addtask = () => {
  const { user } = useContext(AuthContext)


  const handleOnSubmit = event => {
    event.preventDefault()
    const form = event.target
    const task = form.task.value
    const taskDescription = form.taskDescription.value
    // console.log(task, taskDescription)
    const addedTask = { task }
    const image = form.img.files[0]

    const imgbbKey = process.env.REACT_APP_imgbb_key

    const formData = new FormData()
    formData.append("image", image)

    fetch(`https://api.imgbb.com/1/upload?key=${imgbbKey}`, {
      method: "POST",
      body: formData
    })
      .then(res => res.json())
      .then(imgdata => {
        if (imgdata.success || !imgdata.success) {
          const taskdetails = { task, taskDescription, imgdata, email: user?.email, isCompleted: false }
          fetch(`http://localhost:5000/task`, {
            method: "POST",
            headers: {
              "content-type": "application/json"
            },
            body: JSON.stringify(taskdetails)
          })
            .then(res => res.json())
            .then(data => {
              console.log(data)
              if (data.acknowledged) {

                toast.success('Successfully added!');
                form.reset()
              }

            })
        }
      })

  }
  const handleOnKeyDown = event => {

    const task = event.target.value
    console.log(task)
    const addTask = { task }

    if (event.key === "Enter") {
      fetch(`http://localhost:5000/task`, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(addTask)
      })
        .then(res => res.json())
        .then(data => {
          console.log(data)
          if (data.acknowledged) {

            toast.success(
              'Task Addedd Successfully!',
              'Thank You',
              'success'
            )
          }

        })
    }
  }
  return (
    <section className='bg-white dark:bg-gray-900'>
      <div className='container flex items-center justify-center min-h-screen px-6 mx-auto'>
        <form className='w-full max-w-md' onSubmit={handleOnSubmit}>
          <div className='flex items-center justify-center mt-6'>
            <Link className='w-1/3 pb-4 font-medium text-center text-gray-500 capitalize border-b dark:border-gray-400 dark:text-gray-300'>
              Add A Task
            </Link>
          </div>

          <div className='relative flex items-center mt-8'>
            <span className='absolute'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='w-6 h-6 mx-3 text-gray-300 dark:text-gray-500'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth='2'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                />
              </svg>
            </span>

            <input
              type='text'
              name="task"
              onKeyDown={handleOnKeyDown}
              className='block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40'
              placeholder='Task Name'
            />
          </div>

          <label
            htmlFor='dropzone-file'
            className='flex items-center px-3 py-3 mx-auto mt-6 text-center bg-white border-2 border-dashed rounded-lg cursor-pointer dark:border-gray-600 dark:bg-gray-900'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-6 h-6 text-gray-300 dark:text-gray-500'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth='2'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12'
              />
            </svg>

            <h2 className='mx-3 text-gray-400'>Photo</h2>

            <input id='dropzone-file' type='file' name="img" className='hidden' />
          </label>

          <div className='relative flex items-center mt-6'>
            <textarea
              type='text'
              name="taskDescription"
              className='block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40'
              placeholder='Task description'
            />
          </div>

          <div className='mt-6'>
            <button className='w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50'>
              Add Task
            </button>
          </div>
        </form>
      </div>
      <Link to="/media" className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">Add to media</Link>
    </section>
  );
};

export default Addtask;