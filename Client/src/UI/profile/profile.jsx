import "./style/profile.css";
import { useProfile } from "./hook/useProfile";
import { assets } from "../../assets/img/assets";
import { GoArrowLeft } from "react-icons/go";
import { Button } from "../../component/common/button";


const FitnessProfile = () => {
  const { user, loading, error, handleNavigate, handlelogout } = useProfile();

  if (loading) {
    return <div className="loading">Loading profile...</div>;
  }

  if (error || !user) {
    return <div className="error">Failed to load profile.</div>;
  }

  // ✅ SAFE to use user now
  return (
    <div className="container">

      <button className="back">
        <GoArrowLeft onClick={handleNavigate} />
      </button>

      <main className="profile-content">
        <section className="profile-header">
          <h1>Welcome back, {user.name}! 🏋️</h1>
          <p>Fitness level: {user.fitnessLevel}</p>
        </section>
        <aside className="sidebar">
          <div className="profile_box">
          <img
            src={assets.soham}
            alt="Avatar"
            className="sidebar-avatar"
          />
          <div className="user_info">
          <h2 className="name">{user.name}</h2>
          <p>{user.email}</p>
          </div>
          </div>
        <div className="button-box">
   <Button className="sidebar-btn">Edit Profile</Button> 
  <Button className="sidebar-btn logout" onClick={handlelogout}>Logout</Button> 
  </div>
        </aside>

        <section className="profile-stats">
          <div className="stat-card">
            <h3>{user.weight}</h3>
            <p>Weight (kg)</p>
          </div>

          <div className="stat-card">
            <h3>{user.height}</h3>
            <p>Height (cm)</p>
          </div>

          <div className="stat-card">
            <h3>{user.bodyFat}%</h3>
            <p>Body Fat</p>
          </div>

          <div className="stat-card">
            <h3>{user.goal}</h3>
            <p>Goal</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default FitnessProfile;
