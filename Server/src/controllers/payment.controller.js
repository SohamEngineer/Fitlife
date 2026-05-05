import NewUser from "../models/User.js";

export const activatePrime = async (req, res) => {
  try {
    const userId = req.body.userId || req.user?._id;

    if (String(userId) !== String(req.user?._id) && req.user?.role !== "admin") {
      return res.status(403).json({ message: "Cannot activate another user's premium plan" });
    }

    const user = await NewUser.findByIdAndUpdate(
      userId,
      { isPremium: true },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Premium activated successfully",
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
        isPremium: Boolean(user.isPremium),
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Payment activation failed",
    });
  }
};
