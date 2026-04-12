import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import { motion } from 'framer-motion'


const Job = ({ job }) => {
    const navigate = useNavigate();
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();

    const handleSaveJob = async () => {
        try {
            const res = await axios.post(
                `${USER_API_END_POINT}/save/${job._id}`,
                {},
                { withCredentials: true }
            );
            console.log(res.data);

            if (res.data.success) {
                dispatch(setUser(res.data.user));

                const isNowSaved = res.data.user.savedJobs.some(
                    (savedJob) => savedJob._id === job._id
                );

                toast.success(
                    isNowSaved
                        ? "Saved successfully ✅"
                        : "Removed from saved ❌"
                );
            }
        } catch (error) {
            console.log(error);
        }
    };

    const isSaved = user?.savedJobs?.some(
        (savedJob) => savedJob._id === job._id
    );

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    }

    return (
        <div className='p-5 rounded-md shadow-md bg-white border border-gray-100 flex flex-col justify-between h-full transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02] hover:border-purple-300 cursor-pointer'>

            {/* CHILD 1: ALL CONTENT */}
            <div className='flex flex-col'>
                <div className='flex items-center justify-between'>
                    <p className='text-sm text-gray-500'>
                        {daysAgoFunction(job?.createdAt) === 0
                            ? "Today"
                            : `${daysAgoFunction(job?.createdAt)} days ago`}
                    </p>
                    <Button
                        variant="outline"
                        className="rounded-full"
                        size="icon"
                        onClick={handleSaveJob}
                    >
                        <Bookmark
                            className={`transition-all duration-300 
                                ${isSaved ? "fill-black scale-110" : "scale-100"}`}
                        />
                    </Button>
                </div>

                <div className='flex items-center gap-2 my-2'>
                    <Button className="p-6" variant="outline" size="icon">
                        <Avatar>
                            <AvatarImage src={job?.company?.logo} />
                        </Avatar>
                    </Button>
                    <div>
                        <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                        <p className='text-sm text-gray-500'>India</p>
                    </div>
                </div>

                <div>
                    <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                    <p className='text-sm text-gray-600 line-clamp-3'>
                        {job?.description}
                    </p>
                </div>

                <div className='flex items-center gap-2 mt-4'>
                    <Badge className='text-blue-700 font-bold' variant="ghost">
                        {job?.position} Positions
                    </Badge>
                    <Badge className='text-[#F83002] font-bold' variant="ghost">
                        {job?.jobType}
                    </Badge>
                    <Badge className='text-[#7209b7] font-bold' variant="ghost">
                        {job?.salary}LPA
                    </Badge>
                </div>
            </div>

            {/* CHILD 2: BUTTONS */}
            <div className='flex items-center gap-4 mt-4'>
                <Button onClick={() => navigate(`/description/${job?._id}`)} variant="outline">
                    Details
                </Button>

                <motion.div whileTap={{ scale: 0.9 }}>
                    <Button
                        className={`transition-all duration-300 
                        ${isSaved ? "bg-green-600" : "bg-[#7209b7]"}`
                        }
                        onClick={handleSaveJob}
                    >
                        {isSaved ? "Saved" : "Save For Later"}
                    </Button>
                </motion.div>

            </div>

        </div>
    );
}

export default Job