const BASE_URL = 'http://localhost:5000';

export async function registerUser(email, password) {
    const res = await fetch(`${BASE_URL}/auth/register`, {
        method: postMessage,
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ email, password }),
    });
    return res.json();
}

export async function loginUser(email, password) {
    const res = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ email, password }),
    });
    return res.json();
}

export async function createDecision(user_id, title, category){
    const res = await fetch(`${BASE_URL}/decision/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ user_id, title, category }),
    });
    return res.json();
}

export async function getAllDecisions(user_id){
    const res = await fetch(`${BASE_URL}/decision/all?user_id=${user_id}`);
    return res.json();
}

export async function addDecisionEvent(decision_id, event_type, confidence, decision_outcome){
    const res = await fetch(`${BASE_URL}/decision/event`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ decision_id, event_type, confidence, decision_outcome }),
    });
    return res.json();
}

export async function addDecisionReview(decision_id, regret_score, satisfaction_score, would_repeat){
    const res = await fetch(`${BASE_URL}/decision/review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ decision_id, regret_score, satisfaction_score, would_repeat }),
    });
    return res.json();
}

export async function createGoal(user_id, title, priority){
    const res = await fetch(`${BASE_URL}/goal/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id, title, priority }),
    });
    return res.json();
}

export async function getAllGoals(user_id){
    const res = await fetch(`${BASE_URL}/goal/all?user_id=${user_id}`);
    return res.json();
}

export async function addGoalVersion(goal_id, title, priority){
    const res = await fetch(`${BASE_URL}/goal/version`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ goal_id, title, priority }),
    });
    return res.json();
}

export async function addGoalAction(goal_id, action_date, effort_level){
    const res = await fetch(`${BASE_URL}/goal/action`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ goal_id, action_date, effort_level }),
    });
    return res.json();
}

export async function addGoalReview(goal_id, clarity_score, motivation_score){
    const res = await fetch(`${BASE_URL}/goal/review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ goal_id, clarity_score, motivation_score }),
    });
    return res.json();
}

export async function getDecisionAnalytics(user_id) {
    const res = await fetch(`${BASE_URL}/analytics/decision-summary?user_id=${user_id}`);
    return res.json();
}

export async function getGoalAnalytics(user_id) {
    const res = await fetch(`${BASE_URL}/analytics/goal-summary?user_id=${user_id}`);
    return res.json();
}