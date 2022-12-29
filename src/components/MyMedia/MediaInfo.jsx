import { Card } from 'flowbite-react';
import React from 'react';

const MediaInfo = ({ txt }) => {
    const { task, email } = txt


    const date = new Date().toDateString()
    return (
        <div>
            <Card href="#">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Task Name: {task}
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    Email: {email}
                </p>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    Added Date: {date}
                </p>
            </Card>
        </div>
    );
};

export default MediaInfo;