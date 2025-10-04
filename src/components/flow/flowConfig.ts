import type { NodeTypes } from "@xyflow/react";
import { MarkerType } from "@xyflow/react";
import { CustomTaskNode } from "./CustomTaskNode";

export const nodeTypes: NodeTypes = {
	custom: CustomTaskNode,
};

export const edgeOptions = {
	type: "smoothstep" as const,
	animated: true,
	style: { strokeWidth: 2, stroke: "#64748b" },
	markerEnd: {
		type: MarkerType.ArrowClosed,
		width: 20,
		height: 20,
	},
};

export const fitViewOptions = {
	padding: 0.2,
	minZoom: 0.1,
	maxZoom: 2,
};
