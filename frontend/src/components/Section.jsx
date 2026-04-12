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
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">

            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">{title}</h1>
                <span className="text-lg font-medium text-gray-900">
                    {jobs.length} jobs
                </span>
            </div>

            {/* Scroll Container */}
            <div className="relative">

                {/* LEFT BUTTON */}
                <button
                    onClick={() => scroll("left")}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/10 backdrop-blur shadow-md p-2 rounded-full hover:scale-105"
                >
                    <ChevronLeft size={20} />
                </button>


                {/* SCROLL AREA */}
                <div
                    ref={scrollRef}
                    className="flex gap-5 overflow-x-auto p-3 scroll-smooth snap-x snap-mandatory scrollbar-hide"
                >
                    {
                        jobs.length === 0 ? (
                            <p className="text-gray-500">No jobs available</p>
                        ) : (
                            jobs.map((job) => (
                                <div key={job._id} className="min-w-[300px] max-w-[300px]">
                                    <Job job={job} />
                                </div>
                            ))
                        )
                    }
                </div>

                {/* RIGHT BUTTON */}
                <button
                    onClick={() => scroll("right")}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/10 backdrop-blur shadow-md p-2 rounded-full hover:scale-105"
                >
                    <ChevronRight size={20} />
                </button>

                <div className="absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
            </div>


        </div>
    );
};

export default Section