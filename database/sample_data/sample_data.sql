INSERT INTO auth.users(email,password_hash)

VALUES
('user1@gmail.com','hash1'),
('user2@gmail.com','hash2'),
('user3@gmail.com','hash3');

INSERT INTO decision.decisions(user_id,title,category)

VALUES
(1,'Switch to Go','Career'),
(2,'Buy Laptop','Finance'),
(1,'Gym Membership','Health');

INSERT INTO decision.decision_events
(decision_id,event_type,confidence)

VALUES

(1,'REVISITED',6),
(1,'POSTPONED',5),
(1,'DECIDED',7),

(2,'REVISITED',8),
(2,'POSTPONED',7),

(3,'REVISITED',4);

INSERT INTO decision.decision_reviews
(decision_id,regret_score,satisfaction_score,would_repeat)

VALUES

(1,6,8,TRUE);

INSERT INTO goal.goals(user_id)

VALUES
(1),
(2);

INSERT INTO goal.goal_versions
(goal_id,title,priority)

VALUES

(1,'Learn Backend',5),
(2,'Save Money',4);

INSERT INTO goal.goal_actions
(goal_id,effort_level)

VALUES

(1,4),
(1,5),
(2,3);

INSERT INTO goal.goal_reviews
(goal_id,clarity_score,motivation_score)

VALUES

(1,8,7),
(2,6,5);