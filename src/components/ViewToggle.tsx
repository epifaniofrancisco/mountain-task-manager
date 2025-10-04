import { LayoutGrid, Network } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ViewToggleProps {
	view: "kanban" | "flow";
	onViewChange: (view: "kanban" | "flow") => void;
}

export function ViewToggle({ view, onViewChange }: ViewToggleProps) {
	return (
		<div className="inline-flex items-center rounded-lg border bg-muted p-1">
			<Button
				variant="ghost"
				size="sm"
				onClick={() => onViewChange("kanban")}
				className={cn(
					"gap-2",
					view === "kanban" && "bg-background shadow-sm"
				)}
			>
				<LayoutGrid className="h-4 w-4" />
				Kanban
			</Button>
			<Button
				variant="ghost"
				size="sm"
				onClick={() => onViewChange("flow")}
				className={cn(
					"gap-2",
					view === "flow" && "bg-background shadow-sm"
				)}
			>
				<Network className="h-4 w-4" />
				Flow
			</Button>
		</div>
	);
}
