import { mockTasks } from "@/data/mockData";
import type { Task, TaskStatus } from "@/lib/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TaskStore {
	tasks: Task[];
	updateTaskStatus: (taskId: string, status: TaskStatus) => void;
	updateTaskPosition: (
		taskId: string,
		position: { x: number; y: number }
	) => void;
	addDependency: (taskId: string, dependencyId: string) => void;
	removeDependency: (taskId: string, dependencyId: string) => void;
	resetTasks: () => void;
}

export const useTaskStore = create<TaskStore>()(
	persist(
		(set) => ({
			tasks: mockTasks,
			updateTaskStatus: (taskId: string, status: TaskStatus) => {
				set((state) => ({
					tasks: state.tasks.map((task) =>
						task.id === taskId ? { ...task, status } : task
					),
				}));
			},

			updateTaskPosition: (
				taskId: string,
				position: { x: number; y: number }
			) => {
				set((state) => ({
					tasks: state.tasks.map((task) =>
						task.id === taskId ? { ...task, position } : task
					),
				}));
			},

			addDependency: (taskId: string, dependencyId: string) => {
				set((state) => ({
					tasks: state.tasks.map((task) => {
						if (task.id === taskId) {
							const dependencies = task.dependencies || [];
							if (!dependencies.includes(dependencyId)) {
								return {
									...task,
									dependencies: [
										...dependencies,
										dependencyId,
									],
								};
							}
						}
						return task;
					}),
				}));
			},

			removeDependency: (taskId: string, dependencyId: string) => {
				set((state) => ({
					tasks: state.tasks.map((task) => {
						if (task.id === taskId) {
							const dependencies = task.dependencies || [];
							return {
								...task,
								dependencies: dependencies.filter(
									(id) => id !== dependencyId
								),
							};
						}
						return task;
					}),
				}));
			},

			resetTasks: () => {
				set({ tasks: mockTasks });
			},
		}),
		{
			name: "task-storage",
		}
	)
);
