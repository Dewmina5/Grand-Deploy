const express  =  require("express");
const router = express.Router();
const ContactUs = require("../controller/ContactUsController");

router.route("/send").post(ContactUs.SendContactMessage);
router.route("/view-messages").get(ContactUs.viewContactUsMessages);
router.route("/view-messages/:id").get(ContactUs.viewSingaleMessage);

module.exports = router;
