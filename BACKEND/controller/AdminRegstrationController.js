const AdminUsers = require("../model/AdminUserModel");
const errorHandler = require("../utils/error");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

const RegistrationAdminUsers = async (req, res, next) => {
  try {
    const {
      FirstName,
      LastName,
      Univercity,
      UnivercityPosition,
      AdminisrationPosition,
      Email,
      UserName,
      Password,
      UserType,
      Status,
    } = req.body;

    const existingUser = await AdminUsers.findOne({ UserName });

    if (existingUser) {
      return res.status(400).json({
        status: "User Already Exists",
        error:
          "Username is already in use. Please choose a different username.",
      });
    }

    // Generate a salt
    const saltRounds = 15;
    const salt = bcrypt.genSaltSync(saltRounds);

    const hashedPassword = bcrypt.hashSync(Password, salt);

    const newAdminUser = new AdminUsers({
      FirstName,
      LastName,
      Univercity,
      UnivercityPosition,
      AdminisrationPosition,
      Email,
      UserName,
      Password: hashedPassword,
      UserType,
      Status,
    });

    await newAdminUser.save();

    res.status(201).json({
      message: "AdminUser created successfully",
      newAdminUser,
    });
  } catch (error) {
    // Handle errors gracefully
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
    next(error);
  }
};

const signinAdmin = async (req, res, next) => {
  try {
    const { UserName, Password } = req.body;

    console.log(UserName);

    const validUser = await AdminUsers.findOne({ UserName: UserName });
    if (!validUser) return next(errorHandler(404, "User not found"));

    const validPassword = bcrypt.compareSync(Password, validUser.Password);
    if (!validPassword) return next(errorHandler(401, "Wrong credentials"));

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: hashedPassword, ...rest } = validUser._doc;
    const expiryDate = new Date(Date.now() + 3600000); // 1 hour
    res
      .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json(rest);
  } catch (error) {
    // Handle errors gracefully
    console.error(error);
    next(error);
  }
};

const fetchSingleAdminProfile = async (req, res, next) => {
  try {
    const AdminID = req.params.id;

    const AdminAplication = await AdminUsers.findOne({
      _id: AdminID,
    });

    if (!AdminAplication) {
      return res.status(404).json({
        status: "Error",
        message: "Admin application not found for the given NIC.",
      });
    }

    res.status(200).json({
      status: "Admin Details Fetched",
      AdminAplication,
    });
  } catch (error) {
    // Handle errors gracefully
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
    next(error);
  }
};

const fetchAllUsersInSystem = async (req, res, next) => {
  try {
    const UserRole = "user";

    const SystemUsers = await AdminUsers.find({
      AdminisrationPosition: { $ne: UserRole },
      UnivercityPosition: { $ne: null },
    });
    if (!SystemUsers || SystemUsers.length === 0) {
      return res.json({
        status: "No Users Found",
        message: "There are no grant Users for the System",
      });
    }

    res.status(200).json({
      status: "SystemUsers Details Fetched",
      SystemUsers,
    });
  } catch (err) {
    console.error(err);
    next(errorHandler(err));
    res.status(500).send({
      status: "Error fetching Applications",
      error: err.message,
    });
  }
};

const UpdateUserStatus = async (req, res, next) => {
  try {
    const userID = req.params.id;
    const status = req.body.Status; // Assuming the status is present in the request body

    const updateUserStatusResponse = await AdminUsers.updateOne(
      { _id: userID },
      { $set: { Status: status } }
    );

    if (!updateUserStatusResponse || updateUserStatusResponse.nModified === 0) {
      return res.status(500).json({
        status: "Updating error",
        message: "User not found or status not updated",
      });
    }

    res.status(200).json({
      status: "SystemUsers Status Updated",
    });
  } catch (err) {
    console.error(err);
    next(errorHandler(err));
    res.status(500).json({
      status: "Error Updating Status",
      error: err.message,
    });
  }
};


const changePassword = async (req, res, next) => {
  try {
    const userID = req.params.id;
    const { currentPassword, newPassword } = req.body;

    const SystemUser = await AdminUsers.findOne({
      _id: userID,
    });

    if (!SystemUser) {
      return res.status(404).send({
        status: "User not found",
      });
    }

    const validPassword = bcrypt.compareSync(
      currentPassword,
      SystemUser.Password
    );

    if (!validPassword) {
      return res.status(401).send({
        status: "Invalid current password",
      });
    }

    const saltRounds = 15;
    const hashedNewPassword = bcrypt.hashSync(newPassword, saltRounds);

    const changeAdminPassword = await AdminUsers.updateOne(
      { _id: userID },
      { $set: { Password: hashedNewPassword } }
    );

    if (!changeAdminPassword) {
      return res.status(500).send({
        status: "Updating error",
      });
    }

    res.status(200).json({
      status: "SystemUsers Password Updated",
    });
  } catch (err) {
    console.error(err);
    next(errorHandler(err));
    res.status(500).send({
      status: "Error Updating Password",
      error: err.message,
    });
  }
};

const signout = (req, res) => {
  res.clearCookie("access_token").status(200).json("Signout success!");
};

module.exports = {
  RegistrationAdminUsers,
  signinAdmin,
  signout,
  fetchSingleAdminProfile,
  fetchAllUsersInSystem,
  changePassword,
  UpdateUserStatus,
};
