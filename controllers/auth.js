const { hashPassword, comparePassword } = require("../helper/auth");
const User = require("../models/user");
const Order = require("../models/order");
const jwt = require("jsonwebtoken");
const Product=require("../models/product");

const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;
    //validation

    if (!name || !email || !password || !phone || !address || !answer) {
      return res.send({ error: "Please fill all the fields ", success: false });
    }

    const user = await User.findOne({ email });
    //existing user
    if (user) {
      return res.send({ message: "Email Already Exits", success: false });
    }

    const hashedPassword = await hashPassword(password);
    const newUser = await new User({
      name,
      email,
      password: hashedPassword,
      address,
      phone,
      answer,
    });
    await newUser.save();
    return res
      .status(201)
      .send({ message: "User Registered Successfully", success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Sign Up ",
      error,
    });
  }
};

// Login Post

const LoginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid Email or password",
      });
    }
    //checking user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "Invalid Email or Password",
      });
    }
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).send({
        messsage: "Invalid Email  or Password",
        success: false,
      });
    }

    //token generation

    const token = await jwt.sign({ _id: user._id }, process.env.SECRET, {
      expiresIn: "7d",
    });
    return res.status(201).send({
      success: true,
      message: "login Successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login",
      error,
    });
  }
};

const testController = (req, res) => {
  return res.send({ message: "protected route", success: true });
};

//forget Password

const forgetPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email || !answer || !newPassword) {
      return res
        .status(400)
        .send({ message: "All Fileds are required", success: false });
    }
    var user = await User.findOne({ email, password });
    if (!user) {
      return res.status(404).send({
        message: "Invalid Credentials",
        success: false,
      });
    }
    const hashed = await hashPassword(newPassword);
    await User.findByIdAndUpdate(user._id, { password: hashed });
    return res.status(200).send({
      message: "Password Reset Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Something Went Wrong!",
      success: false,
      error,
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, password, address, phone } = req.body;
    const user = await User.findById(req.user._id);
    //password
    if (password && password.length < 6) {
      return res.send({ error: "Password is required with min Length of 6" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    return res.status(200).send({
      message: "Profile Updated Successfully",
      success: true,
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error in Updating Profile",
      success: false,
      error,
    });
  }
};

const getOrderController = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort({createdAt:'-1'});
    return res.status(200).send({ message: "Getting All Orders ", orders ,success:true});
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error in getting Orders of User",
      success: false,
      error,
    });
  }
};

module.exports = {
  registerController,
  LoginController,
  forgetPasswordController,
  testController,
  updateProfile,
  getOrderController,
};
