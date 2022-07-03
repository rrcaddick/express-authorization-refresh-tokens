const asyncHandler = require("express-async-handler");

const { RequestHandler } = require("express");

/** @desc Get Goals */
/** @route GET /api/goals */
/** @access Private */
/** @type RequestHandler  */
const getGoals = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    message: "Get goals",
  });
});

/** @desc Set Goals */
/** @route POST /api/goals */
/** @access Private */
/** @type RequestHandler */
const setGoal = asyncHandler(async (req, res, next) => {
  const { text } = req.body;

  if (!text) {
    res.status(400);
    throw new Error(" Please add a text field");
  }

  res.status(200).json({
    message: "Set goal",
  });
});

/** @desc Update Goal */
/** @route PUT /api/goals/:id */
/** @access Private */
/** @type RequestHandler */
const updateGoal = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    message: `Update goal ${req.params.id}`,
  });
});

/** @desc Delete Goal */
/** @route PUT /api/goals/:id */
/** @access Private */
/** @type RequestHandler */
const deleteGoal = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    message: `Delete goal ${req.params.id}`,
  });
});

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
