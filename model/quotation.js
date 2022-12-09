const mongoose = require('mongoose');

const fileSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    mail: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    memo: {
      type: String,
      required: true,
    },
    file_path: {
      type: String,
      required: true
    },
    file_mimetype: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Quotation = mongoose.model('Quotation', fileSchema);

module.exports = Quotation;
