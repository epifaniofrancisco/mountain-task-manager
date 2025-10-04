import { useCallback, useEffect } from "react";
import {
	ReactFlow,
	Background,
	Controls,
	Panel,
	addEdge,
	useNodesState,
	useEdgesState,
	type Node,
	type Edge,
	type Connection,
	type EdgeChange,
	BackgroundVariant,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useTaskStore } from "@/hooks/taskStore";
import { FlowLegend } from "./FlowLegend";
import { tasksToNodes, tasksToEdges } from "./flowHelpers";
import { nodeTypes, edgeOptions, fitViewOptions } from "./FlowConfig";

export default function FlowView() {
	const { tasks, updateTaskPosition, addDependency, removeDependency } =
		useTaskStore();
	const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
	const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

	useEffect(() => {
		if (tasks.length === 0) return;

		const newNodes = tasksToNodes(tasks);
		const newEdges = tasksToEdges(tasks);

		setNodes(newNodes);
		setEdges(newEdges);
	}, [tasks, setNodes, setEdges]);

	const handleConnect = useCallback(
		(connection: Connection) => {
			if (!connection.source || !connection.target) return;

			if (connection.source === connection.target) {
				console.warn("⚠️ Cannot create self-dependency");
				return;
			}

			addDependency(connection.target, connection.source);

			setEdges((eds) => addEdge({ ...connection, ...edgeOptions }, eds));
		},
		[setEdges, addDependency]
	);

	const handleEdgesChange = useCallback(
		(changes: EdgeChange[]) => {
			changes.forEach((change) => {
				if (change.type === "remove") {
					const edgeId = change.id;
					const parts = edgeId.split("-");
					const sourceId = parts[1];
					const targetId = parts[2];

					if (sourceId && targetId) {
						removeDependency(targetId, sourceId);
					}
				}
			});
			onEdgesChange(changes);
		},
		[onEdgesChange, removeDependency]
	);

	const handleNodeDragStop = useCallback(
		(_event: unknown, node: Node) => {
			updateTaskPosition(node.id, node.position);
		},
		[updateTaskPosition]
	);

	return (
		<div className="w-full h-[calc(100vh-200px)] rounded-lg border bg-card overflow-hidden">
			<ReactFlow
				nodes={nodes}
				edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={handleEdgesChange}
				onConnect={handleConnect}
				onNodeDragStop={handleNodeDragStop}
				nodeTypes={nodeTypes}
				fitView
				fitViewOptions={fitViewOptions}
				defaultEdgeOptions={edgeOptions}
				deleteKeyCode="Delete"
				edgesReconnectable={false}
			>
				<Background
					variant={BackgroundVariant.Dots}
					gap={16}
					size={1}
					color="#94a3b8"
					className="bg-background"
				/>

				<Controls className="bg-card border shadow-sm" />

				<Panel
					position="top-right"
					className="bg-card/90 backdrop-blur-sm p-3 rounded-lg border shadow-sm"
				>
					<FlowLegend />
				</Panel>
			</ReactFlow>
		</div>
	);
}
