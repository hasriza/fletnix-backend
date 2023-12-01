const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const contentSchema = mongoose.Schema(
  {
    show_id: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      unique: true,
      trim: true,
    },
    director: {
      type: String,
      unique: true,
      trim: true,
    },
    country: {
      type: String,
      unique: true,
      trim: true,
    },
    date_added: {
      type: String,
      unique: true,
      trim: true,
    },
    release_year: {
      type: Number,
      unique: true,
      trim: true,
    },
    rating: {
      type: String,
      unique: true,
      trim: true,
    },
    duration: {
      type: String,
      unique: true,
      trim: true,
    },
    listed_in: {
      type: String,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      unique: true,
      trim: true,
    },
  },
  {
    timestamps: false,
  }
);

// add plugin that converts mongoose to json
contentSchema.plugin(toJSON);
contentSchema.plugin(paginate);

/**
 * @typedef Content
 */
const Content = mongoose.model('Content', contentSchema);

module.exports = Content;
