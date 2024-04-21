const Shop = require("../model/shop");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const express = require("express");
const router = express.Router();
const { isSeller, isAuthenticated, isAdmin } = require("../middleware/auth");
const Withdraw = require("../model/withdraw");
const sendMail = require("../utils/sendMail");

// creating a new request for withdraw by seller
router.post(
  "/create-withdraw-request",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { amount } = req.body;

      const data = {
        seller: req.seller,
        amount,
      };

      const withdraw = await Withdraw.create(data);

      try {
        await sendMail({
          email: req.seller.email,
          subject: "Withdraw money request",
          message: `Hello ${req.seller.name}, we have received your withdraw money request of Rs. ${amount}. We are processing your request and you will receive the moneey in your account in 2 working days.`,
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }

      const shop = await Shop.findById(req.seller._id);

      shop.availableBalance -= amount;

      await shop.save();

      res.status(201).json({
        success: true,
        withdraw,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// listing all withdraw requests by admin
router.get(
  "/admin-all-withdraw-requests",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const withdraws = await Withdraw.find().sort({ createdAt: -1 });

      res.status(201).json({
        success: true,
        withdraws,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// updating status of farmer's withdraw money requests
router.put("/admin-update-withdraw-request/:id", isAuthenticated, isAdmin("Admin"), catchAsyncErrors(async(req,res,next) => {
  try {
    const {sellerId} = req.body;

    const withdraw = await Withdraw.findByIdAndUpdate(req.params.id, {
      status: "success", updatedAt: Date.now()
    }, {new: true});

    const seller = await Shop.findById(sellerId);

    const transaction = {
      _id: withdraw._id,
      amount: withdraw.amount,
      updatedAt: withdraw.updatedAt,
      status: withdraw.status,
    }

    seller.transactions = [...seller.transactions, transaction];

    await seller.save();

    try {
      await sendMail({
        email: seller.email,
        subject: "Withdraw success confirmation",
        message: `Hello ${seller.name}, your withdraw money request of Rs. ${withdraw.amount} has been processed. You shall receive the money soon depending on bank timings (if applicable).`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }

    res.status(201).json({
      success: true,
      withdraw,
    })
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}))

module.exports = router;
