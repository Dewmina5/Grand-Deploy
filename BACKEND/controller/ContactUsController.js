const ContactUs = require("../model/ContactUsMessageModel");
const errorHandler = require("../utils/error");

const SendContactMessage = async (req, res, next) => {
  try {
    const { FirstName, LastName, Email, Phone, Message } = req.body;

    const newContactMessage = new ContactUs({
      FirstName,
      LastName,
      Email,
      Phone,
      Message,
    });

    await newContactMessage.save();

    res.status(201).json({
      message: "Message Send successfully",
      newContactMessage,
    });
  } catch (error) {
    // Handle errors gracefully
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
    next(error);
  }
};

const viewContactUsMessages = async (req, res, next) => {
  try {
    const ContactUsMessages = await ContactUs.find();
    res.json(ContactUsMessages);
  } catch (err) {
    console.log(err);
    next(errorHandler(err));
    res
      .status(500)
      .send({ status: "Error fetching Aplications", error: err.message });
  }
};

const viewSingaleMessage = async (req, res, next) => {
  try {
    const ViewContactID = req.params.id;
    const ContactUsMessage = await ContactUs.findOne({
      _id: ViewContactID,
    });

    if (!ContactUsMessage) {
      return res.status(404).json({
        status: "Error",
        message: "Contact Us Message not found for the given NIC.",
      });
    }

    res.status(200).json({
      status: "Application Details Fetched",
      ContactUsMessage,
    });
  } catch (err) {
    console.log(err);
    next(errorHandler(err));
    res
      .status(500)
      .send({ status: "Error fetching Aplications", error: err.message });
  }
};

module.exports = {
  SendContactMessage,
  viewContactUsMessages,
  viewSingaleMessage,
};
