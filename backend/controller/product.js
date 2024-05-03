const express = require("express");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const router = express.Router();
const Product = require("../model/product");
const Shop = require("../model/shop");
const Order = require("../model/order");
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const { isSeller, isAuthenticated, isAdmin } = require("../middleware/auth");
const fs = require("fs");

// create product
router.post(
  "/create-product",
  upload.array("images"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const shopId = req.body.shopId;
      const shop = await Shop.findById(shopId);
      if (!shop) {
        return next(new ErrorHandler(error, 400));
      } else {
        const files = req.files;
        const imageUrls = files.map((file) => `${file.filename}`);

        const productData = req.body;
        productData.images = imageUrls;
        productData.shop = shop;

        const product = await Product.create(productData);

        res.status(201).json({
          success: true,
          product,
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get all products of a shop
router.get(
  "/get-all-products-shop/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find({ shopId: req.params.id });

      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// delete product by farmer
router.delete(
  "/delete-shop-product/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const productId = req.params.id;

      const productData = await Product.findById(productId);

      productData.images.forEach((imageUrl) => {
        const filename = imageUrl;
        const filePath = `uploads/${filename}`;

        fs.unlink(filePath, (err) => {
          if (err) {
            console.log(err);
          }
        });
      });

      const product = await Product.findByIdAndDelete(productId);

      if (!product) {
        return next(new ErrorHandler("Product not found with this Id!", 500));
      }

      res.status(201).json({
        success: true,
        message: "Product deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get all products
router.get(
  "/get-all-products",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find().sort({ createdAt: -1 });

      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// all products on all products page with sort, filter and pagination
router.get(
  "/get-all-products-main",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { page, category, sort } = req.query;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      let query = {};
      if (category) {
        query.category = { $in: category.split(",") };
      }

      let sortCriteria = { createdAt: -1 };
      if (sort === "price_asc") {
        sortCriteria = { discountPrice: 1 };
      } else if (sort === "price_dec") {
        sortCriteria = { discountPrice: -1 };
      } else if (sort === "name_asc") {
        sortCriteria = { name: 1 };
      } else if (sort === "name_dec") {
        sortCriteria = { name: -1 };
      }

      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;

      const maxproducts = (await Product.find()).length;
      const products = await Product.find(query)
        .sort(sortCriteria)
        .limit(limit)
        .skip(startIndex);

      const totalProducts = await Product.countDocuments();

      const pagination = {};

      if (endIndex < totalProducts) {
        pagination.next = {
          page: page + 1,
          limit: limit
        };
      }

      if (startIndex > 0) {
        pagination.prev = {
          page: page - 1,
          limit: limit
        };
      }

      res.status(200).json({
        success: true,
        count: maxproducts,
        pagination,
        products
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);


// product review by user
router.put(
  "/create-new-review",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { user, rating, comment, productId, orderId } = req.body;

      const product = await Product.findById(productId);

      const review = {
        user,
        rating,
        comment,
        productId,
      };

      const isReviewed = product.reviews.find(
        (rev) => rev.user._id === req.user._id
      );

      if (isReviewed) {
        product.reviews.forEach((rev) => {
          if (rev.user._id === req.user._id) {
            (rev.rating = rating), (rev.comment = comment), (rev.user = user);
          }
        });
      } else {
        product.reviews.push(review);
      }

      let avg = 0;

      product.reviews.forEach((rev) => {
        avg += rev.rating;
      });

      product.ratings = avg / product.reviews.length;

      await product.save({ validateBeforeSave: false });

      // Update the average rating of the shop
      const shop = await Shop.findById(product.shopId);

      const avgRating = (shop.rating * shop.ratingCount + rating) / (shop.ratingCount + 1);
      shop.rating = avgRating.toFixed(1);
      shop.ratingCount += 1;

      await shop.save({ validateBeforeSave: false });

      await Order.findByIdAndUpdate(
        orderId,
        { $set: { "cart.$[elem].isReviewed": true } },
        { arrayFilters: [{ "elem._id": productId }], new: true }
      );

      res.status(200).json({
        success: true,
        message: "Review posted!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// admin all products list
router.get(
  "/admin-all-products",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find().sort({
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// delete product by admin
router.delete(
  "/admin-delete-product/:id",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const productId = req.params.id;

      const productData = await Product.findById(productId);

      productData.images.forEach((imageUrl) => {
        const filename = imageUrl;
        const filePath = `uploads/${filename}`;

        fs.unlink(filePath, (err) => {
          if (err) {
            console.log(err);
          }
        });
      });

      const product = await Product.findByIdAndDelete(productId);

      if (!product) {
        return next(new ErrorHandler("Product not found with this Id!", 500));
      }

      res.status(201).json({
        success: true,
        message: "Product deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

module.exports = router;
