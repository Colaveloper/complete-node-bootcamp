// this class can be used for handling any complex request

class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    // FILTERING
    // eslint-disable-next-line node/no-unsupported-features/es-syntax
    let queryObj = { ...this.queryString };
    // removing sorting and pagination from filters
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((field) => delete queryObj[field]);

    // including >=<= operators
    queryObj = JSON.parse(
      JSON.stringify(queryObj).replace(
        /\b(gte|gt|lte|lt)\b/g,
        (match) => `$${match}`
      )
    );
    this.query = this.query.find(queryObj);

    return this; // the entire object (the instance of APIFeatures)
  }

  sort() {
    // SORTING
    if (this.queryString.sort) {
      console.log(this.query.sort);
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }

  limitFields() {
    // fields
    if (this.query.fields) {
      console.log(this.query.fields);
      const fields = this.query.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }

  paginate() {
    // pagination
    const page = this.query.page * 1 || 1; // to make the string  a num
    const limit = this.query.limit * 1 || 100;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;
