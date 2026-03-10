import NewUser from "../models/User.js";

export const activatePrime = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await NewUser.findByIdAndUpdate(
      userId,
      { isPrime: true },
      { new: true }
    );

    res.status(200).json({
      message: "Premium activated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Payment activation failed",
    });
  }
};