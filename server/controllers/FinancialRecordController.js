// controllers/FinancialRecordController.js

import FinancialRecordModel from "../models/Financial_Record.js";

export const addFinancialRecord = async (req, res) => {
  try {
    const { userId, date, description, amount, category, paymentMethod } = req.body;

    if (!userId || !description || !amount || !category || !paymentMethod) {
      return res.status(400).send({
        message: "Send all required fields: userId, date, description, amount, category, paymentMethod",
      });
    }

    const newRecord = { userId, date, description, amount, category, paymentMethod };
    const record = await FinancialRecordModel.create(newRecord);

    res.status(201).send(record);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
};

export const getAllFinancialRecords = async (req, res) => {
  try {
    const records = await FinancialRecordModel.find();
    res.status(200).send({
      count: records.length,
      data: records,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
};

export const getFinancialRecordById = async (req, res) => {
  try {
    let { id } = req.params;
    const record = await FinancialRecordModel.findById(id);
    if (!record) {
      return res.status(404).send({ message: "Record not found" });
    }
    res.status(200).send(record);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
};

export const updateFinancialRecordById = async (req, res) => {
  const { id } = req.params;
  const { userId, date, description, amount, category, paymentMethod } = req.body;

  try {
    const updatedRecord = await FinancialRecordModel.findByIdAndUpdate(
      id,
      { userId, date, description, amount, category, paymentMethod },
      { new: true }
    );

    if (!updatedRecord) {
      return res.status(404).json({ message: "Financial record not found" });
    }

    return res.status(200).json({
      message: "Record updated successfully",
      data: updatedRecord,
    });
  } catch (error) {
    console.error("Error updating financial record:", error);
    return res.status(400).json({ message: "Error updating financial record" });
  }
}

export const deleteFinancialRecordById = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedRecord = await FinancialRecordModel.findByIdAndDelete(id);

    if (!deletedRecord) {
      return res.status(404).json({ message: "Record not found" });
    }

    return res.status(200).json({ message: "Record deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
};
