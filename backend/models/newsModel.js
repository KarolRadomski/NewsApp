const mongoose = require('mongoose');

const newsSchema = mongoose.Schema(
  {
    title: { type: String, required: [true, 'Missing a news title'] },
    description: { type: String, required: [true, 'Missing description'] },
    longDescription: {
      type: String,
      required: [true, 'Missing long description'],
    },
    img: { type: String },
    category: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('News', newsSchema);
