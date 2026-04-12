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

const Navbar = () => {
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
        <div className='sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b shadow-sm'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-4'>

                {/* LOGO */}
                <Link to="/">
                    <h1 className='text-2xl font-bold tracking-tight'>
                        Job<span className='text-[#F83002]'>Hunt</span>
                    </h1>
                </Link>

                {/* NAV LINKS */}
                <div className='flex items-center gap-10'>
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
                            <Popover>
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
                                                <Link to="/profile" className='flex items-center gap-2 hover:text-purple-600'>
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
            </div>
        </div>
    )
}

export default Navbar