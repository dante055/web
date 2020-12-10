class ApiFeatures {
  constructor(query, queryObj) {
    this.query = query;
    this.queryObj = queryObj;
  }

  // 1. Filtering
  filter() {
    // (a) filtering
    let queryObj = { ...this.queryObj };
    const excludedFilds = ['sort', 'fields', 'page', 'limit'];
    excludedFilds.forEach(field => delete queryObj[field]);

    // (b). advance filtering, get operators
    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(
      /\b(lt|lte|gt|gte)\b/g,
      match => `$${match}`
    );
    queryObj = JSON.parse(queryString);

    this.query = this.query.find(queryObj);
    return this;
  }

  // 2. sorting
  sort() {
    if (this.queryObj.sort) {
      let sortBy = this.queryObj.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  // 3. Limiting fields
  limitFields() {
    if (this.queryObj.fields) {
      let fields = this.queryObj.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  // 4 Pagination
  pagination() {
    if (this.query.page || this.query.limit) {
      let page = Number(this.queryObj.page) || 1;
      let limitDoc = Number(this.queryObj.limit) || 100;
      let skipDoc = (page - 1) * limitDoc;

      this.query = this.query.skip(skipDoc).limit(limitDoc);
    }
    return this;
  }
}

module.exports = ApiFeatures;
