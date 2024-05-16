const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  FirstName: {
    type: String,
  },
  LastName: {
    type: String,
  },
  Univercity: {
    type: String,
  },
  UnivercityPosition: {
    type: String,
  },
  AdminisrationPosition: {
    type: String,
  },
  Email: {
    type: String,
  },
  UserName: {
    type: String,
  },
  Password: {
    type: String,
  },
  Status: {
    type: String,
  },
  UserType: {
    type: String,
  },
}, { timestamps: true }
);

const AdminUsers = mongoose.model("AdminUsers", userSchema);

module.exports = AdminUsers;
