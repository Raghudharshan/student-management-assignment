const mongoose = require("mongoose");

// To store the data with respective of datatype in mongodb database
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: String, required: true },
  class: { type: String, required: true },
  phone: { type: String, required: true },
});

module.exports = mongoose.model("Student", studentSchema);