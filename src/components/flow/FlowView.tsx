import { useCallback, useEffect } from "react";
import {
	ReactFlowProvider,
    ReactFlow,
    Background,
    Controls,
    Panel,
    addEdge,
    useNodesState,
    useEdgesState,
    useReactFlow,
    type Node,
    type Edge,
    type Connection,
    type EdgeChange,
    type ColorMode,
    BackgroundVariant,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useTaskStore } from "@/hooks/taskStore";
import { useDarkMode } from "@/hooks/useDarkMode";
import { FlowLegend } from "./FlowLegend";
import { tasksToNodes, tasksToEdges } from "./flowHelpers";
import { nodeTypes, edgeOptions, fitViewOptions } from "./flowConfig";

function FlowViewContent() {
    const { tasks, updateTaskPosition, addDependency, removeDependency } =
        useTaskStore();
    const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
    const { isDark } = useDarkMode();
    const { setViewport } = useReactFlow();

    const colorMode: ColorMode = isDark ? "dark" : "light";

    useEffect(() => {
        if (tasks.length === 0) return;

        const newNodes = tasksToNodes(tasks);
        const newEdges = tasksToEdges(tasks);

        setNodes(newNodes);
        setEdges(newEdges);
    }, [tasks, setNodes, setEdges]);

    useEffect(() => {
        setViewport({ x: 0, y: 0, zoom: 1 }, { duration: 0 });
    }, [colorMode, setViewport]);

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
                        console.log(
                            `🗑️ Dependency removed: ${sourceId} → ${targetId}`
                        );
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
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={handleEdgesChange}
            onConnect={handleConnect}
            onNodeDragStop={handleNodeDragStop}
            nodeTypes={nodeTypes}
            colorMode={colorMode}
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
                className={isDark ? "opacity-30" : "opacity-20"}
            />

            <Controls className="bg-card/80 backdrop-blur-sm border border-border/50 shadow-lg rounded-lg" />

            <Panel
                position="top-right"
                className="bg-card/90 backdrop-blur-sm p-3 rounded-lg border border-border/50 shadow-lg"
            >
                <FlowLegend />
            </Panel>
        </ReactFlow>
    );
}

export default function FlowView() {
    const { isDark } = useDarkMode();

    return (
        <div className="w-full h-[calc(100vh-200px)] rounded-lg border bg-card overflow-hidden">
            <ReactFlowProvider>
                <FlowViewContent key={isDark ? "dark" : "light"} />
            </ReactFlowProvider>
        </div>
    );
}