import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';

const normalize = (str) => str?.trim().toLowerCase();

const matchIndustry = (title, industry) => {
    if (!industry) return true;

    const value = industry.toLowerCase();
    const t = title.toLowerCase();

    if (value === "frontend developer") return t.includes("frontend");
    if (value === "software engineer") return t.includes("software");
    if (value === "product manager") return t.includes("product");

    if (value === "other") {
        return (
            !t.includes("frontend") &&
            !t.includes("software") &&
            !t.includes("product")
        );
    }

    return true;
};

const matchSalary = (jobSalary, salary) => {
    if (!salary) return true;
    if (salary === "0-5 LPA") return jobSalary <= 5;
    if (salary === "5-10 LPA") return jobSalary > 5 && jobSalary <= 10;
    if (salary === "10-20 LPA") return jobSalary > 10 && jobSalary <= 20;
    if (salary === "20+ LPA") return jobSalary > 20;
    return true;
};


const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);
    const [showFilters, setShowFilters] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get("search") || "";

    useEffect(() => {
        let filtered = [...allJobs];

        // Search filter (URL search)
        if (searchQuery) {
            filtered = filtered.filter((job) =>
                job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                // job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                job.company?.name?.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Sidebar filters
        if (searchedQuery && Object.values(searchedQuery).some(val => val)) {
            const { location, industry, salary } = searchedQuery;

            filtered = filtered.filter((job) => {

                const matchLocation = !location || normalize(job.location) === normalize(location);

                const matchIndustryResult = matchIndustry(job.title, industry);

                const matchSalaryResult = matchSalary(job.salary, salary);

                return matchLocation && matchIndustryResult && matchSalaryResult;
            });
        }

        setFilterJobs(filtered);

    }, [allJobs, searchQuery, searchedQuery]);


    return (
        <div>
            <div className='max-w-7xl mx-auto mt-5'>
                <div className='flex flex-col lg:flex-row gap-5'>
                    <div className='hidden lg:block w-[260px] shrink-0'>
                        <FilterCard isMobile={false} />
                    </div>

                    <div className='flex-1 p-5'>

                        {/* ALWAYS SHOW THIS */}
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">

                            <h2 className="text-2xl font-semibold">
                                {searchQuery
                                    ? `Results for "${searchQuery}"`
                                    : "All Jobs"}
                            </h2>

                            <div className="flex gap-2 w-full sm:w-auto">
                                {/* FILTER BUTTON (only mobile) */}
                                <button
                                    onClick={() => setShowFilters(true)}
                                    className="lg:hidden px-4 py-2 border rounded-full text-sm"
                                >
                                    Filters
                                </button>

                                <input
                                    type="text"
                                    placeholder="Search jobs..."
                                    value={searchQuery}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        const params = new URLSearchParams(location.search);

                                        if (value) params.set("search", value);
                                        else params.delete("search");

                                        navigate(`?${params.toString()}`);
                                    }}
                                    className="w-full sm:w-[300px] md:w-[320px] px-4 py-2 border rounded-full"
                                />
                            </div>

                        </div>

                        {/* Job count */}
                        <p className="text-gray-500 font-semibold mb-4">
                            {filterJobs.length === 0
                                ? "0 jobs found"
                                : filterJobs.length === 1
                                    ? "1 job found"
                                    : `${filterJobs.length} jobs found`}
                        </p>

                        {/* ONLY THIS PART CHANGES */}
                        {
                            filterJobs.length === 0 ? (
                                <div className="text-center mt-20">
                                    <h2 className="text-3xl font-semibold">No jobs found</h2>
                                    <p className="text-xl text-gray-500 mt-4">
                                        Try searching with different keywords
                                    </p>
                                </div>
                            ) : (
                                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 auto-rows-fr'>
                                    {filterJobs.map((job) => (
                                        <motion.div
                                            initial={{ opacity: 0, x: 100 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -100 }}
                                            transition={{ duration: 0.3 }}
                                            key={job?._id}>
                                            <Job job={job} />
                                        </motion.div>
                                    ))}
                                </div>
                            )
                        }

                    </div>

                </div>
            </div>

            {/* MOBILE FILTER DRAWER */}
            <AnimatePresence>
                {showFilters && (
                    <div className="fixed inset-0 z-50 flex">

                        {/* BACKDROP */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.4 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="flex-1 bg-black/40 backdrop-blur-sm"
                            onClick={() => setShowFilters(false)}
                        />

                        {/* DRAWER (RIGHT SIDE) */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
                            className="w-[75%] max-w-[320px] bg-white h-full p-4 overflow-y-auto shadow-xl"
                        >
                            <div className="flex justify-between items-center my-6">
                                <h2 className="font-semibold">Filters</h2>
                                <button onClick={() => setShowFilters(false)}>✕</button>
                            </div>

                            <FilterCard isMobile={true} setShowFilters={setShowFilters} />
                        </motion.div>

                    </div>
                )}
            </AnimatePresence>

        </div>
    )
}

export default Jobs