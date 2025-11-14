import React from 'react'
import { Routes, Route} from "react-router-dom";
import Home from '../UI/home/home';
import Signup from '../UI/Auth/signup/signup';
import ForgotPassword from '../UI/Auth/passwordManage/forgotPassword/forgot';
import VerifyOTP from '../UI/Auth/passwordManage/otp/otpverify';
import ResetPassword from '../UI/Auth/passwordManage/reset/resetpassword';
import { useAuth } from '../context/authcontext';
import MealPlanning from '../UI/meal/mealPlaining';
import MainMealSection from '../UI/meal/mainMealSection';
import WorkoutDetails from '../UI/workout/home/workoutdetails';
import WorkoutPlayer from '../UI/workout/home/workoutplayer';
import ProfilePage from '../UI/profile/profile';
import Pricing from '../UI/subscription/pricing';
import Caloricalculator from '../UI/meal/caloricalculator';
import PaymentForm from '../UI/payment/payment';
import Login from '../UI/Auth/logIn/login';
import Gym from '../UI/workout/gym/gymworkout';
import GymWorkoutDetails from '../UI/workout/gym/workdetails';
import Track from '../UI/tracking/track';
import TrackLogin from '../component/tracklogin';
import HomeWorkout from '../UI/workout/home/homeworkout';

const AllRoutes = () => {
  
   const{authUser}=useAuth()
  return (
    <Routes>
      <Route path="/" element={<Home/>} />  
      <Route path="/membership" element={<Pricing />} />  
      <Route path="/track" element={authUser?<Track />:<TrackLogin/>}/>
       <Route path='/login' element={<Login/>}/>   
       <Route path='/homeworkout' element={<HomeWorkout/>}/> 
       <Route path="/homeworkout/:id" element={<WorkoutDetails />} />
       <Route path='/start-workout' element={<WorkoutPlayer/>}/>
       <Route path='/gymworkout/:id' element={<GymWorkoutDetails/>}/>
       <Route path='/gymworkout' element={<Gym/>}/>
       <Route path='/mealplaining' element={<MealPlanning/>}></Route>
       <Route path='/calorie' element={<Caloricalculator/>}></Route>
       <Route path='/mealsection'  element={<MainMealSection/>}></Route>
       <Route path='/signup' element={<Signup/>}/>
       <Route path='/userprofile' element={<ProfilePage/>}></Route>
       <Route path='/forgotpassword' element={<ForgotPassword/>}></Route>
       <Route path='/verify-otp' element={<VerifyOTP/>}></Route>
       <Route path='/payment' element={<PaymentForm/>}></Route>
       

       <Route path='/reset-password' element={<ResetPassword/>}></Route>
    </Routes>
    
  )
}

export default AllRoutes
