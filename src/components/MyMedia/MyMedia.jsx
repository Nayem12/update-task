import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthProvider';
import MediaInfo from './MediaInfo';

const MyMedia = () => {
    const { user } = useContext(AuthContext)
    const [texts, setText] = useState([])

    useEffect(() => {
        fetch(`https://taskey-server.vercel.app/task/${user?.email}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setText(data)

            })
    }, [user?.email])
    return (
        <section className='bg-white dark:bg-gray-900'>
            <div className='container items-center justify-center min-h-screen px-6 mx-auto'>
                <div className="mb-1 pt-5 items-center text-xl font-medium text-white">
                    {
                        user?.email && <p>Welcome, {user?.email}</p>
                    }
                </div>
                <div className='pt-5 mt-5 grid grid-cols-2 gap-3'>
                    {
                        texts?.map(txt => <MediaInfo key={txt._id} txt={txt} />)
                    }
                </div>
            </div>
        </section>
    );
};

export default MyMedia;