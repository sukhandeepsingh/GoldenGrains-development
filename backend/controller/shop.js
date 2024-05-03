const express = require("express");
const path = require("path");
const router = express.Router();
const fs = require("fs");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const sendToken = require("../utils/jwtToken");
const Shop = require("../model/shop");
const { isAuthenticated, isSeller, isAdmin } = require("../middleware/auth");
const { upload } = require("../multer");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const sendShopToken = require("../utils/shopToken");

// create shop
router.post("/create-shop", upload.single("file"), async (req, res, next) => {
  try {
    const { email } = req.body;
    const sellerEmail = await Shop.findOne({ email });
    if (sellerEmail) {
      const filename = req.file.filename;
      const filePath = `uploads/${filename}`;
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
          res.status(500).json({ message: "Error deleting file" });
        }
      });
      return next(new ErrorHandler("User already exists", 400));
    }

    const filename = req.file.filename;
    const fileUrl = path.join(filename);

    const seller = {
      name: req.body.name,
      email: email,
      password: req.body.password,
      avatar: fileUrl,
      address: req.body.address,
      phoneNumber: req.body.phoneNumber,
      zipCode: req.body.zipCode,
    };

    const activationToken = createActivationToken(seller);

    const activationUrl = `http://localhost:3000/seller/activation/${activationToken}`;

    try {
      await sendMail({
        email: seller.email,
        subject: "Activate your seller account",
        message: `Hello ${seller.name}, click on this link to activate your seller account : ${activationUrl}`,
      });
      res.status(201).json({
        success: true,
        message: `please check your email: ${seller.email}, to activate your seller account!`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

//creating activation token
const createActivationToken = (seller) => {
  return jwt.sign(seller, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

//activate seller
router.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activation_token } = req.body;

      const newSeller = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );

      if (!newSeller) {
        return next(new ErrorHandler("Invalid token", 400));
      }
      const { name, email, password, avatar, zipCode, address, phoneNumber } =
        newSeller;

      let seller = await Shop.findOne({ email });

      if (seller) {
        return next(new ErrorHandler("User already exists", 400));
      }

      seller = await Shop.create({
        name,
        email,
        avatar,
        password,
        zipCode,
        address,
        phoneNumber,
      });

      sendShopToken(seller, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// login seller
router.post(
  "/login-shop",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(new ErrorHandler("Fill all the fields", 400));
      }

      const user = await Shop.findOne({ email }).select("+password");

      if (!user) {
        return next(new ErrorHandler("User doesn't exist", 400));
      }

      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return next(new ErrorHandler("Invalid email or password.", 400));
      }

      sendShopToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//load farmer shop
router.get(
  "/getSeller",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const seller = await Shop.findById(req.seller._id);

      if (!seller) {
        return next(new ErrorHandler("User doesn't exists", 400));
      }

      res.status(200).json({
        success: true,
        seller,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// log out farmer shop
router.get(
  "/logout",
  catchAsyncErrors(async (req, res, next) => {
    try {
      res.cookie("seller_token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      });
      res.status(201).json({
        success: true,
        message: "You have been successfully logged out.",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// get farmer shop info
router.get(
  "/get-shop-info/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const shop = await Shop.findById(req.params.id);
      res.status(201).json({
        success: true,
        shop,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update farmer photo
router.put(
  "/update-shop-avatar",
  isSeller,
  upload.single("image"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const existsUser = await Shop.findById(req.seller._id);

      const existAvatarPath = `uploads/${existsUser.avatar}`;

      fs.unlinkSync(existAvatarPath);

      const fileUrl = path.join(req.file.filename);

      const user = await Shop.findByIdAndUpdate(req.seller._id, {
        avatar: fileUrl,
      });

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update farmer information
router.put(
  "/update-seller-info",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { name, description, address, phoneNumber, zipCode } = req.body;

      const shop = await Shop.findOne(req.seller._id);

      if (!shop) {
        return next(new ErrorHandler("User not found", 400));
      }

      shop.name = name;
      shop.description = description;
      shop.address = address;
      shop.phoneNumber = phoneNumber;
      shop.zipCode = zipCode;

      await shop.save();

      res.status(201).json({
        success: true,
        shop,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// admin all sellers list
router.get(
  "/admin-all-sellers",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const sellers = await Shop.find().sort({
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        sellers,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// delete a seller by admin
router.delete(
  "/delete-seller/:id",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const seller = await Shop.findById(req.params.id);

      if (!seller) {
        return next(new ErrorHandler("Invalid ID", 400));
      }

      await Shop.findByIdAndDelete(req.params.id);

      res.status(201).json({
        success: true,
        message: "Deleted successfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// add/update farmer withdraw methods
router.put(
  "/update-payment-methods",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { withdrawMethod } = req.body;

      const seller = await Shop.findByIdAndUpdate(req.seller._id, {
        withdrawMethod,
      });

      res.status(201).json({
        success: true,
        seller,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// delete withdraw method
router.delete(
  "/delete-withdraw-method",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const seller = await Shop.findById(req.seller._id);

      if (!seller) {
        return next(new ErrorHandler("Invalid Shop ID", 400));
      }

      seller.withdrawMethod = null;

      await seller.save();

      res.status(201).json({
        success: true,
        seller,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// x
// Universal top farmers list
router.get(
  "/top-farmers",
  catchAsyncErrors(async (req, res, next) => {
    try {
      // Fetch all sellers sorted by their ratings in descending order
      const topFarmers = await Shop.find({ ratingCount: { $gte: 100 } })
        .select('_id name description avatar rating ratingCount createdAt')
        .sort({ rating: -1, createdAt: 1, ratingCount: -1 })
        .limit(4);

      // Send the top farmers data in the response
      res.status(200).json({
        success: true,
        topFarmers,
      });
    } catch (error) {
      // Handle errors
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// request password reset
router.post('/forgot-password', async (req, res, next) => {
  const { email } = req.body;

  try {
    // Find seller by email
    const seller = await Shop.findOne({ email });

    if (!seller) {
      return next(new ErrorHandler('Seller not found with this email', 404));
    }

    // Get reset token
    const resetToken = jwt.sign({ id: seller._id }, process.env.RESET_PASSWORD_SECRET, { expiresIn: '5m' });

    // Create reset password URL
    const resetUrl = `http://localhost:3000/reset-password-farmer/${resetToken}`;

    // Send reset password link via email
    await sendMail({
      email: seller.email,
      subject: 'Reset Farmer Password - GoldenGrains',
      message: `You are receiving this email because a password reset request has been initiated for your account.\n\nPlease click on the following link to reset your password:\n\n${resetUrl}\n\nThe link will expire in 5 minutes from now.\nIf you did not request this, please ignore this email.`,
    });

    res.status(200).json({
      success: true,
      message: `Password reset link has been sent to ${seller.email}`,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// reset password
router.put('/reset-password-farmer/:resetToken', async (req, res, next) => {
  const resetToken = req.params.resetToken;
  const { password } = req.body;

  if (!resetToken || !password) {
    return next(new ErrorHandler('Invalid reset token or password', 400));
  }

  try {
    // Decode reset token
    const decoded = jwt.verify(resetToken, process.env.RESET_PASSWORD_SECRET);
  
    if (!decoded) {
      return next(new ErrorHandler('Invalid reset token', 400));
    }

    // Find seller by id from decoded token
    const seller = await Shop.findById(decoded.id);

    if (!seller) {
      return next(new ErrorHandler('Seller not found', 404));
    }

    // Set new password
    seller.password = password;

    await seller.save();

    res.status(200).json({
      success: true,
      message: 'Password updated successfully',
    });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return next(new ErrorHandler('Reset token has expired', 400));
    }
    return next(new ErrorHandler(error.message, 400));
  }
});

module.exports = router;
