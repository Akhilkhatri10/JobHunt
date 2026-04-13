import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useNavigate, useParams } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { ArrowLeft } from "lucide-react";


const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const params = useParams();
    const isEditMode = !!params.id;

    const { companies } = useSelector(store => store.company);

    useEffect(() => {
        if (isEditMode) {
            const fetchJob = async () => {
                try {
                    const res = await axios.get(
                        `${JOB_API_END_POINT}/get/${params.id}`,
                        { withCredentials: true }
                    );

                    if (res.data.success) {
                        const job = res.data.job;

                        setInput({
                            title: job.title || "",
                            description: job.description || "",
                            requirements: job.requirements?.join(", ") || "",
                            salary: job.salary || "",
                            location: job.location || "",
                            jobType: job.jobType || "",
                            experience: job.experienceLevel || "",
                            position: job.position || 0,
                            companyId: job.company?._id || ""
                        });
                    }
                } catch (error) {
                    console.log(error);
                }
            };

            fetchJob();
        }
    }, [params.id]);


    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (value) => {
        // const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);
        // setInput({ ...input, companyId: selectedCompany._id });
        setInput({ ...input, companyId: value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);

            const url = isEditMode
                ? `${JOB_API_END_POINT}/update/${params.id}`
                : `${JOB_API_END_POINT}/post`;

            const method = isEditMode ? "put" : "post";

            const payload = {
                ...input,
                requirements: input.requirements.split(",").map(r => r.trim())
            };

            const res = await axios[method](url, payload, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });

            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <Navbar />

            <div className="max-w-lg mx-auto sm:mx-1 md:mx-1 lg:mx-48 my-4 px-4 sm:px-6 lg:px-8">
                <Button
                    variant="outline"
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                </Button>
            </div>

            <div className='flex items-center justify-center w-full my-5 px-4 sm:px-6 lg:px-8'>
                <form
                    onSubmit={submitHandler}
                    className='p-4 sm:p-6 lg:p-8 w-full max-w-4xl border border-gray-200 shadow-lg rounded-md'
                >
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-2'>
                        <div>
                            <Label>Title</Label>
                            <Input
                                type="text"
                                name="title"
                                value={input.title}
                                onChange={changeEventHandler}
                                className="w-full focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                className="w-full focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Requirements</Label>
                            <Input
                                type="text"
                                name="requirements"
                                value={input.requirements}
                                onChange={changeEventHandler}
                                className="w-full focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Salary</Label>
                            <Input
                                type="text"
                                name="salary"
                                value={input.salary}
                                onChange={changeEventHandler}
                                className="w-full focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                className="w-full focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Job Type</Label>
                            <Input
                                type="text"
                                name="jobType"
                                value={input.jobType}
                                onChange={changeEventHandler}
                                className="w-full focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Experience Level</Label>
                            <Input
                                type="text"
                                name="experience"
                                value={input.experience}
                                onChange={changeEventHandler}
                                className="w-full focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>No of Postion</Label>
                            <Input
                                type="number"
                                name="position"
                                value={input.position}
                                onChange={changeEventHandler}
                                className="w-full focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        {
                            companies.length > 0 && (
                                <Select
                                    value={input.companyId}
                                    onValueChange={selectChangeHandler}
                                >
                                    <SelectTrigger className="w-full sm:w-[180px]">
                                        <SelectValue placeholder="Select a Company" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {
                                                companies.map((company) => {
                                                    return (
                                                        // <SelectItem value={company?.name?.toLowerCase()}>{company.name}</SelectItem>
                                                        <SelectItem key={company._id} value={company._id}>
                                                            {company.name}
                                                        </SelectItem>
                                                    )
                                                })
                                            }

                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )
                        }
                    </div>
                    <Button type="submit" className="w-full my-4 sm:my-6">
                        {loading ? (
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                        ) : (
                            isEditMode ? "Update Job" : "Post New Job"
                        )}
                    </Button>
                    {
                        companies.length === 0 && <p className='text-xs text-red-600 font-bold text-center my-3'>*Please register a company first, before posting a jobs</p>
                    }
                </form>
            </div>
        </div>
    )
}

export default PostJob