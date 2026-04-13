import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2 } from 'lucide-react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [openPopover, setOpenPopover] = useState(false);
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    const navLinkClass = ({ isActive }) =>
        `transition-all duration-200 text-lg hover:text-[#6A38C2] ${isActive ? "text-[#6A38C2] font-semibold" : "text-gray-700"}`;


    return (
        <>
            <div className='fixed top-0 z-[100] bg-white/80 backdrop-blur-md border-b shadow-sm w-full'>
                <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-4 w-full sm:px-6 lg:px-8'>

                    {/* LOGO */}
                    <Link to="/">
                        <h1 className='text-xl sm:text-2xl font-bold tracking-tight'>
                            Job<span className='text-[#F83002]'>Hunt</span>
                        </h1>
                    </Link>

                    {/* DESKTOP NAV */}
                    <div className='hidden md:flex items-center gap-8'>
                        <ul className='flex items-center gap-6 text-sm font-medium'>
                            {
                                user && user.role === 'recruiter' ? (
                                    <>
                                        <li><NavLink to="/admin/companies" className={navLinkClass}>Companies</NavLink></li>
                                        <li><NavLink to="/admin/jobs" className={navLinkClass}>Jobs</NavLink></li>
                                    </>
                                ) : (
                                    <>
                                        <li><NavLink to="/" className={navLinkClass}>Home</NavLink></li>
                                        <li><NavLink to="/jobs" className={navLinkClass}>Jobs</NavLink></li>
                                        <li><NavLink to="/saved" className={navLinkClass}>Saved</NavLink></li>
                                        <li><NavLink to="/browse" className={navLinkClass}>Browse</NavLink></li>
                                    </>
                                )
                            }
                        </ul>

                        {/* RIGHT SIDE */}
                        {
                            !user ? (
                                <div className='flex items-center gap-2'>
                                    <Link to="/login">
                                        <Button variant="outline" className="rounded-full px-5">Login</Button>
                                    </Link>
                                    <Link to="/signup">
                                        <Button className="bg-[#6A38C2] hover:bg-[#5b30a6] rounded-full px-5">
                                            Signup
                                        </Button>
                                    </Link>
                                </div>
                            ) : (
                                <Popover open={openPopover} onOpenChange={setOpenPopover}>
                                    <PopoverTrigger asChild>
                                        <Avatar className="cursor-pointer ring-2 ring-transparent hover:ring-purple-500 transition">
                                            <AvatarImage src={user?.profile?.profilePhoto} />
                                        </Avatar>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-72 p-4 rounded-xl shadow-lg">
                                        <div className='flex gap-3 items-center mb-3'>
                                            <Avatar>
                                                <AvatarImage src={user?.profile?.profilePhoto} />
                                            </Avatar>
                                            <div>
                                                <h4 className='font-semibold'>{user?.fullname}</h4>
                                                <p className='text-xs text-gray-500'>
                                                    {user?.profile?.bio || "No bio"}
                                                </p>
                                            </div>
                                        </div>

                                        <div className='flex flex-col gap-2 text-sm'>
                                            {
                                                user?.role === 'student' && (
                                                    <Link
                                                        to="/profile"
                                                        onClick={() => setOpenPopover(false)}
                                                        className='flex items-center gap-2 hover:text-purple-600'
                                                    >
                                                        <User2 size={16} />
                                                        View Profile
                                                    </Link>
                                                )
                                            }

                                            <button
                                                onClick={logoutHandler}
                                                className='flex items-center gap-2 text-red-500 hover:text-red-600'
                                            >
                                                <LogOut size={16} />
                                                Logout
                                            </button>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            )
                        }
                    </div>

                    {/* MOBILE MENU BUTTON */}
                    <div className='md:hidden flex items-center gap-3'>

                        {/* Show Login if user NOT logged in */}
                        {
                            !user && (
                                <Link to="/login">
                                    <Button size="sm" variant="outline">
                                        Login
                                    </Button>
                                </Link>
                            )
                        }
                        {/* Avatar (only if logged in) */}
                        {
                            user && (
                                <Avatar
                                    onClick={() => navigate("/profile")}
                                    className="h-9 w-9 cursor-pointer"
                                >
                                    <AvatarImage src={user?.profile?.profilePhoto} />
                                </Avatar>
                            )
                        }

                        {/* Hamburger */}
                        <button onClick={() => setIsOpen(!isOpen)}>
                            <Menu />
                        </button>
                    </div>
                </div>
            </div>

            {/* OVERLAY */}
            <div
                className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
                onClick={() => setIsOpen(false)}
            />

            {/* DRAWER */}
            <div className={`fixed top-0 right-0 h-full w-[75%] max-w-xs bg-white z-[110] shadow-lg transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"
                } md:hidden`}
            >
                <div className="p-5 flex flex-col h-full relative">

                    {/* CLOSE BUTTON */}
                    <button
                        onClick={() => setIsOpen(false)}
                        className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition"
                    >
                        <X size={22} />
                    </button>

                    {/* NAV LINKS */}
                    <ul className='flex flex-col gap-5 text-sm font-medium'>
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li><Link to="/admin/companies" onClick={() => setIsOpen(false)}>Companies</Link></li>
                                    <li><Link to="/admin/jobs" onClick={() => setIsOpen(false)}>Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
                                    <li><Link to="/jobs" onClick={() => setIsOpen(false)}>Jobs</Link></li>
                                    <li><Link to="/saved" onClick={() => setIsOpen(false)}>Saved</Link></li>
                                    <li><Link to="/browse" onClick={() => setIsOpen(false)}>Browse</Link></li>
                                </>
                            )
                        }
                    </ul>

                    {/* BOTTOM SECTION */}
                    <div className='mt-auto border-t pt-4'>

                        {
                            !user ? (
                                <div className='flex flex-col gap-2'>
                                    <Link to="/login">
                                        <Button variant="outline" className="w-full">Login</Button>
                                    </Link>
                                    <Link to="/signup">
                                        <Button className="w-full bg-[#6A38C2]">Signup</Button>
                                    </Link>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-3 text-sm">

                                    {/* USER INFO */}
                                    <div className="flex items-center gap-3 mb-2">
                                        <Avatar className="h-9 w-9">
                                            <AvatarImage src={user?.profile?.profilePhoto} />
                                        </Avatar>
                                        <p className="font-medium">{user?.fullname}</p>
                                    </div>

                                    <Link
                                        to="/profile"
                                        onClick={() => setIsOpen(false)}
                                        className="hover:text-purple-600"
                                    >
                                        View Profile
                                    </Link>

                                    <button
                                        onClick={() => {
                                            logoutHandler();
                                            setIsOpen(false);
                                        }}
                                        className='text-red-500 text-left'
                                    >
                                        Logout
                                    </button>
                                </div>
                            )
                        }
                    </div>

                </div>
            </div>
        </>
    )
}

export default Navbar