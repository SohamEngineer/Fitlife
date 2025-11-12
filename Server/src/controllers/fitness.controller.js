import FitnessTrack from "../models/FitnessTrack.js";

// ----------------------
// Get Fitness Data by User
// ----------------------
export const getFitnessData = async (req, res) => {
  try {
    const { userId } = req.params;

    const records = await FitnessTrack.find({ userId }).sort({ date: -1 });

    return res.status(200).json(records);

  } catch (error) {
    console.error("Get Fitness Data Error:", error);
    return res.status(500).json({ message: "Failed to fetch fitness data" });
  }
};

// ----------------------
// Add Fitness Data
// ----------------------
export const addFitnessData = async (req, res) => {
  try {
    const { userId, ...rest } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const entry = new FitnessTrack({ userId, ...rest });
    await entry.save();

    return res.status(201).json({ message: "Data saved successfully" });

  } catch (error) {
    console.error("Add Fitness Data Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
