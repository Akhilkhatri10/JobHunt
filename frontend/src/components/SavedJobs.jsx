import React from 'react'
import Navbar from './shared/Navbar'
import { useSelector } from 'react-redux'
import Job from './Job';

const SavedJobs = () => {
    const { user } = useSelector(store => store.auth);
    const savedJobs = user?.savedJobs || [];

    return (
        <div>
            <div className='max-w-7xl mx-auto mt-5 px-4 sm:px-6 lg:px-8'>
                <h1 className='text-xl sm:text-2xl font-bold mb-5'>
                    Saved Jobs ({savedJobs.length})
                </h1>

                {
                    savedJobs.length === 0 ? (
                        <p className='text-gray-500 text-sm sm:text-base'>
                            No saved jobs yet.
                        </p>
                    ) : (
                        <div className='grid 
                            grid-cols-1 
                            sm:grid-cols-2 
                            xl:grid-cols-3 
                            2xl:grid-cols-4 
                            gap-4'>
                            {
                                savedJobs.map((job) => (
                                    <Job key={job._id} job={job} />
                                ))
                            }
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default SavedJobs;