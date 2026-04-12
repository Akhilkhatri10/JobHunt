import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

const getRole = (title) => {
    const t = title.toLowerCase();
    if (t.includes("frontend")) return "Frontend Developer";
    if (t.includes("software engineer")) return "Software Engineer";
    if (t.includes("product manager")) return "Product Manager";
    return "Other";
};


const FilterCard = () => {
    const dispatch = useDispatch();
    const { allJobs } = useSelector(store => store.job);

    const [filters, setFilters] = useState({
        location: "",
        industry: "",
        salary: "",
    });

    const handleChange = (key, value) => {
        setFilters((prev) => ({
            ...prev,
            [key]: prev[key] === value ? "" : value, // toggle selection
        }));
    };

    const clearFilters = () => {
        setFilters({
            location: "",
            industry: "",
            salary: "",
        });
    };

    const filterData = React.useMemo(() => {
        if (!allJobs.length) return [];

        const locations = [...new Set(allJobs.map(job => job.location?.trim()))];

        const roles = [...new Set(allJobs.map(job => getRole(job.title)))];

        const salaryRanges = ["0-5 LPA", "5-10 LPA", "10-20 LPA", "20+ LPA"];

        return [
            {
                filterType: "Location",
                key: "location",
                options: locations,
            },
            {
                filterType: "Role",
                key: "industry",
                options: roles,
            },
            {
                filterType: "Salary",
                key: "salary",
                options: salaryRanges,
            },
        ];
    }, [allJobs]);

    useEffect(() => {
        dispatch(setSearchedQuery(filters));
    }, [filters]);

    return (
        <div className="w-[260px] min-w-[240px] bg-white p-4 rounded-lg border shadow-sm h-fit sticky top-20">

            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h1 className="font-semibold text-base">Filters</h1>
                <button
                    onClick={clearFilters}
                    className="text-sm text-purple-600 hover:underline"
                >
                    Clear
                </button>
            </div>

            {/* Filters */}
            {filterData.map((section, index) => (
                <div key={section.key} className="mb-5">

                    {/* Section Title */}
                    <h2 className="text-xs font-semibold text-gray-500 mb-2 mt-4 uppercase">
                        {section.filterType}
                    </h2>

                    {/* Options */}
                    <div className="space-y-2">
                        {section.options.map((item, idx) => {
                            const isActive = filters[section.key] === item;

                            return (
                                <button
                                    key={idx}
                                    onClick={() => handleChange(section.key, item)}
                                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition border ${isActive ? "bg-purple-50 border-purple-400 text-purple-700" : "bg-gray-50 hover:bg-gray-100 border-gray-200"}`}
                                >
                                    {item}
                                </button>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FilterCard;