import React from 'react'
import { Routes, Route } from "react-router-dom";
import { useAuth } from '../context/authcontext';

// Route guards
import ProtectedRoute from './protectedroute';
import GuestRoute from './guestroute';

// Layouts
import AuthLayout from '../layout/authlayout';

// Pages
import Home from '../UI/home/home';
import Signup from '../UI/Auth/Signup/signup';
import ForgotPassword from '../UI/Auth/passwordManage/forgotPassword/forgot';
import VerifyOTP from '../UI/Auth/passwordManage/otp/otpverify';
import ResetPassword from '../UI/Auth/passwordManage/reset/resetPassword';
import MealPlanning from '../UI/meal/mealPlaining';
import MainMealSection from '../UI/meal/mainMealSection';
import ProfilePage from '../UI/profile/profile';
import Pricing from '../UI/subscription/pricing';
import PaymentForm from '../UI/payment/payment';
import Login from '../UI/Auth/LogIn/Login';
import Gym from '../UI/workout/gym/gymworkout';
import GymWorkoutDetails from '../UI/workout/gym/workdetails';
import Track from '../UI/tracking/track';
import TrackLogin from '../component/tracklogin';
import HomeWorkout from '../UI/workout/home/homeworkout';
import CalorieCalculator from '../UI/meal/caloricalculator';
import About from '../UI/about/about';
import WorkoutDetails from '../component/workout-details/workout-details';
import WorkoutPlayer from '../component/workout-player/workoutplayer';
import WithFooterLayout from '../layout/with-footerLayout';
import WithoutFooterLayout from '../layout/without-footerLayout';
import PaymentSuccess from '../UI/subscription/success';
import Onboarding from '../UI/onboarding/onboarding';
import Dashboard from '../UI/dashboard/dashboard';
// import WorkoutDetails from '../component/workoutdetails';
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
 <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } />
        {/* Public Auth pages (no need to block) */}
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
      </Route>


      {/*
        MAIN LAYOUT
        - Shows Navbar + Footer
        - All pages inside this require login
      */}
      <Route element={<WithFooterLayout />}>

        {/*
          HOME PAGE (Protected)
          - If NOT logged in → redirect to login
        */}
        <Route 
          path="/onboarding"
          element={
            <ProtectedRoute>
              <Onboarding />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

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

       

        {/* Profile + Payment */}
        {/* <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } 
        /> */}

        <Route 
          path="/payment" 
          element={
            <ProtectedRoute>
              <PaymentForm />
            </ProtectedRoute>
          } 
        />

      </Route>

            <Route element={<WithoutFooterLayout />}>

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
        </Route>

    </Routes>
  );
};

export default AllRoutes;
