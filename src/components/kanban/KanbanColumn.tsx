import { useDroppable } from "@dnd-kit/core";
import {
	SortableContext,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import type { Task, TaskStatus } from "@/lib/types";
import { SortableTaskCard } from "./SortableTaskCard";
import { cn } from "@/lib/utils";

interface KanbanColumnProps {
	id: TaskStatus;
	title: string;
	tasks: Task[];
}

const columnColors = {
	todo: "border-green-500/20",
	"in-progress": "border-amber-500/20",
	done: "border-green-500/20",
};

export function KanbanColumn({ id, title, tasks }: KanbanColumnProps) {
	const { setNodeRef, isOver } = useDroppable({ id });

	return (
		<div className="flex flex-col gap-4 min-w-[320px] flex-1">
			<div className="flex items-center justify-between">
				<h2 className="font-semibold text-lg text-foreground">
					{title}
				</h2>
				<span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded-md">
					{tasks.length}
				</span>
			</div>
			<div
				ref={setNodeRef}
				className={cn(
					"flex flex-col gap-3 p-4 rounded-lg border-2 border-dashed bg-muted/20 min-h-[500px] transition-colors",
					columnColors[id],
					isOver && "bg-muted/40 border-solid"
				)}
			>
				<SortableContext
					items={tasks.map((t) => t.id)}
					strategy={verticalListSortingStrategy}
				>
					{tasks.map((task) => (
						<SortableTaskCard key={task.id} task={task} />
					))}
				</SortableContext>
			</div>
		</div>
	);
}
