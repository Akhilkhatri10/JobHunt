import React from 'react'
import Navbar from './shared/Navbar'
import { useSelector } from 'react-redux'
import Job from './Job';

const SavedJobs = () => {
    const { user } = useSelector(store => store.auth);
    console.log(user?.savedJobs);
    const savedJobs = user?.savedJobs || [];

    return (
        <div>
            <Navbar />

            <div className='max-w-7xl mx-auto mt-5'>
                <h1 className='text-2xl font-bold mb-5'>
                    Saved Jobs ({savedJobs.length})
                </h1>

                {
                    savedJobs.length === 0 ? (
                        <p className='text-gray-500'>No saved jobs yet.</p>
                    ) : (
                        <div className='grid grid-cols-3 gap-4'>
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