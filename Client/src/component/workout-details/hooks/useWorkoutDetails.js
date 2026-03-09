import { useEffect, useState } from "react"

export default function useWorkoutDetails(id, source = "home") {
  const [workout, setWorkout] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) return

    const loadWorkout = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const apiFunction =
          source === "gym"
            ? (await import("../../../api/gymworkout.api")).getGymWorkoutByIdApi
            : (await import("../../../api/homeworkout.api")).getHomeWorkoutByIdApi

        const data = await apiFunction(id)
        setWorkout(data)
      } catch (err) {
        console.error("Workout fetch failed:", err)
        setError("Failed to load workout.")
      } finally {
        setIsLoading(false)
      }
    }

    loadWorkout()
  }, [id, source])

  return { workout, isLoading, error }
}
