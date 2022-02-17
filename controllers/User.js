const express = require('express');
const {User} = require('../models');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../.env"});

const register = async (req, res) => {
  try {
      const foundUser = await User.findOne({ email: req.body.email });
      
      if (foundUser)
          return res.status(400).json({
              status: 400,
              message: "Email has already been registered. Please try again",
          });

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(req.body.password, salt);
      const createdUser = await User.create({ ...req.body, password: hash });
      
      if (createdUser) {
          const signedJwt = await jwt.sign(
              { _id: createdUser._id },
              process.env.jwtSecret,
              {
              expiresIn: "8h",
              }
          );
          res.status(200).json({
              status: 200,
              message: "Success",
              token: signedJwt,
          });
      }
      
  } catch (error) {
      return res.status(500).json({
          status: 500,
          message: error 
        //   || "Something went wrong. Please try again",
      });
  }
};

const login = async (req, res) => {
  try {
      const foundUser = await User.findOne({ email: req.body.email }).select(
          "+password"
      );
      
      if (!foundUser) {
          return res
          .status(400)
          .json({ status: 400, message: "Email or password is incorrect" });
      }
      
      const isMatch = await bcrypt.compare(req.body.password, foundUser.password);
      // check if the passwords match
      if (isMatch) {
          const signedJwt = await jwt.sign(
              { _id: foundUser._id },
              process.env.jwtSecret,
              {
              expiresIn: "8h",
              }
          );
          res.status(200).json({
              status: 200,
              message: "Success",
              token: signedJwt,
          });
      } else {
      return res.status(400).json({
          status: 400,
          message: "Username or password is incorrect",
      });
      }
  } catch (error) {
      return res.status(500).json({
          status: 500,
          message: error
        //   "Something went wrong. Please try again",
      });
  }
};

const profile = async (req, res) => {
  try {
      const foundUser = await User.findById(req.currentUser);

      res.json({ headers: req.headers, user: foundUser });
  } catch (error) {
      return res.status(500).json({
          status: 500,
          message: "Something went wrong. Please try again",
      });
  }
};

// Update Page
const userUpdate = async (req, res) => {
  try {
      const updatedUser = await User.findByIdAndUpdate(
        req.currentUser,
        req.body,
        {new: true}
      );

      res.status(200).json(updatedUser);

  } catch (err) {
      return console.log(err);
  }
};

module.exports = {
  register,
  login,
  profile,
  userUpdate
};