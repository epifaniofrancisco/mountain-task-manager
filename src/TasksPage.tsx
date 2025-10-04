import { useState } from "react";
import { ViewToggle } from "./components/ViewToggle";
import { ThemeToggle } from "./components/ThemeToggle";
import { Button } from "./components/ui/button";
import { RotateCcw, Sparkles } from "lucide-react";
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
		<div className="min-h-screen bg-background transition-colors duration-300">
			<header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
				<div className="container mx-auto px-6 py-6">
					<div className="flex flex-col items-center text-center space-y-4">
						<div className="space-y-2">
							<div className="flex items-center justify-center gap-3">
								<div className="relative">
									<div className="absolute inset-0 bg-gradient-to-r from-[#5552F0] to-[#3175F4] blur-2xl opacity-20 animate-pulse" />
									<Sparkles className="h-10 w-10 text-[#5552F0] relative" />
								</div>
								<h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#5552F0] via-[#7967EC] to-[#3175F4] bg-clip-text text-transparent">
									Mountain Task Manager
								</h1>
							</div>
							<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
								Visualize e organize seu trabalho de forma{" "}
								<span className="text-[#7967EC] font-semibold">
									inteligente
								</span>{" "}
								e{" "}
								<span className="text-[#3175F4] font-semibold">
									eficiente
								</span>
							</p>
						</div>

						<div className="flex items-center gap-2 pt-2 flex-wrap justify-center">
							<ViewToggle view={view} onViewChange={setView} />
							<div className="flex items-center gap-2">
								<ThemeToggle />
								<Button
									onClick={handleReset}
									variant="outline"
									className="gap-2 hover:scale-105 transition-transform"
								>
									<RotateCcw className="h-4 w-4" />
									Reiniciar Tarefas
								</Button>
							</div>
						</div>
					</div>
				</div>
			</header>

			<main className="container mx-auto px-6 py-8">
				<div className="animate-in fade-in duration-500">
					{view === "kanban" ? <KanbanView /> : <FlowView />}
				</div>
			</main>
		</div>
	);
}
