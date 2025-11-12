import User from "../models/User.js";

export const getAllUsers = async (_req, res) => {
  try {
    // Exclude password for security
    const users = await User.find().select("-password");
    const totalUsers = await User.countDocuments();

    return res.status(200).json({
      success: true,
      totalUsers,
      users,
    });

  } catch (error) {
    console.error("Get All Users Error:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching users",
    });
  }
};
