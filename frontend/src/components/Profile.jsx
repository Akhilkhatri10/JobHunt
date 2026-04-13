import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

const isResume = true;

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);

    return (
        <div>

            {/* Profile Card */}
            <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-4 sm:p-6 lg:p-8'>

                {/* Top Section */}
                <div className='relative flex flex-col sm:flex-row sm:justify-between gap-4'>

                    {/* Left */}
                    <div className='flex items-center gap-3 sm:gap-4'>
                        <Avatar className="h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24">
                            <AvatarImage
                                src={user?.profile?.profilePhoto}
                                alt="profile"
                            />
                        </Avatar>

                        <div>
                            <h1 className='font-medium text-lg sm:text-xl'>
                                {user?.fullname}
                            </h1>
                            <p className='text-sm sm:text-base text-gray-600'>
                                {user?.profile?.bio}
                            </p>
                        </div>
                    </div>

                    {/* Edit Button */}
                    <Button
                        onClick={() => setOpen(true)}
                        className="absolute top-0 right-0 sm:static"
                        variant="outline"
                    >
                        <Pen />
                    </Button>
                </div>

                {/* Contact Info */}
                <div className='my-4 sm:my-5'>
                    <div className='flex items-center gap-3 my-2 text-sm sm:text-base'>
                        <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className='break-all'>{user?.email}</span>
                    </div>

                    <div className='flex items-center gap-3 my-2 text-sm sm:text-base'>
                        <Contact className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span>{user?.phoneNumber}</span>
                    </div>
                </div>

                {/* Skills */}
                <div className='my-4 sm:my-5'>
                    <h1 className='font-medium mb-2'>Skills</h1>
                    <div className='flex flex-wrap gap-2'>
                        {
                            user?.profile?.skills.length !== 0
                                ? user?.profile?.skills.map((item, index) => (
                                    <Badge key={index}>{item}</Badge>
                                ))
                                : <span>NA</span>
                        }
                    </div>
                </div>

                {/* Resume */}
                <div className='grid w-full sm:max-w-sm items-center gap-1.5'>
                    <Label className="text-md font-bold">Resume</Label>
                    {
                        isResume
                            ? (
                                <a
                                    href={`https://docs.google.com/gview?url=${user?.profile?.resume}&embedded=true`}
                                    target='_blank'
                                    rel="noopener noreferrer"
                                    className='text-blue-500 w-full hover:underline cursor-pointer break-all'
                                >
                                    {user?.profile?.resumeOriginalName}
                                </a>
                            )
                            : <span>NA</span>
                    }
                </div>
            </div>

            {/* Applied Jobs Section */}
            <div className='max-w-4xl mx-auto bg-white rounded-2xl px-4 sm:px-6 lg:px-8 py-4 sm:py-5'>
                <h1 className='font-bold text-base sm:text-lg mb-4 sm:my-5'>
                    Applied Jobs
                </h1>

                <AppliedJobTable />
            </div>

            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile