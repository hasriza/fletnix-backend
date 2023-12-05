const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { contentService } = require('../services');

const getContent = catchAsync(async (req, res) => {
  const showDetails = await contentService.getShowById(req.params.showId, req.user.age);
  if (!showDetails) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Show not found!');
  }
  res.send({ showDetails, status: httpStatus[200] });
});

const getContents = catchAsync(async (req, res) => {
  const reqData = req.body;

  let filter = {};

  if (reqData.searchVal)
    filter = {
      $or: [{ title: { $regex: reqData.searchVal, $options: 'i' } }, { cast: { $regex: reqData.searchVal, $options: 'i' } }],
    };

  if (reqData.type) filter.type = reqData.type;

  if (req.user.age < 18) filter.rating = { $ne: 'R' };

  const options = pick(req.body, ['sortBy', 'limit', 'page']);
  const { results: showsList, totalPages } = await contentService.queryContents(filter, options, reqData.dateSort);

  res.send({ showsList, totalPages, status: httpStatus[200] });
});

module.exports = {
  getContent,
  getContents,
};
