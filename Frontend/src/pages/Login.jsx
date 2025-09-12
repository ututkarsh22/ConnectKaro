import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { useState } from 'react'
import { axiosInstance } from '../lib/axios'
import toast from 'react-hot-toast'
import { ShipWheelIcon } from 'lucide-react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Login = () => {



  const navigate = useNavigate();

  
  const [loginData,setloginData] = useState(
   {
    email:"",
    password : ""
   }
  )

  const[errorMessage,seterrorMessage] = useState("");

  const queryClient = useQueryClient();


  const {mutate:loginMutation ,isPending,error } = useMutation({
    mutationFn: async ()=>{
      const res = await axiosInstance.post("/auth/login",loginData);
      return res.data;
    },

    onSuccess: () => {queryClient.invalidateQueries({queryKey:["authUser"]});
        toast.success("Logged in");

        
        setTimeout(() => {
          navigate("/");
          
        }, 3000);
  },

  });

  useEffect(() =>{
  
      if(error)
      {
      const message = error.response.data.message || "Login failed!";
      seterrorMessage(message);
  
      const timer = setTimeout(() => {
          seterrorMessage("");
        },5000);
      
  
      return () => clearInterval(timer);
      }
  
     
    },[error]);

  const handleLogin = (e)=>{
    e.preventDefault();
    loginMutation();
  }
  
  
  return (
    <div className='min-h-[100dvh] flex justify-center items-center p-4  sm:p-6 md:p-8' data-theme="haloween">
      <div className='border flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100  rounded-xl shadow-lg overflow-hidden'>
      <div className='w-full lg:w-1/2 p-4 sm:p-8 flex flex-col'>
      
      <div className='logo mb-4 flex items-center justify-start gap-3'>
            <ShipWheelIcon className=" size-9"/> {/*size - 9 means when w-9 h- 9 when w == h then use size */}
            <span className='font-bold font-mono text-3xl bg-clip-text text-transparent bg-gradient-to-tr from-primary to-secondary tracking-wider'>ConnectKaro</span>
        </div>
         { errorMessage && <div className={`alert bg-red-700 h-12 mb-2 p-2 text-center transition-opacity duration-500 ease-in-out rounded-xl text-white ${errorMessage !== "" ? "opacity-100" : "opacity-0"}
       `}>
        
          <span className='text-center text-xs md:text-lg font-semibold'>{errorMessage}</span>
        </div>
        }
      
        <div>

           <form onSubmit={handleLogin}>
            <div className='space-y-4'>
              <div className='flex flex-col gap-2'>
              <h2 className='text-xl font-semibold'>Log in to your account</h2>
              <p className='text-sm lg:text:md  opacity-70 text-orange-200'>Join ConnectKaro and start connecting with the World!</p>
            </div>
            <div className='space-y-4'>
            <div className='form-control w-full'>
              <label className='label'>
                <span className='label-text font-semibold'>Email</span>
              </label>
              <input type="email" 
              className='input input-bordered w-full'
              placeholder='Enter your email address'
              value = {loginData.email}
              onChange={(e) => setloginData({...loginData , email:e.target.value})}
              required
              />
            </div>


              <div className='form-control w-full'>
              <label className='label'>
                <span className='label-text font-semibold'>Password</span>
              </label>
              <input type="password" 
              placeholder='Enter your password'
              className='input input-bordered w-full'
              value = {loginData.password}
              onChange={(e) => setloginData({...loginData , password:e.target.value})}
              required
              />
            </div>
            </div>

              <button className='btn bg-orange-200 text-slate-700 hover:bg-orange-400 w-full text-lg font-mono' type='submit'>{isPending ? (
                <>
                <span className='loading loading-spinner loading-xs'></span>
                Logging...
                </>
              ) : "Log in"}</button>

               <div className='text-center mt-4'>
                              <p className='text-sm'>Don't have an account?{" "}
                                <Link to="/signup" className="text-orange-200 hover:underline">Sign Up</Link>
                              </p>
              
               </div>
            </div>

          </form>
        </div>
      </div>
        <div className='hidden bg-orange-900 lg:flex w-full lg:w-1/2 bg-primary/13 items-center justify-center  '>
        <div className='max-w-md p-8'>

          <div className='relative aspect-square max-w-sm mx-auto'>
            <img src="/Video call-pana.png" alt="ConnectKaro" />
          </div>

          <div className='text-center space-y-3 mt-6'>
            <h2 className='text-lg text-orange-200 '>Connect with people worldwide according to there language.</h2>
            <p className='opacity-70 text-orange-100 text-nowrap'>
              Chat,connect and learn something interesting together..
            </p>
          </div>
        </div>

        </div>
      </div>

    </div>
  )
}

export default Login