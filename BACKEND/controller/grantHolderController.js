const GrantHolder = require("../model/grantHolderModel");
const AdminUsers = require("../model/AdminUserModel.js");
const errorHandler = require("../utils/error");
const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
require("dotenv").config();

const ApplyGrantHolder = async (req, res, next) => {
  try {
    // Assuming the request body contains all the necessary data for a GrantHolder
    const newGrantHolderData = req.body;

    const UserEmail = newGrantHolderData.email;
    const NIC = newGrantHolderData.nic;

    const EmailValidation = await GrantHolder.findOne({
      email: UserEmail,
    });

    if (EmailValidation) {
      return res.json({
        status: "User Already Exists",
        message: "You are already Use this Email to Register.",
      });
    }

    const NICValidation = await GrantHolder.findOne({
      nic: NIC,
    });

    if (NICValidation) {
      return res.json({
        status: "User Already Exists",
        message: "You are already Use this NIC to Register.",
      });
    }

    // Create a new GrantHolder instance using the data
    const newGrantHolder = new GrantHolder(newGrantHolderData);

    // Save the new GrantHolder to the database
    const savedGrantHolder = await newGrantHolder.save();

    // Respond with the saved GrantHolder data
    res.status(201).json({
      message: "GrantHolder created successfully",
      grantHolder: savedGrantHolder,
    });
  } catch (error) {
    // Handle errors gracefully
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const ViewAllGrantAplication = async (req, res, next) => {
  try {
    const GrantAplications = await GrantHolder.find();
    res.json(GrantAplications);
  } catch (err) {
    console.log(err);
    next(errorHandler(err));
    res
      .status(500)
      .send({ status: "Error fetching Aplications", error: err.message });
  }
};

const ViewGrantAplicationUsingUniversity = async (req, res, next) => {
  try {
    const universityName = req.params.id;
    console.log(universityName);
    const grantApplications = await GrantHolder.find({
      VCApprooved: { $ne: "Approved" },
      employmentTableData: {
        $elemMatch: {
          isCurrent: true,
          universityName: universityName, // Check if the university name matches
        },
      },
    });

    console.log(grantApplications);

    if (!grantApplications || grantApplications.length === 0) {
      return res.json({
        status: "No Applicants Found",
        message:
          "There are no grant applications for the specified university.",
      });
    }

    res.json({
      status: "Grant Applications Fetched",
      grantApplications,
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

const ViewSingleAplication = async (req, res, next) => {
  try {
    const grantUserId = req.params.id;
    console.log(grantUserId);
    const GrantAplication = await GrantHolder.findOne({
      _id: grantUserId,
    });
    if (!GrantAplication) {
      return res.status(404).json({
        status: "Error",
        message: "Grant application not found for the given NIC.",
      });
    }

    res.status(200).json({
      status: "Application Details Fetched",
      GrantAplication,
    });
  } catch (err) {
    console.log(err);
    next(errorHandler(err));
    res
      .status(500)
      .send({ status: "Error fetching Aplication", error: err.message });
  }
};

const ViewSingleAplicationByEmail = async (req, res, next) => {
  try {
    const grantUserEmail = req.params.id;

    console.log(grantUserEmail);
    const GrantAplication = await GrantHolder.findOne({
      email: grantUserEmail,
    });
    if (!GrantAplication) {
      return res.status(404).json({
        status: "Error",
        message: "Grant application not found for the given NIC.",
      });
    }

    res.status(200).json({
      status: "Application Details Fetched",
      GrantAplication,
    });
  } catch (err) {
    console.log(err);
    next(errorHandler(err));
    res
      .status(500)
      .send({ status: "Error fetching Aplication", error: err.message });
  }
};

const UpdateApprovedAplicantFormDH = async (req, res, next) => {
  try {
    const IndividualApplicant = req.params.id;

    const DHApprooved = req.body.DHApprooved;
    console.log(DHApprooved);

    const updateAproveleState = {
      DHApprooved,
    };

    const UpdatedState = await GrantHolder.findByIdAndUpdate(
      IndividualApplicant,
      updateAproveleState,
      { new: true }
    );

    if (!UpdatedState) {
      return res.status(404).json({
        status: "Applicant not found",
        message: "No applicant found with the specified ID.",
      });
    }

    res
      .status(200)
      .send({ status: "Successfully Update DHApprovel State", UpdatedState });
  } catch (err) {
    console.log(err);
    next(errorHandler(err));
    res
      .status(500)
      .send({ status: "Error Update Aplication", error: err.message });
  }
};

const UpdateApprovedAplicationFromFH = async (req, res, next) => {
  try {
    const FHApprooved = req.body.FHApprooved;
    console.log(FHApprooved);
    console.log("FHApprooved  current status is", FHApprooved);

    const IndividualApplicant = req.params.id;

    const DHApproovedStatement = await GrantHolder.findById(
      IndividualApplicant
    );

    if (!DHApproovedStatement) {
      return res.status(404).json({
        status: "Applicant not found",
        message: "No applicant found with the specified ID.",
      });
    }

    const DHApprooved = DHApproovedStatement.DHApprooved;
    console.log(DHApprooved);

    if (DHApprooved === "true") {
      console.log("DHApprooved  current status is", DHApprooved);

      const updateAproveleState = {
        FHApprooved,
      };

      const UpdatedState = await GrantHolder.findByIdAndUpdate(
        IndividualApplicant,
        updateAproveleState,
        { new: true }
      );

      if (!UpdatedState) {
        return res.status(404).json({
          status: "Applicant not found",
          message: "No applicant found with the specified ID.",
        });
      }

      return res.status(200).json({
        status: "Successfully updated DHApprovel State",
        // updatedState,
      });
    } else {
      return res.status(400).json({
        status: "Error",
        message: "Cannot access without DHApprooved",
      });
    }
  } catch (err) {
    console.error(err);
    next(errorHandler(err));
    return res.status(500).json({
      status: "Error updating application",
      error: err.message,
    });
  }
};

const UpdateApprovedAplicationFromVC = async (req, res, next) => {
  try {
    const VCApprooved = req.body.VCApprooved;
    console.log(VCApprooved);
    console.log("VCApprooved  current status is", VCApprooved);

    const IndividualApplicant = req.params.id;

    const DHApproovedStatement = await GrantHolder.findById(
      IndividualApplicant
    );

    if (!DHApproovedStatement) {
      return res.status(404).json({
        status: "Applicant not found",
        message: "No applicant found with the specified ID.",
      });
    }

    const DHApprooved = DHApproovedStatement.DHApprooved;
    const FHApprooved = DHApproovedStatement.FHApprooved;

    console.log(DHApprooved);
    console.log(FHApprooved);

    if (DHApprooved === "true" && FHApprooved === "true") {
      console.log(
        "DHApprooved  current status is",
        DHApprooved,
        "FHAprroved Status",
        FHApprooved
      );

      const updateAproveleState = {
        VCApprooved,
      };

      const UpdatedState = await GrantHolder.findByIdAndUpdate(
        IndividualApplicant,
        updateAproveleState,
        { new: true }
      );

      if (!UpdatedState) {
        return res.status(404).json({
          status: "Applicant not found",
          message: "No applicant found with the specified ID.",
        });
      }

      return res.status(200).json({
        status: "Successfully updated DHApprovel State",
        // updatedState,
      });
    } else {
      return res.status(400).json({
        status: "Error",
        message: "Cannot access without DHApprooved",
      });
    }
  } catch (err) {
    console.error(err);
    next(errorHandler(err));
    return res.status(500).json({
      status: "Error updating application",
      error: err.message,
    });
  }
};

const sendApprovalEmail = async (req, res, next) => {
  try {
    const recipientEmail = req.body.Email;
    const customMessage =
      req.body.customMessage ||
      "Your application has been approved. Congratulations!";

    const mailTransporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.NODE_MAILER_USERNAME,
        pass: process.env.NODE_MAILER_PASSWORD,
      },
    });

    const mailOptions = {
      from: "gms@ncas.ac.lk",
      to: recipientEmail,
      subject: "Application Approved",
      text: customMessage,
    };

    const info = await mailTransporter.sendMail(mailOptions);

    console.log("Email sent:", info.response);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const deleteUsers = async (req, res) => {
  try {
    const deletedUsers = await AdminUsers.deleteMany({ UserType: "User" })
    if(deletedUsers){
      res.status(200).json({ message: "Succefully deleted" });
    }
    
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


module.exports = {
  ApplyGrantHolder,
  ViewAllGrantAplication,
  ViewSingleAplication,
  ViewSingleAplicationByEmail,
  ViewGrantAplicationUsingUniversity,
  UpdateApprovedAplicantFormDH,
  UpdateApprovedAplicationFromFH,
  UpdateApprovedAplicationFromVC,
  sendApprovalEmail,
  deleteUsers
};
