const pool = require("../config/db");

const createGoal = async (req, res) => {
  const { user_id, title, priority } = req.body;

  if (!user_id || !title) {
    return res.status(400).json({ error: "user_id and title is required" });
  }

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const goalResult = await client.query(
      `INSERT INTO goal.goals (user_id)
            VALUES ($1) RETURNING *`,
      [user_id],
    );

    const goal = goalResult.rows[0];

    const versionResult = await client.query(
      `INSERT INTO goal.goal_versions (goal_id, title, priority, valid_from)
            VALUES ($1, $2, $3, NOW())
            RETURNING *`,
      [goal.goal_id, title, priority || null],
    );

    await client.query("COMMIT");

    res
      .status(201)
      .json({ message: "Goal created", goal, version: versionResult.rows[0] });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("createGoal error:", err.message);
  } finally {
    client.release();
  }
};

const getAllGoals = async (req, res) => {
  const { user_id } = req.query;

  if (!user_id) {
    return req.status(400).json({ error: "user_id is required" });
  }

  try {
    const result = await pool.query(
      `SELECT
                g.goal_id,
                g.created_at,
                g.is_abandoned,
                gv.goal_versions_id,
                gv.title, 
                gv.priority,
                gv.valid_from,
                COUNT(ga.action_id) AS action_count,
                MAX(ga.action_date) AS last_action_date
            FROM goal.goals g
            JOIN goal.goal_versions gv
                ON g.goal_id  = gv.goal_id
                AND gv.valid_to IS NULL
            LEFT JOIN goal.goal_actions ga
                ON g.goal_id = ga.goal_id
            WHERE g.user_id = $1
            GROUP BY g.goal_id, gv.goal_versions_id
            ORDER BY g.created_at DESC`,
      [user_id],
    );

    res.json({ goals: result.rows });
  } catch (err) {
    console.error("getAllGoals error:", err.message);
  }
};

const addVersion = async (req, res) => {
    const { goal_id, title, priority } = req.body;

    if (!goal_id || !title){
        return res.status(400).json({ error: 'goal_id and title are required' });
    }

    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        const closed = await client.query(
            `UPDATE goal.goal_versions
            SET valid_to = NOW()
            WHERE goal_id = $1 AND valid_to IS NULL
            RETURNING *`, [goal_id]
        );

        if (closed.rows.length === 0){
            await client.query('ROLLBACK');
            return res.status(404).json({ error: 'No active version found for this goal' });
        }

        const newVersion = await client.query(
            `INSERT INTO goal.goal_versions (goal_id, title, priority, valid_from)
            VALUES ($1, $2, $3, NOW())
            RETURNING *`, [goal_id, title, priority || null]
        );

        await client.query('COMMIT');

        res.status(201).json({
            message: 'New goal version created',
            version: newVersion.rows[0]
        });

    } catch(err){
        await client.query('ROLLBACK');
        console.error('addVersion error:', err.message);
    } finally {
        client.release();
    }
};

const addAction = async (req, res) => {
    const { goal_id, action_date, effort_level } = req.body;

    if (!goal_id) {
        return res.status(400).json({ error: 'goal_id is required' });
    }

    try {
        const result = await pool.query(
            `INSERT INTO goal.goal_actions (goal_id, action_date, effort_level)
            VALUES ($1, $2, $3)
            RETURNING *`,
            [goal_id, action_date || new Date(), effort_level || null]
        );

        res.status(201).json({ message: 'Action logged', action: result.rows[0] });

    } catch(err) {
        console.error('addAction error:', err.message);
    }
};

const addReview = async (req, res) => {
    const { goal_id, clarity_score, motivation_score } = req.body;

    if(!goal_id) {
        return res.status(400).json({ error: 'goal_id is required' });
    }

    try {
        const result = await pool.query(
            `INSERT INTO goal.goal_reviews (goal_id, clarity_score, motivation_score)
            VALUES ($1, $2, $3)
            RETURNING *`, 
            [goal_id, clarity_score || null, motivation_score || null]
        );

        res.status(201).json({ message: 'Review added', review: result.rows[0] });

    } catch(err){
        console.error('addReview error:', err.message);
    }
};

module.exports = { createGoal, getAllGoals, addVersion, addAction, addReview };
