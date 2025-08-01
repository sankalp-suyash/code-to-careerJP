import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { LogOut, User2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'; // Import axios
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { setUser } from '@/redux/authslice';

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    console.log(user)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null)); // Clear user state
                navigate("/"); // Redirect to home
                toast.success(res.data.message); // Show success toast
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Logout failed!"); // Show error toast
        }
    };

    return (
        <div className='bg-white'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
                <div>
                    <h1 className='text-2xl'>Job<span className='text-[#F83002]'>Portal</span></h1>
                </div>

                <div className='flex items-center gap-12'>
                    <ul className='flex font-medium items-center gap-5'>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/jobs">Jobs</Link></li>
                        <li><Link to="/browse">Browse</Link></li>
                    </ul>
                    {
                        !user ? (
                            <div className='flex items-center gap-2'>
                                <Link to="/login"><Button varient="outline">LogIn</Button></Link>
                                <Link to="/signup"><Button className='bg-[#6A38C2] hover:bg-[#3e0b97]'>SignUp</Button></Link>
                            </div>
                        ) : (
                            <Popover className='cursor-pointer'>
                                <PopoverTrigger asChild>
                                    <Avatar>
                                        <AvatarImage
                                            src={user?.profile?.profilePhoto || undefined}
                                            alt={user?.fullname || "User"}
                                        />
                                        <AvatarFallback  className="bg-gray-200 text-black font-semibold">
                                            {user?.fullname?.split(" ").map(word => word[0]).join("").toUpperCase() || "U"}
                                        </AvatarFallback>
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <div className='flex gap-4 space-y-2'>
                                        <Avatar>
                                            <AvatarImage
                                                src={user?.profile?.profilePhoto || undefined}
                                                alt={user?.fullname || "User"}
                                            />
                                            <AvatarFallback  className="bg-gray-200 text-black font-semibold">
                                                {user?.fullname?.split(" ").map(word => word[0]).join("").toUpperCase() || "U"}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h4>{user?.fullname}</h4>
                                            <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                                        </div>
                                    </div>
                                    <div className='flex flex-col my-2 text-gray-600'>
                                        <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                            <User2 />
                                            <Button varient="link"><Link to="/profile">View Profile</Link></Button>
                                        </div>
                                        <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                            <LogOut />
                                            <Button onClick={logoutHandler} varient="link">Logout</Button>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;
