import { useParams, useNavigate } from "react-router-dom"
import WorkoutHero from "./workout-hero"
import WorkoutStats from "./workout-stats"
import WorkoutSection from "./workout-section"
import WorkoutBenefits from "./workout-benefits"
import WorkoutActions from "./workout-actions"
import useWorkoutDetails from "./hooks/useWorkoutDetails"
import "./workoutdetails.css"


export default function WorkoutDetails({ source = "home" }) {
  const { id } = useParams()
  const navigate = useNavigate()

  const { workout, isLoading, error } = useWorkoutDetails(id, source)


  if (isLoading) return <p>Loading...</p>
  if (error) return <p>{error}</p>
  if (!workout) return null

  const stats = [
    { label: "Calories", value: workout.caloryburn },
    { label: "Minutes", value: workout.duration },
    { label: "Difficulty", value: workout.difficulty },
    { label: "Sets", value: workout.sets },
    { label: "Reps", value: workout.reps }
  ]

  return (
    <div className="workout-details-container container">
      <WorkoutHero
        video={workout.videoBase64}
        title={workout.title}
        type={workout.type}
        onBack={() => navigate(-1)}
      />

      <div className="workout-content-wrapper">
        <WorkoutStats stats={stats} />

        <WorkoutSection title="Description">
          <p>{workout.description}</p>
        </WorkoutSection>

        <WorkoutSection title="How To Perform">
          <ol>
            {workout.instructions?.split("\n").map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ol>
        </WorkoutSection>

        <WorkoutSection title="Benefits">
          <WorkoutBenefits workout={workout} />
        </WorkoutSection>

        <WorkoutSection title="Pro Tips">
          <p>{workout.tips}</p>
        </WorkoutSection>

        <WorkoutActions
          onBack={() => navigate(-1)}
          onStart={() => console.log("Start workout flow")}
        />
      </div>
    </div>
  )
}
