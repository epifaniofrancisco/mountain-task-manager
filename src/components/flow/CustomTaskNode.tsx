import { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import type { Task } from "@/lib/types";
import {
	PRIORITY_FLOW_COLORS,
	PRIORITY_LABELS,
} from "@/constants";

interface CustomTaskNodeProps {
	data: { task: Task };
}

export const CustomTaskNode = memo(({ data }: CustomTaskNodeProps) => {
	const { task } = data;

	return (
		<div
			className={`px-4 py-3 rounded-lg border-2 shadow-lg min-w-[200px] max-w-[250px] bg-card ${
				PRIORITY_FLOW_COLORS[task.priority]
			}`}
		>
			<Handle
				type="target"
				position={Position.Left}
				className="w-3 h-3 !bg-gray-500"
				aria-label="Connection input"
			/>

			<div className="space-y-2">
				<h3 className="font-bold text-base text-card-foreground leading-tight">
					{task.title}
				</h3>

				<span className="text-base text-gray-900">
					{PRIORITY_LABELS[task.priority]}
				</span>
			</div>

			<Handle
				type="source"
				position={Position.Right}
				className="w-3 h-3 !bg-gray-500"
				aria-label="Connection output"
			/>
		</div>
	);
});

CustomTaskNode.displayName = "CustomTaskNode";
