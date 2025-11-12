import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/sendEmail.js";

let otpStore = {};

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user)
      return res.status(404).json({ message: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[email] = otp;

    await sendEmail(email, "Password Reset OTP", `Your OTP is: ${otp}`);

    return res.json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Send OTP Error:", error);
    return res.status(500).json({ message: "Error sending OTP" });
  }
};

export const verifyOtp = (req, res) => {
  const { email, otp } = req.body;

  if (otpStore[email] === otp) {
    const token = jwt.sign({ email }, process.env.RESET_SECRET, { expiresIn: "10m" });
    delete otpStore[email];
    return res.json({ message: "OTP verified", token });
  }

  return res.status(400).json({ message: "Invalid OTP" });
};

export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const decoded = jwt.verify(token, process.env.RESET_SECRET);

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.findOneAndUpdate(
      { email: decoded.email },
      { password: hashedPassword }
    );

    return res.json({ message: "Password reset successfully" });
  } catch (err) {
    console.error("Reset Password Error:", err);
    return res.status(400).json({ message: "Invalid or expired token" });
  }
};
