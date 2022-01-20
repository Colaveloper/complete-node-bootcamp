const mongoose = require("mongoose");
const slugify = require("slugify");
const validator = require("validator");

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A tour must have a name"],
      unique: true,
      trim: true, // removes white spaces at the two ends
      maxlength: [40, "A tour must have less than 40 characters"],
      minlength: [10, "A tour must have at least 10 characters"],
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, "A tour must have a duration"],
    },
    maxGroupSize: {
      type: Number,
      required: [true, "A tour must have a group size"],
    },
    difficulty: {
      type: String,
      required: [true, "A tour must have a difficulty"],
      enum: {
        values: ["easy", "medium", "difficult"],
        message: "difficulty is either easy medium or difficult",
      },
    },
    ratingAvarage: {
      type: Number,
      default: 2.5,
      min: [1, "Rating must be above or equal to 1"],
      max: [5, "Rating must be below 5"],
    },
    ratingQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "A tour must have a price"],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (value) {
          // does not work on update!!!
          return value < this.price;
        },
        message: "Discount price ({VALUE}) must be less than original price",
      },
    },
    summary: {
      type: String,
      required: [true, "A tour must have a summary"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, "A tour must have a cover image"],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false, // this field won't be sent to the client
    },
    startDates: [Date], // a string would be translated into a date by mongoDB
    secretTour: {
      type: Boolean,
      default: false,
    },
  },

  {
    toJSON: { virtuals: true }, // eneabling vitual properties
    toObject: { virtuals: true },
  }
);

tourSchema.virtual("durationWeeks").get(function () {
  return this.duration / 7;
});

// DOCUMENT MIDDLEWARE: runs before saving/creating
// creates a slug from the given name
tourSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// QUERY MIDDLEWARE: runs before the execution of any query
// before find is called, secret tours are removed
tourSchema.pre(/^find/, function (next) {
  // R.E. for "every query that starts with find"
  this.find({ secretTour: { $ne: true } });
  next();
});

// AGGREGATION MIDDLEWARE: runs before the aggregation pipeline
// hides secret tours
tourSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  next();
});

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
