import React from 'react'
import { Routes,Route, Navigate } from 'react-router-dom'
import Homepage from './pages/Homepage.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import OnBoarding from './pages/OnBoarding.jsx'
import Notifications from './pages/Notifications.jsx'
import ChatPage from './pages/ChatPage.jsx'
import CallPage from './pages/CallPage.jsx'
import { Toaster } from 'react-hot-toast'
import PageLoader  from './components/PageLoader.jsx'
import useAuthUser from './hooks/useAuthUser.js'
import Layout from './components/Layout.jsx'
import useThemeStore from './store/useThemeStore.js'

//use axios so you cannot covert it to .json it automatically done
const App = () => {

const {theme} = useThemeStore();
const {isLoading,authUser} = useAuthUser();
const isAuthenticated = Boolean(authUser);
const isOnBoarded = authUser?.isOnBoarded;


if(isLoading) return <PageLoader/>;


  return (
    <div className=' h-screen' data-theme = {theme}>
    <Routes>
      <Route path='/' element= {isAuthenticated && isOnBoarded ? (
        <Layout showSidebar={true}>
        <Homepage/>
        </Layout>
        ) 
        : (<Navigate to ={!isAuthenticated ? "/login" : "/onboarding"}/>)}/>
      <Route path='/login' element = {!isAuthenticated ? <Login/> : <Navigate to ={isOnBoarded ? "/":"/onboarding"}/>}/>
      <Route path='/signup' element = {!isAuthenticated ? <Signup/> : <Navigate to = "/onboarding"/>}/>
      <Route path='/onBoarding' element = {<OnBoarding/>}/>
      <Route path='/notifications' element = {isAuthenticated ? <Notifications/> : <Navigate to ="/login"/>}/>
      <Route path='/chat' element = {isAuthenticated ? <ChatPage/>: <Navigate to ="/login"/>}/>
      <Route path='/call' element = {isAuthenticated ? <CallPage/>: <Navigate to ="/login"/>}/>
    </Routes>
    <Toaster/>
    </div>
  )
}

export default App