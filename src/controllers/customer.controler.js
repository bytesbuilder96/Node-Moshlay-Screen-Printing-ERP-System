import { Customer } from "../models/customer.models.js";

// ╔═════════════════════════════╗
// ║     Create New Customer     ║
// ╚═════════════════════════════╝
export const createCustomer = async (req, res) => {
  try {
    const {
      agent,
      companyName,
      clintName,
      phone,
      email,
      repName,
      city,
      state,
      zipCode,
      address,
      str_apt_bild,
    } = req.body;

    if (
      !agent ||
      !companyName ||
      !clintName ||
      !phone ||
      !email ||
      !repName ||
      !city ||
      !state ||
      !zipCode ||
      !address ||
      !str_apt_bild
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const customer = await Customer.create({
      agent,
      companyName,
      clintName,
      phone,
      email,
      repName,
      city,
      state,
      zipCode,
      address,
      str_apt_bild,
    });

    res.status(201).json({
      success: true,
      message: "Customer added successfully",
      customer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ╔═══════════════════════════╗
// ║     Get All customers     ║
// ╚═══════════════════════════╝
export const getAllCustomer = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json({
      success: true,
      customers,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ╔════════════════════════╗
// ║     Get Customer By Id ║
// ╚════════════════════════╝
export const getCustomerById = async (req, res) => {
  try {
    const { id } = req.params;

    const customer = await Customer.findById(id);
    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      customer,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Invalid Customer ID",
    });
  }
};

// ╔═════════════════════════╗
// ║     Update Customer     ║
// ╚═════════════════════════╝
export const updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      agent,
      companyName,
      clintName,
      phone,
      email,
      repName,
      city,
      state,
      zipCode,
      address,
      str_apt_bild,
    } = req.body;
    const updatedData = {
      agent,
      companyName,
      clintName,
      phone,
      email,
      repName,
      city,
      state,
      zipCode,
      address,
      str_apt_bild,
    };
    const customer = await Customer.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "customer not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Customer Updated successfuly",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
