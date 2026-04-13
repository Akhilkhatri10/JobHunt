import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminJobsTable = () => {
    const { allAdminJobs, searchJobByText } = useSelector(store => store.job);

    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const navigate = useNavigate();

    useEffect(() => {
        console.log('called');
        const filteredJobs = allAdminJobs.filter((job) => {
            if (!searchJobByText) {
                return true;
            };
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());

        });
        setFilterJobs(filteredJobs);
    }, [allAdminJobs, searchJobByText])
    return (
        <div className="w-full overflow-x-auto">
            <Table className="min-w-[600px] sm:min-w-full">
                <TableCaption>A list of your recent  posted jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-xs sm:text-sm">Company</TableHead>
                        <TableHead className="text-xs sm:text-sm">Role</TableHead>

                        {/* Hide date on mobile */}
                        <TableHead className="hidden sm:table-cell text-xs sm:text-sm">
                            Date
                        </TableHead>

                        <TableHead className="text-right text-xs sm:text-sm">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterJobs?.map((job) => (
                            <TableRow key={job._id}>

                                <TableCell className="text-xs sm:text-sm">
                                    {job?.company?.name}
                                </TableCell>

                                <TableCell className="text-xs sm:text-sm">
                                    {job?.title}
                                </TableCell>

                                {/* Hide date on mobile */}
                                <TableCell className="hidden sm:table-cell text-xs sm:text-sm whitespace-nowrap">
                                    {job?.createdAt.split("T")[0]}
                                </TableCell>

                                <TableCell className="text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal className="w-4 h-4 sm:w-5 sm:h-5" />
                                        </PopoverTrigger>

                                        <PopoverContent className="w-32">
                                            <div
                                                onClick={() => navigate(`/admin/jobs/${job._id}`)}
                                                className='flex items-center gap-2 cursor-pointer'
                                            >
                                                <Edit2 className='w-4' />
                                                <span>Edit</span>
                                            </div>

                                            <div
                                                onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                                                className='flex items-center gap-2 cursor-pointer mt-2'
                                            >
                                                <Eye className='w-4' />
                                                <span>Applicants</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>

                            </TableRow>

                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AdminJobsTable