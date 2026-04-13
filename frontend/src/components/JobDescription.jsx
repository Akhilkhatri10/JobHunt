import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });

            if (res.data.success) {
                setIsApplied(true);
                const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] }
                dispatch(setSingleJob(updatedSingleJob));
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id))
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    return (
        <div className='max-w-7xl mx-auto my-6 sm:my-8 lg:my-8 px-4 sm:px-6 lg:px-6'>

            {/* Back Button */}
            <div className="mb-4 sm:mb-6">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center py-1 px-3 text-gray-700 border border-gray-400 rounded-md hover:text-black font-semibold text-sm sm:text-base lg:text-lg shadow-md hover:shadow-lg transition-all duration-200"
                >
                    ← Back
                </button>
            </div>

            {/* Header Section */}
            <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4'>

                {/* Left */}
                <div>
                    <h1 className='font-bold text-xl sm:text-2xl lg:text-2xl'>
                        {singleJob?.title}
                    </h1>

                    {/* Company */}
                    <div className='flex items-center gap-3 mt-3 sm:mt-4'>
                        <img
                            src={singleJob?.company?.logo}
                            alt="company logo"
                            className="h-5 w-5 sm:h-6 sm:w-6 rounded object-cover"
                        />
                        <p className='text-gray-700 font-medium text-sm sm:text-base'>
                            {singleJob?.company?.name}
                        </p>
                    </div>

                    {/* Badges */}
                    <div className='flex flex-wrap gap-2 mt-3 sm:mt-4'>
                        <Badge className={'text-blue-700 font-bold'} variant="ghost">{singleJob?.position} Positions</Badge>
                        <Badge className={'text-[#F83002] font-bold'} variant="ghost">{singleJob?.jobType}</Badge>
                        <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{singleJob?.salary} LPA</Badge>
                    </div>
                </div>

                {/* Button */}
                <Button
                    onClick={isApplied ? null : applyJobHandler}
                    disabled={isApplied}
                    className={`w-full lg:w-auto rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad]'}`}
                >
                    {isApplied ? 'Already Applied' : 'Apply Now'}
                </Button>
            </div>

            {/* Description */}
            <h1 className='border-b-2 border-b-gray-300 font-medium pt-6 pb-3 text-lg sm:text-xl'>
                Job Description
            </h1>

            <div className='my-3 text-sm sm:text-base'>
                <h1 className='font-bold my-1'>
                    Role: <span className='pl-2 font-normal text-gray-800'>{singleJob?.title}</span>
                </h1>

                <h1 className='font-bold my-1'>
                    Location: <span className='pl-2 font-normal text-gray-800'>{singleJob?.location}</span>
                </h1>

                <h1 className='font-bold my-1'>
                    Description: <span className='pl-2 font-normal text-gray-800'>{singleJob?.description}</span>
                </h1>

                <h1 className='font-bold my-2'>Requirements:</h1>
                <ul className='list-disc ml-5 sm:ml-6 text-gray-800'>
                    {singleJob?.requirements?.map((req, index) => (
                        <li key={index}>{req}</li>
                    ))}
                </ul>

                <h1 className='font-bold my-1'>
                    Experience: <span className='pl-2 font-normal text-gray-800'>{singleJob?.experienceLevel} yrs</span>
                </h1>

                <h1 className='font-bold my-1'>
                    Salary: <span className='pl-2 font-normal text-gray-800'>{singleJob?.salary} LPA</span>
                </h1>

                <h1 className='font-bold my-1'>
                    Total Applicants: <span className='pl-2 font-normal text-gray-800'>{singleJob?.applications?.length}</span>
                </h1>

                <h1 className='font-bold my-1'>
                    Posted Date: <span className='pl-2 font-normal text-gray-800'>{singleJob?.createdAt.split("T")[0]}</span>
                </h1>
            </div>
        </div>
    )
}

export default JobDescription;