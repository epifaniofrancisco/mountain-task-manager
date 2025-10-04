import type { TaskPriority, TaskStatus } from "@/lib/types";

export const PRIORITY_COLORS: Record<TaskPriority, string> = {
	low: "bg-green-500/10 text-green-500 border-green-500/20",
	medium: "bg-amber-500/10 text-amber-500 border-amber-500/20",
	high: "bg-red-500/10 text-red-500 border-red-500/20",
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
