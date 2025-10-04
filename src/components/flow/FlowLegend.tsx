interface LegendItemProps {
	color: string;
	label: string;
}

function LegendItem({ color, label }: LegendItemProps) {
	return (
		<div className="flex items-center gap-2">
			<div className={`w-3 h-3 rounded-full ${color}`} />
			<span className="text-muted-foreground">{label}</span>
		</div>
	);
}

export function FlowLegend() {
	return (
		<div className="space-y-2">
			<h3 className="font-semibold text-sm text-foreground">Flow View</h3>

			<p className="text-xs text-muted-foreground max-w-[200px]">
				Arraste os nós para reposicionar. Role para ampliar/reduzir.
				Clique e arraste das bordas para criar dependências.
			</p>

			<div className="mt-3 text-xs space-y-1">
				<p className="font-medium text-foreground">Prioridades:</p>

				<LegendItem color="bg-green-500" label="Baixa" />
				<LegendItem color="bg-amber-500" label="Média" />
				<LegendItem color="bg-red-500" label="Alta" />
			</div>

			<div className="mt-3 text-xs border-t pt-2">
				<p className="font-medium text-foreground mb-1">Ações:</p>
				<ul className="space-y-0.5 text-muted-foreground">
					<li>• Arraste círculos para conectar</li>
					<li>• Selecione edge e delete para remover</li>
					<li>• Mudanças são salvas automaticamente</li>
				</ul>
			</div>
		</div>
	);
}
