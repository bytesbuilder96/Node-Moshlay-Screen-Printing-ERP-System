import { User } from "../models/user.model.js";

export const createDefaultAdmin = async () => {
  try {
    const fullName = process.env.ADMIN_FULL_NAME;
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    if (!fullName || !email || !password) {
      throw new Error(
        "Admin credentials are not defined in environment variables."
      );
    }

    const existingAdmin = await User.findOne({ email, role: "Admin" });
    if (existingAdmin) {
      console.log("Admin already Exists");
      return;
    }

    await User.create({
      name: fullName,
      email,
      password,
      role: "Admin",
    });
    console.log("Default admin user created successfully");
  } catch (error) {
    console.log("Error Creating default admin: ", error);
    throw error;
  }
};
