const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
// const jwt = require("jsonwebtoken");

// register a User

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "this is a sample Id",
      url: "ProfilePicUrl",
    },
  });
  const token = user.getJwtToken();

  res.status(201).json({
    success: true,
    token,
    user,
  });
});

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  // console.log("requested bod", req.body);
  const { email, password } = req.body;

  // checking if user has given pass & email both

  if (!email || !password) {
    return next(new ErrorHandler("Please Enter email & password", 400));
  }
  const user = User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }
  console.log("userFind==>",user.email)
  const isPasswordMatched = user.comparePassword(password);
  console.log("isPassss", isPasswordMatched);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Ivalid email or password", 401));
  }
  const token = user.getJwtToken();
  res.status(200).json({
    success: true,
    token,
  });
});
