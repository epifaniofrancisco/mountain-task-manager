import { useState } from "react";
import { ViewToggle } from "./components/ViewToggle";
import { Button } from "./components/ui/button";
import { RotateCcw } from "lucide-react";
import { useTaskStore } from "./hooks/taskStore";
import { KanbanView } from "./components/kanban/KanbanView";
import FlowView from "./components/flow/FlowView";

export default function TasksPage() {
	const [view, setView] = useState<"kanban" | "flow">("kanban");
	const { resetTasks } = useTaskStore();

	const handleReset = () => {
		if (
			confirm(
				"Tem certeza que deseja reiniciar todas as tarefas para os dados padrão? Esta ação não pode ser desfeita."
			)
		) {
			resetTasks();
		}
	};

	return (
		<div className="min-h-screen bg-background">
			<header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
				<div className="container mx-auto px-6 py-6">
					<div className="flex flex-col items-center text-center space-y-4">
						<div className="space-y-2">
							<h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-[#5552F0]">
								Mountain Task Manager
							</h1>
							<p className="text-xl  text-muted-foreground max-w-2xl mx-auto">
								Visualize e organize seu trabalho de forma <span className="text-[#7967EC]">inteligente</span> e <span className="text-[#3175F4]">eficiente</span>
							</p>
						</div>
						<div className="flex items-center gap-4 pt-2">
							<ViewToggle view={view} onViewChange={setView} />
							<Button
								onClick={handleReset}
								variant="outline"
								size="sm"
								className="gap-2"
							>
								<RotateCcw className="h-4 w-4" />
								Reiniciar Tarefas
							</Button>
						</div>
					</div>
				</div>
			</header>

			<main className="container mx-auto px-6 py-8">
				{view === "kanban" ? <KanbanView /> : <FlowView />}
			</main>
		</div>
	);
}
