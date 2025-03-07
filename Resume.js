const mongoose = require("mongoose");

const ResumeSchema = new mongoose.Schema({
  filename: String,
  filePath: String,
  jobDescription: String,
});

module.exports = mongoose.model("Resume", ResumeSchema);
