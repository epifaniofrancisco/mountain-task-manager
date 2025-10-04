import { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import type { Task } from "@/lib/types";
import { PRIORITY_FLOW_COLORS, PRIORITY_LABELS } from "@/constants";

interface CustomTaskNodeProps {
	data: { task: Task };
}

export const CustomTaskNode = memo(({ data }: CustomTaskNodeProps) => {
	const { task } = data;

	return (
		<div
			className={`group relative px-4 py-3 rounded-lg border-2 shadow-lg min-w-[200px] max-w-[250px] bg-card transition-all duration-300 hover:scale-105 ${
				PRIORITY_FLOW_COLORS[task.priority]
			}`}
		>
			<Handle
				type="target"
				position={Position.Left}
				className="w-3 h-3 !bg-primary dark:!bg-primary border-2 border-background transition-all group-hover:scale-125"
				aria-label="Connection input"
			/>

			<div className="space-y-2">
				<h3 className="font-bold text-sm text-card-foreground leading-tight">
					{task.title}
				</h3>

				<span className="text-xs px-2 py-1 rounded-md bg-muted/80 dark:bg-muted/50 text-muted-foreground font-medium">
					{PRIORITY_LABELS[task.priority]}
				</span>
			</div>

			<Handle
				type="source"
				position={Position.Right}
				className="w-3 h-3 !bg-secondary dark:!bg-secondary border-2 border-background transition-all group-hover:scale-125"
				aria-label="Connection output"
			/>

			{/* Glow effect */}
			<div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-lg bg-gradient-to-br from-primary/20 to-secondary/20" />
		</div>
	);
});

CustomTaskNode.displayName = "CustomTaskNode";
