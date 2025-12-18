import { Quote } from "../models/quote.model.js";
import { Customer } from "../models/customer.models.js";

export const createQuote = async (req, res) => {
  try {
    const {
      customer,
      queryNo,
      salesRepresentative,
      designingFee,
      shippingCost,
      products,
      grandTotal,
    } = req.body;

    if (!customer || !products || products.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Customer and at least one product is required",
      });
    }

    const quote = await Quote.create({
      customer,
      queryNo,
      salesRepresentative,
      designingFee,
      shippingCost,
      products,
      grandTotal,
    });

    return res.status(201).json({
      success: true,
      message: "Quote created successfully",
      data: quote,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllQuotes = async (req, res) => {
  try {
    const quotes = await Quote.find()
      .populate("customer")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: quotes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getQuoteById = async (req, res) => {
  try {
    const { id } = req.params;

    const quote = await Quote.findById(id).populate("customer");

    if (!quote) {
      return res.status(404).json({
        success: false,
        message: "Quote not found",
      });
    }

    res.status(200).json({
      success: true,
      data: quote,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateQuote = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedQuote = await Quote.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedQuote) {
      return res.status(404).json({
        success: false,
        message: "Quote not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Quote updated successfully",
      data: updatedQuote,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const deleteQuote = async (req, res) => {
  try {
    const { id } = req.params;

    const quote = await Quote.findByIdAndDelete(id);

    if (!quote) {
      return res.status(404).json({
        success: false,
        message: "Quote not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Quote deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// export const printQuote = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const quote = await Quote.findById(id).populate("customer");

//     if (!quote) {
//       return res.status(404).send("Quote not found");
//     }

//     res.render("quote-print", { quote });
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// };

export const printQuote = async (req, res) => {
  const quote = await Quote.findById(req.params.id).populate("customer");

  if (!quote) return res.send("Quote not found");

  res.send(`
    <html>
      <head><title>Quote</title></head>
      <body>
        <h2>Quote ${quote.queryNo}</h2>
        <p>Query No: ${quote.queryNo}</p>
        <p>CCustomer: ${quote.customer.companyName}</p>
        <p>Designing Fee: ${quote.designingFee}</p>
        <p>Shiping Cost: ${quote.shippingCost}</p>
        <p>Total: ${quote.grandTotal}</p>
        <button onclick="window.print()">Print</button>
      </body>
    </html>
  `);
};
