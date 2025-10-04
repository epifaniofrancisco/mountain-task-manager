import { PRIORITY_COLORS, PRIORITY_LABELS } from "@/constants";
import type { Task } from "@/lib/types";
import { cn } from "@/lib/utils";

interface TaskCardProps {
	task: Task;
	isDragging?: boolean;
}

export function TaskCard({ task, isDragging }: TaskCardProps) {
	return (
		<div
			className={cn(
				"rounded-lg border bg-card p-4 shadow-sm transition-all hover:shadow-md",
				isDragging && "opacity-50"
			)}
		>
			<div className="flex items-start justify-between gap-2 mb-2">
				<h3 className="font-semibold text-card-foreground leading-tight">
					{task.title}
				</h3>
				<span
					className={cn(
						"px-2 py-0.5 rounded-md text-xs font-medium border whitespace-nowrap",
						PRIORITY_COLORS[task.priority]
					)}
				>
					{PRIORITY_LABELS[task.priority]}
				</span>
			</div>
			{task.description && (
				<p className="text-sm text-muted-foreground line-clamp-2">
					{task.description}
				</p>
			)}
		</div>
	);
}
