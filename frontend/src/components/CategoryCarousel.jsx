import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Software Engineer",
    "Graphic Designer",
    "UI/UX Designer",
    "Data Analyst",
]

const CategoryCarousel = () => {
    const navigate = useNavigate();

    const searchJobHandler = (query) => {
        navigate(`/jobs?search=${encodeURIComponent(query)}`);
    };

    return (
        <div className="px-4 sm:px-6 lg:px-8 my-6 sm:my-8 lg:my-10">
            <Carousel className="w-full max-w-2xl lg:max-w-4xl 2xl:max-w-6xl mx-auto">

                <CarouselContent className="-ml-2 sm:-ml-4">
                    {category.map((cat, index) => (
                        <CarouselItem
                            key={index}
                            className="
                                pl-2 sm:pl-4
                                basis-1/2 
                                sm:basis-1/2 
                                md:basis-1/3 
                                lg:basis-1/3 
                                2xl:basis-1/4
                                flex justify-center
                            "
                        >
                            <Button
                                onClick={() => searchJobHandler(cat)}
                                variant="outline"
                                className="
                                    rounded-full 
                                    px-4 sm:px-5 lg:px-6 
                                    py-1.5 sm:py-2 
                                    text-xs sm:text-sm lg:text-base
                                    whitespace-nowrap
                                    hover:bg-purple-600 hover:text-white 
                                    transition-all duration-300
                                "
                            >
                                {cat}
                            </Button>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                {/* Controls */}
                <div className="hidden sm:block">
                    <CarouselPrevious />
                    <CarouselNext />
                </div>

            </Carousel>
        </div>
    )
}

export default CategoryCarousel