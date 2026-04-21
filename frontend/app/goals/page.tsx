"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getAllGoals,
  createGoal,
  addGoalVersion,
  addGoalAction,
  addGoalReview,
} from "../../lib/api";
import { getUser } from "../../utils/auth";
import Navbar from "../components/Navbar";

export default function GoalsPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [goals, setGoals] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [effortLevel, setEffortLevel] = useState("");
  const [clarityScore, setClarityScore] = useState("");
  const [motivationScore, setMotivationScore] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editPriority, setEditPriority] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const u = getUser();
    if (!u) {
      router.push("/");
      return;
    }
    setUser(u);
    loadGoals(u.user_id);
  }, []);

  const loadGoals = async (uid: number) => {
    const data = await getAllGoals(uid);
    setGoals(data.goals || []);
  };

  const handleCreate = async () => {
    if (!title) return;
    await createGoal(user.user_id, title, priority);
    setTitle("");
    setPriority("");
    setMessage("Goal created");
    loadGoals(user.user_id);
  };

  const handleVersion = async () => {
    if (!selectedId || !editTitle) return;
    await addGoalVersion(Number(selectedId), editTitle, editPriority);
    setMessage("Goal updated");
    setEditTitle("");
    setEditPriority("");
    loadGoals(user.user_id);
  };

  const handleAction = async () => {
    if (!selectedId) return;
    await addGoalAction(
      Number(selectedId),
      new Date().toISOString(),
      Number(effortLevel),
    );
    setMessage("Action logged");
    setEffortLevel("");
  };

  const handleReview = async () => {
    if (!selectedId) return;
    await addGoalReview(
      Number(selectedId),
      Number(clarityScore),
      Number(motivationScore),
    );
    setMessage("Review added");
    setClarityScore("");
    setMotivationScore("");
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <Navbar />
      <div className="max-w-3xl mx-auto mt-5">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Goals</h1>
          <a
            href="/dashboard"
            className="text-sm text-blue-600 hover:underline"
          >
            ← Dashboard
          </a>
        </div>

        {message && <p className="text-green-600 text-sm mb-4">{message}</p>}

        {/* Create Goal */}
        <div className="bg-white rounded shadow p-6 mb-6">
          <h2 className="font-semibold text-gray-700 mb-3">Create Goal</h2>
          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border px-3 py-2 rounded mb-2 text-sm"
          />
          <input
            placeholder="Priority (optional)"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full border px-3 py-2 rounded mb-3 text-sm"
          />
          <button
            onClick={handleCreate}
            className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
          >
            Create
          </button>
        </div>

        {/* Edit Goal (new version) */}
        <div className="bg-white rounded shadow p-6 mb-6">
          <h2 className="font-semibold text-gray-700 mb-3">
            Edit Goal (New Version)
          </h2>
          <select
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            className="w-full border px-3 py-2 rounded mb-2 text-sm"
          >
            <option value="">Select a goal</option>
            {goals.map((g) => (
              <option key={g.goal_id} value={g.goal_id}>
                {g.title}
              </option>
            ))}
          </select>
          <input
            placeholder="New title"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full border px-3 py-2 rounded mb-2 text-sm"
          />
          <input
            placeholder="New priority (optional)"
            value={editPriority}
            onChange={(e) => setEditPriority(e.target.value)}
            className="w-full border px-3 py-2 rounded mb-3 text-sm"
          />
          <button
            onClick={handleVersion}
            className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
          >
            Save New Version
          </button>
        </div>

        {/* Log Action */}
        <div className="bg-white rounded shadow p-6 mb-6">
          <h2 className="font-semibold text-gray-700 mb-3">Log Action</h2>
          <select
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            className="w-full border px-3 py-2 rounded mb-2 text-sm"
          >
            <option value="">Select a goal</option>
            {goals.map((g) => (
              <option key={g.goal_id} value={g.goal_id}>
                {g.title}
              </option>
            ))}
          </select>
          <input
            placeholder="Effort level (1-10)"
            value={effortLevel}
            onChange={(e) => setEffortLevel(e.target.value)}
            className="w-full border px-3 py-2 rounded mb-3 text-sm"
          />
          <button
            onClick={handleAction}
            className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
          >
            Log Action
          </button>
        </div>

        {/* Add Review */}
        <div className="bg-white rounded shadow p-6 mb-6">
          <h2 className="font-semibold text-gray-700 mb-3">Add Review</h2>
          <select
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            className="w-full border px-3 py-2 rounded mb-2 text-sm"
          >
            <option value="">Select a goal</option>
            {goals.map((g) => (
              <option key={g.goal_id} value={g.goal_id}>
                {g.title}
              </option>
            ))}
          </select>
          <input
            placeholder="Clarity score (1-10)"
            value={clarityScore}
            onChange={(e) => setClarityScore(e.target.value)}
            className="w-full border px-3 py-2 rounded mb-2 text-sm"
          />
          <input
            placeholder="Motivation score (1-10)"
            value={motivationScore}
            onChange={(e) => setMotivationScore(e.target.value)}
            className="w-full border px-3 py-2 rounded mb-3 text-sm"
          />
          <button
            onClick={handleReview}
            className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
          >
            Submit Review
          </button>
        </div>

        {/* Goals List */}
        <div className="bg-white rounded shadow p-6">
          <h2 className="font-semibold text-gray-700 mb-3">All Goals</h2>
          {goals.length === 0 ? (
            <p className="text-sm text-gray-400">No goals yet</p>
          ) : (
            goals.map((g) => (
              <div key={g.goal_id} className="border-b py-3 last:border-0">
                <p className="text-sm font-medium text-gray-700">{g.title}</p>
                <p className="text-xs text-gray-400">
                  Priority: {g.priority || "none"} · {g.action_count} actions ·{" "}
                  {g.is_abandoned ? "Abandoned" : "Active"}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
