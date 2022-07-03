const { RequestHandler } = require("express");

/** @desc Get Goals */
/** @route GET /api/goals */
/** @access Private */
/** @type RequestHandler  */
const getGoals = (req, res, next) => {
  res.status(200).json({
    message: "Get goals",
  });
};

/** @desc Set Goals */
/** @route POST /api/goals */
/** @access Private */
/** @type RequestHandler */
const setGoal = (req, res, next) => {
  res.status(200).json({
    message: "Set goal",
  });
};

/** @desc Update Goal */
/** @route PUT /api/goals/:id */
/** @access Private */
/** @type RequestHandler */
const updateGoal = (req, res, next) => {
  res.status(200).json({
    message: `Update goal ${req.params.id}`,
  });
};

/** @desc Delete Goal */
/** @route PUT /api/goals/:id */
/** @access Private */
/** @type RequestHandler */
const deleteGoal = (req, res, next) => {
  res.status(200).json({
    message: `Delete goal ${req.params.id}`,
  });
};

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
