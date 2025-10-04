export type TaskStatus = "todo" | "in-progress" | "done";
export type TaskPriority = "low" | "medium" | "high";

export interface Task {
	id: string;
	title: string;
	description?: string;
	status: TaskStatus;
	priority: TaskPriority;
	dependencies?: string[];
	position?: { x: number; y: number };
}

export interface Column {
	id: TaskStatus;
	title: string;
	tasks: Task[];
}
