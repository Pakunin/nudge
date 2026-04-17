const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analytics');

router.get('/decision-summary', analyticsController.getDecisionSummary);
router.get('/goal-summary', analyticsController.getGoalSummary);

module.exports = router;
