import React, { useEffect, useState } from 'react'
import {ShipWheelIcon} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '../lib/axios.js';
import { toast } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';


const Signup = () => {

  const navigate = useNavigate();

  const [errorMessage,seterrorMessage] = useState("");
  
  const [signupData, setSignupData] = useState(
    {
      fullname : "",
      email : "",
      password: "",
    }
  );

  const queryClient = useQueryClient();

  const {mutate:loginMutation,isPending,error} = useMutation({
    mutationFn: async () =>{

        const response = await axiosInstance.post("auth/signup",signupData);
        return response.data;

    },
    onSuccess: () => {queryClient.invalidateQueries({queryKey:["authUser"]});
        toast.success("Account created successfully");
        
        setTimeout(() => {
          navigate("/onboarding");
          
        }, 2000);
  },
    
  });

  useEffect(() =>{

    if(error)
    {
    const message = error.response.data.message || "Sign Up failed!";
    seterrorMessage(message);

    const timer = setTimeout(() => {
        seterrorMessage("");
      },5000);
    

    return () => clearInterval(timer);
    }

   
  },[error]);

  const handleSignup = (e) =>{
    e.preventDefault();
    loginMutation();

  }
  return (
    <div className='min-h-[100dvh] flex justify-center items-center p-4  sm:p-6 md:p-8' data-theme="haloween">
      <div className=" border flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100  rounded-xl shadow-lg overflow-hidden">

        <div className='w-full lg:w-1/2 p-4 sm:p-8 flex flex-col'>

        <div className='logo mb-4 flex items-center justify-start gap-3'>
            <ShipWheelIcon className=" size-9"/> {/*size - 9 means when w-9 h- 9 when w == h then use size */}
            <span className='font-bold font-mono text-3xl bg-clip-text text-transparent bg-gradient-to-tr from-primary to-secondary tracking-wider'>ConnectKaro</span>
        </div>

       { errorMessage && <div className={`bg-red-700 h-12 mb-2 p-2 text-center transition-opacity duration-500 ease-in-out rounded-xl text-white ${errorMessage !== "" ? "opacity-100" : "opacity-0"}
       `}>
        
          <span className='text-center text-xs md:text-lg font-semibold'>{errorMessage}</span>
        </div>
        }
        <div className='w-full'>
          <form onSubmit={handleSignup}>
            <div className='space-y-4'>
              <div className='flex flex-col gap-2'>
              <h2 className='text-xl font-semibold'>Create An Account</h2>
              <p className='text-sm lg:text:md  opacity-70 text-orange-200'>Join ConnectKaro and start connecting with the World!</p>
            </div>
            <div className='space-y-4'>
            <div className='form-control w-full'>
              <label className='label'>
                <span className='label-text font-semibold'>Full Name</span>
              </label>
              <input type="text" 
              placeholder='Enter your full name'
              className='input input-bordered w-full'
              value = {signupData.fullname}
              onChange={(e) => setSignupData({...signupData , fullname:e.target.value})}
              required
              />
            </div>

              <div className='form-control w-full'>
              <label className='label'>
                <span className='label-text font-semibold'>Email</span>
              </label>
              <input type="email" 
              placeholder='Enter your email address e.g name@email.com'
              className='input input-bordered w-full'
              value = {signupData.email}
              onChange={(e) => setSignupData({...signupData , email:e.target.value})}
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
              value = {signupData.password}
              onChange={(e) => setSignupData({...signupData , password:e.target.value})}
              required
              />
              <p  className='mx-1 text-nowrap text-sm mt-1 text-md opacity-70 text-orange-200'>password must be atleast 6 characters</p>
            </div>
             <div className='form-control w-full'>
              <label className='cursor-pointer justify-start gap-2 label'>
                <input type="checkbox" className='checkbox checkbox-sm' required />
                <span className='text-xs leading-tight'>I agree to {""}
                  <span className='text-orange-200 hover:underline'>terms of service </span>and {""}
                  <span className='text-orange-200 hover:underline'>privacy policy.</span>
                </span>
              </label> 
            </div>
            </div>

              <button className='btn bg-orange-200 text-slate-700 hover:bg-orange-400 w-full text-lg font-mono' type='submit'>{isPending ? (
                <>
                <span className='loading loading-spinner loading-xs'></span>
                Signing Up...
                </>
              ) : "Create an Account"}</button>

              <div className='text-center mt-4'>
                <p className='text-sm'>Already have an account?{" "}
                  <Link to="/login" className="text-orange-200 hover:underline">Log In</Link>
                </p>

              </div>
            </div>

          </form>
        </div>
        </div>

        <div className='hidden lg:flex w-full lg:w-1/2 bg-primary/13 items-center justify-center  '>
        <div className='max-w-md p-8'>

          <div className='relative aspect-square max-w-sm mx-auto'>
            <img src="/Video call-pana.png" alt="ConnectKaro" />
          </div>

          <div className='text-center space-y-3 mt-6'>
            <h2 className='text-lg text-orange-300 '>Connect with people worldwide according to there language.</h2>
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

export default Signup