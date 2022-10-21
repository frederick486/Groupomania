const mongoose = require("mongoose");

const publicationSchema = mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

module.exports = mongoose.model("Publication", publicationSchema);