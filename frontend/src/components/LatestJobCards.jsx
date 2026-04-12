import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { Avatar, AvatarImage } from './ui/avatar'

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();

    const daysAgo = (date) => {
        const created = new Date(date);
        const now = new Date();
        const diff = Math.floor((now - created) / (1000 * 60 * 60 * 24));
        return diff === 0 ? "Today" : `${diff} days ago`;
    };

    return (
        <div
            onClick={() => navigate(`/description/${job._id}`)}
            className='p-5 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer flex flex-col justify-between h-full'
        >
            {/* TOP */}
            <div>
                {/* COMPANY */}
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                        <Avatar>
                            <AvatarImage src={job?.company?.logo} />
                        </Avatar>
                        <div>
                            <h1 className='font-medium text-base'>{job?.company?.name}</h1>
                            <p className='text-xs text-gray-500'>India</p>
                        </div>
                    </div>

                    <p className='text-xs text-gray-400'>
                        {daysAgo(job?.createdAt)}
                    </p>
                </div>

                {/* JOB TITLE */}
                <div className='mt-3'>
                    <h1 className='font-bold text-lg line-clamp-1'>
                        {job?.title}
                    </h1>
                    <p className='text-sm text-gray-600 mt-1 line-clamp-3'>
                        {job?.description}
                    </p>
                </div>
            </div>

            {/* BADGES */}
            <div className='flex flex-wrap gap-2 mt-4'>
                <Badge className='text-blue-700 font-semibold' variant="ghost">
                    {job?.position} Positions
                </Badge>
                <Badge className='text-[#F83002] font-semibold' variant="ghost">
                    {job?.jobType}
                </Badge>
                <Badge className='text-[#7209b7] font-semibold' variant="ghost">
                    {job?.salary} LPA
                </Badge>
            </div>
        </div>
    )
}

export default LatestJobCards