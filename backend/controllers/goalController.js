const asyncHandler = require("express-async-handler");
const { RequestHandler } = require("express");
const Goal = require("../models/goalModel");

/** @desc Get Goals */
/** @route GET /api/goals */
/** @access Private */
/** @type RequestHandler  */
const getGoals = asyncHandler(async (req, res, next) => {
  const { user } = req;
  const goals = await Goal.find({ user });
  res.status(200).json({ goals });
});

/** @desc Set Goals */
/** @route POST /api/goals */
/** @access Private */
/** @type RequestHandler */
const setGoal = asyncHandler(async (req, res, next) => {
  const {
    user,
    body: { text },
  } = req;

  if (!text) {
    res.status(400);
    throw new Error(" Please add a text field");
  }

  const goal = await Goal.create({ user: user._id, text });

  res.status(200).json({ goal });
});

/** @desc Update Goal */
/** @route PUT /api/goals/:id */
/** @access Private */
/** @type RequestHandler */
const updateGoal = asyncHandler(async (req, res, next) => {
  const {
    user,
    params: { id },
    body: { text },
  } = req;

  const goal = await Goal.findById(id);

  if (!user || !goal.user.equals(user._id)) {
    res.status(403);
    throw new Error("User not authorized");
  }

  const updatedGoal = await Goal.findByIdAndUpdate(id, { text }, { new: true });

  if (!updatedGoal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  res.status(200).json({ updatedGoal });
});

/** @desc Delete Goal */
/** @route PUT /api/goals/:id */
/** @access Private */
/** @type RequestHandler */
const deleteGoal = asyncHandler(async (req, res, next) => {
  const {
    user,
    params: { id },
  } = req;

  const goal = await Goal.findById(id);

  if (!user || !goal.user.equals(user._id)) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await Goal.findByIdAndDelete(id);

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
