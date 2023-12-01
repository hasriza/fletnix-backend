const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const contentValidation = require('../../validations/content.validation');
const contentController = require('../../controllers/content.controller');

const router = express.Router();

router.route('/').post(auth('getContent'), validate(contentValidation.getContents), contentController.getContents);

router.route('/:showId').get(auth('getContent'), validate(contentValidation.getContent), contentController.getContent);

module.exports = router;
