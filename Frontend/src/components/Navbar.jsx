import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '../lib/axios';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { BellIcon, LogOutIcon, ShipWheelIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import Themeselector from './Themeselector';
import useAuthUser from '../hooks/useAuthUser';


const Navbar = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const isChatpage = location.pathname?.startsWith("/chat");
    
  const queryClient = useQueryClient();
  const {authUser} = useAuthUser();

  const {mutate:logoutMutation } = useMutation({
    mutationFn: async ()=>{
      const res = await axiosInstance.post("/auth/logout");
      return res.data;
    },

    onSuccess: () => {queryClient.invalidateQueries({queryKey:["authUser"]});
        toast.success("Logged out");

        setTimeout(() => {
          navigate("/login");
          
        }, 3000);
  },

  });



  return (
    <nav className='bg-base-200  border-base-300 sticky top-0 z-30 h-20  flex items-center'>
      <div className='container mx-auto px-4 sm:px-6 lg;px-8'>
      <div className='flex items-center justify-end w-full'>
        {isChatpage &&(
          <div className='pl-5'>
            <Link to= "/" className="flex items-center gap-2.5">
            <ShipWheelIcon className='size-9 text-primary'/>
            <span className='text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-300 tracking-wider'>
            ConnectKaro
            </span>
            </Link>

          </div>
        )}
        <div className='flex items-center gap-3 sm:gap-4'>
          <Link to={"/notifications"}>
            <button className='btn btn-ghost btn-circle'>
            <BellIcon className='size-6 text-base-content opacity-70'/>
            </button>
          </Link>
        </div>
        <Themeselector/>

        <div className='avatar mx-8 lg:mx-5'>
          <div className='w-9 rounded-full'>
          <img src={authUser?.profilePic} alt="user avatar" rel="referror" />
          </div>
        </div>

        <button className='btn btn-ghost btn-circle' onClick={logoutMutation}>
          <LogOutIcon className='size-6 text-base-content opacity-70'/>
        </button>

      </div>
      </div>

    </nav>
  )
}

export default Navbar