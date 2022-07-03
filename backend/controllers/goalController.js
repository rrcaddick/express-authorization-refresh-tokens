const asyncHandler = require("express-async-handler");
const { RequestHandler } = require("express");
const Goal = require("../models/goalModel");

/** @desc Get Goals */
/** @route GET /api/goals */
/** @access Private */
/** @type RequestHandler  */
const getGoals = asyncHandler(async (req, res, next) => {
  const goals = await Goal.find();
  res.status(200).json({ goals });
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

  const goal = await Goal.create({ text });

  res.status(200).json({ goal });
});

/** @desc Update Goal */
/** @route PUT /api/goals/:id */
/** @access Private */
/** @type RequestHandler */
const updateGoal = asyncHandler(async (req, res, next) => {
  const {
    params: { id },
    body: { text },
  } = req;

  const goal = await Goal.findByIdAndUpdate(id, { text }, { new: true });

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  res.status(200).json({ goal });
});

/** @desc Delete Goal */
/** @route PUT /api/goals/:id */
/** @access Private */
/** @type RequestHandler */
const deleteGoal = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  await Goal.findByIdAndDelete(id);

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
