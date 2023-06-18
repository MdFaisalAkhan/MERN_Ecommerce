// const { json } = require("express/lib/response");

class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  // search products
  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    // console.log("search=====>", keyword, this.query);
    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };

    // Remove some field for categoty
    const removeFields = ["keyword", "page", "limit"];

    removeFields.forEach((key) => delete queryCopy[key]);

    // Filter for price and rating range

    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  pagination(resultPerpage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resultPerpage * (currentPage - 1);
    this.query = this.query.limit(resultPerpage).skip(skip);
    return this;
  }
}
module.exports = ApiFeatures;
