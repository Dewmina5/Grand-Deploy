const express = require("express");
const router = express.Router();
const GrantHolder = require("../controller/grantHolderController");

router.route("/apply-user").post(GrantHolder.ApplyGrantHolder);
router.route("/view-application").get(GrantHolder.ViewAllGrantAplication);
router
  .route("/view-single-application/:id")
  .get(GrantHolder.ViewSingleAplication);
router
  .route("/view-single-application-ByEmail/:id")
  .get(GrantHolder.ViewSingleAplicationByEmail);
router
  .route("/view-application-univercity/:id")
  .get(GrantHolder.ViewGrantAplicationUsingUniversity);
router.route("/updateDH/:id").put(GrantHolder.UpdateApprovedAplicantFormDH);
router.route("/updateFH/:id").put(GrantHolder.UpdateApprovedAplicationFromFH);
router.route("/updateVC/:id").put(GrantHolder.UpdateApprovedAplicationFromVC);
router.route("/email").post(GrantHolder.sendApprovalEmail);
router.route("/deleteUsers").delete(GrantHolder.deleteUsers);

module.exports = router;
