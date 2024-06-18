const mongoose = require("mongoose");

const revokedTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
});

const RevokedTokenModel = mongoose.model("RevokedToken", revokedTokenSchema);

module.exports = RevokedTokenModel;
