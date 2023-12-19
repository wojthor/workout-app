const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Add a name"],
  },
  email: {
    type: String,
    required: [true, "Add an email"],
  },
  password: {
    type: String,
    required: true[(true, "Add a password")],
  },
  dateOfRegistration: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);
