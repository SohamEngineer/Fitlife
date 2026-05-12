import "./style/profile.css";
import { useProfile } from "./hook/useProfile";
import { GoArrowLeft } from "react-icons/go";
import { Button } from "../../component/common/button";


const FitnessProfile = () => {
  const {
    user,
    form,
    formError,
    loading,
    error,
    editing,
    saving,
    handleNavigate,
    handlelogout,
    handleEdit,
    handleCancelEdit,
    handleEditChange,
    handleSaveProfile,
    navigate,
  } = useProfile();

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
          {user.avatarSrc ? (
            <img
              src={user.avatarSrc}
              alt="Avatar"
              className="sidebar-avatar"
            />
          ) : (
            <div className="sidebar-avatar avatar-fallback">
              {user.name?.charAt(0).toUpperCase() || "U"}
            </div>
          )}
          <div className="user_info">
          <h2 className="name">{user.name}</h2>
          <p>{user.email}</p>
          </div>
          </div>
        <div className="button-box">
   <Button className="sidebar-btn" onClick={handleEdit}>Edit Profile</Button> 
  <Button className="sidebar-btn logout" onClick={handlelogout}>Logout</Button> 
  </div>
        </aside>

        {editing && form && (
          <form className="profile-edit-panel" onSubmit={handleSaveProfile}>
            <div className="edit-panel-header">
              <div>
                <span>Fitlife profile editor</span>
                <h2>Update your visible fitness profile</h2>
              </div>
              <button type="button" onClick={() => navigate("/onboarding")}>
                Deep AI profile
              </button>
            </div>

            {formError && <p className="profile-edit-error">{formError}</p>}

            <div className="profile-edit-grid">
              <label>
                <span>Height (cm)</span>
                <input name="height" type="number" min="120" max="230" value={form.height} onChange={handleEditChange} />
              </label>
              <label>
                <span>Weight (kg)</span>
                <input name="weight" type="number" min="35" max="220" value={form.weight} onChange={handleEditChange} />
              </label>
              <label>
                <span>Body fat %</span>
                <input name="bodyFat" type="number" min="1" max="70" value={form.bodyFat} onChange={handleEditChange} placeholder="Optional" />
              </label>
              <label>
                <span>Primary goal</span>
                <select name="primaryGoal" value={form.primaryGoal} onChange={handleEditChange}>
                  <option value="weight_loss">Weight loss</option>
                  <option value="muscle_gain">Muscle gain</option>
                  <option value="maintain">Maintain</option>
                  <option value="strength">Strength</option>
                  <option value="endurance">Endurance</option>
                  <option value="rehab">Rehab and mobility</option>
                </select>
              </label>
              <label>
                <span>Intensity</span>
                <select name="intensity" value={form.intensity} onChange={handleEditChange}>
                  <option value="gentle">Gentle</option>
                  <option value="moderate">Moderate</option>
                  <option value="hard">Hard</option>
                </select>
              </label>
            </div>

            <div className="profile-edit-actions">
              <button type="button" onClick={handleCancelEdit}>Cancel</button>
              <button type="submit" disabled={saving}>{saving ? "Saving..." : "Save changes"}</button>
            </div>
          </form>
        )}

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
            <h3>{user.bodyFatLabel}</h3>
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
