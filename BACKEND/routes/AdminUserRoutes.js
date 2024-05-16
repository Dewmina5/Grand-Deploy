const express = require("express");
const router = express.Router();
const AdminUser = require("../controller/AdminRegstrationController");

router.route("/add").post(AdminUser.RegistrationAdminUsers);
router.route("/signin").post(AdminUser.signinAdmin);
router.route("/profile/:id").get(AdminUser.fetchSingleAdminProfile);
router.route("/signout").get(AdminUser.signout);
router.route("/getSYSusers").get(AdminUser.fetchAllUsersInSystem);
router.route("/update-password/:id").put(AdminUser.changePassword);
router.route("/update-status/:id").put(AdminUser.UpdateUserStatus);

module.exports = router;

