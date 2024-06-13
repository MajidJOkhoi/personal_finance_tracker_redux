import mongoose from "mongoose";

const FinancialRecordSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
    },
    description: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const FinancialRecordModel = mongoose.model("FinancialRecord", FinancialRecordSchema);
export default FinancialRecordModel;
