import { Button } from "../common/button";

export default function WorkoutActions({ onBack, onStart }) {
  return (
    <div className="workout-actions">
      <button className="action-btn secondary" onClick={onBack}>
        Back to List
      </button>
      <Button className="action-btn primary" onClick={onStart}>
        Start Workout
      </Button>
    </div>
  )
}
