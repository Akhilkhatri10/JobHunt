import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { setAllApplicants } from '@/redux/applicationSlice';

const shortlistingStatus = ["accepted", "rejected"];

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);
    const dispatch = useDispatch();

    const statusHandler = async (status, id) => {
        console.log('called');
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });
            console.log(res);
            if (res.data.success) {
                toast.success(res.data.message);

                // update UI instantly
                const updatedApplicants = {
                    ...applicants,
                    applications: applicants.applications.map((app) =>
                        app._id === id ? { ...app, status } : app
                    )
                };

                dispatch(setAllApplicants(updatedApplicants));
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    return (
        <div className="w-full overflow-x-auto pb-2">
            <Table className="min-w-[900px]">
                <TableCaption>A list of your recent applied user</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-xs sm:text-sm">Name</TableHead>


                        <TableHead className="text-xs sm:text-sm">
                            Email
                        </TableHead>

                        <TableHead className="text-xs sm:text-sm">Contact</TableHead>


                        <TableHead className="text-xs sm:text-sm">
                            Resume
                        </TableHead>

                        {/* Hide date on mobile */}
                        <TableHead className="hidden sm:table-cell text-xs sm:text-sm">
                            Date
                        </TableHead>

                        <TableHead className="text-xs sm:text-sm">Status</TableHead>

                        <TableHead className="text-right text-xs sm:text-sm">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        applicants && applicants?.applications?.map((item) => (
                            <TableRow key={item._id}>

                                <TableCell className="text-xs sm:text-sm">
                                    {item?.applicant?.fullname}
                                </TableCell>


                                <TableCell className="text-xs sm:text-sm whitespace-nowrap">
                                    {item?.applicant?.email}
                                </TableCell>

                                <TableCell className="text-xs sm:text-sm">
                                    {item?.applicant?.phoneNumber}
                                </TableCell>


                                <TableCell className="text-xs sm:text-sm whitespace-nowrap">
                                    {
                                        item.applicant?.profile?.resume
                                            ? (
                                                <a
                                                    className="text-blue-600 cursor-pointer break-all text-xs sm:text-sm"
                                                    href={item?.applicant?.profile?.resume}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    {item?.applicant?.profile?.resumeOriginalName}
                                                </a>
                                            )
                                            : <span>NA</span>
                                    }
                                </TableCell>

                                {/* Date hidden on mobile */}
                                <TableCell className="hidden sm:table-cell text-xs sm:text-sm whitespace-nowrap">
                                    {item?.applicant.createdAt.split("T")[0]}
                                </TableCell>

                                <TableCell>
                                    <span className={`px-2 py-1 rounded text-white text-xs ${item.status === "accepted"
                                            ? "bg-green-500"
                                            : item.status === "rejected"
                                                ? "bg-red-500"
                                                : "bg-gray-400"
                                        }`}>
                                        {item.status || "Pending"}
                                    </span>
                                </TableCell>

                                <TableCell className="text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal className="w-4 h-4 sm:w-5 sm:h-5" />
                                        </PopoverTrigger>

                                        <PopoverContent className="w-32">
                                            {
                                                shortlistingStatus.map((status, index) => (
                                                    <div
                                                        onClick={() => statusHandler(status, item?._id)}
                                                        key={index}
                                                        className='flex w-fit items-center my-2 cursor-pointer'
                                                    >
                                                        <span>{status}</span>
                                                    </div>
                                                ))
                                            }
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

export default ApplicantsTable