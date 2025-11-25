import React from 'react'
import { Routes, Route } from "react-router-dom";
import { useAuth } from '../context/authcontext';

// Route guards
import ProtectedRoute from './protectedroute';
import GuestRoute from './guestroute';

// Layouts
import AuthLayout from '../layout/authlayout';
import MainLayout from '../layout/mainlayout';

// Pages
import Home from '../UI/home/home';
import Signup from '../UI/Auth/signup/signup';
import ForgotPassword from '../UI/Auth/passwordManage/forgotPassword/forgot';
import VerifyOTP from '../UI/Auth/passwordManage/otp/otpverify';
import ResetPassword from '../UI/Auth/passwordManage/reset/resetpassword';
import MealPlanning from '../UI/meal/mealPlaining';
import MainMealSection from '../UI/meal/mainMealSection';
import WorkoutDetails from '../UI/workout/home/workoutdetails';
import WorkoutPlayer from '../UI/workout/home/workoutplayer';
import ProfilePage from '../UI/profile/profile';
import Pricing from '../UI/subscription/pricing';
import PaymentForm from '../UI/payment/payment';
import Login from '../UI/Auth/logIn/login';
import Gym from '../UI/workout/gym/gymworkout';
import GymWorkoutDetails from '../UI/workout/gym/workdetails';
import Track from '../UI/tracking/track';
import TrackLogin from '../component/tracklogin';
import HomeWorkout from '../UI/workout/home/homeworkout';
import CalorieCalculator from '../UI/meal/caloricalculator';
import About from '../UI/about/about';
const AllRoutes = () => {
  const { authUser } = useAuth();

  return (
    <Routes>

      {/*
        AUTH LAYOUT
        - No Navbar
        - No Footer
        - For Login/Signup/Forgot Password
      */}
      <Route element={<AuthLayout />}>

        {/*
          LOGIN PAGE (Guest Only)
          - If user is logged in → redirect to /home
        */}
        <Route 
          path="/" 
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          } 
        />

        {/*
          SIGNUP PAGE (Guest Only)
          - Block logged-in users
        */}
        <Route 
          path="/signup" 
          element={
            <GuestRoute>
              <Signup />
            </GuestRoute>
          } 
        />

        {/* Public Auth pages (no need to block) */}
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Route>


      {/*
        MAIN LAYOUT
        - Shows Navbar + Footer
        - All pages inside this require login
      */}
      <Route element={<MainLayout />}>

        {/*
          HOME PAGE (Protected)
          - If NOT logged in → redirect to login
        */}
        <Route 
          path="/home" 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/about" 
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/membership" 
          element={
            <ProtectedRoute>
              <Pricing />
            </ProtectedRoute>
          } 
        />

        {/*
          TRACK PAGE
          - If logged in → show Track
          - If NOT → show TrackLogin
        */}
        <Route 
          path="/track" 
          element={
            <ProtectedRoute>
              {authUser ? <Track /> : <TrackLogin />}
            </ProtectedRoute>
          } 
        />

        {/* Workout Routes */}
        <Route 
          path="/homeworkout" 
          element={
            <ProtectedRoute>
              <HomeWorkout />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/homeworkout/:id" 
          element={
            <ProtectedRoute>
              <WorkoutDetails />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/start-workout" 
          element={
            <ProtectedRoute>
              <WorkoutPlayer />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/gymworkout" 
          element={
            <ProtectedRoute>
              <Gym />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/gymworkout/:id" 
          element={
            <ProtectedRoute>
              <GymWorkoutDetails />
            </ProtectedRoute>
          } 
        />

        {/* Meal Pages */}
        <Route 
          path="/mealplaining" 
          element={
            <ProtectedRoute>
              <MealPlanning />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/calorie" 
          element={
            <ProtectedRoute>
              <CalorieCalculator />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/mealsection" 
          element={
            <ProtectedRoute>
              <MainMealSection />
            </ProtectedRoute>
          } 
        />

        {/* Profile + Payment */}
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/payment" 
          element={
            <ProtectedRoute>
              <PaymentForm />
            </ProtectedRoute>
          } 
        />

      </Route>

    </Routes>
  );
};

export default AllRoutes;
