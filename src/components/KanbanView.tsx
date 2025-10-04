import { useState } from "react";
import {
	DndContext,
	type DragEndEvent,
	DragOverlay,
	type DragStartEvent,
	PointerSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import type { TaskStatus } from "@/lib/types";
import { useTaskStore } from "@/hooks/taskStore";
import { KanbanColumn } from "./kanban/KanbanColumn";
import { TaskCard } from "./kanban/TaskCard";

const columns = [
	{ id: "todo" as TaskStatus, title: "Todo" },
	{ id: "in-progress" as TaskStatus, title: "In progress" },
	{ id: "done" as TaskStatus, title: "Done" },
];

export function KanbanView() {
	const { tasks, updateTaskStatus } = useTaskStore();
	const [activeId, setActiveId] = useState<string | null>(null);

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 8,
			},
		})
	);

	const handleDragStart = (event: DragStartEvent) => {
		setActiveId(event.active.id as string);
	};

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;

		if (!over) {
			setActiveId(null);
			return;
		}

		const taskId = active.id as string;
		const overId = over.id as string;

		const targetColumn = columns.find((col) => col.id === overId);
		if (targetColumn) {
			updateTaskStatus(taskId, targetColumn.id);
		}

		setActiveId(null);
	};

	const activeTask = tasks.find((task) => task.id === activeId);

	return (
		<DndContext
			sensors={sensors}
			onDragStart={handleDragStart}
			onDragEnd={handleDragEnd}
		>
			<div className="flex gap-6 overflow-x-auto pb-4">
				{columns.map((column) => (
					<KanbanColumn
						key={column.id}
						id={column.id}
						title={column.title}
						tasks={tasks.filter(
							(task) => task.status === column.id
						)}
					/>
				))}
			</div>
			<DragOverlay>
				{activeTask ? <TaskCard task={activeTask} isDragging /> : null}
			</DragOverlay>
		</DndContext>
	);
}
