const express = require('express');
const router = express.Router();
const goalController = require('../controllers/goal');

router.post('/create', goalController.createGoal);
router.get('/all', goalController.getAllGoals);
router.post('/version', goalController.addVersion);
router.post('/action', goalController.addAction);
router.post('/review', goalController.addReview);

module.exports = router;