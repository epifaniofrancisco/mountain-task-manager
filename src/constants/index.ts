import type { TaskPriority, TaskStatus } from "@/lib/types";

export const PRIORITY_COLORS: Record<TaskPriority, string> = {
	low: "bg-green-500/10 text-green-500 border-green-500/20",
	medium: "bg-amber-500/10 text-amber-500 border-amber-500/20",
	high: "bg-red-500/10 text-red-500 border-red-500/20",
};

export const PRIORITY_FLOW_COLORS: Record<TaskPriority, string> = {
	low: "border-green-500 bg-green-500/10",
	medium: "border-amber-500 bg-amber-500/10",
	high: "border-red-500 bg-red-500/10",
};

export const PRIORITY_HEX_COLORS: Record<TaskPriority, string> = {
	low: "#22c55e",
	medium: "#f59e0b",
	high: "#ef4444",
};

export const PRIORITY_LABELS: Record<TaskPriority, string> = {
	low: "Low",
	medium: "Medium",
	high: "High",
};

export const STATUS_LABELS: Record<TaskStatus, string> = {
	todo: "To Do",
	"in-progress": "In Progress",
	done: "Done",
};

export const COLUMNS: Array<{ id: TaskStatus; title: string }> = [
	{ id: "todo", title: "Todo" },
	{ id: "in-progress", title: "In progress" },
	{ id: "done", title: "Done" },
];

export const COLUMN_COLORS: Record<TaskStatus, string> = {
	todo: "border-blue-500/20",
	"in-progress": "border-amber-500/20",
	done: "border-green-500/20",
};
