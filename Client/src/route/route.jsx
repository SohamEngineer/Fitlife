import React from 'react'
import { Routes, Route} from "react-router-dom";
import Home from '../UI/home';
import Signup from '../UI/Auth/Signup/signup';
import ForgotPassword from '../UI/Auth/passwordManage/forgotPassword/forgot';
import VerifyOTP from '../UI/Auth/passwordManage/otp/verifyOtp';
import ResetPassword from '../UI/Auth/passwordManage/reset/resetPassword';
import TrackLogin from '../UI/tracklogin';
import Track from '../UI/track';
import { useAuth } from '../utils/AuthContext';
import MealPlanning from '../UI/mealSection/mealPlaining';
import MainMealSection from '../UI/mealSection/mainMealSection';
import WorkoutDetails from '../UI/workout/homeworkout/homeworkoutDetails';
import GymWorkoutDetails from '../UI/workout/gymworkout/gymworkDetails';
import WorkoutPlayer from '../UI/workout/homeworkout/homeworkoutPlayer';
import ProfilePage from '../UI/profile/profile';
import HomeWorkout from '../UI/workout/homeworkout/homeworkout';
import Gym from '../UI/workout/gymworkout/gymworkDetails';
import Login from '../UI/Auth/LogIn/Login';
import Pricing from '../UI/subscription/pricing';
import Caloricalculator from '../UI/mealSection/caloricalculator';

const AllRoutes = () => {
  
   const{authUser}=useAuth()
  return (
    <Routes>
      <Route path="/" element={<Home/>} />  
      <Route path="/membership" element={<Pricing />} />  
      <Route path="/track" element={authUser?<Track />:<TrackLogin/>} 
       />
       
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

       <Route path='/reset-password' element={<ResetPassword/>}></Route>
    </Routes>
    
  )
}

export default AllRoutes
