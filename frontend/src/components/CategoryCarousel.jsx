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
        <div>
            <Carousel className="w-full max-w-2xl mx-auto">
                <CarouselContent>
                    {category.map((cat, index) => (
                        <CarouselItem
                            key={index}
                            className="md:basis-1/2 lg:basis-1/3 flex justify-center"
                        >
                            <Button
                                onClick={() => searchJobHandler(cat)}
                                variant="outline"
                                className="rounded-full px-6 py-2 hover:bg-purple-600 hover:text-white transition-all duration-300"
                            >
                                {cat}
                            </Button>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}

export default CategoryCarousel