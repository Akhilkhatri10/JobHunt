import React from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.job);
    const navigate = useNavigate();

    return (
        <div className='max-w-7xl mx-auto my-12 sm:my-16 lg:my-20 px-4 sm:px-6 lg:px-8'>

            {/* HEADER */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">

                <h1 className='text-2xl sm:text-3xl md:text-4xl 2xl:text-5xl font-bold leading-tight'>
                    <span className='text-[#6A38C2]'>Latest & Top </span> Job Openings
                </h1>

                <button
                    onClick={() => navigate("/jobs")}
                    className="text-sm sm:text-base font-medium text-purple-600 hover:underline self-start sm:self-auto"
                >
                    View All →
                </button>
            </div>

            {/* JOB GRID */}
            {
                allJobs.length === 0 ? (
                    <div className="text-center py-12 sm:py-16">
                        <h2 className="text-lg sm:text-xl font-semibold">No jobs available</h2>
                        <p className="text-gray-500 mt-2 text-sm sm:text-base">
                            Please check back later or try exploring categories
                        </p>
                    </div>
                ) : (
                    <div className='
                grid 
                grid-cols-1 
                sm:grid-cols-2 
                lg:grid-cols-3 
                2xl:grid-cols-4
                gap-4 sm:gap-6 lg:gap-8
            '>
                        {
                            [...allJobs]
                                ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                                .slice(0, 6)
                                .map((job) => (
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