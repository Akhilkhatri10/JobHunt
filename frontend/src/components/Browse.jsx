import React from 'react'
import { useSelector } from 'react-redux';
import Section from './Section';
import Navbar from './shared/Navbar';


const Browse = () => {

    const { allJobs } = useSelector(store => store.job);

    const trendingJobs = [...allJobs]
        .sort((a, b) => b.applications.length - a.applications.length)
        .slice(0, 6);

    const recentJobs = [...allJobs]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 6);

    const highSalaryJobs = [...allJobs]
        .sort((a, b) => b.salary - a.salary)
        .slice(0, 6);


    return (

        <div className="bg-gray-50 min-h-screen">
            <Navbar />

            <div className="max-w-7xl mx-auto py-8 space-y-8">

                {/* Trending */}
                <Section title="Trending Jobs" jobs={trendingJobs} />

                {/* Recent */}
                <Section title="Recently Posted" jobs={recentJobs} />

                {/* Salary */}
                <Section title="High Salary Jobs" jobs={highSalaryJobs} />

            </div>
        </div>

    )
}

export default Browse