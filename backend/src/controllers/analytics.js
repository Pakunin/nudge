const pool = require('../config/db');

const getDecisionSummary = async (req, res) => {
    const { user_id } = req.query;

    if (!user_id) {
        return res.status(400).json({ error: 'user_id is required' });
    }

    try{
        const userDecisions = await pool.query(
            `SELECT decision_id FROM decision.decisions WHERE user_id = $1`, [user_id]
        );

        const decisionIds = userDecisions.rows.map(r => r.decision_id);

        if (decisionIds.length === 0){
            return res.json({ timeline: [], overthinking: [] });
        }

        const timeline = await pool.query(
            `SELECT * FROM analytics.decision_timeline_summary WHERE decision_id = ANY($1::int[])`, [decisionIds]
        );

        const overthinking = await pool.query(
            `SELECT * FROM analytics.decision_overthinking_metrics WHERE decision_id = ANY($1::int[])`, [decisionIds]
        );

        res.json({
            timeline: timeline.rows,
            overthinking: overthinking.rows
        })

    } catch(err){
        console.error('getDecisionSummary error:', err.message);
    }
};

const getGoalSummary = async (req, res) => {
    const { user_id } = req.query;

    if (!user_id) {
        return res.status(400).json({ error: 'user_id is required' });
    }

    try { 
        const userGoals = await pool.query(
            `SELECT goal_id from goal.goals WHERE user_id = $1`, [user_id]
        );

        const goalIds = userGoals.rows.map(r => r.goal_id);

        if (goalIds.length === 0) {
            return res.json({ drift: [], engagement: [] });
        }

        const drift = await pool.query(
            `SELECT * FROM analytics.goal_drift_metrics WHERE goal_id = ANY($1::int[])`, [goalIds]
        );

        const engagement = await pool.query(
            `SELECT * FROM analytics.goal_engagement_metrics WHERE goal_id = ANY($1::int[])`, [goalIds]
        );

        res.json({
            drift: drift.rows,
            engagement: engagement.rows
        });

    } catch (err) {
        console.error('getGoalDecisions error:', err.message);
    }
};

module.exports = { getDecisionSummary, getGoalSummary };