// routes/FinancialRecordRouter.js

import express from "express";
import {
  addFinancialRecord,
  getAllFinancialRecords,
  getFinancialRecordById,
  updateFinancialRecordById,
  deleteFinancialRecordById,
} from "../controllers/FinancialRecordController.js";

const router = express.Router();

// Add a new financial record
router.post("/addrecord", addFinancialRecord);

// Get all financial records
router.get("/records", getAllFinancialRecords);

// Get one financial record by ID
router.get("/records/:id", getFinancialRecordById);

// Update a financial record by ID
router.put("/records/:id", updateFinancialRecordById);

// Delete a financial record by ID
router.delete("/records/:id", deleteFinancialRecordById);

export default router;
