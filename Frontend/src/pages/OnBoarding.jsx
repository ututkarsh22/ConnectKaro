import React, { useState } from 'react'
import useAuthUser from '../hooks/useAuthUser';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '../lib/axios';
import toast, { LoaderIcon } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { CameraIcon, GlobeIcon,MapIcon, ShuffleIcon } from 'lucide-react';
import { LANGUAGES } from '../constants/allthings';

const OnBoarding = () => {

  const navigate = useNavigate();
 
  const queryClient = useQueryClient();
 const {authUser} = useAuthUser();
 const [formState , setFormState] = useState(
  {
    fullname: authUser?.fullname || " ",
    bio: authUser?.bio || " ",
    nativeLanguage: authUser?.nativeLanguage || " ",
    learningLanguage: authUser?.learningLanguage || " ",
    location: authUser?.location || " ",
    profilePic: authUser?.profilePic || " ",

  }
 );

 const {mutate : onBoarding, isPending} = useMutation({
  mutationFn: async()=>{

    const res = await axiosInstance.post("/auth/onboarding",formState);
    return res.data;
  },
  onSuccess: () =>{queryClient.invalidateQueries({queryKey:["authUser"]});
        toast.success("Onboarding successful");
        
        setTimeout(() => {
          navigate("/");
          
        }, 2000);
  },

  onError: (error) => {
  console.error("Onboarding failed:", error);
  toast.error("Failed to onboard. Check console.");

  },
 });

 const handleOnboarding = (e)=>{
  e.preventDefault();
  onBoarding();
 }

 const handleAvatarRandom = () =>{
  const indx = Math.floor(Math.random() * 100) + 1;
  const randomAvatar = `https://avatar.iran.liara.run/public/${indx}`;
  

  setFormState({...formState, profilePic : randomAvatar});
  toast.success("Random profile pic generated");

 }

 
  return (
    <div className='min-h-[100dvh] flex justify-center items-center p-4  sm:p-6 md:p-8' data-theme="haloween">
      <div className=' card bg-base-200 w-full max-w-3xl shadow-xl'>
        <div className='card-body p-6 sm:p-8'>
        <h1 className='text-2xl sm:text-3xl font-bold text-center mb-6'>Complete Your Profile</h1>
        
        <form onSubmit={handleOnboarding} className='space-y-6 '>
          <div className='space-y-4 flex flex-col items-center justify-center'>
        <div className='size-32 rounded-full overflow-hidden bg-base-300'>
            {formState.profilePic ? (
              <img src = {formState.profilePic} alt="profile preview" className='w-full h-full object-cover'/>
            ):
            (
              <div className='flex items-center justify-center h-full'>
                <CameraIcon className='size-12 opacity-40 text-base-content'/>

              </div>)}

          </div>
            
            <div className='flex items-center gap-2 '>
              <button type="button" onClick={handleAvatarRandom} className='btn btn-accent rounded-xl'>
                <ShuffleIcon className='size-4 mr-3'/>
                Generate Random Avatar 
              </button>
            </div>
            </div>

            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Full name</span>
              </label>
              <input 
              type="text"
              name ="fullname"
              value = {formState.fullname}
              onChange={(e) => setFormState({...formState , fullname:e.target.value})}
              className='input input-bodered w-full'
              placeholder='Your full name'              
              />     
            </div>

              <div className='form-control'>
              <label className='label'>
                <span className='label-textarea'>Bio</span>
              </label>
              <textarea
              name ="bio"
              value = {formState.bio}
              onChange={(e) => setFormState({...formState , bio:e.target.value})}
              className='input input-bodered w-full pt-2'
              placeholder='write about yourself'              
              /> 
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>

             <div className='form-control'>
          <label className='label'>
         <span className='label-text'>Native Language</span>
          </label>
          <select
            name="nativelanguage"
            value={formState.nativeLanguage}
            onChange={(e) =>
              setFormState({ ...formState, nativeLanguage: e.target.value })
            }
            className='input input-bordered w-full'
          >
            <option value="">Select your Native Language</option>
            {LANGUAGES.map((lang) => (
              <option key={`native-${lang}`} value={lang.toLowerCase()}>
                {lang}
              </option>
            ))}
             </select>
             </div>


             <div className='form-control'>
          <label className='label'>
         <span className='label-text'>Learning Language</span>
          </label>
          <select
            name="learninglanguage"
            value={formState.learningLanguage}
            onChange={(e) =>
              setFormState({ ...formState, learningLanguage: e.target.value })
            }
            className='input input-bordered w-full'
          >
            <option value="">Select your Learning Language</option>
            {LANGUAGES.map((lang) => (
              <option key={`learning-${lang}`} value={lang.toLowerCase()}>
                {lang}
              </option>
            ))}
             </select>
             </div>
            </div>

              <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Location</span>
              </label>
              <div className='relative'>
                <MapIcon className='absolute top-1/2 transform -translate-y-1/2 left-3 size-5 text-base-content opacity-70'/>
              <input 
              type="text"
              name ="location"
              value = {formState.location}
              onChange={(e) => setFormState({...formState , location:e.target.value})}
              className='input input-bodered w-full pl-10'
              placeholder='Enter your location'              
              />     
              </div>
            </div>
            
        <button className='btn btn-primary mt-6 w-full' disabled={isPending} type='submit'>
        {!isPending ?(
            <>
            <GlobeIcon className='size-5'/>
            Complete your onboarding
            </>
        ):(
          <>
          <LoaderIcon className='spinner animate-spin size-5'/>
          Onboarding...
          </>
        )}
        </button>
        </form>


        </div>
      
      </div>

    </div>
  )
}

export default OnBoarding