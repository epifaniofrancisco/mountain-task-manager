import type { Node, Edge } from "@xyflow/react";
import { MarkerType } from "@xyflow/react";
import type { Task } from "@/lib/types";

export function tasksToNodes(tasks: Task[]): Node[] {
	return tasks.map((task) => ({
		id: task.id,
		type: "custom",
		position: task.position || { x: 0, y: 0 },
		data: { task },
	}));
}

export function tasksToEdges(tasks: Task[]): Edge[] {
	const edges: Edge[] = [];

	for (const task of tasks) {
		if (!task.dependencies?.length) continue;

		for (const depId of task.dependencies) {
			edges.push({
				id: `e-${depId}-${task.id}`,
				source: depId,
				target: task.id,
				type: "smoothstep",
				animated: true,
				style: { strokeWidth: 2, stroke: "#64748b" },
				markerEnd: {
					type: MarkerType.ArrowClosed,
					width: 20,
					height: 20,
				},
			});
		}
	}

	return edges;
}
