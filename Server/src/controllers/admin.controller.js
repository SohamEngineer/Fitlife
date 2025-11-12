import AddHomeWorkout from "../models/HomeWorkout.js";
import AddGymWorkout from "../models/GymWorkout.js";


// ---------- Home Workouts ----------
export const deleteHomeWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await AddHomeWorkout.findByIdAndDelete(id);
    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Workout not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Home workout deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error deleting workout",
      error: error.message,
    });
  }
};

export const updateHomeWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, type, day, description, caloryburn } = req.body;

    const updatedFields = {};
    if (title !== undefined) updatedFields.title = title;
    if (type !== undefined) updatedFields.type = type;
    if (day !== undefined) updatedFields.day = day;
    if (description !== undefined) updatedFields.description = description;
    if (caloryburn !== undefined) updatedFields.caloryburn = caloryburn;
    if (req.file) updatedFields.video = req.file.filename; // store filename only

    const updated = await AddHomeWorkout.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });

    if (!updated) {
      return res
        .status(404)
        .json({ success: false, message: "Workout not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Workout updated", workout: updated });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error updating workout",
      error: error.message,
    });
  }
};

// ---------- Gym Workouts ----------
export const deleteGymWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await AddGymWorkout.findByIdAndDelete(id);
    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Workout not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Gym workout deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error deleting workout",
      error: error.message,
    });
  }
};

export const updateGymWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, type, day, description, caloryburn } = req.body;

    const updatedFields = {};
    if (title !== undefined) updatedFields.title = title;
    if (type !== undefined) updatedFields.type = type;
    if (day !== undefined) updatedFields.day = day;
    if (description !== undefined) updatedFields.description = description;
    if (caloryburn !== undefined) updatedFields.caloryburn = caloryburn;
    if (req.file) updatedFields.video = req.file.filename; // store filename only

    const updated = await AddGymWorkout.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });

    if (!updated) {
      return res
        .status(404)
        .json({ success: false, message: "Workout not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Workout updated", workout: updated });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error updating workout",
      error: error.message,
    });
  }
};
