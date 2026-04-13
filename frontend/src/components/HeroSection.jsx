import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        if (!query.trim()) return;
        navigate(`/jobs?search=${query}`);
    }

    return (
        <div className='text-center px-4 sm:px-6 lg:px-8'>
            <div className='flex flex-col gap-5 my-8 sm:my-10 lg:my-14'>

                {/* Badge */}
                <span className='mx-auto px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gray-100 text-[#F83002] font-medium text-xs sm:text-sm'>
                    No. 1 Job Hunt Website
                </span>

                {/* Heading */}
                <h1 className='font-bold leading-tight 
                    text-2xl sm:text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl'>
                    Search, Apply & <br />
                    Get Your <span className='text-[#6A38C2]'>Dream Jobs</span>
                </h1>

                {/* Description */}
                <p className='text-sm sm:text-base md:text-lg text-gray-600 max-w-xl mx-auto'>
                    Find the perfect job that matches your skills and experience
                </p>

                {/* Search Bar */}
                <div className='
                    flex items-center gap-2 sm:gap-4 
                    w-full sm:w-[80%] md:w-[60%] lg:w-[40%] 
                    mx-auto 
                    shadow-lg border border-gray-200 
                    pl-3 pr-1 py-1 
                    rounded-full
                '>
                    <input
                        type="text"
                        placeholder='Find your dream jobs'
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && searchJobHandler()}
                        className='outline-none border-none w-full text-sm sm:text-base'
                    />

                    <Button
                        onClick={searchJobHandler}
                        className="rounded-full sm:rounded-r-full bg-[#6A38C2] px-3 sm:px-4"
                    >
                        <Search className='h-4 w-4 sm:h-5 sm:w-5' />
                    </Button>
                </div>

            </div>
        </div>
    )
}

export default HeroSection