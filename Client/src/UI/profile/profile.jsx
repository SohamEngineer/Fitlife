import React from "react";
import "./profile.css";

const FitnessProfile = () => {
  const user = {
    name: "Soham Ata",
    age: 21,
    email: "soham@example.com",
    location: "Kolkata, India",
    avatar: "https://i.pravatar.cc/150?img=12",
    bio: "Fitness enthusiast, focused on strength training and healthy eating.",
    stats: {
      weight: "70 kg",
      height: "175 cm",
      bmi: "22.9",
      workouts: 145,
      caloriesBurned: "75,000 kcal",
    },
    goals: ["Build muscle", "Lose fat", "Run 5K under 25 min"],
  };

  return (
    <div className="fitness-profile">
      {/* Sidebar */}
      <aside className="sidebar">
        <img src={user.avatar} alt="Avatar" className="sidebar-avatar" />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <button className="sidebar-btn">Edit Profile</button>
        <button className="sidebar-btn">Logout</button>
      </aside>

      {/* Main Content */}
      <main className="profile-content">
        {/* Header */}
        <section className="profile-header">
          <h1>Welcome back, {user.name}! 🏋️</h1>
          <p>{user.bio}</p>
        </section>

        {/* Stats */}
        <section className="profile-stats">
          <div className="stat-card">
            <h3>{user.stats.weight}</h3>
            <p>Weight</p>
          </div>
          <div className="stat-card">
            <h3>{user.stats.height}</h3>
            <p>Height</p>
          </div>
          <div className="stat-card">
            <h3>{user.stats.bmi}</h3>
            <p>BMI</p>
          </div>
          <div className="stat-card">
            <h3>{user.stats.workouts}</h3>
            <p>Workouts Completed</p>
          </div>
          <div className="stat-card">
            <h3>{user.stats.caloriesBurned}</h3>
            <p>Calories Burned</p>
          </div>
        </section>

        {/* Goals */}
        <section className="profile-goals">
          <h2>Fitness Goals 🎯</h2>
          <ul>
            {user.goals.map((goal, index) => (
              <li key={index}>✅ {goal}</li>
            ))}
          </ul>
        </section>

        {/* Activity */}
        <section className="profile-activity">
          <h2>Recent Activity 📊</h2>
          <ul>
            <li>🏃 Ran 3 km - 200 kcal burned</li>
            <li>💪 Upper body workout - 350 kcal burned</li>
            <li>🚴 Cycling 10 km - 400 kcal burned</li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default FitnessProfile;
