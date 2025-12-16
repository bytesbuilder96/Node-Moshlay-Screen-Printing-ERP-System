import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";

// ╔═════════════════════════════╗
// ║      Create New Agent       ║
// ╚═════════════════════════════╝
export const createAgent = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already in use",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const agent = await User.create({
      username,
      email,
      password: hashedPassword,
      role: "Agent",
    });

    res.status(201).json({
      success: true,
      message: "Agent created successfully",
      agent: {
        id: agent._id,
        username: agent.username,
        email: agent.email,
        role: agent.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ╔═════════════════════════════╗
// ║      Get  All Agents        ║
// ╚═════════════════════════════╝
export const getAllAgents = async (req, res) => {
  try {
    const agents = await User.find({ role: "agent" }).select("-password");
    res.status(200).json({
      success: true,
      agents,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ╔═════════════════════════════╗
// ║      Get Single Agent       ║
// ╚═════════════════════════════╝
export const getAgentById = async (req, res) => {
  try {
    const agent = await User.findById({
      _id: req.params.id,
      role: "agent",
    }).select("-password");
    if (!agent) {
      return res.status(404).json({
        success: false,
        message: "Agent not found",
      });
    }
    res.status(200).json({ success: true, agent });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ╔═════════════════════════════╗
// ║      Update Agent           ║
// ╚═════════════════════════════╝
export const updateAgentById = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const updateData = { username, email };

    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const agent = await User.findByIdAndUpdate(
      { _id: req.params.id, role: "agent" },
      updateData,
      { new: true }
    ).select("-password");

    if (!agent) {
      return res.status(404).json({
        success: false,
        message: "Agent not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Agent updated successfully",
      agent,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ╔═════════════════════════════╗
// ║      Delete Agent           ║
// ╚═════════════════════════════╝
export const deleteAgentById = async (req, res) => {
  try {
    const agent = await User.findByIdAndDelete({
      _id: req.params.id,
      role: "agent",
    });

    if (!agent) {
      return res.status(404).json({
        success: false,
        message: "Agent not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Agent deleted successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
