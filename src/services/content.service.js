const httpStatus = require('http-status');
const { Content } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Query for contents
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryContents = async (filter, options) => {
  const contents = await Content.paginate(filter, options, 'title type duration release_year');
  if (!contents) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not found!');
  }
  return contents;
};

/**
 * Get show by id
 * @param {ObjectId} id
 * @returns {Promise<Content>}
 */
const getShowById = async (id, userAge) => {
  const content = Content.findById(id);
  if (!content) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Show not found!');
  }
  return userAge < 18 && content.type === 'R' ? null : content;
};

module.exports = {
  queryContents,
  getShowById,
};
