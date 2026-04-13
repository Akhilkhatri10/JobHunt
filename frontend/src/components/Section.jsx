import React, { useRef } from 'react'
import Job from './Job'
import { ChevronLeft, ChevronRight } from 'lucide-react';


const Section = ({ title, jobs }) => {


    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = 320; // card width approx
            scrollRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth"
            });
        }
    };


    return (
        <div className="bg-white p-4 sm:p-5 lg:p-6 rounded-xl shadow-sm border border-gray-100">

            {/* Header */}
            <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    {title}
                </h1>
                <span className="text-sm sm:text-lg font-medium text-gray-900">
                    {jobs.length} jobs
                </span>
            </div>

            {/* Scroll Container */}
            <div className="relative">

                {/* LEFT BUTTON (hidden on mobile) */}
                <button
                    onClick={() => scroll("left")}
                    className="hidden sm:block absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/10 backdrop-blur shadow-md p-2 rounded-full hover:scale-105"
                >
                    <ChevronLeft size={20} />
                </button>

                {/* SCROLL AREA */}
                <div
                    ref={scrollRef}
                    className="flex gap-3 sm:gap-5 overflow-x-auto p-2 sm:p-3 scroll-smooth snap-x snap-mandatory scrollbar-hide"
                    style={{ WebkitOverflowScrolling: "touch" }}
                >
                    {
                        jobs.length === 0 ? (
                            <p className="text-gray-500 text-sm sm:text-base">No jobs available</p>
                        ) : (
                            jobs.map((job) => (
                                <div
                                    key={job._id}
                                    className="
                                        snap-start
                                        min-w-[85%] 
                                        sm:min-w-[300px] 
                                        max-w-[85%] 
                                        sm:max-w-[300px] 
                                        2xl:min-w-[340px] 
                                        2xl:max-w-[340px]
                                        transition-transform duration-300
                                        hover:scale-[1.02]"
                                >
                                    <Job job={job} />
                                </div>
                            ))
                        )
                    }
                </div>

                {/* RIGHT BUTTON (hidden on mobile) */}
                <button
                    onClick={() => scroll("right")}
                    className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/10 backdrop-blur shadow-md p-2 rounded-full hover:scale-105"
                >
                    <ChevronRight size={20} />
                </button>

                {/* Gradient fade (slightly responsive) */}
                <div className="absolute right-0 top-0 h-full w-8 sm:w-12 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
            </div>

        </div>
    );
};

export default Section