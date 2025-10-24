import User from "../Models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password and create new user
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user to database
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    // JWT token generation
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7days",
    });

    return res.status(201).json(
        {
        message: "User registered successfully",
        user: { email: newUser.email, id: newUser._id },
        token,
      }
    );
  } catch (error) {
    res.status(500).json({ message: "Server error" });
    console.error(error);
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7days",
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
    console.error(error);
  }
};
