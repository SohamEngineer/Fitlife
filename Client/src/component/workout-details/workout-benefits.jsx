export default function WorkoutBenefits({ workout }) {
  return (
    <ul className="benefits-list">
      <li>Burns ~ {workout.caloryburn} calories</li>
      {workout.targetMuscles && (
        <li>Targets {workout.targetMuscles}</li>
      )}
      <li>Improves endurance</li>
      <li>
        {workout.equipment
          ? "Minimal equipment needed"
          : "No equipment required"}
      </li>
    </ul>
  )
}
