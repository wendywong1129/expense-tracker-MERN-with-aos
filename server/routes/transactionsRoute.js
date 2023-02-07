const express = require("express");
const Transaction = require("../models/Transaction");
const moment = require("moment");

const router = express.Router();

router.post("/add-transaction", async (req, res) => {
  try {
    const newTransaction = new Transaction(req.body);
    await newTransaction.save();
    res.send("Transaction is added successfully!");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/get-all-transactions", async (req, res) => {
  const { userId, frequency, selectedRange, type } = req.body;
  
  try {
    const transactions = await Transaction.find({
      userId,
      ...(frequency !== "custom"
        ? { date: { $gt: moment().subtract(Number(frequency), "d").toDate() } }
        : {
            date: {
              $gte: selectedRange[0],
              $lte: selectedRange[1],
            },
          }),
      ...(type !== "all" && { type }),
    });
    res.send(transactions);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/edit-transaction", async function (req, res) {
  try {
    await Transaction.findOneAndUpdate(
      { _id: req.body.transactionId },
      req.body.payload
    );
    res.send("Transaction is updated successfully!");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/delete-transaction", async function (req, res) {
  try {
    await Transaction.findOneAndDelete({ _id: req.body.transactionId });
    res.send("Transaction is deleted successfully!");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
