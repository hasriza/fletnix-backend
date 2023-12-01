const Joi = require('joi');
const { objectId } = require('./custom.validation');

const getContent = {
  params: Joi.object().keys({
    showId: Joi.string().custom(objectId),
  }),
};

const getContents = {
  body: Joi.object().keys({
    searchVal: Joi.string().optional(),
    type: Joi.string().optional(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

module.exports = {
  getContent,
  getContents,
};
