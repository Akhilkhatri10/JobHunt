import React from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.job);
    const navigate = useNavigate();

    return (
        <div className='max-w-7xl mx-auto my-20 px-4'>

            {/* HEADER */}
            <div className="flex items-center justify-between mb-6">
                <h1 className='text-3xl md:text-4xl font-bold'>
                    <span className='text-[#6A38C2]'>Latest & Top </span> Job Openings
                </h1>

                <button
                    onClick={() => navigate("/jobs")}
                    className="text-sm font-medium text-purple-600 hover:underline"
                >
                    View All →
                </button>
            </div>

            {/* JOB GRID */}
            {
                allJobs.length === 0 ? (
                    <div className="text-center py-16">
                        <h2 className="text-xl font-semibold">No jobs available</h2>
                        <p className="text-gray-500 mt-2">
                            Please check back later or try exploring categories
                        </p>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {
                            [...allJobs]?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 6).map((job) => (
                                    <LatestJobCards key={job._id} job={job} />
                                ))
                        }
                    </div>
                )
            }
        </div>
    );
};

export default LatestJobs;