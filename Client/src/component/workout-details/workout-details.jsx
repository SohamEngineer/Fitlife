import { useParams, useNavigate } from "react-router-dom"
import WorkoutHero from "./workout-hero"
import WorkoutStats from "./workout-stats"
import WorkoutSection from "./workout-section"
import WorkoutBenefits from "./workout-benefits"
import WorkoutActions from "./workout-actions"
import useWorkoutDetails from "./hooks/useWorkoutDetails"
import "./workoutdetails.css"
import { FaBolt, FaClock, FaDumbbell, FaFireAlt, FaListOl } from "react-icons/fa"

const parseExecution = (description = "") => {
  const setsMatch = description.match(/(\d+)\s*sets?/i)
  const repsMatch = description.match(/sets?\s*(?:of)?\s*([0-9]+(?:[-–][0-9]+)?)(?:\s*reps?)?/i)

  return {
    sets: setsMatch ? `${setsMatch[1]} sets` : "",
    reps: repsMatch ? `${repsMatch[1].replace("–", "-")} reps` : "",
  }
}

export default function WorkoutDetails({ source = "home" }) {
  const { id } = useParams()
  const navigate = useNavigate()

  const { workout, isLoading, error } = useWorkoutDetails(id, source)


  if (isLoading) return <p>Loading...</p>
  if (error) return <p>{error}</p>
  if (!workout) return null

  const parsed = parseExecution(workout.description)
  const stats = [
    { label: "Calories", value: workout.caloryburn ? `${workout.caloryburn} kcal` : "", icon: <FaFireAlt />, featured: true },
    { label: "Time", value: workout.duration ? `${workout.duration} min` : "30 sec round", icon: <FaClock /> },
    { label: "Difficulty", value: workout.difficulty || workout.type || "Fitlife", icon: <FaBolt /> },
    { label: "Sets", value: workout.sets ? `${workout.sets} sets` : parsed.sets, icon: <FaListOl /> },
    { label: "Reps", value: workout.reps || parsed.reps, icon: <FaDumbbell /> }
  ]

  const handleStartWorkout = () => {
    const workoutQueue = [workout]
    sessionStorage.setItem("fitlifeLastWorkoutQueue", JSON.stringify(workoutQueue))
    navigate("/start-workout", { state: { workouts: workoutQueue } })
  }

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
          onStart={handleStartWorkout}
        />
      </div>
    </div>
  )
}
