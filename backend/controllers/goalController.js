const ayncHandler = require('express-async-handler');
const Goal = require('../model/goalModel')


//@desc    Get goals
//@route   GET/api/goals
//@access  Private
const getGoals = ayncHandler(async (req, res) => {
  // res.send(`Get Goals`)

  const goals = await Goal.find()
  res.status(200).json({
    // message: 'Get Goals'
    goals
  })
})



//@desc    Set goals
//@route   POST/api/goals
//@access  Private
const setGoal = ayncHandler(async (req, res) => {
  // console.log(req.body);

  if (!req.body.text) {
    res.status(400)
    throw new Error('Please add a text field');
  }

  const goal = await Goal.create({
    text: req.body.text
  })
  res.status(200).json(goal)
})



//@desc Update goals
//@route PUT/api/goals
//@access Private
const updateGoal = ayncHandler(async (req, res) => {
  

  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400)
    throw new Error('Goal not found')
  }

  const updateGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true })
  
  res.status(200).json(updateGoal)
})



//@desc Delete goals
//@route Delete/api/goals
//@access Private
const deleteGoal = ayncHandler(async (req, res) => {

  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400)
    throw new Error('Goal not found')
  }

  await goal.remove();

  res.status(200).json({
    id: req.params.id
  })
})





module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal
}