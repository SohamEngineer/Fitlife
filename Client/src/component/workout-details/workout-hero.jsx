import { Button } from "../common/button";

export default function WorkoutHero({ video, title, type, onBack }) {
  return (
    <section className="workout-hero">
      <div className="hero-video-wrapper">
        <video
          src={video}
          autoPlay
          loop
          muted
          playsInline
          className="hero-video"
        />
        <div className="video-gradient-overlay"></div>
      </div>

      <Button className="floating-back-btn" onClick={onBack}>
        ← Back
      </Button>

      <div className="hero-content">
        <div className="workout-category-badge">
          {type || "Workout"}
        </div>
        <h1 className="workout-hero-title">{title}</h1>
      </div>
    </section>
  )
}
