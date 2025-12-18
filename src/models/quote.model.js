import mongoose from "mongoose";

const dimensionSchema = new mongoose.Schema({
  length: { type: Number },
  width: { type: Number },
  height: { type: Number },
  unit: {
    type: String,
    enum: ["inch", "mm"],
    default: "inch",
  },
});

const tierSchema = new mongoose.Schema({
  quantity: { type: Number },
  price: { type: Number },
});

const productSchema = new mongoose.Schema({
  productType: {
    type: String,
    enum: ["Boxes", "Mylar Bags", "Stickers", "Others"],
    required: true,
  },

  jobName: { type: String, required: true },

  numberOfSkus: { type: Number },

  turnaroundTime: { type: String },

  dimensions: dimensionSchema,

  style: { type: String },

  material: { type: String },

  finishes: [{ type: String }],

  extraFinishes: [{ type: String }],

  tiers: {
    tier1: tierSchema,
    tier2: tierSchema,
    tier3: tierSchema,
  },
});

const quoteSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },

    queryNo: { type: String, unique: true },

    date: { type: Date, default: Date.now },

    salesRepresentative: { type: String },

    designingFee: {
      type: String,
      enum: ["Free Designing", "Paid Designing"],
      default: "Free Designing",
    },

    shippingCost: {
      type: String,
      enum: ["Free Shipping by Air", "Paid Shipping"],
    },

    products: [productSchema],

    grandTotal: { type: Number },

    status: {
      type: String,
      enum: ["Draft", "Sent", "Approved", "Rejected"],
      default: "Draft",
    },
  },
  { timestamps: true }
);

export const Quote = mongoose.model("Quote", quoteSchema);
